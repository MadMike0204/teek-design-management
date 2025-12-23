const debounce = {
    mounted(el, binding) {
        const { value } = binding;
        if (typeof value !== "function" && typeof value?.onClick !== "function") {
            throw Error("v-debounce: callback must be a function");
        }
        const onClick = value.onClick || value;
        const time = value.time || 500;
        const debounceClass = value.debounceClass || "is-debouncing";
        /**
         * 防抖点击事件
         */
        el.__handleClick__ = function () {
            if (el.__debounceTimer__)
                clearTimeout(el.__debounceTimer__);
            el.classList.add(debounceClass);
            el.__debounceTimer__ = setTimeout(() => {
                el.classList.remove(debounceClass);
                onClick();
            }, time);
        };
        el.addEventListener("click", el.__handleClick__);
    },
    beforeUnmount(el) {
        el.removeEventListener("click", el.__handleClick__);
        if (el.__debounceTimer__) {
            clearTimeout(el.__debounceTimer__);
            el.__debounceTimer__ = null;
        }
    },
};
export default debounce;
