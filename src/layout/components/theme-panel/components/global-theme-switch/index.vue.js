/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useI18n } from "vue-i18n";
import { CircleCheckFilled } from "@element-plus/icons-vue";
import { useNamespace, useTheme } from "@/composables";
import { useSettingStore } from "@/pinia";
import { serviceConfig } from "@/common/config";
import { GlobalThemeEnum } from "@/common/enums";
import lightTheme from "@/common/assets/images/system-theme/light.png";
import darkTheme from "@/common/assets/images/system-theme/dark.png";
import systemTheme from "@/common/assets/images/system-theme/system.png";
defineOptions({ name: "GlobalThemeSwitch" });
const ns = useNamespace("global-theme-select");
const { changeGlobalTheme, changePrimaryColor, changeGreyOrWeak } = useTheme();
const settingStore = useSettingStore();
const { t } = useI18n();
const { theme, primaryColor } = storeToRefs(settingStore);
const globalThemeModeList = [
    { name: computed(() => t("_setting.theme.modeSelect.light")), theme: GlobalThemeEnum.Light, img: lightTheme },
    { name: computed(() => t("_setting.theme.modeSelect.darkBlue")), theme: GlobalThemeEnum.DarkBlue, img: darkTheme },
    { name: computed(() => t("_setting.theme.modeSelect.darkDeep")), theme: GlobalThemeEnum.DarkDeep, img: darkTheme },
    {
        name: computed(() => t("_setting.theme.modeSelect.darkMidnight")),
        theme: GlobalThemeEnum.DarkMidnight,
        img: darkTheme,
    },
    {
        name: computed(() => t("_setting.theme.modeSelect.darkNeutral")),
        theme: GlobalThemeEnum.DarkNeutral,
        img: darkTheme,
    },
    { name: computed(() => t("_setting.theme.modeSelect.system")), theme: GlobalThemeEnum.System, img: systemTheme },
];
// 预定义主题颜色
const colorList = computed(() => [
    primaryColor.value,
    ...(serviceConfig.theme.presetsColor[theme.value.globalThemeMode === GlobalThemeEnum.System ? theme.value.defaultDarkMode : theme.value.globalThemeMode] ?? []),
]);
/**
 * 自定义圆角选项
 */
const customRadiusOptions = [
    { value: "0", label: "0" },
    { value: "0.25", label: "0.25" },
    { value: "0.5", label: "0.5" },
    { value: "0.75", label: "0.75" },
    { value: "1", label: "1" },
    { value: "1.25", label: "1.25" },
    { value: "1.5", label: "1.5" },
    { value: "1.75", label: "1.75" },
    { value: "2", label: "2" },
];
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
    ...{ class: "flx-wrap gap-15" },
});
/** @type {__VLS_StyleScopedClasses['flx-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-15']} */ ;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.globalThemeModeList))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.changeGlobalTheme(item.theme);
                // @ts-ignore
                [ns, globalThemeModeList, changeGlobalTheme,];
            } },
        key: (item.theme),
        ...{ class: (__VLS_ctx.ns.e('theme-item')) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: ([__VLS_ctx.ns.e('box'), __VLS_ctx.ns.is('active', item.theme === __VLS_ctx.theme.globalThemeMode)]) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.img)({
        src: (item.img),
    });
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
    __VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (item.theme === __VLS_ctx.theme.globalThemeMode) }, null, null);
    const { default: __VLS_5 } = __VLS_3.slots;
    let __VLS_6;
    /** @ts-ignore @type {typeof ___VLS_components.CircleCheckFilled} */
    CircleCheckFilled;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [ns, ns, ns, ns, theme, theme,];
    var __VLS_3;
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: (__VLS_ctx.ns.m('name')) },
    });
    (item.name);
    // @ts-ignore
    [ns,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.theme.primaryColor"));
let __VLS_11;
/** @ts-ignore @type {typeof ___VLS_components.elColorPicker | typeof ___VLS_components.ElColorPicker} */
elColorPicker;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.primaryColor),
    predefine: (__VLS_ctx.colorList),
}));
const __VLS_13 = __VLS_12({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.primaryColor),
    predefine: (__VLS_ctx.colorList),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_16;
const __VLS_17 = ({ change: {} },
    { onChange: (val => val && __VLS_ctx.changePrimaryColor(val)) });
var __VLS_14;
var __VLS_15;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.theme.greyMode"));
let __VLS_18;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.theme.greyMode),
}));
const __VLS_20 = __VLS_19({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.theme.greyMode),
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
let __VLS_23;
const __VLS_24 = ({ change: {} },
    { onChange: (...[$event]) => {
            __VLS_ctx.changeGreyOrWeak($event, 'greyMode');
            // @ts-ignore
            [ns, ns, theme, $t, $t, primaryColor, colorList, changePrimaryColor, changeGreyOrWeak,];
        } });
var __VLS_21;
var __VLS_22;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.theme.weakMode"));
let __VLS_25;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.theme.weakMode),
}));
const __VLS_27 = __VLS_26({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.theme.weakMode),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_30;
const __VLS_31 = ({ change: {} },
    { onChange: (...[$event]) => {
            __VLS_ctx.changeGreyOrWeak($event, 'weakMode');
            // @ts-ignore
            [ns, theme, $t, changeGreyOrWeak,];
        } });
var __VLS_28;
var __VLS_29;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.theme.radius"));
let __VLS_32;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    modelValue: (__VLS_ctx.theme.radius),
    placeholder: "Select",
}));
const __VLS_34 = __VLS_33({
    modelValue: (__VLS_ctx.theme.radius),
    placeholder: "Select",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const { default: __VLS_37 } = __VLS_35.slots;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.customRadiusOptions))) {
    let __VLS_38;
    /** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }));
    const __VLS_40 = __VLS_39({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    // @ts-ignore
    [ns, theme, $t, customRadiusOptions,];
}
// @ts-ignore
[];
var __VLS_35;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
