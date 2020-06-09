<template>
    <div>
      <div class="my__tabs">
          <div class="my__tab__items" v-for="(item, index) in tabItems" :key="index" @click="transTab(index)">{{item}}</div>
      </div>
      <div class="my__tab__content">
        <slot name="tabContent"></slot>
      </div>
    </div>
</template>

<script>
export default {
    props: ['tabItems'],
    methods: {
      transTab (index) {
        this.$emit('tabInfo', index)
      }
    }
}
</script>

<style>
.my__tabs {
  width: 600px;
  height: 24px;
  display: inline-flex;
  background-color: #E6F5F7;
  color: #0097a5;
}
.my__tab__items {
  width: 20%;
  height: 24px;
  line-height: 24px;
  text-align:center;
  border-left: 1px solid #d4e8eb;
  border-right: 1px solid #d4e8eb;
}
.my__tab__items:hover {
  cursor: pointer;
  background-color: #d4e8eb;
}
.my__tab__content {
  width: 97%;
  height: 75vh;
  overflow: auto;
  padding: 1% 2.2%;
  box-sizing: border-box;
  border: 2px solid #888;
  margin-top: 16px;
}
</style>
