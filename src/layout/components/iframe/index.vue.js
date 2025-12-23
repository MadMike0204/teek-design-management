/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useLayoutStore } from "@/pinia";
import { useIFrame } from "./use-iframe";
import IFrameView from "./iframe-view.vue";
defineOptions({ name: "IFrameLayout" });
const route = useRoute();
const layoutStore = useLayoutStore();
const { isCurrentIFrame } = useIFrame();
const { iframeList } = storeToRefs(layoutStore);
/**
 * frame 是否已经缓存
 */
const isFrameCache = (name) => iframeList.value.some(item => item.name === name);
watch(() => route.fullPath, () => {
    const { name, meta: { iframeSrc, iframeKeepAlive } = {} } = route;
    if (!iframeSrc)
        return;
    const iframe = {
        src: iframeSrc,
        name: name,
        show: true,
    };
    // 如果 iframe 没有缓存，则添加到 iframe 列表
    if (!isFrameCache(iframe.name) && iframeKeepAlive)
        layoutStore.addIFrame(iframe);
}, { immediate: true });
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (__VLS_ctx.iframeList.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    for (const [iframe] of __VLS_getVForSourceType((__VLS_ctx.iframeList))) {
        (iframe.src);
        if (iframe.src) {
            const __VLS_0 = IFrameView;
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
                iframeSrc: (iframe.src),
                iframeName: (iframe.name),
            }));
            const __VLS_2 = __VLS_1({
                iframeSrc: (iframe.src),
                iframeName: (iframe.name),
            }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            __VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isCurrentIFrame(iframe)) }, null, null);
        }
        // @ts-ignore
        [iframeList, iframeList, isCurrentIFrame,];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
