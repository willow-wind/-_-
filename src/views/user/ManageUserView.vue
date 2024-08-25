<template>
  <div id="manageQuestionView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item
        field="userAccount"
        label="用户账号"
        style="min-width: 240px"
      >
        <a-input
          v-model="searchParams.userAccount"
          placeholder="请输入用户账号"
        />
      </a-form-item>
      <a-form-item field="userName" label="用户昵称" style="min-width: 240px">
        <a-input v-model="searchParams.userName" placeholder="请输入用户昵称" />
      </a-form-item>
      <a-form-item field="userRole" label="用户角色" style="min-width: 120px">
        <a-input v-model="searchParams.userRole" placeholder="请输入用户角色" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">编辑</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Page_User_,
  User,
  UserControllerService,
  UserQueryRequest,
  UserVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import { useRouter } from "vue-router";

const tableRef = ref();
const user = ref<UserVO>();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<UserQueryRequest>({
  pageSize: 5,
  current: 1,
});

const loadData = async () => {
  const res = await UserControllerService.listUserByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "id",
    dataIndex: "id",
    width: 200,
  },
  {
    title: "用户账号",
    dataIndex: "userAccount",
    // ellipsis: true,
    // tooltip: true,
    width: 150,
  },
  {
    title: "用户昵称",
    dataIndex: "userName",
    slotName: "userName",
    width: 100,
  },
  {
    title: "用户头像",
    dataIndex: "userAvatar",
    width: 300,
  },
  {
    title: "用户角色",
    dataIndex: "userRole",
    width: 100,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    width: 170,
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    width: 170,
  },
  {
    title: "操作",
    slotName: "optional",
    width: 170,
  },
];

// const dataSource = [
//   {
//     key: "1",
//     judgeConfig: {
//       timeLimit: 1000,
//       memoryLimit: 1000,
//       stackLimit: 1000,
//     },
//     // ... 其他数据项
//   },
// ];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doDelete = async (user: User) => {
  const res = await UserControllerService.deleteUserUsingPost({
    id: user.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    await loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

const doUpdate = (user: User) => {
  router.push({
    path: "/update/user",
    query: {
      id: user.id,
    },
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#manageQuestionView {
}
</style>
