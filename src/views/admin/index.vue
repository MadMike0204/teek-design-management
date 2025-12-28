<template>
  <div :class="ns.b()" class="admin-management-container">
    <div :class="ns.e('header')" class="flx-align-center">
      <h2>{{ "管理员管理" }}</h2>
      <el-button type="primary" @click="handleAddDefaultAdmin" style="margin-left: 20px">
        <el-icon><Plus /></el-icon>
        创建初始管理员
      </el-button>
    </div>
    <!-- 搜索和筛选区域 -->
    <el-card shadow="hover" class="filter-card">
      <div :class="ns.e('search-filter')" class="flx-align-center filter-content">
        <el-input v-model="searchForm.username" placeholder="用户名" style="width: 200px; margin-right: 15px" clearable>
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
        <el-input v-model="searchForm.nickname" placeholder="昵称" style="width: 200px; margin-right: 15px" clearable>
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
        <el-select v-model="searchForm.status" placeholder="管理员状态" style="width: 150px; margin-right: 15px">
          <template #prefix>
            <el-icon><SwitchButton /></el-icon>
          </template>
          <el-option label="未指定" value="" />
          <el-option label="正常" value="normal" />
          <el-option label="已禁用" value="disabled" />
        </el-select>
        <el-select v-model="searchForm.isDeleted" placeholder="删除状态" style="width: 150px; margin-right: 15px">
          <template #prefix>
            <el-icon><DeleteIcon /></el-icon>
          </template>
          <el-option label="未指定" value="" />
          <el-option label="正常" :value="0" />
          <el-option label="已删除" :value="1" />
        </el-select>
        <el-button type="primary" style="margin-right: 10px" @click="handleSearch">
          <el-icon><Search /></el-icon>
          查询
        </el-button>
        <el-button @click="resetForm">
          <el-icon><RefreshRight /></el-icon>
          重置
        </el-button>
      </div>
    </el-card>

    <!-- 表格区域 -->
    <el-card shadow="hover" class="table-card" style="margin-top: 20px">
      <el-table
        :data="adminList"
        style="width: 100%"
        stripe
        border
        v-loading="loading"
        :highlight-current-row="true"
        @row-hover="handleRowHover"
      >
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="avatar" label="头像" width="100">
          <template #default="scope">
            <el-avatar :size="40" :src="scope.row.avatar || ''" />
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="150" />
        <el-table-column prop="status" label="管理员状态" width="120">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
              {{ scope.row.status === 1 ? "正常" : "已禁用" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="350">
          <template #default="scope">
            <el-link type="primary" style="margin-right: 15px" @click="handleView(scope.row)">
              <el-icon><View /></el-icon>
              查看详情
            </el-link>
            <el-link type="warning" style="margin-right: 15px" @click="handleEdit(scope.row)">
              <el-icon><Edit /></el-icon>
              编辑
            </el-link>
            <el-link
              :type="scope.row.status === 1 ? 'warning' : 'success'"
              style="margin-right: 15px"
              @click="handleToggleStatus(scope.row)"
            >
              <el-icon><SwitchButton /></el-icon>
              {{ scope.row.status === 1 ? "禁用" : "启用" }}
            </el-link>
            <el-link type="danger" @click="handleDelete(scope.row)">
              <el-icon><DeleteIcon /></el-icon>
              删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <div class="pagination-container" style="margin-top: 20px; text-align: center">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑管理员" width="500px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" disabled />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="仅允许英文和数字" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入中国手机号" />
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="formData.avatar" placeholder="头像URL" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 详情对话框 -->
    <el-dialog v-model="detailVisible" title="管理员详情" width="500px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="ID">{{ adminDetail.id }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ adminDetail.username }}</el-descriptions-item>
        <el-descriptions-item label="昵称">{{ adminDetail.nickname }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ adminDetail.phone }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="adminDetail.status === 1 ? 'success' : 'danger'">
            {{ adminDetail.status === 1 ? "正常" : "已禁用" }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="角色">{{ adminDetail.role }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ adminDetail.createdAt }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 封禁原因对话框 -->
    <el-dialog v-model="banDialogVisible" title="禁用管理员" width="500px">
      <el-form>
        <el-form-item label="封禁原因" required>
          <el-input v-model="banReason" type="textarea" :rows="4" placeholder="请输入封禁原因" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="banDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="doToggleStatus(0)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { AdminUserService } from "@/common/api/user";
import { useNamespace } from "@/composables";
import {
  User,
  Edit,
  View,
  SwitchButton,
  Delete as DeleteIcon,
  Search,
  RefreshRight,
  Plus,
} from "@element-plus/icons-vue";

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
const currentRow = ref<any>(null);
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
  status: 1,
  isDeleted: 0,
  role: 0,
  createdAt: "",
});

// 查看详情
const handleView = async (row: any) => {
  try {
    const res = await AdminUserService.getAdminDetail(row.id);
    if ((res as any).code === 0) {
      Object.assign(adminDetail, (res as any).data);
      detailVisible.value = true;
    } else {
      ElMessage.error((res as any).msg || "获取管理员详情失败");
    }
  } catch (error) {
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
      isDeleted: searchForm.isDeleted === "" ? null : Number(searchForm.isDeleted),
      status: searchForm.status === "" ? null : searchForm.status === "normal" ? 1 : searchForm.status === "disabled" ? 0 : null,
      name: searchForm.username || searchForm.nickname || null,
      sortBy: sortParams.sortBy,
      sortOrder: sortParams.sortOrder,
    };
    const res = await AdminUserService.getAdminList(params);
    adminList.value = (res as any).data.list;
    pagination.total = (res as any).data.total;
  } catch (error) {
    ElMessage.error("获取管理员列表失败");
    console.error("获取管理员列表失败:", error);
  } finally {
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
const handleSizeChange = (size: number) => {
  pagination.pageSize = size;
  getAdminList();
};

// 分页当前页变化
const handleCurrentChange = (current: number) => {
  pagination.page = current;
  getAdminList();
};

// 处理表格行悬停
const handleRowHover = (row: any, column: any, event: any) => {
  // 可以在这里添加额外的悬停逻辑
};

// 编辑
const handleEdit = (row: any) => {
  dialogVisible.value = true;
  Object.assign(formData, row);
};

// 切换状态
const handleToggleStatus = (row: any) => {
  currentRow.value = row;
  if (row.status === 1) {
    // 禁用操作需要输入封禁原因
    banReason.value = "";
    banDialogVisible.value = true;
  } else {
    // 启用操作直接执行
    doToggleStatus(1);
  }
};

// 执行状态切换
const doToggleStatus = async (status: number) => {
  try {
    const params = {
      id: currentRow.value.id,
      status,
      ...(status === 0 ? { banReason: banReason.value } : {}),
    };

    const res = await AdminUserService.changeAdminStatus(params);
    if ((res as any).code === 0) {
      ElMessage.success("状态更新成功");
      getAdminList();
      banDialogVisible.value = false;
    } else {
      ElMessage.error((res as any).msg || "状态更新失败");
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.msg || "状态更新失败");
    console.error("状态更新失败:", error);
  }
};

// 删除
const handleDelete = async (row: any) => {
  try {
    await AdminUserService.deleteAdmin(row.id);
    ElMessage.success("删除成功");
    getAdminList();
  } catch (error) {
    ElMessage.error("删除失败");
    console.error("删除失败:", error);
  }
};

// 创建初始管理员
const handleAddDefaultAdmin = async () => {
  try {
    const res = await AdminUserService.addDefaultAdmin();
    if ((res as any).code === 0) {
      ElMessage.success("初始管理员创建成功，默认账号：admin，密码：123456+六位随机数");
      getAdminList();
    } else {
      ElMessage.error((res as any).msg || "初始管理员创建失败");
    }
  } catch (error) {
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

    const res = await AdminUserService.updateAdmin(formData);
    if ((res as any).code === 0) {
      ElMessage.success("编辑成功");
      dialogVisible.value = false;
      getAdminList();
    } else {
      ElMessage.error((res as any).msg || "编辑失败");
    }
  } catch (error: any) {
    ElMessage.error(error.response?.data?.msg || "编辑失败");
    console.error("编辑失败:", error);
  }
};

// 初始化
onMounted(() => {
  getAdminList();
});
</script>

<style scoped>
.admin-management-container {
  padding: 20px;
}

.search-filter {
  margin-bottom: 20px;
}

.filter-card,
.table-card {
  height: 100%;
}

.filter-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
}

:deep(.el-table) {
  font-size: 14px;
}

:deep(.el-table__row) {
  transition: all 0.3s ease;
}

:deep(.el-table__row:hover) {
  background-color: #f0f9ff !important;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

:deep(.el-table__current-row) {
  background-color: #e6f7ff !important;
}
</style>
