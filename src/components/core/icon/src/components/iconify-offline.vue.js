/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { onMounted, useId } from "vue";
import { Icon, addIcon } from "@iconify/vue";
defineOptions({ name: "IconifyOffline" });
const props = defineProps();
onMounted(() => {
    const id = useId();
    addIcon(`iconify-${id}`, props.icon);
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    icon: __VLS_ctx.icon,
    ...{ style: ({ outline: 'none' }) },
}));
const __VLS_2 = __VLS_1({
    icon: __VLS_ctx.icon,
    ...{ style: ({ outline: 'none' }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
(__VLS_ctx.$attrs);
var __VLS_5 = {};
var __VLS_3;
// @ts-ignore
[icon, $attrs,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
