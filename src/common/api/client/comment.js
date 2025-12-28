import { clientHttp } from "@/common/http/instance/client-request";

/**
 * 小程序评论相关API
 */
export const ClientCommentService = {
    /**
     * 根据id查询文章评论
     * GET /client/comment/{id}
     */
    getCommentById(id) {
        return clientHttp.get(`/client/comment/${id}`);
    },
    /**
     * 评论文章
     * POST /client/comment
     */
    addComment(params) {
        return clientHttp.post("/client/comment", params);
    },
};




