/**
 * 生成水印 base64 图片
 */
function createWatermarkBase64({ text = "水印", fontSize = "16px", textColor = "rgba(180,180,180,0.3)", width = 205, height = 140, fontFamily = "Microsoft YaHei", }) {
    const can = document.createElement("canvas");
    can.width = width;
    can.height = height;
    const ctx = can.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.rotate((-20 * Math.PI) / 180);
    ctx.font = `${fontSize} ${fontFamily}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 10, height / 2);
    return can.toDataURL("image/png");
}
const WATER_MARKER_CLASS = "water-marker-bg";
const waterMarker = {
    mounted(el, binding) {
        const options = binding.value || {};
        const base64 = createWatermarkBase64(options);
        // 设置父元素 position: relative，防止 overlay 层脱离
        const computedStyle = window.getComputedStyle(el);
        if (computedStyle.position === "static" || !computedStyle.position) {
            el.style.position = "relative";
        }
        // 创建 overlay 层
        const markDiv = document.createElement("div");
        markDiv.className = WATER_MARKER_CLASS;
        markDiv.style.position = "absolute";
        markDiv.style.left = "0";
        markDiv.style.top = "0";
        markDiv.style.width = "100%";
        markDiv.style.height = "100%";
        markDiv.style.pointerEvents = "none";
        markDiv.style.zIndex = "1";
        markDiv.style.backgroundImage = `url(${base64})`;
        markDiv.style.backgroundRepeat = "repeat";
        markDiv.style.backgroundPosition = "0 0";
        markDiv.style.backgroundSize = "auto";
        markDiv.setAttribute("data-water-marker", "true");
        el.appendChild(markDiv);
    },
    updated(el, binding) {
        // 支持动态更新水印内容
        const markDiv = el.querySelector(`.${WATER_MARKER_CLASS}`);
        if (markDiv) {
            const options = binding.value || {};
            const base64 = createWatermarkBase64(options);
            markDiv.style.backgroundImage = `url(${base64})`;
        }
    },
    unmounted(el) {
        // 移除 overlay 层
        const markDiv = el.querySelector(`.${WATER_MARKER_CLASS}`);
        if (markDiv)
            el.removeChild(markDiv);
    },
};
export default waterMarker;
