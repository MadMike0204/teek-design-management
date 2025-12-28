import { clientHttp } from "@/common/http/instance/client-request";

/**
 * 小程序评论相关API
 */
export const ClientCommentService = {
  /**
   * 根据id查询文章评论
   * GET /client/comment/{id}
   */
  getCommentById(id: string) {
    return clientHttp.get<httpNs.Response<string>>(`/client/comment/${id}`);
  },

  /**
   * 评论文章
   * POST /client/comment
   */
  addComment(params: { commentId?: string | null; content: string }) {
    return clientHttp.post<httpNs.Response<any>>("/client/comment", params);
  },
};




