import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { UserService } from "@/common/api/user";
import { useNamespace } from "@/composables";
import { User, Edit, View, SwitchButton, Delete as DeleteIcon, Search, RefreshRight, Plus, } from "@element-plus/icons-vue";
const ns = useNamespace("admin-management");
// 搜索表单
const searchForm = reactive({
    username: "",
    nickname: "",
    status: "",
    isDeleted: "",
});
// 分页数据
const pagination = reactive({
    page: 1,
    pageSize: 10,
    total: 0,
});
// 管理员列表
const adminList = ref([]);
// 加载状态
const loading = ref(false);
// 对话框
const dialogVisible = ref(false);
const detailVisible = ref(false);
const banDialogVisible = ref(false);
const banReason = ref("");
const currentRow = ref(null);
const formData = reactive({
    id: "",
    username: "",
    nickname: "",
    phone: "",
    avatar: "",
    status: "normal",
});
// 管理员详情
const adminDetail = reactive({
    id: "",
    username: "",
    nickname: "",
    avatar: "",
    phone: "",
    status: "",
    isDeleted: 0,
    role: 0,
    createdAt: "",
});
// 查看详情
const handleView = async (row) => {
    try {
        const res = await UserService.getAdminDetail(row.id);
        if (res.code === 0) {
            Object.assign(adminDetail, res.data);
            detailVisible.value = true;
        }
        else {
            ElMessage.error(res.msg || "获取管理员详情失败");
        }
    }
    catch (error) {
        ElMessage.error("获取管理员详情失败");
        console.error("获取管理员详情失败:", error);
    }
};
// 排序参数
const sortParams = reactive({
    sortBy: "created_at",
    sortOrder: "desc",
});
// 获取管理员列表
const getAdminList = async () => {
    loading.value = true;
    try {
        const params = {
            page: pagination.page,
            size: pagination.pageSize,
            isDeleted: searchForm.isDeleted,
            status: searchForm.status,
            name: searchForm.username || searchForm.nickname,
            ...sortParams,
        };
        const res = await UserService.getAdminList(params);
        adminList.value = res.data.list;
        pagination.total = res.data.total;
    }
    catch (error) {
        ElMessage.error("获取管理员列表失败");
        console.error("获取管理员列表失败:", error);
    }
    finally {
        loading.value = false;
    }
};
// 搜索
const handleSearch = () => {
    pagination.page = 1;
    getAdminList();
};
// 重置
const resetForm = () => {
    searchForm.username = "";
    searchForm.nickname = "";
    searchForm.status = "";
    searchForm.isDeleted = "";
    pagination.page = 1;
    getAdminList();
};
// 分页大小变化
const handleSizeChange = (size) => {
    pagination.pageSize = size;
    getAdminList();
};
// 分页当前页变化
const handleCurrentChange = (current) => {
    pagination.page = current;
    getAdminList();
};
// 处理表格行悬停
const handleRowHover = (row, column, event) => {
    // 可以在这里添加额外的悬停逻辑
};
// 编辑
const handleEdit = (row) => {
    dialogVisible.value = true;
    Object.assign(formData, row);
};
// 切换状态
const handleToggleStatus = (row) => {
    currentRow.value = row;
    if (row.status === "normal") {
        // 禁用操作需要输入封禁原因
        banReason.value = "";
        banDialogVisible.value = true;
    }
    else {
        // 启用操作直接执行
        doToggleStatus(1);
    }
};
// 执行状态切换
const doToggleStatus = async (status) => {
    try {
        const params = {
            id: currentRow.value.id,
            status,
            ...(status === 0 ? { banReason: banReason.value } : {}),
        };
        const res = await UserService.changeAdminStatus(params);
        if (res.code === 0) {
            ElMessage.success("状态更新成功");
            getAdminList();
            banDialogVisible.value = false;
        }
        else {
            ElMessage.error(res.msg || "状态更新失败");
        }
    }
    catch (error) {
        ElMessage.error(error.response?.data?.msg || "状态更新失败");
        console.error("状态更新失败:", error);
    }
};
// 删除
const handleDelete = async (row) => {
    try {
        await UserService.deleteAdmin(row.id);
        ElMessage.success("删除成功");
        getAdminList();
    }
    catch (error) {
        ElMessage.error("删除失败");
        console.error("删除失败:", error);
    }
};
// 创建初始管理员
const handleAddDefaultAdmin = async () => {
    try {
        const res = await UserService.addDefaultAdmin();
        if (res.code === 0) {
            ElMessage.success("初始管理员创建成功，默认账号：admin，密码：123456+六位随机数");
            getAdminList();
        }
        else {
            ElMessage.error(res.msg || "初始管理员创建失败");
        }
    }
    catch (error) {
        ElMessage.error("初始管理员创建失败");
        console.error("初始管理员创建失败:", error);
    }
};
// 提交编辑
const handleSubmit = async () => {
    try {
        // 昵称验证：仅允许英文和数字
        const nicknameRegex = /^[a-zA-Z0-9]+$/;
        if (formData.nickname && !nicknameRegex.test(formData.nickname)) {
            ElMessage.error("昵称仅允许英文和数字");
            return;
        }
        // 手机号验证：中国手机号格式
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            ElMessage.error("手机号格式不正确");
            return;
        }
        const res = await UserService.updateAdmin(formData);
        if (res.code === 0) {
            ElMessage.success("编辑成功");
            dialogVisible.value = false;
            getAdminList();
        }
        else {
            ElMessage.error(res.msg || "编辑失败");
        }
    }
    catch (error) {
        ElMessage.error(error.response?.data?.msg || "编辑失败");
        console.error("编辑失败:", error);
    }
};
// 初始化
onMounted(() => {
    getAdminList();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-table__row']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.b()) },
    ...{ class: "admin-management-container" },
});
/** @type {__VLS_StyleScopedClasses['admin-management-container']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('header')) },
    ...{ class: "flx-align-center" },
});
/** @type {__VLS_StyleScopedClasses['flx-align-center']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
("管理员管理");
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.handleAddDefaultAdmin) });
const { default: __VLS_7 } = __VLS_3.slots;
let __VLS_8;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const { default: __VLS_13 } = __VLS_11.slots;
let __VLS_14;
/** @ts-ignore @type {typeof ___VLS_components.Plus} */
Plus;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
// @ts-ignore
[ns, ns, handleAddDefaultAdmin,];
var __VLS_11;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
let __VLS_19;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    shadow: "hover",
    ...{ class: "filter-card" },
}));
const __VLS_21 = __VLS_20({
    shadow: "hover",
    ...{ class: "filter-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['filter-card']} */ ;
const { default: __VLS_24 } = __VLS_22.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('search-filter')) },
    ...{ class: "flx-align-center filter-content" },
});
/** @type {__VLS_StyleScopedClasses['flx-align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-content']} */ ;
let __VLS_25;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    modelValue: (__VLS_ctx.searchForm.username),
    placeholder: "用户名",
    ...{ style: {} },
    clearable: true,
}));
const __VLS_27 = __VLS_26({
    modelValue: (__VLS_ctx.searchForm.username),
    placeholder: "用户名",
    ...{ style: {} },
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const { default: __VLS_30 } = __VLS_28.slots;
{
    const { prefix: __VLS_31 } = __VLS_28.slots;
    let __VLS_32;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
    const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
    const { default: __VLS_37 } = __VLS_35.slots;
    let __VLS_38;
    /** @ts-ignore @type {typeof ___VLS_components.User} */
    User;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({}));
    const __VLS_40 = __VLS_39({}, ...__VLS_functionalComponentArgsRest(__VLS_39));
    // @ts-ignore
    [ns, searchForm,];
    var __VLS_35;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_28;
let __VLS_43;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    modelValue: (__VLS_ctx.searchForm.nickname),
    placeholder: "昵称",
    ...{ style: {} },
    clearable: true,
}));
const __VLS_45 = __VLS_44({
    modelValue: (__VLS_ctx.searchForm.nickname),
    placeholder: "昵称",
    ...{ style: {} },
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
const { default: __VLS_48 } = __VLS_46.slots;
{
    const { prefix: __VLS_49 } = __VLS_46.slots;
    let __VLS_50;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({}));
    const __VLS_52 = __VLS_51({}, ...__VLS_functionalComponentArgsRest(__VLS_51));
    const { default: __VLS_55 } = __VLS_53.slots;
    let __VLS_56;
    /** @ts-ignore @type {typeof ___VLS_components.User} */
    User;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({}));
    const __VLS_58 = __VLS_57({}, ...__VLS_functionalComponentArgsRest(__VLS_57));
    // @ts-ignore
    [searchForm,];
    var __VLS_53;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_46;
let __VLS_61;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    modelValue: (__VLS_ctx.searchForm.status),
    placeholder: "管理员状态",
    ...{ style: {} },
}));
const __VLS_63 = __VLS_62({
    modelValue: (__VLS_ctx.searchForm.status),
    placeholder: "管理员状态",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
const { default: __VLS_66 } = __VLS_64.slots;
{
    const { prefix: __VLS_67 } = __VLS_64.slots;
    let __VLS_68;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({}));
    const __VLS_70 = __VLS_69({}, ...__VLS_functionalComponentArgsRest(__VLS_69));
    const { default: __VLS_73 } = __VLS_71.slots;
    let __VLS_74;
    /** @ts-ignore @type {typeof ___VLS_components.SwitchButton} */
    SwitchButton;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({}));
    const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
    // @ts-ignore
    [searchForm,];
    var __VLS_71;
    // @ts-ignore
    [];
}
let __VLS_79;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
    label: "未指定",
    value: "",
}));
const __VLS_81 = __VLS_80({
    label: "未指定",
    value: "",
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
let __VLS_84;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    label: "正常",
    value: "normal",
}));
const __VLS_86 = __VLS_85({
    label: "正常",
    value: "normal",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
let __VLS_89;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
    label: "已禁用",
    value: "disabled",
}));
const __VLS_91 = __VLS_90({
    label: "已禁用",
    value: "disabled",
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
// @ts-ignore
[];
var __VLS_64;
let __VLS_94;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    modelValue: (__VLS_ctx.searchForm.isDeleted),
    placeholder: "删除状态",
    ...{ style: {} },
}));
const __VLS_96 = __VLS_95({
    modelValue: (__VLS_ctx.searchForm.isDeleted),
    placeholder: "删除状态",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
const { default: __VLS_99 } = __VLS_97.slots;
{
    const { prefix: __VLS_100 } = __VLS_97.slots;
    let __VLS_101;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({}));
    const __VLS_103 = __VLS_102({}, ...__VLS_functionalComponentArgsRest(__VLS_102));
    const { default: __VLS_106 } = __VLS_104.slots;
    let __VLS_107;
    /** @ts-ignore @type {typeof ___VLS_components.DeleteIcon} */
    DeleteIcon;
    // @ts-ignore
    const __VLS_108 = __VLS_asFunctionalComponent(__VLS_107, new __VLS_107({}));
    const __VLS_109 = __VLS_108({}, ...__VLS_functionalComponentArgsRest(__VLS_108));
    // @ts-ignore
    [searchForm,];
    var __VLS_104;
    // @ts-ignore
    [];
}
let __VLS_112;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({
    label: "未指定",
    value: "",
}));
const __VLS_114 = __VLS_113({
    label: "未指定",
    value: "",
}, ...__VLS_functionalComponentArgsRest(__VLS_113));
let __VLS_117;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({
    label: "正常",
    value: (0),
}));
const __VLS_119 = __VLS_118({
    label: "正常",
    value: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
let __VLS_122;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
    label: "已删除",
    value: (1),
}));
const __VLS_124 = __VLS_123({
    label: "已删除",
    value: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
// @ts-ignore
[];
var __VLS_97;
let __VLS_127;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}));
const __VLS_129 = __VLS_128({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_128));
let __VLS_132;
const __VLS_133 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSearch) });
const { default: __VLS_134 } = __VLS_130.slots;
let __VLS_135;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135({}));
const __VLS_137 = __VLS_136({}, ...__VLS_functionalComponentArgsRest(__VLS_136));
const { default: __VLS_140 } = __VLS_138.slots;
let __VLS_141;
/** @ts-ignore @type {typeof ___VLS_components.Search} */
Search;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({}));
const __VLS_143 = __VLS_142({}, ...__VLS_functionalComponentArgsRest(__VLS_142));
// @ts-ignore
[handleSearch,];
var __VLS_138;
// @ts-ignore
[];
var __VLS_130;
var __VLS_131;
let __VLS_146;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
    ...{ 'onClick': {} },
}));
const __VLS_148 = __VLS_147({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
let __VLS_151;
const __VLS_152 = ({ click: {} },
    { onClick: (__VLS_ctx.resetForm) });
const { default: __VLS_153 } = __VLS_149.slots;
let __VLS_154;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({}));
const __VLS_156 = __VLS_155({}, ...__VLS_functionalComponentArgsRest(__VLS_155));
const { default: __VLS_159 } = __VLS_157.slots;
let __VLS_160;
/** @ts-ignore @type {typeof ___VLS_components.RefreshRight} */
RefreshRight;
// @ts-ignore
const __VLS_161 = __VLS_asFunctionalComponent(__VLS_160, new __VLS_160({}));
const __VLS_162 = __VLS_161({}, ...__VLS_functionalComponentArgsRest(__VLS_161));
// @ts-ignore
[resetForm,];
var __VLS_157;
// @ts-ignore
[];
var __VLS_149;
var __VLS_150;
// @ts-ignore
[];
var __VLS_22;
let __VLS_165;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_166 = __VLS_asFunctionalComponent(__VLS_165, new __VLS_165({
    shadow: "hover",
    ...{ class: "table-card" },
    ...{ style: {} },
}));
const __VLS_167 = __VLS_166({
    shadow: "hover",
    ...{ class: "table-card" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_166));
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
const { default: __VLS_170 } = __VLS_168.slots;
let __VLS_171;
/** @ts-ignore @type {typeof ___VLS_components.elTable | typeof ___VLS_components.ElTable} */
elTable;
// @ts-ignore
const __VLS_172 = __VLS_asFunctionalComponent(__VLS_171, new __VLS_171({
    ...{ 'onRowHover': {} },
    data: (__VLS_ctx.adminList),
    ...{ style: {} },
    stripe: true,
    border: true,
    highlightCurrentRow: (true),
}));
const __VLS_173 = __VLS_172({
    ...{ 'onRowHover': {} },
    data: (__VLS_ctx.adminList),
    ...{ style: {} },
    stripe: true,
    border: true,
    highlightCurrentRow: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_172));
let __VLS_176;
const __VLS_177 = ({ rowHover: {} },
    { onRowHover: (__VLS_ctx.handleRowHover) });
__VLS_asFunctionalDirective(___VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_178 } = __VLS_174.slots;
let __VLS_179;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_180 = __VLS_asFunctionalComponent(__VLS_179, new __VLS_179({
    prop: "id",
    label: "ID",
    width: "120",
}));
const __VLS_181 = __VLS_180({
    prop: "id",
    label: "ID",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_180));
let __VLS_184;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_185 = __VLS_asFunctionalComponent(__VLS_184, new __VLS_184({
    prop: "username",
    label: "用户名",
}));
const __VLS_186 = __VLS_185({
    prop: "username",
    label: "用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_185));
let __VLS_189;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_190 = __VLS_asFunctionalComponent(__VLS_189, new __VLS_189({
    prop: "nickname",
    label: "昵称",
}));
const __VLS_191 = __VLS_190({
    prop: "nickname",
    label: "昵称",
}, ...__VLS_functionalComponentArgsRest(__VLS_190));
let __VLS_194;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_195 = __VLS_asFunctionalComponent(__VLS_194, new __VLS_194({
    prop: "avatar",
    label: "头像",
    width: "100",
}));
const __VLS_196 = __VLS_195({
    prop: "avatar",
    label: "头像",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_195));
const { default: __VLS_199 } = __VLS_197.slots;
{
    const { default: __VLS_200 } = __VLS_197.slots;
    const [scope] = __VLS_getSlotParameters(__VLS_200);
    let __VLS_201;
    /** @ts-ignore @type {typeof ___VLS_components.elAvatar | typeof ___VLS_components.ElAvatar} */
    elAvatar;
    // @ts-ignore
    const __VLS_202 = __VLS_asFunctionalComponent(__VLS_201, new __VLS_201({
        size: (40),
        src: (scope.row.avatar || ''),
    }));
    const __VLS_203 = __VLS_202({
        size: (40),
        src: (scope.row.avatar || ''),
    }, ...__VLS_functionalComponentArgsRest(__VLS_202));
    // @ts-ignore
    [adminList, handleRowHover, vLoading, loading,];
}
// @ts-ignore
[];
var __VLS_197;
let __VLS_206;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_207 = __VLS_asFunctionalComponent(__VLS_206, new __VLS_206({
    prop: "phone",
    label: "手机号",
    width: "150",
}));
const __VLS_208 = __VLS_207({
    prop: "phone",
    label: "手机号",
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_207));
let __VLS_211;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_212 = __VLS_asFunctionalComponent(__VLS_211, new __VLS_211({
    prop: "status",
    label: "管理员状态",
    width: "120",
}));
const __VLS_213 = __VLS_212({
    prop: "status",
    label: "管理员状态",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_212));
const { default: __VLS_216 } = __VLS_214.slots;
{
    const { default: __VLS_217 } = __VLS_214.slots;
    const [scope] = __VLS_getSlotParameters(__VLS_217);
    let __VLS_218;
    /** @ts-ignore @type {typeof ___VLS_components.elTag | typeof ___VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_219 = __VLS_asFunctionalComponent(__VLS_218, new __VLS_218({
        type: (scope.row.status === 'normal' ? 'success' : 'danger'),
    }));
    const __VLS_220 = __VLS_219({
        type: (scope.row.status === 'normal' ? 'success' : 'danger'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_219));
    const { default: __VLS_223 } = __VLS_221.slots;
    (scope.row.status === "normal" ? "正常" : "已禁用");
    // @ts-ignore
    [];
    var __VLS_221;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_214;
let __VLS_224;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_225 = __VLS_asFunctionalComponent(__VLS_224, new __VLS_224({
    label: "操作",
    width: "350",
}));
const __VLS_226 = __VLS_225({
    label: "操作",
    width: "350",
}, ...__VLS_functionalComponentArgsRest(__VLS_225));
const { default: __VLS_229 } = __VLS_227.slots;
{
    const { default: __VLS_230 } = __VLS_227.slots;
    const [scope] = __VLS_getSlotParameters(__VLS_230);
    let __VLS_231;
    /** @ts-ignore @type {typeof ___VLS_components.elLink | typeof ___VLS_components.ElLink} */
    elLink;
    // @ts-ignore
    const __VLS_232 = __VLS_asFunctionalComponent(__VLS_231, new __VLS_231({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }));
    const __VLS_233 = __VLS_232({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_232));
    let __VLS_236;
    const __VLS_237 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleView(scope.row);
                // @ts-ignore
                [handleView,];
            } });
    const { default: __VLS_238 } = __VLS_234.slots;
    let __VLS_239;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_240 = __VLS_asFunctionalComponent(__VLS_239, new __VLS_239({}));
    const __VLS_241 = __VLS_240({}, ...__VLS_functionalComponentArgsRest(__VLS_240));
    const { default: __VLS_244 } = __VLS_242.slots;
    let __VLS_245;
    /** @ts-ignore @type {typeof ___VLS_components.View} */
    View;
    // @ts-ignore
    const __VLS_246 = __VLS_asFunctionalComponent(__VLS_245, new __VLS_245({}));
    const __VLS_247 = __VLS_246({}, ...__VLS_functionalComponentArgsRest(__VLS_246));
    // @ts-ignore
    [];
    var __VLS_242;
    // @ts-ignore
    [];
    var __VLS_234;
    var __VLS_235;
    let __VLS_250;
    /** @ts-ignore @type {typeof ___VLS_components.elLink | typeof ___VLS_components.ElLink} */
    elLink;
    // @ts-ignore
    const __VLS_251 = __VLS_asFunctionalComponent(__VLS_250, new __VLS_250({
        ...{ 'onClick': {} },
        type: "warning",
        ...{ style: {} },
    }));
    const __VLS_252 = __VLS_251({
        ...{ 'onClick': {} },
        type: "warning",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_251));
    let __VLS_255;
    const __VLS_256 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleEdit(scope.row);
                // @ts-ignore
                [handleEdit,];
            } });
    const { default: __VLS_257 } = __VLS_253.slots;
    let __VLS_258;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_259 = __VLS_asFunctionalComponent(__VLS_258, new __VLS_258({}));
    const __VLS_260 = __VLS_259({}, ...__VLS_functionalComponentArgsRest(__VLS_259));
    const { default: __VLS_263 } = __VLS_261.slots;
    let __VLS_264;
    /** @ts-ignore @type {typeof ___VLS_components.Edit} */
    Edit;
    // @ts-ignore
    const __VLS_265 = __VLS_asFunctionalComponent(__VLS_264, new __VLS_264({}));
    const __VLS_266 = __VLS_265({}, ...__VLS_functionalComponentArgsRest(__VLS_265));
    // @ts-ignore
    [];
    var __VLS_261;
    // @ts-ignore
    [];
    var __VLS_253;
    var __VLS_254;
    let __VLS_269;
    /** @ts-ignore @type {typeof ___VLS_components.elLink | typeof ___VLS_components.ElLink} */
    elLink;
    // @ts-ignore
    const __VLS_270 = __VLS_asFunctionalComponent(__VLS_269, new __VLS_269({
        ...{ 'onClick': {} },
        type: (scope.row.status === 'normal' ? 'warning' : 'success'),
        ...{ style: {} },
    }));
    const __VLS_271 = __VLS_270({
        ...{ 'onClick': {} },
        type: (scope.row.status === 'normal' ? 'warning' : 'success'),
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_270));
    let __VLS_274;
    const __VLS_275 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleToggleStatus(scope.row);
                // @ts-ignore
                [handleToggleStatus,];
            } });
    const { default: __VLS_276 } = __VLS_272.slots;
    let __VLS_277;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_278 = __VLS_asFunctionalComponent(__VLS_277, new __VLS_277({}));
    const __VLS_279 = __VLS_278({}, ...__VLS_functionalComponentArgsRest(__VLS_278));
    const { default: __VLS_282 } = __VLS_280.slots;
    let __VLS_283;
    /** @ts-ignore @type {typeof ___VLS_components.SwitchButton} */
    SwitchButton;
    // @ts-ignore
    const __VLS_284 = __VLS_asFunctionalComponent(__VLS_283, new __VLS_283({}));
    const __VLS_285 = __VLS_284({}, ...__VLS_functionalComponentArgsRest(__VLS_284));
    // @ts-ignore
    [];
    var __VLS_280;
    (scope.row.status === "normal" ? "禁用" : "启用");
    // @ts-ignore
    [];
    var __VLS_272;
    var __VLS_273;
    let __VLS_288;
    /** @ts-ignore @type {typeof ___VLS_components.elLink | typeof ___VLS_components.ElLink} */
    elLink;
    // @ts-ignore
    const __VLS_289 = __VLS_asFunctionalComponent(__VLS_288, new __VLS_288({
        ...{ 'onClick': {} },
        type: "danger",
    }));
    const __VLS_290 = __VLS_289({
        ...{ 'onClick': {} },
        type: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_289));
    let __VLS_293;
    const __VLS_294 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleDelete(scope.row);
                // @ts-ignore
                [handleDelete,];
            } });
    const { default: __VLS_295 } = __VLS_291.slots;
    let __VLS_296;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_297 = __VLS_asFunctionalComponent(__VLS_296, new __VLS_296({}));
    const __VLS_298 = __VLS_297({}, ...__VLS_functionalComponentArgsRest(__VLS_297));
    const { default: __VLS_301 } = __VLS_299.slots;
    let __VLS_302;
    /** @ts-ignore @type {typeof ___VLS_components.DeleteIcon} */
    DeleteIcon;
    // @ts-ignore
    const __VLS_303 = __VLS_asFunctionalComponent(__VLS_302, new __VLS_302({}));
    const __VLS_304 = __VLS_303({}, ...__VLS_functionalComponentArgsRest(__VLS_303));
    // @ts-ignore
    [];
    var __VLS_299;
    // @ts-ignore
    [];
    var __VLS_291;
    var __VLS_292;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_227;
// @ts-ignore
[];
var __VLS_174;
var __VLS_175;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pagination-container" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
let __VLS_307;
/** @ts-ignore @type {typeof ___VLS_components.elPagination | typeof ___VLS_components.ElPagination} */
elPagination;
// @ts-ignore
const __VLS_308 = __VLS_asFunctionalComponent(__VLS_307, new __VLS_307({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.pagination.page),
    pageSize: (__VLS_ctx.pagination.pageSize),
    pageSizes: ([10, 20, 50, 100]),
    layout: "total, sizes, prev, pager, next, jumper",
    total: (__VLS_ctx.pagination.total),
}));
const __VLS_309 = __VLS_308({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.pagination.page),
    pageSize: (__VLS_ctx.pagination.pageSize),
    pageSizes: ([10, 20, 50, 100]),
    layout: "total, sizes, prev, pager, next, jumper",
    total: (__VLS_ctx.pagination.total),
}, ...__VLS_functionalComponentArgsRest(__VLS_308));
let __VLS_312;
const __VLS_313 = ({ sizeChange: {} },
    { onSizeChange: (__VLS_ctx.handleSizeChange) });
const __VLS_314 = ({ currentChange: {} },
    { onCurrentChange: (__VLS_ctx.handleCurrentChange) });
var __VLS_310;
var __VLS_311;
// @ts-ignore
[pagination, pagination, pagination, handleSizeChange, handleCurrentChange,];
var __VLS_168;
let __VLS_315;
/** @ts-ignore @type {typeof ___VLS_components.elDialog | typeof ___VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_316 = __VLS_asFunctionalComponent(__VLS_315, new __VLS_315({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "编辑管理员",
    width: "500px",
}));
const __VLS_317 = __VLS_316({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "编辑管理员",
    width: "500px",
}, ...__VLS_functionalComponentArgsRest(__VLS_316));
const { default: __VLS_320 } = __VLS_318.slots;
let __VLS_321;
/** @ts-ignore @type {typeof ___VLS_components.elForm | typeof ___VLS_components.ElForm} */
elForm;
// @ts-ignore
const __VLS_322 = __VLS_asFunctionalComponent(__VLS_321, new __VLS_321({
    model: (__VLS_ctx.formData),
    labelWidth: "100px",
}));
const __VLS_323 = __VLS_322({
    model: (__VLS_ctx.formData),
    labelWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_322));
const { default: __VLS_326 } = __VLS_324.slots;
let __VLS_327;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_328 = __VLS_asFunctionalComponent(__VLS_327, new __VLS_327({
    label: "用户名",
}));
const __VLS_329 = __VLS_328({
    label: "用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_328));
const { default: __VLS_332 } = __VLS_330.slots;
let __VLS_333;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_334 = __VLS_asFunctionalComponent(__VLS_333, new __VLS_333({
    modelValue: (__VLS_ctx.formData.username),
    disabled: true,
}));
const __VLS_335 = __VLS_334({
    modelValue: (__VLS_ctx.formData.username),
    disabled: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_334));
// @ts-ignore
[dialogVisible, formData, formData,];
var __VLS_330;
let __VLS_338;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_339 = __VLS_asFunctionalComponent(__VLS_338, new __VLS_338({
    label: "昵称",
    prop: "nickname",
}));
const __VLS_340 = __VLS_339({
    label: "昵称",
    prop: "nickname",
}, ...__VLS_functionalComponentArgsRest(__VLS_339));
const { default: __VLS_343 } = __VLS_341.slots;
let __VLS_344;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_345 = __VLS_asFunctionalComponent(__VLS_344, new __VLS_344({
    modelValue: (__VLS_ctx.formData.nickname),
    placeholder: "仅允许英文和数字",
}));
const __VLS_346 = __VLS_345({
    modelValue: (__VLS_ctx.formData.nickname),
    placeholder: "仅允许英文和数字",
}, ...__VLS_functionalComponentArgsRest(__VLS_345));
// @ts-ignore
[formData,];
var __VLS_341;
let __VLS_349;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_350 = __VLS_asFunctionalComponent(__VLS_349, new __VLS_349({
    label: "手机号",
    prop: "phone",
}));
const __VLS_351 = __VLS_350({
    label: "手机号",
    prop: "phone",
}, ...__VLS_functionalComponentArgsRest(__VLS_350));
const { default: __VLS_354 } = __VLS_352.slots;
let __VLS_355;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_356 = __VLS_asFunctionalComponent(__VLS_355, new __VLS_355({
    modelValue: (__VLS_ctx.formData.phone),
    placeholder: "请输入中国手机号",
}));
const __VLS_357 = __VLS_356({
    modelValue: (__VLS_ctx.formData.phone),
    placeholder: "请输入中国手机号",
}, ...__VLS_functionalComponentArgsRest(__VLS_356));
// @ts-ignore
[formData,];
var __VLS_352;
let __VLS_360;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_361 = __VLS_asFunctionalComponent(__VLS_360, new __VLS_360({
    label: "头像",
}));
const __VLS_362 = __VLS_361({
    label: "头像",
}, ...__VLS_functionalComponentArgsRest(__VLS_361));
const { default: __VLS_365 } = __VLS_363.slots;
let __VLS_366;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_367 = __VLS_asFunctionalComponent(__VLS_366, new __VLS_366({
    modelValue: (__VLS_ctx.formData.avatar),
    placeholder: "头像URL",
}));
const __VLS_368 = __VLS_367({
    modelValue: (__VLS_ctx.formData.avatar),
    placeholder: "头像URL",
}, ...__VLS_functionalComponentArgsRest(__VLS_367));
// @ts-ignore
[formData,];
var __VLS_363;
// @ts-ignore
[];
var __VLS_324;
{
    const { footer: __VLS_371 } = __VLS_318.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dialog-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
    let __VLS_372;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_373 = __VLS_asFunctionalComponent(__VLS_372, new __VLS_372({
        ...{ 'onClick': {} },
    }));
    const __VLS_374 = __VLS_373({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_373));
    let __VLS_377;
    const __VLS_378 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.dialogVisible = false;
                // @ts-ignore
                [dialogVisible,];
            } });
    const { default: __VLS_379 } = __VLS_375.slots;
    // @ts-ignore
    [];
    var __VLS_375;
    var __VLS_376;
    let __VLS_380;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_381 = __VLS_asFunctionalComponent(__VLS_380, new __VLS_380({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_382 = __VLS_381({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_381));
    let __VLS_385;
    const __VLS_386 = ({ click: {} },
        { onClick: (__VLS_ctx.handleSubmit) });
    const { default: __VLS_387 } = __VLS_383.slots;
    // @ts-ignore
    [handleSubmit,];
    var __VLS_383;
    var __VLS_384;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_318;
let __VLS_388;
/** @ts-ignore @type {typeof ___VLS_components.elDialog | typeof ___VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_389 = __VLS_asFunctionalComponent(__VLS_388, new __VLS_388({
    modelValue: (__VLS_ctx.detailVisible),
    title: "管理员详情",
    width: "500px",
}));
const __VLS_390 = __VLS_389({
    modelValue: (__VLS_ctx.detailVisible),
    title: "管理员详情",
    width: "500px",
}, ...__VLS_functionalComponentArgsRest(__VLS_389));
const { default: __VLS_393 } = __VLS_391.slots;
let __VLS_394;
/** @ts-ignore @type {typeof ___VLS_components.elDescriptions | typeof ___VLS_components.ElDescriptions} */
elDescriptions;
// @ts-ignore
const __VLS_395 = __VLS_asFunctionalComponent(__VLS_394, new __VLS_394({
    column: (1),
    border: true,
}));
const __VLS_396 = __VLS_395({
    column: (1),
    border: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_395));
const { default: __VLS_399 } = __VLS_397.slots;
let __VLS_400;
/** @ts-ignore @type {typeof ___VLS_components.elDescriptionsItem | typeof ___VLS_components.ElDescriptionsItem} */
elDescriptionsItem;
// @ts-ignore
const __VLS_401 = __VLS_asFunctionalComponent(__VLS_400, new __VLS_400({
    label: "ID",
}));
const __VLS_402 = __VLS_401({
    label: "ID",
}, ...__VLS_functionalComponentArgsRest(__VLS_401));
const { default: __VLS_405 } = __VLS_403.slots;
(__VLS_ctx.adminDetail.id);
// @ts-ignore
[detailVisible, adminDetail,];
var __VLS_403;
let __VLS_406;
/** @ts-ignore @type {typeof ___VLS_components.elDescriptionsItem | typeof ___VLS_components.ElDescriptionsItem} */
elDescriptionsItem;
// @ts-ignore
const __VLS_407 = __VLS_asFunctionalComponent(__VLS_406, new __VLS_406({
    label: "用户名",
}));
const __VLS_408 = __VLS_407({
    label: "用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_407));
const { default: __VLS_411 } = __VLS_409.slots;
(__VLS_ctx.adminDetail.username);
// @ts-ignore
[adminDetail,];
var __VLS_409;
let __VLS_412;
/** @ts-ignore @type {typeof ___VLS_components.elDescriptionsItem | typeof ___VLS_components.ElDescriptionsItem} */
elDescriptionsItem;
// @ts-ignore
const __VLS_413 = __VLS_asFunctionalComponent(__VLS_412, new __VLS_412({
    label: "昵称",
}));
const __VLS_414 = __VLS_413({
    label: "昵称",
}, ...__VLS_functionalComponentArgsRest(__VLS_413));
const { default: __VLS_417 } = __VLS_415.slots;
(__VLS_ctx.adminDetail.nickname);
// @ts-ignore
[adminDetail,];
var __VLS_415;
let __VLS_418;
/** @ts-ignore @type {typeof ___VLS_components.elDescriptionsItem | typeof ___VLS_components.ElDescriptionsItem} */
elDescriptionsItem;
// @ts-ignore
const __VLS_419 = __VLS_asFunctionalComponent(__VLS_418, new __VLS_418({
    label: "手机号",
}));
const __VLS_420 = __VLS_419({
    label: "手机号",
}, ...__VLS_functionalComponentArgsRest(__VLS_419));
const { default: __VLS_423 } = __VLS_421.slots;
(__VLS_ctx.adminDetail.phone);
// @ts-ignore
[adminDetail,];
var __VLS_421;
let __VLS_424;
/** @ts-ignore @type {typeof ___VLS_components.elDescriptionsItem | typeof ___VLS_components.ElDescriptionsItem} */
elDescriptionsItem;
// @ts-ignore
const __VLS_425 = __VLS_asFunctionalComponent(__VLS_424, new __VLS_424({
    label: "状态",
}));
const __VLS_426 = __VLS_425({
    label: "状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_425));
const { default: __VLS_429 } = __VLS_427.slots;
let __VLS_430;
/** @ts-ignore @type {typeof ___VLS_components.elTag | typeof ___VLS_components.ElTag} */
elTag;
// @ts-ignore
const __VLS_431 = __VLS_asFunctionalComponent(__VLS_430, new __VLS_430({
    type: (__VLS_ctx.adminDetail.status === 'normal' ? 'success' : 'danger'),
}));
const __VLS_432 = __VLS_431({
    type: (__VLS_ctx.adminDetail.status === 'normal' ? 'success' : 'danger'),
}, ...__VLS_functionalComponentArgsRest(__VLS_431));
const { default: __VLS_435 } = __VLS_433.slots;
(__VLS_ctx.adminDetail.status === "normal" ? "正常" : "已禁用");
// @ts-ignore
[adminDetail, adminDetail,];
var __VLS_433;
// @ts-ignore
[];
var __VLS_427;
let __VLS_436;
/** @ts-ignore @type {typeof ___VLS_components.elDescriptionsItem | typeof ___VLS_components.ElDescriptionsItem} */
elDescriptionsItem;
// @ts-ignore
const __VLS_437 = __VLS_asFunctionalComponent(__VLS_436, new __VLS_436({
    label: "角色",
}));
const __VLS_438 = __VLS_437({
    label: "角色",
}, ...__VLS_functionalComponentArgsRest(__VLS_437));
const { default: __VLS_441 } = __VLS_439.slots;
(__VLS_ctx.adminDetail.role);
// @ts-ignore
[adminDetail,];
var __VLS_439;
let __VLS_442;
/** @ts-ignore @type {typeof ___VLS_components.elDescriptionsItem | typeof ___VLS_components.ElDescriptionsItem} */
elDescriptionsItem;
// @ts-ignore
const __VLS_443 = __VLS_asFunctionalComponent(__VLS_442, new __VLS_442({
    label: "创建时间",
}));
const __VLS_444 = __VLS_443({
    label: "创建时间",
}, ...__VLS_functionalComponentArgsRest(__VLS_443));
const { default: __VLS_447 } = __VLS_445.slots;
(__VLS_ctx.adminDetail.createdAt);
// @ts-ignore
[adminDetail,];
var __VLS_445;
// @ts-ignore
[];
var __VLS_397;
// @ts-ignore
[];
var __VLS_391;
let __VLS_448;
/** @ts-ignore @type {typeof ___VLS_components.elDialog | typeof ___VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_449 = __VLS_asFunctionalComponent(__VLS_448, new __VLS_448({
    modelValue: (__VLS_ctx.banDialogVisible),
    title: "禁用管理员",
    width: "500px",
}));
const __VLS_450 = __VLS_449({
    modelValue: (__VLS_ctx.banDialogVisible),
    title: "禁用管理员",
    width: "500px",
}, ...__VLS_functionalComponentArgsRest(__VLS_449));
const { default: __VLS_453 } = __VLS_451.slots;
let __VLS_454;
/** @ts-ignore @type {typeof ___VLS_components.elForm | typeof ___VLS_components.ElForm} */
elForm;
// @ts-ignore
const __VLS_455 = __VLS_asFunctionalComponent(__VLS_454, new __VLS_454({}));
const __VLS_456 = __VLS_455({}, ...__VLS_functionalComponentArgsRest(__VLS_455));
const { default: __VLS_459 } = __VLS_457.slots;
let __VLS_460;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_461 = __VLS_asFunctionalComponent(__VLS_460, new __VLS_460({
    label: "封禁原因",
    required: true,
}));
const __VLS_462 = __VLS_461({
    label: "封禁原因",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_461));
const { default: __VLS_465 } = __VLS_463.slots;
let __VLS_466;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_467 = __VLS_asFunctionalComponent(__VLS_466, new __VLS_466({
    modelValue: (__VLS_ctx.banReason),
    type: "textarea",
    rows: (4),
    placeholder: "请输入封禁原因",
}));
const __VLS_468 = __VLS_467({
    modelValue: (__VLS_ctx.banReason),
    type: "textarea",
    rows: (4),
    placeholder: "请输入封禁原因",
}, ...__VLS_functionalComponentArgsRest(__VLS_467));
// @ts-ignore
[banDialogVisible, banReason,];
var __VLS_463;
// @ts-ignore
[];
var __VLS_457;
{
    const { footer: __VLS_471 } = __VLS_451.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dialog-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
    let __VLS_472;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_473 = __VLS_asFunctionalComponent(__VLS_472, new __VLS_472({
        ...{ 'onClick': {} },
    }));
    const __VLS_474 = __VLS_473({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_473));
    let __VLS_477;
    const __VLS_478 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.banDialogVisible = false;
                // @ts-ignore
                [banDialogVisible,];
            } });
    const { default: __VLS_479 } = __VLS_475.slots;
    // @ts-ignore
    [];
    var __VLS_475;
    var __VLS_476;
    let __VLS_480;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_481 = __VLS_asFunctionalComponent(__VLS_480, new __VLS_480({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_482 = __VLS_481({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_481));
    let __VLS_485;
    const __VLS_486 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.doToggleStatus(0);
                // @ts-ignore
                [doToggleStatus,];
            } });
    const { default: __VLS_487 } = __VLS_483.slots;
    // @ts-ignore
    [];
    var __VLS_483;
    var __VLS_484;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_451;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
