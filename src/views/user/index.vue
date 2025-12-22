<template>
  <div :class="ns.b()">
    <div :class="ns.e('header')">
      <h2>{{ "用户管理" }}</h2>
    </div>
    <!-- 搜索和筛选区域 -->
    <div :class="ns.e('search-filter')" class="flx-align-center">
      <el-input v-model="searchForm.username" placeholder="用户名" style="width: 200px; margin-right: 10px" />
      <el-select v-model="searchForm.status" placeholder="状态" style="width: 120px; margin-right: 10px">
        <el-option label="正常" value="normal" />
        <el-option label="禁用" value="disabled" />
      </el-select>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>

    <!-- 表格区域 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="userId" label="用户ID" width="180" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="registerTime" label="注册时间" width="180" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'normal' ? 'success' : 'danger'">
            {{ scope.row.status === "normal" ? "正常" : "禁用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div :class="ns.e('pagination')">
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

    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑用户" width="500px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formData.sex">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="formData.status" :active-value="'normal'" :inactive-value="'disabled'" />
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
    <el-dialog v-model="detailDialogVisible" title="用户详情" width="600px">
      <div class="user-detail">
        <div class="detail-item">
          <span class="detail-label">用户ID:</span>
          <span class="detail-value">{{ detailData.userId }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">用户名:</span>
          <span class="detail-value">{{ detailData.username }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">性别:</span>
          <span class="detail-value">{{ detailData.sex || "未知" }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">电话:</span>
          <span class="detail-value">{{ detailData.phone || "未填写" }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">邮箱:</span>
          <span class="detail-value">{{ detailData.email || "未填写" }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">注册时间:</span>
          <span class="detail-value">{{ detailData.registerTime }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">状态:</span>
          <span class="detail-value">
            <el-tag :type="detailData.status === 'normal' ? 'success' : 'danger'">
              {{ detailData.status === "normal" ? "正常" : "禁用" }}
            </el-tag>
          </span>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { UserService } from "@/common/api/user";
import { useNamespace } from "@/composables";

const ns = useNamespace("user-management");

// 搜索表单
const searchForm = reactive({
  username: "",
  status: "",
});

// 分页数据
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
});

// 用户列表
const userList = ref([]);

// 对话框
const dialogVisible = ref(false);
const formData = reactive({
  userId: "",
  username: "",
  sex: "",
  phone: "",
  email: "",
  status: "normal",
});

// 详情对话框
const detailDialogVisible = ref(false);
const detailData = reactive({
  userId: "",
  username: "",
  sex: "",
  phone: "",
  email: "",
  registerTime: "",
  status: "",
});

// 获取用户列表
const getUserList = async () => {
  try {
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchForm,
    };
    const res = await UserService.getUserList(params);
    userList.value = res.data.list;
    pagination.total = res.data.total;
  } catch (error) {
    ElMessage.error("获取用户列表失败");
    console.error("获取用户列表失败:", error);
  }
};

// 搜索
const handleSearch = () => {
  pagination.page = 1;
  getUserList();
};

// 重置
const resetForm = () => {
  searchForm.username = "";
  searchForm.status = "";
  pagination.page = 1;
  getUserList();
};

// 分页大小变化
const handleSizeChange = (size: number) => {
  pagination.pageSize = size;
  getUserList();
};

// 分页当前页变化
const handleCurrentChange = (current: number) => {
  pagination.page = current;
  getUserList();
};

// 编辑
const handleEdit = (row: any) => {
  dialogVisible.value = true;
  Object.assign(formData, row);
};

// 删除
const handleDelete = async (row: any) => {
  try {
    await UserService.deleteUser(row.userId);
    ElMessage.success("删除成功");
    getUserList();
  } catch (error) {
    ElMessage.error("删除失败");
    console.error("删除失败:", error);
  }
};

// 提交编辑
const handleSubmit = async () => {
  try {
    await UserService.updateUser(formData);
    ElMessage.success("编辑成功");
    dialogVisible.value = false;
    getUserList();
  } catch (error) {
    ElMessage.error("编辑失败");
    console.error("编辑失败:", error);
  }
};

// 初始化
onMounted(() => {
  getUserList();
});
</script>

<style scoped>
:deep(.user-management) {
  padding: 20px;
}

:deep(.user-management__header) {
  margin-bottom: 20px;
}

:deep(.user-management__search-filter) {
  margin-bottom: 20px;
}

:deep(.user-management__pagination) {
  margin-top: 20px;
  text-align: right;
}
</style>
