<template>
  <div class="index container">
    <div class="card" v-for="list in lists" :key="list._id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteList(list._id)">delete</i>
        <h2 class="green-text">{{ list.title }}</h2>
        <ul class="items">
          <li v-for="(ing, index) in list.items" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab red">
        <router-link :to="{ name: 'EditList', params: {list_slug: list.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Index',
  data () {
    return {
      lists: []
    }
  },
  methods: {
    deleteList(id){

      axios
        .delete('http://localhost:3000/list/' + id)
        .then(() => {
          this.lists = this.lists.filter(list => {
            return list._id != id
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created(){
    
    axios.get('http://localhost:3000/list')
    .then(response => {
      this.lists = response.data
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>


<style>
.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .items{
  margin: 30px auto;
}
.index .items li{
  display: inline-block;
}
.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
