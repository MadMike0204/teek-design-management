/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ElContainer, ElAside } from "element-plus";
import { serviceConfig, HOME_URL } from "@/common/config";
import { useNamespace } from "@/composables";
import { useSettingStore } from "@/pinia";
import PageContent from "../components/page-content/index.vue";
import Menu from "../components/menu/index.vue";
import UserAvatar from "../components/header/components/user-avatar/index.vue";
import CollapseTrigger from "../components/header/components/collapse-trigger/index.vue";
import TabNav from "../components/tab-nav/index.vue";
import "./index.scss";
import { useHeaderAreaMouse, useMenuAreaMouse } from "../use-area-mouse";
defineOptions({ name: "LayoutIFrame" });
const ns = useNamespace("iframe-layout");
const router = useRouter();
const settingStore = useSettingStore();
const { asideStyle, rightContentStyle } = useMenuAreaMouse();
const { heightStyle, staticClass } = useHeaderAreaMouse();
const { menu, logo } = storeToRefs(settingStore);
const isCollapse = computed(() => menu.value.collapsed);
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
    ...{ class: ([__VLS_ctx.ns.join('layout'), __VLS_ctx.ns.b(), __VLS_ctx.ns.is('collapse', __VLS_ctx.isCollapse), __VLS_ctx.ns.is('expand', !__VLS_ctx.isCollapse)]) },
}));
const __VLS_2 = __VLS_1({
    ...{ class: ([__VLS_ctx.ns.join('layout'), __VLS_ctx.ns.b(), __VLS_ctx.ns.is('collapse', __VLS_ctx.isCollapse), __VLS_ctx.ns.is('expand', !__VLS_ctx.isCollapse)]) },
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
                [ns, ns, ns, ns, ns, ns, isCollapse, isCollapse, menu, menu, asideStyle, router, HOME_URL,];
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
    __VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.isCollapse) }, null, null);
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
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: ([__VLS_ctx.ns.e('menu-footer'), __VLS_ctx.ns.is('collapse', __VLS_ctx.isCollapse)]) },
        ...{ class: "flx-column gap-10" },
    });
    /** @type {__VLS_StyleScopedClasses['flx-column']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-10']} */ ;
    const __VLS_18 = UserAvatar;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
        placement: "right",
        offset: (__VLS_ctx.isCollapse ? 6 : 30),
    }));
    const __VLS_20 = __VLS_19({
        placement: "right",
        offset: (__VLS_ctx.isCollapse ? 6 : 30),
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    let __VLS_23;
    /** @ts-ignore @type {typeof ___VLS_components.elTooltip | typeof ___VLS_components.ElTooltip} */
    elTooltip;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
        placement: "right",
        content: (__VLS_ctx.isCollapse ? '菜单展开' : '菜单折叠'),
        disabled: (!__VLS_ctx.isCollapse),
    }));
    const __VLS_25 = __VLS_24({
        placement: "right",
        content: (__VLS_ctx.isCollapse ? '菜单展开' : '菜单折叠'),
        disabled: (!__VLS_ctx.isCollapse),
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    const { default: __VLS_28 } = __VLS_26.slots;
    const __VLS_29 = CollapseTrigger || CollapseTrigger;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({}));
    const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
    const { default: __VLS_34 } = __VLS_32.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "name" },
    });
    /** @type {__VLS_StyleScopedClasses['name']} */ ;
    (__VLS_ctx.isCollapse ? "菜单展开" : "菜单折叠");
    // @ts-ignore
    [ns, ns, ns, ns, ns, ns, ns, ns, ns, isCollapse, isCollapse, isCollapse, isCollapse, isCollapse, isCollapse, menu, menu, logo, serviceConfig, serviceConfig,];
    var __VLS_32;
    // @ts-ignore
    [];
    var __VLS_26;
    // @ts-ignore
    [];
    var __VLS_10;
}
let __VLS_35;
/** @ts-ignore @type {typeof ___VLS_components.elContainer | typeof ___VLS_components.ElContainer} */
elContainer;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    direction: "vertical",
    ...{ class: (__VLS_ctx.staticClass) },
    ...{ style: (__VLS_ctx.rightContentStyle) },
}));
const __VLS_37 = __VLS_36({
    direction: "vertical",
    ...{ class: (__VLS_ctx.staticClass) },
    ...{ style: (__VLS_ctx.rightContentStyle) },
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_40 } = __VLS_38.slots;
const __VLS_41 = TabNav;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    ...{ class: (__VLS_ctx.ns.join('auto-top')) },
    ...{ style: (__VLS_ctx.heightStyle) },
}));
const __VLS_43 = __VLS_42({
    ...{ class: (__VLS_ctx.ns.join('auto-top')) },
    ...{ style: (__VLS_ctx.heightStyle) },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
const __VLS_46 = PageContent;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({}));
const __VLS_48 = __VLS_47({}, ...__VLS_functionalComponentArgsRest(__VLS_47));
// @ts-ignore
[ns, staticClass, rightContentStyle, heightStyle,];
var __VLS_38;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
