export class StorageManager {
    defaultExcludes = [""];
    type;
    prefix;
    version;
    constructor({ type = "localStorage", prefix = "", version = "" }) {
        this.type = type;
        this.prefix = prefix;
        this.version = version;
    }
    getStorage() {
        return window[this.type];
    }
    getPrefix() {
        return this.prefix;
    }
    getVersion() {
        return this.version;
    }
    /**
     * 获取规范化的 key 值
     */
    normalizeKey(key) {
        let keyStr = "";
        if (this.prefix)
            keyStr += `${this.prefix}:`;
        if (this.version)
            keyStr += `v${this.version}:`;
        keyStr += key;
        return keyStr;
    }
    /**
     * 获取值的类型
     */
    getValueType(value) {
        return Object.prototype.toString.call(value).slice(8, -1);
    }
    /**
     * 发送自定义 storage 事件，实现数据变化后通知（数据响应式）
     */
    dispatchWriteEvent(key, oldValue, newValue) {
        if (window) {
            const payload = { key, oldValue, newValue, storageArea: this.getStorage() };
            window.dispatchEvent(new StorageEvent("storage", payload));
        }
    }
    /**
     * 获取存储的值
     */
    getItem(key, normalizeKey = true) {
        const storageValue = window[this.type].getItem(normalizeKey ? this.normalizeKey(key) : key);
        if (!storageValue)
            return null;
        const { value } = JSON.parse(storageValue);
        return value;
    }
    /**
     * 设置存储的值
     */
    setItem(key, value, normalizeKey = true) {
        const oldValue = window[this.type].getItem(key);
        const valueType = this.getValueType(value);
        window[this.type].setItem(normalizeKey ? this.normalizeKey(key) : key, JSON.stringify({ _type: valueType, value }));
        this.dispatchWriteEvent(key, oldValue, value);
    }
    /**
     * 删除存储的值
     */
    removeItem(key, normalizeKey = true) {
        window[this.type].removeItem(normalizeKey ? this.normalizeKey(key) : key);
    }
    /**
     * 删除多个存储的值
     */
    removeItems(keys, normalizeKey = true) {
        keys.forEach(key => window[this.type].removeItem(normalizeKey ? this.normalizeKey(key) : key));
    }
    /**
     * 清除存储的值
     */
    clear(excludes, normalizeKey = true) {
        // 获取排除项
        const excludesArr = (excludes ? [...excludes, ...this.defaultExcludes] : this.defaultExcludes).map(key => normalizeKey ? this.normalizeKey(key) : key);
        const keys = Object.keys(window[this.type]);
        const includesKeys = excludesArr.length
            ? keys.filter(key => !excludesArr.includes(key) && key.startsWith(this.prefix))
            : keys;
        // 排除项不清除
        includesKeys.forEach(key => window[this.type].removeItem(key));
    }
}
