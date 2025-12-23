/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, onMounted, watch, nextTick, useTemplateRef } from "vue";
import { useRoute } from "vue-router";
import { ElButton } from "element-plus";
import { Close, ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { isString, openRouteInNewWindow } from "@/common/utils";
import { useNamespace, useCommon } from "@/composables";
import { useSettingStore } from "@/pinia";
import { useTabNav } from "../use-tab-nav";
import MoreButton from "../components/more-button/index.vue";
import RightMenu from "../components/right-menu/index.vue";
import "./index.scss";
defineOptions({ name: "ClassicTabNav" });
const __VLS_props = defineProps();
const { type = "classic" } = __VLS_props;
const ns = useNamespace("classic-tabs-nav");
const { getTitle } = useCommon();
const route = useRoute();
const settingStore = useSettingStore();
const router = useRouter();
const tabBodyLeft = ref(0); // tabNav 滚动
const hasScroll = ref(false); // 是否出现滚动条
const tabNavInstance = useTemplateRef(__VLS_placeholder); // 导航栏标签
const scrollContainerInstance = useTemplateRef(__VLS_placeholder); // 滚动栏标签
const scrollBodyInstance = useTemplateRef(__VLS_placeholder); // tabNav 滚动栏
const tabsInstance = useTemplateRef(__VLS_placeholder); // tab 标签
const { tabNav } = storeToRefs(settingStore);
const { rightMenuActiveTab, tabNavList, rightMenuVisible, contextMenuCondition, rightMenuLeft, rightMenuTop, isActive, tabsDragSort, initAffixTabs, addTabByRoute, openRightMenu, closeTab, } = useTabNav();
// 监听路由的变化
watch(() => route.fullPath, () => {
    if (route.meta.isFull)
        return;
    addTabByRoute();
    findTargetTab();
});
/**
 * 找出访问的目标 tab
 */
const findTargetTab = async () => {
    await nextTick();
    if (!tabsInstance.value || !tabsInstance.value.length)
        return;
    const targetTab = tabsInstance.value.find(tab => route.path === tab.getAttribute("to"));
    targetTab && moveToTargetTab(targetTab);
};
/**
 * 移动到目标 tab，如果目标 tab 在 TabNav 可视区域外面，则有滚动的动画效果
 */
const moveToTargetTab = (tabElement) => {
    const outerWidth = scrollContainerInstance.value?.offsetWidth || 0;
    const bodyWidth = scrollBodyInstance.value?.offsetWidth || 0;
    hasScroll.value = bodyWidth > outerWidth;
    if (bodyWidth <= outerWidth) {
        tabBodyLeft.value = 0;
        return;
    }
    const outerPadding = 4;
    const tabOffsetLeft = tabElement.offsetLeft;
    const tabWidth = tabElement.offsetWidth;
    const currentScrollLeft = -tabBodyLeft.value;
    // 可视区域右边界
    const visibleRightEdge = currentScrollLeft + outerWidth - outerPadding;
    // Tab 的右边界
    const tabRightEdge = tabOffsetLeft + tabWidth;
    // 如果 Tab 完全在可视区域内，无需滚动
    if (tabOffsetLeft >= currentScrollLeft && tabRightEdge <= visibleRightEdge)
        return;
    // Tab 在左侧不可见
    if (tabOffsetLeft < currentScrollLeft)
        tabBodyLeft.value = -tabOffsetLeft + outerPadding;
    // Tab 在右侧不可见
    else if (tabRightEdge > visibleRightEdge) {
        const newScrollLeft = tabRightEdge - outerWidth + outerPadding;
        tabBodyLeft.value = -newScrollLeft;
    }
};
// 鼠标点击回调
const handleClick = (tab, type) => {
    // 鼠标左侧点击
    if (type === "left")
        return router.push(tab.path);
    // 鼠标中键点击
    if (type === "middle") {
        if (tabNav.value.middleClickToOpenInNewWindow)
            return openRouteInNewWindow(tab.path);
        if (tabNav.value.middleClickToOpen)
            return router.push(tab.path);
        if (tabNav.value.middleClickToClose)
            return closeTab(tab);
    }
};
// 鼠标滚动回调
const handleScrollOnDom = (e) => {
    if (!tabNav.value.wheel)
        return;
    const type = e.type;
    let delta = 0;
    if (["DOMMouseScroll", "mousewheel"].includes(type)) {
        delta = e.wheelDelta ?? -(e.detail || 0) * 40;
    }
    handleScroll(delta);
};
// TagsNav 滚动回调
const handleScroll = (offset) => {
    const tabNavWidth = scrollContainerInstance.value?.offsetWidth;
    const canScrollWidth = scrollBodyInstance.value?.offsetWidth;
    // 没有超出标签栏宽度则不需要滚动
    if (tabNavWidth >= canScrollWidth) {
        tabBodyLeft.value = 0;
        return;
    }
    // 偏移量最大值为 0，从 0 开始，向右移动时偏移量越来越小（负数），等于 标签栏宽度 - 可以滚动的宽度（负数所以反着减） 到达最有边界，向左移动时偏移量越接近 0，等于 0 则到达最左边界
    const newLeft = tabBodyLeft.value + offset;
    tabBodyLeft.value = Math.max(Math.min(newLeft, 0), tabNavWidth - canScrollWidth);
};
// ---------- 移动端触屏滚动 ----------
let startX = 0;
const handleTouchStart = (event) => {
    const touch = event.touches[0];
    startX = touch.clientX;
};
const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const deltaX = touch.clientX - startX;
    handleScroll(deltaX);
    startX = touch.clientX;
};
onMounted(() => {
    tabNav.value.draggable && tabsDragSort(`.${ns.e("scroll-body")}`, `.${ns.e("tab")}`);
    initAffixTabs();
    addTabByRoute();
    const outerWidth = scrollContainerInstance.value?.offsetWidth || 0;
    const bodyWidth = scrollBodyInstance.value?.offsetWidth || 0;
    hasScroll.value = bodyWidth > outerWidth;
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "tabNavInstance",
    ...{ class: ([__VLS_ctx.ns.b(), __VLS_ctx.ns.is(type)]) },
    ...{ class: "flx-align-center tab-nav" },
});
/** @type {__VLS_StyleScopedClasses['flx-align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-nav']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: ([__VLS_ctx.ns.e('btn'), __VLS_ctx.ns.is('left')]) },
});
__VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.hasScroll) }, null, null);
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.handleScroll(240);
            // @ts-ignore
            [ns, ns, ns, ns, hasScroll, handleScroll,];
        } });
const { default: __VLS_7 } = __VLS_3.slots;
let __VLS_8;
/** @ts-ignore @type {typeof ___VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const { default: __VLS_13 } = __VLS_11.slots;
let __VLS_14;
/** @ts-ignore @type {typeof ___VLS_components.ArrowLeft} */
ArrowLeft;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
// @ts-ignore
[];
var __VLS_11;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('scroll')) },
    ref: "scrollContainerInstance",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onDOMMouseScroll: (__VLS_ctx.handleScrollOnDom) },
    ...{ onMousewheel: (__VLS_ctx.handleScrollOnDom) },
    ...{ onTouchstart: (__VLS_ctx.handleTouchStart) },
    ...{ onTouchmove: (__VLS_ctx.handleTouchMove) },
    ref: "scrollBodyInstance",
    ...{ class: (__VLS_ctx.ns.e('scroll-body')) },
    ...{ style: ({ left: __VLS_ctx.tabBodyLeft + 'px' }) },
});
for (const [tab, index] of __VLS_getVForSourceType((__VLS_ctx.tabNavList))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleClick(tab, 'left');
                // @ts-ignore
                [ns, ns, handleScrollOnDom, handleScrollOnDom, handleTouchStart, handleTouchMove, tabBodyLeft, tabNavList, handleClick,];
            } },
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleClick(tab, 'middle');
                // @ts-ignore
                [handleClick,];
            } },
        ...{ onContextmenu: (...[$event]) => {
                __VLS_ctx.openRightMenu($event, tab, tabNavInstance.value);
                // @ts-ignore
                [openRightMenu,];
            } },
        ref: "tabsInstance",
        key: (index),
        to: (tab.path),
        ...{ class: ([__VLS_ctx.ns.e('tab'), __VLS_ctx.ns.is('active', __VLS_ctx.isActive(tab))]) },
    });
    if (tab.meta.icon &&
        __VLS_ctx.tabNav.showIcon &&
        (!__VLS_ctx.isString(tab.meta.icon) && '__name' in tab.meta.icon ? 'setup' in tab.meta.icon : true)) {
        let __VLS_19;
        /** @ts-ignore @type {typeof ___VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
            icon: (tab.meta.icon),
            ...{ class: (__VLS_ctx.ns.em('tab', 'icon')) },
        }));
        const __VLS_21 = __VLS_20({
            icon: (tab.meta.icon),
            ...{ class: (__VLS_ctx.ns.em('tab', 'icon')) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    }
    else if (__VLS_ctx.tabNav.showDot || !tab.meta.icon) {
        __VLS_asFunctionalElement(__VLS_intrinsics.span)({
            ...{ class: "dot" },
        });
        /** @type {__VLS_StyleScopedClasses['dot']} */ ;
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.getTitle(tab));
    if (tab.close && __VLS_ctx.tabNavList.length !== 1) {
        let __VLS_24;
        /** @ts-ignore @type {typeof ___VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
            ...{ 'onClick': {} },
            ...{ class: "icon-close" },
        }));
        const __VLS_26 = __VLS_25({
            ...{ 'onClick': {} },
            ...{ class: "icon-close" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        let __VLS_29;
        const __VLS_30 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(tab.close && __VLS_ctx.tabNavList.length !== 1))
                        return;
                    __VLS_ctx.closeTab(tab);
                    // @ts-ignore
                    [ns, ns, ns, tabNavList, isActive, tabNav, tabNav, isString, getTitle, closeTab,];
                } });
        /** @type {__VLS_StyleScopedClasses['icon-close']} */ ;
        const { default: __VLS_31 } = __VLS_27.slots;
        let __VLS_32;
        /** @ts-ignore @type {typeof ___VLS_components.Close} */
        Close;
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
        const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
        // @ts-ignore
        [];
        var __VLS_27;
        var __VLS_28;
    }
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: ([__VLS_ctx.ns.e('btn'), __VLS_ctx.ns.is('right')]) },
});
__VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.hasScroll) }, null, null);
let __VLS_37;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_39 = __VLS_38({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
let __VLS_42;
const __VLS_43 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.handleScroll(-240);
            // @ts-ignore
            [ns, ns, hasScroll, handleScroll,];
        } });
const { default: __VLS_44 } = __VLS_40.slots;
let __VLS_45;
/** @ts-ignore @type {typeof ___VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({}));
const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_50 } = __VLS_48.slots;
let __VLS_51;
/** @ts-ignore @type {typeof ___VLS_components.ArrowRight} */
ArrowRight;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({}));
const __VLS_53 = __VLS_52({}, ...__VLS_functionalComponentArgsRest(__VLS_52));
// @ts-ignore
[];
var __VLS_48;
// @ts-ignore
[];
var __VLS_40;
var __VLS_41;
const __VLS_56 = MoreButton;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({}));
const __VLS_58 = __VLS_57({}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.tabNav.showMore) }, null, null);
let __VLS_61;
/** @ts-ignore @type {typeof ___VLS_components.transition | typeof ___VLS_components.Transition} */
transition;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    name: (`${__VLS_ctx.ns.elNamespace}-zoom-in-top`),
}));
const __VLS_63 = __VLS_62({
    name: (`${__VLS_ctx.ns.elNamespace}-zoom-in-top`),
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
const { default: __VLS_66 } = __VLS_64.slots;
const __VLS_67 = RightMenu;
// @ts-ignore
const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
    modelValue: (__VLS_ctx.rightMenuVisible),
    selectedTab: (__VLS_ctx.rightMenuActiveTab),
    left: (__VLS_ctx.rightMenuLeft),
    top: (__VLS_ctx.rightMenuTop),
    condition: (__VLS_ctx.contextMenuCondition),
}));
const __VLS_69 = __VLS_68({
    modelValue: (__VLS_ctx.rightMenuVisible),
    selectedTab: (__VLS_ctx.rightMenuActiveTab),
    left: (__VLS_ctx.rightMenuLeft),
    top: (__VLS_ctx.rightMenuTop),
    condition: (__VLS_ctx.contextMenuCondition),
}, ...__VLS_functionalComponentArgsRest(__VLS_68));
// @ts-ignore
[ns, tabNav, rightMenuVisible, rightMenuActiveTab, rightMenuLeft, rightMenuTop, contextMenuCondition,];
var __VLS_64;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
