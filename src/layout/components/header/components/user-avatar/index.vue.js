/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ElImage, ElMessage, ElMessageBox } from "element-plus";
import { Setting, Back, View, Lock } from "@element-plus/icons-vue";
import { serviceConfig, LOGIN_URL } from "@/common/config";
import { useNamespace, useKeyDown, useMittBus } from "@/composables";
import { useSettingStore, useUserStore } from "@/pinia";
import "./index.scss";
defineOptions({ name: "UserAvatar" });
const __VLS_props = withDefaults(defineProps(), {
    name: true,
});
const { t } = useI18n();
const router = useRouter();
const ns = useNamespace("user-avatar");
const userStore = useUserStore();
const settingStore = useSettingStore();
const { openThemePanel, openLockPanel } = useMittBus();
const { userInfo } = storeToRefs(userStore);
const { widget, shortcutKey } = storeToRefs(settingStore);
const { start } = useKeyDown({
    watcher: computed(() => shortcutKey.value.logout),
    // 快捷键 ALT + Q 退出登录
    callback: event => {
        if (event.altKey && event.key.toLowerCase() === "q") {
            event.preventDefault();
            logout();
        }
    },
});
start();
// 下拉菜单列表
const menuList = computed(() => [
    { label: t("_headerBar.setting"), icon: Setting, click: openThemePanel },
    { label: t("_headerBar.lock"), icon: Lock, click: openLockPanel, subLabel: "Alt L", show: widget.value.lockScreen },
]);
/**
 * 退出登录
 */
const logout = async () => {
    ElMessageBox.confirm(t("_headerBar.logout.confirm"), t("_headerBar.logout.confirmTitle"), {
        type: "warning",
    }).then(async () => {
        // 调用退出登录接口
        await userStore.logout();
        ElMessage.success(t("_headerBar.logout.success"));
        await nextTick();
        // 重定向到登陆页
        router.push(`${LOGIN_URL}?redirect=${router.currentRoute.value.path}`);
    });
};
const __VLS_defaults = {
    name: true,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.b()) },
    ...{ class: "customize" },
});
/** @type {__VLS_StyleScopedClasses['customize']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elPopover | typeof ___VLS_components.ElPopover} */
elPopover;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    placement: "bottom-end",
    trigger: "hover",
    width: (240),
    hideAfter: (0),
    offset: (10),
    popperClass: (__VLS_ctx.ns.b()),
}));
const __VLS_2 = __VLS_1({
    placement: "bottom-end",
    trigger: "hover",
    width: (240),
    hideAfter: (0),
    offset: (10),
    popperClass: (__VLS_ctx.ns.b()),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
(__VLS_ctx.$attrs);
const { default: __VLS_5 } = __VLS_3.slots;
{
    const { reference: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flx-align-center gap-15" },
        ...{ class: (__VLS_ctx.ns.e('avatar-wrapper')) },
    });
    /** @type {__VLS_StyleScopedClasses['flx-align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-15']} */ ;
    let __VLS_7;
    /** @ts-ignore @type {typeof ___VLS_components.elImage | typeof ___VLS_components.ElImage} */
    elImage;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        src: (__VLS_ctx.userInfo.avatar),
        ...{ class: (__VLS_ctx.ns.e('avatar')) },
    }));
    const __VLS_9 = __VLS_8({
        src: (__VLS_ctx.userInfo.avatar),
        ...{ class: (__VLS_ctx.ns.e('avatar')) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    {
        const { error: __VLS_13 } = __VLS_10.slots;
        let __VLS_14;
        /** @ts-ignore @type {typeof ___VLS_components.elImage | typeof ___VLS_components.ElImage} */
        elImage;
        // @ts-ignore
        const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
            src: (__VLS_ctx.serviceConfig.layout.avatar),
        }));
        const __VLS_16 = __VLS_15({
            src: (__VLS_ctx.serviceConfig.layout.avatar),
        }, ...__VLS_functionalComponentArgsRest(__VLS_15));
        // @ts-ignore
        [ns, ns, ns, ns, $attrs, userInfo, serviceConfig,];
    }
    // @ts-ignore
    [];
    var __VLS_10;
    if (__VLS_ctx.name) {
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (__VLS_ctx.userInfo.username);
    }
    // @ts-ignore
    [userInfo, name,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('wrapper')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('head')) },
    ...{ class: "flx-align-center" },
});
/** @type {__VLS_StyleScopedClasses['flx-align-center']} */ ;
let __VLS_19;
/** @ts-ignore @type {typeof ___VLS_components.elImage | typeof ___VLS_components.ElImage} */
elImage;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    src: (__VLS_ctx.userInfo.avatar),
    ...{ class: (__VLS_ctx.ns.e('avatar')) },
}));
const __VLS_21 = __VLS_20({
    src: (__VLS_ctx.userInfo.avatar),
    ...{ class: (__VLS_ctx.ns.e('avatar')) },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_22.slots;
{
    const { error: __VLS_25 } = __VLS_22.slots;
    let __VLS_26;
    /** @ts-ignore @type {typeof ___VLS_components.elImage | typeof ___VLS_components.ElImage} */
    elImage;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        src: (__VLS_ctx.serviceConfig.layout.avatar),
    }));
    const __VLS_28 = __VLS_27({
        src: (__VLS_ctx.serviceConfig.layout.avatar),
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    // @ts-ignore
    [ns, ns, ns, userInfo, serviceConfig,];
}
// @ts-ignore
[];
var __VLS_22;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('info')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "name sle" },
});
/** @type {__VLS_StyleScopedClasses['name']} */ ;
/** @type {__VLS_StyleScopedClasses['sle']} */ ;
(__VLS_ctx.userInfo.username);
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "email sle" },
});
/** @type {__VLS_StyleScopedClasses['email']} */ ;
/** @type {__VLS_StyleScopedClasses['sle']} */ ;
(__VLS_ctx.userInfo.email);
let __VLS_31;
/** @ts-ignore @type {typeof ___VLS_components.elDivider | typeof ___VLS_components.ElDivider} */
elDivider;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({}));
const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
__VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: (__VLS_ctx.ns.e('menu')) },
    ...{ class: "flx-column" },
});
/** @type {__VLS_StyleScopedClasses['flx-column']} */ ;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.menuList))) {
    (item.label);
    if (item.show !== false) {
        __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ onClick: (item.click) },
            ...{ class: "flx-justify-between" },
        });
        /** @type {__VLS_StyleScopedClasses['flx-justify-between']} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flx-align-center" },
        });
        /** @type {__VLS_StyleScopedClasses['flx-align-center']} */ ;
        let __VLS_36;
        /** @ts-ignore @type {typeof ___VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
            icon: (item.icon || __VLS_ctx.View),
            ...{ class: "icon" },
        }));
        const __VLS_38 = __VLS_37({
            icon: (item.icon || __VLS_ctx.View),
            ...{ class: "icon" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        /** @type {__VLS_StyleScopedClasses['icon']} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "label" },
        });
        /** @type {__VLS_StyleScopedClasses['label']} */ ;
        (item.label);
        if (item.subLabel && __VLS_ctx.shortcutKey.lockScreen) {
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (item.subLabel);
        }
    }
    // @ts-ignore
    [ns, ns, userInfo, userInfo, menuList, View, shortcutKey,];
}
let __VLS_41;
/** @ts-ignore @type {typeof ___VLS_components.elDivider | typeof ___VLS_components.ElDivider} */
elDivider;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({}));
const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
let __VLS_46;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    ...{ 'onClick': {} },
    plain: true,
    icon: (__VLS_ctx.Back),
}));
const __VLS_48 = __VLS_47({
    ...{ 'onClick': {} },
    plain: true,
    icon: (__VLS_ctx.Back),
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
let __VLS_51;
const __VLS_52 = ({ click: {} },
    { onClick: (__VLS_ctx.logout) });
const { default: __VLS_53 } = __VLS_49.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.t("_headerBar.logout.label"));
if (__VLS_ctx.shortcutKey.logout) {
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ style: {} },
    });
}
// @ts-ignore
[shortcutKey, Back, logout, t,];
var __VLS_49;
var __VLS_50;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
