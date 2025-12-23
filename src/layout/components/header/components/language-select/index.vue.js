/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElMessage } from "element-plus";
import { languageOptions } from "@/common/languages";
import { useBrowserTitle } from "@/composables";
import { useLayoutStore } from "@/pinia";
const localList = [...languageOptions];
const i18n = useI18n();
const layoutStore = useLayoutStore();
const { getBrowserTitle } = useBrowserTitle();
const { language } = storeToRefs(layoutStore);
/**
 * 切换语言
 */
const handleSelectLanguage = (lang) => {
    i18n.locale.value = lang;
    layoutStore.$patch({ language: lang });
    document.documentElement.lang = lang;
    window.document.title = getBrowserTitle();
    let message = i18n.t("_headerBar.changeLanguage");
    message = message === "_headerBar.changeLanguage" ? "修改语言成功！" : message;
    ElMessage.success(message);
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elDropdown | typeof ___VLS_components.ElDropdown} */
elDropdown;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onCommand': {} },
    trigger: "click",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onCommand': {} },
    trigger: "click",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ command: {} },
    { onCommand: (__VLS_ctx.handleSelectLanguage) });
var __VLS_7 = {};
const { default: __VLS_8 } = __VLS_3.slots;
let __VLS_9;
/** @ts-ignore @type {typeof ___VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    icon: "core-language",
    ...{ style: {} },
}));
const __VLS_11 = __VLS_10({
    icon: "core-language",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
{
    const { dropdown: __VLS_14 } = __VLS_3.slots;
    let __VLS_15;
    /** @ts-ignore @type {typeof ___VLS_components.elDropdownMenu | typeof ___VLS_components.ElDropdownMenu} */
    elDropdownMenu;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({}));
    const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_20 } = __VLS_18.slots;
    for (const [local] of __VLS_getVForSourceType((__VLS_ctx.localList))) {
        let __VLS_21;
        /** @ts-ignore @type {typeof ___VLS_components.elDropdownItem | typeof ___VLS_components.ElDropdownItem} */
        elDropdownItem;
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
            key: (local.value),
            command: (local.value),
            disabled: (__VLS_ctx.language === local.value),
        }));
        const __VLS_23 = __VLS_22({
            key: (local.value),
            command: (local.value),
            disabled: (__VLS_ctx.language === local.value),
        }, ...__VLS_functionalComponentArgsRest(__VLS_22));
        const { default: __VLS_26 } = __VLS_24.slots;
        (local.label);
        // @ts-ignore
        [handleSelectLanguage, localList, language,];
        var __VLS_24;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_18;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
