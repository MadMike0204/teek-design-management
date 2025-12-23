import { ref } from "vue";
import { defineStore } from "pinia";
export const useRouteStore = defineStore("routeStore", () => {
    const loadedRouteList = ref([]);
    const flatRouteList = ref([]);
    // 路由里首页的 name 值，必须填且正确，默认为 Home
    const homeRoute = ref(null);
    const setRoutes = (routers) => {
        loadedRouteList.value = routers;
    };
    const setFlatRoutes = (routers) => {
        flatRouteList.value = routers;
    };
    const setHomeRoute = (route) => {
        homeRoute.value = route;
    };
    return {
        loadedRouteList,
        homeRoute,
        flatRouteList,
        setRoutes,
        setFlatRoutes,
        setHomeRoute,
    };
});
