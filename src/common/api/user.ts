import type { UserInfo } from "@/pinia";
import { http } from "@/common/http";

export interface LoginParams {
  username: string;
  password: string;
  verifyCode?: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export const UserService = {
  // 登录
  login(params: LoginParams) {
    return http.post<httpNs.Response<Token>>("/auth/login", params);
  },

  // 管理员登录
  loginAdmin(params: LoginParams) {
    return http.post<httpNs.Response<string>>("http://117.72.201.153:1202/admin/admin-user/login-admin", params, {
      baseURL: "",
    });
  },

  // 获取用户信息
  getUserInfo() {
    return http.get<httpNs.Response<UserInfo>>("/auth/getUserInfo");
  },

  // 获取用户列表
  getUserList(params: any) {
    return http.get<httpNs.Response<any>>("http://117.72.201.153:1202/admin/admin-user/list", {
      params,
      baseURL: "",
    });
  },

  // 更新用户信息
  updateUser(params: any) {
    return http.put<httpNs.Response<any>>(
      `http://117.72.201.153:1202/admin/admin-user/update/${params.userId}`,
      params,
      {
        baseURL: "",
      }
    );
  },

  // 删除用户
  deleteUser(userId: string) {
    return http.delete<httpNs.Response<any>>(`http://117.72.201.153:1202/admin/admin-user/delete/${userId}`, {
      baseURL: "",
    });
  },

  // 获取管理员列表
  getAdminList(params: any) {
    return http.post<httpNs.Response<any>>("http://117.72.201.153:1202/admin/admin-user/list", params, {
      baseURL: "",
    });
  },

  // 更新管理员信息
  updateAdmin(params: any) {
    return http.post<httpNs.Response<any>>("http://117.72.201.153:1202/admin/admin-user/update", params, {
      baseURL: "",
    });
  },

  // 删除管理员
  deleteAdmin(id: string) {
    return http.delete<httpNs.Response<any>>(`http://117.72.201.153:1202/admin/admin-user/delete/${id}`, {
      baseURL: "",
    });
  },

  // 查看管理员详细信息
  getAdminDetail(id: number) {
    return http.get<httpNs.Response<any>>(`http://117.72.201.153:1202/admin/admin-user/detail/${id}`, {
      baseURL: "",
    });
  },

  // 一键创建初始管理员
  addDefaultAdmin() {
    return http.post<httpNs.Response<any>>(
      "http://117.72.201.153:1202/admin/admin-user/add-default",
      {},
      {
        baseURL: "",
      }
    );
  },

  // 更新管理员状态
  updateAdminStatus(id: string, status: string) {
    return http.put<httpNs.Response<any>>(
      `http://117.72.201.153:1202/admin/admin-user/update-status/${id}`,
      { status },
      {
        baseURL: "",
      }
    );
  },

  // 启用/禁用管理员
  changeAdminStatus(params: any) {
    return http.post<httpNs.Response<any>>("http://117.72.201.153:1202/admin/admin-user/change-status", params, {
      baseURL: "",
    });
  },

  // 小程序用户分页搜索列表
  getClientUserList(params: any) {
    return http.post<httpNs.Response<any>>("http://117.72.201.153:1202/admin/client-user/list", params, {
      baseURL: "",
    });
  },

  // 更改用户信息
  updateClientUser(params: any) {
    return http.post<httpNs.Response<any>>("http://117.72.201.153:1202/admin/client-user/update", params, {
      baseURL: "",
    });
  },

  // 启用/禁用用户
  changeClientUserStatus(params: any) {
    return http.post<httpNs.Response<any>>("http://117.72.201.153:1202/admin/client-user/change-status", params, {
      baseURL: "",
    });
  },

  // 删除/恢复用户
  changeClientUserDeleted(params: any) {
    return http.post<httpNs.Response<any>>("http://117.72.201.153:1202/admin/client-user/change-deleted", params, {
      baseURL: "",
    });
  },

  // 查看用户详细信息
  getClientUserDetail(id: number) {
    return http.get<httpNs.Response<any>>(`http://117.72.201.153:1202/admin/client-user/detail/${id}`, {
      baseURL: "",
    });
  },
};
