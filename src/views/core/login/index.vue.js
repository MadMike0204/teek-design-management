/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, provide, onMounted } from "vue";
import { useSettingStore } from "@/pinia/stores/core/setting";
import { GlobalThemeEnum } from "@/common/enums";
import { serviceConfig } from "@/common/config";
import { useNamespace } from "@/composables";
import LoginForm from "./loginForm.vue";
import Phone from "./components/phone.vue";
import Register from "./components/register.vue";
import Forget from "./components/forget.vue";
const ns = useNamespace("login");
const settingStore = useSettingStore();
// 设置登录页面默认使用浅色模式
onMounted(() => {
    settingStore.theme.globalThemeMode = GlobalThemeEnum.Light;
});
const formComponents = {
    login: LoginForm,
    phone: Phone,
    register: Register,
    forget: Forget,
};
const formMode = ref("login");
const switchLoginMode = (mode) => {
    formMode.value = mode;
};
provide("switchLoginMode", switchLoginMode);
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.b()) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('wrapper')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('left')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    src: "@/common/assets/images/login/login_left.png",
    alt: "login",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('right')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('right__header')) },
    ...{ class: "flx-center" },
});
/** @type {__VLS_StyleScopedClasses['flx-center']} */ ;
if (__VLS_ctx.serviceConfig.logo.enable) {
    __VLS_asFunctionalElement(__VLS_intrinsics.img)({
        src: (__VLS_ctx.serviceConfig.logo.source),
        alt: "",
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "title" },
});
/** @type {__VLS_StyleScopedClasses['title']} */ ;
(__VLS_ctx.serviceConfig.layout.name);
const __VLS_0 = (__VLS_ctx.formComponents[__VLS_ctx.formMode]);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
// @ts-ignore
[ns, ns, ns, ns, ns, serviceConfig, serviceConfig, serviceConfig, formComponents, formMode,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
