/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ElSelect, ElOption } from "element-plus";
import { useI18n } from "vue-i18n";
import { TitleModeEnum } from "@/common/enums";
import { useNamespace, useBrowserTitle } from "@/composables";
import { useSettingStore } from "@/pinia";
defineOptions({ name: "BrowserTitleSwitch" });
const ns = useNamespace("browser-title-switch");
const { t } = useI18n();
const settingStore = useSettingStore();
const { getBrowserTitle } = useBrowserTitle();
const { layout } = storeToRefs(settingStore);
/**
 * 选择标题模式事件
 */
const handleTitleModeSelect = () => {
    // 根据选择的标题模式，重新渲染浏览器标题
    window.document.title = getBrowserTitle();
};
/**
 * 标题模式选项
 */
const titleModeOptions = computed(() => [
    { value: TitleModeEnum.ProjectPage, label: t("_setting.layout.titleModeSelect.projectPage") },
    { value: TitleModeEnum.UsernamePage, label: t("_setting.layout.titleModeSelect.usernamePage") },
    { value: TitleModeEnum.Project, label: t("_setting.layout.titleModeSelect.project") },
    { value: TitleModeEnum.Page, label: t("_setting.layout.titleModeSelect.page") },
]);
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.b()) },
});
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.layout.titleMode),
    placeholder: (__VLS_ctx.$t('_setting.layout.titleModePlaceholder')),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.layout.titleMode),
    placeholder: (__VLS_ctx.$t('_setting.layout.titleModePlaceholder')),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ change: {} },
    { onChange: (__VLS_ctx.handleTitleModeSelect) });
const { default: __VLS_7 } = __VLS_3.slots;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.titleModeOptions))) {
    let __VLS_8;
    /** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        key: (item.value),
        label: (item.label),
        value: (item.value),
        disabled: (item.value === __VLS_ctx.layout.titleMode),
    }));
    const __VLS_10 = __VLS_9({
        key: (item.value),
        label: (item.label),
        value: (item.value),
        disabled: (item.value === __VLS_ctx.layout.titleMode),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    // @ts-ignore
    [ns, layout, layout, $t, handleTitleModeSelect, titleModeOptions,];
}
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
