<script setup lang="ts" name="ContentManagement">
import { ref, reactive, onMounted } from "vue";
import { http } from "@/common/http/instance/default-request";
import { ElMessage } from "element-plus";

// 定义API响应的通用接口
interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

// 定义内容项接口
interface ContentItem {
  id: number;
  title: string;
  coverImage: string;
  contentBody: string;
  authorId: number;
  viewCount: number;
  commentCount: number;
  avgRating: number | null;
  ratingCount: number;
  status: number;
  isDeleted: number;
  createdAt: string;
}

// 定义内容列表响应接口
interface ContentListResponse {
  total: number;
  list: ContentItem[];
}

// 定义请求参数接口
interface ContentListParams {
  page: number;
  size: number;
  isDeleted: number;
  status: number;
  tagIds: number[];
  keyword: string;
  sortBy: string;
  sortOrder: string;
}

// 定义更新内容的请求参数接口
interface UpdateContentParams {
  id: number;
  title?: string;
  coverImage?: string;
  contentBody?: string;
  status?: number;
  isDeleted?: number;
}

// 定义删除/恢复内容的请求参数接口
interface ChangeDeleteParams {
  id: number;
  value: number;
}

// 定义启用/禁用内容的请求参数接口
interface ChangeStatusParams {
  id: number;
  value: number;
  banReason?: string;
}

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
const contentList = ref<ContentItem[]>([]);

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
    const params: ContentListParams = {
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
    const res = await http.post<ApiResponse<ContentListResponse>>(
      "http://117.72.201.153:1202/admin/contents/list",
      params
    );

    // 更新数据
    contentList.value = res.data.list;
    pagination.value.total = res.data.total;
  } catch (error) {
    console.error("获取内容列表失败:", error);
  } finally {
    loading.value = false;
  }
};

// 删除/恢复内容
const changeDeleteStatus = async (id: number, value: number) => {
  try {
    loading.value = true;

    // 构建请求参数
    const params: ChangeDeleteParams = {
      id,
      value,
    };

    // 调用删除/恢复接口
    const res = await http.post<ApiResponse<null>>("http://117.72.201.153:1202/admin/contents/change-deleted", params);

    // 处理响应
    if (res.code === 0) {
      // 成功提示
      ElMessage.success("操作成功");
      // 刷新内容列表
      fetchContentList();
    } else {
      // 失败提示
      ElMessage.error(res.msg || "操作失败");
    }
  } catch (error) {
    console.error("删除/恢复内容失败:", error);
    ElMessage.error("操作失败，请稍后重试");
  } finally {
    loading.value = false;
  }
};

// 启用/禁用内容
const changeContentStatus = async (id: number, value: number) => {
  try {
    loading.value = true;

    // 构建请求参数
    const params: ChangeStatusParams = {
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
    const res = await http.post<ApiResponse<null>>("http://117.72.201.153:1202/admin/contents/change-status", params);

    // 处理响应
    if (res.code === 0) {
      // 成功提示
      ElMessage.success("操作成功");
      // 刷新内容列表
      fetchContentList();
    } else {
      // 失败提示
      ElMessage.error(res.msg || "操作失败");
    }
  } catch (error) {
    console.error("启用/禁用内容失败:", error);
    ElMessage.error("操作失败，请稍后重试");
  } finally {
    loading.value = false;
  }
};

// 查看内容详情
const handleViewDetail = async (id: number) => {
  try {
    loading.value = true;

    // 调用详情接口
    const res = await http.get<ApiResponse<ContentItem>>(`http://117.72.201.153:1202/admin/contents/detail/${id}`);

    // 处理响应
    if (res.code === 0) {
      // 复制数据到详情对象
      Object.assign(contentDetail, res.data);
      // 打开详情弹窗
      detailDialogVisible.value = true;
    } else {
      // 失败提示
      ElMessage.error(res.msg || "获取详情失败");
    }
  } catch (error) {
    console.error("获取内容详情失败:", error);
    ElMessage.error("获取详情失败，请稍后重试");
  } finally {
    loading.value = false;
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchContentList();
});

// 编辑弹窗相关
const dialogVisible = ref(false);
const currentContent = reactive<ContentItem & { image: string }>({
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
const contentDetail = reactive<ContentItem>({
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
const handleEdit = (row: ContentItem) => {
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
const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
  fetchContentList();
};

// 分页大小变更
const handleSizeChange = (val: number) => {
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
    const updateParams: UpdateContentParams = {
      id: currentContent.id,
    };

    // 只添加非空字段
    if (currentContent.title) updateParams.title = currentContent.title;
    if (currentContent.coverImage) updateParams.coverImage = currentContent.coverImage;
    if (currentContent.contentBody) updateParams.contentBody = currentContent.contentBody;
    updateParams.status = currentContent.status;
    updateParams.isDeleted = currentContent.isDeleted;

    // 调用更新接口
    const res = await http.post<ApiResponse<null>>("http://117.72.201.153:1202/admin/contents/update", updateParams);

    // 处理响应
    if (res.code === 0) {
      // 成功提示
      ElMessage.success("内容修改成功");
      // 关闭弹窗
      dialogVisible.value = false;
      // 刷新内容列表
      fetchContentList();
    } else {
      // 失败提示
      ElMessage.error(res.msg || "内容修改失败");
    }
  } catch (error) {
    console.error("更新内容失败:", error);
    ElMessage.error("内容修改失败，请稍后重试");
  } finally {
    loading.value = false;
  }
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
        <el-input
          v-model="filterForm.keyword"
          placeholder="请输入关键词"
          style="width: 200px; margin-right: 15px"
          @keyup.enter="handleSearch"
        />
        <el-button type="primary" @click="handleSearch" style="margin-right: 10px">搜索</el-button>
        <el-button type="primary" style="margin-right: 10px">新增</el-button>
        <el-button @click="resetFilter">重置</el-button>
      </div>
    </el-card>

    <!-- 内容表格 -->
    <el-card shadow="hover" class="table-card" style="margin-top: 20px">
      <el-table :data="contentList" stripe border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="authorId" label="作者ID" width="120" />
        <el-table-column prop="viewCount" label="浏览量" width="100" />
        <el-table-column prop="commentCount" label="评论数" width="100" />
        <el-table-column prop="createdAt" label="创建时间" width="180" />
        <el-table-column prop="status" label="内容状态" width="120">
          <template #default="scope">
            <el-tag
              :type="scope.row.status === 1 ? 'success' : scope.row.status === 0 ? 'warning' : 'danger'"
              size="small"
            >
              {{ scope.row.status === 1 ? "正常" : "已下架" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-link type="info" style="margin-right: 10px" @click="handleViewDetail(scope.row.id)">查看详情</el-link>
            <el-link type="primary" style="margin-right: 10px" @click="handleEdit(scope.row)">编辑</el-link>
            <el-link
              :type="scope.row.status === 1 ? 'warning' : 'success'"
              style="margin-right: 10px"
              @click="changeContentStatus(scope.row.id, scope.row.status === 1 ? 0 : 1)"
            >
              {{ scope.row.status === 1 ? "禁用" : "启用" }}
            </el-link>
            <el-link
              :type="scope.row.isDeleted === 0 ? 'danger' : 'success'"
              @click="changeDeleteStatus(scope.row.id, scope.row.isDeleted === 0 ? 1 : 0)"
            >
              {{ scope.row.isDeleted === 0 ? "删除" : "恢复" }}
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

    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogVisible" title="编辑内容" width="800px" center>
      <div class="content-edit">
        <el-form label-position="top" label-width="100px">
          <el-form-item label="标题">
            <el-input v-model="currentContent.title" placeholder="请输入内容标题" />
          </el-form-item>
          <div class="edit-meta">
            <span class="creator">作者ID: {{ currentContent.authorId }}</span>
            <span class="publish-time">创建时间: {{ currentContent.createdAt }}</span>
            <span class="views">浏览量: {{ currentContent.viewCount }}</span>
            <span class="comments">评论数: {{ currentContent.commentCount }}</span>
            <el-form-item label="状态" style="margin: 0; margin-left: auto">
              <el-select v-model="currentContent.status" placeholder="请选择状态">
                <el-option label="正常" value="1" />
                <el-option label="已下架" value="0" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="封面图片">
            <el-input v-model="currentContent.coverImage" placeholder="请输入封面图片URL" />
          </el-form-item>
          <div class="edit-image">
            <el-image :src="currentContent.coverImage || 'https://via.placeholder.com/400x200'" fit="contain" />
          </div>
          <el-form-item label="内容">
            <el-input v-model="currentContent.contentBody" type="textarea" :rows="10" placeholder="请输入内容正文" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="updateContent">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog v-model="detailDialogVisible" title="内容详情" width="800px" center>
      <div class="content-detail">
        <el-form label-position="top" label-width="100px">
          <el-form-item label="标题">
            <div>{{ contentDetail.title }}</div>
          </el-form-item>
          <el-form-item label="封面图">
            <el-image :src="contentDetail.coverImage || 'https://via.placeholder.com/400x200'" fit="contain" />
          </el-form-item>
          <el-form-item label="内容正文">
            <div style="white-space: pre-wrap">{{ contentDetail.contentBody }}</div>
          </el-form-item>
          <el-form-item label="作者ID">
            <div>{{ contentDetail.authorId }}</div>
          </el-form-item>
          <el-form-item label="浏览量">
            <div>{{ contentDetail.viewCount }}</div>
          </el-form-item>
          <el-form-item label="评论数">
            <div>{{ contentDetail.commentCount }}</div>
          </el-form-item>
          <el-form-item label="平均评分">
            <div>{{ contentDetail.avgRating || "暂无评分" }}</div>
          </el-form-item>
          <el-form-item label="评分人数">
            <div>{{ contentDetail.ratingCount }}</div>
          </el-form-item>
          <el-form-item label="状态">
            <div>{{ contentDetail.status === 1 ? "正常" : "已禁用" }}</div>
          </el-form-item>
          <el-form-item label="创建时间">
            <div>{{ contentDetail.createdAt }}</div>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailDialogVisible = false">关闭</el-button>
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

/* 编辑弹窗样式 */
.content-edit {
  padding: 20px 0;
}

.edit-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.content-detail {
  padding: 20px 0;
}

.content-detail :deep(.el-image) {
  width: 400px;
  height: 200px;
  margin: 10px 0;
}

.edit-image {
  margin-bottom: 25px;
  text-align: center;
}

.edit-image img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>
