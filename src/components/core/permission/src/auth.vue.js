/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { usePermission } from "@/composables";
defineOptions({ name: "Auth" });
const __VLS_props = withDefaults(defineProps(), {
    value: "",
});
const { hasAuth } = usePermission();
const __VLS_defaults = {
    value: "",
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (__VLS_ctx.hasAuth(__VLS_ctx.value)) {
    var __VLS_0 = {};
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[hasAuth, value,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
