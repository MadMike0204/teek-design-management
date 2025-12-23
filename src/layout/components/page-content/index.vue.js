/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, nextTick, provide, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { ElMain } from "element-plus";
import { RefreshPageKey } from "@/common/config";
import { getUrlParams, mittBus } from "@/common/utils";
import { useNamespace } from "@/composables";
import { useLayoutStore, useSettingStore } from "@/pinia";
import Maximize from "./components/maximize.vue";
import Loading from "../loading/index.vue";
import FrameLayout from "../iframe/index.vue";
defineOptions({ name: "MainContent" });
const ns = useNamespace("page-content");
const route = useRoute();
const layoutStore = useLayoutStore();
const settingStore = useSettingStore();
const { isRefreshRoute } = useRefreshPage();
const { layout, transition } = storeToRefs(settingStore);
/**
 * 刷新页面
 */
function useRefreshPage() {
    const isRefreshRoute = ref(true);
    /**
     * 刷新当前页面函数
     */
    const refreshPage = (value) => {
        const name = (route.name || route.path);
        const isKeepAlive = route.meta?.isKeepAlive;
        // 自定义刷新页面状态
        if (value !== undefined) {
            if (value === false)
                name && isKeepAlive && layoutStore.removeKeepAliveName(name);
            else
                name && isKeepAlive && layoutStore.addKeepAliveName(name);
            return (isRefreshRoute.value = value);
        }
        // 如果页面被缓存，则移除缓存
        name && isKeepAlive && layoutStore.removeKeepAliveName(name);
        isRefreshRoute.value = false;
        nextTick(() => {
            isRefreshRoute.value = true;
            // 如果页面开启缓存，则重新添加回缓存列表
            if (name && isKeepAlive)
                layoutStore.addKeepAliveName(name);
        });
    };
    /**
     * 往所有路径组件提供刷新当前页面函数
     */
    provide(RefreshPageKey, refreshPage);
    mittBus.on(RefreshPageKey, refreshPage);
    return { isRefreshRoute, refreshPage };
}
// 监听当前页是否最大化，动态添加 class
watchEffect(() => {
    const urlParams = getUrlParams();
    const app = document.getElementById("app");
    if (urlParams.get("_maximize")) {
        if (!app?.className.includes("page-maximize"))
            app?.classList.add("page-maximize");
    }
    else {
        if (layout.value.maximize)
            app?.classList.add("page-maximize");
        else
            app?.classList.remove("page-maximize");
    }
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (__VLS_ctx.layout.maximize) {
    const __VLS_0 = Maximize;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
let __VLS_5;
/** @ts-ignore @type {typeof ___VLS_components.elMain | typeof ___VLS_components.ElMain} */
elMain;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ class: (__VLS_ctx.ns.b()) },
    ...{ class: "page-content" },
}));
const __VLS_7 = __VLS_6({
    ...{ class: (__VLS_ctx.ns.b()) },
    ...{ class: "page-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
(__VLS_ctx.$attrs);
/** @type {__VLS_StyleScopedClasses['page-content']} */ ;
const { default: __VLS_10 } = __VLS_8.slots;
let __VLS_11;
/** @ts-ignore @type {typeof ___VLS_components.routerView | typeof ___VLS_components.RouterView} */
routerView;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
{
    const { default: __VLS_16 } = __VLS_14.slots;
    const [{ Component, route }] = __VLS_getSlotParameters(__VLS_16);
    const __VLS_17 = Loading;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        route: true,
    }));
    const __VLS_19 = __VLS_18({
        route: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    let __VLS_22;
    /** @ts-ignore @type {typeof ___VLS_components.transition | typeof ___VLS_components.Transition} */
    transition;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
        ...(route.meta.transitionProps),
        name: (route.meta.transitionProps?.name || __VLS_ctx.transition.pageEnter),
        mode: "out-in",
        appear: true,
    }));
    const __VLS_24 = __VLS_23({
        ...(route.meta.transitionProps),
        name: (route.meta.transitionProps?.name || __VLS_ctx.transition.pageEnter),
        mode: "out-in",
        appear: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    const { default: __VLS_27 } = __VLS_25.slots;
    let __VLS_28;
    /** @ts-ignore @type {typeof ___VLS_components.keepAlive | typeof ___VLS_components.KeepAlive} */
    keepAlive;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        max: (10),
        include: (__VLS_ctx.layoutStore.keepAliveName),
    }));
    const __VLS_30 = __VLS_29({
        max: (10),
        include: (__VLS_ctx.layoutStore.keepAliveName),
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    const { default: __VLS_33 } = __VLS_31.slots;
    if (__VLS_ctx.isRefreshRoute) {
        const __VLS_34 = (Component);
        // @ts-ignore
        const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
            key: (route.fullPath),
        }));
        const __VLS_36 = __VLS_35({
            key: (route.fullPath),
        }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    }
    // @ts-ignore
    [layout, ns, $attrs, transition, layoutStore, isRefreshRoute,];
    var __VLS_31;
    // @ts-ignore
    [];
    var __VLS_25;
    // @ts-ignore
    [];
    __VLS_14.slots['' /* empty slot name completion */];
}
var __VLS_14;
const __VLS_39 = FrameLayout;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({}));
const __VLS_41 = __VLS_40({}, ...__VLS_functionalComponentArgsRest(__VLS_40));
// @ts-ignore
[];
var __VLS_8;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
