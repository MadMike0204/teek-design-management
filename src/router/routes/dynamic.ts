/**
 * 动态路由参数配置简介 📚
 *
 * @param path ==> 路由的地址，这是必须设置的，如果是个有效的 http 或者 https 链接，则点击该菜单跳转到新窗口
 * @param name ==> 路由的名字，这是必须设置的，如果开启了 I18n，某些路由又不想使用 I18n，则 name 以 _noUseI18n- 开头
 * @param redirect ==> 重定向到某个路由下，可选，function 使用方式请看官网：https://router.vuejs.org/zh/api/index.html#redirect
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.roles ==> 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 * @param meta.auths ==> 路由内的按钮权限
 * @param meta.title ==> 显示在侧边栏、面包屑和标签栏的文字，使用 '{{ 多语言字段 }}' 形式结合「多语言」使用，可以传入一个回调函数，参数是当前路由对象 to
 * @param meta.icon ==> 菜单图标，该页面在左侧菜单、面包屑显示的图标，无默认值
 * @param meta.notClickBread ==> 是否允许点击面包屑，如果为 true，则该路由无法在面包屑中被点击，默认为 false
 * @param meta.hideInBread ==> 是否不添加到面包屑，如果为 true，则该路由将不会出现在面包屑中，默认为 false
 * @param meta.hideInMenu ==> 是否不添加到菜单，如果为 true，则该路由不会显示在左侧菜单，默认为 false
 * @param meta.alwaysShowRoot ==> 是否总是渲染为菜单，如果为 false 且某一级路由下只有一个二级路由，则左侧菜单直接显示该二级路由，如果为 true，则总会让一级菜单作为下拉菜单，默认为 false，仅限父级路由使用
 * @param meta.isKeepAlive ==> 是否缓存，如果为 true，该路由在切换标签后不会缓存，如果需要缓存，则「必须」设置页面组件 name 属性（class 名）和路由配置的 name 一致，默认为 false
 * @param meta.isAffix ==> 是否固定在 tabs nav，如果为 true，则该路由按照路由表顺序依次标签固定在标签栏，默认为 false
 * @param meta.isFull ==> 是否全屏，不渲染 Layout 布局，只渲染当前路由组件
 * @param meta.activeMenu ==> Restful 路由搭配使用，当前路由为详情页时，需要高亮的菜单
 * @param meta.beforeCloseName ==> 关闭路由前的回调，如果设置该字段，则在关闭当前 tab 页时会去 @/router/before-close.js 里寻找该字段名「对应」的方法，作为关闭前的钩子函数，无默认值
 * @param meta.rank ==> 路由在左侧菜单的排序，rank 值越高越靠后，当 rank 不存在时，根据顺序自动创建，首页路由永远在第一位，当 rank 存在时，可以插入指定的菜单位置，默认不存在
 * @param meta.iframeSrc ==> IFrame 链接，填写后该路由将打开 IFrame 指定的链接
 * @param meta.iframeLoading ==> IFrame 页是否开启首次加载动画（默认 true）
 * @param meta.iframeKeepAlive ==> IFrame 页是否开启缓（默认 false）
 * @param meta.iframeOpen ==> IFrame 页是否开新标签页打开，true 以新标签页打开，false 不打开（默认 false）
 * @param meta.transitionProps ==> 页面加载动画，即 Transition 组件的 Props（有两种形式，一种直接采用 vue 内置的 transitions 动画，另一种是使用 animate.css 写进、离场动画）
 * @param meta.hideInTab ==> 是否不添加到标签栏，默认 false
 * @param meta.dynamicLevel ==> 动态路由可打开的最大数量，默认为空
 * @param meta.useI18n ==>  是否开启 i18n。默认读取全局的 routeUseI18n（src/config/base-config.ts）
 * @param meta.useTooltip ==> 菜单的文字超出后，是否使用 el-toolTip 提示，仅针二级路由及以上生效。默认读取全局的 routeUseTooltip（src/config/base-config.ts）
 * @param meta.render ==> 自定义 Render 菜单元素（TSX 语法）
 * @param meta.tagText ==> 菜单标签，使用 ElTag 组件
 * @param meta.tagProps ==> 菜单标签的属性，即 ElTag 组件的 props
 * @param meta.pointTag ==> 是否显示点标记
 * @param meta.pointTagProps ==> 点标记的属性，即 PointTag 组件的 props
 * @param meta.menuVisibleWithForbidden ==> 菜单可以看到，但是访问会被重定向到 403
 * @param meta.query ==> 查询参数，Teek 不做任何处理，自行取出处理
 */

import { Compass } from "@element-plus/icons-vue";
import { HOME_URL, HOME_NAME } from "@/common/config";

/**
 * 扫描路由文件，获取默认暴露得路由信息
 */
// export const loadRoutes = (routeModules: Record<string, any>) => {
//   const mergedRoutes: RouterConfigRaw[] = [];

//   for (const routeModule of Object.values(routeModules)) {
//     const moduleRoutes = routeModule?.default ?? [];
//     mergedRoutes.push(...moduleRoutes);
//   }

//   return mergedRoutes;
// };

/**
 * 扫描 dynamic 目录下得路由文件
 */
// const dynamicRouteFiles = import.meta.glob("./dynamic/**/*.ts", {
//   eager: true,
// });
// // 获取动态路由
// export const dynamicRoutes = [...loadRoutes(dynamicRouteFiles)];

export const dynamicRoutes: RouterConfigRaw[] = [
  {
    path: HOME_URL,
    name: HOME_NAME,
    component: "/workbenches/index",
    meta: {
      title: "工作台",
      icon: Compass,
      isAffix: true,
      tagText: "Welcome",
      tagProps: { type: "success" },
    },
  },
  {
    path: "/test",
    name: "Test",
    component: "/test/index",
    meta: {
      title: "Test页面",
      icon: "CoffeeCup",
      isKeepAlive: true,
    },
  },
];
