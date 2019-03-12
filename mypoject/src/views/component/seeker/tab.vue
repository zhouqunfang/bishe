<template>
    <div class="todo_tab">
      <div class="todo_item">
          <!-- <span class="left">{{unFinishedTodoLength}} items left</span> -->
              <span
                  v-for="item in states"
                  :key="item.name"
                  :class="[item.name, filter === item.name ? 'actived' : '']"
                  @click="toggleFilter(item.name)"
              >
                 <img :src="item.srcImg" class="img_tab">
                 <div>{{item.name}}</div>
              </span>
          <span class="clear" @click="clearAllCompleted">
               <!-- <img src="../../../assets/image/clear.svg" class="img_tab"> -->
               <span class="img_clear">
               </span>
              <div>Clear</div>
          </span>
        </div>
    </div>
</template>
<script>
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
      states: [
        {
          name: 'all',
          srcImg: require('../../../assets/image/all.svg')
        },
        {
          name: 'active',
          srcImg: require('../../../assets/image/undone.svg')
        },
        {
          name: 'completed',
          srcImg: require('../../../assets/image/complete (1).svg')
        }
      ]
    }
  },
  methods: {
    toggleFilter (state) {
      this.$emit('togole', state)
    },
    clearAllCompleted () {
      this.$emit('clearAllCompleted')
    }
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
