/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { TabNavElementModeEnum } from "@/common/enums";
import { useSettingStore } from "@/pinia";
import SimpleTabNav from "./tab-nav-simple/index.vue";
import ClassicTabNav from "./tab-nav-classic/index.vue";
import ElTabNav from "./tab-nav-element/index.vue";
defineOptions({ name: "TabNav" });
const settingStore = useSettingStore();
const { tabNav } = storeToRefs(settingStore);
// 标签栏组件
const TabNavComponents = {
    [TabNavElementModeEnum.Simple]: SimpleTabNav,
    [TabNavElementModeEnum.Classic]: ClassicTabNav,
    [TabNavElementModeEnum.Element]: ElTabNav,
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (__VLS_ctx.tabNav.enabled) {
    const __VLS_0 = (__VLS_ctx.TabNavComponents[__VLS_ctx.tabNav.elementMode]);
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5 = {};
    var __VLS_3;
}
// @ts-ignore
[tabNav, tabNav, TabNavComponents,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
