<template>
    <div v-if="list" class="edit-list container">
        <h2>Edit {{ list.title }} List</h2>
        <form @submit.prevent="EditList">
            <div class="field title">
                <label for="title">List Title:</label>
                <input type="text" name="title" v-model="list.title">
            </div>
            <div v-for="(ing, index) in list.items" :key="index" class="field">
                <label for="item">Items</label>
                <input type="text" name="item" v-model="list.items[index]">
                <i class="material-icons delete" @click="deleteIt(ing)">delete</i>
            </div>
            <div class="field add-item">
                <label for="add-item">Add an item (then, type "tab")</label>
                <input type="text" name="add-item" @keydown.tab.prevent="addIt" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Update List</button>
            </div>
        </form>
    </div>
</template>

<script>
import slugify from "slugify";
import axios from "axios";

export default {
  name: "EditList",
  data() {
    return {
      list: null,
      another: null,
      feedback: null,
      listId: null
    }
  },
  methods: {
    EditList() {
      if (this.list.title) {
        this.feedback = null;
        this.list.slug = slugify(this.list.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        axios
          .put(`http://localhost:3000/list/` + this.list._id, {
              title: this.list.title,
              slug: this.list.slug,
              items: this.list.items
          })
          .then(response => {
            this.$router.push({ name: "Index" })
          })
          .catch(err => {
            console.log(err)
          });
      } else {
        this.feedback = "You must enter a list title"
      }
    },
    addIt() {
      if (this.another) {
        this.list.items.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an item";
      }
    },
    deleteIt(ing) {
      this.list.items = this.list.items.filter(item => {
        return item != ing;
      })
    }
  },
  created() {
    
    axios
      .get("http://localhost:3000/list/")
      .then(response => {
        this.listId = response.data.filter(l => {
          if (l.slug == this.$route.params.list_slug){
              this.list = l
              return l._id
          }
        })
      })
      .then(res => {
          return axios.get("http://localhost:3000/list/" + response)
          .then(r => {
            this.list = r.data
          })
      })
      .catch(err => {
        console.log(err)
      })  
  }
};
</script>

<style>
.edit-list {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-list h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-list .field {
  margin: 20px auto;
  position: relative;
}
.edit-list .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>

