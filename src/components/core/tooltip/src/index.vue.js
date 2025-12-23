/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, computed, onMounted, onBeforeUnmount, watch, useTemplateRef, useAttrs } from "vue";
import { storeToRefs } from "pinia";
import { ElTooltip } from "element-plus";
import { useResizeObserver } from "@vueuse/core";
import { useSettingStore } from "@/pinia";
import { serviceConfig } from "@/common/config";
import { isFunction } from "@/common/utils";
defineOptions({ name: "Tooltip" });
const props = withDefaults(defineProps(), {
    line: 1,
    realTime: false,
    maxTry: 3,
});
const containerInstance = useTemplateRef("containerInstance"); // 容器引用
const showTip = ref(false); // 是否显示tooltip
const contentText = ref(""); // 文本内容
const tryCount = ref(0); // 当前尝试次数
const attrs = useAttrs();
const { isDark } = storeToRefs(useSettingStore());
const effect = computed(() => {
    const effect = serviceConfig.layout.tooltipEffect;
    if (isFunction(effect))
        return effect(isDark.value);
    return effect;
});
// 容器 class
const containerClass = computed(() => {
    return props.line === 1 ? "single-line" : "multi-line";
});
const style = computed(() => {
    const style = attrs.style;
    return props.line > 1 ? { "-webkit-line-clamp": props.line, ...style } : style;
});
/**
 * 获取元素的文本内容
 */
const getTextContent = (element) => {
    if (!element)
        return "";
    return element.textContent || element.innerText || "";
};
/**
 * 检测是否溢出
 */
const checkOverflow = () => {
    if (!containerInstance.value)
        return;
    const container = containerInstance.value;
    contentText.value = getTextContent(container);
    if (props.line === 1) {
        // 单行检测：比较内容宽度与容器宽度
        showTip.value = container.scrollWidth > container.offsetWidth;
    }
    else {
        /// 多行检测：精确比较内容高度与容器高度
        const computedStyle = getComputedStyle(container);
        const lineHeightStr = computedStyle.lineHeight;
        let lineHeight;
        // 处理 line-height 为 normal 的情况（使用默认 1.2 倍）
        if (lineHeightStr === "normal") {
            const fontSize = parseFloat(computedStyle.fontSize);
            lineHeight = fontSize * 1.2;
        }
        else
            lineHeight = parseFloat(lineHeightStr);
        // 计算最大允许高度（考虑整数像素边界问题）
        const maxHeight = Math.ceil(lineHeight * props.line);
        const scrollHeight = Math.ceil(container.scrollHeight);
        // 精确判断：内容高度必须严格超过最大允许高度（临界点处理）
        showTip.value = scrollHeight > maxHeight + 1;
    }
    // 更新尝试次数
    if (!props.realTime && props.maxTry > 0 && !showTip.value)
        tryCount.value++;
};
/**
 * 处理鼠标悬停事件
 */
const handleMouseOver = () => {
    if (!props.realTime && props.maxTry > 0 && tryCount.value < props.maxTry)
        checkOverflow();
};
/**
 * 当realTime或maxTry变化时重置尝试次数
 */
watch(() => [props.realTime, props.maxTry], () => {
    tryCount.value = 0;
});
/**
 * 使用 ResizeObserver 监听尺寸变化
 */
useResizeObserver(containerInstance, () => {
    if (props.realTime)
        checkOverflow();
});
onMounted(() => {
    // 初始检测
    checkOverflow();
    // 非实时模式下添加鼠标事件
    if (!props.realTime && props.maxTry > 0) {
        containerInstance.value?.addEventListener("mouseover", handleMouseOver);
    }
});
onBeforeUnmount(() => {
    // 清除事件监听
    if (!props.realTime && props.maxTry > 0) {
        containerInstance.value?.removeEventListener("mouseover", handleMouseOver);
    }
});
const __VLS_defaults = {
    line: 1,
    realTime: false,
    maxTry: 3,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (__VLS_ctx.showTip) {
    let __VLS_0;
    /** @ts-ignore @type {typeof ___VLS_components.elTooltip | typeof ___VLS_components.ElTooltip} */
    elTooltip;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        effect: __VLS_ctx.effect,
        ...({ ...__VLS_ctx.attrs, class: '', style: '' }),
        disabled: (!__VLS_ctx.showTip),
        content: (__VLS_ctx.contentText),
    }));
    const __VLS_2 = __VLS_1({
        effect: __VLS_ctx.effect,
        ...({ ...__VLS_ctx.attrs, class: '', style: '' }),
        disabled: (!__VLS_ctx.showTip),
        content: (__VLS_ctx.contentText),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5 = {};
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ref: "containerInstance",
        ...{ class: ([__VLS_ctx.containerClass, __VLS_ctx.attrs.class]) },
        ...{ style: (__VLS_ctx.style) },
    });
    var __VLS_7 = {};
    // @ts-ignore
    [showTip, showTip, effect, attrs, attrs, contentText, containerClass, style,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ref: "containerInstance",
        ...{ class: (__VLS_ctx.containerClass) },
        ...{ style: (__VLS_ctx.style) },
    });
    var __VLS_9 = {};
}
// @ts-ignore
var __VLS_8 = __VLS_7, __VLS_10 = __VLS_9;
// @ts-ignore
[containerClass, style,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
