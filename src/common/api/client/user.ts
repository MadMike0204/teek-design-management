import { clientHttp } from "@/common/http/instance/client-request";

/**
 * 小程序用户相关API
 */
export const ClientUserService = {
  /**
   * 根据openid获取用户信息
   * GET /client/user/{openid}
   */
  getUserByOpenid(openid: string) {
    return clientHttp.get<httpNs.Response<any>>(`/client/user/${openid}`);
  },

  /**
   * 微信小程序登录
   * POST /client/user/login
   */
  login(params: { code: string; avatar: string; name: string }) {
    return clientHttp.post<httpNs.Response<any>>("/client/user/login", params);
  },

  /**
   * 更新短时令牌
   * GET /client/user/token
   */
  refreshToken(openid?: string) {
    return clientHttp.get<httpNs.Response<any>>("/client/user/token", {
      params: openid ? { openid } : undefined,
    });
  },

  /**
   * 更新用户信息
   * PUT /client/user
   */
  updateUser(params: {
    openid: string;
    name?: string;
    avatar?: string;
    sex?: string;
    area?: string;
    signature?: string;
  }) {
    return clientHttp.put<httpNs.Response<any>>("/client/user", params);
  },
};




