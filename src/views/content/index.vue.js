/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, reactive, onMounted } from "vue";
import { http } from "@/common/http/instance/default-request";
import { ElMessage } from "element-plus";
// 筛选条件
const filterForm = ref({
    isDeleted: "未删除",
    status: "未确定",
    tag: "请选择标签",
    keyword: "",
});
// 加载状态
const loading = ref(false);
// 内容列表数据
const contentList = ref([]);
// 分页数据
const pagination = ref({
    currentPage: 1,
    pageSize: 10,
    total: 0,
});
// 获取内容列表
const fetchContentList = async () => {
    try {
        loading.value = true;
        // 构建请求参数
        const params = {
            page: pagination.value.currentPage,
            size: pagination.value.pageSize,
            isDeleted: filterForm.value.isDeleted === "已删除" ? 1 : 0,
            status: filterForm.value.status === "正常" ? 1 : filterForm.value.status === "已下架" ? 0 : 1, // "未确定"时默认1=启用
            tagIds: [], // 无标签传空数组
            keyword: filterForm.value.keyword || "",
            sortBy: "created_at",
            sortOrder: "desc",
        };
        // 调用API
        const res = await http.post("http://117.72.201.153:1202/admin/contents/list", params);
        // 更新数据
        contentList.value = res.data.list;
        pagination.value.total = res.data.total;
    }
    catch (error) {
        console.error("获取内容列表失败:", error);
    }
    finally {
        loading.value = false;
    }
};
// 删除/恢复内容
const changeDeleteStatus = async (id, value) => {
    try {
        loading.value = true;
        // 构建请求参数
        const params = {
            id,
            value,
        };
        // 调用删除/恢复接口
        const res = await http.post("http://117.72.201.153:1202/admin/contents/change-deleted", params);
        // 处理响应
        if (res.code === 0) {
            // 成功提示
            ElMessage.success("操作成功");
            // 刷新内容列表
            fetchContentList();
        }
        else {
            // 失败提示
            ElMessage.error(res.msg || "操作失败");
        }
    }
    catch (error) {
        console.error("删除/恢复内容失败:", error);
        ElMessage.error("操作失败，请稍后重试");
    }
    finally {
        loading.value = false;
    }
};
// 启用/禁用内容
const changeContentStatus = async (id, value) => {
    try {
        loading.value = true;
        // 构建请求参数
        const params = {
            id,
            value,
        };
        // 如果是禁用操作，需要获取banReason
        if (value === 0) {
            const banReason = prompt("请输入禁用原因：");
            if (!banReason) {
                ElMessage.warning("禁用原因不能为空");
                loading.value = false;
                return;
            }
            params.banReason = banReason;
        }
        // 调用启用/禁用接口
        const res = await http.post("http://117.72.201.153:1202/admin/contents/change-status", params);
        // 处理响应
        if (res.code === 0) {
            // 成功提示
            ElMessage.success("操作成功");
            // 刷新内容列表
            fetchContentList();
        }
        else {
            // 失败提示
            ElMessage.error(res.msg || "操作失败");
        }
    }
    catch (error) {
        console.error("启用/禁用内容失败:", error);
        ElMessage.error("操作失败，请稍后重试");
    }
    finally {
        loading.value = false;
    }
};
// 查看内容详情
const handleViewDetail = async (id) => {
    try {
        loading.value = true;
        // 调用详情接口
        const res = await http.get(`http://117.72.201.153:1202/admin/contents/detail/${id}`);
        // 处理响应
        if (res.code === 0) {
            // 复制数据到详情对象
            Object.assign(contentDetail, res.data);
            // 打开详情弹窗
            detailDialogVisible.value = true;
        }
        else {
            // 失败提示
            ElMessage.error(res.msg || "获取详情失败");
        }
    }
    catch (error) {
        console.error("获取内容详情失败:", error);
        ElMessage.error("获取详情失败，请稍后重试");
    }
    finally {
        loading.value = false;
    }
};
// 组件挂载时获取数据
onMounted(() => {
    fetchContentList();
});
// 编辑弹窗相关
const dialogVisible = ref(false);
const currentContent = reactive({
    id: 0,
    title: "",
    coverImage: "",
    contentBody: "",
    authorId: 0,
    viewCount: 0,
    commentCount: 0,
    avgRating: null,
    ratingCount: 0,
    status: 1,
    isDeleted: 0,
    createdAt: "",
    image: "https://via.placeholder.com/400x200",
});
// 详情弹窗相关
const detailDialogVisible = ref(false);
const contentDetail = reactive({
    id: 0,
    title: "",
    coverImage: "",
    contentBody: "",
    authorId: 0,
    viewCount: 0,
    commentCount: 0,
    avgRating: null,
    ratingCount: 0,
    status: 1,
    isDeleted: 0,
    createdAt: "",
});
// 处理编辑
const handleEdit = (row) => {
    // 复制数据到当前编辑的内容
    Object.assign(currentContent, row);
    // 设置封面图
    currentContent.image = row.coverImage || "https://via.placeholder.com/400x200";
    // 打开弹窗
    dialogVisible.value = true;
};
// 重置筛选条件
const resetFilter = () => {
    filterForm.value = {
        isDeleted: "未删除",
        status: "未确定",
        tag: "请选择标签",
        keyword: "",
    };
    fetchContentList();
};
// 分页变更
const handleCurrentChange = (val) => {
    pagination.value.currentPage = val;
    fetchContentList();
};
// 分页大小变更
const handleSizeChange = (val) => {
    pagination.value.pageSize = val;
    pagination.value.currentPage = 1;
    fetchContentList();
};
// 执行搜索
const handleSearch = () => {
    pagination.value.currentPage = 1;
    fetchContentList();
};
// 更新内容
const updateContent = async () => {
    try {
        loading.value = true;
        // 构建更新参数，只包含需要更新的字段
        const updateParams = {
            id: currentContent.id,
        };
        // 只添加非空字段
        if (currentContent.title)
            updateParams.title = currentContent.title;
        if (currentContent.coverImage)
            updateParams.coverImage = currentContent.coverImage;
        if (currentContent.contentBody)
            updateParams.contentBody = currentContent.contentBody;
        updateParams.status = currentContent.status;
        updateParams.isDeleted = currentContent.isDeleted;
        // 调用更新接口
        const res = await http.post("http://117.72.201.153:1202/admin/contents/update", updateParams);
        // 处理响应
        if (res.code === 0) {
            // 成功提示
            ElMessage.success("内容修改成功");
            // 关闭弹窗
            dialogVisible.value = false;
            // 刷新内容列表
            fetchContentList();
        }
        else {
            // 失败提示
            ElMessage.error(res.msg || "内容修改失败");
        }
    }
    catch (error) {
        console.error("更新内容失败:", error);
        ElMessage.error("内容修改失败，请稍后重试");
    }
    finally {
        loading.value = false;
    }
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
/** @type {__VLS_StyleScopedClasses['content-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-image']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "content-management-container" },
});
/** @type {__VLS_StyleScopedClasses['content-management-container']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    shadow: "hover",
    ...{ class: "filter-card" },
}));
const __VLS_2 = __VLS_1({
    shadow: "hover",
    ...{ class: "filter-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['filter-card']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "filter-content" },
});
/** @type {__VLS_StyleScopedClasses['filter-content']} */ ;
let __VLS_6;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    modelValue: (__VLS_ctx.filterForm.isDeleted),
    placeholder: "文章是否删除",
    ...{ style: {} },
}));
const __VLS_8 = __VLS_7({
    modelValue: (__VLS_ctx.filterForm.isDeleted),
    placeholder: "文章是否删除",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
let __VLS_12;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    label: "未删除",
    value: "未删除",
}));
const __VLS_14 = __VLS_13({
    label: "未删除",
    value: "未删除",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_17;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    label: "已删除",
    value: "已删除",
}));
const __VLS_19 = __VLS_18({
    label: "已删除",
    value: "已删除",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
// @ts-ignore
[filterForm,];
var __VLS_9;
let __VLS_22;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    modelValue: (__VLS_ctx.filterForm.status),
    placeholder: "文章状态",
    ...{ style: {} },
}));
const __VLS_24 = __VLS_23({
    modelValue: (__VLS_ctx.filterForm.status),
    placeholder: "文章状态",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
const { default: __VLS_27 } = __VLS_25.slots;
let __VLS_28;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "未确定",
    value: "未确定",
}));
const __VLS_30 = __VLS_29({
    label: "未确定",
    value: "未确定",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_33;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    label: "正常",
    value: "正常",
}));
const __VLS_35 = __VLS_34({
    label: "正常",
    value: "正常",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
let __VLS_38;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    label: "已下架",
    value: "已下架",
}));
const __VLS_40 = __VLS_39({
    label: "已下架",
    value: "已下架",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
// @ts-ignore
[filterForm,];
var __VLS_25;
let __VLS_43;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    modelValue: (__VLS_ctx.filterForm.tag),
    placeholder: "文章Tag",
    ...{ style: {} },
}));
const __VLS_45 = __VLS_44({
    modelValue: (__VLS_ctx.filterForm.tag),
    placeholder: "文章Tag",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
const { default: __VLS_48 } = __VLS_46.slots;
let __VLS_49;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    label: "请选择标签",
    value: "请选择标签",
}));
const __VLS_51 = __VLS_50({
    label: "请选择标签",
    value: "请选择标签",
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
// @ts-ignore
[filterForm,];
var __VLS_46;
let __VLS_54;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.filterForm.keyword),
    placeholder: "请输入关键词",
    ...{ style: {} },
}));
const __VLS_56 = __VLS_55({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.filterForm.keyword),
    placeholder: "请输入关键词",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
let __VLS_59;
const __VLS_60 = ({ keyup: {} },
    { onKeyup: (__VLS_ctx.handleSearch) });
var __VLS_57;
var __VLS_58;
let __VLS_61;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}));
const __VLS_63 = __VLS_62({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
let __VLS_66;
const __VLS_67 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSearch) });
const { default: __VLS_68 } = __VLS_64.slots;
// @ts-ignore
[filterForm, handleSearch, handleSearch,];
var __VLS_64;
var __VLS_65;
let __VLS_69;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
    type: "primary",
    ...{ style: {} },
}));
const __VLS_71 = __VLS_70({
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
const { default: __VLS_74 } = __VLS_72.slots;
// @ts-ignore
[];
var __VLS_72;
let __VLS_75;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
    ...{ 'onClick': {} },
}));
const __VLS_77 = __VLS_76({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
let __VLS_80;
const __VLS_81 = ({ click: {} },
    { onClick: (__VLS_ctx.resetFilter) });
const { default: __VLS_82 } = __VLS_78.slots;
// @ts-ignore
[resetFilter,];
var __VLS_78;
var __VLS_79;
// @ts-ignore
[];
var __VLS_3;
let __VLS_83;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
    shadow: "hover",
    ...{ class: "table-card" },
    ...{ style: {} },
}));
const __VLS_85 = __VLS_84({
    shadow: "hover",
    ...{ class: "table-card" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
const { default: __VLS_88 } = __VLS_86.slots;
let __VLS_89;
/** @ts-ignore @type {typeof ___VLS_components.elTable | typeof ___VLS_components.ElTable} */
elTable;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
    data: (__VLS_ctx.contentList),
    stripe: true,
    border: true,
    ...{ style: {} },
}));
const __VLS_91 = __VLS_90({
    data: (__VLS_ctx.contentList),
    stripe: true,
    border: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
__VLS_asFunctionalDirective(___VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_94 } = __VLS_92.slots;
let __VLS_95;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({
    prop: "id",
    label: "ID",
    width: "80",
}));
const __VLS_97 = __VLS_96({
    prop: "id",
    label: "ID",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_96));
let __VLS_100;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
    prop: "title",
    label: "标题",
}));
const __VLS_102 = __VLS_101({
    prop: "title",
    label: "标题",
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
let __VLS_105;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
    prop: "authorId",
    label: "作者ID",
    width: "120",
}));
const __VLS_107 = __VLS_106({
    prop: "authorId",
    label: "作者ID",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
let __VLS_110;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
    prop: "viewCount",
    label: "浏览量",
    width: "100",
}));
const __VLS_112 = __VLS_111({
    prop: "viewCount",
    label: "浏览量",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
let __VLS_115;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({
    prop: "commentCount",
    label: "评论数",
    width: "100",
}));
const __VLS_117 = __VLS_116({
    prop: "commentCount",
    label: "评论数",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
let __VLS_120;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({
    prop: "createdAt",
    label: "创建时间",
    width: "180",
}));
const __VLS_122 = __VLS_121({
    prop: "createdAt",
    label: "创建时间",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_121));
let __VLS_125;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({
    prop: "status",
    label: "内容状态",
    width: "120",
}));
const __VLS_127 = __VLS_126({
    prop: "status",
    label: "内容状态",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_126));
const { default: __VLS_130 } = __VLS_128.slots;
{
    const { default: __VLS_131 } = __VLS_128.slots;
    const [scope] = __VLS_getSlotParameters(__VLS_131);
    let __VLS_132;
    /** @ts-ignore @type {typeof ___VLS_components.elTag | typeof ___VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({
        type: (scope.row.status === 1 ? 'success' : scope.row.status === 0 ? 'warning' : 'danger'),
        size: "small",
    }));
    const __VLS_134 = __VLS_133({
        type: (scope.row.status === 1 ? 'success' : scope.row.status === 0 ? 'warning' : 'danger'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_133));
    const { default: __VLS_137 } = __VLS_135.slots;
    (scope.row.status === 1 ? "正常" : "已下架");
    // @ts-ignore
    [contentList, vLoading, loading,];
    var __VLS_135;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_128;
let __VLS_138;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
    label: "操作",
    width: "200",
}));
const __VLS_140 = __VLS_139({
    label: "操作",
    width: "200",
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
const { default: __VLS_143 } = __VLS_141.slots;
{
    const { default: __VLS_144 } = __VLS_141.slots;
    const [scope] = __VLS_getSlotParameters(__VLS_144);
    let __VLS_145;
    /** @ts-ignore @type {typeof ___VLS_components.elLink | typeof ___VLS_components.ElLink} */
    elLink;
    // @ts-ignore
    const __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({
        ...{ 'onClick': {} },
        type: "info",
        ...{ style: {} },
    }));
    const __VLS_147 = __VLS_146({
        ...{ 'onClick': {} },
        type: "info",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_146));
    let __VLS_150;
    const __VLS_151 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleViewDetail(scope.row.id);
                // @ts-ignore
                [handleViewDetail,];
            } });
    const { default: __VLS_152 } = __VLS_148.slots;
    // @ts-ignore
    [];
    var __VLS_148;
    var __VLS_149;
    let __VLS_153;
    /** @ts-ignore @type {typeof ___VLS_components.elLink | typeof ___VLS_components.ElLink} */
    elLink;
    // @ts-ignore
    const __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }));
    const __VLS_155 = __VLS_154({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_154));
    let __VLS_158;
    const __VLS_159 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleEdit(scope.row);
                // @ts-ignore
                [handleEdit,];
            } });
    const { default: __VLS_160 } = __VLS_156.slots;
    // @ts-ignore
    [];
    var __VLS_156;
    var __VLS_157;
    let __VLS_161;
    /** @ts-ignore @type {typeof ___VLS_components.elLink | typeof ___VLS_components.ElLink} */
    elLink;
    // @ts-ignore
    const __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({
        ...{ 'onClick': {} },
        type: (scope.row.status === 1 ? 'warning' : 'success'),
        ...{ style: {} },
    }));
    const __VLS_163 = __VLS_162({
        ...{ 'onClick': {} },
        type: (scope.row.status === 1 ? 'warning' : 'success'),
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_162));
    let __VLS_166;
    const __VLS_167 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.changeContentStatus(scope.row.id, scope.row.status === 1 ? 0 : 1);
                // @ts-ignore
                [changeContentStatus,];
            } });
    const { default: __VLS_168 } = __VLS_164.slots;
    (scope.row.status === 1 ? "禁用" : "启用");
    // @ts-ignore
    [];
    var __VLS_164;
    var __VLS_165;
    let __VLS_169;
    /** @ts-ignore @type {typeof ___VLS_components.elLink | typeof ___VLS_components.ElLink} */
    elLink;
    // @ts-ignore
    const __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169({
        ...{ 'onClick': {} },
        type: (scope.row.isDeleted === 0 ? 'danger' : 'success'),
    }));
    const __VLS_171 = __VLS_170({
        ...{ 'onClick': {} },
        type: (scope.row.isDeleted === 0 ? 'danger' : 'success'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_170));
    let __VLS_174;
    const __VLS_175 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.changeDeleteStatus(scope.row.id, scope.row.isDeleted === 0 ? 1 : 0);
                // @ts-ignore
                [changeDeleteStatus,];
            } });
    const { default: __VLS_176 } = __VLS_172.slots;
    (scope.row.isDeleted === 0 ? "删除" : "恢复");
    // @ts-ignore
    [];
    var __VLS_172;
    var __VLS_173;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_141;
// @ts-ignore
[];
var __VLS_92;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pagination-container" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
let __VLS_177;
/** @ts-ignore @type {typeof ___VLS_components.elPagination | typeof ___VLS_components.ElPagination} */
elPagination;
// @ts-ignore
const __VLS_178 = __VLS_asFunctionalComponent(__VLS_177, new __VLS_177({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.pagination.currentPage),
    pageSize: (__VLS_ctx.pagination.pageSize),
    pageSizes: ([10, 20, 50, 100]),
    layout: "total, sizes, prev, pager, next, jumper",
    total: (__VLS_ctx.pagination.total),
}));
const __VLS_179 = __VLS_178({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.pagination.currentPage),
    pageSize: (__VLS_ctx.pagination.pageSize),
    pageSizes: ([10, 20, 50, 100]),
    layout: "total, sizes, prev, pager, next, jumper",
    total: (__VLS_ctx.pagination.total),
}, ...__VLS_functionalComponentArgsRest(__VLS_178));
let __VLS_182;
const __VLS_183 = ({ sizeChange: {} },
    { onSizeChange: (__VLS_ctx.handleSizeChange) });
const __VLS_184 = ({ currentChange: {} },
    { onCurrentChange: (__VLS_ctx.handleCurrentChange) });
var __VLS_180;
var __VLS_181;
// @ts-ignore
[pagination, pagination, pagination, handleSizeChange, handleCurrentChange,];
var __VLS_86;
let __VLS_185;
/** @ts-ignore @type {typeof ___VLS_components.elDialog | typeof ___VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_186 = __VLS_asFunctionalComponent(__VLS_185, new __VLS_185({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "编辑内容",
    width: "800px",
    center: true,
}));
const __VLS_187 = __VLS_186({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "编辑内容",
    width: "800px",
    center: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_186));
const { default: __VLS_190 } = __VLS_188.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "content-edit" },
});
/** @type {__VLS_StyleScopedClasses['content-edit']} */ ;
let __VLS_191;
/** @ts-ignore @type {typeof ___VLS_components.elForm | typeof ___VLS_components.ElForm} */
elForm;
// @ts-ignore
const __VLS_192 = __VLS_asFunctionalComponent(__VLS_191, new __VLS_191({
    labelPosition: "top",
    labelWidth: "100px",
}));
const __VLS_193 = __VLS_192({
    labelPosition: "top",
    labelWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_192));
const { default: __VLS_196 } = __VLS_194.slots;
let __VLS_197;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_198 = __VLS_asFunctionalComponent(__VLS_197, new __VLS_197({
    label: "标题",
}));
const __VLS_199 = __VLS_198({
    label: "标题",
}, ...__VLS_functionalComponentArgsRest(__VLS_198));
const { default: __VLS_202 } = __VLS_200.slots;
let __VLS_203;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_204 = __VLS_asFunctionalComponent(__VLS_203, new __VLS_203({
    modelValue: (__VLS_ctx.currentContent.title),
    placeholder: "请输入内容标题",
}));
const __VLS_205 = __VLS_204({
    modelValue: (__VLS_ctx.currentContent.title),
    placeholder: "请输入内容标题",
}, ...__VLS_functionalComponentArgsRest(__VLS_204));
// @ts-ignore
[dialogVisible, currentContent,];
var __VLS_200;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "edit-meta" },
});
/** @type {__VLS_StyleScopedClasses['edit-meta']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "creator" },
});
/** @type {__VLS_StyleScopedClasses['creator']} */ ;
(__VLS_ctx.currentContent.authorId);
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "publish-time" },
});
/** @type {__VLS_StyleScopedClasses['publish-time']} */ ;
(__VLS_ctx.currentContent.createdAt);
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "views" },
});
/** @type {__VLS_StyleScopedClasses['views']} */ ;
(__VLS_ctx.currentContent.viewCount);
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "comments" },
});
/** @type {__VLS_StyleScopedClasses['comments']} */ ;
(__VLS_ctx.currentContent.commentCount);
let __VLS_208;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_209 = __VLS_asFunctionalComponent(__VLS_208, new __VLS_208({
    label: "状态",
    ...{ style: {} },
}));
const __VLS_210 = __VLS_209({
    label: "状态",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_209));
const { default: __VLS_213 } = __VLS_211.slots;
let __VLS_214;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_215 = __VLS_asFunctionalComponent(__VLS_214, new __VLS_214({
    modelValue: (__VLS_ctx.currentContent.status),
    placeholder: "请选择状态",
}));
const __VLS_216 = __VLS_215({
    modelValue: (__VLS_ctx.currentContent.status),
    placeholder: "请选择状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_215));
const { default: __VLS_219 } = __VLS_217.slots;
let __VLS_220;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_221 = __VLS_asFunctionalComponent(__VLS_220, new __VLS_220({
    label: "正常",
    value: "1",
}));
const __VLS_222 = __VLS_221({
    label: "正常",
    value: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_221));
let __VLS_225;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_226 = __VLS_asFunctionalComponent(__VLS_225, new __VLS_225({
    label: "已下架",
    value: "0",
}));
const __VLS_227 = __VLS_226({
    label: "已下架",
    value: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_226));
// @ts-ignore
[currentContent, currentContent, currentContent, currentContent, currentContent,];
var __VLS_217;
// @ts-ignore
[];
var __VLS_211;
let __VLS_230;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_231 = __VLS_asFunctionalComponent(__VLS_230, new __VLS_230({
    label: "封面图片",
}));
const __VLS_232 = __VLS_231({
    label: "封面图片",
}, ...__VLS_functionalComponentArgsRest(__VLS_231));
const { default: __VLS_235 } = __VLS_233.slots;
let __VLS_236;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_237 = __VLS_asFunctionalComponent(__VLS_236, new __VLS_236({
    modelValue: (__VLS_ctx.currentContent.coverImage),
    placeholder: "请输入封面图片URL",
}));
const __VLS_238 = __VLS_237({
    modelValue: (__VLS_ctx.currentContent.coverImage),
    placeholder: "请输入封面图片URL",
}, ...__VLS_functionalComponentArgsRest(__VLS_237));
// @ts-ignore
[currentContent,];
var __VLS_233;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "edit-image" },
});
/** @type {__VLS_StyleScopedClasses['edit-image']} */ ;
let __VLS_241;
/** @ts-ignore @type {typeof ___VLS_components.elImage | typeof ___VLS_components.ElImage} */
elImage;
// @ts-ignore
const __VLS_242 = __VLS_asFunctionalComponent(__VLS_241, new __VLS_241({
    src: (__VLS_ctx.currentContent.coverImage || 'https://via.placeholder.com/400x200'),
    fit: "contain",
}));
const __VLS_243 = __VLS_242({
    src: (__VLS_ctx.currentContent.coverImage || 'https://via.placeholder.com/400x200'),
    fit: "contain",
}, ...__VLS_functionalComponentArgsRest(__VLS_242));
let __VLS_246;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_247 = __VLS_asFunctionalComponent(__VLS_246, new __VLS_246({
    label: "内容",
}));
const __VLS_248 = __VLS_247({
    label: "内容",
}, ...__VLS_functionalComponentArgsRest(__VLS_247));
const { default: __VLS_251 } = __VLS_249.slots;
let __VLS_252;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({
    modelValue: (__VLS_ctx.currentContent.contentBody),
    type: "textarea",
    rows: (10),
    placeholder: "请输入内容正文",
}));
const __VLS_254 = __VLS_253({
    modelValue: (__VLS_ctx.currentContent.contentBody),
    type: "textarea",
    rows: (10),
    placeholder: "请输入内容正文",
}, ...__VLS_functionalComponentArgsRest(__VLS_253));
// @ts-ignore
[currentContent, currentContent,];
var __VLS_249;
// @ts-ignore
[];
var __VLS_194;
{
    const { footer: __VLS_257 } = __VLS_188.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dialog-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
    let __VLS_258;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_259 = __VLS_asFunctionalComponent(__VLS_258, new __VLS_258({
        ...{ 'onClick': {} },
    }));
    const __VLS_260 = __VLS_259({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_259));
    let __VLS_263;
    const __VLS_264 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.dialogVisible = false;
                // @ts-ignore
                [dialogVisible,];
            } });
    const { default: __VLS_265 } = __VLS_261.slots;
    // @ts-ignore
    [];
    var __VLS_261;
    var __VLS_262;
    let __VLS_266;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_267 = __VLS_asFunctionalComponent(__VLS_266, new __VLS_266({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_268 = __VLS_267({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_267));
    let __VLS_271;
    const __VLS_272 = ({ click: {} },
        { onClick: (__VLS_ctx.updateContent) });
    const { default: __VLS_273 } = __VLS_269.slots;
    // @ts-ignore
    [updateContent,];
    var __VLS_269;
    var __VLS_270;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_188;
let __VLS_274;
/** @ts-ignore @type {typeof ___VLS_components.elDialog | typeof ___VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_275 = __VLS_asFunctionalComponent(__VLS_274, new __VLS_274({
    modelValue: (__VLS_ctx.detailDialogVisible),
    title: "内容详情",
    width: "800px",
    center: true,
}));
const __VLS_276 = __VLS_275({
    modelValue: (__VLS_ctx.detailDialogVisible),
    title: "内容详情",
    width: "800px",
    center: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_275));
const { default: __VLS_279 } = __VLS_277.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "content-detail" },
});
/** @type {__VLS_StyleScopedClasses['content-detail']} */ ;
let __VLS_280;
/** @ts-ignore @type {typeof ___VLS_components.elForm | typeof ___VLS_components.ElForm} */
elForm;
// @ts-ignore
const __VLS_281 = __VLS_asFunctionalComponent(__VLS_280, new __VLS_280({
    labelPosition: "top",
    labelWidth: "100px",
}));
const __VLS_282 = __VLS_281({
    labelPosition: "top",
    labelWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_281));
const { default: __VLS_285 } = __VLS_283.slots;
let __VLS_286;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_287 = __VLS_asFunctionalComponent(__VLS_286, new __VLS_286({
    label: "标题",
}));
const __VLS_288 = __VLS_287({
    label: "标题",
}, ...__VLS_functionalComponentArgsRest(__VLS_287));
const { default: __VLS_291 } = __VLS_289.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(__VLS_ctx.contentDetail.title);
// @ts-ignore
[detailDialogVisible, contentDetail,];
var __VLS_289;
let __VLS_292;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_293 = __VLS_asFunctionalComponent(__VLS_292, new __VLS_292({
    label: "封面图",
}));
const __VLS_294 = __VLS_293({
    label: "封面图",
}, ...__VLS_functionalComponentArgsRest(__VLS_293));
const { default: __VLS_297 } = __VLS_295.slots;
let __VLS_298;
/** @ts-ignore @type {typeof ___VLS_components.elImage | typeof ___VLS_components.ElImage} */
elImage;
// @ts-ignore
const __VLS_299 = __VLS_asFunctionalComponent(__VLS_298, new __VLS_298({
    src: (__VLS_ctx.contentDetail.coverImage || 'https://via.placeholder.com/400x200'),
    fit: "contain",
}));
const __VLS_300 = __VLS_299({
    src: (__VLS_ctx.contentDetail.coverImage || 'https://via.placeholder.com/400x200'),
    fit: "contain",
}, ...__VLS_functionalComponentArgsRest(__VLS_299));
// @ts-ignore
[contentDetail,];
var __VLS_295;
let __VLS_303;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_304 = __VLS_asFunctionalComponent(__VLS_303, new __VLS_303({
    label: "内容正文",
}));
const __VLS_305 = __VLS_304({
    label: "内容正文",
}, ...__VLS_functionalComponentArgsRest(__VLS_304));
const { default: __VLS_308 } = __VLS_306.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
(__VLS_ctx.contentDetail.contentBody);
// @ts-ignore
[contentDetail,];
var __VLS_306;
let __VLS_309;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_310 = __VLS_asFunctionalComponent(__VLS_309, new __VLS_309({
    label: "作者ID",
}));
const __VLS_311 = __VLS_310({
    label: "作者ID",
}, ...__VLS_functionalComponentArgsRest(__VLS_310));
const { default: __VLS_314 } = __VLS_312.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(__VLS_ctx.contentDetail.authorId);
// @ts-ignore
[contentDetail,];
var __VLS_312;
let __VLS_315;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_316 = __VLS_asFunctionalComponent(__VLS_315, new __VLS_315({
    label: "浏览量",
}));
const __VLS_317 = __VLS_316({
    label: "浏览量",
}, ...__VLS_functionalComponentArgsRest(__VLS_316));
const { default: __VLS_320 } = __VLS_318.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(__VLS_ctx.contentDetail.viewCount);
// @ts-ignore
[contentDetail,];
var __VLS_318;
let __VLS_321;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_322 = __VLS_asFunctionalComponent(__VLS_321, new __VLS_321({
    label: "评论数",
}));
const __VLS_323 = __VLS_322({
    label: "评论数",
}, ...__VLS_functionalComponentArgsRest(__VLS_322));
const { default: __VLS_326 } = __VLS_324.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(__VLS_ctx.contentDetail.commentCount);
// @ts-ignore
[contentDetail,];
var __VLS_324;
let __VLS_327;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_328 = __VLS_asFunctionalComponent(__VLS_327, new __VLS_327({
    label: "平均评分",
}));
const __VLS_329 = __VLS_328({
    label: "平均评分",
}, ...__VLS_functionalComponentArgsRest(__VLS_328));
const { default: __VLS_332 } = __VLS_330.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(__VLS_ctx.contentDetail.avgRating || "暂无评分");
// @ts-ignore
[contentDetail,];
var __VLS_330;
let __VLS_333;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_334 = __VLS_asFunctionalComponent(__VLS_333, new __VLS_333({
    label: "评分人数",
}));
const __VLS_335 = __VLS_334({
    label: "评分人数",
}, ...__VLS_functionalComponentArgsRest(__VLS_334));
const { default: __VLS_338 } = __VLS_336.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(__VLS_ctx.contentDetail.ratingCount);
// @ts-ignore
[contentDetail,];
var __VLS_336;
let __VLS_339;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_340 = __VLS_asFunctionalComponent(__VLS_339, new __VLS_339({
    label: "状态",
}));
const __VLS_341 = __VLS_340({
    label: "状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_340));
const { default: __VLS_344 } = __VLS_342.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(__VLS_ctx.contentDetail.status === 1 ? "正常" : "已禁用");
// @ts-ignore
[contentDetail,];
var __VLS_342;
let __VLS_345;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_346 = __VLS_asFunctionalComponent(__VLS_345, new __VLS_345({
    label: "创建时间",
}));
const __VLS_347 = __VLS_346({
    label: "创建时间",
}, ...__VLS_functionalComponentArgsRest(__VLS_346));
const { default: __VLS_350 } = __VLS_348.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(__VLS_ctx.contentDetail.createdAt);
// @ts-ignore
[contentDetail,];
var __VLS_348;
// @ts-ignore
[];
var __VLS_283;
{
    const { footer: __VLS_351 } = __VLS_277.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dialog-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
    let __VLS_352;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_353 = __VLS_asFunctionalComponent(__VLS_352, new __VLS_352({
        ...{ 'onClick': {} },
    }));
    const __VLS_354 = __VLS_353({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_353));
    let __VLS_357;
    const __VLS_358 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.detailDialogVisible = false;
                // @ts-ignore
                [detailDialogVisible,];
            } });
    const { default: __VLS_359 } = __VLS_355.slots;
    // @ts-ignore
    [];
    var __VLS_355;
    var __VLS_356;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_277;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
