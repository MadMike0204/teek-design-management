/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { defineAsyncComponent, watch } from "vue";
import { storeToRefs } from "pinia";
import { LayoutModeEnum, ThemePanelTriggerPositionEnum } from "@/common/enums";
import { useCommon, useUpgrade, useMittBus } from "@/composables";
import { useSettingStore } from "@/pinia";
import ThemePanel from "./components/theme-panel/index.vue";
import Watermark from "./components/watermark/index.vue";
import Loading from "./components/loading/index.vue";
import "./base-layout.scss";
defineOptions({ name: "Layout" });
// 布局组件
const LayoutComponents = {
    [LayoutModeEnum.Vertical]: defineAsyncComponent(() => import("./layout-vertical/index.vue")),
    [LayoutModeEnum.Classic]: defineAsyncComponent(() => import("./layout-classic/index.vue")),
    [LayoutModeEnum.Horizontal]: defineAsyncComponent(() => import("./layout-horizontal/index.vue")),
    [LayoutModeEnum.Columns]: defineAsyncComponent(() => import("./layout-columns/index.vue")),
    [LayoutModeEnum.Mixins]: defineAsyncComponent(() => import("./layout-mixins/index.vue")),
    [LayoutModeEnum.IFrame]: defineAsyncComponent(() => import("./layout-iframe/index.vue")),
};
const settingStore = useSettingStore();
const { layout, header } = storeToRefs(settingStore);
const { isMobile } = useCommon();
const { openThemePanel } = useMittBus();
// 系统版本升级
useUpgrade();
const showThemePanelTrigger = computed(() => {
    const { Header, Fixed } = ThemePanelTriggerPositionEnum;
    const { themePanelTriggerPosition } = layout.value;
    if (themePanelTriggerPosition === Fixed)
        return true;
    if (themePanelTriggerPosition === Header && header.value.enabled !== true)
        return true;
    return false;
});
// 移动端默认为 Vertical 布局
watch(isMobile, () => {
    settingStore.$patch({ layout: { layoutMode: LayoutModeEnum.Vertical } });
    settingStore.collapseSideMenu();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.suspense | typeof ___VLS_components.Suspense} */
suspense;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
{
    const { default: __VLS_6 } = __VLS_3.slots;
    const __VLS_7 = (__VLS_ctx.LayoutComponents[__VLS_ctx.layout.layoutMode]);
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    // @ts-ignore
    [LayoutComponents, layout,];
}
{
    const { fallback: __VLS_12 } = __VLS_3.slots;
    const __VLS_13 = Loading;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
const __VLS_18 = ThemePanel;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const __VLS_23 = Watermark;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({}));
const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
if (__VLS_ctx.showThemePanelTrigger) {
    let __VLS_28;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ class: "theme-panel__trigger" },
    }));
    const __VLS_30 = __VLS_29({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ class: "theme-panel__trigger" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    let __VLS_33;
    const __VLS_34 = ({ click: {} },
        { onClick: (__VLS_ctx.openThemePanel) });
    /** @type {__VLS_StyleScopedClasses['theme-panel__trigger']} */ ;
    const { default: __VLS_35 } = __VLS_31.slots;
    let __VLS_36;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        size: (20),
    }));
    const __VLS_38 = __VLS_37({
        size: (20),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    const { default: __VLS_41 } = __VLS_39.slots;
    let __VLS_42;
    /** @ts-ignore @type {typeof ___VLS_components.Setting} */
    Setting;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({}));
    const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
    // @ts-ignore
    [showThemePanelTrigger, openThemePanel,];
    var __VLS_39;
    // @ts-ignore
    [];
    var __VLS_31;
    var __VLS_32;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
