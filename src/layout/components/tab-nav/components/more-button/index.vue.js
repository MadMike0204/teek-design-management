/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { unref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDebounceFn } from "@vueuse/core";
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton } from "element-plus";
import { ArrowDown, Refresh, FullScreen, TopRight, Close, ArrowLeft, ArrowRight, SemiSelect, CircleClose, Lock, Unlock, } from "@element-plus/icons-vue";
import { openRouteInNewWindow } from "@/common/utils";
import { useSettingStore } from "@/pinia";
import { useTabNav } from "../../use-tab-nav";
defineOptions({ name: "TabNavButton" });
const { tabNavList, activeTab, contextMenuCondition: condition, initContextMenu, refreshSelectedTab, toggleFixed, closeTab, closeLeftTab, closeRightTab, closeOthersTabs, closeAllTabs, } = useTabNav();
const settingStore = useSettingStore();
const { t } = useI18n();
const expandDropdown = () => {
    useDebounceFn(() => {
        initContextMenu(activeTab.value);
    }, 100)();
};
const triggerMaximize = () => {
    settingStore.$patch({ layout: { maximize: true } });
};
const dropdownMenuItem = [
    {
        label: t("_tabNav.refresh"),
        icon: Refresh,
        disabled: computed(() => !condition.refresh),
        click: () => refreshSelectedTab(activeTab.value),
    },
    {
        label: computed(() => (activeTab.value.close ? t("_tabNav.fixed") : t("_tabNav.unfixed"))),
        icon: computed(() => (activeTab.value.close ? Lock : Unlock)),
        disabled: computed(() => tabNavList.value.length <= 1),
        click: () => toggleFixed(activeTab.value.path),
    },
    {
        label: t("_tabNav.maximize"),
        icon: FullScreen,
        click: triggerMaximize,
    },
    {
        label: t("_tabNav.openInNewTab"),
        icon: TopRight,
        click: () => openRouteInNewWindow(activeTab.value.path),
    },
    {
        label: t("_tabNav.closeCurrent"),
        icon: Close,
        disabled: computed(() => !condition.current),
        click: () => closeTab(activeTab.value),
        divided: true,
    },
    {
        label: t("_tabNav.closeLeft"),
        icon: ArrowLeft,
        disabled: computed(() => !condition.left),
        click: () => closeLeftTab(activeTab.value),
    },
    {
        label: t("_tabNav.closeRight"),
        icon: ArrowRight,
        disabled: computed(() => !condition.right),
        click: () => closeRightTab(activeTab.value),
    },
    {
        label: t("_tabNav.closeOthers"),
        icon: SemiSelect,
        disabled: computed(() => !condition.other),
        click: () => closeOthersTabs(activeTab.value),
    },
    {
        label: t("_tabNav.closeAll"),
        icon: CircleClose,
        disabled: computed(() => !condition.all),
        click: () => closeAllTabs(),
    },
];
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elDropdown | typeof ___VLS_components.ElDropdown} */
elDropdown;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    trigger: "click",
    teleported: (false),
}));
const __VLS_2 = __VLS_1({
    trigger: "click",
    teleported: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    ...{ 'onClick': {} },
    text: true,
    size: "small",
}));
const __VLS_9 = __VLS_8({
    ...{ 'onClick': {} },
    text: true,
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_12;
const __VLS_13 = ({ click: {} },
    { onClick: (__VLS_ctx.expandDropdown) });
const { default: __VLS_14 } = __VLS_10.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_tabNav.more"));
let __VLS_15;
/** @ts-ignore @type {typeof ___VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    ...{ class: "el-icon--right" },
}));
const __VLS_17 = __VLS_16({
    ...{ class: "el-icon--right" },
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
/** @type {__VLS_StyleScopedClasses['el-icon--right']} */ ;
const { default: __VLS_20 } = __VLS_18.slots;
let __VLS_21;
/** @ts-ignore @type {typeof ___VLS_components.ArrowDown} */
ArrowDown;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
// @ts-ignore
[expandDropdown, $t,];
var __VLS_18;
// @ts-ignore
[];
var __VLS_10;
var __VLS_11;
{
    const { dropdown: __VLS_26 } = __VLS_3.slots;
    let __VLS_27;
    /** @ts-ignore @type {typeof ___VLS_components.elDropdownMenu | typeof ___VLS_components.ElDropdownMenu} */
    elDropdownMenu;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({}));
    const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
    const { default: __VLS_32 } = __VLS_30.slots;
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.dropdownMenuItem))) {
        let __VLS_33;
        /** @ts-ignore @type {typeof ___VLS_components.elDropdownItem | typeof ___VLS_components.ElDropdownItem} */
        elDropdownItem;
        // @ts-ignore
        const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
            ...{ 'onClick': {} },
            key: (__VLS_ctx.unref(item.label)),
            divided: (item.divided ?? false),
            disabled: (__VLS_ctx.unref(item.disabled)),
            icon: (__VLS_ctx.unref(item.icon)),
        }));
        const __VLS_35 = __VLS_34({
            ...{ 'onClick': {} },
            key: (__VLS_ctx.unref(item.label)),
            divided: (item.divided ?? false),
            disabled: (__VLS_ctx.unref(item.disabled)),
            icon: (__VLS_ctx.unref(item.icon)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_34));
        let __VLS_38;
        const __VLS_39 = ({ click: {} },
            { onClick: (item.click) });
        const { default: __VLS_40 } = __VLS_36.slots;
        (__VLS_ctx.unref(item.label));
        // @ts-ignore
        [dropdownMenuItem, unref, unref, unref, unref,];
        var __VLS_36;
        var __VLS_37;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_30;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
