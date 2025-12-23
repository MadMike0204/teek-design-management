const throttle = {
    mounted(el, binding) {
        const { value } = binding;
        if (typeof value !== "function" && typeof value?.onClick !== "function") {
            throw Error("v-throttle: callback must be a function");
        }
        const onClick = value.onClick || value;
        const time = value.time || 2000;
        const disabledClass = value.disabledClass || "is-disabled";
        /**
         * 节流点击事件
         */
        el.__handleClick__ = function () {
            if (el.__throttleTimer__)
                clearTimeout(el.__throttleTimer__);
            if (!el.classList.contains(disabledClass)) {
                el.classList.add(disabledClass);
                onClick();
            }
            el.__throttleTimer__ = setTimeout(() => {
                el.classList.remove(disabledClass);
            }, time);
        };
        el.addEventListener("click", el.__handleClick__);
    },
    beforeUnmount(el) {
        el.removeEventListener("click", el.__handleClick__);
        if (el.__throttleTimer__) {
            clearTimeout(el.__throttleTimer__);
            el.__throttleTimer__ = null;
        }
    },
};
export default throttle;
