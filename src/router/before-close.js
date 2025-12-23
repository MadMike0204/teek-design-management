import { ElMessageBox } from "element-plus";
const beforeClose = {
    before_close_normal: async (route) => {
        if (route.query._close)
            return true;
        try {
            await ElMessageBox.confirm("确定要关闭这一页吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            });
            return true;
        }
        catch {
            return false;
        }
    },
};
export default beforeClose;
