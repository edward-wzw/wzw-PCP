<template>
  <div style="position:relative;padding-top:80px;height:74vh">
    <el-card class="paper__topbar">
      <el-button class="paper__bigger__btn" type="primary" @click="customizeModuleBtn" plain>自定义模板</el-button>
      <el-button class="paper__bigger__btn" type="success" @click="myModuleBtn" plain>我的模板</el-button>
      <el-button v-print="'#printTest'" @click="printReportBtn" plain>打印报告</el-button>
    </el-card >
    <div class="report__mould__wrap">
      <!-- 左侧自定义区域 -->
      <div class="report__mould__left">
        <!-- 自定义模板 -->
        <el-alert title="温馨提示： 点击“自定义模板”后，您可通过鼠标拖拽的方式，对左右两侧的内容进行更改。" type="warning" style="margin:14px 10px;width:94%"></el-alert>
        <vuedraggable :options="dragOptions" group="dragUserInfo" v-show="customizeModule">
          <transition-group tag="div">
          </transition-group>
        </vuedraggable>
        <vuedraggable :options="dragOptions" group="dragListOne" v-show="customizeModule">
          <transition-group tag="div" class="drag__box">    
            <!-- 大体所见 第二栏 -->
            <div class="item__wrap" key="aa">
              <input type="text" class="item__name weight" v-model="generalTitle">
              <textarea id="" cols="30" rows="2" v-model="generalResult"></textarea>
            </div>
            <!-- 镜下所见 第三栏 -->
            <div class="item__wrap" key="bb">
              <input type="text" class="item__name weight" v-model="lensTitle">
              <textarea id="" cols="30" rows="2" v-model="lensResult"></textarea>
            </div>
          </transition-group>
        </vuedraggable>
        <!-- 我的模板 -->
        <div v-show="myModule">
          我的模板
        </div>
      </div>
      <!-- 右侧预览区域 -->
      <div class="report__mould__right" :class="paperBigger ? 'biggerPaper' : ''">
        <div class="report__preview__title">模板预览区</div>
        <div id="printTest" class="report__paper">
          <input type="text" style="font-size:26px;" v-model="mainTitle" class="center weight">
          <input type="text" style="font-size:20px;" v-model="subTitle" class="center weight">
          <div class="edit__hospital__wrap">
            <span class="weight">送检医院：</span><input type="text" v-model="hospital" class="edit__hospital">
          </div>
          <div class="line"></div>
          <!-- 基本信息 第一栏-->
          <vuedraggable :options="dragOptions" group="dragUserInfo">
            <transition-group tag="div" class="case__userinfo">
              <div class="userinfo__item" key="name">
                <span class="weight">姓名：</span><input type="text" v-model="name" class="userinfo__value">
              </div>
              <div class="userinfo__item" key="sex">
                <span class="weight">性别：</span><input type="text" v-model="sex" class="userinfo__value">
              </div>
              <div class="userinfo__item" key="age">
                <span class="weight">年龄：</span><input type="text" v-model="age" class="userinfo__value">
              </div>
              <div class="userinfo__item" key="department">
                <span class="weight">送检科别：</span><input type="text" v-model="department" class="userinfo__value">
              </div>
              <div class="userinfo__item" key="bedNo">
                <span class="weight">床号：</span><input type="text" v-model="bedNo" class="userinfo__value">
              </div>
              <div class="userinfo__item" key="admissionNo">
                <span class="weight">住院号：</span><input type="text" v-model="admissionNo" class="userinfo__value">
              </div>
              <div class="userinfo__item" key="outpatientNo">
                <span class="weight">门诊号：</span><input type="text" v-model="outpatientNo" class="userinfo__value">
              </div>
              <div class="userinfo__item" key="doctorName">
                <span class="weight">送检医师：</span><input type="text" v-model="doctorName" class="userinfo__value">
              </div>
              <div class="userinfo__item" key="testDateStr">
                <span class="weight">送检日期：</span><input type="text" v-model="testDateStr" class="userinfo__value">
              </div>
              <div class="userinfo__item" key="separationDateStr">
                <span class="weight">离体日期：</span><input type="text" v-model="separationDateStr" class="userinfo__value">
              </div>
              <div class="userinfo__item" key="clinicalDiagnose">
                <span class="weight">临床诊断:</span><input type="text" v-model="clinicalDiagnose" class="userinfo__value">
              </div>
            </transition-group>
          </vuedraggable>
          <div class="line"></div>
          <!-- test -->
          <!-- <vuedraggable v-model="list1" group="people" :options="dragOptions">
            <transition-group tag="div">
              <div v-for="item in list1" :key="item" class="item">
                <p>{{item}}</p>
              </div>
            </transition-group>
          </vuedraggable> -->
          <vuedraggable :options="dragOptions" group="dragListOne">
            <transition-group tag="div">
              <!-- 添加项 -->
              <div v-for="item in reportItemArr" :key="item">
                <div class="add__item__wrap">
                  <input type="text" class="add__item__name">
                  <!-- <i class="el-icon-delete delete" v-if="showElement" @click="deleteReportItem(item)"></i> -->
                  <textarea id="" cols="30" rows="2"></textarea>
                </div>
              </div>
            </transition-group>
          </vuedraggable>
          <div class="addBtn" @click="addReportItem" v-if="showElement">+</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'

export default {
  data () {
    return {
      dragOptions:{
        animation: 120,
        scroll: true,
        group: 'sortlist',
        ghostClass: 'ghost-style'
      },
      paperBigger: false,
      reportTest: [],
      showElement: true,
      mainTitle: '',
      subTitle: '',
      hospital: '',
      name: '',
      sex: '',
      age: '',
      department: '',
      bedNo: '',
      admissionNo: '',
      outpatientNo: '',
      doctorName: '',
      testDateStr: '',
      separationDateStr: '',
      clinicalDiagnose: '',
      addReportItemNum: 0,
      reportItemArr: [],
      generalTitle: '大体所见',
      generalResult: '',
      lensTitle: '镜下所见',
      lensResult: '',
      list1: [1],
      list2: [2,4,6,8,10],
      customizeModule: true,
      myModule: false,
      itemList: [
        { itemTitle: {generalTitle: '大体所见'},  itemResult: {generalResult: '1111111'} },
        { itemTitle: {lensTitle: '镜下所见'}, itemResult: {lensResult: '2222222'} }
      ]
    }
  },
  components: {
    vuedraggable
  },
  methods: {
    customizeModuleBtn () {
      this.customizeModule = true
      this.myModule = false
    },
    myModuleBtn () {
      this.customizeModule = false
      this.myModule = true
    },
    changePaperSize () {
      this.paperBigger = !this.paperBigger
    },
    addReportItem () {
      this.addReportItemNum++
      this.reportItemArr.push(this.addReportItemNum)
    },
    deleteReportItem (index) {
      console.log(index, this.reportItemArr)
      this.reportItemArr.splice(index, 1)
      // this.addReportItemNum--
    },
    printReportBtn () {
      this.showElement = false
      this.paperBigger = !this.paperBigger
      let that = this
      setTimeout(() => {
        that.showElement = true
        that.paperBigger = !that.paperBigger
      },1000)
    }
  }
}
</script>

<style scoped>
.paper__topbar {
  width: 50%;
  height: 80px;
  position: fixed;
  top: 120px;
  z-index: 10;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: right;
}
.paper__bigger__btn {
  position: relative;
  right: 0;
}
.report__mould__wrap {
  width: 100%;
  height: 75vh;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px 0;
}
.report__mould__left {
  width: 30%;
  height: 74vh;
  background: #d4e8eb;
  overflow: auto;
}
.report__preview__title {
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
}
.report__mould__right {
  width: 60%;
  height: 74vh;
  overflow: auto;
  padding: 0 40px;
  border-left: 2px solid #ccc;
}
.report__paper {
  width: 100%;
  height: auto;
  padding: 34px 10px;
  background: #d4e8eb;
  overflow: hidden;
  transition: all 0.5s;
}
.center {
  text-align: center;
}
.line {
  width: 90%;
  height: 0.1px;
  background-color: #333;
  border: 1px solid #333;
  margin: 20px auto;
}
.weight {
  font-weight: bold;
}
input {
  border: none;
  outline: none;
  border-bottom: 2px dashed #fff;
  background: none;
  width: 100%;
  height: 30px;
  padding: 3px;
}
textarea {
  background: none;
  display: block;
  padding: 20px;
  font-size: 16px;
  margin-top: 20px;
  border: none;
  border: 1px dashed #fff
}
.edit__hospital__wrap {
  position: relative;
  left: 5%;
  top: 14px;
}
.edit__hospital {
  width: 30%;
  font-size: 16px;
}
.case__userinfo {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.userinfo__item {
  width: 27%;
  display: flex;
  align-items: center;
}
.userinfo__item span {
  width:100%;
  font-size: 14px;
}
.userinfo__item input {
  display: inline-block;
  padding-bottom: 0;
}
.addBtn {
  position: relative;
  bottom: 0px;
  width: 200px;
  height: 80px;
  line-height: 80px;
  border: 2px dashed #888;
  border-radius: 60px;
  left: 42%;
  font-size: 100px;
  color: rgb(173, 173, 173);
  text-align: center;
  margin-top: 20px;
}
.addBtn:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.add__item__wrap, .item__wrap {
  position: relative;
  left: 5%;
  margin-top: 20px;
}
.add__item__name, .item__name {
  width: 30%;
  margin-right: 2%;
  font-weight: bold;
  font-size: 16px;
}
.item{
  width: 300px;
  height: 50px;
  background-color: #42b983;
  color: #ffffff;
  margin-top: 10px;
  transform: scale(0.9);
}
.delete:hover {
  cursor: pointer;
}
.drag__box {
  min-height: 70vh;
}

.biggerPaper {
  width: 100%;
  margin: 0;
  transition: all 0.5s;
}
</style>
