/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { reactive, computed, provide } from "vue";
import { storeToRefs } from "pinia";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { LanguageEnum } from "@/common/enums";
import { GlobalConfigKey, serviceConfig } from "@/common/config";
import { isFunction } from "@/common/utils";
import { useNamespace, useWatchCssVar, useTheme } from "@/composables";
import { useSettingStore, useLayoutStore } from "@/pinia";
import { useIFrame } from "@/layout/components/iframe/use-iframe";
import Loading from "@/layout/components/loading/index.vue";
const ns = useNamespace();
const settingStore = useSettingStore();
const layoutStore = useLayoutStore();
const { layout } = storeToRefs(settingStore);
const { language } = storeToRefs(layoutStore);
// 自定义注入全局参数。ElConfigProvider 会自动使用 provide 全局注入它的 props 到项目里，可以通过 configProviderContextKey 来 inject 获取（先从 element-plus 引入，然后 const config = inject(configProviderContextKey)）
provide(GlobalConfigKey, { size: computed(() => layout.value.elementPlusSize) });
// 初始化主题配置
useTheme().initTheme();
// 监听布局样式变量
useWatchCssVar();
// IFrame 通信
useIFrame(serviceConfig.layout.watchFrame);
// 配置 element 按钮文字中间是否有空格
const config = reactive({ autoInsertSpace: false });
// element 语言配置
const i18nLocale = computed(() => {
    if (language.value === LanguageEnum.ZhCn)
        return zhCn;
    if (language.value === LanguageEnum.EnUs)
        return en;
    return document.documentElement.lang === "zh-CN" ? zhCn : en;
});
if (isFunction(log.success))
    log.success(__APP_INFO__.pkg.version, "欢迎使用 Teek Design Vue3 系统");
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
const __VLS_0 = Loading;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
/** @ts-ignore @type {typeof ___VLS_components.elConfigProvider | typeof ___VLS_components.ElConfigProvider} */
elConfigProvider;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    namespace: (__VLS_ctx.ns.elNamespace),
    locale: (__VLS_ctx.i18nLocale),
    button: (__VLS_ctx.config),
    size: (__VLS_ctx.layout.elementPlusSize),
}));
const __VLS_7 = __VLS_6({
    namespace: (__VLS_ctx.ns.elNamespace),
    locale: (__VLS_ctx.i18nLocale),
    button: (__VLS_ctx.config),
    size: (__VLS_ctx.layout.elementPlusSize),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_10 } = __VLS_8.slots;
let __VLS_11;
/** @ts-ignore @type {typeof ___VLS_components.routerView | typeof ___VLS_components.RouterView} */
routerView;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
{
    const { default: __VLS_16 } = __VLS_14.slots;
    const [{ Component }] = __VLS_getSlotParameters(__VLS_16);
    const __VLS_17 = (Component);
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
    const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
    // @ts-ignore
    [ns, i18nLocale, config, layout,];
    __VLS_14.slots['' /* empty slot name completion */];
}
var __VLS_14;
// @ts-ignore
[];
var __VLS_8;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
