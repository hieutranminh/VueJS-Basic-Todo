// COMPONENT TODO APP
Vue.component('todoapp', {
  data: function(){
    return {
      statusEdit: false,
      editTodo: '',
    }
  },
  props:['itemprops','index', 'filtertypetodo','statusedit'],
  template: `
    <div>
      <li v-if="!statusEdit" :class="{'done':itemprops.isDone}" v-show="isShow">
        <input type="checkbox" v-on:click="$emit('check-todo',itemprops.id)">
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
  methods:{
    changeEdit: function(){
      this.statusEdit = !this.statusEdit;
      this.editTodo = this.itemprops.name;
    },
    saveEdit: function(){

      this.statusEdit = !this.statusEdit;
      this.$emit('edit-todo', [this.itemprops.id, this.editTodo]);
      
    }
  },
  computed:{
    isShow: function(){
      let flag = true;
      if(this.filtertypetodo === 'all'){  
        flag=  true;
      }else if (this.filtertypetodo === 'active' && !this.itemprops.isDone){
        flag=  true;
      }else if (this.filtertypetodo === 'done' && this.itemprops.isDone){
        flag=  true;
      }else {
        flag=  false;
      }
      return flag;
    },
    // isEdit: function(){
    //   let Edit = false;
    //   return Edit;
    // }
 


  },
  created: function(){

  }
})

// INSTANCE TODO
var aaa = new Vue({
  el:'#todo',
  data:{
    statusEdit: false,
    filtertype: 'all',
    dataEditInput: '',
    itemTodo:[
      {id:0,name:'Breakfast',isDone:false},
      {id:1,name:'Walking',isDone:false},
      {id:2,name:'Do exercise',isDone:false}
    ],
    // Done:[],
    isTodo:[],
  },
  methods:{
    addTodo: function($event) {
      var itemNew = {
        id: (this.itemTodo.length-1)+1,
        name: $event.target.value,
        isDone:false
      };
      this.itemTodo.push(itemNew);
      $event.target.value = '';
    },
    deleteTodoList: function(index){
      var index = this.itemTodo.findIndex(item=>item.id === index);
      this.itemTodo.splice(index,1);
    },
    checkedTodo: function(index) {
      var index = this.itemTodo.findIndex(item=>item.id === index);
      this.itemTodo[index].isDone = !this.itemTodo[index].isDone;
    },
    // editTodo: function($event){
    //   this.statusEdit = true;
    //   let index = this.itemTodo.findIndex(item=>item.id === $event.id);
    //   this.dataEditInput = $event.name;
      
    //   console.log($event)
    // },
    // saveTodo: function(){
    //   this.statusEdit = false;
    // }
    editTodo: function(result){
      // result = [index , newvalue]

      let index = this.itemTodo.findIndex(item=>item.id === result[0]);
      this.itemTodo[index].name = result[1];
      // this.itemTodo = this.itemTodo;
      // console.log(this.itemTodo);
      // this.itemTodo = this.itemTodo.map(item=>{
      //   if(item.id === result[0]){
      //     item.name = result[1];
      //   }
      //   return item;
      // });
      console.log(this.itemTodo);
    }
  },
  computed:{
   
  },
  watch:{
    itemTodo : function(){
      
    }
  }
})

//  - VueX > store

// App.vue < import
//// ComponentA.vue 
//// ComponentB.vue 
//// ComponentC.vue 

// Componet 
//  -- template
//  -- js
//  -- css

