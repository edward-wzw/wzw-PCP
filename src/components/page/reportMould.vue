<template>
  <div style="position:relative;padding-top:80px;height:74vh">
    <el-card class="paper__topbar">
      <el-button class="paper__bigger__btn" type="primary" @click="customizeMouldBtn" plain>自定义模板</el-button>
      <el-button class="paper__bigger__btn" type="success" @click="myMouldBtn" plain>我的模板</el-button>
      <el-button v-print="'#printTest'" @click="printReportBtn" plain v-show="!customizeMould">打印模板</el-button>
    </el-card >
    <div class="report__mould__wrap">
      <!-- 左侧自定义区域 -->
      <div class="report__mould__left" :class="customizeMould ? 'backgroundChange' : ''">
        <!-- 自定义模板 -->
        <el-alert title="温馨提示： 点击上方“自定义模板”按钮后，您可通过鼠标拖拽的方式，对左右两侧的内容进行更改。" type="warning" style="margin:14px 0px"></el-alert>
        <!-- 左边 headerInfo -->
        <vuedraggable v-model="headerInfoLeftArr" group="dragHeaderInfo" :options="dragOptions" v-show="customizeMould">
          <transition-group tag="div">
            <div class="edit__hospital__wrap" v-for="item in headerInfoLeftArr" :key="item.value">
              <span class="weight">{{ item.name }}</span><input type="text" v-model="hospital" class="edit__hospital">
            </div>
          </transition-group>
        </vuedraggable>
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
          <el-button type="primary" v-if="myMould && myAllMouldArr.length !== 0" class="use__mould__btn" @click="useMouldBtn">使用模板</el-button>
          <el-button type="danger" v-if="myMould && myAllMouldArr.length !== 0" @click="deleteMouldBtn(mouldChoosedIndex, mouldDeleteIndex)">删除模板</el-button>
          <el-button type="info" v-if="myMould && myAllMouldArr.length === 0" class="use__mould__btn" disabled>使用模板</el-button>
          <div class="myMould__section">
            <div v-for="(item, index) of myAllMouldArr" :key="index" class="myMould__item" @click="chooseMould(item.mouldIndex, index)">
              <i class="el-icon-document myMould__icon"></i>
              <p class="myMould__info">我的第{{ item.mouldIndex }}个模板</p>
              <div class="myMould__item__cover" :class="mouldChoosedIndex == item.mouldIndex ? 'opacityShow' : ''"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧预览区域 -->
      <div class="report__mould__right" :class="paperBigger ? 'biggerPaper' : ''">
        <div class="report__preview__title">模板预览区</div>
        <!-- 自定义预览 -->
        <div class="report__paper" v-show="customizeMould">
          <input type="text" style="font-size:26px;" v-model="mainTitle" class="center weight">
          <input type="text" style="font-size:20px;" v-model="subTitle"  class="center weight">
          <!-- 右边 headerInfo -->
          <vuedraggable v-model="headerInfoRightArr" group="dragHeaderInfo" :options="dragOptions">
            <transition-group tag="div">
              <div class="edit__hospital__wrap" v-for="item in headerInfoRightArr" :key="item.value">
                <span class="weight">{{ item.name }}</span><input type="text" v-model="hospital" class="edit__hospital">
              </div>
            </transition-group>
          </vuedraggable>
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
          <div class="pagePrint"></div>
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
        <!-- 我的模板预览 -->
        <div id="printTest"  class="report__paper" v-if="myMould && myAllMouldArr.length !== 0">
          <input type="text" style="font-size:26px;" v-model="myAllMouldArr[mouldDeleteIndex]['mainTitle']" class="center weight bordernon" disabled>
          <input type="text" style="font-size:20px;" v-model="myAllMouldArr[mouldDeleteIndex]['subTitle']" class="center weight bordernon" disabled>
          <div class="edit__hospital__wrap" v-for="item in myAllMouldArr[mouldDeleteIndex]['headerInfo']" :key="item.value">
            <span class="weight">{{ item.name }}</span><input type="text" v-model="hospital" class="edit__hospital bordernon" disabled>
          </div>
          <div class="line"></div>
          <div class="case__userinfo">
            <div class="userinfo__item" v-for="item in myAllMouldArr[mouldDeleteIndex]['userInfo']" :key="item.value">
              <span class="weight">{{ item.name }}</span><input type="text" class="userinfo__value bordernon" disabled>
            </div>
          </div>
          <div class="line"></div>
          <div class="item__wrap" v-for="item in myAllMouldArr[mouldDeleteIndex]['resultItem']" :key="item.value">
            <input type="text" class="item__name weight bordernon" v-model="item.name" disabled>
            <textarea id="" cols="30" rows="2" class="bordernon" disabled></textarea>
          </div>
        </div>
        <div v-if="myMould && myAllMouldArr.length === 0">
          <div class="no__mould">暂未创建模板~</div>
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
      mouldChoosedIndex: 0, // 从具体的某个对象中拿
      mouldDeleteIndex: 0, // 从数组的索引中拿
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
      headerInfoLeftArr: [],
      headerInfoRightArr: [
        { name: '送检医院：', value: 'name' },
      ],
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
        { name: '临床诊断：', value: 'clinicalDiagnose' }
      ],
      resultItemLeftArr: [
        { name: '镜下所见：', value: 'lensTitle' },
        { name: '大体所见：', value: 'generalTitle' },
        { name: '病理诊断', value: 'caseResultTitle' },
      ],
      resultItemRightArr: []
    }
  },
  components: {
    vuedraggable
  },
  mounted () {
    this.myMouldNum = localStorage.getItem('myMouldNum') * 1
    console.log(this.mouldChoosedIndex, 'mouldChoosedIndex')
  },
  watch: {
    myMouldNum (newVal, oldVal) {
      // if (newVal > oldVal) { // 保存而不是删除
        this.myMouldNum = localStorage.getItem('myMouldNum') * 1
        this.myAllMouldArr = JSON.parse(localStorage.getItem('myAllMouldArr'))
      // }
    },
    mouldChoosedIndex (val) {
      console.log(val,'mouldChoosedIndex')
    }
  },
  methods: {
    deleteMouldBtn (mouldChoosedIndex, mouldDeleteIndex) {
      this.$confirm('模板' + mouldChoosedIndex + '将被删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.myAllMouldArr.splice(mouldDeleteIndex, 1)
        // this.myMouldNum--
        console.log(this.myMouldNum,'*************')
        console.log(this.myAllMouldArr)
        localStorage.setItem('myAllMouldArr', JSON.stringify(this.myAllMouldArr))
        localStorage.setItem('myMouldNum', this.myMouldNum)
        this.$message({
          type: 'success',
          message: '模板' + mouldChoosedIndex + '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '模板' + mouldChoosedIndex + '未删除'
        });          
      });
    },
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
      this.myEachMouldArr = {}
      this.myEachMouldArr.mouldIndex = this.myMouldNum
      this.myEachMouldArr.mainTitle = this.mainTitle
      this.myEachMouldArr.subTitle = this.subTitle
      this.myEachMouldArr.headerInfo = this.headerInfoRightArr
      this.myEachMouldArr.userInfo = this.userInfoRightArr
      this.myEachMouldArr.resultItem = this.resultItemRightArr
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
    chooseMould (mouldChoosedIndex, mouldDeleteIndex) {
      this.mouldChoosedIndex = mouldChoosedIndex
      this.mouldDeleteIndex = mouldDeleteIndex
    },
    useMouldBtn () {
      this.$confirm('此操作将更新所有报告的模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let getAllMould = JSON.parse(localStorage.getItem('myAllMouldArr'))
        console.log(getAllMould,'getAllMould')
        localStorage.setItem('myMould', JSON.stringify(getAllMould[this.mouldDeleteIndex]))
        this.$message({
          type: 'success',
          message: '模板更新成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '模板更新失败'
        });          
      });
    }
  }
}
</script>

<style scoped>
.pagePrint {
  page-break-before: always;
}
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
  overflow: auto;
  padding: 20px;
}
.backgroundChange {
  background: #d4e8eb;
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
.bordernon {
  border: none;
  color: black;
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
.no__mould {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #888;
  position: relative;
  top: 200px;
  letter-spacing: 3px;
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
.opacityShow {
  opacity: .1;
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
