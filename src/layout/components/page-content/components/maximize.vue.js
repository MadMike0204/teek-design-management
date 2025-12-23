/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { Close } from "@element-plus/icons-vue";
import { useNamespace } from "@/composables";
import { useSettingStore } from "@/pinia";
defineOptions({ name: "CustomTransition" });
const ns = useNamespace("maximize");
const settingStore = useSettingStore();
/**
 * 退出最大化
 */
const exitMaximize = () => {
    settingStore.$patch({ layout: { maximize: false } });
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.exitMaximize) },
    ...{ class: (__VLS_ctx.ns.b()) },
});
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "close-icon" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "close-icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['close-icon']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type {typeof ___VLS_components.Close} */
Close;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
// @ts-ignore
[exitMaximize, ns,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
