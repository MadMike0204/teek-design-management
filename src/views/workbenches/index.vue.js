/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, onMounted } from "vue";
import { User, DocumentAdd, UserFilled } from "@element-plus/icons-vue";
import { http } from "@/common/http/instance/default-request";
// 统计数据
const statistics = ref([
    { title: "用户总量", value: 0, icon: User },
    { title: "内容发布数", value: 0, icon: DocumentAdd },
    { title: "今日新增用户", value: 0, icon: User },
    { title: "今日新增内容", value: 0, icon: DocumentAdd },
]);
// 加载状态
const loading = ref(true);
// 获取仪表盘数据
const fetchDashboardData = async () => {
    try {
        loading.value = true;
        const res = await http.get("http://117.72.201.153:1202/admin/dashboard/summary");
        // 更新统计数据
        statistics.value = [
            { title: "用户总量", value: res.data.totalUsers, icon: User },
            { title: "内容发布数", value: res.data.totalContents, icon: DocumentAdd },
            { title: "今日新增用户", value: res.data.todayUsers, icon: User },
            { title: "今日新增内容", value: res.data.todayContents, icon: DocumentAdd },
        ];
    }
    catch (error) {
        console.error("获取仪表盘数据失败:", error);
    }
    finally {
        loading.value = false;
    }
};
// 组件挂载时获取数据
onMounted(() => {
    fetchDashboardData();
});
// 最近新增用户
const recentUsers = ref([
    { avatar: "", nickname: "软脚虾", gender: "男", region: "北京", registerTime: "2025.12.16 17:23" },
    { avatar: "", nickname: "超级无敌暴烈", gender: "女", region: "深圳", registerTime: "2025.12.16 13:12" },
    { avatar: "", nickname: "无敌石头大王", gender: "女", region: "上海", registerTime: "2025.12.15 11:00" },
    { avatar: "", nickname: "可以和密码", gender: "男", region: "长沙", registerTime: "2025.12.14 9:23" },
    { avatar: "", nickname: "Uzi", gender: "女", region: "浙江", registerTime: "2025.12.13 9:23" },
]);
// 最近新增内容
const recentContent = ref([
    { title: "在大型赛事中如何硬起来", creator: "软脚虾", publishTime: "2025.12.17 17:23" },
    { title: "红温了", creator: "超级无敌暴烈", publishTime: "2025.12.17 13:12" },
    { title: "基于全球赛事伟大战略开发的...", creator: "无敌石头大王", publishTime: "2025.12.16 11:00" },
    { title: "遥遥领先", creator: "可以和密码", publishTime: "2025.12.16 9:23" },
    { title: "你好", creator: "Uzi", publishTime: "2025.12.15 9:23" },
]);
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "dashboard-container" },
});
/** @type {__VLS_StyleScopedClasses['dashboard-container']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elRow | typeof ___VLS_components.ElRow} */
elRow;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    gutter: (20),
}));
const __VLS_2 = __VLS_1({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.statistics))) {
    let __VLS_6;
    /** @ts-ignore @type {typeof ___VLS_components.elCol | typeof ___VLS_components.ElCol} */
    elCol;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        span: (6),
        key: (index),
    }));
    const __VLS_8 = __VLS_7({
        span: (6),
        key: (index),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const { default: __VLS_11 } = __VLS_9.slots;
    let __VLS_12;
    /** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
    elCard;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        shadow: "hover",
        ...{ class: "stat-card" },
    }));
    const __VLS_14 = __VLS_13({
        shadow: "hover",
        ...{ class: "stat-card" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    /** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
    const { default: __VLS_17 } = __VLS_15.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-item" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-item']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-value" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
    (item.value);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-title" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-title']} */ ;
    (item.title);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
    let __VLS_18;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
        size: (32),
    }));
    const __VLS_20 = __VLS_19({
        size: (32),
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const { default: __VLS_23 } = __VLS_21.slots;
    const __VLS_24 = (item.icon);
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
    const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
    // @ts-ignore
    [statistics,];
    var __VLS_21;
    // @ts-ignore
    [];
    var __VLS_15;
    // @ts-ignore
    [];
    var __VLS_9;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
let __VLS_29;
/** @ts-ignore @type {typeof ___VLS_components.elRow | typeof ___VLS_components.ElRow} */
elRow;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    gutter: (20),
    ...{ style: {} },
}));
const __VLS_31 = __VLS_30({
    gutter: (20),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const { default: __VLS_34 } = __VLS_32.slots;
let __VLS_35;
/** @ts-ignore @type {typeof ___VLS_components.elCol | typeof ___VLS_components.ElCol} */
elCol;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    span: (12),
}));
const __VLS_37 = __VLS_36({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_40 } = __VLS_38.slots;
let __VLS_41;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    shadow: "hover",
    ...{ class: "table-card" },
}));
const __VLS_43 = __VLS_42({
    shadow: "hover",
    ...{ class: "table-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
const { default: __VLS_46 } = __VLS_44.slots;
{
    const { header: __VLS_47 } = __VLS_44.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-header" },
    });
    /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    // @ts-ignore
    [];
}
let __VLS_48;
/** @ts-ignore @type {typeof ___VLS_components.elTable | typeof ___VLS_components.ElTable} */
elTable;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    data: (__VLS_ctx.recentUsers),
    stripe: true,
    border: true,
    ...{ style: {} },
}));
const __VLS_50 = __VLS_49({
    data: (__VLS_ctx.recentUsers),
    stripe: true,
    border: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
const { default: __VLS_53 } = __VLS_51.slots;
let __VLS_54;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    prop: "avatar",
    label: "头像",
    width: "80",
}));
const __VLS_56 = __VLS_55({
    prop: "avatar",
    label: "头像",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
const { default: __VLS_59 } = __VLS_57.slots;
{
    const { default: __VLS_60 } = __VLS_57.slots;
    let __VLS_61;
    /** @ts-ignore @type {typeof ___VLS_components.elAvatar | typeof ___VLS_components.ElAvatar} */
    elAvatar;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
        size: (36),
    }));
    const __VLS_63 = __VLS_62({
        size: (36),
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    const { default: __VLS_66 } = __VLS_64.slots;
    let __VLS_67;
    /** @ts-ignore @type {typeof ___VLS_components.UserFilled} */
    UserFilled;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({}));
    const __VLS_69 = __VLS_68({}, ...__VLS_functionalComponentArgsRest(__VLS_68));
    // @ts-ignore
    [recentUsers,];
    var __VLS_64;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_57;
let __VLS_72;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    prop: "nickname",
    label: "昵称",
}));
const __VLS_74 = __VLS_73({
    prop: "nickname",
    label: "昵称",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_77;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
    prop: "gender",
    label: "性别",
    width: "80",
}));
const __VLS_79 = __VLS_78({
    prop: "gender",
    label: "性别",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
let __VLS_82;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
    prop: "region",
    label: "地区",
}));
const __VLS_84 = __VLS_83({
    prop: "region",
    label: "地区",
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
let __VLS_87;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
    prop: "registerTime",
    label: "注册时间",
}));
const __VLS_89 = __VLS_88({
    prop: "registerTime",
    label: "注册时间",
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
// @ts-ignore
[];
var __VLS_51;
// @ts-ignore
[];
var __VLS_44;
// @ts-ignore
[];
var __VLS_38;
let __VLS_92;
/** @ts-ignore @type {typeof ___VLS_components.elCol | typeof ___VLS_components.ElCol} */
elCol;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    span: (12),
}));
const __VLS_94 = __VLS_93({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
const { default: __VLS_97 } = __VLS_95.slots;
let __VLS_98;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
    shadow: "hover",
    ...{ class: "table-card" },
}));
const __VLS_100 = __VLS_99({
    shadow: "hover",
    ...{ class: "table-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
const { default: __VLS_103 } = __VLS_101.slots;
{
    const { header: __VLS_104 } = __VLS_101.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-header" },
    });
    /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    // @ts-ignore
    [];
}
let __VLS_105;
/** @ts-ignore @type {typeof ___VLS_components.elTable | typeof ___VLS_components.ElTable} */
elTable;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
    data: (__VLS_ctx.recentContent),
    stripe: true,
    border: true,
    ...{ style: {} },
}));
const __VLS_107 = __VLS_106({
    data: (__VLS_ctx.recentContent),
    stripe: true,
    border: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
const { default: __VLS_110 } = __VLS_108.slots;
let __VLS_111;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent(__VLS_111, new __VLS_111({
    prop: "title",
    label: "标题",
}));
const __VLS_113 = __VLS_112({
    prop: "title",
    label: "标题",
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
let __VLS_116;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
    prop: "creator",
    label: "创建者昵称",
}));
const __VLS_118 = __VLS_117({
    prop: "creator",
    label: "创建者昵称",
}, ...__VLS_functionalComponentArgsRest(__VLS_117));
let __VLS_121;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
    prop: "publishTime",
    label: "发布时间",
}));
const __VLS_123 = __VLS_122({
    prop: "publishTime",
    label: "发布时间",
}, ...__VLS_functionalComponentArgsRest(__VLS_122));
// @ts-ignore
[recentContent,];
var __VLS_108;
// @ts-ignore
[];
var __VLS_101;
// @ts-ignore
[];
var __VLS_95;
// @ts-ignore
[];
var __VLS_32;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
