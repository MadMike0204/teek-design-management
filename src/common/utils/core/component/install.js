/**
 * 安装组件，通过 app.use 安装
 *
 * @param main 主组件
 * @param extra 额外组件
 */
export const useInstall = (main, extra) => {
    main.install = (app) => {
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            app.component(comp.name, comp);
        }
    };
    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            main[key] = comp;
        }
    }
    return main;
};
/**
 * 安装函数
 *
 * @param fn 函数
 * @param name 名称
 */
export const useInstallFunction = (fn, name) => {
    fn.install = (app) => {
        fn._context = app._context;
        app.config.globalProperties[name] = fn;
    };
    return fn;
};
/**
 * 安装指令
 *
 * @param directive 指令
 * @param name 名称
 */
export const useInstallDirective = (directive, name) => {
    directive.install = (app) => {
        app.directive(name, directive);
    };
    return directive;
};
