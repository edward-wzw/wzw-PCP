<template>
  <div style="position:relative">
    <div class="paper__topbar">
      <el-button @click="changePaperSize" class="paper__smaller__btn" v-if="!paperSmaller" type="primary" plain>导入模板</el-button>
      <el-button @click="changePaperSize" class="paper__smaller__btn" v-if="paperSmaller" type="success" plain>收起模板</el-button>
      <el-button v-print="'#printTest'" @click="printReportBtn" plain>打印报告</el-button>
    </div>
    <div id="printTest" class="report__paper" :class="paperSmaller ? 'smallerPaper' : ''">
      <input type="text" style="font-size:26px;" v-model="mainTitle" class="center weight">
      <input type="text" style="font-size:20px;" v-model="subTitle" class="center weight">
      <div class="edit__hospital__wrap">
        <span class="weight">送检医院：</span><input type="text" v-model="hospital" class="edit__hospital">
      </div>
      <div class="line"></div>
      <!-- 基本信息 第一栏-->
      <div class="case__userinfo">
        <div class="userinfo__item">
          <span class="weight">姓名：</span><input type="text" v-model="name" class="userinfo__value">
        </div>
        <div class="userinfo__item">
          <span class="weight">性别：</span><input type="text" v-model="sex" class="userinfo__value">
        </div>
        <div class="userinfo__item">
          <span class="weight">年龄：</span><input type="text" v-model="age" class="userinfo__value">
        </div>
        <div class="userinfo__item">
          <span class="weight">送检科别：</span><input type="text" v-model="department" class="userinfo__value">
        </div>
        <div class="userinfo__item">
          <span class="weight">床号：</span><input type="text" v-model="bedNo" class="userinfo__value">
        </div>
        <div class="userinfo__item">
          <span class="weight">住院号：</span><input type="text" v-model="admissionNo" class="userinfo__value">
        </div>
        <div class="userinfo__item">
          <span class="weight">门诊号：</span><input type="text" v-model="outpatientNo" class="userinfo__value">
        </div>
        <div class="userinfo__item">
          <span class="weight">送检医师：</span><input type="text" v-model="doctorName" class="userinfo__value">
        </div>
        <div class="userinfo__item">
          <span class="weight">送检日期：</span><input type="text" v-model="testDateStr" class="userinfo__value">
        </div>
        <div class="userinfo__item">
          <span class="weight">离体日期：</span><input type="text" v-model="separationDateStr" class="userinfo__value">
        </div>
        <div class="userinfo__item">
          <span class="weight">临床诊断:</span><input type="text" v-model="clinicalDiagnose" class="userinfo__value">
        </div>
      </div>
      <div class="line"></div>
      <vuedraggable>
        <transition-group>    
          <!-- 大体所见 第二栏 -->
          <div class="item__wrap" key="aa">
            <input type="text" class="item__name weight" v-model="generalTitle">
            <textarea id="" cols="60" rows="2" v-model="generalResult"></textarea>
          </div>
          <!-- 镜下所见 第三栏 -->
          <div class="item__wrap" key="bb">
            <input type="text" class="item__name weight" v-model="lensTitle">
            <textarea id="" cols="60" rows="2" v-model="lensResult"></textarea>
          </div>
          <!-- 添加项 -->
          <div v-for="item in reportItemArr" :key="item">
            <div class="add__item__wrap">
              <input type="text" class="add__item__name">
              <i class="el-icon-delete delete" v-if="showElement" @click="deleteReportItem(item)"></i>
              <textarea id="" cols="60" rows="2"></textarea>
            </div>
          </div>
        </transition-group>
      </vuedraggable>
      <div class="addBtn" @click="addReportItem" v-if="showElement">+</div>
    </div>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'

export default {
  data () {
    return {
      paperSmaller: false,
      reportTest: [],
      showElement: true,
      mainTitle: '叶城县人民医院',
      subTitle: '数字病理远程诊断报告单',
      hospital: '上海市宝山区第一人民医院',
      name: '张三三',
      sex: '男',
      age: '36岁',
      department: 'XXXX',
      bedNo: 'TS100265',
      admissionNo: 'H323212',
      outpatientNo: 'K46545461',
      doctorName: '钟南山',
      testDateStr: '2020/06/09',
      separationDateStr: '2020/06/09',
      clinicalDiagnose: '',
      addReportItemNum: 0,
      reportItemArr: [],
      generalTitle: '大体所见',
      generalResult: '1111111',
      lensTitle: '镜下所见',
      lensResult: '2222222',
      list1: [1,3,5,7,9],
      list2: [2,4,6,8,10],
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
    changePaperSize () {
      this.paperSmaller = !this.paperSmaller
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
      let that = this
      setTimeout(() => {
        that.showElement = true
      },1000)
    }
  }
}
</script>

<style scoped>
.paper__topbar {
  width: 62%;
  height: 48px;
  position: fixed;
  z-index: 10;
  left: 32%;
  top: 172px;
  background-color: #0097a5;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: right;
  opacity: .8;
}
.paper__smaller__btn {
  position: relative;
  right: 0;
}
.report__paper {
  width: 90%;
  height: auto;
  padding: 34px 10px;
  background: #d4e8eb;
  margin: 0 auto;
  top: 80px;
  overflow: hidden;
  position: relative;
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
.smallerPaper {
  width: 60%;
  margin: 0;
  transition: all 0.5s;
}
</style>
