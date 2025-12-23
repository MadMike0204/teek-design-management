/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useNamespace } from "@/composables";
defineOptions({ name: "PointTag" });
const ns = useNamespace("point-tag");
const __VLS_props = withDefaults(defineProps(), {
    color: "",
    type: "primary",
    size: 8,
    position: "left",
    offset: 4,
    text: "",
});
const __VLS_defaults = {
    color: "",
    type: "primary",
    size: 8,
    position: "left",
    offset: 4,
    text: "",
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (__VLS_ctx.text || __VLS_ctx.$slots['default']) {
    if (__VLS_ctx.position === 'right') {
        var __VLS_0 = {};
        (__VLS_ctx.text);
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.i)({
        ...{ class: ([__VLS_ctx.ns.b(), __VLS_ctx.ns.is(__VLS_ctx.position), __VLS_ctx.ns.is(__VLS_ctx.type, !__VLS_ctx.color)]) },
        ...{ style: ({ '--point-color': __VLS_ctx.color, '--point-size': __VLS_ctx.size, '--point-offset': __VLS_ctx.offset }) },
    });
    if (__VLS_ctx.position === 'left') {
        var __VLS_2 = {};
        (__VLS_ctx.text);
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.i)({
        ...{ class: ([__VLS_ctx.ns.b(), __VLS_ctx.ns.is(__VLS_ctx.position), __VLS_ctx.ns.is(__VLS_ctx.type, !__VLS_ctx.color)]) },
        ...{ style: ({ '--point-color': __VLS_ctx.color, '--point-size': __VLS_ctx.size, '--point-offset': __VLS_ctx.offset }) },
    });
}
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
// @ts-ignore
[text, text, text, $slots, position, position, position, position, ns, ns, ns, ns, ns, ns, type, type, color, color, color, color, size, size, offset, offset,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
