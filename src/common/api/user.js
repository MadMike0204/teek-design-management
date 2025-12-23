import { http } from "@/common/http";
export const UserService = {
    // 登录
    login(params) {
        return http.post("/auth/login", params);
    },
    // 管理员登录
    loginAdmin(params) {
        return http.post("http://117.72.201.153:1202/admin/admin-user/login-admin", params, {
            baseURL: "",
        });
    },
    // 获取用户信息
    getUserInfo() {
        return http.get("/auth/getUserInfo");
    },
    // 获取用户列表
    getUserList(params) {
        return http.get("http://117.72.201.153:1202/admin/admin-user/list", {
            params,
            baseURL: "",
        });
    },
    // 更新用户信息
    updateUser(params) {
        return http.put(`http://117.72.201.153:1202/admin/admin-user/update/${params.userId}`, params, {
            baseURL: "",
        });
    },
    // 删除用户
    deleteUser(userId) {
        return http.delete(`http://117.72.201.153:1202/admin/admin-user/delete/${userId}`, {
            baseURL: "",
        });
    },
    // 获取管理员列表
    getAdminList(params) {
        return http.get("http://117.72.201.153:1202/admin/admin-user/list", params, {
            baseURL: "",
        });
    },
    // 更新管理员信息
    updateAdmin(params) {
        return http.post("http://117.72.201.153:1202/admin/admin-user/update", params, {
            baseURL: "",
        });
    },
    // 删除管理员
    deleteAdmin(id) {
        return http.delete(`http://117.72.201.153:1202/admin/admin-user/delete/${id}`, {
            baseURL: "",
        });
    },
    // 查看管理员详细信息
    getAdminDetail(id) {
        return http.get(`http://117.72.201.153:1202/admin/admin-user/detail/${id}`, {
            baseURL: "",
        });
    },
    // 一键创建初始管理员
    addDefaultAdmin() {
        return http.post("http://117.72.201.153:1202/admin/admin-user/add-default", {}, {
            baseURL: "",
        });
    },
    // 更新管理员状态
    updateAdminStatus(id, status) {
        return http.put(`http://117.72.201.153:1202/admin/admin-user/update-status/${id}`, { status }, {
            baseURL: "",
        });
    },
    // 启用/禁用管理员
    changeAdminStatus(params) {
        return http.post("http://117.72.201.153:1202/admin/admin-user/change-status", params, {
            baseURL: "",
        });
    },
    // 小程序用户分页搜索列表
    getClientUserList(params) {
        return http.get("http://117.72.201.153:1202/admin/client-user/list", params, {
            baseURL: "",
        });
    },
    // 更改用户信息
    updateClientUser(params) {
        return http.post("http://117.72.201.153:1202/admin/client-user/update", params, {
            baseURL: "",
        });
    },
    // 启用/禁用用户
    changeClientUserStatus(params) {
        return http.post("http://117.72.201.153:1202/admin/client-user/change-status", params, {
            baseURL: "",
        });
    },
    // 删除/恢复用户
    changeClientUserDeleted(params) {
        return http.post("http://117.72.201.153:1202/admin/client-user/change-deleted", params, {
            baseURL: "",
        });
    },
    // 查看用户详细信息
    getClientUserDetail(id) {
        return http.get(`http://117.72.201.153:1202/admin/client-user/detail/${id}`, {
            baseURL: "",
        });
    },
};
