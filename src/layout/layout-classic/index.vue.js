/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ElContainer, ElAside, ElHeader } from "element-plus";
import { serviceConfig, HOME_URL } from "@/common/config";
import { useNamespace } from "@/composables";
import { useSettingStore } from "@/pinia";
import { useHeaderAreaMouse, useMenuAreaMouse } from "../use-area-mouse";
import HeaderLeft from "../components/header/header-left.vue";
import PageContent from "../components/page-content/index.vue";
import Header from "../components/header/index.vue";
import Menu from "../components/menu/index.vue";
import TabNav from "../components/tab-nav/index.vue";
import "./index.scss";
defineOptions({ name: "LayoutClassic" });
const ns = useNamespace("classic-layout");
const router = useRouter();
const settingStore = useSettingStore();
const { asideStyle, rightContentStyle } = useMenuAreaMouse();
const { heightStyle } = useHeaderAreaMouse();
const { menu, logo, header } = storeToRefs(settingStore);
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
    const __VLS_13 = Header || Header;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const { default: __VLS_18 } = __VLS_16.slots;
    {
        const { left: __VLS_19 } = __VLS_16.slots;
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: (__VLS_ctx.ns.e('header-left')) },
            ...{ class: "flx-align-center" },
        });
        /** @type {__VLS_StyleScopedClasses['flx-align-center']} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.header.enabled))
                        return;
                    __VLS_ctx.router.push(__VLS_ctx.HOME_URL);
                    // @ts-ignore
                    [ns, ns, ns, ns, ns, ns, ns, menu, menu, header, heightStyle, router, HOME_URL,];
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
        const __VLS_20 = HeaderLeft;
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
        const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
        // @ts-ignore
        [ns, ns, logo, serviceConfig, serviceConfig,];
    }
    // @ts-ignore
    [];
    var __VLS_16;
    // @ts-ignore
    [];
    var __VLS_10;
}
let __VLS_25;
/** @ts-ignore @type {typeof ___VLS_components.elContainer | typeof ___VLS_components.ElContainer} */
elContainer;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    ...{ class: (__VLS_ctx.ns.e('content')) },
}));
const __VLS_27 = __VLS_26({
    ...{ class: (__VLS_ctx.ns.e('content')) },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const { default: __VLS_30 } = __VLS_28.slots;
if (__VLS_ctx.menu.enabled) {
    let __VLS_31;
    /** @ts-ignore @type {typeof ___VLS_components.elAside | typeof ___VLS_components.ElAside} */
    elAside;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        ...{ class: ([__VLS_ctx.ns.join('layout-aside'), __VLS_ctx.ns.is(__VLS_ctx.menu.theme)]) },
        ...{ style: (__VLS_ctx.asideStyle) },
    }));
    const __VLS_33 = __VLS_32({
        ...{ class: ([__VLS_ctx.ns.join('layout-aside'), __VLS_ctx.ns.is(__VLS_ctx.menu.theme)]) },
        ...{ style: (__VLS_ctx.asideStyle) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    const { default: __VLS_36 } = __VLS_34.slots;
    const __VLS_37 = Menu;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        ...{ class: ([__VLS_ctx.ns.join('layout-menu'), __VLS_ctx.ns.b('menu'), __VLS_ctx.ns.is(__VLS_ctx.menu.style)]) },
        popperClass: (`${__VLS_ctx.ns.join('layout-menu-popper')} ${__VLS_ctx.ns.b('menu-popper')} ${__VLS_ctx.ns.is(__VLS_ctx.menu.style)}`),
    }));
    const __VLS_39 = __VLS_38({
        ...{ class: ([__VLS_ctx.ns.join('layout-menu'), __VLS_ctx.ns.b('menu'), __VLS_ctx.ns.is(__VLS_ctx.menu.style)]) },
        popperClass: (`${__VLS_ctx.ns.join('layout-menu-popper')} ${__VLS_ctx.ns.b('menu-popper')} ${__VLS_ctx.ns.is(__VLS_ctx.menu.style)}`),
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    // @ts-ignore
    [ns, ns, ns, ns, ns, ns, ns, ns, ns, menu, menu, menu, menu, asideStyle,];
    var __VLS_34;
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flx-1" },
});
/** @type {__VLS_StyleScopedClasses['flx-1']} */ ;
const __VLS_42 = TabNav;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    ...{ class: (__VLS_ctx.ns.join('auto-top')) },
    ...{ style: (__VLS_ctx.heightStyle) },
}));
const __VLS_44 = __VLS_43({
    ...{ class: (__VLS_ctx.ns.join('auto-top')) },
    ...{ style: (__VLS_ctx.heightStyle) },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
const __VLS_47 = PageContent;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
    ...{ style: (__VLS_ctx.rightContentStyle) },
}));
const __VLS_49 = __VLS_48({
    ...{ style: (__VLS_ctx.rightContentStyle) },
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
// @ts-ignore
[ns, heightStyle, rightContentStyle,];
var __VLS_28;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
