/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, reactive, inject, useTemplateRef } from "vue";
import { ElMessage } from "element-plus";
import { Phone, WarnTriangleFilled, CircleClose, UserFilled } from "@element-plus/icons-vue";
import { useNamespace } from "@/composables";
import { useVerifyCode } from "../verifyCode";
import { phoneRules } from "../rules";
const ns = useNamespace("login-form");
const loading = ref(false);
const ruleForm = reactive({
    phone: "",
    verifyCode: "",
});
const ruleFormRef = useTemplateRef("ruleFormRef");
const { isDisabled, text } = useVerifyCode();
const login = async () => {
    loading.value = true;
    if (!ruleFormRef.value)
        return;
    await ruleFormRef.value.validate((valid, fields) => {
        if (valid) {
            // 模拟登录请求，需根据实际开发进行修改
            setTimeout(() => {
                ElMessage.success("登录成功");
                loading.value = false;
            }, 2000);
        }
        else {
            loading.value = false;
            Promise.resolve(fields);
        }
    });
};
const switchLoginMode = inject("switchLoginMode");
const onBack = () => {
    useVerifyCode().end();
    switchLoginMode("login");
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elForm | typeof ___VLS_components.ElForm} */
elForm;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ref: "ruleFormRef",
    model: (__VLS_ctx.ruleForm),
    rules: (__VLS_ctx.phoneRules),
    size: "large",
    ...{ class: (__VLS_ctx.ns.b()) },
}));
const __VLS_2 = __VLS_1({
    ref: "ruleFormRef",
    model: (__VLS_ctx.ruleForm),
    rules: (__VLS_ctx.phoneRules),
    size: "large",
    ...{ class: (__VLS_ctx.ns.b()) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_7 } = __VLS_3.slots;
let __VLS_8;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    prop: "phone",
}));
const __VLS_10 = __VLS_9({
    prop: "phone",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const { default: __VLS_13 } = __VLS_11.slots;
let __VLS_14;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    clearable: true,
    modelValue: (__VLS_ctx.ruleForm.phone),
    placeholder: "手机号码",
    prefixIcon: (__VLS_ctx.Phone),
}));
const __VLS_16 = __VLS_15({
    clearable: true,
    modelValue: (__VLS_ctx.ruleForm.phone),
    placeholder: "手机号码",
    prefixIcon: (__VLS_ctx.Phone),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
// @ts-ignore
[ruleForm, ruleForm, phoneRules, ns, Phone,];
var __VLS_11;
let __VLS_19;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    prop: "verifyCode",
}));
const __VLS_21 = __VLS_20({
    prop: "verifyCode",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_22.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
let __VLS_25;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    ...{ 'onKeydown': {} },
    clearable: true,
    modelValue: (__VLS_ctx.ruleForm.verifyCode),
    placeholder: "请输入验证码",
    prefixIcon: (__VLS_ctx.WarnTriangleFilled),
}));
const __VLS_27 = __VLS_26({
    ...{ 'onKeydown': {} },
    clearable: true,
    modelValue: (__VLS_ctx.ruleForm.verifyCode),
    placeholder: "请输入验证码",
    prefixIcon: (__VLS_ctx.WarnTriangleFilled),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_30;
const __VLS_31 = ({ keydown: {} },
    { onKeydown: (__VLS_ctx.login) });
var __VLS_28;
var __VLS_29;
let __VLS_32;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.isDisabled),
}));
const __VLS_34 = __VLS_33({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.isDisabled),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_37;
const __VLS_38 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.useVerifyCode().start(__VLS_ctx.ruleFormRef, 'phone');
            // @ts-ignore
            [ruleForm, WarnTriangleFilled, login, isDisabled, useVerifyCode, ruleFormRef,];
        } });
const { default: __VLS_39 } = __VLS_35.slots;
(__VLS_ctx.text.length > 0 ? __VLS_ctx.text + " 秒后重新获取" : "获取验证码");
// @ts-ignore
[text, text,];
var __VLS_35;
var __VLS_36;
// @ts-ignore
[];
var __VLS_22;
let __VLS_40;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
const { default: __VLS_45 } = __VLS_43.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('btn')) },
    ...{ class: "flx-align-center-between" },
});
/** @type {__VLS_StyleScopedClasses['flx-align-center-between']} */ ;
let __VLS_46;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.UserFilled),
    round: true,
    size: "large",
    type: "primary",
    loading: (__VLS_ctx.loading),
}));
const __VLS_48 = __VLS_47({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.UserFilled),
    round: true,
    size: "large",
    type: "primary",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
let __VLS_51;
const __VLS_52 = ({ click: {} },
    { onClick: (__VLS_ctx.login) });
const { default: __VLS_53 } = __VLS_49.slots;
// @ts-ignore
[ns, login, UserFilled, loading,];
var __VLS_49;
var __VLS_50;
let __VLS_54;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.CircleClose),
    round: true,
    size: "large",
}));
const __VLS_56 = __VLS_55({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.CircleClose),
    round: true,
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
let __VLS_59;
const __VLS_60 = ({ click: {} },
    { onClick: (__VLS_ctx.onBack) });
const { default: __VLS_61 } = __VLS_57.slots;
// @ts-ignore
[CircleClose, onBack,];
var __VLS_57;
var __VLS_58;
// @ts-ignore
[];
var __VLS_43;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_6 = __VLS_5;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
