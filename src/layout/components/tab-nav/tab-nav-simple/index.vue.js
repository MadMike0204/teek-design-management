/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed } from "vue";
import { useSettingStore } from "@/pinia";
import ClassicTabNav from "../tab-nav-classic/index.vue";
defineOptions({ name: "SimpleTabNav" });
const settingStore = useSettingStore();
const { tabNav } = storeToRefs(settingStore);
const type = computed(() => tabNav.value.elementMode);
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
const __VLS_0 = ClassicTabNav;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    type: __VLS_ctx.type,
}));
const __VLS_2 = __VLS_1({
    type: __VLS_ctx.type,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
var __VLS_3;
// @ts-ignore
[type,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
