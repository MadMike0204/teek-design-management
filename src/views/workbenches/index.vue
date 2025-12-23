<script setup lang="ts" name="Dashboard">
import { ref, onMounted } from "vue";
import { User, DocumentAdd, UserFilled } from "@element-plus/icons-vue";
import { http } from "@/common/http/instance/default-request";

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

// 定义API响应接口
interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
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
          <el-table :data="recentUsers" stripe border style="width: 100%">
            <el-table-column prop="avatar" label="头像" width="80">
              <template #default>
                <el-avatar :size="36"><UserFilled /></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" />
            <el-table-column prop="gender" label="性别" width="80" />
            <el-table-column prop="region" label="地区" />
            <el-table-column prop="registerTime" label="注册时间" />
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
          <el-table :data="recentContent" stripe border style="width: 100%">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="creator" label="创建者昵称" />
            <el-table-column prop="publishTime" label="发布时间" />
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
</style>
