/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useRouter } from "vue-router";
import { ElContainer, ElHeader } from "element-plus";
import { serviceConfig, HOME_URL } from "@/common/config";
import { useNamespace } from "@/composables";
import { useSettingStore } from "@/pinia";
import PageContent from "../components/page-content/index.vue";
import Menu from "../components/menu/index.vue";
import HeaderRight from "../components/header/header-right.vue";
import TabNav from "../components/tab-nav/index.vue";
import "./index.scss";
import { useHeaderAreaMouse } from "../use-area-mouse";
defineOptions({ name: "LayoutHorizontal" });
const ns = useNamespace("horizontal-layout");
const router = useRouter();
const settingStore = useSettingStore();
const { topStyle, staticClass } = useHeaderAreaMouse();
const { logo, header, menu } = storeToRefs(settingStore);
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
    direction: "vertical",
    ...{ class: ([__VLS_ctx.ns.join('layout'), __VLS_ctx.ns.b(), __VLS_ctx.staticClass]) },
}));
const __VLS_2 = __VLS_1({
    direction: "vertical",
    ...{ class: ([__VLS_ctx.ns.join('layout'), __VLS_ctx.ns.b(), __VLS_ctx.staticClass]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.join('auto-top')) },
    ...{ style: (__VLS_ctx.topStyle) },
});
if (__VLS_ctx.header.enabled) {
    let __VLS_7;
    /** @ts-ignore @type {typeof ___VLS_components.elHeader | typeof ___VLS_components.ElHeader} */
    elHeader;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        ...{ class: (__VLS_ctx.ns.join('layout-header')) },
        ...{ class: "flx-align-center-between" },
    }));
    const __VLS_9 = __VLS_8({
        ...{ class: (__VLS_ctx.ns.join('layout-header')) },
        ...{ class: "flx-align-center-between" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['flx-align-center-between']} */ ;
    const { default: __VLS_12 } = __VLS_10.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.header.enabled))
                    return;
                __VLS_ctx.router.push(__VLS_ctx.HOME_URL);
                // @ts-ignore
                [ns, ns, ns, ns, staticClass, topStyle, header, router, HOME_URL,];
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
    (__VLS_ctx.serviceConfig.layout.name);
    const __VLS_13 = Menu;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        mode: "horizontal",
        isCollapse: (false),
        ...{ class: ([__VLS_ctx.ns.join('layout-menu'), __VLS_ctx.ns.b('menu'), __VLS_ctx.ns.is(__VLS_ctx.header.menuAlign), __VLS_ctx.ns.is(__VLS_ctx.menu.style)]) },
        popperClass: (`${__VLS_ctx.ns.join('layout-menu-popper')} ${__VLS_ctx.ns.b('menu-popper')} ${__VLS_ctx.ns.is(__VLS_ctx.menu.style)}`),
    }));
    const __VLS_15 = __VLS_14({
        mode: "horizontal",
        isCollapse: (false),
        ...{ class: ([__VLS_ctx.ns.join('layout-menu'), __VLS_ctx.ns.b('menu'), __VLS_ctx.ns.is(__VLS_ctx.header.menuAlign), __VLS_ctx.ns.is(__VLS_ctx.menu.style)]) },
        popperClass: (`${__VLS_ctx.ns.join('layout-menu-popper')} ${__VLS_ctx.ns.b('menu-popper')} ${__VLS_ctx.ns.is(__VLS_ctx.menu.style)}`),
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const __VLS_18 = HeaderRight;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
    const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
    // @ts-ignore
    [ns, ns, ns, ns, ns, ns, ns, ns, header, logo, serviceConfig, serviceConfig, menu, menu,];
    var __VLS_10;
}
const __VLS_23 = TabNav;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({}));
const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
const __VLS_28 = PageContent;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
