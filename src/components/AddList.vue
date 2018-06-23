<template>
    <div class="add-list container">
        <h2 class="center-align indigo-text">Add New Shopping List</h2>
        <form @submit.prevent="AddList">
            <div class="field title">
                <label for="title">List Title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ing, index) in items" :key="index" class="field">
                <label for="item">Item</label>
                <input type="text" name="item" v-model="items[index]">
                <i class="material-icons delete" @click="deleteIt(ing)">delete</i>
            </div>
            <div class="field add-item">
                <label for="add-item">Add an item (then, type "tab")></label>
                <input type="text" name="add-item" @keydown.tab.prevent="addIt" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn red">Add List</button>
            </div>
        </form>
    </div>
</template>

 <script>
import slugify from 'slugify'
import axios from 'axios'

 export default {
     name: 'AddList',
     data() {
         return {
             title: null,
             another: null,
             items: [],
             feedback: null,
             slug: null
         }
     },
     methods: {
         AddList(){
             if (this.title){
                 this.feedback = null
                 this.slug = slugify(this.title, {
                     replacement: '-',
                     remove: /[$*_+~.()'"!\-:@]/g,
                     lower: true
                 })
                let newList = { 
                    title: this.title,
                    slug: this.slug,
                     items: this.items  
                }
                axios.post(`http://localhost:3000/list`, newList)
                    .then(response => {
                        this.$router.push({ name: 'Index' })
                    }).catch(err => {
                        console.log(err)
                    })
             } else {
                 this.feedback = "You must enter a list title"
             }
         },
         addIt(){
             if(this.another){
                 this.items.push(this.another)
                 this.another = null
                 this.feedback = null
             } else {
                 this.feedback = 'You must enter a value to add an item'
             }
         },
         deleteIt(ing){
             this.items = this.items.filter(item => {
                 return item != ing
             })
         }
     }
 }
 </script>
 
 <style>
.add-list {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-list h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-list .field {
  margin: 20px auto;
  position: relative;
}
.add-list .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
 