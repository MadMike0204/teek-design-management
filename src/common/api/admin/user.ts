import { adminHttp } from "@/common/http/instance/admin-request";

/**
 * 后台用户管理相关API
 */
export const AdminUserService = {
  /**
   * 管理员登录
   * POST /admin/admin-user/login-admin
   */
  loginAdmin(params: { username: string; password: string; verifyCode?: string }) {
    return adminHttp.post<httpNs.Response<string>>("/admin/admin-user/login-admin", params);
  },

  /**
   * 获取管理员列表
   * POST /admin/admin-user/list
   */
  getAdminList(params: any) {
    return adminHttp.post<httpNs.Response<any>>("/admin/admin-user/list", params);
  },

  /**
   * 更新管理员信息
   * POST /admin/admin-user/update
   */
  updateAdmin(params: any) {
    return adminHttp.post<httpNs.Response<any>>("/admin/admin-user/update", params);
  },

  /**
   * 删除管理员
   * DELETE /admin/admin-user/delete/{id}
   */
  deleteAdmin(id: string) {
    return adminHttp.delete<httpNs.Response<any>>(`/admin/admin-user/delete/${id}`);
  },

  /**
   * 查看管理员详细信息
   * GET /admin/admin-user/detail/{id}
   */
  getAdminDetail(id: number) {
    return adminHttp.get<httpNs.Response<any>>(`/admin/admin-user/detail/${id}`);
  },

  /**
   * 一键创建初始管理员
   * POST /admin/admin-user/add-default
   */
  addDefaultAdmin() {
    return adminHttp.post<httpNs.Response<any>>("/admin/admin-user/add-default", {});
  },

  /**
   * 启用/禁用管理员
   * POST /admin/admin-user/change-status
   */
  changeAdminStatus(params: { id: string; status: number; banReason?: string }) {
    return adminHttp.post<httpNs.Response<any>>("/admin/admin-user/change-status", params);
  },

  /**
   * 小程序用户分页搜索列表
   * POST /admin/client-user/list
   */
  getClientUserList(params: any) {
    return adminHttp.post<httpNs.Response<any>>("/admin/client-user/list", params);
  },

  /**
   * 更改用户信息
   * POST /admin/client-user/update
   */
  updateClientUser(params: any) {
    return adminHttp.post<httpNs.Response<any>>("/admin/client-user/update", params);
  },

  /**
   * 启用/禁用用户
   * POST /admin/client-user/change-status
   */
  changeClientUserStatus(params: { id: number; status: number; banReason?: string }) {
    return adminHttp.post<httpNs.Response<any>>("/admin/client-user/change-status", params);
  },

  /**
   * 删除/恢复用户
   * POST /admin/client-user/change-deleted
   */
  changeClientUserDeleted(params: { id: number; isDeleted: number }) {
    return adminHttp.post<httpNs.Response<any>>("/admin/client-user/change-deleted", params);
  },

  /**
   * 查看用户详细信息（后台接口）
   * GET /admin/client-user/detail/{id}
   */
  getClientUserDetail(id: number) {
    return adminHttp.get<httpNs.Response<any>>(`/admin/client-user/detail/${id}`);
  },
};




