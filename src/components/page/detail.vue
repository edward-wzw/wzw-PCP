<template>
  <div>
    <div class="collapse__main__left">
      <div style="font-size:20px;font-weight:bold;color:#666;letter-spacing:3px">待提交病例</div>
      <el-row :gutter="20" style="margin:30px 0;padding-left:0">
        <el-col :span="16" style="padding-left:0">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table
        :data="tableData"
        style="width: 100%;text-align:center"
        stripe
        border
      >
        <el-table-column
        type="index"
        min-width="1"
        />
        <el-table-column
          prop="name"
          label="姓名"
          min-width="2"
        />
        <el-table-column
          prop="sex"
          label="性别"
          min-width="2"
        />
        <el-table-column
          prop="age"
          label="年龄"
          min-width="2"
        />
      </el-table>
    </div>
    <div class="collapse__main__right">
      <Tab :tabItems="tabItems" @tabInfo="getTabInfo">
        <template slot="tabContent">
          <div v-if="tabIndex === 0">
            <TabCase />
          </div>
          <div v-if="tabIndex === 1">
            <TabSlice />
          </div>
          <div v-if="tabIndex === 2">
            <TabReport />
          </div>
          <div v-if="tabIndex === 3">
            <TabAppendix />
          </div>
          <div v-if="tabIndex === 4">
            <TabComment />
          </div>
          <div v-if="tabIndex === 5">
            <TabAdvice />
          </div>
          <div v-if="tabIndex === 6">
            <TabInvitation />
          </div>
        </template>
      </Tab>
    </div>
  </div>
</template>

<script>
import bus from '../common/bus'
import Tab from '../common/Tab'
import TabCase from '../common/TabCase'
import TabSlice from '../common/TabSlice'
import TabReport from '../common/TabReport'
import TabAppendix from '../common/TabAppendix'
import TabComment from '../common/TabComment'
import TabAdvice from '../common/TabAdvice'
import TabInvitation from '../common/TabInvitation'
import {$axios} from '../../utils/request'

export default {
  data () {
    return {
      tableData: [],
      tabIndex: 0,
      tabItems: ['病例', '切片', '报告', '附件', '留言', '添加医嘱', '邀请意见'],
      tableData: []
    }
  },
  components: {
    bus,
    Tab,
    TabCase,
    TabSlice,
    TabReport,
    TabAppendix,
    TabComment,
    TabAdvice,
    TabInvitation
  },
  created () {
    this.getUnSubmitCase()
    bus.$emit("collapse", true);
  },
  methods: {
    getUnSubmitCase () {
      $axios({
        url: 'unSubmitCase'
      }).then(res => {
        this.tableData = res.data.data
      })
    },
    getTabInfo (val) {
      this.tabIndex = val
    }
  }
}
</script>

<style>
.collapse__main__left, .collapse__main__right {
  width:24%;
  height: 84vh;
  overflow: auto;
  background-color:#fff;
  padding:10px 6px;
  display: inline-block;
}
.collapse__main__right {
  width: 72%;
  height: 85vh;
  vertical-align: top;
  position: absolute;
  right: 2%;
  top: 50px;
  overflow: auto;
  box-sizing: border-box;
  padding-left: 2%;
}
</style>
