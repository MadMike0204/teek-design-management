<script setup lang="ts" name="ContentManagement">
import { ref, reactive } from "vue";

// 筛选条件
const filterForm = ref({
  isDeleted: "未删除",
  status: "未确定",
  tag: "请选择标签",
});

// 内容列表数据
const contentList = ref([
  {
    id: 867,
    title: "物感坏了",
    creator: "Creator",
    likes: 888,
    rating: "4.9(729)",
    publishTime: "2025-12-27 22:33",
    status: "正常",
  },
  {
    id: 763,
    title: "我要炸了",
    creator: "Uzi",
    likes: 888,
    rating: "4.7(729)",
    publishTime: "2025-12-27 22:33",
    status: "正常",
  },
  {
    id: 287,
    title: "我要炸了",
    creator: "Uzi",
    likes: 888,
    rating: "4.7(729)",
    publishTime: "2025-12-27 22:33",
    status: "已下架",
  },
  {
    id: 446,
    title: "我要炸了",
    creator: "Uzi",
    likes: 888,
    rating: "4.7(729)",
    publishTime: "2025-12-27 22:33",
    status: "已删除",
  },
  {
    id: 763,
    title: "我要炸了",
    creator: "Uzi",
    likes: 888,
    rating: "4.7(729)",
    publishTime: "2025-12-27 22:33",
    status: "正常",
  },
  {
    id: 702,
    title: "我要炸了",
    creator: "Uzi",
    likes: 888,
    rating: "4.7(729)",
    publishTime: "2025-12-27 22:33",
    status: "正常",
  },
  {
    id: 763,
    title: "我要炸了",
    creator: "Uzi",
    likes: 888,
    rating: "4.7(729)",
    publishTime: "2025-12-27 22:33",
    status: "正常",
  },
  {
    id: 763,
    title: "我要炸了",
    creator: "Uzi",
    likes: 888,
    rating: "4.7(729)",
    publishTime: "2025-12-27 22:33",
    status: "正常",
  },
  {
    id: 763,
    title: "我要炸了",
    creator: "Uzi",
    likes: 888,
    rating: "4.7(729)",
    publishTime: "2025-12-27 22:33",
    status: "正常",
  },
  {
    id: 763,
    title: "我要炸了",
    creator: "Uzi",
    likes: 888,
    rating: "4.7(729)",
    publishTime: "2025-12-27 22:33",
    status: "正常",
  },
]);

// 分页数据
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 248,
});

// 详情弹窗相关
const dialogVisible = ref(false);
const currentContent = reactive({
  id: 0,
  title: "",
  creator: "",
  likes: 0,
  rating: "",
  publishTime: "",
  status: "",
  image: "https://via.placeholder.com/400x200",
  content:
    "这是文章的详细内容，由于目前没有API数据，这里显示的是占位文本。在实际应用中，这里会显示从服务器获取的完整文章内容。\n\n文章可能包含多个段落、图片、链接等元素。当连接API后，这些内容会被动态替换为真实数据。",
});

// 处理查看详情
const handleView = (row: any) => {
  // 复制数据到当前查看的内容
  Object.assign(currentContent, row);
  // 打开弹窗
  dialogVisible.value = true;
};

// 重置筛选条件
const resetFilter = () => {
  filterForm.value = {
    isDeleted: "未删除",
    status: "未确定",
    tag: "请选择标签",
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
</script>

<template>
  <div class="content-management-container">
    <!-- 筛选和操作区域 -->
    <el-card shadow="hover" class="filter-card">
      <div class="filter-content">
        <el-select v-model="filterForm.isDeleted" placeholder="文章是否删除" style="width: 150px; margin-right: 15px">
          <el-option label="未删除" value="未删除" />
          <el-option label="已删除" value="已删除" />
        </el-select>
        <el-select v-model="filterForm.status" placeholder="文章状态" style="width: 150px; margin-right: 15px">
          <el-option label="未确定" value="未确定" />
          <el-option label="正常" value="正常" />
          <el-option label="已下架" value="已下架" />
        </el-select>
        <el-select v-model="filterForm.tag" placeholder="文章Tag" style="width: 200px; margin-right: 15px">
          <el-option label="请选择标签" value="请选择标签" />
        </el-select>
        <el-button type="primary" style="margin-right: 10px">新增</el-button>
        <el-button @click="resetFilter">重置</el-button>
      </div>
    </el-card>

    <!-- 内容表格 -->
    <el-card shadow="hover" class="table-card" style="margin-top: 20px">
      <el-table :data="contentList" stripe border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="creator" label="创建者" width="120" />
        <el-table-column prop="likes" label="点赞数" width="100" />
        <el-table-column prop="rating" label="评分(评分次数)" width="150" />
        <el-table-column prop="publishTime" label="发布时间" width="180" />
        <el-table-column prop="status" label="内容状态" width="120">
          <template #default="scope">
            <el-tag
              :type="scope.row.status === '正常' ? 'success' : scope.row.status === '已下架' ? 'warning' : 'danger'"
              size="small"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-link type="primary" style="margin-right: 10px" @click="handleView(scope.row)">查看</el-link>
            <el-link type="warning" style="margin-right: 10px">下架</el-link>
            <el-link type="danger">删除</el-link>
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
    <el-dialog v-model="dialogVisible" title="内容详情" width="800px" center>
      <div class="content-detail">
        <h3 class="detail-title">{{ currentContent.title }}</h3>
        <div class="detail-meta">
          <span class="creator">创建者: {{ currentContent.creator }}</span>
          <span class="publish-time">发布时间: {{ currentContent.publishTime }}</span>
          <span class="likes">点赞数: {{ currentContent.likes }}</span>
          <span class="rating">评分: {{ currentContent.rating }}</span>
          <el-tag
            :type="
              currentContent.status === '正常' ? 'success' : currentContent.status === '已下架' ? 'warning' : 'danger'
            "
            size="small"
            class="status-tag"
          >
            {{ currentContent.status }}
          </el-tag>
        </div>
        <div class="detail-image">
          <el-image :src="currentContent.image" fit="contain" />
        </div>
        <div class="detail-content">
          <p>{{ currentContent.content }}</p>
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
.content-management-container {
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
.content-detail {
  padding: 20px 0;
}

.detail-title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  color: #333333;
  text-align: center;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 15px;
  margin-bottom: 25px;
  font-size: 14px;
  color: #606266;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.status-tag {
  margin-left: auto;
}

.detail-image {
  margin-bottom: 25px;
  text-align: center;
}

.detail-image img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.detail-content {
  font-size: 16px;
  line-height: 1.8;
  color: #333333;
  white-space: pre-wrap;
}

.detail-content p {
  margin-bottom: 15px;
}
</style>
