/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useRouter } from "vue-router";
import { HOME_URL } from "@/common/config";
import { useNamespace } from "@/composables";
defineOptions({ name: "500" });
const ns = useNamespace("error-page");
const router = useRouter();
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
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    src: "@/common/assets/images/status/500.png",
    ...{ class: (__VLS_ctx.ns.e('img')) },
    alt: "500",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('detail')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.router.push(__VLS_ctx.HOME_URL);
            // @ts-ignore
            [ns, ns, ns, router, HOME_URL,];
        } });
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
