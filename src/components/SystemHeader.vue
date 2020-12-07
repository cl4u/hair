<!--
 * @Description: 
 * @Author: rk
 * @Date: 2020-11-09 14:44:27
-->
<template>
  <div class="topNavPage">
    <div class="topNavLeft">
      <a-breadcrumb class="breadcrumbBox">
        <template>
          <a-breadcrumb-item v-for="(nav, key) in navList" :key="key">
            <!-- <span style="cursor: pointer" @click="clickBreadcrumb(nav, key)">{{ -->
            <span style="cursor: pointer">{{
              nav.meta.title
            }}</span>
          </a-breadcrumb-item>
        </template>
      </a-breadcrumb>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      navList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    // 获取面包屑
    getBreadcrumb() {
      let matched = [...this.$route.matched];
      matched[0] = {
        name: matched[1].meta.parentUrl,
        meta: { title: matched[1].meta.primaryMenuName },
      };
      this.navList = matched;
    },
    // 点击面包屑
    // clickBreadcrumb(item, key) {
    //   if (this.navList.length != Number(key) + 1) {
    //     this.$router.push({ name: item.name });
    //   }
    // },
  },
};
</script>
<style lang="scss">
.topNavPage {
  .ant-tabs-bar {
    margin-bottom: 0 !important;
  }
}
</style>
<style lang="scss" scoped>
.topNavPage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  .topNavLeft {
    .breadcrumbBox {
      padding-top: 5px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .ant-list-item {
    margin-top: 6px;
    padding: 10px;
  }
}
</style>