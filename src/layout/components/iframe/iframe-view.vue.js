/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { nextTick, ref, onMounted, computed, useTemplateRef } from "vue";
import { useRoute } from "vue-router";
import { useEventListener } from "@vueuse/core";
import { RefreshIFrameKey } from "@/common/config";
import { mittBus } from "@/common/utils";
import { useNamespace } from "@/composables";
defineOptions({ name: "IFrameView" });
const props = withDefaults(defineProps(), {
    iframeSrc: "",
    iframeName: "",
});
const ns = useNamespace("iframe-view");
const route = useRoute();
const iframeInstance = useTemplateRef(__VLS_placeholder);
const loading = ref(true);
const isRefresh = ref(true);
const iframeSrc = computed(() => props.iframeSrc || route.meta?.iframeSrc);
/**
 * 隐藏加载
 */
const hideLoading = () => (loading.value = false);
/**
 * 刷新 iframe
 */
mittBus.on(RefreshIFrameKey, () => {
    if (props.iframeName && props.iframeName !== route.name)
        return;
    isRefresh.value = false;
    nextTick(() => (isRefresh.value = true));
});
onMounted(() => {
    // 监听 iframe 加载完成
    if (route.meta?.iframeLoading !== false)
        useEventListener(iframeInstance, "load", hideLoading);
    else
        hideLoading();
});
onBeforeUnmount(() => {
    mittBus.off(RefreshIFrameKey);
});
const __VLS_defaults = {
    iframeSrc: "",
    iframeName: "",
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.b()) },
    'element-loading-text': "Loading ...",
});
__VLS_asFunctionalDirective(___VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
if (__VLS_ctx.isRefresh) {
    __VLS_asFunctionalElement(__VLS_intrinsics.iframe)({
        ref: "iframeInstance",
        src: (__VLS_ctx.iframeSrc),
        width: "100%",
        height: "100%",
        frameborder: "0",
        ...{ class: (__VLS_ctx.ns.e('iframe')) },
    });
}
// @ts-ignore
[ns, ns, vLoading, loading, isRefresh, iframeSrc,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
