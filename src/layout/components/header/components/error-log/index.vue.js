/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useRoute, useRouter } from "vue-router";
import { ElBadge } from "element-plus";
import { useNamespace } from "@/composables";
defineOptions({ name: "ErrorLog" });
const ns = useNamespace("error-badge");
const route = useRoute();
const router = useRouter();
const props = defineProps();
/**
 * 打开错误日志页面
 */
const openErrorLogger = () => {
    if (route.path !== "/error-log")
        router.push("/error-log");
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elBadge | typeof ___VLS_components.ElBadge} */
elBadge;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: (__VLS_ctx.ns.b()) },
    value: (props.errorCount),
    max: (99),
    hidden: (props.errorCount === 0),
}));
const __VLS_2 = __VLS_1({
    ...{ class: (__VLS_ctx.ns.b()) },
    value: (props.errorCount),
    max: (99),
    hidden: (props.errorCount === 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type {typeof ___VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    ...{ 'onClick': {} },
    icon: "core-bug",
}));
const __VLS_9 = __VLS_8({
    ...{ 'onClick': {} },
    icon: "core-bug",
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_12;
const __VLS_13 = ({ click: {} },
    { onClick: (__VLS_ctx.openErrorLogger) });
var __VLS_10;
var __VLS_11;
// @ts-ignore
[ns, openErrorLogger,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
