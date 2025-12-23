/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useFullscreen } from "@vueuse/core";
import { useNamespace } from "@/composables";
defineOptions({ name: "Fullscreen" });
const ns = useNamespace("fullscreen");
const { toggle, isFullscreen } = useFullscreen();
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.toggle) },
    ...{ class: (__VLS_ctx.ns.b()) },
});
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    icon: (__VLS_ctx.isFullscreen ? 'core-fullscreen-exit' : 'core-fullscreen'),
}));
const __VLS_2 = __VLS_1({
    icon: (__VLS_ctx.isFullscreen ? 'core-fullscreen-exit' : 'core-fullscreen'),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
// @ts-ignore
[toggle, ns, isFullscreen,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
