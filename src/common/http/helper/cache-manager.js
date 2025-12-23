import qs from "qs";
export class CacheManager {
    // 缓存存储
    cacheStorage = new Map();
    /**
     * 生成缓存键
     */
    generateCacheKey(config, customKey) {
        const { method = "get", url = "", params } = config;
        // 如果用户提供了自定义缓存键，使用它
        if (customKey)
            return customKey;
        // 否则根据 URL 和参数生成
        const paramsStr = params ? qs.stringify(params, { arrayFormat: "repeat", sort: (a, b) => a.localeCompare(b) }) : "";
        return `${method.toUpperCase()}:${url}?${paramsStr}`;
    }
    /**
     * 从缓存获取数据
     */
    get(key, ttl) {
        const cachedItem = this.cacheStorage.get(key);
        if (!cachedItem)
            return null;
        // 如果没有设置 TTL 或者缓存在有效期内，返回缓存数据
        if (!ttl || Date.now() - cachedItem.timestamp < ttl) {
            return cachedItem.data;
        }
        // 缓存过期，删除并返回 null
        this.cacheStorage.delete(key);
        return null;
    }
    /**
     * 保存数据到缓存
     */
    set(key, data, ttl) {
        this.cacheStorage.set(key, {
            data,
            timestamp: Date.now(),
        });
        // 如果设置了 TTL，定时清理过期缓存
        if (ttl) {
            setTimeout(() => {
                this.cacheStorage.delete(key);
            }, ttl);
        }
    }
    /**
     * 清除所有缓存
     */
    clear() {
        this.cacheStorage.clear();
    }
    /**
     * 根据键清除特定缓存
     */
    delete(key) {
        this.cacheStorage.delete(key);
    }
    /**
     * 获取缓存大小
     */
    size() {
        return this.cacheStorage.size;
    }
}
