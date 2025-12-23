/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { Setting } from "@element-plus/icons-vue";
import { LayoutModeEnum, ThemePanelTriggerPositionEnum } from "@/common/enums";
import { useCommon, useMittBus, useUpgrade } from "@/composables";
import { useSettingStore } from "@/pinia";
import LockPanel from "./components/lock-panel/index.vue";
import ThemePanel from "./components/theme-panel/index.vue";
import Watermark from "./components/watermark/index.vue";
import LayoutVertical from "./layout-vertical/index.vue";
import LayoutClassic from "./layout-classic/index.vue";
import LayoutHorizontal from "./layout-horizontal/index.vue";
import LayoutColumns from "./layout-columns/index.vue";
import LayoutMixins from "./layout-mixins/index.vue";
import LayoutIFrame from "./layout-iframe/index.vue";
import "./base-layout.scss";
defineOptions({ name: "Layout" });
// 布局组件
const LayoutComponents = {
    [LayoutModeEnum.Vertical]: LayoutVertical,
    [LayoutModeEnum.Classic]: LayoutClassic,
    [LayoutModeEnum.Horizontal]: LayoutHorizontal,
    [LayoutModeEnum.Columns]: LayoutColumns,
    [LayoutModeEnum.Mixins]: LayoutMixins,
    [LayoutModeEnum.IFrame]: LayoutIFrame,
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
const __VLS_0 = (__VLS_ctx.LayoutComponents[__VLS_ctx.layout.layoutMode]);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_5 = ThemePanel;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const __VLS_10 = LockPanel;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({}));
const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const __VLS_15 = Watermark;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({}));
const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
if (__VLS_ctx.showThemePanelTrigger) {
    let __VLS_20;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ class: "theme-panel__trigger" },
    }));
    const __VLS_22 = __VLS_21({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ class: "theme-panel__trigger" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    let __VLS_25;
    const __VLS_26 = ({ click: {} },
        { onClick: (__VLS_ctx.openThemePanel) });
    /** @type {__VLS_StyleScopedClasses['theme-panel__trigger']} */ ;
    const { default: __VLS_27 } = __VLS_23.slots;
    let __VLS_28;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        size: (20),
    }));
    const __VLS_30 = __VLS_29({
        size: (20),
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    const { default: __VLS_33 } = __VLS_31.slots;
    let __VLS_34;
    /** @ts-ignore @type {typeof ___VLS_components.Setting} */
    Setting;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({}));
    const __VLS_36 = __VLS_35({}, ...__VLS_functionalComponentArgsRest(__VLS_35));
    // @ts-ignore
    [LayoutComponents, layout, showThemePanelTrigger, openThemePanel,];
    var __VLS_31;
    // @ts-ignore
    [];
    var __VLS_23;
    var __VLS_24;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
