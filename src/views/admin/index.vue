<template>
  <div :class="ns.b()">
    <div :class="ns.e('header')">
      <h2>{{ "管理员管理" }}</h2>
    </div>
    <!-- 搜索和筛选区域 -->
    <div :class="ns.e('search-filter')" class="flx-align-center">
      <el-input v-model="searchForm.username" placeholder="用户名" style="width: 150px; margin-right: 10px" />
      <el-input v-model="searchForm.nickname" placeholder="昵称" style="width: 150px; margin-right: 10px" />
      <el-select v-model="searchForm.status" placeholder="管理员状态" style="width: 150px; margin-right: 10px">
        <el-option label="未指定" value="" />
        <el-option label="正常" value="normal" />
        <el-option label="已禁用" value="disabled" />
      </el-select>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>

    <!-- 表格区域 -->
    <el-table :data="adminList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="avatar" label="头像" width="80">
        <template #default="scope">
          <el-avatar :size="32" :src="scope.row.avatar || ''" />
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="150" />
      <el-table-column prop="status" label="管理员状态" width="120">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'normal' ? 'success' : 'danger'">
            {{ scope.row.status === "normal" ? "正常" : "已禁用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            :type="scope.row.status === 'normal' ? 'warning' : 'success'"
            size="small"
            @click="handleToggleStatus(scope.row)"
          >
            {{ scope.row.status === "normal" ? "禁用" : "启用" }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div class="pagination">
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
    <el-dialog v-model="dialogVisible" title="编辑管理员" width="500px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" disabled />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formData.nickname" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formData.phone" />
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { UserService } from "@/common/api/user";
import { useNamespace } from "@/composables";

const ns = useNamespace("admin-management");

// 搜索表单
const searchForm = reactive({
  username: "",
  nickname: "",
  status: "",
});

// 分页数据
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
});

// 管理员列表
const adminList = ref([]);

// 对话框
const dialogVisible = ref(false);
const formData = reactive({
  id: "",
  username: "",
  nickname: "",
  phone: "",
  avatar: "",
  status: "normal",
});

// 获取管理员列表
const getAdminList = async () => {
  try {
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchForm,
    };
    // 这里假设UserService有getAdminList方法，如果没有需要添加
    const res = await UserService.getAdminList(params);
    adminList.value = res.data.list;
    pagination.total = res.data.total;
  } catch (error) {
    ElMessage.error("获取管理员列表失败");
    console.error("获取管理员列表失败:", error);
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

// 编辑
const handleEdit = (row: any) => {
  dialogVisible.value = true;
  Object.assign(formData, row);
};

// 切换状态
const handleToggleStatus = async (row: any) => {
  try {
    const newStatus = row.status === "normal" ? "disabled" : "normal";
    await UserService.updateAdminStatus(row.id, newStatus);
    ElMessage.success("状态更新成功");
    getAdminList();
  } catch (error) {
    ElMessage.error("状态更新失败");
    console.error("状态更新失败:", error);
  }
};

// 删除
const handleDelete = async (row: any) => {
  try {
    await UserService.deleteAdmin(row.id);
    ElMessage.success("删除成功");
    getAdminList();
  } catch (error) {
    ElMessage.error("删除失败");
    console.error("删除失败:", error);
  }
};

// 提交编辑
const handleSubmit = async () => {
  try {
    await UserService.updateAdmin(formData);
    ElMessage.success("编辑成功");
    dialogVisible.value = false;
    getAdminList();
  } catch (error) {
    ElMessage.error("编辑失败");
    console.error("编辑失败:", error);
  }
};

// 初始化
onMounted(() => {
  getAdminList();
});
</script>

<style scoped>
.admin-management {
  padding: 20px;
}

.search-filter {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
