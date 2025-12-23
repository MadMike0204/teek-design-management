/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref } from "vue";
import { useRouter } from "vue-router";
import { serviceConfig } from "@/common/config";
import { useNamespace } from "@/composables";
defineOptions({ name: "Loading" });
const props = defineProps();
const ns = useNamespace("layout-loading");
const router = useRouter();
const loadedPaths = new Set();
// 页面首次加载状态
const isFirstLoad = ref(!props.route);
// 路由切换加载状态
const routeLoading = ref(false);
// 监听路由导航事件，控制加载状态
router.beforeEach((to, _from, next) => {
    if (props.route && !loadedPaths.has(to.path)) {
        routeLoading.value = true;
    }
    next();
});
router.afterEach(to => {
    loadedPaths.add(to.path);
    hideLoading();
});
router.onError(() => {
    hideLoading();
});
const hideLoading = () => {
    if (isFirstLoad.value)
        isFirstLoad.value = false;
    setTimeout(() => {
        if (props.route)
            routeLoading.value = false;
    }, 500);
};
// 检测热重载情况
onMounted(() => {
    if (!loadedPaths.has(router.currentRoute.value.fullPath))
        loadedPaths.add(router.currentRoute.value.fullPath);
    // 真正发生热更新时自动关闭首次加载状态
    if (import.meta.hot && window.__HMR_FIRST_UPDATE__)
        if (isFirstLoad.value)
            isFirstLoad.value = false;
    // 标记首次更新已完成
    if (import.meta.hot)
        window.__HMR_FIRST_UPDATE__ = true;
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "loading",
}));
const __VLS_2 = __VLS_1({
    name: "loading",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.isFirstLoad || __VLS_ctx.routeLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: ([__VLS_ctx.ns.b(), __VLS_ctx.ns.is('route', __VLS_ctx.route)]) },
        ...{ class: "flx-column-center" },
    });
    /** @type {__VLS_StyleScopedClasses['flx-column-center']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.ns.e('wrap')) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dot dot-spin" },
    });
    /** @type {__VLS_StyleScopedClasses['dot']} */ ;
    /** @type {__VLS_StyleScopedClasses['dot-spin']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({});
    if (__VLS_ctx.isFirstLoad) {
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: (__VLS_ctx.ns.e('text')) },
        });
        (__VLS_ctx.serviceConfig.layout.name);
    }
}
// @ts-ignore
[isFirstLoad, isFirstLoad, routeLoading, ns, ns, ns, ns, route, serviceConfig,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
