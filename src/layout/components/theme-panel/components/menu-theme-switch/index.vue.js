/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { CircleCheckFilled } from "@element-plus/icons-vue";
import { LayoutModeEnum, MenuThemeEnum } from "@/common/enums";
import lightTheme from "@/common/assets/images/menu-theme/light.png";
import darkTheme from "@/common/assets/images/menu-theme/dark.png";
import { useNamespace } from "@/composables";
import { useSettingStore } from "@/pinia";
defineOptions({ name: "MenuThemeSwitch" });
const ns = useNamespace("menu-theme-switch");
const settingStore = useSettingStore();
const { t } = useI18n();
const { layout, menu, isDark } = storeToRefs(settingStore);
const menuThemeModeList = computed(() => [
    {
        name: t("_setting.menu.themeSelect.light"),
        theme: MenuThemeEnum.Light,
        img: lightTheme,
    },
    {
        name: t("_setting.menu.themeSelect.dark"),
        theme: MenuThemeEnum.Dark,
        img: darkTheme,
    },
]);
const isDisable = computed(() => [LayoutModeEnum.Horizontal, LayoutModeEnum.Columns].includes(layout.value.layoutMode) || isDark.value);
/**
 * 切换菜单主题
 */
const switchMenuTheme = (theme) => {
    if (isDisable.value)
        return;
    settingStore.$patch({ menu: { theme } });
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
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.menuThemeModeList))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (item.theme),
        ...{ class: (__VLS_ctx.ns.e('item')) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.switchMenuTheme(item.theme);
                // @ts-ignore
                [ns, ns, menuThemeModeList, switchMenuTheme,];
            } },
        ...{ class: ([__VLS_ctx.ns.e('box'), __VLS_ctx.ns.is('active', item.theme === __VLS_ctx.menu.theme)]) },
        ...{ style: ({ cursor: __VLS_ctx.isDisable ? 'not-allowed' : 'pointer' }) },
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
    __VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (item.theme === __VLS_ctx.menu.theme) }, null, null);
    const { default: __VLS_5 } = __VLS_3.slots;
    let __VLS_6;
    /** @ts-ignore @type {typeof ___VLS_components.CircleCheckFilled} */
    CircleCheckFilled;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [ns, ns, ns, menu, menu, isDisable,];
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
