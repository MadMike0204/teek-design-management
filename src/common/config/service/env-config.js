/**
 * 根据环境变量创建配置
 */
export const defineEnvServiceConfig = () => {
    const isDev = import.meta.env.MODE === "development";
    const isTest = import.meta.env.MODE === "test";
    const isProd = import.meta.env.MODE === "production";
    // 本地环境
    if (isDev) {
        return {};
    }
    // 测试环境
    if (isTest) {
        return {};
    }
    // 生产环境
    if (isProd) {
        return {};
    }
    return {};
};
