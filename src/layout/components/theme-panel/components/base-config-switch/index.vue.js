/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useLayoutStore, useSettingStore } from "@/pinia";
import { HeaderMenuAlignEnum, HeaderStyleEnum, LanguageEnum, MenuShowModeEnum, PageTransitionEnum, TabNavElementModeEnum, ThemePanelTriggerPositionEnum, LayoutModeEnum, HeaderShowModeEnum, MenuStyleEnum, } from "@/common/enums";
import { languageOptions } from "@/common/languages";
import { useBrowserTitle, useCommon, useNamespace } from "@/composables";
defineOptions({ name: "BaseConfigSwitch" });
const ns = useNamespace("base-config-switch");
const settingStore = useSettingStore();
const layoutStore = useLayoutStore();
const { isMobile } = useCommon();
const { getBrowserTitle } = useBrowserTitle();
const { t, locale } = useI18n();
const { layout, header, menu, tabNav, breadcrumb, transition, logo, widget, shortcutKey } = storeToRefs(settingStore);
const { language } = storeToRefs(layoutStore);
/**
 * 标签栏模式选项
 */
const tabNavElementModeOptions = computed(() => [
    { value: TabNavElementModeEnum.Simple, label: t("_setting.tabNav.modeSelect.simple") },
    { value: TabNavElementModeEnum.Classic, label: t("_setting.tabNav.modeSelect.classic") },
    { value: TabNavElementModeEnum.Element, label: t("_setting.tabNav.modeSelect.element") },
]);
/**
 * 页面过渡选项
 */
const pageTransitionOptions = computed(() => [
    { value: PageTransitionEnum.None, label: t("_setting.transition.pageEnterSelect.none") },
    { value: PageTransitionEnum.Fade, label: t("_setting.transition.pageEnterSelect.fade") },
    { value: PageTransitionEnum.SlideLeft, label: t("_setting.transition.pageEnterSelect.slideLeft") },
    { value: PageTransitionEnum.SlideTop, label: t("_setting.transition.pageEnterSelect.slideTop") },
    { value: PageTransitionEnum.SlideBottom, label: t("_setting.transition.pageEnterSelect.slideBottom") },
]);
/**
 * 头部样式选项
 */
const headerStyleOptions = computed(() => [
    { value: HeaderStyleEnum.Page, label: t("_setting.header.styleSelect.page") },
    { value: HeaderStyleEnum.Bg, label: t("_setting.header.styleSelect.background") },
    { value: HeaderStyleEnum.Line, label: t("_setting.header.styleSelect.line") },
    { value: HeaderStyleEnum.BgLine, label: t("_setting.header.styleSelect.backgroundLine") },
]);
const headerMenuAlignOptions = [
    { value: HeaderMenuAlignEnum.Start, label: t("_setting.header.menuAlignSelect.start") },
    { value: HeaderMenuAlignEnum.Center, label: t("_setting.header.menuAlignSelect.center") },
    { value: HeaderMenuAlignEnum.End, label: t("_setting.header.menuAlignSelect.end") },
];
const menuStyleOptions = computed(() => [
    { value: MenuStyleEnum.Simple, label: t("_setting.menu.styleSelect.simple") },
    { value: MenuStyleEnum.Round, label: t("_setting.menu.styleSelect.round") },
]);
const menuShowModeOptions = computed(() => [
    { value: MenuShowModeEnum.Static, label: t("_setting.menu.showModeSelect.static") },
    { value: MenuShowModeEnum.AutoCollapse, label: t("_setting.menu.showModeSelect.autoCollapse") },
    { value: MenuShowModeEnum.AutoHidden, label: t("_setting.menu.showModeSelect.autoHidden") },
]);
const headerShowModeOptions = computed(() => [
    { value: HeaderShowModeEnum.Static, label: t("_setting.header.showModeSelect.static") },
    { value: HeaderShowModeEnum.Fixed, label: t("_setting.header.showModeSelect.fixed") },
    { value: HeaderShowModeEnum.AutoHidden, label: t("_setting.header.showModeSelect.autoHidden") },
    { value: HeaderShowModeEnum.ScrollHidden, label: t("_setting.header.showModeSelect.scrollHidden") },
]);
const sizeOptions = computed(() => [
    { label: "Large", value: "large" },
    { label: "Default", value: "default" },
    { label: "Small", value: "small" },
]);
const themePanelTriggerPositionOptions = computed(() => [
    { value: ThemePanelTriggerPositionEnum.Header, label: t("_setting.layout.themePanelTriggerPositionSelect.header") },
    { value: ThemePanelTriggerPositionEnum.Fixed, label: t("_setting.layout.themePanelTriggerPositionSelect.fixed") },
]);
/**
 * 切换语言
 */
const handleSelectLanguage = (lang) => {
    locale.value = lang;
    layoutStore.$patch({ language: lang });
    document.documentElement.lang = lang;
    window.document.title = getBrowserTitle();
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.b()) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
(__VLS_ctx.$t("_setting.header.label"));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.header.enabled"));
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.header.enabled),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.header.enabled),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.header.height"));
let __VLS_5;
/** @ts-ignore @type {typeof ___VLS_components.elInputNumber | typeof ___VLS_components.ElInputNumber} */
elInputNumber;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    modelValue: (__VLS_ctx.header.height),
    min: (35),
    max: (70),
    step: (2),
    controlsPosition: "right",
}));
const __VLS_7 = __VLS_6({
    modelValue: (__VLS_ctx.header.height),
    min: (35),
    max: (70),
    step: (2),
    controlsPosition: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.header.style"));
let __VLS_10;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    modelValue: (__VLS_ctx.header.style),
    placeholder: "Select",
}));
const __VLS_12 = __VLS_11({
    modelValue: (__VLS_ctx.header.style),
    placeholder: "Select",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_15 } = __VLS_13.slots;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.headerStyleOptions))) {
    let __VLS_16;
    /** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }));
    const __VLS_18 = __VLS_17({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    // @ts-ignore
    [ns, ns, ns, ns, $t, $t, $t, $t, header, header, header, headerStyleOptions,];
}
// @ts-ignore
[];
var __VLS_13;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.header.showMode"));
let __VLS_21;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    modelValue: (__VLS_ctx.header.showMode),
    placeholder: "Select",
}));
const __VLS_23 = __VLS_22({
    modelValue: (__VLS_ctx.header.showMode),
    placeholder: "Select",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_26 } = __VLS_24.slots;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.headerShowModeOptions))) {
    let __VLS_27;
    /** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }));
    const __VLS_29 = __VLS_28({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    // @ts-ignore
    [ns, $t, header, headerShowModeOptions,];
}
// @ts-ignore
[];
var __VLS_24;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.header.menuAlign"));
let __VLS_32;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    modelValue: (__VLS_ctx.header.menuAlign),
    placeholder: "Select",
}));
const __VLS_34 = __VLS_33({
    modelValue: (__VLS_ctx.header.menuAlign),
    placeholder: "Select",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const { default: __VLS_37 } = __VLS_35.slots;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.headerMenuAlignOptions))) {
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
    [ns, $t, header, headerMenuAlignOptions,];
}
// @ts-ignore
[];
var __VLS_35;
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
(__VLS_ctx.$t("_setting.menu.label"));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.menu.enabled"));
let __VLS_43;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    modelValue: (__VLS_ctx.menu.enabled),
}));
const __VLS_45 = __VLS_44({
    modelValue: (__VLS_ctx.menu.enabled),
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.menu.collapse"));
let __VLS_48;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    modelValue: (__VLS_ctx.menu.collapsed),
}));
const __VLS_50 = __VLS_49({
    modelValue: (__VLS_ctx.menu.collapsed),
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.menu.accordion"));
let __VLS_53;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    modelValue: (__VLS_ctx.menu.accordion),
}));
const __VLS_55 = __VLS_54({
    modelValue: (__VLS_ctx.menu.accordion),
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.menu.autoActivateChild"));
let __VLS_58;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
    modelValue: (__VLS_ctx.menu.autoActivateChild),
    disabled: (![__VLS_ctx.LayoutModeEnum.Columns].includes(__VLS_ctx.layout.layoutMode)),
}));
const __VLS_60 = __VLS_59({
    modelValue: (__VLS_ctx.menu.autoActivateChild),
    disabled: (![__VLS_ctx.LayoutModeEnum.Columns].includes(__VLS_ctx.layout.layoutMode)),
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.menu.showModeAutoFixed"));
let __VLS_63;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
    modelValue: (__VLS_ctx.menu.showModeAutoFixed),
}));
const __VLS_65 = __VLS_64({
    modelValue: (__VLS_ctx.menu.showModeAutoFixed),
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.menu.width"));
let __VLS_68;
/** @ts-ignore @type {typeof ___VLS_components.elInputNumber | typeof ___VLS_components.ElInputNumber} */
elInputNumber;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    modelValue: (__VLS_ctx.menu.width),
    min: (100),
    max: (400),
    step: (10),
    controlsPosition: "right",
}));
const __VLS_70 = __VLS_69({
    modelValue: (__VLS_ctx.menu.width),
    min: (100),
    max: (400),
    step: (10),
    controlsPosition: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.menu.style"));
let __VLS_73;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    modelValue: (__VLS_ctx.menu.style),
    placeholder: "Select",
}));
const __VLS_75 = __VLS_74({
    modelValue: (__VLS_ctx.menu.style),
    placeholder: "Select",
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
const { default: __VLS_78 } = __VLS_76.slots;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.menuStyleOptions))) {
    let __VLS_79;
    /** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }));
    const __VLS_81 = __VLS_80({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
    // @ts-ignore
    [ns, ns, ns, ns, ns, ns, ns, $t, $t, $t, $t, $t, $t, $t, $t, menu, menu, menu, menu, menu, menu, menu, LayoutModeEnum, layout, menuStyleOptions,];
}
// @ts-ignore
[];
var __VLS_76;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.menu.showMode"));
let __VLS_84;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    modelValue: (__VLS_ctx.menu.showMode),
    placeholder: "Select",
}));
const __VLS_86 = __VLS_85({
    modelValue: (__VLS_ctx.menu.showMode),
    placeholder: "Select",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
const { default: __VLS_89 } = __VLS_87.slots;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.menuShowModeOptions))) {
    let __VLS_90;
    /** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }));
    const __VLS_92 = __VLS_91({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_91));
    // @ts-ignore
    [ns, $t, menu, menuShowModeOptions,];
}
// @ts-ignore
[];
var __VLS_87;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.menu.rightClickMenuCollapseToClose"));
let __VLS_95;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({
    modelValue: (__VLS_ctx.menu.rightClickMenuCollapseToClose),
}));
const __VLS_97 = __VLS_96({
    modelValue: (__VLS_ctx.menu.rightClickMenuCollapseToClose),
}, ...__VLS_functionalComponentArgsRest(__VLS_96));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
(__VLS_ctx.$t("_setting.breadcrumb.label"));
if (!__VLS_ctx.isMobile) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.ns.e('item')) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.$t("_setting.breadcrumb.enabled"));
    let __VLS_100;
    /** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
    elSwitch;
    // @ts-ignore
    const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
        modelValue: (__VLS_ctx.breadcrumb.enabled),
    }));
    const __VLS_102 = __VLS_101({
        modelValue: (__VLS_ctx.breadcrumb.enabled),
    }, ...__VLS_functionalComponentArgsRest(__VLS_101));
}
if (!__VLS_ctx.isMobile) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.ns.e('item')) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.$t("_setting.breadcrumb.showIcon"));
    let __VLS_105;
    /** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
    elSwitch;
    // @ts-ignore
    const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
        modelValue: (__VLS_ctx.breadcrumb.showIcon),
    }));
    const __VLS_107 = __VLS_106({
        modelValue: (__VLS_ctx.breadcrumb.showIcon),
    }, ...__VLS_functionalComponentArgsRest(__VLS_106));
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.breadcrumb.hideOnlyOne"));
let __VLS_110;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
    modelValue: (__VLS_ctx.breadcrumb.hideOnlyOne),
}));
const __VLS_112 = __VLS_111({
    modelValue: (__VLS_ctx.breadcrumb.hideOnlyOne),
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.breadcrumb.showHome"));
let __VLS_115;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({
    modelValue: (__VLS_ctx.breadcrumb.showHome),
}));
const __VLS_117 = __VLS_116({
    modelValue: (__VLS_ctx.breadcrumb.showHome),
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.breadcrumb.onlyShowHomeIcon"));
let __VLS_120;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({
    modelValue: (__VLS_ctx.breadcrumb.onlyShowHomeIcon),
}));
const __VLS_122 = __VLS_121({
    modelValue: (__VLS_ctx.breadcrumb.onlyShowHomeIcon),
}, ...__VLS_functionalComponentArgsRest(__VLS_121));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
(__VLS_ctx.$t("_setting.tabNav.label"));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.enabled"));
let __VLS_125;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({
    modelValue: (__VLS_ctx.tabNav.enabled),
}));
const __VLS_127 = __VLS_126({
    modelValue: (__VLS_ctx.tabNav.enabled),
}, ...__VLS_functionalComponentArgsRest(__VLS_126));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.mode"));
let __VLS_130;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
    modelValue: (__VLS_ctx.tabNav.elementMode),
    placeholder: "Select",
}));
const __VLS_132 = __VLS_131({
    modelValue: (__VLS_ctx.tabNav.elementMode),
    placeholder: "Select",
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
const { default: __VLS_135 } = __VLS_133.slots;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.tabNavElementModeOptions))) {
    let __VLS_136;
    /** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }));
    const __VLS_138 = __VLS_137({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_137));
    // @ts-ignore
    [ns, ns, ns, ns, ns, ns, ns, ns, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, menu, isMobile, isMobile, breadcrumb, breadcrumb, breadcrumb, breadcrumb, breadcrumb, tabNav, tabNav, tabNavElementModeOptions,];
}
// @ts-ignore
[];
var __VLS_133;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.height"));
let __VLS_141;
/** @ts-ignore @type {typeof ___VLS_components.elInputNumber | typeof ___VLS_components.ElInputNumber} */
elInputNumber;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({
    modelValue: (__VLS_ctx.tabNav.height),
    min: (25),
    max: (50),
    step: (2),
    controlsPosition: "right",
}));
const __VLS_143 = __VLS_142({
    modelValue: (__VLS_ctx.tabNav.height),
    min: (25),
    max: (50),
    step: (2),
    controlsPosition: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_142));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.maxCount"));
let __VLS_146;
/** @ts-ignore @type {typeof ___VLS_components.elInputNumber | typeof ___VLS_components.ElInputNumber} */
elInputNumber;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
    modelValue: (__VLS_ctx.tabNav.maxCount),
    min: (0),
    max: (30),
    step: (5),
    controlsPosition: "right",
}));
const __VLS_148 = __VLS_147({
    modelValue: (__VLS_ctx.tabNav.maxCount),
    min: (0),
    max: (30),
    step: (5),
    controlsPosition: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.showIcon"));
let __VLS_151;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_152 = __VLS_asFunctionalComponent(__VLS_151, new __VLS_151({
    modelValue: (__VLS_ctx.tabNav.showIcon),
}));
const __VLS_153 = __VLS_152({
    modelValue: (__VLS_ctx.tabNav.showIcon),
}, ...__VLS_functionalComponentArgsRest(__VLS_152));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.showDot"));
let __VLS_156;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({
    modelValue: (__VLS_ctx.tabNav.showDot),
}));
const __VLS_158 = __VLS_157({
    modelValue: (__VLS_ctx.tabNav.showDot),
}, ...__VLS_functionalComponentArgsRest(__VLS_157));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.persistence"));
let __VLS_161;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({
    modelValue: (__VLS_ctx.tabNav.persistence),
}));
const __VLS_163 = __VLS_162({
    modelValue: (__VLS_ctx.tabNav.persistence),
}, ...__VLS_functionalComponentArgsRest(__VLS_162));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.fixed"));
let __VLS_166;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({
    modelValue: (__VLS_ctx.tabNav.fixed),
}));
const __VLS_168 = __VLS_167({
    modelValue: (__VLS_ctx.tabNav.fixed),
}, ...__VLS_functionalComponentArgsRest(__VLS_167));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.draggable"));
let __VLS_171;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_172 = __VLS_asFunctionalComponent(__VLS_171, new __VLS_171({
    modelValue: (__VLS_ctx.tabNav.draggable),
}));
const __VLS_173 = __VLS_172({
    modelValue: (__VLS_ctx.tabNav.draggable),
}, ...__VLS_functionalComponentArgsRest(__VLS_172));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.middleClickToClose"));
let __VLS_176;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_177 = __VLS_asFunctionalComponent(__VLS_176, new __VLS_176({
    modelValue: (__VLS_ctx.tabNav.middleClickToClose),
}));
const __VLS_178 = __VLS_177({
    modelValue: (__VLS_ctx.tabNav.middleClickToClose),
}, ...__VLS_functionalComponentArgsRest(__VLS_177));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.middleClickToOpen"));
let __VLS_181;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_182 = __VLS_asFunctionalComponent(__VLS_181, new __VLS_181({
    modelValue: (__VLS_ctx.tabNav.middleClickToOpen),
}));
const __VLS_183 = __VLS_182({
    modelValue: (__VLS_ctx.tabNav.middleClickToOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_182));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.middleClickToOpenInNewWindow"));
let __VLS_186;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent(__VLS_186, new __VLS_186({
    modelValue: (__VLS_ctx.tabNav.middleClickToOpenInNewWindow),
}));
const __VLS_188 = __VLS_187({
    modelValue: (__VLS_ctx.tabNav.middleClickToOpenInNewWindow),
}, ...__VLS_functionalComponentArgsRest(__VLS_187));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.showMore"));
let __VLS_191;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_192 = __VLS_asFunctionalComponent(__VLS_191, new __VLS_191({
    modelValue: (__VLS_ctx.tabNav.showMore),
}));
const __VLS_193 = __VLS_192({
    modelValue: (__VLS_ctx.tabNav.showMore),
}, ...__VLS_functionalComponentArgsRest(__VLS_192));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.tabNav.wheel"));
let __VLS_196;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_197 = __VLS_asFunctionalComponent(__VLS_196, new __VLS_196({
    modelValue: (__VLS_ctx.tabNav.wheel),
}));
const __VLS_198 = __VLS_197({
    modelValue: (__VLS_ctx.tabNav.wheel),
}, ...__VLS_functionalComponentArgsRest(__VLS_197));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
(__VLS_ctx.$t("_setting.commonLabel"));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.logo.enable"));
let __VLS_201;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_202 = __VLS_asFunctionalComponent(__VLS_201, new __VLS_201({
    modelValue: (__VLS_ctx.logo.enable),
}));
const __VLS_203 = __VLS_202({
    modelValue: (__VLS_ctx.logo.enable),
}, ...__VLS_functionalComponentArgsRest(__VLS_202));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_tabNav.maximize"));
let __VLS_206;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_207 = __VLS_asFunctionalComponent(__VLS_206, new __VLS_206({
    modelValue: (__VLS_ctx.layout.maximize),
}));
const __VLS_208 = __VLS_207({
    modelValue: (__VLS_ctx.layout.maximize),
}, ...__VLS_functionalComponentArgsRest(__VLS_207));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.layout.watermark"));
let __VLS_211;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_212 = __VLS_asFunctionalComponent(__VLS_211, new __VLS_211({
    modelValue: (__VLS_ctx.layout.watermark),
}));
const __VLS_213 = __VLS_212({
    modelValue: (__VLS_ctx.layout.watermark),
}, ...__VLS_functionalComponentArgsRest(__VLS_212));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.layout.language"));
let __VLS_216;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_217 = __VLS_asFunctionalComponent(__VLS_216, new __VLS_216({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.language),
    placeholder: "Select",
}));
const __VLS_218 = __VLS_217({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.language),
    placeholder: "Select",
}, ...__VLS_functionalComponentArgsRest(__VLS_217));
let __VLS_221;
const __VLS_222 = ({ change: {} },
    { onChange: (__VLS_ctx.handleSelectLanguage) });
const { default: __VLS_223 } = __VLS_219.slots;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.languageOptions))) {
    let __VLS_224;
    /** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_225 = __VLS_asFunctionalComponent(__VLS_224, new __VLS_224({
        key: (item.value),
        label: (item.label),
        value: (item.value),
        disabled: (__VLS_ctx.language === item.value),
    }));
    const __VLS_226 = __VLS_225({
        key: (item.value),
        label: (item.label),
        value: (item.value),
        disabled: (__VLS_ctx.language === item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_225));
    // @ts-ignore
    [ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, layout, layout, tabNav, tabNav, tabNav, tabNav, tabNav, tabNav, tabNav, tabNav, tabNav, tabNav, tabNav, tabNav, logo, language, language, handleSelectLanguage, languageOptions,];
}
// @ts-ignore
[];
var __VLS_219;
var __VLS_220;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.layout.epSize"));
let __VLS_229;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_230 = __VLS_asFunctionalComponent(__VLS_229, new __VLS_229({
    modelValue: (__VLS_ctx.layout.elementPlusSize),
    placeholder: "Select",
}));
const __VLS_231 = __VLS_230({
    modelValue: (__VLS_ctx.layout.elementPlusSize),
    placeholder: "Select",
}, ...__VLS_functionalComponentArgsRest(__VLS_230));
const { default: __VLS_234 } = __VLS_232.slots;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.sizeOptions))) {
    let __VLS_235;
    /** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_236 = __VLS_asFunctionalComponent(__VLS_235, new __VLS_235({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }));
    const __VLS_237 = __VLS_236({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_236));
    // @ts-ignore
    [ns, $t, layout, sizeOptions,];
}
// @ts-ignore
[];
var __VLS_232;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.layout.themePanelTriggerPosition"));
let __VLS_240;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_241 = __VLS_asFunctionalComponent(__VLS_240, new __VLS_240({
    modelValue: (__VLS_ctx.layout.themePanelTriggerPosition),
    placeholder: "Select",
}));
const __VLS_242 = __VLS_241({
    modelValue: (__VLS_ctx.layout.themePanelTriggerPosition),
    placeholder: "Select",
}, ...__VLS_functionalComponentArgsRest(__VLS_241));
const { default: __VLS_245 } = __VLS_243.slots;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.themePanelTriggerPositionOptions))) {
    let __VLS_246;
    /** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_247 = __VLS_asFunctionalComponent(__VLS_246, new __VLS_246({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }));
    const __VLS_248 = __VLS_247({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_247));
    // @ts-ignore
    [ns, $t, layout, themePanelTriggerPositionOptions,];
}
// @ts-ignore
[];
var __VLS_243;
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
(__VLS_ctx.$t("_setting.transition.label"));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.transition.pageEnter"));
let __VLS_251;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_252 = __VLS_asFunctionalComponent(__VLS_251, new __VLS_251({
    modelValue: (__VLS_ctx.transition.pageEnter),
    placeholder: "Select",
}));
const __VLS_253 = __VLS_252({
    modelValue: (__VLS_ctx.transition.pageEnter),
    placeholder: "Select",
}, ...__VLS_functionalComponentArgsRest(__VLS_252));
const { default: __VLS_256 } = __VLS_254.slots;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.pageTransitionOptions))) {
    let __VLS_257;
    /** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
    elOption;
    // @ts-ignore
    const __VLS_258 = __VLS_asFunctionalComponent(__VLS_257, new __VLS_257({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }));
    const __VLS_259 = __VLS_258({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_258));
    // @ts-ignore
    [ns, $t, $t, transition, pageTransitionOptions,];
}
// @ts-ignore
[];
var __VLS_254;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.transition.progress"));
let __VLS_262;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_263 = __VLS_asFunctionalComponent(__VLS_262, new __VLS_262({
    modelValue: (__VLS_ctx.transition.progress),
}));
const __VLS_264 = __VLS_263({
    modelValue: (__VLS_ctx.transition.progress),
}, ...__VLS_functionalComponentArgsRest(__VLS_263));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.transition.loading"));
let __VLS_267;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_268 = __VLS_asFunctionalComponent(__VLS_267, new __VLS_267({
    modelValue: (__VLS_ctx.transition.loading),
}));
const __VLS_269 = __VLS_268({
    modelValue: (__VLS_ctx.transition.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_268));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
(__VLS_ctx.$t("_setting.widget.label"));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.widget.menuCollapse"));
let __VLS_272;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_273 = __VLS_asFunctionalComponent(__VLS_272, new __VLS_272({
    modelValue: (__VLS_ctx.widget.menuCollapse),
}));
const __VLS_274 = __VLS_273({
    modelValue: (__VLS_ctx.widget.menuCollapse),
}, ...__VLS_functionalComponentArgsRest(__VLS_273));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.widget.refresh"));
let __VLS_277;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_278 = __VLS_asFunctionalComponent(__VLS_277, new __VLS_277({
    modelValue: (__VLS_ctx.widget.refresh),
}));
const __VLS_279 = __VLS_278({
    modelValue: (__VLS_ctx.widget.refresh),
}, ...__VLS_functionalComponentArgsRest(__VLS_278));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.widget.search"));
let __VLS_282;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_283 = __VLS_asFunctionalComponent(__VLS_282, new __VLS_282({
    modelValue: (__VLS_ctx.widget.search),
}));
const __VLS_284 = __VLS_283({
    modelValue: (__VLS_ctx.widget.search),
}, ...__VLS_functionalComponentArgsRest(__VLS_283));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.widget.fullscreen"));
let __VLS_287;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_288 = __VLS_asFunctionalComponent(__VLS_287, new __VLS_287({
    modelValue: (__VLS_ctx.widget.fullscreen),
}));
const __VLS_289 = __VLS_288({
    modelValue: (__VLS_ctx.widget.fullscreen),
}, ...__VLS_functionalComponentArgsRest(__VLS_288));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.widget.notification"));
let __VLS_292;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_293 = __VLS_asFunctionalComponent(__VLS_292, new __VLS_292({
    modelValue: (__VLS_ctx.widget.notification),
}));
const __VLS_294 = __VLS_293({
    modelValue: (__VLS_ctx.widget.notification),
}, ...__VLS_functionalComponentArgsRest(__VLS_293));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.widget.language"));
let __VLS_297;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_298 = __VLS_asFunctionalComponent(__VLS_297, new __VLS_297({
    modelValue: (__VLS_ctx.widget.language),
}));
const __VLS_299 = __VLS_298({
    modelValue: (__VLS_ctx.widget.language),
}, ...__VLS_functionalComponentArgsRest(__VLS_298));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.widget.theme"));
let __VLS_302;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_303 = __VLS_asFunctionalComponent(__VLS_302, new __VLS_302({
    modelValue: (__VLS_ctx.widget.theme),
}));
const __VLS_304 = __VLS_303({
    modelValue: (__VLS_ctx.widget.theme),
}, ...__VLS_functionalComponentArgsRest(__VLS_303));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.widget.lockScreen"));
let __VLS_307;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_308 = __VLS_asFunctionalComponent(__VLS_307, new __VLS_307({
    modelValue: (__VLS_ctx.widget.lockScreen),
}));
const __VLS_309 = __VLS_308({
    modelValue: (__VLS_ctx.widget.lockScreen),
}, ...__VLS_functionalComponentArgsRest(__VLS_308));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
(__VLS_ctx.$t("_setting.shortcutKey.label"));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.shortcutKey.enable"));
let __VLS_312;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_313 = __VLS_asFunctionalComponent(__VLS_312, new __VLS_312({
    modelValue: (__VLS_ctx.shortcutKey.enable),
}));
const __VLS_314 = __VLS_313({
    modelValue: (__VLS_ctx.shortcutKey.enable),
}, ...__VLS_functionalComponentArgsRest(__VLS_313));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.shortcutKey.search"));
let __VLS_317;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_318 = __VLS_asFunctionalComponent(__VLS_317, new __VLS_317({
    modelValue: (__VLS_ctx.shortcutKey.search),
}));
const __VLS_319 = __VLS_318({
    modelValue: (__VLS_ctx.shortcutKey.search),
}, ...__VLS_functionalComponentArgsRest(__VLS_318));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.shortcutKey.logout"));
let __VLS_322;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_323 = __VLS_asFunctionalComponent(__VLS_322, new __VLS_322({
    modelValue: (__VLS_ctx.shortcutKey.logout),
}));
const __VLS_324 = __VLS_323({
    modelValue: (__VLS_ctx.shortcutKey.logout),
}, ...__VLS_functionalComponentArgsRest(__VLS_323));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('item')) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.$t("_setting.shortcutKey.lockScreen"));
let __VLS_327;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_328 = __VLS_asFunctionalComponent(__VLS_327, new __VLS_327({
    modelValue: (__VLS_ctx.shortcutKey.lockScreen),
}));
const __VLS_329 = __VLS_328({
    modelValue: (__VLS_ctx.shortcutKey.lockScreen),
}, ...__VLS_functionalComponentArgsRest(__VLS_328));
// @ts-ignore
[ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, $t, transition, transition, widget, widget, widget, widget, widget, widget, widget, widget, shortcutKey, shortcutKey, shortcutKey, shortcutKey,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
