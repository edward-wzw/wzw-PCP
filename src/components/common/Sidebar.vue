<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#0097a5"
      text-color="rgba(255,255,255,.7)"
      active-text-color="#fff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
// import {getSysmenu} from '../../api/api'
export default {
  data() {
    return {
      collapse: false,
      menuItems: [],
      items: [
        // {
        //   icon: "el-icon-lx-home",
        //   index: "dashboard",
        //   title: "系统首页111"
        // },
        // {
        //   icon: "el-icon-lx-copy",
        //   index: "tabs",
        //   title: "tab选项卡"
        // },
        {
          icon: "el-icon-lx-calendar",
          index: "/",
          title: "申请病例管理",
          subs: [
            {
              index: "unSubmitCase",
              title: "待提交病例"
            },
            {
              index: "unDiagnoseCase",
              title: "未诊断病例"
            },
            {
              index: "hasDiagnosedCase",
              title: "已诊断病例"
            },
            {
              index: "hasCancelledCase",
              title: "已退回/已取消病例"
            },
            {
              index: "frozenAppointment",
              title: "冰冻预约申请"
            },
            {
              index: "caseStatistics",
              title: "病例综合统计"
            },
          ]
        },
        {
          icon: "el-icon-lx-record",
          index: "broadcast",
          title: "视频预约",
        }
        // {
        //   icon: "el-icon-lx-emoji",
        //   index: "icon",
        //   title: "自定义图标"
        // },
        // {
        //   icon: "el-icon-lx-favor",
        //   index: "charts",
        //   title: "schart图表"
        // },
        // {
        //   icon: "el-icon-rank",
        //   index: "6",
        //   title: "拖拽组件",
        //   subs: [
        //     {
        //       index: "drag",
        //       title: "拖拽列表"
        //     },
        //     {
        //       index: "dialog",
        //       title: "拖拽弹框"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-lx-warn",
        //   index: "7",
        //   title: "错误处理",
        //   subs: [
        //     {
        //       index: "permission",
        //       title: "权限测试"
        //     },
        //     {
        //       index: "404",
        //       title: "404页面"
        //     }
        //   ]
        // }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
    // this.getMenuData("系统管理");
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 230px;
  position: relative;
  left: 28px;
  top: 28px;
}
.sidebar > ul {
  height: 100%;
}
.sidebar i {
  color: #fff;
}
.el-submenu__title i {
  color: #fff !important;
}
.el-menu-item.is-active {
   background-color: #89babb !important;
}
</style>
