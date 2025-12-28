import { clientHttp } from "@/common/http/instance/client-request";

/**
 * 小程序内容相关API
 */
export const ClientContentService = {
    /**
     * 根据id查询文章
     * GET /client/content/{id}
     */
    getContentById(id) {
        return clientHttp.get(`/client/content/${id}`);
    },
    /**
     * 分页条件查询文章列表
     * POST /client/content/page
     */
    listContents(params) {
        return clientHttp.post("/client/content/page", params);
    },
    /**
     * 用户评分文章
     * PUT /client/content/rating
     */
    ratingContent(params) {
        return clientHttp.put("/client/content/rating", params);
    },
    /**
     * 点赞接口
     * GET /client/content/like/{contentId}
     */
    likeContent(contentId) {
        return clientHttp.get(`/client/content/like/${contentId}`);
    },
    /**
     * 新增文章
     * POST /client/content/add
     */
    addContent(params) {
        return clientHttp.post("/client/content/add", params);
    },
};




