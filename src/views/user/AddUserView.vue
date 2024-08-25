<template>
  <div id="container">
    <div id="addUserView">
      <h2>创建和更新</h2>
      <a-form :model="form" label-align="left">
        <a-form-item field="userName" label="用户昵称">
          <a-input v-model="form.userName" placeholder="请输入用户昵称" />
        </a-form-item>
        <a-form-item field="userAccount" label="用户账号">
          <a-input v-model="form.userAccount" placeholder="请输入用户账号" />
        </a-form-item>
        <a-form-item field="userPassword" label="用户密码">
          <a-input v-model="form.userPassword" placeholder="请输入用户密码" />
        </a-form-item>
        <a-form-item field="userAvatar" label="用户头像">
          <a-input
            v-model="form.userAvatar"
            placeholder="请输入头像图片链接"
            allow-clear
          />
        </a-form-item>
        <a-form-item field="userRole" label="用户角色权限">
          <a-select v-model="form.userRole" placeholder="请选择用户角色">
            <a-option>user</a-option>
            <a-option>admin</a-option>
            <a-option>ban</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="userProfile" label="用户简介">
          <a-input v-model="form.userProfile" placeholder="请输入用户简介" />
        </a-form-item>
        <div style="margin-top: 16px" />
        <a-form-item>
          <a-button type="primary" style="min-width: 200px" @click="doSubmit"
            >提交
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

const route = useRoute();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

let form = ref({
  userName: "",
  userAccount: "",
  userPassword: "",
  userAvatar: "",
  userRole: "",
  userProfile: "",
});

// 是否正在加载数据
const isLoading = ref(false);

/**
 * 根据用户 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  isLoading.value = true;
  try {
    const res = await UserControllerService.getUserByIdUsingGet(id as any);
    if (res.code === 0) {
      form.value = res.data as any; // 将数据填充到表单
    } else {
      message.error("加载失败，" + res.message);
    }
  } catch (error) {
    message.error("加载出错：");
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadData();
});

const doSubmit = async () => {
  console.log(form.value);
  // 区分更新还是创建
  if (updatePage) {
    const res = await UserControllerService.updateUserUsingPost(form.value);
    if (res.code === 0) {
      message.success("更新成功");
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await UserControllerService.addUserUsingPost(form.value);
    if (res.code === 0) {
      message.success("创建成功");
    } else {
      message.error("创建失败，" + res.message);
    }
  }
};
</script>

<style scoped>
#container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
}

#addUserView {
  width: 70%; /* 可以使用百分比或固定宽度 */
  max-width: 600px; /* 最大宽度 */
  padding: 20px; /* 内边距示例 */
  text-align: center; /* 内容居中 */
}
</style>
