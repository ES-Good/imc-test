<template>
  <div class="main-container">
    <HomePage v-model="dataCorrectObj"/>
    <ModalWinow 
    @closeWindow="closeModal"
    v-if="showModal" 
    :dataForm="dataCorrectObj
    "/>
    <div class="block" v-show="arrBlock">
      <p class="arr-block">{{ arrBlock }}</p>
    </div>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import ModalWinow from './components/ModalWinow.vue'

export default {
  name: 'App',
  components: {
    HomePage,
    ModalWinow
  },
  data(){
    return {
      dataCorrectObj: null,
      showModal: false,
      arrBlock: null
    }
  },
  methods:{
    toggleWindow(){
      this.showModal = !this.showModal
    },
    closeModal(arr){
      this.arrBlock = arr
      this.toggleWindow()
    }
  },
  watch:{
    dataCorrectObj(obj){
      this.dataCorrectObj = obj
      if (this.dataCorrectObj) this.toggleWindow()
    }
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-container{
  max-width: 992px;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;
}

.arr-block{
  white-space: pre;
}
</style>
