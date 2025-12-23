import { useBrowserTitle } from "@/composables";
export function createBrowserTitleGuard(router) {
    /**
     * 路由跳转结束
     */
    router.afterEach(_to => {
        const { setBrowserTitle } = useBrowserTitle();
        setBrowserTitle();
    });
}
