<template>
  <div>
    <vuedraggable class="left" v-model="list1" group="people">
        <transition-group>
          <div v-for="item in list1" :key="item" class="item">
            <p>{{item}}</p>
          </div>
        </transition-group>
      </vuedraggable>

      <vuedraggable class="right" v-model="list2" group="people">
        <transition-group>
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
      list1: [1,3,5,7,9],
      list2: [2,4,6,8,10]
    }
  },
  components: {
    vuedraggable
  },
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
