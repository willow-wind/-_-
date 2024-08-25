<template>
  <div id="userInfoView">
    <h2>用户信息</h2>
    <div class="info-row">
      <span class="label">id：</span
      ><span class="value">{{ loginUserInfo.id }}</span>
    </div>
    <div class="info-row">
      <span class="label">用户昵称：</span
      ><span class="value">{{ loginUserInfo.userName }}</span>
    </div>
    <div class="info-row">
      <span class="label">用户角色：</span
      ><span class="value">{{ loginUserInfo.userRole }}</span>
    </div>
    <div class="info-row">
      <span class="label">用户简介：</span
      ><span class="value">{{ loginUserInfo.userProfile }}</span>
    </div>
    <div class="info-row">
      <span class="label">创建时间：</span
      ><span class="value">{{
        moment(loginUserInfo.createTime).format("dddd, MMMM Do YYYY, h:mm:ss a")
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoginUserVO } from "../../../generated";
import { computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";

const store = useStore();
const loginUserInfo: LoginUserVO = computed(
  () => store.state.user?.loginUser
) as LoginUserVO;
</script>

<style scoped>
#userInfoView {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.info-row {
  display: flex;
  justify-content: space-between;
  width: 500px; /* Adjust the width as needed */
  margin: 8px 0;
}

.label {
  color: #a9a9a9;
  flex-basis: 40%; /* Adjust the width as needed */
  text-align: left;
}

.value {
  color: #000000;
  flex-basis: 60%; /* Adjust the width as needed */
  text-align: left;
}
</style>
