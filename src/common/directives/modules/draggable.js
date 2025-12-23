const draggable = {
    mounted(el) {
        el.style.cursor = "move";
        el.style.position = "absolute";
        let startX = 0;
        let startY = 0;
        let initialLeft = 0;
        let initialTop = 0;
        const getParent = () => {
            return (el.parentElement || document.body);
        };
        const onMouseMove = (e) => {
            const parent = getParent();
            const maxX = parent.offsetWidth - el.offsetWidth;
            const maxY = parent.offsetHeight - el.offsetHeight;
            let newLeft = initialLeft + (e.pageX - startX);
            let newTop = initialTop + (e.pageY - startY);
            newLeft = Math.max(0, Math.min(newLeft, maxX));
            newTop = Math.max(0, Math.min(newTop, maxY));
            el.style.left = `${newLeft}px`;
            el.style.top = `${newTop}px`;
        };
        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
        const onMouseDown = (e) => {
            // 只允许鼠标左键拖拽
            if (e.button !== 0)
                return;
            startX = e.pageX;
            startY = e.pageY;
            initialLeft = el.offsetLeft;
            initialTop = el.offsetTop;
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        };
        el.addEventListener("mousedown", onMouseDown);
        el.__draggableHandlers__ = {
            mousemove: onMouseMove,
            mouseup: onMouseUp,
            mousedown: onMouseDown,
        };
    },
    beforeUnmount(el) {
        if (el.__draggableHandlers__) {
            el.removeEventListener("mousedown", el.__draggableHandlers__.mousedown);
            document.removeEventListener("mousemove", el.__draggableHandlers__.mousemove);
            document.removeEventListener("mouseup", el.__draggableHandlers__.mouseup);
            delete el.__draggableHandlers__;
        }
    },
};
export default draggable;
