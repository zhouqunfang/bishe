<template>
    <div class="todo_tab">
      <div class="todo_item">
          <!-- <span class="left">{{unFinishedTodoLength}} items left</span> -->
              <span
                  v-for="item in states"
                  :key="item.name"
                  :class="[item.name, filter === item.name ? 'actived' : '']"
                  @click="toggleFilter(item)"
              >
                 <img :src="item.srcImg" class="img_tab" >
                 <div :style="item.index === indexName?{color:'#5585F0'} : {color:'#0A1735'}">{{item.name}}</div>
              </span>
          <!-- <span class="clear" @click="clearAllCompleted">
               <span class="img_clear">
               </span>
              <div>Clear</div>
          </span> -->
        </div>
    </div>
</template>
<script>
const todoItem = ['all(1)', 'undone(1)', 'complete']
const defaultItem = ['all', 'undone', 'complete (1)']
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      indexName: '',
      states: [
        {
          name: 'all',
          srcImg: require('../../../assets/image/all.svg'),
          index: 0
        },
        {
          name: 'active',
          srcImg: require('../../../assets/image/undone.svg'),

          index: 1
        },
        {
          name: 'completed',
          srcImg: require('../../../assets/image/complete (1).svg'),
          index: 2
        }
      ]
    }
  },
  methods: {
    toggleFilter (state) {
      // 获取点击的state
      this.$emit('togole', state.name)
      let idx = state.index
      this.indexName = idx
      this.states.forEach(element => {
        // 遍历states，判断是否与点击的index对应
        if (element.index !== idx) {
          element.srcImg = require(`../../../assets/image/${defaultItem[element.index]}.svg`)
        }
      })
      // 响应式新增与修改数据 必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。
      // 动态修改states数组的srcimg属性
      this.$set(this.states[idx], 'srcImg', require(`../../../assets/image/${todoItem[idx]}.svg`))
    }
    // clearAllCompleted () {
    //   this.$emit('clearAllCompleted')
    // }
  },
  computed: {
    unFinishedTodoLength () {
      return this.todos.filter(todo => !todo.completed).length
    }
  }
}
</script>

<style lang="css" scoped>
@import '../../../assets/css/seeker/tab.css';
</style>
