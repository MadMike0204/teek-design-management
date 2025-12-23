/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { storeToRefs } from "pinia";
import { Expand, Fold } from "@element-plus/icons-vue";
import { UpdateInMenuAreaStateKey } from "@/common/config";
import { useNamespace } from "@/composables";
import { useSettingStore } from "@/pinia";
defineOptions({ name: "CollapseTrigger" });
const ns = useNamespace("collapse-trigger");
const settingStore = useSettingStore();
const { menu } = storeToRefs(settingStore);
const updateInMenuAreaState = inject(UpdateInMenuAreaStateKey);
/**
 * 切换侧边菜单
 */
const toggleTrigger = () => {
    settingStore.toggleSideMenu();
    updateInMenuAreaState?.();
};
const rightClick = () => {
    if (menu.value.rightClickMenuCollapseToClose)
        menu.value.enabled = !menu.value.enabled;
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.toggleTrigger) },
    ...{ onClick: (__VLS_ctx.rightClick) },
    ...{ class: (__VLS_ctx.ns.b()) },
    ...{ class: "flx-center" },
});
/** @type {__VLS_StyleScopedClasses['flx-center']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.Icon} */
Icon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    icon: (__VLS_ctx.menu.collapsed ? __VLS_ctx.Expand : __VLS_ctx.Fold),
}));
const __VLS_2 = __VLS_1({
    icon: (__VLS_ctx.menu.collapsed ? __VLS_ctx.Expand : __VLS_ctx.Fold),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
// @ts-ignore
var __VLS_6 = __VLS_5;
// @ts-ignore
[toggleTrigger, rightClick, ns, menu, Expand, Fold,];
const __VLS_base = (await import('vue')).defineComponent({});
const __VLS_export = {};
export default {};
