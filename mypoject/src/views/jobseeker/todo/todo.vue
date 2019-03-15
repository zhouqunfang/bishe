<template>
    <div class="todo">
      <!-- <mt-header>
          <router-link to="/index" slot="left">
             <mt-button icon="back"></mt-button>
         </router-link>
      </mt-header> -->
      <mt-button type="primary" @click="showInput">add</address></mt-button>
    <!-- <footer-bar></footer-bar> -->

    <div class="add_div" v-show="show"></div>
    <!-- 用transition注意key -->
    <transition-group
        tag="div"
        name="bounce"
        enter-active-class="bounceInLeft"
        leave-active-class="bounceOutRight"
      >
          <div class="show_input"  v-show="show" key="div">
            <span @click = no_show key="span"></span>
            <input
                key="input"
                type="text"
                class="add-input"
                autofocus="autofocus"
                placeholder="接下去要做什么?"
                v-model="todoValue"
            >
            <b class="addTodo" @click="addTodo"></b>
          </div>
     </transition-group>

        <Item
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
        >
        </Item>

        <Tabs
            :filter="filter"
            :todos="todos"
            @togole="togoleFilter"
        >
        </Tabs>
        <div class="goback" @click="goback"></div>
    </div>
    <!-- @clearAllCompleted="clearAllCompleted" -->
</template>
<script>
// import FooterBar from '../component/seeker/FooterBar'
import Tabs from './tab'
import Item from './item'
let id = 0
export default {
  name: 'Todo',
  components: {
    Tabs,
    Item
    // FooterBar
  },
  data () {
    return {
      todos: [],
      filter: 'all',
      time: '',
      show: false.filter,
      todoValue: ''
    }
  },
  mounted () {
    this.newTime()
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    showInput () {
      this.show = true
    },
    no_show () {
      this.show = false
    },
    newTime () {
      var time1 = new Date().format('yyyy-MM-dd hh:mm')
      this.time = time1
      // console.log(time1)
    },
    addTodo () {
      this.newTime()
      this.todos.unshift({
        id: id++,
        content: this.todoValue,
        time: this.time,
        completed: false
      })
      this.todoValue = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id == id), 1)
    },
    togoleFilter (state) {
      this.filter = state
    },
    // 返回上一层
    goback () {
      this.$router.go(-1)
    }
    // clearAllCompleted () {
    //   this.todos = this.todos.filter(todo => !todo.completed)
    // }
  }
}
</script>
<style lang='css' scoped>
@import './todo.css';
</style>
