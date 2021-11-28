<template>
  <div>
   <!-- <modal-log-view :is-active="isViewModalActive" :view-subject="viewSubject"  @cancel="viewCancel"/> -->
    <modal-trash-box :is-active="isModalActive" :trash-subject="trashObjectName" @confirm="trashConfirm" @cancel="trashCancel"/>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="clients">

      <template slot-scope="props">
        <b-table-column class="has-no-head-mobile is-image-cell">
          <div v-if="props.row.avatar" class="image">
            <img :src="props.row.avatar" class="is-rounded">
          </div>
        </b-table-column>
        <b-table-column label="Service Bill ID" field="newservice_id" sortable searchable>
          {{ props.row.newservice_id }}
        </b-table-column>
        <b-table-column label="Name" field="name" sortable searchable>
          {{ props.row.name }}
        </b-table-column>
        <b-table-column label="Telephone" field="telephone" sortable searchable>
          {{ props.row.telephone }}
        </b-table-column>
        <b-table-column label="Delivery date" field="deliverydate" sortable searchable>
          {{ props.row.deliverydate }}
        </b-table-column>
        <b-table-column  label="Status" field="status" sortable searchable>
              {{ props.row.status }}
            </b-table-column>
         
        <b-table-column label="Created" sortable searchable>
          <small class="has-text-grey is-abbr-like" :title="props.row.created">{{ props.row.created }}</small>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <router-link :to="{name:'historyLogs.view', params: {id: props.row.newservice_id}}" class="button is-small is-primary">
              <b-icon icon="account"  size="is-small"/> 
            </router-link>
            <!--<button class="button is-small is-primary" type="button" @click.prevent="openLogView(props.row)">
              <b-icon icon="account" size="is-small"/>
            </button>-->
          </div>
        </b-table-column>
      </template>

      <section class="section" slot="empty">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large"/>
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large"/>
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>

</template>

<script>
import ModalTrashBox from '@/components/ModalTrashBox'
import ModalLogView from '@/components/ModalLogView'

export default {
  name: 'ClientsLogSample',
  components: { ModalTrashBox, ModalLogView },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    },
    
  },
  data () {
    return {
      isModalActive: false,
      isViewModalActive:false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      arrcount: null,
      viewObject: null
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    },
    // viewSubject (){
    // return this.clients
    // }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.dataUrl) {
        this.isLoading = true
        axios
          .get(this.dataUrl)
          .then(r => {
            this.isLoading = false
            if (r.data && r.data.data) {
              if (r.data.data.length > this.perPage) {
                this.paginated = true
                this.arrcount = r.data.data.length
              }
              this.clients = r.data.data
            }
          })
          .catch( err => {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      }
    },
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      if(this.trashObject.advanced > 0 || this.trashObject.status == 'complete'){
        return this.$buefy.toast.open({
                  message: `Error: Cannot Delete while payment`,
                  type: 'is-warning',
                  queue: false
                })
      }else{
      axios
        .delete(`/serviceclients/${this.trashObject.id}/destroy`)
        .then( r => {
          this.getData()

          this.$buefy.snackbar.open({
            message: `Deleted ${this.trashObject.name}`,
            queue: false
          })
        })
        .catch( err => {
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        })
      }
    },
    trashCancel () {
      this.isModalActive = false
    },

    // openLogView (viewObject = null) {
    //   //this.submit();
    //   this.isViewModalActive = true
    // },
    // viewCancel () {
    //   this.isViewModalActive = false
    // },
  }
}
</script>
