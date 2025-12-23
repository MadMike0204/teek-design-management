/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useRouter } from "vue-router";
defineOptions({ name: "Redirect" });
const { currentRoute, replace } = useRouter();
const { params, query } = currentRoute.value;
const { path } = params;
/**
 * 重定向路径
 */
const _path = Array.isArray(path) ? path.join("/") : path;
replace({ path: "/" + _path, query });
const __VLS_ctx = {};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div)({});
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
