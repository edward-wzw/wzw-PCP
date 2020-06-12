<template>
  <div style="position:relative;padding-top:80px;height:74vh">
    <el-card class="paper__topbar">
      <el-button class="paper__bigger__btn" type="primary" @click="customizeMouldBtn" plain>自定义模板</el-button>
      <el-button class="paper__bigger__btn" type="success" @click="myMouldBtn" plain>我的模板</el-button>
      <el-button v-print="'#printTest'" @click="printReportBtn" plain>打印报告</el-button>
    </el-card >
    <div class="report__mould__wrap">
      <!-- 左侧自定义区域 -->
      <div class="report__mould__left">
        <!-- 自定义模板 -->
        <el-alert title="温馨提示： 点击上方“自定义模板”按钮后，您可通过鼠标拖拽的方式，对左右两侧的内容进行更改。" type="warning" style="margin:14px 0px"></el-alert>
        <!--左边 第一栏 基本信息-->
        <vuedraggable v-model="userInfoLeftArr" group="dragUserInfo" :options="dragOptions"  @change="dragChangeUserInfo" v-show="customizeMould">
          <transition-group tag="div" class="case__userinfo">
            <div class="userinfo__item" v-for="item in userInfoLeftArr" :key="item.value">
              <span class="weight">{{ item.name }}</span><input type="text" class="userinfo__value">
            </div>
          </transition-group>
        </vuedraggable>
        <!--左边 第二栏 包括添加项目 -->
        <vuedraggable v-model="resultItemLeftArr" group="dragResultItem" :options="dragOptions" @change="dragChangeUserInfo" v-show="customizeMould">
          <transition-group tag="div" class="drag__box">    
            <div class="item__wrap" v-for="item in resultItemLeftArr" :key="item.value">
              <input type="text" class="item__name weight" v-model="item.name">
              <textarea id="" cols="30" rows="2"></textarea>
            </div>
          </transition-group>
        </vuedraggable>
        <!-- 我的模板 -->
        <div v-show="myMould">
          <el-button type="primary" class="use__mould__btn" @click="useMouldBtn">使用模板</el-button>
          <div class="myMould__section">
            <div v-for="(item, index) of myMouldNum" :key="index" class="myMould__item" @click="chooseMould(index)">
              <i class="el-icon-document myMould__icon"></i>
              <p class="myMould__info">我的第{{ index + 1 }}个模板</p>
              <div class="myMould__item__cover"></div>
              <!-- <i class="el-icon-delete" @click="deleteMouldItem(index)"></i> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧预览区域 -->
      <!-- 自定义预览 -->
      <div class="report__mould__right" :class="paperBigger ? 'biggerPaper' : ''">
        <div class="report__preview__title">模板预览区</div>
        <div id="printTest" class="report__paper" v-show="customizeMould">
          <input type="text" style="font-size:26px;" v-model="mainTitle" class="center weight">
          <input type="text" style="font-size:20px;" v-model="subTitle" class="center weight">
          <div class="edit__hospital__wrap">
            <span class="weight">送检医院：</span><input type="text" v-model="hospital" class="edit__hospital">
          </div>
          <div class="line"></div>
          <!--右边 第一栏 基本信息-->
          <vuedraggable v-model="userInfoRightArr" group="dragUserInfo" :options="dragOptions"  @change="dragChangeUserInfo" >
            <transition-group tag="div" class="case__userinfo">
              <div class="userinfo__item" v-for="item in userInfoRightArr" :key="item.value">
                <span class="weight">{{ item.name }}</span><input type="text" class="userinfo__value">
              </div>
            </transition-group>
          </vuedraggable>
          <div class="line"></div>
          <!--右边 第二栏 包括添加项目 -->
          <vuedraggable v-model="resultItemRightArr" :options="dragOptions" group="dragResultItem">
            <transition-group tag="div">
              <div class="item__wrap" v-for="item in resultItemRightArr" :key="item.value">
                <input type="text" class="item__name weight" v-model="item.name">
                <textarea id="" cols="30" rows="2"></textarea>
              </div>
            </transition-group>
          </vuedraggable>
          <div class="addBtn" @click="addReportItem" v-if="showElement">+</div>
          <el-button type="primary" class="save__mould__btn" @click="saveMouldBtn" v-if="showElement">保存模板</el-button>
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
      mouldChoosedIndex: '', // 选择了第几个模板
      myMouldNum: 0,
      myAllMouldArr: [],
      myEachMouldArr: [],
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
      // generalResult: '',
      // lensResult: '',
      addReportItemNum: 0,
      reportItemArr: [],
      list1: [1],
      list2: [2,4,6,8,10],
      customizeMould: true, // 自定义模板的显示与否
      myMould: false, // 我的模板的显示与否
      userInfoLeftArr: [],
      userInfoRightArr: [
        { name: '姓名：', value: 'name' },
        { name: '性别：', value: 'sex' },
        { name: '年龄：', value: 'age' },
        { name: '送检科别：', value: 'department' },
        { name: '床号：', value: 'bedNo' },
        { name: '住院号：', value: 'admissionNo' },
        { name: '门诊号：', value: 'outpatientNo' },
        { name: '送检医师：', value: 'doctorName' },
        { name: '送检日期：', value: 'testDateStr' },
        { name: '离体日期：', value: 'separationDateStr' },
        { name: '临床诊断', value: 'clinicalDiagnose' }
      ],
      resultItemLeftArr: [
        { name: '镜下所见：', value: 'lensTitle' },
        { name: '大体所见：', value: 'generalTitle' },
      ],
      resultItemRightArr: []
    }
  },
  components: {
    vuedraggable
  },
  mounted () {
    this.myMouldNum = localStorage.getItem('myMouldNum') * 1
    console.log(this.myMouldNum)
  },
  watch: {
    myMouldNum (val) {
      this.myMouldNum = localStorage.getItem('myMouldNum') * 1
      console.log(val, '------')
    },
    myAllMouldArr (val) {
      console.log(val, 'myAllMouldArr')
    }
  },
  methods: {
    customizeMouldBtn () {
      this.customizeMould = true
      this.myMould = false
    },
    myMouldBtn () {
      this.customizeMould = false
      this.myMould = true
    },
    changePaperSize () {
      this.paperBigger = !this.paperBigger
    },
    addReportItem () {
      this.addReportItemNum++
      let tempValue = this.addReportItemNum
      this.resultItemRightArr.push({name: '', value: tempValue})
    },
    deleteMouldItem (index) {
      console.log('删除')
    },
    printReportBtn () {
      this.showElement = false
      this.paperBigger = !this.paperBigger
      let that = this
      setTimeout(() => {
        that.showElement = true
        that.paperBigger = !that.paperBigger
      },1000)
    },
    saveMouldBtn () {
      this.myMouldNum++
      localStorage.setItem('myMouldNum', this.myMouldNum)
      this.myEachMouldArr = []
      this.myEachMouldArr.push(this.userInfoRightArr)
      this.myEachMouldArr.push(this.resultItemRightArr)
      this.myAllMouldArr.push(this.myEachMouldArr)
      localStorage.setItem('myAllMouldArr', JSON.stringify(this.myAllMouldArr))
      this.$message({
        message: "已保存至我的模板",
        type: "success"
      });
      console.log(this.resultItemLeftArr, 'resultItemLeftArr');
      console.log(this.resultItemRightArr, 'resultItemRightArr');
    },
    dragChangeUserInfo() {
      // console.log(this.resultItemLeftArr, 'resultItemLeftArr');
      // console.log(this.resultItemRightArr, 'resultItemRightArr');
    },
    useMouldBtn () {
      console.log('使用模板')
    },
    chooseMould (index) {
      console.log(index)
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
  padding: 20px;
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
  font-size: 100px;
  color: rgb(173, 173, 173);
  text-align: center;
  margin:20px auto;
}
.addBtn:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.save__mould__btn {
  position: relative;
  display: block;
  margin: 0 auto;
}
.use__mould__btn {
  margin-bottom: 30px;
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
.myMould__section {
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  left: -10px;
  padding: 10px ;
}
.myMould__item {
  width: 40%;
  height: 120px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.myMould__info {
  margin-top: 14px;
}
.myMould__item__cover {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #333;
  border-radius: 5px;
  opacity: 0;
  left: 0;
  top: 0;
  cursor: pointer;
}
.myMould__item:hover {
  transform: scale(1.1);
  transition: all 1s;
}
.myMould__item > .myMould__item__cover:hover  {
  opacity: .1;
  transition: all .1s;
  
}
.myMould__icon {
  font-size: 50px;
  color: #0097a5;
}
</style>
