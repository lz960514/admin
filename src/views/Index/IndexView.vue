<template>
  <div class="index">
    <!-- 头部 -->
    <IndexHeader></IndexHeader>
    <!-- 内容 -->
    <ContentView>
      <SidebarView slot="left"></SidebarView>
      <router-view slot="content"></router-view>
    </ContentView>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import IndexHeader from "./IndexHeader.vue";

import ContentView from "./ContentView.vue";

import SidebarView from "./SidebarView.vue";

@Component({
  components: { IndexHeader, ContentView, SidebarView }
})
export default class IndexView extends Vue {}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f5f7f9;
}
</style>
