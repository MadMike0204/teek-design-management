/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed, watch, ref, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ElContainer, ElAside, ElHeader } from "element-plus";
import { serviceConfig, HOME_URL } from "@/common/config";
import { useMenu, useRouteFn, useNamespace } from "@/composables";
import { useSettingStore, useRouteStore } from "@/pinia";
import { useMenuAreaMouse, useHeaderAreaMouse } from "../use-area-mouse";
import PageContent from "../components/page-content/index.vue";
import CollapseTrigger from "../components/header/components/collapse-trigger/index.vue";
import Menu from "../components/menu/index.vue";
import HeaderRight from "../components/header/header-right.vue";
import TabNav from "../components/tab-nav/index.vue";
import "./index.scss";
defineOptions({ name: "LayoutMixins" });
const ns = useNamespace("mixins-layout");
const route = useRoute();
const router = useRouter();
const settingStore = useSettingStore();
const routeStore = useRouteStore();
const { asideStyle, rightContentStyle } = useMenuAreaMouse();
const { heightStyle } = useHeaderAreaMouse();
const { findParentRoutesByPath } = useRouteFn();
const { menuList } = useMenu();
// 子菜单
const activeMenu = ref("");
const childrenMenu = ref([]);
const { menu, logo, header } = storeToRefs(settingStore);
/**
 * 头部菜单
 */
const headerMenu = computed(() => {
    const parentMenu = [];
    menuList.value.forEach(menuItem => {
        const item = { ...menuItem };
        if (item.children)
            item.children = [];
        parentMenu.push({ ...item });
    });
    return parentMenu;
});
watch(() => route.path, async () => {
    await nextTick();
    // 当前菜单没有数据直接 return
    if (!menuList.value.length)
        return;
    const item = menuList.value.filter(item => [route.path, `/${route.path.split("/")[1]}`].includes(item.path) ||
        route.path === item.redirect ||
        findParentRoutesByPath(route.path, routeStore.loadedRouteList, "path")[0] === item.path ||
        findParentRoutesByPath(`/${route.path.split("/")[1]}`, routeStore.loadedRouteList, "path")[0] === item.path);
    activeMenu.value = item[0]?.path || "";
    if (item[0]?.children?.length)
        childrenMenu.value = item[0].children;
    else {
        childrenMenu.value = [];
        // 关闭菜单栏折叠功能
        settingStore.$patch({ menu: { collapsed: false } });
    }
}, { immediate: true });
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
if (__VLS_ctx.header.enabled) {
    let __VLS_7;
    /** @ts-ignore @type {typeof ___VLS_components.elHeader | typeof ___VLS_components.ElHeader} */
    elHeader;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        ...{ class: ([__VLS_ctx.ns.join('layout-header'), __VLS_ctx.ns.join('auto-top')]) },
        ...{ class: "flx-align-center-between" },
        ...{ style: (__VLS_ctx.heightStyle) },
    }));
    const __VLS_9 = __VLS_8({
        ...{ class: ([__VLS_ctx.ns.join('layout-header'), __VLS_ctx.ns.join('auto-top')]) },
        ...{ class: "flx-align-center-between" },
        ...{ style: (__VLS_ctx.heightStyle) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['flx-align-center-between']} */ ;
    const { default: __VLS_12 } = __VLS_10.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.header.enabled))
                    return;
                __VLS_ctx.router.push(__VLS_ctx.HOME_URL);
                // @ts-ignore
                [ns, ns, ns, ns, ns, ns, menu, menu, header, heightStyle, router, HOME_URL,];
            } },
        ...{ class: ([__VLS_ctx.ns.join('layout-logo'), __VLS_ctx.ns.no('collapse')]) },
        ...{ class: "flx-center" },
    });
    /** @type {__VLS_StyleScopedClasses['flx-center']} */ ;
    if (__VLS_ctx.logo.enable) {
        __VLS_asFunctionalElement(__VLS_intrinsics.img)({
            src: (__VLS_ctx.serviceConfig.logo.source),
            alt: "logo",
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.serviceConfig.layout.name);
    const __VLS_13 = CollapseTrigger;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        ...{ class: (__VLS_ctx.ns.has('trigger', !__VLS_ctx.childrenMenu.length)) },
    }));
    const __VLS_15 = __VLS_14({
        ...{ class: (__VLS_ctx.ns.has('trigger', !__VLS_ctx.childrenMenu.length)) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const __VLS_18 = Menu;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
        menuList: (__VLS_ctx.headerMenu),
        activeMenu: (__VLS_ctx.activeMenu),
        mode: "horizontal",
        isCollapse: (false),
        ...{ class: ([__VLS_ctx.ns.join('layout-menu'), __VLS_ctx.ns.e('header-menu'), __VLS_ctx.ns.is(__VLS_ctx.header.menuAlign)]) },
        popperClass: (`${__VLS_ctx.ns.join('layout-menu-popper')} ${__VLS_ctx.ns.b('menu-popper')}`),
    }));
    const __VLS_20 = __VLS_19({
        menuList: (__VLS_ctx.headerMenu),
        activeMenu: (__VLS_ctx.activeMenu),
        mode: "horizontal",
        isCollapse: (false),
        ...{ class: ([__VLS_ctx.ns.join('layout-menu'), __VLS_ctx.ns.e('header-menu'), __VLS_ctx.ns.is(__VLS_ctx.header.menuAlign)]) },
        popperClass: (`${__VLS_ctx.ns.join('layout-menu-popper')} ${__VLS_ctx.ns.b('menu-popper')}`),
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const __VLS_23 = HeaderRight;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({}));
    const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
    // @ts-ignore
    [ns, ns, ns, ns, ns, ns, ns, ns, header, logo, serviceConfig, serviceConfig, childrenMenu, headerMenu, activeMenu,];
    var __VLS_10;
}
let __VLS_28;
/** @ts-ignore @type {typeof ___VLS_components.elContainer | typeof ___VLS_components.ElContainer} */
elContainer;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    ...{ class: (__VLS_ctx.ns.e('content')) },
}));
const __VLS_30 = __VLS_29({
    ...{ class: (__VLS_ctx.ns.e('content')) },
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const { default: __VLS_33 } = __VLS_31.slots;
if (__VLS_ctx.childrenMenu.length) {
    let __VLS_34;
    /** @ts-ignore @type {typeof ___VLS_components.elAside | typeof ___VLS_components.ElAside} */
    elAside;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
        ...{ class: ([__VLS_ctx.ns.join('layout-aside'), __VLS_ctx.ns.is(__VLS_ctx.menu.theme)]) },
        ...{ style: (__VLS_ctx.asideStyle) },
    }));
    const __VLS_36 = __VLS_35({
        ...{ class: ([__VLS_ctx.ns.join('layout-aside'), __VLS_ctx.ns.is(__VLS_ctx.menu.theme)]) },
        ...{ style: (__VLS_ctx.asideStyle) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    const { default: __VLS_39 } = __VLS_37.slots;
    const __VLS_40 = Menu;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        menuList: (__VLS_ctx.childrenMenu),
        ...{ class: ([__VLS_ctx.ns.join('layout-menu'), __VLS_ctx.ns.e('aside-menu'), __VLS_ctx.ns.is(__VLS_ctx.menu.style)]) },
        popperClass: (`${__VLS_ctx.ns.join('layout-menu-popper')} ${__VLS_ctx.ns.b('menu-popper')} ${__VLS_ctx.ns.is(__VLS_ctx.menu.style)}`),
    }));
    const __VLS_42 = __VLS_41({
        menuList: (__VLS_ctx.childrenMenu),
        ...{ class: ([__VLS_ctx.ns.join('layout-menu'), __VLS_ctx.ns.e('aside-menu'), __VLS_ctx.ns.is(__VLS_ctx.menu.style)]) },
        popperClass: (`${__VLS_ctx.ns.join('layout-menu-popper')} ${__VLS_ctx.ns.b('menu-popper')} ${__VLS_ctx.ns.is(__VLS_ctx.menu.style)}`),
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    // @ts-ignore
    [ns, ns, ns, ns, ns, ns, ns, ns, ns, menu, menu, menu, childrenMenu, childrenMenu, asideStyle,];
    var __VLS_37;
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flx-1" },
});
/** @type {__VLS_StyleScopedClasses['flx-1']} */ ;
const __VLS_45 = TabNav;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    ...{ class: (__VLS_ctx.ns.join('auto-top')) },
    ...{ style: (__VLS_ctx.heightStyle) },
}));
const __VLS_47 = __VLS_46({
    ...{ class: (__VLS_ctx.ns.join('auto-top')) },
    ...{ style: (__VLS_ctx.heightStyle) },
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const __VLS_50 = PageContent;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    ...{ style: (__VLS_ctx.rightContentStyle) },
}));
const __VLS_52 = __VLS_51({
    ...{ style: (__VLS_ctx.rightContentStyle) },
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
// @ts-ignore
[ns, heightStyle, rightContentStyle,];
var __VLS_31;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
