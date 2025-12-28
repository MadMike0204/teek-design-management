import { http } from "@/common/http";

/**
 * 通用用户服务（使用默认http实例）
 * 用于系统内部认证等通用接口
 */
export const UserService = {
    // 登录
    login(params) {
        return http.post("/auth/login", params);
    },
    // 获取用户信息
    getUserInfo() {
        return http.get("/auth/getUserInfo");
    },
};

// 导出后台API服务
export { AdminUserService } from "./admin/user";

// 导出小程序API服务
export { ClientUserService } from "./client/user";
