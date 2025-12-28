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

/**
 * 通用用户服务（使用默认http实例）
 * 用于系统内部认证等通用接口
 */
export const UserService = {
  // 登录
  login(params: LoginParams) {
    return http.post<httpNs.Response<Token>>("/auth/login", params);
  },

  // 获取用户信息
  getUserInfo() {
    return http.get<httpNs.Response<UserInfo>>("/auth/getUserInfo");
  },
};

// 导出后台API服务
export { AdminUserService } from "./admin/user";

// 导出小程序API服务
export { ClientUserService } from "./client/user";
