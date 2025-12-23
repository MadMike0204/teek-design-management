/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed, ref, onUnmounted, nextTick } from "vue";
import { ElAutocomplete, ElTooltip } from "element-plus";
import { useRouteStore } from "@/pinia";
import { useDebounceFn } from "@vueuse/core";
import { isFunction } from "@/common/utils";
import { useNamespace } from "@/composables";
import { useRouter } from "vue-router";
import { formatTitle } from "@/router/helper";
defineOptions({ name: "MenuSearch" });
const ns = useNamespace("menu-search");
const router = useRouter();
const routeStore = useRouteStore();
const nestMode = ref(true);
const menuList = computed(() => nestMode.value
    ? createNestMenuSearchList(routeStore.loadedRouteList)
    : routeStore.flatRouteList.filter(item => !item.meta.hideInMenu));
const handleSearchMenuList = (queryString, callback) => {
    const results = queryString ? menuList.value.filter(filterNodeMethod(queryString)) : menuList.value;
    callback(results);
};
const isShowSearch = ref(false);
const autocompleteInstance = useTemplateRef(__VLS_placeholder);
const searchMenu = ref("");
// 关闭搜索菜单
const handleCloseSearch = () => {
    isShowSearch.value = false;
    document.body.removeEventListener("click", handleCloseSearch);
    autocompleteInstance.value && autocompleteInstance.value.blur();
};
// 打开搜索菜单
const handleStartSearch = () => {
    isShowSearch.value = true;
    searchMenu.value = "";
    // 工具实现防抖
    useDebounceFn(() => {
        autocompleteInstance.value && autocompleteInstance.value.focus();
        document.body.addEventListener("click", handleCloseSearch);
    }, 250)();
};
const handleSwitchMode = () => {
    nestMode.value = !nestMode.value;
    if (autocompleteInstance.value) {
        autocompleteInstance.value.close();
        nextTick(() => {
            setTimeout(() => {
                autocompleteInstance.value?.focus();
            }, 800);
        });
    }
};
// 筛选菜单
const filterNodeMethod = (queryString) => {
    return (restaurant) => {
        return (restaurant.meta._fullPath.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
            formatTitle(restaurant)?.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
    };
};
// 点击菜单跳转
const handleClickMenu = (menuItem) => {
    searchMenu.value = "";
    if (menuItem.meta.isLink)
        window.open(menuItem.meta.isLink, "_blank");
    else
        router.push(menuItem.meta._fullPath);
    handleCloseSearch();
};
/**
 * 生成层级下的所有 title 合在一起的菜单数组
 * @param menuList 嵌套菜单列表
 */
const createNestMenuSearchList = (menuList) => {
    const res = [];
    menuList.forEach(menu => {
        if (menu.meta.hideInMenu)
            return res;
        const item = { ...menu, title: [formatTitle(menu)] };
        if (item.children && item.children.length) {
            const menuListChild = createNestMenuSearchList(item.children);
            menuListChild.forEach(child => {
                const c = { ...child };
                c.title = [...item.title, ...child.title];
                res.push(c);
            });
        }
        else {
            res.push(item);
        }
    });
    return res;
};
onUnmounted(() => {
    document.body.removeEventListener("click", handleCloseSearch);
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: ([__VLS_ctx.ns.b(), __VLS_ctx.ns.is('show', __VLS_ctx.isShowSearch)]) },
});
if (!__VLS_ctx.isShowSearch) {
    let __VLS_0;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        icon: "core-search",
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        icon: "core-search",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ click: {} },
        { onClick: (__VLS_ctx.handleStartSearch) });
    var __VLS_3;
    var __VLS_4;
}
let __VLS_7;
/** @ts-ignore @type {typeof ___VLS_components.elAutocomplete | typeof ___VLS_components.ElAutocomplete} */
elAutocomplete;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    ...{ 'onSelect': {} },
    ...{ 'onClick': {} },
    modelValue: (__VLS_ctx.searchMenu),
    ref: "autocompleteInstance",
    placeholder: "支持菜单名称、路径",
    fetchSuggestions: (__VLS_ctx.handleSearchMenuList),
}));
const __VLS_9 = __VLS_8({
    ...{ 'onSelect': {} },
    ...{ 'onClick': {} },
    modelValue: (__VLS_ctx.searchMenu),
    ref: "autocompleteInstance",
    placeholder: "支持菜单名称、路径",
    fetchSuggestions: (__VLS_ctx.handleSearchMenuList),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_12;
const __VLS_13 = ({ select: {} },
    { onSelect: (__VLS_ctx.handleClickMenu) });
const __VLS_14 = ({ click: {} },
    { onClick: () => { } });
var __VLS_15 = {};
const { default: __VLS_17 } = __VLS_10.slots;
{
    const { prefix: __VLS_18 } = __VLS_10.slots;
    let __VLS_19;
    /** @ts-ignore @type {typeof ___VLS_components.elTooltip | typeof ___VLS_components.ElTooltip} */
    elTooltip;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        effect: "dark",
        content: "切换查询模式",
        placement: "left",
        showAfter: (100),
    }));
    const __VLS_21 = __VLS_20({
        effect: "dark",
        content: "切换查询模式",
        placement: "left",
        showAfter: (100),
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const { default: __VLS_24 } = __VLS_22.slots;
    let __VLS_25;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        ...{ 'onClick': {} },
        ...{ class: (__VLS_ctx.ns.e('icon')) },
        icon: "search",
        pointer: true,
        hover: true,
        hoverColor: (__VLS_ctx.ns.cssVar('color-primary')),
    }));
    const __VLS_27 = __VLS_26({
        ...{ 'onClick': {} },
        ...{ class: (__VLS_ctx.ns.e('icon')) },
        icon: "search",
        pointer: true,
        hover: true,
        hoverColor: (__VLS_ctx.ns.cssVar('color-primary')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    let __VLS_30;
    const __VLS_31 = ({ click: {} },
        { onClick: (__VLS_ctx.handleSwitchMode) });
    var __VLS_28;
    var __VLS_29;
    // @ts-ignore
    [ns, ns, ns, ns, isShowSearch, isShowSearch, handleStartSearch, searchMenu, handleSearchMenuList, handleClickMenu, handleSwitchMode,];
    var __VLS_22;
    // @ts-ignore
    [];
}
{
    const { default: __VLS_32 } = __VLS_10.slots;
    const [{ item }] = __VLS_getSlotParameters(__VLS_32);
    if (!__VLS_ctx.isFunction(item.meta.title)) {
        let __VLS_33;
        /** @ts-ignore @type {typeof ___VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
            ...{ class: "icon" },
            icon: (item.meta.icon),
        }));
        const __VLS_35 = __VLS_34({
            ...{ class: "icon" },
            icon: (item.meta.icon),
        }, ...__VLS_functionalComponentArgsRest(__VLS_34));
        /** @type {__VLS_StyleScopedClasses['icon']} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (__VLS_ctx.nestMode ? item.title.join(" > ") : item.meta.title);
    }
    // @ts-ignore
    [isFunction, nestMode,];
}
// @ts-ignore
[];
var __VLS_10;
var __VLS_11;
// @ts-ignore
var __VLS_16 = __VLS_15;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
