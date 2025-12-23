/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useMittBus, useNamespace } from "@/composables";
import "./input.scss";
defineOptions({ name: "GlobalSearchInput" });
const ns = useNamespace("global-search-input");
const { openSearchDialog } = useMittBus();
const isWindows = navigator.userAgent.includes("Windows");
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.b()) },
    ...{ class: "customize" },
});
/** @type {__VLS_StyleScopedClasses['customize']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.openSearchDialog) },
    ...{ class: (__VLS_ctx.ns.e('input')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('content')) },
    ...{ class: "flx-align-center" },
});
/** @type {__VLS_StyleScopedClasses['flx-align-center']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    icon: "core-search",
    size: (17),
}));
const __VLS_2 = __VLS_1({
    icon: "core-search",
    size: (17),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_headerBar.search"));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('keydown')) },
});
if (__VLS_ctx.isWindows) {
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
else {
    let __VLS_5;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        icon: "core-command",
        size: (13),
    }));
    const __VLS_7 = __VLS_6({
        icon: "core-command",
        size: (13),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[ns, ns, ns, ns, openSearchDialog, $t, isWindows,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
