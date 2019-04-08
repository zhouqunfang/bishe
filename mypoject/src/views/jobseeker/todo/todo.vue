<template>
    <div class="todo">
      <mt-button type="primary" @click="showInput">Add</mt-button>
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
            :key="todo.content"
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
</template>
<script>
// import FooterBar from '../component/seeker/FooterBar'
import Tabs from './tab';
import Item from './item';
import {  Addtodolist,Gettodolist,Deletetodolist } from "@/views/api/todo/todo.js";
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
      todoValue: '',
      _id:''
    }
  },
  mounted () {
    this.newTime()
    this.gettodolist()
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
      this.addtodolist()
      this.todoValue = ''  
    },
    //获取增加todo列表接口 
    addtodolist(){
      this._id = id
      let params = {
        username:localStorage.getItem('Username'),
        content:this.todoValue,
        time:this.time,
        id:this._id,
        completed: false,
      }
      Addtodolist(params).then(res=>{
          console.log(res)
      })
    },
    //获取todo列表数据接口
    gettodolist(){
      let username = localStorage.getItem('Username')
      let params = {
          username:username
      }
      Gettodolist(params).then(res =>{
        let length =  res.data.datalength
        if(length){
          for(var i=0;i<length;i++){
            this.todos.unshift({
                    content: res.data.data[i].content,
                    time: res.data.data[i].time,
                    completed: res.data.data[i].completed,
                    id:res.data.data[i].id,
            })
          }
        }
      })
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id == id), 1)
          //删除todo数据接口
        let idindex = id 
        Deletetodolist({id:idindex}).then(res=>{
          if(res.data.code === "0"){
           console.log(res.data.msg)
          }
        })
   },
    togoleFilter (state) {
      this.filter = state
    },
    // 返回上一层
    goback () {
      this.$router.push('/index')
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
