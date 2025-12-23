/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { serviceConfig } from "@/common/config";
import { useNamespace } from "@/composables";
import { useSettingStore } from "@/pinia";
import "./index.scss";
defineOptions({ name: "Watermark" });
const ns = useNamespace("watermark");
const settingStore = useSettingStore();
const { layout } = storeToRefs(settingStore);
const watermark = serviceConfig.layout.name;
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (__VLS_ctx.layout.watermark) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.ns.b()) },
    });
    let __VLS_0;
    /** @ts-ignore @type {typeof ___VLS_components.elWatermark | typeof ___VLS_components.ElWatermark} */
    elWatermark;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        content: (__VLS_ctx.watermark),
    }));
    const __VLS_2 = __VLS_1({
        content: (__VLS_ctx.watermark),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const { default: __VLS_5 } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    // @ts-ignore
    [layout, ns, watermark,];
    var __VLS_3;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
