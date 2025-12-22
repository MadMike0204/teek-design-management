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
    return http.get<httpNs.Response<any>>("http://117.72.201.153:1202/admin/admin-user/list", {
      params,
      baseURL: "",
    });
  },

  // 更新管理员信息
  updateAdmin(params: any) {
    return http.put<httpNs.Response<any>>(`http://117.72.201.153:1202/admin/admin-user/update/${params.id}`, params, {
      baseURL: "",
    });
  },

  // 删除管理员
  deleteAdmin(id: string) {
    return http.delete<httpNs.Response<any>>(`http://117.72.201.153:1202/admin/admin-user/delete/${id}`, {
      baseURL: "",
    });
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
};
