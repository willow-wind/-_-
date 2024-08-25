<template>
  <div class="container">
    <div class="hello">
      <h1>欢迎访问用户管理系统！</h1>
      <p>
        该系统包含基本的增加、删除、编辑、查找用户和分页浏览的功能。拥有登录注册和权限管理等模块。前端采用vue框架，后端采用springboot框架和MySQL数据库。
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh; /* 垂直居中 */
  background-color: #f5f5f5; /* 背景颜色 */
  padding: 20px; /* 容器内边距 */
}

.hello {
  max-width: 600px; /* 最大宽度限制 */
  padding: 40px; /* 内容内边距 */
  background-color: #ffffff; /* 白色背景 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  text-align: center; /* 内容居中 */
  font-family: "Arial", sans-serif; /* 字体样式 */
  color: #333; /* 字体颜色 */
}

h1 {
  margin-bottom: 20px;
  color: #007bff; /* 标题颜色 */
  font-size: 28px;
  font-weight: bold;
}

p {
  font-size: 16px;
  line-height: 1.6;
  color: #555; /* 段落文字颜色 */
}
</style>
