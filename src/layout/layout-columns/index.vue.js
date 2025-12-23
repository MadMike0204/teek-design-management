/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ElContainer, ElAside, ElHeader, ElScrollbar } from "element-plus";
import { Fold, Expand } from "@element-plus/icons-vue";
import { serviceConfig, HOME_URL } from "@/common/config";
import { Tooltip } from "@/components";
import { useCommon, useMenu } from "@/composables";
import { useSettingStore } from "@/pinia";
import { useNamespace } from "@/composables";
import { useMenuAreaMouse, useHeaderAreaMouse } from "../use-area-mouse";
import PageContent from "../components/page-content/index.vue";
import Header from "../components/header/index.vue";
import Menu from "../components/menu/index.vue";
import TabNav from "../components/tab-nav/index.vue";
import "./index.scss";
defineOptions({ name: "LayoutVertical" });
const ns = useNamespace("columns-layout");
const route = useRoute();
const router = useRouter();
const settingStore = useSettingStore();
const { menuList } = useMenu();
const { getTitle } = useCommon();
const { asideStyle, rightContentStyle } = useMenuAreaMouse(72);
const { topStyle, staticClass } = useHeaderAreaMouse();
// 子菜单
const menuItem = ref([]);
// 菜单是否激活
const active = ref("");
const showTitle = ref(true);
const { menu, logo, header } = storeToRefs(settingStore);
watch(() => route.path, () => {
    // 当前菜单没有数据直接 return
    if (!menuList.value.length)
        return;
    // 查找 route.path 所属的一级菜单
    const findTopMenu = (menus, path) => {
        for (const menu of menus) {
            if (menu.meta._fullPath === path)
                return menu;
            if (menu.children?.length) {
                // 如果 children 里有 path，则返回当前 menu
                const found = menu.children.find(child => child.meta._fullPath === path);
                if (found)
                    return menu;
                // 递归查找更深层级
                const deepFound = findTopMenu(menu.children, path);
                if (deepFound)
                    return menu;
            }
        }
        return undefined;
    };
    const item = [findTopMenu(menuList.value, route.path)].filter(Boolean);
    active.value = item[0]?.path || route.path;
    if (item[0]?.children?.length)
        return (menuItem.value = item[0].children);
    menuItem.value = [];
}, { immediate: true });
/**
 * 切换菜单事件
 */
const changeMenuItem = (item) => {
    active.value = item.path;
    if (item.children?.length) {
        const firstChild = item.children[0];
        menuItem.value = item.children;
        menu.value.autoActivateChild && router.push(firstChild.meta._fullPath);
        return;
    }
    menuItem.value = [];
    router.push(item.path);
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elContainer | typeof ___VLS_components.ElContainer} */
elContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: ([__VLS_ctx.ns.join('layout'), __VLS_ctx.ns.b(), __VLS_ctx.ns.is('collapse', __VLS_ctx.menu.collapsed), __VLS_ctx.ns.is('expand', !__VLS_ctx.menu.collapsed)]) },
}));
const __VLS_2 = __VLS_1({
    ...{ class: ([__VLS_ctx.ns.join('layout'), __VLS_ctx.ns.b(), __VLS_ctx.ns.is('collapse', __VLS_ctx.menu.collapsed), __VLS_ctx.ns.is('expand', !__VLS_ctx.menu.collapsed)]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
if (__VLS_ctx.menu.enabled) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.ns.e('aside')) },
        ...{ class: "flx-column" },
    });
    /** @type {__VLS_StyleScopedClasses['flx-column']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.menu.enabled))
                    return;
                __VLS_ctx.router.push(__VLS_ctx.HOME_URL);
                // @ts-ignore
                [ns, ns, ns, ns, ns, menu, menu, menu, router, HOME_URL,];
            } },
        ...{ class: ([__VLS_ctx.ns.e('logo'), __VLS_ctx.ns.join('layout-logo')]) },
        ...{ class: "flx-center" },
    });
    /** @type {__VLS_StyleScopedClasses['flx-center']} */ ;
    if (__VLS_ctx.logo.enable) {
        __VLS_asFunctionalElement(__VLS_intrinsics.img)({
            src: (__VLS_ctx.serviceConfig.logo.source),
            alt: "logo",
        });
    }
    let __VLS_7;
    /** @ts-ignore @type {typeof ___VLS_components.elScrollbar | typeof ___VLS_components.ElScrollbar} */
    elScrollbar;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: (__VLS_ctx.ns.e('aside__list')) },
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.menuList))) {
        let __VLS_13;
        /** @ts-ignore @type {typeof ___VLS_components.elTooltip | typeof ___VLS_components.ElTooltip} */
        elTooltip;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
            disabled: (__VLS_ctx.showTitle),
            effect: "dark",
            placement: "right",
            content: (__VLS_ctx.getTitle(item)),
            key: (item.path),
        }));
        const __VLS_15 = __VLS_14({
            disabled: (__VLS_ctx.showTitle),
            effect: "dark",
            placement: "right",
            content: (__VLS_ctx.getTitle(item)),
            key: (item.path),
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        const { default: __VLS_18 } = __VLS_16.slots;
        __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.menu.enabled))
                        return;
                    __VLS_ctx.changeMenuItem(item);
                    // @ts-ignore
                    [ns, ns, ns, logo, serviceConfig, menuList, showTitle, getTitle, changeMenuItem,];
                } },
            ...{ class: ([
                    __VLS_ctx.ns.e('aside__list-item'),
                    __VLS_ctx.ns.is('active', [__VLS_ctx.active, `/${__VLS_ctx.active.split('/')[1]}`].includes(item.path)),
                    __VLS_ctx.ns.no('title', !__VLS_ctx.showTitle),
                ]) },
            ...{ class: "flx-center" },
        });
        /** @type {__VLS_StyleScopedClasses['flx-center']} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flx-column-center" },
        });
        /** @type {__VLS_StyleScopedClasses['flx-column-center']} */ ;
        if (item.meta?.icon) {
            let __VLS_19;
            /** @ts-ignore @type {typeof ___VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
                icon: (item.meta.icon),
            }));
            const __VLS_21 = __VLS_20({
                icon: (item.meta.icon),
            }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        }
        let __VLS_24;
        /** @ts-ignore @type {typeof ___VLS_components.Tooltip} */
        Tooltip;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
        const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
        __VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showTitle) }, null, null);
        const { default: __VLS_29 } = __VLS_27.slots;
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "title" },
        });
        /** @type {__VLS_StyleScopedClasses['title']} */ ;
        (__VLS_ctx.getTitle(item));
        // @ts-ignore
        [ns, ns, ns, showTitle, showTitle, getTitle, active, active,];
        var __VLS_27;
        // @ts-ignore
        [];
        var __VLS_16;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_10;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.menu.enabled))
                    return;
                __VLS_ctx.showTitle = !__VLS_ctx.showTitle;
                // @ts-ignore
                [showTitle, showTitle,];
            } },
        ...{ class: "flx-center" },
        ...{ class: (__VLS_ctx.ns.e('collapse')) },
    });
    /** @type {__VLS_StyleScopedClasses['flx-center']} */ ;
    let __VLS_30;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
    const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
    const { default: __VLS_35 } = __VLS_33.slots;
    const __VLS_36 = (__VLS_ctx.showTitle ? __VLS_ctx.Fold : __VLS_ctx.Expand);
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
    const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
    // @ts-ignore
    [ns, showTitle, Fold, Expand,];
    var __VLS_33;
}
if (__VLS_ctx.menu.enabled) {
    let __VLS_41;
    /** @ts-ignore @type {typeof ___VLS_components.elAside | typeof ___VLS_components.ElAside} */
    elAside;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
        ...{ class: ([__VLS_ctx.ns.join('layout-aside'), { 'not-aside': !__VLS_ctx.menuItem.length }]) },
        ...{ class: "flx-column" },
        ...{ style: ({ ...__VLS_ctx.asideStyle, left: '72px' }) },
    }));
    const __VLS_43 = __VLS_42({
        ...{ class: ([__VLS_ctx.ns.join('layout-aside'), { 'not-aside': !__VLS_ctx.menuItem.length }]) },
        ...{ class: "flx-column" },
        ...{ style: ({ ...__VLS_ctx.asideStyle, left: '72px' }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    /** @type {__VLS_StyleScopedClasses['not-aside']} */ ;
    /** @type {__VLS_StyleScopedClasses['flx-column']} */ ;
    const { default: __VLS_46 } = __VLS_44.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: ([__VLS_ctx.ns.e('logo'), __VLS_ctx.ns.join('layout-logo')]) },
        ...{ class: "flx-center" },
    });
    /** @type {__VLS_StyleScopedClasses['flx-center']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.menuItem.length) }, null, null);
    (__VLS_ctx.menu.collapsed ? "K" : __VLS_ctx.serviceConfig.layout.name);
    if (__VLS_ctx.menuItem?.length) {
        let __VLS_47;
        /** @ts-ignore @type {typeof ___VLS_components.elScrollbar | typeof ___VLS_components.ElScrollbar} */
        elScrollbar;
        // @ts-ignore
        const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({}));
        const __VLS_49 = __VLS_48({}, ...__VLS_functionalComponentArgsRest(__VLS_48));
        const { default: __VLS_52 } = __VLS_50.slots;
        const __VLS_53 = Menu;
        // @ts-ignore
        const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
            menuList: (__VLS_ctx.menuItem),
            ...{ class: ([__VLS_ctx.ns.join('layout-menu'), __VLS_ctx.ns.b('menu'), __VLS_ctx.ns.is(__VLS_ctx.menu.style)]) },
            popperClass: (`${__VLS_ctx.ns.join('layout-menu-popper')} ${__VLS_ctx.ns.b('menu-popper')} ${__VLS_ctx.ns.is(__VLS_ctx.menu.style)}`),
        }));
        const __VLS_55 = __VLS_54({
            menuList: (__VLS_ctx.menuItem),
            ...{ class: ([__VLS_ctx.ns.join('layout-menu'), __VLS_ctx.ns.b('menu'), __VLS_ctx.ns.is(__VLS_ctx.menu.style)]) },
            popperClass: (`${__VLS_ctx.ns.join('layout-menu-popper')} ${__VLS_ctx.ns.b('menu-popper')} ${__VLS_ctx.ns.is(__VLS_ctx.menu.style)}`),
        }, ...__VLS_functionalComponentArgsRest(__VLS_54));
        // @ts-ignore
        [ns, ns, ns, ns, ns, ns, ns, ns, ns, menu, menu, menu, menu, serviceConfig, menuItem, menuItem, menuItem, menuItem, asideStyle,];
        var __VLS_50;
    }
    // @ts-ignore
    [];
    var __VLS_44;
}
let __VLS_58;
/** @ts-ignore @type {typeof ___VLS_components.elContainer | typeof ___VLS_components.ElContainer} */
elContainer;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
    direction: "vertical",
    ...{ class: (__VLS_ctx.staticClass) },
    ...{ style: (__VLS_ctx.menuItem?.length ? __VLS_ctx.rightContentStyle : {}) },
}));
const __VLS_60 = __VLS_59({
    direction: "vertical",
    ...{ class: (__VLS_ctx.staticClass) },
    ...{ style: (__VLS_ctx.menuItem?.length ? __VLS_ctx.rightContentStyle : {}) },
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
const { default: __VLS_63 } = __VLS_61.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.join('auto-top')) },
    ...{ style: (__VLS_ctx.topStyle) },
});
if (__VLS_ctx.header.enabled) {
    let __VLS_64;
    /** @ts-ignore @type {typeof ___VLS_components.elHeader | typeof ___VLS_components.ElHeader} */
    elHeader;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
        ...{ class: (__VLS_ctx.ns.join('layout-header')) },
        ...{ class: "flx-align-center-between" },
    }));
    const __VLS_66 = __VLS_65({
        ...{ class: (__VLS_ctx.ns.join('layout-header')) },
        ...{ class: "flx-align-center-between" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    /** @type {__VLS_StyleScopedClasses['flx-align-center-between']} */ ;
    const { default: __VLS_69 } = __VLS_67.slots;
    const __VLS_70 = Header;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({}));
    const __VLS_72 = __VLS_71({}, ...__VLS_functionalComponentArgsRest(__VLS_71));
    // @ts-ignore
    [ns, ns, menuItem, staticClass, rightContentStyle, topStyle, header,];
    var __VLS_67;
}
const __VLS_75 = TabNav;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({}));
const __VLS_77 = __VLS_76({}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const __VLS_80 = PageContent;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({}));
const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
// @ts-ignore
[];
var __VLS_61;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
