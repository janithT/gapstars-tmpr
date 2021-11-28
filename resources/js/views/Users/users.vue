<template>
  <div>
     
    <section class="section is-main-section">
      <tiles>
        <card-component :title="formCardTitle" icon="account-edit" class="tile is-child">
          <form @submit.prevent="submit">
            <template v-if="id">
              <b-field label="ID" horizontal>
                <b-input :value="id" custom-class="is-static" readonly />
              </b-field>
              <hr>
            </template>
            <!--<b-field label="Avatar" horizontal>
              <file-picker @file-id-updated="fileIdUpdated" :current-file="form.avatar_filename"/>
            </b-field>
            <hr>-->
            <b-field label="User Name *" message="User name" horizontal>
              <b-input placeholder="e.g. John Doe" v-model="form.name" required />
            </b-field>
            <b-field label="User Email *" message="User email" horizontal>
              <b-input placeholder="e.g. example@example.com" v-model="form.email" required />
            </b-field>

             
            <b-field label="User Status" horizontal>
                        <b-checkbox v-model="form.active"
                            true-value=1
                            false-value=0>
                            {{ form.active }}
                        </b-checkbox>
            </b-field>

            <b-field label="User Admin" horizontal>
                        <b-checkbox v-model="form.isAdmin"
                            true-value=1
                            false-value=0>
                            {{ form.isAdmin }}
                        </b-checkbox>
            </b-field>

            <b-field horizontal label="New password *" :message="formPasswordMessage" :type="formPasswordType">
              <b-input name="password" type="password" v-model="form.password" required autocomplete="new-password"/>
            </b-field>
            <b-field horizontal label="New password (confirm) *" :message="formPasswordMatch" :type="formConfPasswordType" >
              <b-input name="password_confirmation" type="password" v-model="form.password_confirmation" required autocomplete="new-password"/>
            </b-field>

            <div class="buttons is-centered">
                        <b-field grouped >
                        <b-field horizontal>
                        <b-button type="is-primary" :loading="isLoading" native-type="submit">Submit</b-button>
                        </b-field>
                        <b-field >
                        <router-link :to="{name:'users'}" class="button is-primary">
                          New
                        </router-link>
                        </b-field>
                        </b-field>
                        </div>
            <!--<b-field horizontal>
              <b-button type="is-primary" :loading="isLoading" native-type="submit">Submit</b-button>
            </b-field>-->
          </form>
        </card-component>
        
        <card-component v-if="isProfileExists" title="User Profile" icon="account" class="tile is-child">
          <user-avatar :avatar="item.avatar" :is-current-user="false" class="image has-max-width is-aligned-center"/>
          <hr>
          <b-field label="Name">
            <b-input :value="item.name" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Address">
            <b-input :value="item.email" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Status" horizontal>
                        <b-checkbox :value="item.active"
                            true-value="1"
                            false-value="0"
                            custom-class="is-static" disabled>
                            
                        </b-checkbox>
          </b-field>
          <b-field label="Role- Admin" horizontal>
                        <b-checkbox :value="item.isAdmin"
                            true-value="1"
                            false-value="0"
                            custom-class="is-static" disabled>
                            
                        </b-checkbox>
          </b-field>

        </card-component>
      </tiles>
    </section>

    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="users" icon="account-multiple">
       <!-- <card-toolbar>
          <button slot="right" type="button" class="button is-danger is-small has-checked-rows-number" @click="trashModal(null)" :disabled="!checkedRows.length">
            <b-icon icon="trash-can" custom-size="default"/>
            <span>Delete</span>
            <span v-show="!!checkedRows.length">({{ checkedRows.length }})</span>
          </button>
        </card-toolbar> -->
        <modal-trash-box :is-active="isModalActive" :trash-subject="trashSubject" @confirm="trashConfirm" @cancel="trashCancel"/>

        <b-table
          :checked-rows.sync="checkedRows"
          :checkable="true"
          :loading="isLoading"
          :paginated="paginated"
          :per-page="perPage"
          :striped="true"
          :hoverable="true"
          default-sort="name"
          :data="users">

          <template slot-scope="props">
            <b-table-column class="has-no-head-mobile is-image-cell">
              <div v-if="props.row.avatar" class="image">
                <img :src="props.row.avatar" class="is-rounded">
              </div>
            </b-table-column>
            <b-table-column label="Name" field="name" sortable searchable>
              {{ props.row.name }}
            </b-table-column>
            <b-table-column label="Email" field="email" sortable searchable>
              {{ props.row.email }}
            </b-table-column>
            <b-table-column label="Active" field="active" sortable searchable>
              {{ props.row.active }}
            </b-table-column>
            <b-table-column label="isAdmin" field="isAdmin" sortable searchable>
              {{ props.row.isAdmin }}
            </b-table-column>
            <b-table-column label="Created">
              <small class="has-text-grey is-abbr-like" :title="props.row.created">{{ props.row.created }}</small>
            </b-table-column>
            <b-table-column custom-key="actions" class="is-actions-cell">
              <div class="buttons is-right">
                <router-link :to="{name:'users.edit', params: {id: props.row.id}}" class="button is-small is-primary">
                  <b-icon icon="account-edit" size="is-small"/>
                </router-link>
                <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
                  <b-icon icon="trash-can" size="is-small"/>
                </button>
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
      </card-component>
    </section>
     
  </div>
</template>

<script>
import clone from 'lodash/clone'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import FilePicker from '@/components/FilePicker'
import UserAvatar from '@/components/UserAvatar'
import Notification from '@/components/Notification'

import map from 'lodash/map'
import ModalBox from '@/components/ModalBox'
import CardToolbar from '@/components/CardToolbar'
import ModalTrashBox from '@/components/ModalTrashBox'


export default {
  name: 'Users',
  components: { UserAvatar, FilePicker, CardComponent, Tiles, HeroBar, TitleBar, Notification, ModalBox, ModalTrashBox, CardToolbar, },
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      item: null,
      form: this.getClearFormObject(),
      createdReadable: null,
      checkedRows: [],
      errors: {},
      isModalActive: false,
      trashObject: null,
      users: [],
      paginated: true,
      perPage: 5,
       
    }
  },
  computed: {
 
    trashSubject () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      if (this.checkedRows.length) {
        return `${this.checkedRows.length} entries`
      }

      return null
    },
    formPasswordType () {
      return this.errors.password ? 'is-danger' : null
    },
    formConfPasswordType () {
      return this.errors.password_confirmation ? 'is-danger' : null
    },
    formPasswordMessage () {
      return this.errors.password?this.errors.password[0] : 'Required. New password'
    },
    formPasswordMatch () {
      if(this.form.password != this.form.password_confirmation){
      return this.errors.password_confirmation = 'passwords should be same' 
      }      
    },
    //heroTitle () {
    //   if (this.isProfileExists) {
    //     return this.form.name
    //   } else {
    //     return 'Create Client'
    //   }
    // },
     formCardTitle () {
      if (this.isProfileExists) {
        return 'Edit User'
      } else {
        return 'New User'
      }
    },
    isProfileExists () {
      return !!this.item
    },
  },
  created () {
    this.getData()
  },
  methods: {
    getClearFormObject () {
      return {
        id: null,
        name: null,
        email: null,
        active: 1,
        isAdmin: 0,
        password:null,
        password_confirmation:null

      }
    },
    getData () {

      if (this.id) {
        axios
          .get(`/users/${this.id}`)
          .then(r => {
            this.form = r.data.data
            this.item = clone(r.data.data)

          })
          .catch(e => {
            this.item = null

            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      }
    this.getusers()
      
    },

    getusers(){

      this.isLoading = true
      axios
        .get('/users')
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.users = r.data.data
          }
        })
        .catch( err => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        })
    },
    // fileIdUpdated (fileId) {
    //   this.form.file_id = fileId
    //   this.form.avatar_filename = null
    // },
    input (v) {
      //this.createdReadable = moment(v).format('MMM D, Y').toString()
    },
    trashModal (trashObject = null) {
      if (trashObject || this.checkedRows.length) {
        this.trashObject = trashObject
        this.isModalActive = true
      }
    },
    trashConfirm () {
      let url
      let method
      let data = null

      this.isModalActive = false

      if (this.trashObject) {
        method = 'delete'
        url = `/users/${this.trashObject.id}/destroy`
      } else if (this.checkedRows.length) {
        method = 'post'
        url = '/users/destroy'
        data = {
          ids: map(this.checkedRows, row => row.id)
        }
      }

      axios({
        method,
        url,
        data
      }).then( r => {
        this.getData()

        this.trashObject = null
        this.checkedRows = []

        this.$buefy.snackbar.open({
          message: `Deleted`,
          queue: false
        })
      }).catch( err => {
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: 'is-danger',
          queue: false
        })
      })
    },
    trashCancel () {
      this.isModalActive = false
    },
    submit () {
      this.isLoading = true
      let method = 'post'
      let url = '/users/store'

      if (this.id) {
        method = 'patch'
        url = `/users/${this.id}`
      }

      axios({
        method,
        url,
        data: this.form
      }).then(r => {
        this.isLoading = false

        if (!this.id && r.data.data.id) {
          this.$router.push({name: 'users.edit', params: {id: r.data.data.id}})

          this.$buefy.snackbar.open({
            message: 'Created',
            queue: false
          })
          //this.getData()
        } else {
          this.item = r.data.data

          this.$buefy.snackbar.open({
            message: 'Updated',
            queue: false
          })
          this.getusers()
        }
      }).catch(e => {
        this.isLoading = false

        this.$buefy.toast.open({
          message: `Error: ${e.message}`,
          type: 'is-danger',
          queue: false
        })
      })
    }
  },
  watch: {
    id (newValue) {
      this.form = this.getClearFormObject()
      this.item = null

      if (newValue) {
        this.getData()
      }
    }
  }
}
</script>
