/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { storeToRefs } from "pinia";
import { useSettingStore } from "@/pinia";
import { useCommon, useNamespace } from "@/composables";
import Breadcrumb from "./components/breadcrumb/index.vue";
import Refresh from "./components/refresh/index.vue";
import CollapseTrigger from "./components/collapse-trigger/index.vue";
defineOptions({ name: "HeaderLeft" });
const ns = useNamespace("header-left");
const settingStore = useSettingStore();
const { breadcrumb, widget } = storeToRefs(settingStore);
const { isMobile } = useCommon();
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.b()) },
    ...{ class: "flx-center" },
});
/** @type {__VLS_StyleScopedClasses['flx-center']} */ ;
if (__VLS_ctx.widget.menuCollapse) {
    const __VLS_0 = CollapseTrigger;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
if (__VLS_ctx.widget.refresh) {
    const __VLS_5 = Refresh;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
    const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
if (__VLS_ctx.breadcrumb.enabled && !__VLS_ctx.isMobile) {
    const __VLS_10 = Breadcrumb;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({}));
    const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
}
// @ts-ignore
[ns, widget, widget, breadcrumb, isMobile,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
