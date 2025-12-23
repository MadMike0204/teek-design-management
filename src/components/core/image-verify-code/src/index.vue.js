/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { watch } from "vue";
import { useImageVerify } from "./use-image-verify";
defineOptions({ name: "ImageVerifyCode" });
const { domInstance, imgCode, setImgCode, getImgCode } = useImageVerify();
const code = defineModel({ required: true });
watch(code, newValue => {
    setImgCode(newValue);
});
watch(imgCode, newValue => {
    code.value = newValue;
});
const __VLS_exposed = { getImgCode };
defineExpose(__VLS_exposed);
const __VLS_modelEmit = defineEmits();
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.canvas)({
    ...{ onClick: (__VLS_ctx.getImgCode) },
    ref: "domInstance",
    width: "120",
    height: "40",
    ...{ class: "cursor-pointer" },
});
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
// @ts-ignore
[getImgCode,];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
});
export default {};
