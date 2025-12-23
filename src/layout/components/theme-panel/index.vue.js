/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { ElButton, ElDrawer, ElMessage, ElMessageBox } from "element-plus";
import { Refresh } from "@element-plus/icons-vue";
import { LOGIN_URL, OpenThemePanelKey } from "@/common/config";
import { mittBus } from "@/common/utils";
import { useCommon, useNamespace, useTheme } from "@/composables";
import { useSettingStore, useUserStore } from "@/pinia";
import { LayoutModeSwitch, MenuThemeSwitch, GlobalThemeSwitch, BaseConfigSwitch, BrowserTitleSwitch, } from "./components";
import "./index.scss";
import router from "@/router";
defineOptions({ name: "ThemePanel" });
const ns = useNamespace("theme-panel");
const { t } = useI18n();
const userStore = useUserStore();
const settingStore = useSettingStore();
const { changeGlobalTheme } = useTheme();
const { isMobile } = useCommon();
const resetSetting = () => {
    settingStore.$reset();
    changeGlobalTheme();
};
/**
 * 退出登录
 */
const clearSettingCache = async () => {
    ElMessageBox.confirm(t("_headerBar.logout.confirm"), t("_headerBar.logout.confirmTitle"), {
        type: "warning",
    }).then(async () => {
        resetSetting();
        // 调用退出登录接口
        await userStore.logout();
        ElMessage.success(t("_headerBar.logout.success"));
        await nextTick();
        // 重定向到登陆页
        router.push(`${LOGIN_URL}?redirect=${router.currentRoute.value.path}`);
    });
};
/**
 * 打开主题设置
 */
const drawerVisible = ref(false);
mittBus.on(OpenThemePanelKey, () => (drawerVisible.value = true));
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elDrawer | typeof ___VLS_components.ElDrawer} */
elDrawer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.drawerVisible),
    size: (360),
    lockScroll: (false),
    withHeader: (false),
    closeOnClickModal: true,
    ...{ class: (__VLS_ctx.ns.b()) },
    modalClass: (__VLS_ctx.ns.b('modal')),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.drawerVisible),
    size: (360),
    lockScroll: (false),
    withHeader: (false),
    closeOnClickModal: true,
    ...{ class: (__VLS_ctx.ns.b()) },
    modalClass: (__VLS_ctx.ns.b('modal')),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
if (!__VLS_ctx.isMobile) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    (__VLS_ctx.$t("_setting.layout.layoutMode"));
    let __VLS_7;
    /** @ts-ignore @type {typeof ___VLS_components.LayoutModeSwitch} */
    LayoutModeSwitch;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
}
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
(__VLS_ctx.$t("_setting.menu.theme"));
let __VLS_12;
/** @ts-ignore @type {typeof ___VLS_components.MenuThemeSwitch} */
MenuThemeSwitch;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
(__VLS_ctx.$t("_setting.theme.label"));
let __VLS_17;
/** @ts-ignore @type {typeof ___VLS_components.GlobalThemeSwitch} */
GlobalThemeSwitch;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
let __VLS_22;
/** @ts-ignore @type {typeof ___VLS_components.BaseConfigSwitch} */
BaseConfigSwitch;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({}));
const __VLS_24 = __VLS_23({}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
(__VLS_ctx.$t("_setting.layout.titleMode"));
let __VLS_27;
/** @ts-ignore @type {typeof ___VLS_components.BrowserTitleSwitch} */
BrowserTitleSwitch;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({}));
const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
{
    const { footer: __VLS_32 } = __VLS_3.slots;
    let __VLS_33;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        ...{ 'onClick': {} },
        plain: true,
        type: "primary",
        icon: (__VLS_ctx.Refresh),
    }));
    const __VLS_35 = __VLS_34({
        ...{ 'onClick': {} },
        plain: true,
        type: "primary",
        icon: (__VLS_ctx.Refresh),
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    let __VLS_38;
    const __VLS_39 = ({ click: {} },
        { onClick: (__VLS_ctx.resetSetting) });
    const { default: __VLS_40 } = __VLS_36.slots;
    (__VLS_ctx.$t("_setting.resetSetting"));
    // @ts-ignore
    [drawerVisible, ns, ns, isMobile, $t, $t, $t, $t, $t, Refresh, resetSetting,];
    var __VLS_36;
    var __VLS_37;
    let __VLS_41;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
        ...{ 'onClick': {} },
        plain: true,
    }));
    const __VLS_43 = __VLS_42({
        ...{ 'onClick': {} },
        plain: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    let __VLS_46;
    const __VLS_47 = ({ click: {} },
        { onClick: (__VLS_ctx.clearSettingCache) });
    const { default: __VLS_48 } = __VLS_44.slots;
    (__VLS_ctx.$t("_setting.clearSettingCache"));
    // @ts-ignore
    [$t, clearSettingCache,];
    var __VLS_44;
    var __VLS_45;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
