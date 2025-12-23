/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ElScrollbar, ElMenu } from "element-plus";
import { isFunction } from "@/common/utils";
import { useMenu } from "@/composables";
import { useSettingStore } from "@/pinia";
import MenuItem from "./menu-item.vue";
defineOptions({ name: "AsideMenu" });
const props = withDefaults(defineProps(), {
    menuList: () => [],
    activeMenu: "",
    isCollapse: undefined,
});
const route = useRoute();
const settingStore = useSettingStore();
const { menuList: menuListRef } = useMenu();
const { menu } = storeToRefs(settingStore);
// 当前激活菜单
const activeMenu = computed(() => {
    if (props.activeMenu)
        return props.activeMenu;
    const { activeMenu, _fullPath } = route.meta;
    return isFunction(activeMenu) ? activeMenu(route) : activeMenu || _fullPath || route.path;
});
const isCollapse = computed(() => (props.isCollapse === undefined ? menu.value.collapsed : props.isCollapse));
// 菜单列表
const menuList = computed(() => {
    if (props.menuList?.length)
        return props.menuList;
    return menuListRef.value;
});
const __VLS_defaults = {
    menuList: () => [],
    activeMenu: "",
    isCollapse: undefined,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elScrollbar | typeof ___VLS_components.ElScrollbar} */
elScrollbar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type {typeof ___VLS_components.elMenu | typeof ___VLS_components.ElMenu} */
elMenu;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    defaultActive: (__VLS_ctx.activeMenu),
    collapse: (__VLS_ctx.isCollapse),
    uniqueOpened: (__VLS_ctx.menu.accordion),
    collapseTransition: (false),
    ...({ ...__VLS_ctx.$attrs, class: undefined }),
}));
const __VLS_9 = __VLS_8({
    defaultActive: (__VLS_ctx.activeMenu),
    collapse: (__VLS_ctx.isCollapse),
    uniqueOpened: (__VLS_ctx.menu.accordion),
    collapseTransition: (false),
    ...({ ...__VLS_ctx.$attrs, class: undefined }),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
for (const [menu] of __VLS_getVForSourceType((__VLS_ctx.menuList))) {
    const __VLS_13 = MenuItem;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        key: (menu.path),
        menuItem: (menu),
    }));
    const __VLS_15 = __VLS_14({
        key: (menu.path),
        menuItem: (menu),
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    // @ts-ignore
    [activeMenu, isCollapse, menu, $attrs, menuList,];
}
// @ts-ignore
[];
var __VLS_10;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
