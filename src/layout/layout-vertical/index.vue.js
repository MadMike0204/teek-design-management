/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ElContainer, ElAside, ElHeader } from "element-plus";
import { serviceConfig, HOME_URL } from "@/common/config";
import { useCommon, useNamespace } from "@/composables";
import { useSettingStore } from "@/pinia";
import { useMenuAreaMouse, useHeaderAreaMouse } from "../use-area-mouse";
import PageContent from "../components/page-content/index.vue";
import Header from "../components/header/index.vue";
import Menu from "../components/menu/index.vue";
import TabNav from "../components/tab-nav/index.vue";
import "./index.scss";
defineOptions({ name: "LayoutVertical" });
const ns = useNamespace("vertical-layout");
const router = useRouter();
const settingStore = useSettingStore();
const { menu, logo, header } = storeToRefs(settingStore);
const { isMobile } = useCommon();
const { asideStyle, rightContentStyle } = useMenuAreaMouse();
const { topStyle, staticClass } = useHeaderAreaMouse();
watch(isMobile, newVal => {
    if (newVal)
        settingStore.collapseSideMenu();
    else
        settingStore.expandSideMenu();
});
/**
 * 点击外部区域关闭菜单
 */
const handleClickOutSide = () => {
    settingStore.collapseSideMenu();
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
    let __VLS_7;
    /** @ts-ignore @type {typeof ___VLS_components.elAside | typeof ___VLS_components.ElAside} */
    elAside;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        ...{ class: ([__VLS_ctx.ns.join('layout-aside'), __VLS_ctx.ns.is(__VLS_ctx.menu.theme)]) },
        ...{ class: "flx-column" },
        ...{ style: (__VLS_ctx.asideStyle) },
    }));
    const __VLS_9 = __VLS_8({
        ...{ class: ([__VLS_ctx.ns.join('layout-aside'), __VLS_ctx.ns.is(__VLS_ctx.menu.theme)]) },
        ...{ class: "flx-column" },
        ...{ style: (__VLS_ctx.asideStyle) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['flx-column']} */ ;
    const { default: __VLS_12 } = __VLS_10.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.menu.enabled))
                    return;
                __VLS_ctx.router.push(__VLS_ctx.HOME_URL);
                // @ts-ignore
                [ns, ns, ns, ns, ns, ns, menu, menu, menu, menu, asideStyle, router, HOME_URL,];
            } },
        ...{ class: (__VLS_ctx.ns.join('layout-logo')) },
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
    __VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.menu.collapsed) }, null, null);
    (__VLS_ctx.serviceConfig.layout.name);
    const __VLS_13 = Menu;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        ...{ class: ([__VLS_ctx.ns.join('layout-menu'), __VLS_ctx.ns.b('menu'), __VLS_ctx.ns.is(__VLS_ctx.menu.style)]) },
        popperClass: (`${__VLS_ctx.ns.join('layout-menu-popper')} ${__VLS_ctx.ns.b('menu-popper')} ${__VLS_ctx.ns.is(__VLS_ctx.menu.style)}`),
    }));
    const __VLS_15 = __VLS_14({
        ...{ class: ([__VLS_ctx.ns.join('layout-menu'), __VLS_ctx.ns.b('menu'), __VLS_ctx.ns.is(__VLS_ctx.menu.style)]) },
        popperClass: (`${__VLS_ctx.ns.join('layout-menu-popper')} ${__VLS_ctx.ns.b('menu-popper')} ${__VLS_ctx.ns.is(__VLS_ctx.menu.style)}`),
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    // @ts-ignore
    [ns, ns, ns, ns, ns, ns, ns, menu, menu, menu, logo, serviceConfig, serviceConfig,];
    var __VLS_10;
}
if (__VLS_ctx.isMobile && !__VLS_ctx.menu.collapsed) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.handleClickOutSide) },
        ...{ class: (__VLS_ctx.ns.e('drawer-model')) },
    });
}
let __VLS_18;
/** @ts-ignore @type {typeof ___VLS_components.elContainer | typeof ___VLS_components.ElContainer} */
elContainer;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    direction: "vertical",
    ...{ class: (__VLS_ctx.staticClass) },
    ...{ style: (__VLS_ctx.rightContentStyle) },
}));
const __VLS_20 = __VLS_19({
    direction: "vertical",
    ...{ class: (__VLS_ctx.staticClass) },
    ...{ style: (__VLS_ctx.rightContentStyle) },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_21.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.join('auto-top')) },
    ...{ style: (__VLS_ctx.topStyle) },
});
if (__VLS_ctx.header.enabled) {
    let __VLS_24;
    /** @ts-ignore @type {typeof ___VLS_components.elHeader | typeof ___VLS_components.ElHeader} */
    elHeader;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...{ class: (__VLS_ctx.ns.join('layout-header')) },
        ...{ class: "flx-align-center-between" },
    }));
    const __VLS_26 = __VLS_25({
        ...{ class: (__VLS_ctx.ns.join('layout-header')) },
        ...{ class: "flx-align-center-between" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    /** @type {__VLS_StyleScopedClasses['flx-align-center-between']} */ ;
    const { default: __VLS_29 } = __VLS_27.slots;
    const __VLS_30 = Header;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
    const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
    // @ts-ignore
    [ns, ns, ns, menu, isMobile, handleClickOutSide, staticClass, rightContentStyle, topStyle, header,];
    var __VLS_27;
}
const __VLS_35 = TabNav;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({}));
const __VLS_37 = __VLS_36({}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const __VLS_40 = PageContent;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
// @ts-ignore
[];
var __VLS_21;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
