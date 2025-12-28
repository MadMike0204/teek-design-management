import { clientHttp } from "@/common/http/instance/client-request";

/**
 * 小程序用户相关API
 */
export const ClientUserService = {
    /**
     * 根据openid获取用户信息
     * GET /client/user/{openid}
     */
    getUserByOpenid(openid) {
        return clientHttp.get(`/client/user/${openid}`);
    },
    /**
     * 微信小程序登录
     * POST /client/user/login
     */
    login(params) {
        return clientHttp.post("/client/user/login", params);
    },
    /**
     * 更新短时令牌
     * GET /client/user/token
     */
    refreshToken(openid) {
        return clientHttp.get("/client/user/token", {
            params: openid ? { openid } : undefined,
        });
    },
    /**
     * 更新用户信息
     * PUT /client/user
     */
    updateUser(params) {
        return clientHttp.put("/client/user", params);
    },
};




