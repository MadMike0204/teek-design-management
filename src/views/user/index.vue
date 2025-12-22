<script setup lang="ts" name="UserManagement">
import { ref, reactive } from "vue";
import { UserService } from "@/common/api/user";

// 筛选条件
const filterForm = ref({
  status: "",
  role: "",
});

// 用户列表数据
const userList = ref([
  {
    id: 1,
    username: "user001",
    nickname: "测试用户1",
    email: "user001@example.com",
    phone: "13800138001",
    avatar: "",
    role: "普通用户",
    status: "正常",
    createTime: "2025-12-27 10:30:00",
    lastLoginTime: "2025-12-27 22:30:00",
  },
  {
    id: 2,
    username: "user002",
    nickname: "测试用户2",
    email: "user002@example.com",
    phone: "13800138002",
    avatar: "",
    role: "普通用户",
    status: "禁用",
    createTime: "2025-12-26 15:20:00",
    lastLoginTime: "2025-12-27 18:45:00",
  },
  {
    id: 3,
    username: "user003",
    nickname: "测试用户3",
    email: "user003@example.com",
    phone: "13800138003",
    avatar: "",
    role: "VIP用户",
    status: "正常",
    createTime: "2025-12-25 09:15:00",
    lastLoginTime: "2025-12-27 16:20:00",
  },
  {
    id: 4,
    username: "user004",
    nickname: "测试用户4",
    email: "user004@example.com",
    phone: "13800138004",
    avatar: "",
    role: "普通用户",
    status: "正常",
    createTime: "2025-12-24 14:50:00",
    lastLoginTime: "2025-12-26 20:10:00",
  },
  {
    id: 5,
    username: "user005",
    nickname: "测试用户5",
    email: "user005@example.com",
    phone: "13800138005",
    avatar: "",
    role: "VIP用户",
    status: "禁用",
    createTime: "2025-12-23 11:40:00",
    lastLoginTime: "2025-12-27 08:30:00",
  },
]);

// 分页数据
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 156,
});

// 详情弹窗相关
const dialogVisible = ref(false);
const currentUser = reactive({
  id: 0,
  username: "",
  nickname: "",
  email: "",
  phone: "",
  avatar: "",
  role: "",
  status: "",
  createTime: "",
  lastLoginTime: "",
  description:
    "这是用户的详细信息，由于目前没有API数据，这里显示的是占位文本。在实际应用中，这里会显示从服务器获取的完整用户信息。",
});

// 处理查看详情
const handleView = (row: any) => {
  // 复制数据到当前查看的用户
  Object.assign(currentUser, row);
  // 打开弹窗
  dialogVisible.value = true;
};

// 重置筛选条件
const resetFilter = () => {
  filterForm.value = {
    status: "",
    role: "",
  };
};

// 分页变更
const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
};

// 分页大小变更
const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
  pagination.value.currentPage = 1;
};

// 处理用户状态变更
const handleStatusChange = (row: any) => {
  // 这里可以调用API更新用户状态
  console.log("更新用户状态:", row.id, row.status === "正常" ? "禁用" : "正常");
  row.status = row.status === "正常" ? "禁用" : "正常";
};

// 处理删除用户
const handleDelete = (row: any) => {
  // 这里可以调用API删除用户
  console.log("删除用户:", row.id);
  // 从列表中移除
  const index = userList.value.findIndex(item => item.id === row.id);
  if (index !== -1) {
    userList.value.splice(index, 1);
    pagination.value.total--;
  }
};
</script>

<template>
  <div class="user-management-container">
    <!-- 筛选和操作区域 -->
    <el-card shadow="hover" class="filter-card">
      <div class="filter-content">
        <el-select v-model="filterForm.status" placeholder="用户状态" style="width: 150px; margin-right: 15px">
          <el-option label="正常" value="正常" />
          <el-option label="禁用" value="禁用" />
        </el-select>
        <el-select v-model="filterForm.role" placeholder="用户角色" style="width: 150px; margin-right: 15px">
          <el-option label="普通用户" value="普通用户" />
          <el-option label="VIP用户" value="VIP用户" />
        </el-select>
        <el-button type="primary" style="margin-right: 10px">查询</el-button>
        <el-button @click="resetFilter">重置</el-button>
      </div>
    </el-card>

    <!-- 用户表格 -->
    <el-card shadow="hover" class="table-card" style="margin-top: 20px">
      <el-table :data="userList" stripe border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="nickname" label="昵称" width="120" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="手机号" width="150" />
        <el-table-column prop="role" label="角色" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.role === 'VIP用户' ? 'primary' : 'success'" size="small">
              {{ scope.row.role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="正常"
              inactive-value="禁用"
              @change="handleStatusChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="lastLoginTime" label="最后登录时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-link type="primary" style="margin-right: 10px" @click="handleView(scope.row)">查看</el-link>
            <el-link type="warning" style="margin-right: 10px">编辑</el-link>
            <el-link type="danger" @click="handleDelete(scope.row)">删除</el-link>
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
          <el-avatar :size="80" class="user-avatar">
            {{ currentUser.nickname ? currentUser.nickname.charAt(0) : "U" }}
          </el-avatar>
          <div class="user-info">
            <h3 class="user-name">{{ currentUser.nickname }}</h3>
            <p class="user-username">{{ currentUser.username }}</p>
            <el-tag :type="currentUser.status === '正常' ? 'success' : 'danger'" size="small" class="status-tag">
              {{ currentUser.status }}
            </el-tag>
            <el-tag :type="currentUser.role === 'VIP用户' ? 'primary' : 'success'" size="small" class="role-tag">
              {{ currentUser.role }}
            </el-tag>
          </div>
        </div>
        <div class="detail-body">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="邮箱">{{ currentUser.email }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ currentUser.phone }}</el-descriptions-item>
            <el-descriptions-item label="注册时间">{{ currentUser.createTime }}</el-descriptions-item>
            <el-descriptions-item label="最后登录时间">{{ currentUser.lastLoginTime }}</el-descriptions-item>
            <el-descriptions-item label="用户描述" :span="2">
              {{ currentUser.description }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
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
