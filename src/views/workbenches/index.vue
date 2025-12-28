<script setup lang="ts" name="Dashboard">
import { ref, onMounted } from "vue";
import { User, DocumentAdd, UserFilled } from "@element-plus/icons-vue";
import { http } from "@/common/http/instance/default-request";
import { AdminUserService, ClientUserService } from "@/common/api/user";
import { formatDateTime } from "@/common/utils/core/date";

// 定义仪表盘数据接口
interface DashboardSummary {
  totalUsers: number;
  totalContents: number;
  todayUsers: number;
  todayContents: number;
}

// 统计数据
const statistics = ref([
  { title: "用户总量", value: 0, icon: User },
  { title: "内容发布数", value: 0, icon: DocumentAdd },
  { title: "今日新增用户", value: 0, icon: User },
  { title: "今日新增内容", value: 0, icon: DocumentAdd },
]);

// 加载状态
const loading = ref(true);
const usersLoading = ref(false);
const contentLoading = ref(false);

// 定义API响应接口
interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

// 定义用户列表响应接口
interface UserListResponse {
  total: number;
  list: Array<{
    id: number;
    openid: string;
    name: string;
    avatar: string;
    status: number;
    isDeleted: number;
    createTime: string;
    gender?: string;
    region?: string;
  }>;
}

// 定义内容列表响应接口
interface ContentListResponse {
  total: number;
  list: Array<{
    id: number;
    title: string;
    authorId: number;
    createdAt: string;
    authorName?: string;
  }>;
}

// 获取仪表盘数据
const fetchDashboardData = async () => {
  try {
    loading.value = true;
    const res = await http.get<ApiResponse<DashboardSummary>>("http://117.72.201.153:1202/admin/dashboard/summary");

    // 更新统计数据
    statistics.value = [
      { title: "用户总量", value: res.data.totalUsers, icon: User },
      { title: "内容发布数", value: res.data.totalContents, icon: DocumentAdd },
      { title: "今日新增用户", value: res.data.todayUsers, icon: User },
      { title: "今日新增内容", value: res.data.todayContents, icon: DocumentAdd },
    ];
  } catch (error) {
    console.error("获取仪表盘数据失败:", error);
  } finally {
    loading.value = false;
  }
};

// 最近新增用户
const recentUsers = ref<Array<{
  avatar: string;
  nickname: string;
  gender: string;
  region: string;
  registerTime: string;
}>>([]);

// 最近新增内容
const recentContent = ref<Array<{
  title: string;
  creator: string;
  publishTime: string;
}>>([]);

// 获取最近新增用户（前5个）
const fetchRecentUsers = async () => {
  try {
    usersLoading.value = true;
    const params = {
      page: 1,
      size: 5,
      isDeleted: null,
      status: null,
      name: null,
      sortBy: "create_time",
      sortOrder: "desc",
    };

    const res = await AdminUserService.getClientUserList(params);
    if ((res as any).code === 0) {
      const userList = (res as any).data.list || [];
      
      // 直接使用后台接口返回的数据，包含性别和地区
      recentUsers.value = userList.map((user: any) => ({
        avatar: user.avatar || "",
        nickname: user.name || "未知用户",
        gender: user.sex || "未知",
        region: user.area || "未知",
        registerTime: user.createTime || "",
      }));
    }
  } catch (error) {
    console.error("获取最近新增用户失败:", error);
  } finally {
    usersLoading.value = false;
  }
};

// 获取用户名称
const fetchUserName = async (userId: number): Promise<string> => {
  try {
    const res = await AdminUserService.getClientUserDetail(userId);
    if ((res as any).code === 0) {
      return (res as any).data.name || `用户ID: ${userId}`;
    }
    return `用户ID: ${userId}`;
  } catch (error) {
    console.error(`获取用户${userId}信息失败:`, error);
    return `用户ID: ${userId}`;
  }
};

// 获取最近新增内容（前5个）
const fetchRecentContent = async () => {
  try {
    contentLoading.value = true;
    const params = {
      page: 1,
      size: 5,
      isDeleted: 0,
      status: 1,
      tagIds: [],
      keyword: "",
      sortBy: "created_at",
      sortOrder: "desc",
    };

    const res = await http.post<ApiResponse<ContentListResponse>>(
      "http://117.72.201.153:1202/admin/contents/list",
      params
    );

    if (res.code === 0) {
      const contentList = res.data.list || [];
      
      // 获取所有唯一的作者ID
      const uniqueAuthorIds = [...new Set(contentList.map((item: any) => item.authorId))];
      const userNamesMap = new Map<number, string>();

      // 并发获取所有用户名称
      await Promise.all(
        uniqueAuthorIds.map(async (authorId: number) => {
          const userName = await fetchUserName(authorId);
          userNamesMap.set(authorId, userName);
        })
      );

      // 映射内容列表，包含用户名称
      recentContent.value = contentList.map((content: any) => ({
        title: content.title || "无标题",
        creator: userNamesMap.get(content.authorId) || `用户ID: ${content.authorId}`,
        publishTime: content.createdAt || "",
      }));
    }
  } catch (error) {
    console.error("获取最近新增内容失败:", error);
  } finally {
    contentLoading.value = false;
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchDashboardData();
  fetchRecentUsers();
  fetchRecentContent();
});
</script>

<template>
  <div class="dashboard-container">
    <!-- 统计卡片 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in statistics" :key="index">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-item">
            <div class="stat-value">{{ item.value }}</div>
            <div class="stat-title">{{ item.title }}</div>
            <div class="stat-icon">
              <el-icon :size="32"><component :is="item.icon" /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 表格区域 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <!-- 最近新增用户 -->
      <el-col :span="12">
        <el-card shadow="hover" class="table-card">
          <template #header>
            <div class="card-header">
              <span>最近新增用户</span>
            </div>
          </template>
          <el-table :data="recentUsers" stripe border style="width: 100%" v-loading="usersLoading">
            <el-table-column prop="avatar" label="头像" width="80">
              <template #default="scope">
                <el-avatar :size="36" :src="scope.row.avatar">
                  <UserFilled v-if="!scope.row.avatar" />
                </el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" />
            <el-table-column prop="gender" label="性别" width="80" />
            <el-table-column prop="region" label="地区" />
            <el-table-column prop="registerTime" label="注册时间">
              <template #default="scope">
                {{ formatDateTime(scope.row.registerTime) }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <!-- 最近新增内容 -->
      <el-col :span="12">
        <el-card shadow="hover" class="table-card">
          <template #header>
            <div class="card-header">
              <span>最近新增内容</span>
            </div>
          </template>
          <el-table :data="recentContent" stripe border style="width: 100%" v-loading="contentLoading">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="creator" label="创建者昵称" />
            <el-table-column prop="publishTime" label="发布时间">
              <template #default="scope">
                {{ formatDateTime(scope.row.publishTime) }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.stat-card {
  height: 120px;
}

.stat-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #333333;
}

.stat-title {
  margin-top: 8px;
  font-size: 14px;
  color: #666666;
}

.stat-icon {
  color: #409eff;
  opacity: 0.2;
}

.table-card {
  height: 100%;
}

.card-header {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}

:deep(.el-table) {
  font-size: 14px;
}

/* 统一表格行高 */
.dashboard-container :deep(.el-table__body-wrapper .el-table__body tbody tr) {
  height: 56px !important;
  min-height: 56px !important;
  max-height: 56px !important;
}

.dashboard-container :deep(.el-table__body-wrapper .el-table__body tbody tr td) {
  height: 56px !important;
  min-height: 56px !important;
  max-height: 56px !important;
  padding: 10px 0 !important;
  vertical-align: middle !important;
}

.dashboard-container :deep(.el-table__body-wrapper .el-table__body tbody tr td .cell) {
  height: 36px !important;
  line-height: 36px !important;
  display: flex !important;
  align-items: center !important;
  overflow: hidden !important;
}

/* 确保头像不会撑开行高 */
.dashboard-container :deep(.el-table__body-wrapper .el-table__body tbody tr td .cell .el-avatar) {
  flex-shrink: 0 !important;
}
</style>
