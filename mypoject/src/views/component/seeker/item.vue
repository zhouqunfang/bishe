<template>
    <div :class="['todo-item',todo.completed ? 'completed': '']">
        <input
            type="checkbox"
            class="toggle"
            v-model="todo.completed"
        >
        <span class="content">{{todo.content}}</span>
        <span>{{todo.time}}</span>
        <span class="destory" @click="deleteTodo"></span>
    </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteTodo () {
      this.$emit('del', this.todo.id)
    }
  }
}
</script>

<style lang="css" scoped>
@import '../../../assets/css/seeker/item.css';
</style>
