/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { RefreshRight } from "@element-plus/icons-vue";
import { useNamespace, useMittBus } from "@/composables";
defineOptions({ name: "Refresh" });
const ns = useNamespace("refresh");
const { refreshPage, refreshIFrame } = useMittBus();
const route = useRoute();
const handleRefresh = () => {
    route.meta?.iframeSrc ? refreshIFrame() : refreshPage();
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.handleRefresh) },
    ...{ class: (__VLS_ctx.ns.b()) },
    ...{ class: "flx-center" },
});
/** @type {__VLS_StyleScopedClasses['flx-center']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    icon: (__VLS_ctx.RefreshRight),
}));
const __VLS_2 = __VLS_1({
    icon: (__VLS_ctx.RefreshRight),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
// @ts-ignore
var __VLS_6 = __VLS_5;
// @ts-ignore
[handleRefresh, ns, RefreshRight,];
const __VLS_base = (await import('vue')).defineComponent({});
const __VLS_export = {};
export default {};
