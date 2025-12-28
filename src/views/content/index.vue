<script setup lang="ts" name="ContentManagement">
import { ref, reactive, onMounted } from "vue";
import { http } from "@/common/http/instance/default-request";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { AdminUserService } from "@/common/api/user";

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
  authorName?: string;
  viewCount: number;
  commentCount: number;
  avgRating: number | null;
  ratingCount: number;
  status: number;
  isDeleted: number;
  createdAt: string;
  images?: string[] | null;
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

    // 为每个内容获取用户名称
    const uniqueAuthorIds = [...new Set(res.data.list.map((item) => item.authorId))];
    const userNamesMap = new Map<number, string>();

    // 并发获取所有用户名称
    await Promise.all(
      uniqueAuthorIds.map(async (authorId) => {
        const userName = await fetchUserName(authorId);
        userNamesMap.set(authorId, userName);
      })
    );

    // 更新内容列表中的用户名称
    contentList.value = contentList.value.map((item) => ({
      ...item,
      authorName: userNamesMap.get(item.authorId) || `用户ID: ${item.authorId}`,
    }));
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

// 禁用内容弹窗相关
const banDialogVisible = ref(false);
const banFormRef = ref<FormInstance>();
const banForm = reactive({
  contentId: 0,
  contentTitle: "",
  banReason: "",
});
const banFormRules: FormRules = {
  banReason: [
    { required: true, message: "请输入禁用原因", trigger: "blur" },
    { min: 1, max: 200, message: "禁用原因长度在 1 到 200 个字符", trigger: "blur" },
  ],
};

// 启用/禁用内容
const changeContentStatus = async (id: number, value: number) => {
  // 如果是禁用操作，打开禁用弹窗
  if (value === 0) {
    const content = contentList.value.find((item) => item.id === id);
    if (content) {
      banForm.contentId = id;
      banForm.contentTitle = content.title;
      banForm.banReason = "";
      banDialogVisible.value = true;
    }
    return;
  }

  // 如果是启用操作，直接调用 API
  try {
    loading.value = true;

    // 构建请求参数
    const params: ChangeStatusParams = {
      id,
      value,
    };

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

// 确认禁用内容
const confirmBanContent = async () => {
  if (!banFormRef.value) return;

  await banFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true;

        const params: ChangeStatusParams = {
          id: banForm.contentId,
          value: 0,
          banReason: banForm.banReason,
        };

        const res = await http.post<ApiResponse<null>>("http://117.72.201.153:1202/admin/contents/change-status", params);

        if (res.code === 0) {
          ElMessage.success("内容已禁用");
          banDialogVisible.value = false;
          // 刷新内容列表
          fetchContentList();
        } else {
          ElMessage.error(res.msg || "禁用内容失败");
        }
      } catch (error) {
        console.error("禁用内容失败:", error);
        ElMessage.error("禁用内容失败");
      } finally {
        loading.value = false;
      }
    }
  });
};

// 取消禁用
const cancelBan = () => {
  banDialogVisible.value = false;
  banForm.banReason = "";
  if (banFormRef.value) {
    banFormRef.value.resetFields();
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
      
      // 获取用户名称
      if (res.data.authorId) {
        contentDetail.authorName = await fetchUserName(res.data.authorId);
      }
      
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
  images: null,
});

// 获取所有图片（包括封面图和images数组中的图片）
const getAllImages = (): string[] => {
  const images: string[] = [];
  if (contentDetail.coverImage) {
    images.push(contentDetail.coverImage);
  }
  if (contentDetail.images && Array.isArray(contentDetail.images) && contentDetail.images.length > 0) {
    images.push(...contentDetail.images);
  }
  return images;
};

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
        <el-table-column prop="authorName" label="作者名称" width="120">
          <template #default="scope">
            {{ scope.row.authorName || `用户ID: ${scope.row.authorId}` }}
          </template>
        </el-table-column>
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
            <span class="creator">作者: {{ currentContent.authorName || `用户ID: ${currentContent.authorId}` }}</span>
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
        <div class="detail-item">
          <div class="detail-label">标题：</div>
          <div class="detail-value">{{ contentDetail.title }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">图片：</div>
          <div class="detail-value">
            <template v-if="getAllImages().length > 1">
              <el-carousel :interval="3000" type="card" height="300px">
                <el-carousel-item v-for="(image, index) in getAllImages()" :key="index">
                  <el-image :src="image" fit="contain" style="width: 100%; height: 100%" />
                </el-carousel-item>
              </el-carousel>
            </template>
            <template v-else-if="getAllImages().length === 1">
              <el-image
                :src="getAllImages()[0]"
                fit="contain"
                style="max-width: 400px; max-height: 300px"
              />
            </template>
            <template v-else>
              <el-image
                src="https://via.placeholder.com/400x200"
                fit="contain"
                style="max-width: 400px; max-height: 300px"
              />
            </template>
          </div>
        </div>
        <div class="detail-item">
          <div class="detail-label">正文：</div>
          <div class="detail-value" style="white-space: pre-wrap">{{ contentDetail.contentBody }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">作者：</div>
          <div class="detail-value">{{ contentDetail.authorName || `用户ID: ${contentDetail.authorId}` }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">浏览量：</div>
          <div class="detail-value">{{ contentDetail.viewCount }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">评论数：</div>
          <div class="detail-value">{{ contentDetail.commentCount }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">平均评分：</div>
          <div class="detail-value">{{ contentDetail.avgRating || "暂无评分" }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">评分人数：</div>
          <div class="detail-value">{{ contentDetail.ratingCount }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">状态：</div>
          <div class="detail-value">{{ contentDetail.status === 1 ? "正常" : "已禁用" }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">创建时间：</div>
          <div class="detail-value">{{ contentDetail.createdAt }}</div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 禁用内容弹窗 -->
    <el-dialog v-model="banDialogVisible" title="禁用内容" width="500px">
      <el-form
        ref="banFormRef"
        :model="banForm"
        :rules="banFormRules"
        label-position="top"
        label-width="80px"
      >
        <el-form-item label="内容标题">
          <el-input v-model="banForm.contentTitle" disabled />
        </el-form-item>
        <el-form-item label="禁用原因" prop="banReason">
          <el-input
            v-model="banForm.banReason"
            type="textarea"
            :rows="4"
            placeholder="请输入禁用原因（必填）"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelBan">取消</el-button>
        <el-button type="danger" @click="confirmBanContent">确认禁用</el-button>
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

.detail-item {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
}

.detail-label {
  width: 100px;
  text-align: right;
  padding-right: 10px;
  font-weight: 500;
  color: #606266;
  flex-shrink: 0;
}

.detail-value {
  flex: 1;
  color: #303133;
  word-break: break-word;
}

.content-detail :deep(.el-image) {
  max-width: 100%;
  border-radius: 4px;
}

.content-detail :deep(.el-carousel) {
  margin: 10px 0;
}

.content-detail :deep(.el-carousel__item) {
  display: flex;
  align-items: center;
  justify-content: center;
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
