<template>
  <div style="position:relative">
    <div id="printTest"  class="report__paper">
      <input type="text" style="font-size:26px;" v-model="mainTitle" class="center weight bordernon" disabled>
      <input type="text" style="font-size:20px;" v-model="subTitle" class="center weight bordernon" disabled>
      <div class="edit__hospital__wrap">
        <span class="weight">送检医院：</span><input type="text" v-model="hospital" class="edit__hospital bordernon" disabled>
      </div>
      <div class="line"></div>
      <div class="case__userinfo">
        <div class="userinfo__item" v-for="item in myMould['userInfo']" :key="item.value">
          <span class="weight">{{ item.name }}</span><input type="text" class="userinfo__value bordernon">
        </div>
      </div>
      <div class="line"></div>
      <div class="item__wrap" v-for="item in myMould['resultItem']" :key="item.value">
        <input type="text" class="item__name weight bordernon" v-model="item.name" disabled>
        <textarea id="" cols="30" rows="2" class="bordernon"></textarea>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      myMould: [],
      mainTitle: '',
      subTitle: '',
      hospital: '',

    }
  },
  created () {
    this.myMould = JSON.parse(localStorage.getItem('myMould'))
    console.log(this.myMould)
  },
  methods: {
    
  }
}
</script>

<style scoped>
.report__paper {
  width: 100%;
  height: auto;
  padding: 34px 10px;
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
.item__wrap {
  position: relative;
  left: 5%;
  margin-top: 20px;
}
.item__name {
  width: 30%;
  margin-right: 2%;
  font-weight: bold;
  font-size: 16px;
}
</style>
