/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useRoute } from "vue-router";
import { ElBreadcrumb, ElBreadcrumbItem } from "element-plus";
import { ArrowRight } from "@element-plus/icons-vue";
import { useBreadcrumbs, useNamespace } from "@/composables";
import { useSettingStore } from "@/pinia";
import { HOME_URL, HOME_NAME } from "@/common/config";
defineOptions({ name: "Breadcrumb" });
const ns = useNamespace("breadcrumb");
const router = useRouter();
const route = useRoute();
const settingStore = useSettingStore();
const { breadcrumbList } = useBreadcrumbs();
const { breadcrumb: breadcrumbConfig } = storeToRefs(settingStore);
const showHome = computed(() => {
    return breadcrumbConfig.value.showHome && !breadcrumbConfig.value.onlyShowHomeIcon;
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (__VLS_ctx.breadcrumbConfig.hideOnlyOne ? __VLS_ctx.breadcrumbList.length !== 2 : true) {
    let __VLS_0;
    /** @ts-ignore @type {typeof ___VLS_components.elBreadcrumb | typeof ___VLS_components.ElBreadcrumb} */
    elBreadcrumb;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: (__VLS_ctx.ns.b()) },
        ...{ class: "flx-align-center" },
        separatorIcon: (__VLS_ctx.ArrowRight),
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: (__VLS_ctx.ns.b()) },
        ...{ class: "flx-align-center" },
        separatorIcon: (__VLS_ctx.ArrowRight),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5 = {};
    /** @type {__VLS_StyleScopedClasses['flx-align-center']} */ ;
    const { default: __VLS_6 } = __VLS_3.slots;
    let __VLS_7;
    /** @ts-ignore @type {typeof ___VLS_components.transitionGroup | typeof ___VLS_components.TransitionGroup} */
    transitionGroup;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        name: "breadcrumb",
    }));
    const __VLS_9 = __VLS_8({
        name: "breadcrumb",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    if (__VLS_ctx.breadcrumbConfig.onlyShowHomeIcon) {
        let __VLS_13;
        /** @ts-ignore @type {typeof ___VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
            ...{ 'onClick': {} },
            icon: "core-home",
            ...{ class: (__VLS_ctx.ns.e('home-icon')) },
        }));
        const __VLS_15 = __VLS_14({
            ...{ 'onClick': {} },
            icon: "core-home",
            ...{ class: (__VLS_ctx.ns.e('home-icon')) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        let __VLS_18;
        const __VLS_19 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.breadcrumbConfig.hideOnlyOne ? __VLS_ctx.breadcrumbList.length !== 2 : true))
                        return;
                    if (!(__VLS_ctx.breadcrumbConfig.onlyShowHomeIcon))
                        return;
                    __VLS_ctx.router.push(__VLS_ctx.HOME_URL);
                    // @ts-ignore
                    [breadcrumbConfig, breadcrumbConfig, breadcrumbList, ns, ns, ArrowRight, router, HOME_URL,];
                } });
        var __VLS_16;
        var __VLS_17;
    }
    for (const [breadcrumb, index] of __VLS_getVForSourceType((__VLS_ctx.breadcrumbList))) {
        (breadcrumb.path);
        if (!__VLS_ctx.showHome ? breadcrumb.name !== __VLS_ctx.HOME_NAME || __VLS_ctx.route.name === __VLS_ctx.HOME_NAME : true) {
            let __VLS_20;
            /** @ts-ignore @type {typeof ___VLS_components.elBreadcrumbItem | typeof ___VLS_components.ElBreadcrumbItem} */
            elBreadcrumbItem;
            // @ts-ignore
            const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
            const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
            const { default: __VLS_25 } = __VLS_23.slots;
            if (breadcrumb.meta.notClickBread || index === __VLS_ctx.breadcrumbList.length - 1) {
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: ([__VLS_ctx.ns.e('link'), __VLS_ctx.ns.no('click')]) },
                });
                if (breadcrumb.meta?.icon && __VLS_ctx.breadcrumbConfig.showIcon) {
                    let __VLS_26;
                    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
                    Icon;
                    // @ts-ignore
                    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
                        icon: (breadcrumb.meta.icon),
                        ...{ class: (__VLS_ctx.ns.e('icon')) },
                    }));
                    const __VLS_28 = __VLS_27({
                        icon: (breadcrumb.meta.icon),
                        ...{ class: (__VLS_ctx.ns.e('icon')) },
                    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
                }
                __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                (breadcrumb.meta.title);
            }
            else {
                let __VLS_31;
                /** @ts-ignore @type {typeof ___VLS_components.routerLink | typeof ___VLS_components.RouterLink} */
                routerLink;
                // @ts-ignore
                const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
                    to: ({ path: breadcrumb.meta._fullPath || breadcrumb.path }),
                    ...{ class: (__VLS_ctx.ns.e('link')) },
                }));
                const __VLS_33 = __VLS_32({
                    to: ({ path: breadcrumb.meta._fullPath || breadcrumb.path }),
                    ...{ class: (__VLS_ctx.ns.e('link')) },
                }, ...__VLS_functionalComponentArgsRest(__VLS_32));
                const { default: __VLS_36 } = __VLS_34.slots;
                if (breadcrumb.meta?.icon && __VLS_ctx.breadcrumbConfig.showIcon) {
                    let __VLS_37;
                    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
                    Icon;
                    // @ts-ignore
                    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
                        icon: (breadcrumb.meta.icon),
                        ...{ class: (__VLS_ctx.ns.e('icon')) },
                    }));
                    const __VLS_39 = __VLS_38({
                        icon: (breadcrumb.meta.icon),
                        ...{ class: (__VLS_ctx.ns.e('icon')) },
                    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
                }
                __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                (breadcrumb.meta.title);
                // @ts-ignore
                [breadcrumbConfig, breadcrumbConfig, breadcrumbList, breadcrumbList, ns, ns, ns, ns, ns, showHome, HOME_NAME, HOME_NAME, route,];
                var __VLS_34;
            }
            // @ts-ignore
            [];
            var __VLS_23;
        }
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_10;
    // @ts-ignore
    [];
    var __VLS_3;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
