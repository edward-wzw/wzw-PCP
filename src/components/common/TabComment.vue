<template>
  <div>
    <vuedraggable class="left" v-model="list1" group="people" :options="dragOptions" @change="change">
      <transition-group tag="div">
        <div v-for="item in list1" :key="item.name" class="item">
          <p>{{item.value}}</p>
        </div>
      </transition-group>
    </vuedraggable>

    <vuedraggable class="right" v-model="list2" group="people" :options="dragOptions">
      <transition-group tag="div">
        <div v-for="item in list2" :key="item" class="item">
          <p>{{item}}</p>
        </div>
      </transition-group>
    </vuedraggable>
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
      list1: [
        {name: 'a', value: 1},
        {name: 'b', value: 3},
        {name: 'c', value: 5},
        {name: 'd', value: 7},
        {name: 'e', value: 9}
      ],
      list2: [2,4,6,8,10]
    }
        
  },
  components: {
    vuedraggable
  },
  methods: {
    change () {
      console.log(this.list1,'change')
    }
  }
}
</script>

<style scoped>
.item{
  width: 300px;
  height: 50px;
  background-color: #42b983;
  color: #ffffff;
  margin-top: 10px;
  transform: scale(0.9);
}
.left, .right {
  display: inline-block;
  width: 40%;
  height: 500px;
  border: 2px solid #333
}
</style>