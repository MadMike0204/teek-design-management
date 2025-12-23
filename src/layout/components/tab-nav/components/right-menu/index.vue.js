/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { unref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useEventListener } from "@vueuse/core";
import { Refresh, FullScreen, TopRight, Close, ArrowLeft, ArrowRight, SemiSelect, CircleClose, Lock, Unlock, } from "@element-plus/icons-vue";
import { openRouteInNewWindow } from "@/common/utils";
import { useNamespace } from "@/composables";
import { useSettingStore } from "@/pinia";
import { useTabNav } from "../../use-tab-nav";
defineOptions({ name: "RightMenu" });
const ns = useNamespace("right-menu");
const settingStore = useSettingStore();
const { tabNavList, refreshSelectedTab, toggleFixed, closeTab, closeLeftTab, closeRightTab, closeOthersTabs, closeAllTabs, } = useTabNav();
const props = withDefaults(defineProps(), {
    left: 0,
    right: 0,
    condition: () => ({}),
});
const visible = defineModel({ default: false });
const { t } = useI18n();
const triggerMaximize = () => {
    settingStore.$patch({ layout: { maximize: true } });
};
const rightMenuItem = [
    {
        label: t("_tabNav.refresh"),
        icon: Refresh,
        disabled: computed(() => !props.condition.refresh),
        click: () => refreshSelectedTab(props.selectedTab),
    },
    {
        label: computed(() => (props.selectedTab.close ? t("_tabNav.fixed") : t("_tabNav.unfixed"))),
        icon: computed(() => (props.selectedTab.close ? Lock : Unlock)),
        disabled: computed(() => tabNavList.value.length <= 1),
        click: () => toggleFixed(props.selectedTab.path),
    },
    {
        label: t("_tabNav.maximize"),
        icon: FullScreen,
        click: triggerMaximize,
    },
    {
        label: t("_tabNav.openInNewTab"),
        icon: TopRight,
        click: () => openRouteInNewWindow(props.selectedTab.path),
    },
    {
        label: t("_tabNav.closeCurrent"),
        icon: Close,
        disabled: computed(() => !props.condition.current),
        click: () => closeTab(props.selectedTab),
        divided: true,
    },
    {
        label: t("_tabNav.closeLeft"),
        icon: ArrowLeft,
        disabled: computed(() => !props.condition.left),
        click: () => closeLeftTab(props.selectedTab),
    },
    {
        label: t("_tabNav.closeRight"),
        icon: ArrowRight,
        disabled: computed(() => !props.condition.right),
        click: () => closeRightTab(props.selectedTab),
    },
    {
        label: t("_tabNav.closeOthers"),
        icon: SemiSelect,
        disabled: computed(() => !props.condition.other),
        click: () => closeOthersTabs(props.selectedTab),
    },
    {
        label: t("_tabNav.closeAll"),
        icon: CircleClose,
        disabled: computed(() => !props.condition.all),
        click: () => closeAllTabs(),
    },
];
const close = () => (visible.value = false);
const handleClick = (item) => {
    if (unref(item.disabled) ?? false)
        return;
    item.click();
    close();
};
const handleOutsideClick = (e) => {
    // 检查点击是否在菜单内部
    const target = e.target;
    const menuElement = document.querySelector(`.${ns.b()}`);
    if (menuElement && menuElement.contains(target))
        return;
    close();
};
// Escape 关闭右键菜单
const handleKeydown = (e) => {
    if (e.key === "Escape" && visible.value)
        close();
};
useEventListener("click", handleOutsideClick, { capture: true });
useEventListener("keydown", handleKeydown, { capture: true });
const __VLS_defaultModels = {
    'modelValue': false,
};
const __VLS_modelEmit = defineEmits();
const __VLS_defaults = {
    left: 0,
    right: 0,
    condition: () => ({}),
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ style: ({ left: `${__VLS_ctx.left}px`, top: `${__VLS_ctx.top}px` }) },
    ...{ class: (__VLS_ctx.ns.b()) },
});
__VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.visible) }, null, null);
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.rightMenuItem))) {
    (__VLS_ctx.unref(item.label));
    if (item.divided) {
        __VLS_asFunctionalElement(__VLS_intrinsics.li)({
            ...{ class: "divided" },
        });
        /** @type {__VLS_StyleScopedClasses['divided']} */ ;
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleClick(item);
                // @ts-ignore
                [left, top, ns, visible, rightMenuItem, unref, handleClick,];
            } },
        ...{ class: ([__VLS_ctx.ns.e('item'), __VLS_ctx.ns.is('disabled', __VLS_ctx.unref(item.disabled) ?? false)]) },
    });
    let __VLS_0;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "right-menu-icon" },
        icon: (__VLS_ctx.unref(item.icon)),
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "right-menu-icon" },
        icon: (__VLS_ctx.unref(item.icon)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['right-menu-icon']} */ ;
    (item.label);
    // @ts-ignore
    [ns, ns, unref, unref,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
