import { ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./core/user";
export const useErrorLogStore = defineStore("errorLogStore", () => {
    const errorLogs = ref([]);
    /**
     * 添加错误日志
     *
     * @param errorLog 错误日志
     */
    const addErrorLog = (errorLog) => {
        const userStore = useUserStore();
        const { userInfo, accessToken, roles } = userStore;
        const log = {
            ...errorLog,
            userId: userInfo.userId,
            username: userInfo.username,
            accessToken,
            roles,
            time: new Date().getTime(),
        };
        errorLogs.value.push(log);
    };
    /**
     * 删除一条错误日志
     *
     * @param errorLog 错误日志
     */
    const deleteOneErrorLog = (errorLog) => {
        const index = errorLogs.value.findIndex(e => e.time === errorLog.time);
        index !== -1 && errorLogs.value.splice(index, 1);
    };
    /**
     * 清空错误日志
     *
     * @param errorLog 错误日志
     */
    const clearErrorLog = () => {
        errorLogs.value.splice(0);
    };
    /**
     * 设置错误日志的已读状态
     *
     * @param status 是否已读
     */
    const readAllErrorLogs = (status) => {
        errorLogs.value = errorLogs.value.map(errorLog => {
            errorLog.hasRead = status;
            return errorLog;
        });
    };
    /**
     * 设置指定错误日志的已读状态
     *
     * @param errorLog 错误日志
     */
    const readOneErrorLog = (id) => {
        const index = errorLogs.value.findIndex(e => e.id === id);
        index !== -1 && (errorLogs.value[index].hasRead = true);
    };
    return {
        errorLogs,
        addErrorLog,
        deleteOneErrorLog,
        clearErrorLog,
        readAllErrorLogs,
        readOneErrorLog,
    };
});
