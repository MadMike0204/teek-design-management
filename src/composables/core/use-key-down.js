import { onScopeDispose } from "vue";
import { useEventListener } from "@vueuse/core";
export const useKeyDown = (options) => {
    const { watcher, callback } = options;
    let clean = () => { };
    let stopWatch = null;
    const start = () => {
        const watcherValue = unref(watcher);
        if (watcherValue) {
            clean();
            clean = useEventListener("keydown", callback);
        }
        if (watcherValue !== undefined) {
            stopWatch = watch(() => unref(watcher), newVal => {
                console.log(2);
                if (newVal) {
                    clean();
                    clean = useEventListener("keydown", callback);
                }
                else
                    clean();
            });
        }
    };
    const stop = () => {
        clean();
        stopWatch?.();
    };
    onScopeDispose(() => {
        stop();
    });
    return { start, stop };
};
