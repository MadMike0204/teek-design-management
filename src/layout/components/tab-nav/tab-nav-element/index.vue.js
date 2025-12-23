/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { onMounted, watch, useTemplateRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElTabs, ElTabPane } from "element-plus";
import { addUnit, removeUnit, isString, openRouteInNewWindow } from "@/common/utils";
import { useCommon, useNamespace } from "@/composables";
import { useSettingStore } from "@/pinia";
import { useTabNav } from "../use-tab-nav";
import RightMenu from "../components/right-menu/index.vue";
import MoreButton from "../components/more-button/index.vue";
import "./index.scss";
defineOptions({ name: "ElTabNav" });
const ns = useNamespace("el-tabs-nav");
const { getTitle } = useCommon();
const route = useRoute();
const router = useRouter();
const settingStore = useSettingStore();
const { tabNav } = storeToRefs(settingStore);
const { activeTab, rightMenuActiveTab, tabNavList, rightMenuVisible, contextMenuCondition, rightMenuLeft, rightMenuTop, tabsDragSort, initAffixTabs, addTabByRoute, closeTab, openRightMenu, } = useTabNav();
const tabNavInstance = useTemplateRef(__VLS_placeholder); // 导航栏标签
const elTabsInstance = useTemplateRef("elTabsInstance"); // 导航栏标签
// 监听路由的变化
watch(() => route.fullPath, () => {
    if (route.meta.isFull)
        return;
    addTabByRoute();
});
// Tab 点击回调
const tabClick = (tabItem) => {
    const path = tabItem.paneName;
    router.push(path);
};
// Tab 鼠标中键点击回调
const tabMiddleClick = (tab) => {
    if (tabNav.value.middleClickToOpenInNewWindow)
        return openRouteInNewWindow(tab.path);
    if (tabNav.value.middleClickToOpen)
        return router.push(tab.path);
    if (tabNav.value.middleClickToClose)
        tabRemove(tab.path);
};
// 删除一个 Tab
const tabRemove = async (path) => {
    const tab = tabNavList.value.find(item => item.path === path);
    if (tab)
        closeTab(tab);
};
// 鼠标中键滚动回调
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
const handleScroll = (offset) => {
    const navContainerDom = elTabsInstance.value?.$el.querySelector(ns.joinEl("tabs__nav-scroll"));
    const tabListDom = elTabsInstance.value?.tabNavRef?.tabListRef;
    if (!navContainerDom || !tabListDom)
        return;
    const tabNavWidth = navContainerDom.offsetWidth;
    const canScrollWidth = tabListDom?.offsetWidth;
    // 没有超出标签栏宽度则不需要滚动
    if (tabNavWidth >= canScrollWidth) {
        tabListDom.style.transform = `translateX(0px)`;
        return;
    }
    // 获取当前偏移量
    const currentOffset = removeUnit(tabListDom?.style.transform.match(/translateX\((.+)\)/)?.[1]) || 0;
    // 偏移量最大值为 0，从 0 开始，向右移动时偏移量越来越小（负数），等于 标签栏宽度 - 可以滚动的宽度（负数所以反着减） 到达最有边界，向左移动时偏移量越接近 0，等于 0 则到达最左边界
    const newOffset = Math.max(Math.min(currentOffset + offset, 0), tabNavWidth - canScrollWidth);
    tabListDom.style.transform = `translateX(${addUnit(newOffset)})`;
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
    tabNav.value.draggable && tabsDragSort(`.${ns.elNamespace}-tabs__nav`, `.${ns.elNamespace}-tabs__item`);
    initAffixTabs();
    addTabByRoute();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "tabNavInstance",
    ...{ class: (__VLS_ctx.ns.b()) },
    ...{ class: "tab-nav" },
});
/** @type {__VLS_StyleScopedClasses['tab-nav']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('content')) },
    ...{ class: "flx-align-center" },
});
/** @type {__VLS_StyleScopedClasses['flx-align-center']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elTabs | typeof ___VLS_components.ElTabs} */
elTabs;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onTabClick': {} },
    ...{ 'onTabRemove': {} },
    ...{ 'onDOMMouseScroll': {} },
    ...{ 'onMousewheel': {} },
    ...{ 'onTouchstart': {} },
    ...{ 'onTouchmove': {} },
    ref: "elTabsInstance",
    modelValue: (__VLS_ctx.activeTab.path),
    type: "card",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onTabClick': {} },
    ...{ 'onTabRemove': {} },
    ...{ 'onDOMMouseScroll': {} },
    ...{ 'onMousewheel': {} },
    ...{ 'onTouchstart': {} },
    ...{ 'onTouchmove': {} },
    ref: "elTabsInstance",
    modelValue: (__VLS_ctx.activeTab.path),
    type: "card",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ tabClick: {} },
    { onTabClick: (__VLS_ctx.tabClick) });
const __VLS_7 = ({ tabRemove: {} },
    { onTabRemove: (__VLS_ctx.tabRemove) });
const __VLS_8 = ({ DOMMouseScroll: {} },
    { onDOMMouseScroll: (__VLS_ctx.handleScrollOnDom) });
const __VLS_9 = ({ mousewheel: {} },
    { onMousewheel: (__VLS_ctx.handleScrollOnDom) });
const __VLS_10 = ({ touchstart: {} },
    { onTouchstart: (__VLS_ctx.handleTouchStart) });
const __VLS_11 = ({ touchmove: {} },
    { onTouchmove: (__VLS_ctx.handleTouchMove) });
var __VLS_12 = {};
const { default: __VLS_14 } = __VLS_3.slots;
for (const [tab, index] of __VLS_getVForSourceType((__VLS_ctx.tabNavList))) {
    let __VLS_15;
    /** @ts-ignore @type {typeof ___VLS_components.elTabPane | typeof ___VLS_components.ElTabPane} */
    elTabPane;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        key: (index),
        label: (tab.title),
        name: (tab.path),
        closable: (tab.close),
    }));
    const __VLS_17 = __VLS_16({
        key: (index),
        label: (tab.title),
        name: (tab.path),
        closable: (tab.close),
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_20 } = __VLS_18.slots;
    {
        const { label: __VLS_21 } = __VLS_18.slots;
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (...[$event]) => {
                    __VLS_ctx.tabMiddleClick(tab);
                    // @ts-ignore
                    [ns, ns, activeTab, tabClick, tabRemove, handleScrollOnDom, handleScrollOnDom, handleTouchStart, handleTouchMove, tabNavList, tabMiddleClick,];
                } },
            ...{ onContextmenu: (...[$event]) => {
                    __VLS_ctx.openRightMenu($event, tab, tabNavInstance.value);
                    // @ts-ignore
                    [openRightMenu,];
                } },
        });
        if (tab.meta.icon &&
            __VLS_ctx.tabNav.showIcon &&
            (!__VLS_ctx.isString(tab.meta.icon) && '__name' in tab.meta.icon ? 'setup' in tab.meta.icon : true)) {
            let __VLS_22;
            /** @ts-ignore @type {typeof ___VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
                icon: (tab.meta.icon),
                ...{ class: (__VLS_ctx.ns.em('content', 'icon')) },
            }));
            const __VLS_24 = __VLS_23({
                icon: (tab.meta.icon),
                ...{ class: (__VLS_ctx.ns.em('content', 'icon')) },
            }, ...__VLS_functionalComponentArgsRest(__VLS_23));
        }
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (__VLS_ctx.getTitle(tab));
        // @ts-ignore
        [ns, tabNav, isString, getTitle,];
    }
    // @ts-ignore
    [];
    var __VLS_18;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
const __VLS_27 = MoreButton;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({}));
const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
__VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.tabNav.showMore) }, null, null);
let __VLS_32;
/** @ts-ignore @type {typeof ___VLS_components.transition | typeof ___VLS_components.Transition} */
transition;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    name: (`${__VLS_ctx.ns.elNamespace}-zoom-in-top`),
}));
const __VLS_34 = __VLS_33({
    name: (`${__VLS_ctx.ns.elNamespace}-zoom-in-top`),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const { default: __VLS_37 } = __VLS_35.slots;
const __VLS_38 = RightMenu;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    modelValue: (__VLS_ctx.rightMenuVisible),
    selectedTab: (__VLS_ctx.rightMenuActiveTab),
    left: (__VLS_ctx.rightMenuLeft),
    top: (__VLS_ctx.rightMenuTop),
    condition: (__VLS_ctx.contextMenuCondition),
}));
const __VLS_40 = __VLS_39({
    modelValue: (__VLS_ctx.rightMenuVisible),
    selectedTab: (__VLS_ctx.rightMenuActiveTab),
    left: (__VLS_ctx.rightMenuLeft),
    top: (__VLS_ctx.rightMenuTop),
    condition: (__VLS_ctx.contextMenuCondition),
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
// @ts-ignore
[ns, tabNav, rightMenuVisible, rightMenuActiveTab, rightMenuLeft, rightMenuTop, contextMenuCondition,];
var __VLS_35;
// @ts-ignore
var __VLS_13 = __VLS_12;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
