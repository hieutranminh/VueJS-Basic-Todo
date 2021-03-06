// COMPONENT TODO APP
Vue.component('todoapp', {
  data: function () {
    return {
      statusEdit: false,
      editTodo: '',
      ischeck: false,
    }
  },
  props: ['itemprops', 'index', 'filtertypetodo', 'statusedit','ischeckall'],
  template: `
    <div>
      <li v-if="!statusEdit" :class="{'done':itemprops.isDone}" v-show="isShow">
        <input type="checkbox" :checked="ischeck" v-on:click="changeChecked">
        <span>{{itemprops.name}}</span>
        <button v-on:click="changeEdit" class="edit">Edit</button>
        <button v-on:click="$emit('delete-todo',itemprops.id)" class="delete">Delete</button>
      </li>
      <li v-if="statusEdit">
        <input v-model="editTodo" type="text" v-bind:style="{ width: 70 + '%' }"/>
        <button v-on:click="saveEdit"  class="save">Save</button>
      </li>
    </div>
  `,
  watch:{
    ischeckall: function(){
      this.ischeck = this.ischeckall;
      console.log('Check lai')
    }
  },
  methods: {
    changeEdit: function () {
      this.statusEdit = !this.statusEdit
      this.editTodo = this.itemprops.name
    },
    saveEdit: function () {
      this.statusEdit = !this.statusEdit
      this.$emit('edit-todo', [this.itemprops.id, this.editTodo])
    },
    changeChecked: function () {
      this.ischeck = !this.ischeck;
      this.$emit('check-todo',this.itemprops.id)
    }
  },
  computed: {

    isShow: function () {
      let flag = true
      if (this.filtertypetodo === 'all') {
        flag = true
      } else if (this.filtertypetodo === 'active' && !this.itemprops.isDone) {
        flag = true
      } else if (this.filtertypetodo === 'done' && this.itemprops.isDone) {
        flag = true
      } else {
        flag = false
      }
      return flag
    },
  },
})
// COMPONENT TODO APP
Vue.component('selectall', {
  data: function () {
    return {
      checkAll: false,
    }
  },
  template: `
    <div class="selectAll">
      <input type="checkbox" v-on:click="checkAllTodo"> Select all
      <button class="rmselected" v-on:click="removeSelected">remove selected</button>
    </div>
  `,
  methods: {
    checkAllTodo: function () {
      this.checkAll = !this.checkAll;
      this.$emit('check-all',this.checkAll);
    },
    removeSelected: function () {
      this.$emit('remove-selected')
    }
  }
})
// INSTANCE TODO
var aaa = new Vue({
  el: '#todo',
  data: {
    statusEdit: false,
    filtertype: 'all',
    dataEditInput: '',
    itemTodo: [
      {id: 0, name: 'Breakfast', isDone: false},
      {id: 1, name: 'Walking', isDone: false},
      {id: 2, name: 'Do exercise', isDone: false},
    ],
    isCheck: false,
    // Done:[],
    isTodo: [],
  },
  methods: {
    addTodo: function ($event) {
      var itemNew = {
        id: (this.itemTodo.length - 1) + 1,
        name: $event.target.value,
        isDone: false,
      }
      this.itemTodo.push(itemNew)
      $event.target.value = ''
    },
    deleteTodoList: function (index) {
      var index = this.itemTodo.findIndex(item => item.id === index)
      this.itemTodo.splice(index, 1)
    },
    checkedTodo: function (id) {
      var index = this.itemTodo.findIndex(item => item.id === id)
      this.itemTodo[index].isDone = !this.itemTodo[index].isDone
      console.log('Methods checkedTodo',this.itemTodo)
    },
    editTodo: function (result) {
      let index = this.itemTodo.findIndex(item => item.id === result[0])
      this.itemTodo[index].name = result[1]
      console.log(this.itemTodo)
    },
    CheckAllTodo: function (event) {
      this.isCheck = event;
      for(let todo of this.itemTodo){
        if(todo.isDone !== this.isCheck){
          todo.isDone = !todo.isDone;
        }
      }
      console.log(this.isCheck)
    },
    RemoveSelected: function () {
      // console.log(this.itemTodo.filter(item => item.isDone !== true))
      this.itemTodo = this.itemTodo.filter(item => item.isDone !== true)
      console.log('method removeSelected',this.itemTodo)
    }
  },
  computed: {},
  watch: {
    itemTodo: function () {
      console.log(this.itemTodo)
    },
  },
})
