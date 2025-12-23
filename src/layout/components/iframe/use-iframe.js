import { useRouter } from "vue-router";
import { useEventListener } from "@vueuse/core";
import { isObject, isString } from "@/common/utils";
import { useLayoutStore } from "@/pinia";
import { useTabNav } from "../tab-nav/use-tab-nav";
const IFrameView = () => import("./iframe-view.vue");
const IFrameBlank = () => import("./iframe-blank.vue");
/**
 * 接收 iframe 传来的消息，并进行逻辑处理
 */
export const useIFrame = (immediate = true) => {
    const layoutStore = useLayoutStore();
    const { closeSelectedTab } = useTabNav();
    const router = useRouter();
    let cleanup;
    /**
     * 判断是否是当前 iframe
     */
    const isCurrentIFrame = (item) => item.name === router.currentRoute.value.name;
    /**
     * 接收 iframe 传来的消息，执行该消息（如果把 admin 作为门户来嵌入各个系统，则用到）
     *
     * @param evt 通信数据
     */
    const watchFrameMessage = (evt) => {
        const { data } = evt;
        let message;
        if (isString(message))
            message = JSON.parse(data);
        else if (isObject(message))
            message = data;
        else
            return;
        const { name, iframeSrc, closeName, refreshName } = message;
        // 打开一个新的页面
        if (iframeSrc) {
            // 如果是 iframe，则传入一个路由格式数据
            const route = { ...message };
            route.component = route.meta.iframeKeepAlive ? IFrameBlank : IFrameView;
            router.addRoute("Layout", route);
            return router.push({ name: route.name });
        }
        // 打开系统路由
        if (name && router.hasRoute(name))
            return router.push({ name });
        // 关闭一个路由
        if (closeName)
            return closeFrame(closeName);
        // 刷新一个路由，如果一个路由被关闭，则直接打开该路由
        if (refreshName) {
            closeFrame(refreshName);
            return router.push({ name: refreshName });
        }
    };
    /**
     * 关闭 iframe
     */
    const closeFrame = (name) => {
        const tab = layoutStore.tabNavList.find(tab => tab.name === name);
        tab && closeSelectedTab(tab);
    };
    /**
     * 开始监听 iframe 消息
     */
    const start = () => {
        cleanup = useEventListener("message", watchFrameMessage);
    };
    /**
     * 停止监听 iframe 消息
     */
    const stop = () => {
        cleanup?.();
    };
    if (immediate)
        start();
    return {
        start,
        stop,
        isCurrentIFrame,
    };
};
