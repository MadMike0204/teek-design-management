/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed } from "vue";
defineOptions({ name: "SvgIcon" });
const props = withDefaults(defineProps(), {
    prefix: "icon",
});
const iconName = computed(() => `#${props.prefix}-${props.icon}`);
const iconClass = computed(() => {
    if (props.icon)
        return `svg-icon ${props.icon}`;
    return "svg-icon";
});
const __VLS_defaults = {
    prefix: "icon",
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: (__VLS_ctx.iconClass) },
    'aria-hidden': "true",
});
__VLS_asFunctionalElement(__VLS_intrinsics.use)({
    'xlink:href': (__VLS_ctx.iconName),
});
// @ts-ignore
[iconClass, iconName,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
