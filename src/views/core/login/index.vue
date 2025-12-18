<script setup lang="ts" name="Login">
import type { Component } from "vue";
import { ref, provide, onMounted } from "vue";
import { useSettingStore } from "@/pinia/stores/core/setting";
import { GlobalThemeEnum } from "@/common/enums";
import { serviceConfig } from "@/common/config";

import { useNamespace } from "@/composables";
import LoginForm from "./loginForm.vue";
import Phone from "./components/phone.vue";
import Register from "./components/register.vue";
import Forget from "./components/forget.vue";

const ns = useNamespace("login");
const settingStore = useSettingStore();

// 设置登录页面默认使用浅色模式
onMounted(() => {
  settingStore.theme.globalThemeMode = GlobalThemeEnum.Light;
});

const formComponents: Record<string, Component> = {
  login: LoginForm,
  phone: Phone,
  register: Register,
  forget: Forget,
};

const formMode = ref("login");

const switchLoginMode = (mode: string) => {
  formMode.value = mode;
};

provide("switchLoginMode", switchLoginMode);
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('wrapper')">
      <div :class="ns.e('left')">
        <img src="@/common/assets/images/login/login_left.png" alt="login" />
      </div>

      <div :class="ns.e('right')">
        <div :class="ns.e('right__header')" class="flx-center">
          <img v-if="serviceConfig.logo.enable" :src="serviceConfig.logo.source" alt="" />
          <h2 class="title">{{ serviceConfig.layout.name }}</h2>
        </div>

        <component :is="formComponents[formMode]" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "./index";
</style>
