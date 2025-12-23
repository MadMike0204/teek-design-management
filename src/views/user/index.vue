<script setup lang="ts" name="UserManagement">
import { ref, reactive, onMounted } from "vue";
import { UserService } from "@/common/api/user";
import { ElMessage } from "element-plus";

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
    } else {
      ElMessage.error(res.msg || "获取用户列表失败");
    }
  } catch (error) {
    console.error("获取用户列表失败:", error);
    ElMessage.error("获取用户列表失败");
  } finally {
    loading.value = false;
  }
};

// 处理查看详情
const handleView = async (row: any) => {
  // 打开弹窗前先获取最新数据
  try {
    const res = await UserService.getClientUserDetail(row.id);
    if (res.code === 0) {
      // 复制数据到当前查看的用户
      Object.assign(currentUser, res.data);
      // 打开弹窗
      dialogVisible.value = true;
    } else {
      ElMessage.error(res.msg || "获取用户详情失败");
    }
  } catch (error) {
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
const handleEdit = (row: any) => {
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
    } else {
      ElMessage.error(res.msg || "用户信息修改失败");
    }
  } catch (error) {
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
const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
  getUserList();
};

// 分页大小变更
const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
  pagination.value.currentPage = 1;
  getUserList();
};

// 处理用户状态变更
const handleStatusChange = async (row: any) => {
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
    } else {
      // 恢复原状态
      row.status = row.status === 1 ? 0 : 1;
      ElMessage.error(res.msg || "操作失败");
    }
  } catch (error) {
    console.error("更新用户状态失败:", error);
    // 恢复原状态
    row.status = row.status === 1 ? 0 : 1;
    ElMessage.error("操作失败");
  }
};

// 处理删除/恢复用户
const handleDelete = async (row: any) => {
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
    } else {
      ElMessage.error(res.msg || "操作失败");
    }
  } catch (error) {
    console.error("操作失败:", error);
    ElMessage.error("操作失败");
  }
};

// 初始加载
onMounted(() => {
  getUserList();
});
</script>

<template>
  <div class="user-management-container">
    <!-- 筛选和操作区域 -->
    <el-card shadow="hover" class="filter-card">
      <div class="filter-content">
        <el-input v-model="filterForm.name" placeholder="用户名" style="width: 200px; margin-right: 15px" clearable />
        <el-select v-model="filterForm.status" placeholder="用户状态" style="width: 150px; margin-right: 15px">
          <el-option label="启用" value="1" />
          <el-option label="禁用" value="0" />
        </el-select>
        <el-select v-model="filterForm.isDeleted" placeholder="删除状态" style="width: 150px; margin-right: 15px">
          <el-option label="未删除" value="0" />
          <el-option label="已删除" value="1" />
        </el-select>
        <el-select v-model="filterForm.sortBy" placeholder="排序字段" style="width: 150px; margin-right: 15px">
          <el-option label="创建时间" value="create_time" />
          <el-option label="更新时间" value="update_time" />
        </el-select>
        <el-select v-model="filterForm.sortOrder" placeholder="排序方向" style="width: 100px; margin-right: 15px">
          <el-option label="升序" value="asc" />
          <el-option label="降序" value="desc" />
        </el-select>
        <el-button type="primary" style="margin-right: 10px" @click="handleSearch">查询</el-button>
        <el-button @click="resetFilter">重置</el-button>
      </div>
    </el-card>

    <!-- 用户表格 -->
    <el-card shadow="hover" class="table-card" style="margin-top: 20px">
      <el-table :data="userList" stripe border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="openid" label="用户标识" width="200" />
        <el-table-column prop="name" label="用户名" width="120" />
        <el-table-column prop="avatar" label="头像" width="100">
          <template #default="scope">
            <el-avatar :size="40" :src="scope.row.avatar || ''" />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="isDeleted" label="删除状态" width="120">
          <template #default="scope">
            <el-tag :type="scope.row.isDeleted === 1 ? 'danger' : 'success'" size="small">
              {{ scope.row.isDeleted === 1 ? "已删除" : "未删除" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="250">
          <template #default="scope">
            <el-link type="primary" style="margin-right: 10px" @click="handleView(scope.row)">查看</el-link>
            <el-link type="warning" style="margin-right: 10px" @click="handleEdit(scope.row)">编辑</el-link>
            <el-link :type="scope.row.isDeleted === 1 ? 'success' : 'danger'" @click="handleDelete(scope.row)">
              {{ scope.row.isDeleted === 1 ? "恢复" : "删除" }}
            </el-link>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页控件 -->
      <div class="pagination-container" style="margin-top: 20px; text-align: center">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 详情弹窗 -->
    <el-dialog v-model="dialogVisible" title="用户详情" width="800px" center>
      <div class="user-detail">
        <div class="detail-header">
          <el-avatar :size="80" :src="currentUser.avatar || ''" class="user-avatar">
            {{ currentUser.name ? currentUser.name.charAt(0) : "U" }}
          </el-avatar>
          <div class="user-info">
            <h3 class="user-name">{{ currentUser.name }}</h3>
            <p class="user-username">{{ currentUser.openid }}</p>
            <el-tag :type="currentUser.status === 1 ? 'success' : 'danger'" size="small" class="status-tag">
              {{ currentUser.status === 1 ? "启用" : "禁用" }}
            </el-tag>
            <el-tag :type="currentUser.isDeleted === 1 ? 'danger' : 'success'" size="small" class="role-tag">
              {{ currentUser.isDeleted === 1 ? "已删除" : "未删除" }}
            </el-tag>
          </div>
        </div>
        <div class="detail-body">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="创建时间">{{ currentUser.createTime }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="editDialogVisible" title="编辑用户" width="500px">
      <el-form label-position="top" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editUser.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="头像URL">
          <el-input v-model="editUser.avatar" placeholder="请输入头像URL" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.user-management-container {
  padding: 20px;
}

.filter-card {
  height: 100%;
}

.filter-content {
  display: flex;
  align-items: center;
}

.table-card {
  height: 100%;
}

:deep(.el-table) {
  font-size: 14px;
}

/* 详情弹窗样式 */
.user-detail {
  padding: 20px 0;
}

.detail-header {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid #ebeef5;
}

.user-avatar {
  margin-right: 30px;
  font-size: 32px;
  color: white;
  background-color: #409eff;
}

.user-info {
  flex: 1;
}

.user-name {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 600;
  color: #333333;
}

.user-username {
  margin: 0 0 12px;
  font-size: 14px;
  color: #909399;
}

.status-tag,
.role-tag {
  margin-right: 10px;
}

.detail-body {
  margin-top: 20px;
}

:deep(.el-descriptions__label) {
  font-weight: 600;
}
</style>
