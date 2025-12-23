/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, reactive, useTemplateRef } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { User, Lock, WarnTriangleFilled, CircleClose, UserFilled } from "@element-plus/icons-vue";
import { serviceConfig, HOME_URL } from "@/common/config";
import { ImageVerifyCode } from "@/components";
import { useNamespace } from "@/composables";
import { useUserStore } from "@/pinia";
const ns = useNamespace("login-form");
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const loginRules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    verifyCode: [
        {
            validator: (_, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入验证码"));
                }
                else if (imgCode.value !== value) {
                    callback(new Error("请输入正确的验证码"));
                }
                else {
                    callback();
                }
            },
            trigger: "blur",
        },
    ],
};
const loginFormRef = useTemplateRef("loginFormRef");
const imgCode = ref("");
const loading = ref(false);
const loginForm = reactive({ username: "", password: "", verifyCode: "" });
const checked = ref(false);
const login = () => {
    loginFormRef.value?.validate(async (valid) => {
        if (!valid)
            return;
        loading.value = true;
        try {
            // 执行登录
            await userStore.login({ ...loginForm });
            // 跳转到首页或者 URL 携带的 redirect 页（优先级高）
            let path = HOME_URL;
            const { query } = route;
            if (query.redirect)
                path = query.redirect;
            const otherQuery = getOtherQuery(query);
            if (Object.keys(otherQuery).length === 0)
                router.push(path);
            else
                router.push({ path, query: otherQuery });
            ElNotification.success({
                title: "登录成功",
                message: `欢迎登录 ${serviceConfig.layout.name}`,
                duration: 3000,
            });
        }
        catch (error) {
            // 显示错误信息
            ElNotification.error({
                title: "登录失败",
                message: error.msg || "用户名或密码错误",
                duration: 3000,
            });
        }
        finally {
            loading.value = false;
        }
    });
};
const getOtherQuery = (query) => {
    return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect")
            acc[cur] = query[cur];
        return acc;
    }, {});
};
const resetForm = () => {
    loginFormRef.value?.resetFields();
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
    ref: "loginFormRef",
    model: (__VLS_ctx.loginForm),
    rules: (__VLS_ctx.loginRules),
    size: "large",
    ...{ class: (__VLS_ctx.ns.b()) },
}));
const __VLS_2 = __VLS_1({
    ref: "loginFormRef",
    model: (__VLS_ctx.loginForm),
    rules: (__VLS_ctx.loginRules),
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
    prop: "username",
}));
const __VLS_10 = __VLS_9({
    prop: "username",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const { default: __VLS_13 } = __VLS_11.slots;
let __VLS_14;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    ...{ 'onKeydown': {} },
    modelValue: (__VLS_ctx.loginForm.username),
    placeholder: "用户名",
    prefixIcon: (__VLS_ctx.User),
}));
const __VLS_16 = __VLS_15({
    ...{ 'onKeydown': {} },
    modelValue: (__VLS_ctx.loginForm.username),
    placeholder: "用户名",
    prefixIcon: (__VLS_ctx.User),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
let __VLS_19;
const __VLS_20 = ({ keydown: {} },
    { onKeydown: (__VLS_ctx.login) });
var __VLS_17;
var __VLS_18;
// @ts-ignore
[loginForm, loginForm, loginRules, ns, User, login,];
var __VLS_11;
let __VLS_21;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    prop: "password",
}));
const __VLS_23 = __VLS_22({
    prop: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_26 } = __VLS_24.slots;
let __VLS_27;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    ...{ 'onKeydown': {} },
    type: "password",
    modelValue: (__VLS_ctx.loginForm.password),
    placeholder: "密码",
    showPassword: true,
    autocomplete: "new-password",
    prefixIcon: (__VLS_ctx.Lock),
}));
const __VLS_29 = __VLS_28({
    ...{ 'onKeydown': {} },
    type: "password",
    modelValue: (__VLS_ctx.loginForm.password),
    placeholder: "密码",
    showPassword: true,
    autocomplete: "new-password",
    prefixIcon: (__VLS_ctx.Lock),
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
let __VLS_32;
const __VLS_33 = ({ keydown: {} },
    { onKeydown: (__VLS_ctx.login) });
var __VLS_30;
var __VLS_31;
// @ts-ignore
[loginForm, login, Lock,];
var __VLS_24;
let __VLS_34;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    prop: "verifyCode",
}));
const __VLS_36 = __VLS_35({
    prop: "verifyCode",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const { default: __VLS_39 } = __VLS_37.slots;
let __VLS_40;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    ...{ 'onKeydown': {} },
    clearable: true,
    modelValue: (__VLS_ctx.loginForm.verifyCode),
    placeholder: "验证码",
    prefixIcon: (__VLS_ctx.WarnTriangleFilled),
}));
const __VLS_42 = __VLS_41({
    ...{ 'onKeydown': {} },
    clearable: true,
    modelValue: (__VLS_ctx.loginForm.verifyCode),
    placeholder: "验证码",
    prefixIcon: (__VLS_ctx.WarnTriangleFilled),
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
let __VLS_45;
const __VLS_46 = ({ keydown: {} },
    { onKeydown: (__VLS_ctx.login) });
const { default: __VLS_47 } = __VLS_43.slots;
{
    const { append: __VLS_48 } = __VLS_43.slots;
    let __VLS_49;
    /** @ts-ignore @type {typeof ___VLS_components.ImageVerifyCode} */
    ImageVerifyCode;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        modelValue: (__VLS_ctx.imgCode),
    }));
    const __VLS_51 = __VLS_50({
        modelValue: (__VLS_ctx.imgCode),
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    // @ts-ignore
    [loginForm, login, WarnTriangleFilled, imgCode,];
}
// @ts-ignore
[];
var __VLS_43;
var __VLS_44;
// @ts-ignore
[];
var __VLS_37;
let __VLS_54;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({}));
const __VLS_56 = __VLS_55({}, ...__VLS_functionalComponentArgsRest(__VLS_55));
const { default: __VLS_59 } = __VLS_57.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
    ...{ class: "flx-align-center-between" },
});
/** @type {__VLS_StyleScopedClasses['flx-align-center-between']} */ ;
let __VLS_60;
/** @ts-ignore @type {typeof ___VLS_components.elCheckbox | typeof ___VLS_components.ElCheckbox} */
elCheckbox;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    modelValue: (__VLS_ctx.checked),
}));
const __VLS_62 = __VLS_61({
    modelValue: (__VLS_ctx.checked),
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const { default: __VLS_65 } = __VLS_63.slots;
// @ts-ignore
[ns, checked,];
var __VLS_63;
// @ts-ignore
[];
var __VLS_57;
let __VLS_66;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({}));
const __VLS_68 = __VLS_67({}, ...__VLS_functionalComponentArgsRest(__VLS_67));
const { default: __VLS_71 } = __VLS_69.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('btn')) },
    ...{ class: "flx-align-center-between" },
});
/** @type {__VLS_StyleScopedClasses['flx-align-center-between']} */ ;
let __VLS_72;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.CircleClose),
    round: true,
    size: "large",
}));
const __VLS_74 = __VLS_73({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.CircleClose),
    round: true,
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_77;
const __VLS_78 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.resetForm();
            // @ts-ignore
            [ns, CircleClose, resetForm,];
        } });
const { default: __VLS_79 } = __VLS_75.slots;
// @ts-ignore
[];
var __VLS_75;
var __VLS_76;
let __VLS_80;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.UserFilled),
    round: true,
    size: "large",
    type: "primary",
    loading: (__VLS_ctx.loading),
}));
const __VLS_82 = __VLS_81({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.UserFilled),
    round: true,
    size: "large",
    type: "primary",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
let __VLS_85;
const __VLS_86 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.login();
            // @ts-ignore
            [login, UserFilled, loading,];
        } });
const { default: __VLS_87 } = __VLS_83.slots;
// @ts-ignore
[];
var __VLS_83;
var __VLS_84;
// @ts-ignore
[];
var __VLS_69;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_6 = __VLS_5;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
