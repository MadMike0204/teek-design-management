import { adminHttp } from "@/common/http/instance/admin-request";

/**
 * 后台用户管理相关API
 */
export const AdminUserService = {
    /**
     * 管理员登录
     * POST /admin/admin-user/login-admin
     */
    loginAdmin(params) {
        return adminHttp.post("/admin/admin-user/login-admin", params);
    },
    /**
     * 获取管理员列表
     * POST /admin/admin-user/list
     */
    getAdminList(params) {
        return adminHttp.post("/admin/admin-user/list", params);
    },
    /**
     * 更新管理员信息
     * POST /admin/admin-user/update
     */
    updateAdmin(params) {
        return adminHttp.post("/admin/admin-user/update", params);
    },
    /**
     * 删除管理员
     * DELETE /admin/admin-user/delete/{id}
     */
    deleteAdmin(id) {
        return adminHttp.delete(`/admin/admin-user/delete/${id}`);
    },
    /**
     * 查看管理员详细信息
     * GET /admin/admin-user/detail/{id}
     */
    getAdminDetail(id) {
        return adminHttp.get(`/admin/admin-user/detail/${id}`);
    },
    /**
     * 一键创建初始管理员
     * POST /admin/admin-user/add-default
     */
    addDefaultAdmin() {
        return adminHttp.post("/admin/admin-user/add-default", {});
    },
    /**
     * 启用/禁用管理员
     * POST /admin/admin-user/change-status
     */
    changeAdminStatus(params) {
        return adminHttp.post("/admin/admin-user/change-status", params);
    },
    /**
     * 小程序用户分页搜索列表
     * POST /admin/client-user/list
     */
    getClientUserList(params) {
        return adminHttp.post("/admin/client-user/list", params);
    },
    /**
     * 更改用户信息
     * POST /admin/client-user/update
     */
    updateClientUser(params) {
        return adminHttp.post("/admin/client-user/update", params);
    },
    /**
     * 启用/禁用用户
     * POST /admin/client-user/change-status
     */
    changeClientUserStatus(params) {
        return adminHttp.post("/admin/client-user/change-status", params);
    },
    /**
     * 删除/恢复用户
     * POST /admin/client-user/change-deleted
     */
    changeClientUserDeleted(params) {
        return adminHttp.post("/admin/client-user/change-deleted", params);
    },
    /**
     * 查看用户详细信息（后台接口）
     * GET /admin/client-user/detail/{id}
     */
    getClientUserDetail(id) {
        return adminHttp.get(`/admin/client-user/detail/${id}`);
    },
};




