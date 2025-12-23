/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { CircleCheckFilled } from "@element-plus/icons-vue";
import { LayoutModeEnum } from "@/common/enums";
import { useNamespace } from "@/composables";
import { useSettingStore } from "@/pinia";
defineOptions({ name: "LayoutModeSwitch" });
const ns = useNamespace("layout-mode-switch");
const settingStore = useSettingStore();
const { t } = useI18n();
const { layout } = storeToRefs(settingStore);
const layoutModeList = computed(() => [
    {
        name: t("_setting.layout.layoutModeSelect.vertical"),
        mode: LayoutModeEnum.Vertical,
        content: `<div class="dark"></div> <div class="container"> <div class="light"></div><div class="content"></div> </div>`,
    },
    {
        name: t("_setting.layout.layoutModeSelect.classic"),
        mode: LayoutModeEnum.Classic,
        content: `<div class="dark"></div> <div class="container"> <div class="light"></div><div class="content"></div> </div>`,
    },
    {
        name: t("_setting.layout.layoutModeSelect.horizontal"),
        mode: LayoutModeEnum.Horizontal,
        content: `<div class="dark"></div> <div class="content"></div>`,
    },
    {
        name: t("_setting.layout.layoutModeSelect.columns"),
        mode: LayoutModeEnum.Columns,
        content: `<div class="dark"></div> <div class="light"></div> <div class="content"></div>`,
    },
    {
        name: t("_setting.layout.layoutModeSelect.mixins"),
        mode: LayoutModeEnum.Mixins,
        content: `<div class="dark"></div> <div class="container"> <div class="dark"></div><div class="content"></div> </div>`,
    },
    {
        name: t("_setting.layout.layoutModeSelect.iframe"),
        mode: LayoutModeEnum.IFrame,
        content: `<div class="dark"></div> <div class="content"></div>`,
    },
]);
/**
 * 切换布局模式
 */
const switchLayoutMode = (layoutMode) => {
    settingStore.$patch({
        layout: { layoutMode },
    });
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.b()) },
    ...{ class: "flx-wrap gap-15" },
});
/** @type {__VLS_StyleScopedClasses['flx-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-15']} */ ;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.layoutModeList))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.switchLayoutMode(item.mode);
                // @ts-ignore
                [ns, layoutModeList, switchLayoutMode,];
            } },
        key: (item.mode),
        ...{ class: (__VLS_ctx.ns.e('item')) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: ([__VLS_ctx.ns.e('box'), __VLS_ctx.ns.join(item.mode), __VLS_ctx.ns.is('active', item.mode === __VLS_ctx.layout.layoutMode)]) },
    });
    __VLS_asFunctionalDirective(___VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (item.content) }, null, null);
    let __VLS_0;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: (__VLS_ctx.ns.m('icon')) },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: (__VLS_ctx.ns.m('icon')) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (item.mode === __VLS_ctx.layout.layoutMode) }, null, null);
    const { default: __VLS_5 } = __VLS_3.slots;
    let __VLS_6;
    /** @ts-ignore @type {typeof ___VLS_components.CircleCheckFilled} */
    CircleCheckFilled;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [ns, ns, ns, ns, ns, layout, layout,];
    var __VLS_3;
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: (__VLS_ctx.ns.m('name')) },
    });
    (item.name);
    // @ts-ignore
    [ns,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
