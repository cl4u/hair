<template>
  <a-layout class="appLayout">
    <a-layout-sider :trigger="null" collapsible class="appLayoutSider">
        <!-- <div class="welcomeBox">
          <img src="@/assets/img/Login/logo.png" class="logoImg" style="height:70px;width:200px"/>
        </div> -->
      <template>
        <el-menu
          background-color="#001529"
          text-color="#9FA7AE"
          active-text-color="#1890ff"
          :unique-opened="true"
          :default-active="defaultActive"
          class="leftNavBox"
          style="border-right: none"
        >
          <el-submenu
            :index="key + ''"
            v-for="(item, key) in menuList"
            :key="key"
          >
            <template slot="title">
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              :index="item1.link"
              v-for="item1 in item.children"
              :key="item1.link"
              @click="handleClick(item1)"
              >{{ item1.name }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </template>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="appLayoutHeader">
        <SystemHeader />
      </a-layout-header>
      <a-layout-content class="appLayoutContent">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SystemHeader from "@/components/SystemHeader.vue";

export default {
  name: 'Home',
  components: { SystemHeader },
  data() {
    return {
      defaultActive: "", //左侧导航默认选中值
      menuList: [],
    };
  },
  watch: {
    $route() {
      this.lockNav();
    },
  },
  created() {
    this.menuList = [
      {
        id: "1",
        name: "会员管理",
        link: "",
        children: [
          {
            id: "1-1",
            name: "会员中心",
            link: "MemberCenter",
          },
        ],
      },
      // {
      //   id: "2",
      //   name: "报表中心",
      //   link: "",
      //   children: [
      //     {
      //       id: "2-1",
      //       name: "月报表",
      //       link: "monthReport",
      //     },
      //   ],
      // },
    ]
    this.lockNav();
    // this.$router.push({ name: "MemberCenter" });
  },
  methods: {
    lockNav() {
      let matchedArr = this.$route.matched;
      if (matchedArr.length >= 2) {
        this.defaultActive = matchedArr[1].name;
      }
    },
    handleClick(item) {
      if (this.$route.name != item.link) {
        this.$router.push({ name: item.link });
      }
    },
  },
}
</script>
<style>
.el-submenu__title {
  padding-left: 30px !important;
}
.el-menu-item {
  padding-left: 50px !important;
}
</style>
<style lang="scss" scoped>
.appLayout {
  height: 100vh;
  .appLayoutSider {
    height: 100vh;
    background: rgb(0, 21, 41);
    .welcomeBox {
      display: flex;
      justify-content: flex-start;
      // padding-left: 24px;
      align-items: center;
      width: 100%;
      height: 64px;
      .logoImg {
        width: 70%;
        height: auto;
      }
    }
    .leftNavBox {
      height: calc(100vh - 64px);
      padding: 0 0 16px 0;
      overflow-x: hidden;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar-thumb {
        border-radius: 999px;
        border: 2px solid transparent;
      }

      &::-webkit-scrollbar-track {
        box-shadow: 1px 1px 5px rgba(240, 242, 245, 0.2) inset;
      }

      &::-webkit-scrollbar-thumb {
        min-height: 20px;
        background-clip: content-box;
        box-shadow: 0 0 0 5px rgba(240, 242, 245, 0.3) inset;
      }

      &::-webkit-scrollbar-corner {
        background: transparent;
      }
    }
  }
  .appLayoutHeader {
    background: #fff;
    padding: 0;
  }
  .appLayoutContent {
    margin: 16px;
    background: rgb(240, 242, 245);
    height: calc(100vh - 96px);
    overflow: auto;

    &::-webkit-scrollbar-track-piece {
      background-color: #ccc;
      border-radius: 999px;
    }
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 999px;
      background-color: #666;
      background-clip: padding-box;
      min-height: 28px;
    }
  }
}
</style>