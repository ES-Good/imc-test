<script>
import { h } from "vue";

export default {
  name: "ModalWindow",
  props:{
    dataForm: Object,
  },
  data(){
    return {
      outputhArr: []
    }
  },
  render() {
    return this.mainRender();
  },
  emits:["closeWindow"],
  methods: {
    blockTagName(blockType) {
      switch (blockType) {
        case "input":
          return "input";
        case "list":
          return "select";
        case "datepicker":
          return "input"
        default:
          return "div";
      }
    },
    blockType(blockType){
      switch (blockType) {
        case "datepicker":
          return "date"
        default:
          return null;
      }
    },
    closemodal(){
      this.$emit("closeWindow", this.outputhArr)
    },
    changeInputs(itemCode, itemValue){
      this.outputhArr[itemCode] = itemValue
      console.log(this.outputhArr)
    },
    recoursiveRender(block) {
      return h(
        this.blockTagName(block.type),
        { class: ["block", block.type], 
        "type": this.blockType(block.type), 
        "value": block.type === "list" ? "" : block.value, onChange: ($event) => {
          $event.stopPropagation()
          this.changeInputs( block.code, $event.target.value)}},
          block.type === "list" ?  block.listdata.map((option) => {
          return [
            h('option', {'value': option.value}, option.value)
          ]
        }):
        block.children.map((childrenBlock) => {
          return [
            h("span", {}, childrenBlock.code),
            this.recoursiveRender(childrenBlock)
          ];
        })
      );
    },

    mainRender(){
      return h('div', {class: 'block modal-owerlay'},
        h('div',{ class: 'modal'},[
              h('button',{ class:'btn-close', onClick: this.closemodal},),
              this.recoursiveRender(this.dataForm[0])
          ])
      )
    }
  },
  mounted(){
    let arr = {}
    function arrInObj(obj) {
      obj.forEach(item => {
        arr[item.code] = !item.value ? null : item.value
        arrInObj(item.children)
      })
    }
    arrInObj(this.dataForm)
    this.outputhArr = arr
    console.log(this.outputhArr)
  }
};
</script>

<style>
.block {
  display: block;
  position: relative;
  width: 100%;
  min-height: 20px;
  text-align: left;
  border: 1px solid rgb(199, 199, 199);
  padding: 10px;
}

.container {
  padding: 20px;
}

.input,
.list {
  height: 20px;
  border: 1px solid #777;
  border-radius: 4px;
}

.block:not(:last-child) {
  margin-bottom: 20px;
}

.modal-owerlay{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.modal{
  background-color: #fff;
  padding: 30px;
  position: relative;
  max-width: 900px;
  width: 100%;
  margin: 10px;
}

.btn-close{
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.btn-close::before,
.btn-close::after{
  content: '';
  position: absolute;
  width: 90%;
  height: 2px;
  background-color: #000;
  top: 50%;
  left: 50%;
}

.btn-close::before{
  transform: translate(-50%, -50%) rotate(45deg);
}
.btn-close::after{
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>