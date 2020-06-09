<template>
  <div>
    <div class="form__section">
      <div class="form__item">
        <span class="form__item__name">
          病人姓名:
        </span>
        <input type="text" class="form__item__value" />
      </div>
      <div class="form__item">
        <span class="form__item__name">
          性&nbsp;&nbsp;&nbsp;&nbsp;别:
        </span>
        <input type="text" class="form__item__value" />
      </div>
      <div class="form__item">
        <span class="form__item__name">
          年&nbsp;&nbsp;&nbsp;&nbsp;龄:
        </span>
        <input type="text" class="form__item__value" />
      </div>
      <div class="form__item">
        <span class="form__item__name">
          婚姻状况:
        </span>
        <input type="text" class="form__item__value" />
      </div>
      <div class="form__item">
        <span class="form__item__name">
          身份证号:
        </span>
        <input type="text" class="form__item__value" />
      </div>
      <div class="form__item">
        <span class="form__item__name">
          职业:
        </span>
        <input type="text" class="form__item__value" />
      </div>
      <div class="form__item">
        <span class="form__item__name">
          手机号:
        </span>
        <input type="text" class="form__item__value" />
      </div>
      <div class="form__item">
        <span class="form__item__name">
          申请科室/病区:
        </span>
        <input type="text" class="form__item__value" />
      </div>
      <div class="form__item">
        <span class="form__item__name">
          系统分类:
        </span>
        <input type="text" class="form__item__value" />
      </div>
      <div class="form__item">
        <span class="form__item__name">
          床位号:
        </span>
        <input type="text" class="form__item__value" />
      </div>
      <div class="form__item">
        <span class="form__item__name">
          病人姓名
        </span>
        <input type="text" class="form__item__value" />
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.form__section {
  width: 98%;
  height: auto;
  box-sizing: border-box;
  padding: 30px 20px 0;
  border: 1px solid #999;
  display: flex;
  flex-wrap: wrap;
}
.form__item {
  width: 200px;
  font-size: 14px;
  display: flex;
  margin-right: 7%;
  margin-bottom: 30px;
}
.form__item__name {
  width: 39%;
  margin-right: 2%;
  display: flex;
  align-items: center;
}
.form__item input {
  width: 80%;
  height: 28px;
  padding: 0 4px;
}
</style>
