import { clientHttp } from "@/common/http/instance/client-request";

/**
 * 小程序通用API
 */
export const ClientCommonService = {
  /**
   * 上传文件
   * POST /client/common/upload
   */
  uploadFile(file: File | Blob) {
    const formData = new FormData();
    formData.append("file", file);
    return clientHttp.post<httpNs.Response<string>>("/client/common/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};




