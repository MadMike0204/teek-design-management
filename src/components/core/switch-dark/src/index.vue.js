/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { ElSwitch } from "element-plus";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useSettingStore } from "@/pinia";
import { switchThemeWithAnimation } from "@/layout/components/header/components/light-dark-switch/animation";
defineOptions({ name: "SwitchDark" });
const settingStore = useSettingStore();
const { isDark } = storeToRefs(settingStore);
const dark = ref(isDark.value);
const onAddDarkChange = (e) => {
    switchThemeWithAnimation(e);
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
elSwitch;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    modelValue: (__VLS_ctx.dark),
    inlinePrompt: true,
    activeIcon: (__VLS_ctx.Sunny),
    inactiveIcon: (__VLS_ctx.Moon),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    modelValue: (__VLS_ctx.dark),
    inlinePrompt: true,
    activeIcon: (__VLS_ctx.Sunny),
    inactiveIcon: (__VLS_ctx.Moon),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.onAddDarkChange) });
var __VLS_7 = {};
var __VLS_3;
var __VLS_4;
// @ts-ignore
[dark, Sunny, Moon, onAddDarkChange,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
