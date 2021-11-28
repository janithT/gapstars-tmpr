<template>
  <b-modal :active.sync="isViewModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">History for service</p>
      </header>
      <section class="modal-card-body" >
        <slot/>

       {{ viewSubject.name }}

         
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Cancel</button>
        <button :class="confirmButtonClass" @click="print">Print</button>
      </footer>
    </div>
  </b-modal>
</template>
<!--<style>
#printMet td {
  border: 1px solid #ddd;
  padding: 15px;
  height:15px
}
#totalTable td{
  text-align:right;
}
</style>-->

<script>
import ModalBox from "./ModalBox";
import VueHtmlToPaper from "vue-html-to-paper";
import moment from 'moment';
export default {
  components: {ModalBox, VueHtmlToPaper},
  name: 'ModalLogView',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    confirmLabel: {
      type: String,
      default: 'Confirm'
    },
    confirmType: {
      type: String,
      default: 'is-info'
    },
    viewSubject: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      isViewModalActive: false,
      printData:null,
      

      columns: [
                    {
                        field: 'id',
                        label: 'No',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'Taskname',
                        label: 'Task Name',
                    },
                    {
                        field: 'Tasknote',
                        label: 'Task Note',
                    },
                    {
                        field: 'Taskprice',
                        label: 'Task Price  (Rs.)',
                        centered: true
                    }
                    
                ]
    }
  },
  computed: {
      
    confirmButtonClass () {
       
      return `button ${this.confirmType}`
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm')
    },
    print () {
      // Pass the element id here
      this.$htmlToPaper('printMe');
    }
  },
  watch: {
    isActive (newValue) {
      this.isViewModalActive = newValue
    },
    isViewModalActive (newValue) {
      if (!newValue) { 
        this.cancel()
      }
    }
  }
}
</script>
