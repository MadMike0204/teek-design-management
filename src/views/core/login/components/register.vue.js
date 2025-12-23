/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, reactive, inject, useTemplateRef } from "vue";
import { ElMessage } from "element-plus";
import { User, Phone, Lock, WarnTriangleFilled, CircleClose, UserFilled } from "@element-plus/icons-vue";
import { useNamespace } from "@/composables";
import { useVerifyCode } from "../verifyCode";
import { updateRules } from "../rules";
const ns = useNamespace("login-form");
const { isDisabled, text } = useVerifyCode();
const checked = ref(false);
const loading = ref(false);
const ruleForm = reactive({
    username: "",
    phone: "",
    verifyCode: "",
    password: "",
    repeatPassword: "",
});
const ruleFormRef = useTemplateRef("ruleFormRef");
const repeatPasswordRule = [
    {
        validator: (_, value, callback) => {
            if (value === "") {
                callback(new Error("请输入确认密码"));
            }
            else if (ruleForm.password !== value) {
                callback(new Error("两次密码不一致!"));
            }
            else {
                callback();
            }
        },
        trigger: "blur",
    },
];
const register = async () => {
    loading.value = true;
    if (!ruleFormRef.value)
        return;
    await ruleFormRef.value.validate((valid, fields) => {
        if (valid) {
            if (checked.value) {
                // 模拟请求，需根据实际开发进行修改
                setTimeout(() => {
                    ElMessage.success("修改密码成功");
                    loading.value = false;
                }, 2000);
            }
            else {
                loading.value = false;
                ElMessage.warning("请勾选隐私政策");
            }
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
    rules: (__VLS_ctx.updateRules),
    size: "large",
    ...{ class: (__VLS_ctx.ns.b()) },
}));
const __VLS_2 = __VLS_1({
    ref: "ruleFormRef",
    model: (__VLS_ctx.ruleForm),
    rules: (__VLS_ctx.updateRules),
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
    rules: ([
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    ]),
    prop: "username",
}));
const __VLS_10 = __VLS_9({
    rules: ([
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    ]),
    prop: "username",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const { default: __VLS_13 } = __VLS_11.slots;
let __VLS_14;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    clearable: true,
    modelValue: (__VLS_ctx.ruleForm.username),
    placeholder: "用户名",
    prefixIcon: (__VLS_ctx.User),
}));
const __VLS_16 = __VLS_15({
    clearable: true,
    modelValue: (__VLS_ctx.ruleForm.username),
    placeholder: "用户名",
    prefixIcon: (__VLS_ctx.User),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
// @ts-ignore
[ruleForm, ruleForm, updateRules, ns, User,];
var __VLS_11;
let __VLS_19;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    prop: "phone",
}));
const __VLS_21 = __VLS_20({
    prop: "phone",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_22.slots;
let __VLS_25;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    clearable: true,
    modelValue: (__VLS_ctx.ruleForm.phone),
    placeholder: "手机号码",
    prefixIcon: (__VLS_ctx.Phone),
}));
const __VLS_27 = __VLS_26({
    clearable: true,
    modelValue: (__VLS_ctx.ruleForm.phone),
    placeholder: "手机号码",
    prefixIcon: (__VLS_ctx.Phone),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
// @ts-ignore
[ruleForm, Phone,];
var __VLS_22;
let __VLS_30;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    prop: "verifyCode",
}));
const __VLS_32 = __VLS_31({
    prop: "verifyCode",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
let __VLS_36;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ 'onKeydown': {} },
    clearable: true,
    modelValue: (__VLS_ctx.ruleForm.verifyCode),
    placeholder: "短信验证码",
    prefixIcon: (__VLS_ctx.WarnTriangleFilled),
}));
const __VLS_38 = __VLS_37({
    ...{ 'onKeydown': {} },
    clearable: true,
    modelValue: (__VLS_ctx.ruleForm.verifyCode),
    placeholder: "短信验证码",
    prefixIcon: (__VLS_ctx.WarnTriangleFilled),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_41;
const __VLS_42 = ({ keydown: {} },
    { onKeydown: (__VLS_ctx.register) });
var __VLS_39;
var __VLS_40;
let __VLS_43;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.isDisabled),
    ...{ class: "ml-2" },
}));
const __VLS_45 = __VLS_44({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.isDisabled),
    ...{ class: "ml-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
let __VLS_48;
const __VLS_49 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.useVerifyCode().start(__VLS_ctx.ruleFormRef, 'phone');
            // @ts-ignore
            [ruleForm, WarnTriangleFilled, register, isDisabled, useVerifyCode, ruleFormRef,];
        } });
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
const { default: __VLS_50 } = __VLS_46.slots;
(__VLS_ctx.text.length > 0 ? __VLS_ctx.text + " 秒后重新获取" : "获取验证码");
// @ts-ignore
[text, text,];
var __VLS_46;
var __VLS_47;
// @ts-ignore
[];
var __VLS_33;
let __VLS_51;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
    prop: "password",
}));
const __VLS_53 = __VLS_52({
    prop: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
const { default: __VLS_56 } = __VLS_54.slots;
let __VLS_57;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    ...{ 'onKeydown': {} },
    clearable: true,
    showPassword: true,
    modelValue: (__VLS_ctx.ruleForm.password),
    placeholder: "密码",
    prefixIcon: (__VLS_ctx.Lock),
}));
const __VLS_59 = __VLS_58({
    ...{ 'onKeydown': {} },
    clearable: true,
    showPassword: true,
    modelValue: (__VLS_ctx.ruleForm.password),
    placeholder: "密码",
    prefixIcon: (__VLS_ctx.Lock),
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
let __VLS_62;
const __VLS_63 = ({ keydown: {} },
    { onKeydown: (__VLS_ctx.register) });
var __VLS_60;
var __VLS_61;
// @ts-ignore
[ruleForm, register, Lock,];
var __VLS_54;
let __VLS_64;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    rules: (__VLS_ctx.repeatPasswordRule),
    prop: "repeatPassword",
}));
const __VLS_66 = __VLS_65({
    rules: (__VLS_ctx.repeatPasswordRule),
    prop: "repeatPassword",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const { default: __VLS_69 } = __VLS_67.slots;
let __VLS_70;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
    ...{ 'onKeydown': {} },
    clearable: true,
    showPassword: true,
    modelValue: (__VLS_ctx.ruleForm.repeatPassword),
    placeholder: "确认密码",
    prefixIcon: (__VLS_ctx.Lock),
}));
const __VLS_72 = __VLS_71({
    ...{ 'onKeydown': {} },
    clearable: true,
    showPassword: true,
    modelValue: (__VLS_ctx.ruleForm.repeatPassword),
    placeholder: "确认密码",
    prefixIcon: (__VLS_ctx.Lock),
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
let __VLS_75;
const __VLS_76 = ({ keydown: {} },
    { onKeydown: (__VLS_ctx.register) });
var __VLS_73;
var __VLS_74;
// @ts-ignore
[ruleForm, register, Lock, repeatPasswordRule,];
var __VLS_67;
let __VLS_77;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({}));
const __VLS_79 = __VLS_78({}, ...__VLS_functionalComponentArgsRest(__VLS_78));
const { default: __VLS_82 } = __VLS_80.slots;
let __VLS_83;
/** @ts-ignore @type {typeof ___VLS_components.elCheckbox | typeof ___VLS_components.ElCheckbox} */
elCheckbox;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
    modelValue: (__VLS_ctx.checked),
}));
const __VLS_85 = __VLS_84({
    modelValue: (__VLS_ctx.checked),
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
const { default: __VLS_88 } = __VLS_86.slots;
// @ts-ignore
[checked,];
var __VLS_86;
let __VLS_89;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
    link: true,
    type: "primary",
}));
const __VLS_91 = __VLS_90({
    link: true,
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
const { default: __VLS_94 } = __VLS_92.slots;
// @ts-ignore
[];
var __VLS_92;
// @ts-ignore
[];
var __VLS_80;
let __VLS_95;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({}));
const __VLS_97 = __VLS_96({}, ...__VLS_functionalComponentArgsRest(__VLS_96));
const { default: __VLS_100 } = __VLS_98.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('btn')) },
    ...{ class: "flx-align-center-between" },
});
/** @type {__VLS_StyleScopedClasses['flx-align-center-between']} */ ;
let __VLS_101;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.UserFilled),
    round: true,
    size: "large",
    type: "primary",
    loading: (__VLS_ctx.loading),
}));
const __VLS_103 = __VLS_102({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.UserFilled),
    round: true,
    size: "large",
    type: "primary",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
let __VLS_106;
const __VLS_107 = ({ click: {} },
    { onClick: (__VLS_ctx.register) });
const { default: __VLS_108 } = __VLS_104.slots;
// @ts-ignore
[ns, register, UserFilled, loading,];
var __VLS_104;
var __VLS_105;
let __VLS_109;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.CircleClose),
    round: true,
    size: "large",
}));
const __VLS_111 = __VLS_110({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.CircleClose),
    round: true,
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_110));
let __VLS_114;
const __VLS_115 = ({ click: {} },
    { onClick: (__VLS_ctx.onBack) });
const { default: __VLS_116 } = __VLS_112.slots;
// @ts-ignore
[CircleClose, onBack,];
var __VLS_112;
var __VLS_113;
// @ts-ignore
[];
var __VLS_98;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_6 = __VLS_5;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
