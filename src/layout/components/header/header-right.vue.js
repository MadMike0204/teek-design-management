/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useErrorLogStore, useSettingStore } from "@/pinia";
import { serviceConfig } from "@/common/config";
import { useCommon, useNamespace } from "@/composables";
import Fullscreen from "./components/fullscreen/index.vue";
import LanguageSelect from "./components/language-select/index.vue";
import UserAvatar from "./components/user-avatar/index.vue";
import ErrorLog from "./components/error-log/index.vue";
import GlobalSearch from "./components/global-search/index.vue";
import GlobalSearchInput from "./components/global-search/input.vue";
import LightDarkSwitch from "./components/light-dark-switch/index.vue";
defineOptions({ name: "HeaderRight" });
const ns = useNamespace("header-right");
const errorLogStore = useErrorLogStore();
const settingStore = useSettingStore();
const { widget } = storeToRefs(settingStore);
/**
 * 未读错误日志数量
 */
const errorCount = computed(() => {
    const noReadErrorLogs = errorLogStore.errorLogs.filter(errorLog => {
        return !errorLog.hasRead;
    });
    return noReadErrorLogs.length;
});
const { isMobile } = useCommon();
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.b()) },
    ...{ class: "flx-center" },
});
/** @type {__VLS_StyleScopedClasses['flx-center']} */ ;
const __VLS_0 = GlobalSearch;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('btn')) },
    ...{ style: ({ '--icon-size': __VLS_ctx.ns.cssVar('layout-header-icon-size') }) },
    ...{ class: "flx-align-center" },
});
/** @type {__VLS_StyleScopedClasses['flx-align-center']} */ ;
if (!__VLS_ctx.isMobile && __VLS_ctx.widget.search) {
    const __VLS_5 = GlobalSearchInput;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        id: "menuSearch",
    }));
    const __VLS_7 = __VLS_6({
        id: "menuSearch",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
if (!__VLS_ctx.isMobile && __VLS_ctx.widget.fullscreen) {
    const __VLS_10 = Fullscreen;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        id: "fullscreen",
    }));
    const __VLS_12 = __VLS_11({
        id: "fullscreen",
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
}
if (__VLS_ctx.widget.language) {
    const __VLS_15 = LanguageSelect;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        id: "languageSelect",
    }));
    const __VLS_17 = __VLS_16({
        id: "languageSelect",
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
}
if (__VLS_ctx.serviceConfig.layout.errorLog.showInHeader && __VLS_ctx.errorCount > 0 && !__VLS_ctx.isMobile) {
    const __VLS_20 = ErrorLog;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        id: "errorLog",
        errorCount: (__VLS_ctx.errorCount),
    }));
    const __VLS_22 = __VLS_21({
        id: "errorLog",
        errorCount: (__VLS_ctx.errorCount),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
}
if (__VLS_ctx.widget.theme) {
    const __VLS_25 = LightDarkSwitch;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        id: "lightDarkSwitch",
    }));
    const __VLS_27 = __VLS_26({
        id: "lightDarkSwitch",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
}
const __VLS_30 = UserAvatar;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    id: "user",
    name: (false),
}));
const __VLS_32 = __VLS_31({
    id: "user",
    name: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
// @ts-ignore
[ns, ns, ns, isMobile, isMobile, isMobile, widget, widget, widget, widget, serviceConfig, errorCount, errorCount,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
