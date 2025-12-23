/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useRouter } from "vue-router";
import { ElMenuItem, ElSubMenu } from "element-plus";
import { isValidURL } from "@/common/utils";
import { Tooltip, PointTag } from "@/components";
import { useNamespace, useCommon } from "@/composables";
import { useSettingStore } from "@/pinia";
import { LayoutModeEnum } from "@/common/enums";
defineOptions({ name: "AsideMenuItem" });
const __VLS_props = defineProps();
const ns = useNamespace();
const router = useRouter();
const settingStore = useSettingStore();
const { isMobile, getTitle } = useCommon();
const { menu, layout } = storeToRefs(settingStore);
const showTag = computed(() => layout.value.layoutMode === LayoutModeEnum.Mixins || !menu.value.collapsed);
/**
 * 菜单点击事件，跳转页面
 */
const handleMenuClick = (menuItem) => {
    // 移动端点击菜单时关闭菜单
    if (isMobile.value)
        settingStore.collapseSideMenu();
    if (isValidURL(menuItem.path))
        return window.open(menuItem.path, "_blank");
    router.push(menuItem.meta._fullPath || menuItem.path || "");
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
/** @type {__VLS_StyleScopedClasses['menu-item-tag']} */ ;
if (__VLS_ctx.menuItem.meta.render) {
    const __VLS_0 = (__VLS_ctx.menuItem.meta.render);
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: (`${__VLS_ctx.ns.elNamespace}-menu-item`) },
        ...{ class: "is-only" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: (`${__VLS_ctx.ns.elNamespace}-menu-item`) },
        ...{ class: "is-only" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5 = {};
    /** @type {__VLS_StyleScopedClasses['is-only']} */ ;
    var __VLS_3;
}
else if (!__VLS_ctx.menuItem.children || __VLS_ctx.menuItem.children.length == 0) {
    let __VLS_6;
    /** @ts-ignore @type {typeof ___VLS_components.elMenuItem | typeof ___VLS_components.ElMenuItem} */
    elMenuItem;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        ...{ 'onClick': {} },
        index: (__VLS_ctx.menuItem.meta._fullPath),
        ...{ class: "is-only" },
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onClick': {} },
        index: (__VLS_ctx.menuItem.meta._fullPath),
        ...{ class: "is-only" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_11;
    const __VLS_12 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (__VLS_ctx.menuItem.meta.render)
                    return;
                if (!(!__VLS_ctx.menuItem.children || __VLS_ctx.menuItem.children.length == 0))
                    return;
                __VLS_ctx.handleMenuClick(__VLS_ctx.menuItem);
                // @ts-ignore
                [menuItem, menuItem, menuItem, menuItem, menuItem, menuItem, ns, handleMenuClick,];
            } });
    var __VLS_13 = {};
    /** @type {__VLS_StyleScopedClasses['is-only']} */ ;
    const { default: __VLS_14 } = __VLS_9.slots;
    if (__VLS_ctx.menuItem.meta.icon) {
        let __VLS_15;
        /** @ts-ignore @type {typeof ___VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
            icon: (__VLS_ctx.menuItem.meta.icon),
            ...{ class: (`${__VLS_ctx.ns.elNamespace}-icon`) },
        }));
        const __VLS_17 = __VLS_16({
            icon: (__VLS_ctx.menuItem.meta.icon),
            ...{ class: (`${__VLS_ctx.ns.elNamespace}-icon`) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    }
    {
        const { title: __VLS_20 } = __VLS_9.slots;
        if (!__VLS_ctx.menuItem.meta.useTooltip) {
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (__VLS_ctx.getTitle(__VLS_ctx.menuItem));
        }
        else {
            let __VLS_21;
            /** @ts-ignore @type {typeof ___VLS_components.Tooltip} */
            Tooltip;
            // @ts-ignore
            const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
                offset: (-10),
                try: (1),
            }));
            const __VLS_23 = __VLS_22({
                offset: (-10),
                try: (1),
            }, ...__VLS_functionalComponentArgsRest(__VLS_22));
            const { default: __VLS_26 } = __VLS_24.slots;
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (__VLS_ctx.getTitle(__VLS_ctx.menuItem));
            // @ts-ignore
            [menuItem, menuItem, menuItem, menuItem, menuItem, ns, getTitle, getTitle,];
            var __VLS_24;
        }
        if (__VLS_ctx.menuItem.meta.tagText && __VLS_ctx.showTag) {
            let __VLS_27;
            /** @ts-ignore @type {typeof ___VLS_components.elTag | typeof ___VLS_components.ElTag} */
            elTag;
            // @ts-ignore
            const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
                size: "small",
                type: "danger",
                effect: "dark",
                ...(__VLS_ctx.menuItem.meta.tagProps),
                ...{ class: "menu-item-tag" },
            }));
            const __VLS_29 = __VLS_28({
                size: "small",
                type: "danger",
                effect: "dark",
                ...(__VLS_ctx.menuItem.meta.tagProps),
                ...{ class: "menu-item-tag" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_28));
            /** @type {__VLS_StyleScopedClasses['menu-item-tag']} */ ;
            const { default: __VLS_32 } = __VLS_30.slots;
            (__VLS_ctx.menuItem.meta.tagText);
            // @ts-ignore
            [menuItem, menuItem, menuItem, showTag,];
            var __VLS_30;
        }
        if (__VLS_ctx.menuItem.meta.pointTag && __VLS_ctx.showTag) {
            let __VLS_33;
            /** @ts-ignore @type {typeof ___VLS_components.PointTag} */
            PointTag;
            // @ts-ignore
            const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
                type: "danger",
                ...(__VLS_ctx.menuItem.meta.pointTagProps),
                ...{ class: "menu-item-tag point-tag" },
            }));
            const __VLS_35 = __VLS_34({
                type: "danger",
                ...(__VLS_ctx.menuItem.meta.pointTagProps),
                ...{ class: "menu-item-tag point-tag" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_34));
            /** @type {__VLS_StyleScopedClasses['menu-item-tag']} */ ;
            /** @type {__VLS_StyleScopedClasses['point-tag']} */ ;
        }
        // @ts-ignore
        [menuItem, menuItem, showTag,];
    }
    // @ts-ignore
    [];
    var __VLS_9;
    var __VLS_10;
}
else {
    let __VLS_38;
    /** @ts-ignore @type {typeof ___VLS_components.elSubMenu | typeof ___VLS_components.ElSubMenu} */
    elSubMenu;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
        index: (__VLS_ctx.menuItem.meta._fullPath || __VLS_ctx.menuItem.path),
        ...{ class: "is-sub" },
    }));
    const __VLS_40 = __VLS_39({
        index: (__VLS_ctx.menuItem.meta._fullPath || __VLS_ctx.menuItem.path),
        ...{ class: "is-sub" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    var __VLS_43 = {};
    /** @type {__VLS_StyleScopedClasses['is-sub']} */ ;
    const { default: __VLS_44 } = __VLS_41.slots;
    {
        const { title: __VLS_45 } = __VLS_41.slots;
        if (__VLS_ctx.menuItem.meta.icon) {
            let __VLS_46;
            /** @ts-ignore @type {typeof ___VLS_components.Icon} */
            Icon;
            // @ts-ignore
            const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
                icon: (__VLS_ctx.menuItem.meta.icon),
                ...{ class: (`${__VLS_ctx.ns.elNamespace}-icon`) },
            }));
            const __VLS_48 = __VLS_47({
                icon: (__VLS_ctx.menuItem.meta.icon),
                ...{ class: (`${__VLS_ctx.ns.elNamespace}-icon`) },
            }, ...__VLS_functionalComponentArgsRest(__VLS_47));
        }
        if (!__VLS_ctx.menuItem.meta.useTooltip) {
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (__VLS_ctx.getTitle(__VLS_ctx.menuItem));
        }
        else {
            let __VLS_51;
            /** @ts-ignore @type {typeof ___VLS_components.Tooltip} */
            Tooltip;
            // @ts-ignore
            const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
                offset: (-10),
                try: (1),
            }));
            const __VLS_53 = __VLS_52({
                offset: (-10),
                try: (1),
            }, ...__VLS_functionalComponentArgsRest(__VLS_52));
            const { default: __VLS_56 } = __VLS_54.slots;
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (__VLS_ctx.getTitle(__VLS_ctx.menuItem));
            // @ts-ignore
            [menuItem, menuItem, menuItem, menuItem, menuItem, menuItem, menuItem, ns, getTitle, getTitle,];
            var __VLS_54;
        }
        if (__VLS_ctx.menuItem.meta.tagText && !__VLS_ctx.menu.collapsed) {
            let __VLS_57;
            /** @ts-ignore @type {typeof ___VLS_components.elTag | typeof ___VLS_components.ElTag} */
            elTag;
            // @ts-ignore
            const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
                size: "small",
                type: "danger",
                effect: "dark",
                ...(__VLS_ctx.menuItem.meta.tagProps),
                ...{ class: "menu-item-tag" },
            }));
            const __VLS_59 = __VLS_58({
                size: "small",
                type: "danger",
                effect: "dark",
                ...(__VLS_ctx.menuItem.meta.tagProps),
                ...{ class: "menu-item-tag" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_58));
            /** @type {__VLS_StyleScopedClasses['menu-item-tag']} */ ;
            const { default: __VLS_62 } = __VLS_60.slots;
            (__VLS_ctx.menuItem.meta.tagText);
            // @ts-ignore
            [menuItem, menuItem, menuItem, menu,];
            var __VLS_60;
        }
        if (__VLS_ctx.menuItem.meta.pointTag && !__VLS_ctx.menu.collapsed) {
            let __VLS_63;
            /** @ts-ignore @type {typeof ___VLS_components.PointTag} */
            PointTag;
            // @ts-ignore
            const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
                type: "danger",
                ...(__VLS_ctx.menuItem.meta.pointTagProps),
                ...{ class: "menu-item-tag point-tag" },
            }));
            const __VLS_65 = __VLS_64({
                type: "danger",
                ...(__VLS_ctx.menuItem.meta.pointTagProps),
                ...{ class: "menu-item-tag point-tag" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_64));
            /** @type {__VLS_StyleScopedClasses['menu-item-tag']} */ ;
            /** @type {__VLS_StyleScopedClasses['point-tag']} */ ;
        }
        // @ts-ignore
        [menuItem, menuItem, menu,];
    }
    if (__VLS_ctx.menuItem.children) {
        for (const [child] of __VLS_getVForSourceType((__VLS_ctx.menuItem.children))) {
            let __VLS_68;
            /** @ts-ignore @type {typeof ___VLS_components.MenuItem} */
            MenuItem;
            // @ts-ignore
            const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
                key: (child.path),
                menuItem: (child),
                ...{ class: (__VLS_ctx.ns.is('child')) },
            }));
            const __VLS_70 = __VLS_69({
                key: (child.path),
                menuItem: (child),
                ...{ class: (__VLS_ctx.ns.is('child')) },
            }, ...__VLS_functionalComponentArgsRest(__VLS_69));
            // @ts-ignore
            [menuItem, menuItem, ns,];
        }
    }
    // @ts-ignore
    [];
    var __VLS_41;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
