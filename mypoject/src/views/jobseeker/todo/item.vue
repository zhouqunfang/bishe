<template>
    <div :class="['todo-item',todo.completed ? 'completed': '']">
        <input
            type="checkbox"
            class="toggle"
            v-model="todo.completed"
            @click="pressInput(todo.completed)"
        >
        <span class="content">{{todo.content}}</span>
        <span>{{todo.time}}</span>
        <span class="destory" @click="deleteTodo"></span>
    </div>
</template>

<script>
import { Updatetodolist } from "@/views/api/todo/todo.js"
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  monuted(){
  },
  methods: {
    deleteTodo () {
      this.$emit('del', this.todo.id)
    },
    pressInput(data){
      console.log(!data)
      let completed =!data
      let content= this.todo.content
      let params = {
        content:content,
        completed:completed
      }
      Updatetodolist(params).then(res=>{
          console.log(res)
      })      
  }
  // gettodolist(){
  //       let username = localStorage.getItem('Username')
  //       let params = {
  //         username:username
  //       }
  //       Gettodolist(params).then(res=>{
  //         if(res.code === "0"){
  //           console.log(res.data.data.completed)
  //           this.todo.completed =  res.data.data.completed   
  //           }  
  //       })     
  //   }
  }
}
</script>

<style lang="css" scoped>
@import './item.css';
</style>
