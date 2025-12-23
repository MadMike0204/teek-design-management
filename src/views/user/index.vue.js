import { ref, reactive, onMounted } from "vue";
import { UserService } from "@/common/api/user";
import { ElMessage } from "element-plus";
import { User, SwitchButton, Delete as DeleteIcon, Sort, ArrowDown, Search, RefreshRight, Edit, View, } from "@element-plus/icons-vue";
// 筛选条件
const filterForm = ref({
    isDeleted: null,
    status: null,
    name: "",
    sortBy: "create_time",
    sortOrder: "desc",
});
// 用户列表数据
const userList = ref([]);
// 加载状态
const loading = ref(false);
// 分页数据
const pagination = ref({
    currentPage: 1,
    pageSize: 10,
    total: 0,
});
// 详情弹窗相关
const dialogVisible = ref(false);
const currentUser = reactive({
    id: 0,
    openid: "",
    name: "",
    avatar: "",
    status: 0,
    isDeleted: 0,
    createTime: "",
});
// 获取用户列表
const getUserList = async () => {
    loading.value = true;
    try {
        const params = {
            page: pagination.value.currentPage,
            size: pagination.value.pageSize,
            isDeleted: filterForm.value.isDeleted,
            status: filterForm.value.status,
            name: filterForm.value.name || null,
            sortBy: filterForm.value.sortBy,
            sortOrder: filterForm.value.sortOrder,
        };
        const res = await UserService.getClientUserList(params);
        if (res.code === 0) {
            userList.value = res.data.list;
            pagination.value.total = res.data.total;
        }
        else {
            ElMessage.error(res.msg || "获取用户列表失败");
        }
    }
    catch (error) {
        console.error("获取用户列表失败:", error);
        ElMessage.error("获取用户列表失败");
    }
    finally {
        loading.value = false;
    }
};
// 处理查看详情
const handleView = async (row) => {
    // 打开弹窗前先获取最新数据
    try {
        const res = await UserService.getClientUserDetail(row.id);
        if (res.code === 0) {
            // 复制数据到当前查看的用户
            Object.assign(currentUser, res.data);
            // 打开弹窗
            dialogVisible.value = true;
        }
        else {
            ElMessage.error(res.msg || "获取用户详情失败");
        }
    }
    catch (error) {
        console.error("获取用户详情失败:", error);
        ElMessage.error("获取用户详情失败");
    }
};
// 编辑弹窗相关
const editDialogVisible = ref(false);
const editUser = reactive({
    id: 0,
    name: "",
    avatar: "",
});
// 处理编辑用户
const handleEdit = (row) => {
    // 复制数据到编辑用户对象
    editUser.id = row.id;
    editUser.name = row.name;
    editUser.avatar = row.avatar;
    // 打开编辑弹窗
    editDialogVisible.value = true;
};
// 保存用户信息
const saveUser = async () => {
    try {
        const params = {
            id: editUser.id,
            name: editUser.name,
            avatar: editUser.avatar,
        };
        const res = await UserService.updateClientUser(params);
        if (res.code === 0) {
            ElMessage.success("用户信息修改成功");
            editDialogVisible.value = false;
            // 刷新用户列表
            getUserList();
        }
        else {
            ElMessage.error(res.msg || "用户信息修改失败");
        }
    }
    catch (error) {
        console.error("修改用户信息失败:", error);
        ElMessage.error("用户信息修改失败");
    }
};
// 重置筛选条件
const resetFilter = () => {
    filterForm.value = {
        isDeleted: null,
        status: null,
        name: "",
        sortBy: "create_time",
        sortOrder: "desc",
    };
    getUserList();
};
// 查询用户列表
const handleSearch = () => {
    pagination.value.currentPage = 1;
    getUserList();
};
// 分页变更
const handleCurrentChange = (val) => {
    pagination.value.currentPage = val;
    getUserList();
};
// 分页大小变更
const handleSizeChange = (val) => {
    pagination.value.pageSize = val;
    pagination.value.currentPage = 1;
    getUserList();
};
// 处理表格行悬停
const handleRowHover = (row, column, event) => {
    // 可以在这里添加额外的悬停逻辑
};
// 处理用户状态变更
const handleStatusChange = async (row) => {
    try {
        const newStatus = row.status === 1 ? 0 : 1;
        const params = {
            id: row.id,
            status: newStatus,
            banReason: newStatus === 0 ? "管理员操作" : "",
        };
        const res = await UserService.changeClientUserStatus(params);
        if (res.code === 0) {
            row.status = newStatus;
            ElMessage.success("操作成功");
        }
        else {
            // 恢复原状态
            row.status = row.status === 1 ? 0 : 1;
            ElMessage.error(res.msg || "操作失败");
        }
    }
    catch (error) {
        console.error("更新用户状态失败:", error);
        // 恢复原状态
        row.status = row.status === 1 ? 0 : 1;
        ElMessage.error("操作失败");
    }
};
// 处理删除/恢复用户
const handleDelete = async (row) => {
    try {
        const newDeleted = row.isDeleted === 1 ? 0 : 1;
        const params = {
            id: row.id,
            value: newDeleted,
        };
        const res = await UserService.changeClientUserDeleted(params);
        if (res.code === 0) {
            row.isDeleted = newDeleted;
            ElMessage.success(newDeleted === 1 ? "删除成功" : "恢复成功");
            // 刷新列表
            getUserList();
        }
        else {
            ElMessage.error(res.msg || "操作失败");
        }
    }
    catch (error) {
        console.error("操作失败:", error);
        ElMessage.error("操作失败");
    }
};
// 初始加载
onMounted(() => {
    getUserList();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-table__row']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "user-management-container" },
});
/** @type {__VLS_StyleScopedClasses['user-management-container']} */ ;
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
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    modelValue: (__VLS_ctx.filterForm.name),
    placeholder: "用户名",
    ...{ style: {} },
    clearable: true,
}));
const __VLS_8 = __VLS_7({
    modelValue: (__VLS_ctx.filterForm.name),
    placeholder: "用户名",
    ...{ style: {} },
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
{
    const { prefix: __VLS_12 } = __VLS_9.slots;
    let __VLS_13;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const { default: __VLS_18 } = __VLS_16.slots;
    let __VLS_19;
    /** @ts-ignore @type {typeof ___VLS_components.User} */
    User;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({}));
    const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
    // @ts-ignore
    [filterForm,];
    var __VLS_16;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_9;
let __VLS_24;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    modelValue: (__VLS_ctx.filterForm.status),
    placeholder: "用户状态",
    ...{ style: {} },
}));
const __VLS_26 = __VLS_25({
    modelValue: (__VLS_ctx.filterForm.status),
    placeholder: "用户状态",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_29 } = __VLS_27.slots;
{
    const { prefix: __VLS_30 } = __VLS_27.slots;
    let __VLS_31;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({}));
    const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
    const { default: __VLS_36 } = __VLS_34.slots;
    let __VLS_37;
    /** @ts-ignore @type {typeof ___VLS_components.SwitchButton} */
    SwitchButton;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({}));
    const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
    // @ts-ignore
    [filterForm,];
    var __VLS_34;
    // @ts-ignore
    [];
}
let __VLS_42;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    label: "启用",
    value: "1",
}));
const __VLS_44 = __VLS_43({
    label: "启用",
    value: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_47;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
    label: "禁用",
    value: "0",
}));
const __VLS_49 = __VLS_48({
    label: "禁用",
    value: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
// @ts-ignore
[];
var __VLS_27;
let __VLS_52;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    modelValue: (__VLS_ctx.filterForm.isDeleted),
    placeholder: "删除状态",
    ...{ style: {} },
}));
const __VLS_54 = __VLS_53({
    modelValue: (__VLS_ctx.filterForm.isDeleted),
    placeholder: "删除状态",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
const { default: __VLS_57 } = __VLS_55.slots;
{
    const { prefix: __VLS_58 } = __VLS_55.slots;
    let __VLS_59;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({}));
    const __VLS_61 = __VLS_60({}, ...__VLS_functionalComponentArgsRest(__VLS_60));
    const { default: __VLS_64 } = __VLS_62.slots;
    let __VLS_65;
    /** @ts-ignore @type {typeof ___VLS_components.DeleteIcon} */
    DeleteIcon;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({}));
    const __VLS_67 = __VLS_66({}, ...__VLS_functionalComponentArgsRest(__VLS_66));
    // @ts-ignore
    [filterForm,];
    var __VLS_62;
    // @ts-ignore
    [];
}
let __VLS_70;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
    label: "未删除",
    value: "0",
}));
const __VLS_72 = __VLS_71({
    label: "未删除",
    value: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
let __VLS_75;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
    label: "已删除",
    value: "1",
}));
const __VLS_77 = __VLS_76({
    label: "已删除",
    value: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
// @ts-ignore
[];
var __VLS_55;
let __VLS_80;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    modelValue: (__VLS_ctx.filterForm.sortBy),
    placeholder: "排序字段",
    ...{ style: {} },
}));
const __VLS_82 = __VLS_81({
    modelValue: (__VLS_ctx.filterForm.sortBy),
    placeholder: "排序字段",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
const { default: __VLS_85 } = __VLS_83.slots;
{
    const { prefix: __VLS_86 } = __VLS_83.slots;
    let __VLS_87;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({}));
    const __VLS_89 = __VLS_88({}, ...__VLS_functionalComponentArgsRest(__VLS_88));
    const { default: __VLS_92 } = __VLS_90.slots;
    let __VLS_93;
    /** @ts-ignore @type {typeof ___VLS_components.Sort} */
    Sort;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({}));
    const __VLS_95 = __VLS_94({}, ...__VLS_functionalComponentArgsRest(__VLS_94));
    // @ts-ignore
    [filterForm,];
    var __VLS_90;
    // @ts-ignore
    [];
}
let __VLS_98;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
    label: "创建时间",
    value: "create_time",
}));
const __VLS_100 = __VLS_99({
    label: "创建时间",
    value: "create_time",
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
let __VLS_103;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({
    label: "更新时间",
    value: "update_time",
}));
const __VLS_105 = __VLS_104({
    label: "更新时间",
    value: "update_time",
}, ...__VLS_functionalComponentArgsRest(__VLS_104));
// @ts-ignore
[];
var __VLS_83;
let __VLS_108;
/** @ts-ignore @type {typeof ___VLS_components.elSelect | typeof ___VLS_components.ElSelect} */
elSelect;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
    modelValue: (__VLS_ctx.filterForm.sortOrder),
    placeholder: "排序方向",
    ...{ style: {} },
}));
const __VLS_110 = __VLS_109({
    modelValue: (__VLS_ctx.filterForm.sortOrder),
    placeholder: "排序方向",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_109));
const { default: __VLS_113 } = __VLS_111.slots;
{
    const { prefix: __VLS_114 } = __VLS_111.slots;
    let __VLS_115;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({}));
    const __VLS_117 = __VLS_116({}, ...__VLS_functionalComponentArgsRest(__VLS_116));
    const { default: __VLS_120 } = __VLS_118.slots;
    let __VLS_121;
    /** @ts-ignore @type {typeof ___VLS_components.ArrowDown} */
    ArrowDown;
    // @ts-ignore
    const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({}));
    const __VLS_123 = __VLS_122({}, ...__VLS_functionalComponentArgsRest(__VLS_122));
    // @ts-ignore
    [filterForm,];
    var __VLS_118;
    // @ts-ignore
    [];
}
let __VLS_126;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
    label: "升序",
    value: "asc",
}));
const __VLS_128 = __VLS_127({
    label: "升序",
    value: "asc",
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
let __VLS_131;
/** @ts-ignore @type {typeof ___VLS_components.elOption | typeof ___VLS_components.ElOption} */
elOption;
// @ts-ignore
const __VLS_132 = __VLS_asFunctionalComponent(__VLS_131, new __VLS_131({
    label: "降序",
    value: "desc",
}));
const __VLS_133 = __VLS_132({
    label: "降序",
    value: "desc",
}, ...__VLS_functionalComponentArgsRest(__VLS_132));
// @ts-ignore
[];
var __VLS_111;
let __VLS_136;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}));
const __VLS_138 = __VLS_137({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_137));
let __VLS_141;
const __VLS_142 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSearch) });
const { default: __VLS_143 } = __VLS_139.slots;
let __VLS_144;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({}));
const __VLS_146 = __VLS_145({}, ...__VLS_functionalComponentArgsRest(__VLS_145));
const { default: __VLS_149 } = __VLS_147.slots;
let __VLS_150;
/** @ts-ignore @type {typeof ___VLS_components.Search} */
Search;
// @ts-ignore
const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({}));
const __VLS_152 = __VLS_151({}, ...__VLS_functionalComponentArgsRest(__VLS_151));
// @ts-ignore
[handleSearch,];
var __VLS_147;
// @ts-ignore
[];
var __VLS_139;
var __VLS_140;
let __VLS_155;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_156 = __VLS_asFunctionalComponent(__VLS_155, new __VLS_155({
    ...{ 'onClick': {} },
}));
const __VLS_157 = __VLS_156({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_156));
let __VLS_160;
const __VLS_161 = ({ click: {} },
    { onClick: (__VLS_ctx.resetFilter) });
const { default: __VLS_162 } = __VLS_158.slots;
let __VLS_163;
/** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
elIcon;
// @ts-ignore
const __VLS_164 = __VLS_asFunctionalComponent(__VLS_163, new __VLS_163({}));
const __VLS_165 = __VLS_164({}, ...__VLS_functionalComponentArgsRest(__VLS_164));
const { default: __VLS_168 } = __VLS_166.slots;
let __VLS_169;
/** @ts-ignore @type {typeof ___VLS_components.RefreshRight} */
RefreshRight;
// @ts-ignore
const __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169({}));
const __VLS_171 = __VLS_170({}, ...__VLS_functionalComponentArgsRest(__VLS_170));
// @ts-ignore
[resetFilter,];
var __VLS_166;
// @ts-ignore
[];
var __VLS_158;
var __VLS_159;
// @ts-ignore
[];
var __VLS_3;
let __VLS_174;
/** @ts-ignore @type {typeof ___VLS_components.elCard | typeof ___VLS_components.ElCard} */
elCard;
// @ts-ignore
const __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174({
    shadow: "hover",
    ...{ class: "table-card" },
    ...{ style: {} },
}));
const __VLS_176 = __VLS_175({
    shadow: "hover",
    ...{ class: "table-card" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_175));
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
const { default: __VLS_179 } = __VLS_177.slots;
let __VLS_180;
/** @ts-ignore @type {typeof ___VLS_components.elTable | typeof ___VLS_components.ElTable} */
elTable;
// @ts-ignore
const __VLS_181 = __VLS_asFunctionalComponent(__VLS_180, new __VLS_180({
    ...{ 'onRowHover': {} },
    data: (__VLS_ctx.userList),
    stripe: true,
    border: true,
    ...{ style: {} },
    highlightCurrentRow: (true),
}));
const __VLS_182 = __VLS_181({
    ...{ 'onRowHover': {} },
    data: (__VLS_ctx.userList),
    stripe: true,
    border: true,
    ...{ style: {} },
    highlightCurrentRow: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_181));
let __VLS_185;
const __VLS_186 = ({ rowHover: {} },
    { onRowHover: (__VLS_ctx.handleRowHover) });
__VLS_asFunctionalDirective(___VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_187 } = __VLS_183.slots;
let __VLS_188;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_189 = __VLS_asFunctionalComponent(__VLS_188, new __VLS_188({
    prop: "id",
    label: "ID",
    width: "80",
}));
const __VLS_190 = __VLS_189({
    prop: "id",
    label: "ID",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_189));
let __VLS_193;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_194 = __VLS_asFunctionalComponent(__VLS_193, new __VLS_193({
    prop: "openid",
    label: "用户标识",
    width: "200",
}));
const __VLS_195 = __VLS_194({
    prop: "openid",
    label: "用户标识",
    width: "200",
}, ...__VLS_functionalComponentArgsRest(__VLS_194));
let __VLS_198;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_199 = __VLS_asFunctionalComponent(__VLS_198, new __VLS_198({
    prop: "name",
    label: "用户名",
    width: "120",
}));
const __VLS_200 = __VLS_199({
    prop: "name",
    label: "用户名",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_199));
let __VLS_203;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_204 = __VLS_asFunctionalComponent(__VLS_203, new __VLS_203({
    prop: "avatar",
    label: "头像",
    width: "100",
}));
const __VLS_205 = __VLS_204({
    prop: "avatar",
    label: "头像",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_204));
const { default: __VLS_208 } = __VLS_206.slots;
{
    const { default: __VLS_209 } = __VLS_206.slots;
    const [scope] = __VLS_getSlotParameters(__VLS_209);
    let __VLS_210;
    /** @ts-ignore @type {typeof ___VLS_components.elAvatar | typeof ___VLS_components.ElAvatar} */
    elAvatar;
    // @ts-ignore
    const __VLS_211 = __VLS_asFunctionalComponent(__VLS_210, new __VLS_210({
        size: (40),
        src: (scope.row.avatar || ''),
    }));
    const __VLS_212 = __VLS_211({
        size: (40),
        src: (scope.row.avatar || ''),
    }, ...__VLS_functionalComponentArgsRest(__VLS_211));
    // @ts-ignore
    [userList, handleRowHover, vLoading, loading,];
}
// @ts-ignore
[];
var __VLS_206;
let __VLS_215;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_216 = __VLS_asFunctionalComponent(__VLS_215, new __VLS_215({
    prop: "status",
    label: "状态",
    width: "100",
}));
const __VLS_217 = __VLS_216({
    prop: "status",
    label: "状态",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_216));
const { default: __VLS_220 } = __VLS_218.slots;
{
    const { default: __VLS_221 } = __VLS_218.slots;
    const [scope] = __VLS_getSlotParameters(__VLS_221);
    let __VLS_222;
    /** @ts-ignore @type {typeof ___VLS_components.elSwitch | typeof ___VLS_components.ElSwitch} */
    elSwitch;
    // @ts-ignore
    const __VLS_223 = __VLS_asFunctionalComponent(__VLS_222, new __VLS_222({
        ...{ 'onChange': {} },
        modelValue: (scope.row.status),
        activeValue: (1),
        inactiveValue: (0),
    }));
    const __VLS_224 = __VLS_223({
        ...{ 'onChange': {} },
        modelValue: (scope.row.status),
        activeValue: (1),
        inactiveValue: (0),
    }, ...__VLS_functionalComponentArgsRest(__VLS_223));
    let __VLS_227;
    const __VLS_228 = ({ change: {} },
        { onChange: (...[$event]) => {
                __VLS_ctx.handleStatusChange(scope.row);
                // @ts-ignore
                [handleStatusChange,];
            } });
    var __VLS_225;
    var __VLS_226;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_218;
let __VLS_229;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_230 = __VLS_asFunctionalComponent(__VLS_229, new __VLS_229({
    prop: "isDeleted",
    label: "删除状态",
    width: "120",
}));
const __VLS_231 = __VLS_230({
    prop: "isDeleted",
    label: "删除状态",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_230));
const { default: __VLS_234 } = __VLS_232.slots;
{
    const { default: __VLS_235 } = __VLS_232.slots;
    const [scope] = __VLS_getSlotParameters(__VLS_235);
    let __VLS_236;
    /** @ts-ignore @type {typeof ___VLS_components.elTag | typeof ___VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_237 = __VLS_asFunctionalComponent(__VLS_236, new __VLS_236({
        type: (scope.row.isDeleted === 1 ? 'danger' : 'success'),
        size: "small",
    }));
    const __VLS_238 = __VLS_237({
        type: (scope.row.isDeleted === 1 ? 'danger' : 'success'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_237));
    const { default: __VLS_241 } = __VLS_239.slots;
    (scope.row.isDeleted === 1 ? "已删除" : "未删除");
    // @ts-ignore
    [];
    var __VLS_239;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_232;
let __VLS_242;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_243 = __VLS_asFunctionalComponent(__VLS_242, new __VLS_242({
    prop: "createTime",
    label: "创建时间",
    width: "180",
}));
const __VLS_244 = __VLS_243({
    prop: "createTime",
    label: "创建时间",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_243));
let __VLS_247;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_248 = __VLS_asFunctionalComponent(__VLS_247, new __VLS_247({
    label: "操作",
    width: "300",
}));
const __VLS_249 = __VLS_248({
    label: "操作",
    width: "300",
}, ...__VLS_functionalComponentArgsRest(__VLS_248));
const { default: __VLS_252 } = __VLS_250.slots;
{
    const { default: __VLS_253 } = __VLS_250.slots;
    const [scope] = __VLS_getSlotParameters(__VLS_253);
    let __VLS_254;
    /** @ts-ignore @type {typeof ___VLS_components.elLink | typeof ___VLS_components.ElLink} */
    elLink;
    // @ts-ignore
    const __VLS_255 = __VLS_asFunctionalComponent(__VLS_254, new __VLS_254({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }));
    const __VLS_256 = __VLS_255({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_255));
    let __VLS_259;
    const __VLS_260 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleView(scope.row);
                // @ts-ignore
                [handleView,];
            } });
    const { default: __VLS_261 } = __VLS_257.slots;
    let __VLS_262;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_263 = __VLS_asFunctionalComponent(__VLS_262, new __VLS_262({}));
    const __VLS_264 = __VLS_263({}, ...__VLS_functionalComponentArgsRest(__VLS_263));
    const { default: __VLS_267 } = __VLS_265.slots;
    let __VLS_268;
    /** @ts-ignore @type {typeof ___VLS_components.View} */
    View;
    // @ts-ignore
    const __VLS_269 = __VLS_asFunctionalComponent(__VLS_268, new __VLS_268({}));
    const __VLS_270 = __VLS_269({}, ...__VLS_functionalComponentArgsRest(__VLS_269));
    // @ts-ignore
    [];
    var __VLS_265;
    // @ts-ignore
    [];
    var __VLS_257;
    var __VLS_258;
    let __VLS_273;
    /** @ts-ignore @type {typeof ___VLS_components.elLink | typeof ___VLS_components.ElLink} */
    elLink;
    // @ts-ignore
    const __VLS_274 = __VLS_asFunctionalComponent(__VLS_273, new __VLS_273({
        ...{ 'onClick': {} },
        type: "warning",
        ...{ style: {} },
    }));
    const __VLS_275 = __VLS_274({
        ...{ 'onClick': {} },
        type: "warning",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_274));
    let __VLS_278;
    const __VLS_279 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleEdit(scope.row);
                // @ts-ignore
                [handleEdit,];
            } });
    const { default: __VLS_280 } = __VLS_276.slots;
    let __VLS_281;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_282 = __VLS_asFunctionalComponent(__VLS_281, new __VLS_281({}));
    const __VLS_283 = __VLS_282({}, ...__VLS_functionalComponentArgsRest(__VLS_282));
    const { default: __VLS_286 } = __VLS_284.slots;
    let __VLS_287;
    /** @ts-ignore @type {typeof ___VLS_components.Edit} */
    Edit;
    // @ts-ignore
    const __VLS_288 = __VLS_asFunctionalComponent(__VLS_287, new __VLS_287({}));
    const __VLS_289 = __VLS_288({}, ...__VLS_functionalComponentArgsRest(__VLS_288));
    // @ts-ignore
    [];
    var __VLS_284;
    // @ts-ignore
    [];
    var __VLS_276;
    var __VLS_277;
    let __VLS_292;
    /** @ts-ignore @type {typeof ___VLS_components.elLink | typeof ___VLS_components.ElLink} */
    elLink;
    // @ts-ignore
    const __VLS_293 = __VLS_asFunctionalComponent(__VLS_292, new __VLS_292({
        ...{ 'onClick': {} },
        type: (scope.row.isDeleted === 1 ? 'success' : 'danger'),
    }));
    const __VLS_294 = __VLS_293({
        ...{ 'onClick': {} },
        type: (scope.row.isDeleted === 1 ? 'success' : 'danger'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_293));
    let __VLS_297;
    const __VLS_298 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleDelete(scope.row);
                // @ts-ignore
                [handleDelete,];
            } });
    const { default: __VLS_299 } = __VLS_295.slots;
    let __VLS_300;
    /** @ts-ignore @type {typeof ___VLS_components.elIcon | typeof ___VLS_components.ElIcon} */
    elIcon;
    // @ts-ignore
    const __VLS_301 = __VLS_asFunctionalComponent(__VLS_300, new __VLS_300({}));
    const __VLS_302 = __VLS_301({}, ...__VLS_functionalComponentArgsRest(__VLS_301));
    const { default: __VLS_305 } = __VLS_303.slots;
    let __VLS_306;
    /** @ts-ignore @type {typeof ___VLS_components.DeleteIcon} */
    DeleteIcon;
    // @ts-ignore
    const __VLS_307 = __VLS_asFunctionalComponent(__VLS_306, new __VLS_306({}));
    const __VLS_308 = __VLS_307({}, ...__VLS_functionalComponentArgsRest(__VLS_307));
    // @ts-ignore
    [];
    var __VLS_303;
    // @ts-ignore
    [];
    var __VLS_295;
    var __VLS_296;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_250;
// @ts-ignore
[];
var __VLS_183;
var __VLS_184;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pagination-container" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['pagination-container']} */ ;
let __VLS_311;
/** @ts-ignore @type {typeof ___VLS_components.elPagination | typeof ___VLS_components.ElPagination} */
elPagination;
// @ts-ignore
const __VLS_312 = __VLS_asFunctionalComponent(__VLS_311, new __VLS_311({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.pagination.currentPage),
    pageSize: (__VLS_ctx.pagination.pageSize),
    pageSizes: ([10, 20, 50, 100]),
    layout: "total, sizes, prev, pager, next, jumper",
    total: (__VLS_ctx.pagination.total),
}));
const __VLS_313 = __VLS_312({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.pagination.currentPage),
    pageSize: (__VLS_ctx.pagination.pageSize),
    pageSizes: ([10, 20, 50, 100]),
    layout: "total, sizes, prev, pager, next, jumper",
    total: (__VLS_ctx.pagination.total),
}, ...__VLS_functionalComponentArgsRest(__VLS_312));
let __VLS_316;
const __VLS_317 = ({ sizeChange: {} },
    { onSizeChange: (__VLS_ctx.handleSizeChange) });
const __VLS_318 = ({ currentChange: {} },
    { onCurrentChange: (__VLS_ctx.handleCurrentChange) });
var __VLS_314;
var __VLS_315;
// @ts-ignore
[pagination, pagination, pagination, handleSizeChange, handleCurrentChange,];
var __VLS_177;
let __VLS_319;
/** @ts-ignore @type {typeof ___VLS_components.elDialog | typeof ___VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_320 = __VLS_asFunctionalComponent(__VLS_319, new __VLS_319({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "用户详情",
    width: "800px",
    center: true,
}));
const __VLS_321 = __VLS_320({
    modelValue: (__VLS_ctx.dialogVisible),
    title: "用户详情",
    width: "800px",
    center: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_320));
const { default: __VLS_324 } = __VLS_322.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "user-detail" },
});
/** @type {__VLS_StyleScopedClasses['user-detail']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "detail-header" },
});
/** @type {__VLS_StyleScopedClasses['detail-header']} */ ;
let __VLS_325;
/** @ts-ignore @type {typeof ___VLS_components.elAvatar | typeof ___VLS_components.ElAvatar} */
elAvatar;
// @ts-ignore
const __VLS_326 = __VLS_asFunctionalComponent(__VLS_325, new __VLS_325({
    size: (80),
    src: (__VLS_ctx.currentUser.avatar || ''),
    ...{ class: "user-avatar" },
}));
const __VLS_327 = __VLS_326({
    size: (80),
    src: (__VLS_ctx.currentUser.avatar || ''),
    ...{ class: "user-avatar" },
}, ...__VLS_functionalComponentArgsRest(__VLS_326));
/** @type {__VLS_StyleScopedClasses['user-avatar']} */ ;
const { default: __VLS_330 } = __VLS_328.slots;
(__VLS_ctx.currentUser.name ? __VLS_ctx.currentUser.name.charAt(0) : "U");
// @ts-ignore
[dialogVisible, currentUser, currentUser, currentUser,];
var __VLS_328;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "user-info" },
});
/** @type {__VLS_StyleScopedClasses['user-info']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "user-name" },
});
/** @type {__VLS_StyleScopedClasses['user-name']} */ ;
(__VLS_ctx.currentUser.name);
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "user-username" },
});
/** @type {__VLS_StyleScopedClasses['user-username']} */ ;
(__VLS_ctx.currentUser.openid);
let __VLS_331;
/** @ts-ignore @type {typeof ___VLS_components.elTag | typeof ___VLS_components.ElTag} */
elTag;
// @ts-ignore
const __VLS_332 = __VLS_asFunctionalComponent(__VLS_331, new __VLS_331({
    type: (__VLS_ctx.currentUser.status === 1 ? 'success' : 'danger'),
    size: "small",
    ...{ class: "status-tag" },
}));
const __VLS_333 = __VLS_332({
    type: (__VLS_ctx.currentUser.status === 1 ? 'success' : 'danger'),
    size: "small",
    ...{ class: "status-tag" },
}, ...__VLS_functionalComponentArgsRest(__VLS_332));
/** @type {__VLS_StyleScopedClasses['status-tag']} */ ;
const { default: __VLS_336 } = __VLS_334.slots;
(__VLS_ctx.currentUser.status === 1 ? "启用" : "禁用");
// @ts-ignore
[currentUser, currentUser, currentUser, currentUser,];
var __VLS_334;
let __VLS_337;
/** @ts-ignore @type {typeof ___VLS_components.elTag | typeof ___VLS_components.ElTag} */
elTag;
// @ts-ignore
const __VLS_338 = __VLS_asFunctionalComponent(__VLS_337, new __VLS_337({
    type: (__VLS_ctx.currentUser.isDeleted === 1 ? 'danger' : 'success'),
    size: "small",
    ...{ class: "role-tag" },
}));
const __VLS_339 = __VLS_338({
    type: (__VLS_ctx.currentUser.isDeleted === 1 ? 'danger' : 'success'),
    size: "small",
    ...{ class: "role-tag" },
}, ...__VLS_functionalComponentArgsRest(__VLS_338));
/** @type {__VLS_StyleScopedClasses['role-tag']} */ ;
const { default: __VLS_342 } = __VLS_340.slots;
(__VLS_ctx.currentUser.isDeleted === 1 ? "已删除" : "未删除");
// @ts-ignore
[currentUser, currentUser,];
var __VLS_340;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "detail-body" },
});
/** @type {__VLS_StyleScopedClasses['detail-body']} */ ;
let __VLS_343;
/** @ts-ignore @type {typeof ___VLS_components.elDescriptions | typeof ___VLS_components.ElDescriptions} */
elDescriptions;
// @ts-ignore
const __VLS_344 = __VLS_asFunctionalComponent(__VLS_343, new __VLS_343({
    column: (2),
    border: true,
}));
const __VLS_345 = __VLS_344({
    column: (2),
    border: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_344));
const { default: __VLS_348 } = __VLS_346.slots;
let __VLS_349;
/** @ts-ignore @type {typeof ___VLS_components.elDescriptionsItem | typeof ___VLS_components.ElDescriptionsItem} */
elDescriptionsItem;
// @ts-ignore
const __VLS_350 = __VLS_asFunctionalComponent(__VLS_349, new __VLS_349({
    label: "创建时间",
}));
const __VLS_351 = __VLS_350({
    label: "创建时间",
}, ...__VLS_functionalComponentArgsRest(__VLS_350));
const { default: __VLS_354 } = __VLS_352.slots;
(__VLS_ctx.currentUser.createTime);
// @ts-ignore
[currentUser,];
var __VLS_352;
// @ts-ignore
[];
var __VLS_346;
{
    const { footer: __VLS_355 } = __VLS_322.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dialog-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
    let __VLS_356;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_357 = __VLS_asFunctionalComponent(__VLS_356, new __VLS_356({
        ...{ 'onClick': {} },
    }));
    const __VLS_358 = __VLS_357({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_357));
    let __VLS_361;
    const __VLS_362 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.dialogVisible = false;
                // @ts-ignore
                [dialogVisible,];
            } });
    const { default: __VLS_363 } = __VLS_359.slots;
    // @ts-ignore
    [];
    var __VLS_359;
    var __VLS_360;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_322;
let __VLS_364;
/** @ts-ignore @type {typeof ___VLS_components.elDialog | typeof ___VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_365 = __VLS_asFunctionalComponent(__VLS_364, new __VLS_364({
    modelValue: (__VLS_ctx.editDialogVisible),
    title: "编辑用户",
    width: "500px",
}));
const __VLS_366 = __VLS_365({
    modelValue: (__VLS_ctx.editDialogVisible),
    title: "编辑用户",
    width: "500px",
}, ...__VLS_functionalComponentArgsRest(__VLS_365));
const { default: __VLS_369 } = __VLS_367.slots;
let __VLS_370;
/** @ts-ignore @type {typeof ___VLS_components.elForm | typeof ___VLS_components.ElForm} */
elForm;
// @ts-ignore
const __VLS_371 = __VLS_asFunctionalComponent(__VLS_370, new __VLS_370({
    labelPosition: "top",
    labelWidth: "80px",
}));
const __VLS_372 = __VLS_371({
    labelPosition: "top",
    labelWidth: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_371));
const { default: __VLS_375 } = __VLS_373.slots;
let __VLS_376;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_377 = __VLS_asFunctionalComponent(__VLS_376, new __VLS_376({
    label: "用户名",
}));
const __VLS_378 = __VLS_377({
    label: "用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_377));
const { default: __VLS_381 } = __VLS_379.slots;
let __VLS_382;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_383 = __VLS_asFunctionalComponent(__VLS_382, new __VLS_382({
    modelValue: (__VLS_ctx.editUser.name),
    placeholder: "请输入用户名",
}));
const __VLS_384 = __VLS_383({
    modelValue: (__VLS_ctx.editUser.name),
    placeholder: "请输入用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_383));
// @ts-ignore
[editDialogVisible, editUser,];
var __VLS_379;
let __VLS_387;
/** @ts-ignore @type {typeof ___VLS_components.elFormItem | typeof ___VLS_components.ElFormItem} */
elFormItem;
// @ts-ignore
const __VLS_388 = __VLS_asFunctionalComponent(__VLS_387, new __VLS_387({
    label: "头像URL",
}));
const __VLS_389 = __VLS_388({
    label: "头像URL",
}, ...__VLS_functionalComponentArgsRest(__VLS_388));
const { default: __VLS_392 } = __VLS_390.slots;
let __VLS_393;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_394 = __VLS_asFunctionalComponent(__VLS_393, new __VLS_393({
    modelValue: (__VLS_ctx.editUser.avatar),
    placeholder: "请输入头像URL",
}));
const __VLS_395 = __VLS_394({
    modelValue: (__VLS_ctx.editUser.avatar),
    placeholder: "请输入头像URL",
}, ...__VLS_functionalComponentArgsRest(__VLS_394));
// @ts-ignore
[editUser,];
var __VLS_390;
// @ts-ignore
[];
var __VLS_373;
{
    const { footer: __VLS_398 } = __VLS_367.slots;
    let __VLS_399;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_400 = __VLS_asFunctionalComponent(__VLS_399, new __VLS_399({
        ...{ 'onClick': {} },
    }));
    const __VLS_401 = __VLS_400({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_400));
    let __VLS_404;
    const __VLS_405 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.editDialogVisible = false;
                // @ts-ignore
                [editDialogVisible,];
            } });
    const { default: __VLS_406 } = __VLS_402.slots;
    // @ts-ignore
    [];
    var __VLS_402;
    var __VLS_403;
    let __VLS_407;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_408 = __VLS_asFunctionalComponent(__VLS_407, new __VLS_407({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_409 = __VLS_408({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_408));
    let __VLS_412;
    const __VLS_413 = ({ click: {} },
        { onClick: (__VLS_ctx.saveUser) });
    const { default: __VLS_414 } = __VLS_410.slots;
    // @ts-ignore
    [saveUser,];
    var __VLS_410;
    var __VLS_411;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_367;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
