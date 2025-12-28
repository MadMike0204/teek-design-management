import { clientHttp } from "@/common/http/instance/client-request";

/**
 * 小程序内容相关API
 */
export const ClientContentService = {
  /**
   * 根据id查询文章
   * GET /client/content/{id}
   */
  getContentById(id: number) {
    return clientHttp.get<httpNs.Response<any>>(`/client/content/${id}`);
  },

  /**
   * 分页条件查询文章列表
   * POST /client/content/page
   */
  listContents(params: {
    page?: number;
    pageSize?: number;
    sortBy?: number;
    sortOrder?: number;
    tagIds?: number[];
  }) {
    return clientHttp.post<httpNs.Response<any>>("/client/content/page", params);
  },

  /**
   * 用户评分文章
   * PUT /client/content/rating
   */
  ratingContent(params: { userId: number; contentId: number; rating: number }) {
    return clientHttp.put<httpNs.Response<any>>("/client/content/rating", params);
  },

  /**
   * 点赞接口
   * GET /client/content/like/{contentId}
   */
  likeContent(contentId: number) {
    return clientHttp.get<httpNs.Response<any>>(`/client/content/like/${contentId}`);
  },

  /**
   * 新增文章
   * POST /client/content/add
   */
  addContent(params: {
    title: string;
    contentBody: string;
    coverImage?: string;
    images?: string[];
    tags?: string[];
  }) {
    return clientHttp.post<httpNs.Response<any>>("/client/content/add", params);
  },
};




