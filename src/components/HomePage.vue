<template>
    <section class="content">
        <textarea class="input-user" v-model="DataForm"></textarea>
        <button @click="generation">
            Сгенерировать форму
        </button>
    </section>
</template>

<script>
import { CorrectObject } from "@/helper/CorrectObjectGeneration";
export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    name:'HomePage',
    data(){
        return{
            DataForm: null
        }
    },
    methods:{
        generation(){
            if (!this.DataForm) return
            // console.log(CorrectObject(this.DataForm))
            this.$emit('update:modelValue', CorrectObject(this.DataForm))
        }
    }
}
</script>

<style>
.input-user{
    width: 100%;
    height: 400px;
    resize: none;
}
</style>