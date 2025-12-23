// 请求枚举配置
/**
 * 请求结果枚举
 */
export var ResultEnum;
(function (ResultEnum) {
    ResultEnum[ResultEnum["SUCCESS"] = 200] = "SUCCESS";
    ResultEnum[ResultEnum["LOGIN"] = 401] = "LOGIN";
    ResultEnum[ResultEnum["TIMEOUT"] = 10000] = "TIMEOUT";
    ResultEnum["TYPE"] = "success";
})(ResultEnum || (ResultEnum = {}));
/**
 * 请求方法枚举
 */
export var RequestMethodEnum;
(function (RequestMethodEnum) {
    RequestMethodEnum["GET"] = "GET";
    RequestMethodEnum["POST"] = "POST";
    RequestMethodEnum["PATCH"] = "PATCH";
    RequestMethodEnum["PUT"] = "PUT";
    RequestMethodEnum["DELETE"] = "DELETE";
})(RequestMethodEnum || (RequestMethodEnum = {}));
/**
 * 常用的 contentTyp 类型
 */
export var ContentTypeEnum;
(function (ContentTypeEnum) {
    // json
    ContentTypeEnum["JSON"] = "application/json;charset=UTF-8";
    // text
    ContentTypeEnum["TEXT"] = "text/plain;charset=UTF-8";
    // form-data 一般配合qs
    ContentTypeEnum["FORM_URLENCODED"] = "application/x-www-form-urlencoded;charset=UTF-8";
    // 单文件 form-data 上传
    ContentTypeEnum["FILE_FORM_DATA"] = "application/form-data;charset=UTF-8";
    // 多文件 form-data 上传
    ContentTypeEnum["Multi_FILE_FORM_DATA"] = "multipart/form-data;charset=UTF-8";
    // xml
    ContentTypeEnum["XML"] = "application/xml;charset=UTF-8";
    // octet-stream 二进制流数据
    ContentTypeEnum["OCTET_STREAM"] = "application/octet-stream";
})(ContentTypeEnum || (ContentTypeEnum = {}));
