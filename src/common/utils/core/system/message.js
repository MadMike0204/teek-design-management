import { ElMessage } from "element-plus";
import { isFunction, isString } from "../helper";
/** 用法非常简单，参考 src/views/components/message/index.vue 文件 */
/**
 * Message 消息提示函数
 * 支持两种形式：
 * 1. 有一个参数，且参数是个消息内容 + 配置的对象：message({})
 * 2. 有两个参数，第一个参数是消息内容，第二个是配置对象：message("", {})
 */
function message(params, extra) {
    return messageType(params, extra, "info");
}
/**
 * 等价于 ElMessage.info({})
 * 支持两种形式：
 * 1. message.info({})
 * 2 message.info("", {})
 */
message.info = (params, extra) => {
    return messageType(params, extra, "info");
};
/**
 * 等价于 ElMessage.success({})
 * 支持两种形式：
 * 1. message.success({})
 * 2 message.success("", {})
 */
message.success = (params, extra) => {
    return messageType(params, extra, "success");
};
/**
 * 等价于 ElMessage.warning({})
 * 支持两种形式：
 * 1. message.warning({})
 * 2 message.warning("", {})
 */
message.warning = (params, extra) => {
    return messageType(params, extra, "warning");
};
/**
 * 等价于 ElMessage.error({})
 * 支持两种形式：
 * 1. message.error({})
 * 2 message.error("", {})
 */
message.error = (params, extra) => {
    return messageType(params, extra, "error");
};
function messageType(params, extra, t = "info" // t 就是传参的 type
) {
    if (isMessageProps(params)) {
        if (extra) {
            const { icon, type = t, dangerouslyUseHTMLString = false, mode = "el", duration = 3000, showClose = false, offset = 20, appendTo = document.body, grouping = false, onClose, plain, } = extra;
            return ElMessage({
                message: params,
                type,
                icon,
                dangerouslyUseHTMLString,
                duration,
                showClose,
                offset,
                appendTo,
                grouping,
                customClass: mode === "antd" ? "antd-message" : mode,
                onClose: () => (isFunction(onClose) ? onClose() : null),
                plain,
            });
        }
        return ElMessage({
            message: params,
            type: t,
            plain: true,
        });
    }
    const { message, icon, dangerouslyUseHTMLString = false, mode = "el", duration = 3000, showClose = false, offset = 20, appendTo = document.body, grouping = false, onClose, } = params;
    let type = t;
    if (isMessageParams(params))
        type = params.type || t;
    return ElMessage({
        message,
        type,
        icon,
        dangerouslyUseHTMLString,
        duration,
        showClose,
        offset,
        appendTo,
        grouping,
        // antd-message 在 src/common/styles/plugins.scss 下
        customClass: mode === "antd" ? "antd-message" : mode,
        onClose: () => (isFunction(onClose) ? onClose() : null),
    });
}
function isMessageProps(value) {
    return isString(value) || !value?.message;
}
function isMessageParams(params) {
    return !!params.type;
}
/**
 * 关闭所有 `Message` 消息提示函数
 */
const closeAllMessage = () => ElMessage.closeAll();
export { message, closeAllMessage };
