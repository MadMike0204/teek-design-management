/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, reactive, computed, watch, onMounted, onUnmounted, useTemplateRef } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { ElDialog, ElForm, ElFormItem, ElButton, ElInput, ElIcon, ElMessage } from "element-plus";
import { Unlock, Lock } from "@element-plus/icons-vue";
import { mittBus } from "@/common/utils";
import { serviceConfig, LOGIN_URL, OpenLockPanelKey } from "@/common/config";
import { useKeyDown, useNamespace } from "@/composables";
import { useSettingStore, useUserStore } from "@/pinia";
import { useDisableDevTools } from "./use-disabled-dev-tools";
defineOptions({ name: "LockPanel" });
const ns = useNamespace("lock-panel");
/**
 * 组件实例
 */
const formInstance = useTemplateRef("formInstance");
const unlockFormInstance = useTemplateRef("unlockFormInstance");
const unlockInputInstance = useTemplateRef("unlockInputInstance");
const lockInputInstance = useTemplateRef("lockInputInstance");
const dialogVisible = ref(false);
const formData = reactive({
    password: "",
});
const unlockForm = reactive({
    password: "",
});
const { t } = useI18n();
const userStore = useUserStore();
const settingStore = useSettingStore();
const { showDevToolsWarning, cleanup } = useDisableDevTools();
const { userInfo, lockPassword, isLock } = storeToRefs(userStore);
const { shortcutKey } = storeToRefs(settingStore);
const { start } = useKeyDown({
    watcher: computed(() => shortcutKey.value.lockScreen),
    // 快捷键 ALT + L 锁屏
    callback: event => {
        if (event.altKey && event.key.toLowerCase() === "l") {
            event.preventDefault();
            dialogVisible.value = true;
        }
    },
});
start();
// 监听锁屏状态变化
watch(isLock, newValue => {
    if (newValue) {
        setTimeout(() => {
            unlockInputInstance.value?.input?.focus();
        }, 100);
    }
    else {
        showDevToolsWarning.value = false;
    }
});
// 表单验证规则
const rules = computed(() => ({
    password: [{ required: true, message: t("_lockScreen.inputPlaceholder"), trigger: "blur" }],
}));
/**
 * 处理对话框打开事件
 */
const handleDialogOpen = () => {
    setTimeout(() => {
        lockInputInstance.value?.input?.focus();
    }, 100);
};
/**
 * 处理锁定事件
 */
const handleLock = async (formEl) => {
    if (!formEl)
        return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            const encryptedPassword = encrypt(formData.password);
            userStore.setLockStatus(true);
            userStore.setLockPassword(encryptedPassword);
            dialogVisible.value = false;
            formData.password = "";
        }
        else {
            console.error("表单验证失败:", fields);
        }
    });
};
/**
 * 处理解锁事件
 */
const handleUnlock = async (formEl) => {
    if (!formEl)
        return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            const pwd = decrypt(lockPassword.value);
            const isValid = pwd === unlockForm.password;
            if (isValid) {
                try {
                    userStore.setLockStatus(false);
                    userStore.setLockPassword("");
                    unlockForm.password = "";
                    dialogVisible.value = false;
                    showDevToolsWarning.value = false;
                }
                catch (error) {
                    console.error("解锁失败:", error);
                }
            }
            else
                ElMessage.error(t("_lockScreen.passwordError"));
        }
        else
            console.error("表单验证失败:", fields);
    });
};
/**
 * 加密函数（XOR 加密 + base64 编码）
 * @param text 明文
 * @param key 密钥
 */
const encrypt = (text, key = serviceConfig.layout.lockSecretKey) => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        // 字符与密钥按位异或
        const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
    }
    // Base64 编码处理
    return btoa(result);
};
/**
 * 解密函数（Base64 解码 + XOR 解密）
 * @param encoded 加密后的字符串
 * @param key 密钥
 */
const decrypt = (encoded, key = serviceConfig.layout.lockSecretKey) => {
    const decoded = atob(encoded);
    let result = "";
    for (let i = 0; i < decoded.length; i++) {
        const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
    }
    return result;
};
const router = useRouter();
const toLogin = async () => {
    // 调用退出登录接口
    await userStore.logout();
    // 重定向到登陆页
    router.push(LOGIN_URL);
};
onMounted(() => {
    mittBus.on(OpenLockPanelKey, () => (dialogVisible.value = true));
    if (isLock.value) {
        dialogVisible.value = true;
        setTimeout(() => {
            unlockInputInstance.value?.input?.focus();
        }, 100);
    }
});
onUnmounted(() => {
    // 清理禁用开发者工具的事件监听器
    if (cleanup)
        cleanup();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.b()) },
});
if (__VLS_ctx.showDevToolsWarning) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.ns.e('dev-tools-warning')) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.ns.e('warning-content')) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "warning-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['warning-icon']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "warning-title" },
    });
    /** @type {__VLS_StyleScopedClasses['warning-title']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "warning-text" },
    });
    /** @type {__VLS_StyleScopedClasses['warning-text']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.br)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "warning-subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['warning-subtitle']} */ ;
}
if (!__VLS_ctx.isLock) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    let __VLS_0;
    /** @ts-ignore @type {typeof ___VLS_components.elDialog | typeof ___VLS_components.ElDialog} */
    elDialog;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onOpen': {} },
        modelValue: (__VLS_ctx.dialogVisible),
        width: (370),
        showClose: (false),
        alignCenter: true,
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onOpen': {} },
        modelValue: (__VLS_ctx.dialogVisible),
        width: (370),
        showClose: (false),
        alignCenter: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ open: {} },
        { onOpen: (__VLS_ctx.handleDialogOpen) });
    const { default: __VLS_7 } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.ns.e('lock-content')) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.img)({
        ...{ class: "cover" },
        src: (__VLS_ctx.userInfo.avatar),
        alt: "用户头像",
    });
    /** @type {__VLS_StyleScopedClasses['cover']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "username" },
    });
    /** @type {__VLS_StyleScopedClasses['username']} */ ;
    (__VLS_ctx.userInfo.username);
    let __VLS_8;
    /** @ts-ignore @type {typeof ___VLS_components.elForm | typeof ___VLS_components.ElForm} */
    elForm;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ 'onSubmit': {} },
        ref: "formInstance",
        model: (__VLS_ctx.formData),
        rules: (__VLS_ctx.rules),
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onSubmit': {} },
        ref: "formInstance",
        model: (__VLS_ctx.formData),
        rules: (__VLS_ctx.rules),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_13;
    const __VLS_14 = ({ submit: {} },
        { onSubmit: (__VLS_ctx.handleLock) });
    var __VLS_15 = {};
    const { default: __VLS_17 } = __VLS_11.slots;
    let __VLS_18;
    /** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
        prop: "password",
    }));
    const __VLS_20 = __VLS_19({
        prop: "password",
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const { default: __VLS_23 } = __VLS_21.slots;
    let __VLS_24;
    /** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
    elInput;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...{ 'onKeyup': {} },
        modelValue: (__VLS_ctx.formData.password),
        type: "password",
        placeholder: (__VLS_ctx.$t('_lockScreen.inputPlaceholder')),
        showPassword: (true),
        ref: "lockInputInstance",
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onKeyup': {} },
        modelValue: (__VLS_ctx.formData.password),
        type: "password",
        placeholder: (__VLS_ctx.$t('_lockScreen.inputPlaceholder')),
        showPassword: (true),
        ref: "lockInputInstance",
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_29;
    const __VLS_30 = ({ keyup: {} },
        { onKeyup: (...[$event]) => {
                if (__VLS_ctx.isLock)
                    return;
                __VLS_ctx.handleLock(__VLS_ctx.formInstance);
                // @ts-ignore
                [ns, ns, ns, ns, showDevToolsWarning, isLock, dialogVisible, handleDialogOpen, userInfo, userInfo, formData, formData, rules, handleLock, handleLock, $t, formInstance,];
            } });
    var __VLS_31 = {};
    const { default: __VLS_33 } = __VLS_27.slots;
    {
        const { suffix: __VLS_34 } = __VLS_27.slots;
        let __VLS_35;
        /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
        elIcon;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
            ...{ 'onClick': {} },
            ...{ class: "cursor-pointer" },
        }));
        const __VLS_37 = __VLS_36({
            ...{ 'onClick': {} },
            ...{ class: "cursor-pointer" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        let __VLS_40;
        const __VLS_41 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (__VLS_ctx.isLock)
                        return;
                    __VLS_ctx.handleLock(__VLS_ctx.formInstance);
                    // @ts-ignore
                    [handleLock, formInstance,];
                } });
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        const { default: __VLS_42 } = __VLS_38.slots;
        let __VLS_43;
        /** @ts-ignore @type {typeof ___VLS_components.Lock} */
        Lock;
        // @ts-ignore
        const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({}));
        const __VLS_45 = __VLS_44({}, ...__VLS_functionalComponentArgsRest(__VLS_44));
        // @ts-ignore
        [];
        var __VLS_38;
        var __VLS_39;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_27;
    var __VLS_28;
    // @ts-ignore
    [];
    var __VLS_21;
    let __VLS_48;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ class: "lock-btn" },
    }));
    const __VLS_50 = __VLS_49({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ class: "lock-btn" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    let __VLS_53;
    const __VLS_54 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (__VLS_ctx.isLock)
                    return;
                __VLS_ctx.handleLock(__VLS_ctx.formInstance);
                // @ts-ignore
                [handleLock, formInstance,];
            } });
    /** @type {__VLS_StyleScopedClasses['lock-btn']} */ ;
    const { default: __VLS_55 } = __VLS_51.slots;
    (__VLS_ctx.$t("_lockScreen.lockButtonText"));
    // @ts-ignore
    [$t,];
    var __VLS_51;
    var __VLS_52;
    // @ts-ignore
    [];
    var __VLS_11;
    var __VLS_12;
    // @ts-ignore
    [];
    var __VLS_3;
    var __VLS_4;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.ns.e('unlock-content')) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.ns.e('box')) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.img)({
        ...{ class: "cover" },
        src: (__VLS_ctx.userInfo.avatar),
        alt: "用户头像",
    });
    /** @type {__VLS_StyleScopedClasses['cover']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "username" },
    });
    /** @type {__VLS_StyleScopedClasses['username']} */ ;
    (__VLS_ctx.userInfo.username);
    let __VLS_56;
    /** @ts-ignore @type {typeof ___VLS_components.elForm | typeof ___VLS_components.ElForm} */
    elForm;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        ...{ 'onSubmit': {} },
        ref: "unlockFormInstance",
        model: (__VLS_ctx.unlockForm),
        rules: (__VLS_ctx.rules),
    }));
    const __VLS_58 = __VLS_57({
        ...{ 'onSubmit': {} },
        ref: "unlockFormInstance",
        model: (__VLS_ctx.unlockForm),
        rules: (__VLS_ctx.rules),
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    let __VLS_61;
    const __VLS_62 = ({ submit: {} },
        { onSubmit: (...[$event]) => {
                if (!__VLS_ctx.isLock)
                    return;
                __VLS_ctx.handleUnlock(__VLS_ctx.unlockFormInstance);
                // @ts-ignore
                [ns, ns, userInfo, userInfo, rules, unlockForm, handleUnlock, unlockFormInstance,];
            } });
    var __VLS_63 = {};
    const { default: __VLS_65 } = __VLS_59.slots;
    let __VLS_66;
    /** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
    elFormItem;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
        prop: "password",
    }));
    const __VLS_68 = __VLS_67({
        prop: "password",
    }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    const { default: __VLS_71 } = __VLS_69.slots;
    let __VLS_72;
    /** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
    elInput;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
        modelValue: (__VLS_ctx.unlockForm.password),
        type: "password",
        placeholder: (__VLS_ctx.$t('_lockScreen.unInputPlaceholder')),
        showPassword: (true),
        ref: "unlockInputInstance",
    }));
    const __VLS_74 = __VLS_73({
        modelValue: (__VLS_ctx.unlockForm.password),
        type: "password",
        placeholder: (__VLS_ctx.$t('_lockScreen.unInputPlaceholder')),
        showPassword: (true),
        ref: "unlockInputInstance",
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    var __VLS_77 = {};
    const { default: __VLS_79 } = __VLS_75.slots;
    {
        const { suffix: __VLS_80 } = __VLS_75.slots;
        let __VLS_81;
        /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
        elIcon;
        // @ts-ignore
        const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
            ...{ 'onClick': {} },
            ...{ class: "cursor-pointer" },
        }));
        const __VLS_83 = __VLS_82({
            ...{ 'onClick': {} },
            ...{ class: "cursor-pointer" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_82));
        let __VLS_86;
        const __VLS_87 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!__VLS_ctx.isLock)
                        return;
                    __VLS_ctx.handleUnlock(__VLS_ctx.unlockFormInstance);
                    // @ts-ignore
                    [$t, unlockForm, handleUnlock, unlockFormInstance,];
                } });
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        const { default: __VLS_88 } = __VLS_84.slots;
        let __VLS_89;
        /** @ts-ignore @type {typeof ___VLS_components.Unlock} */
        Unlock;
        // @ts-ignore
        const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({}));
        const __VLS_91 = __VLS_90({}, ...__VLS_functionalComponentArgsRest(__VLS_90));
        // @ts-ignore
        [];
        var __VLS_84;
        var __VLS_85;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_75;
    // @ts-ignore
    [];
    var __VLS_69;
    let __VLS_94;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ class: "unlock-btn" },
    }));
    const __VLS_96 = __VLS_95({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ class: "unlock-btn" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_95));
    let __VLS_99;
    const __VLS_100 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!__VLS_ctx.isLock)
                    return;
                __VLS_ctx.handleUnlock(__VLS_ctx.unlockFormInstance);
                // @ts-ignore
                [handleUnlock, unlockFormInstance,];
            } });
    /** @type {__VLS_StyleScopedClasses['unlock-btn']} */ ;
    const { default: __VLS_101 } = __VLS_97.slots;
    (__VLS_ctx.$t("_lockScreen.unlockButtonText"));
    // @ts-ignore
    [$t,];
    var __VLS_97;
    var __VLS_98;
    let __VLS_102;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
        ...{ 'onClick': {} },
        text: true,
        ...{ class: "login-btn" },
    }));
    const __VLS_104 = __VLS_103({
        ...{ 'onClick': {} },
        text: true,
        ...{ class: "login-btn" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_103));
    let __VLS_107;
    const __VLS_108 = ({ click: {} },
        { onClick: (__VLS_ctx.toLogin) });
    /** @type {__VLS_StyleScopedClasses['login-btn']} */ ;
    const { default: __VLS_109 } = __VLS_105.slots;
    (__VLS_ctx.$t("_lockScreen.backLogin"));
    // @ts-ignore
    [$t, toLogin,];
    var __VLS_105;
    var __VLS_106;
    // @ts-ignore
    [];
    var __VLS_59;
    var __VLS_60;
}
// @ts-ignore
var __VLS_16 = __VLS_15, __VLS_32 = __VLS_31, __VLS_64 = __VLS_63, __VLS_78 = __VLS_77;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
