<template>
  <div>
    <title-bar :title-stack="titleStack"/>
 
    <section class="section is-main-section">
      <tiles>
        <card-component :title="formCardTitle" icon="account-edit" class="tile is-child">
          <form @submit.prevent="submit">                 
                        <div class="columns">

                          <div class="column">
                            <b-field label="User Status" v-if="this.$store.state.isAdmin" horizontal>
                              <b-checkbox v-model="form.active"
                                  true-value=1
                                  false-value=0
                                  :disabled="this.id ? !this.$store.state.isAdmin : true ? false : false">
                                  {{ form.active }}     
                              </b-checkbox>
                            </b-field>
                            <b-field label="Name" message="name" horizontal >
                            <b-input placeholder="e.g. Saman Kumara" v-model="form.name" required />
                            </b-field>
                            <b-field label="Email" message="Email" horizontal >
                            <b-input placeholder="e.g. abc@gmail.com" v-model="form.email"  />
                            </b-field>  
                            <b-field label="Telephone" message="Telephone " horizontal >
                            <b-input type="number" placeholder="e.g. 0123456789" v-model="form.phone"  />
                            </b-field> 
                            <b-field label="Address" message="address" horizontal >
                            <b-input placeholder="Galle" v-model="form.address"  />
                            </b-field>
                            <b-field label="Job" message="job" horizontal >
                            <b-input placeholder="e.g. Doctor" v-model="form.job"  />
                            </b-field>

                            <b-field grouped>                       
                            <b-field label="Entrepreneur?" horizontal>
                            <b-checkbox  
                              true-value="Yes"
                              false-value="No" 
                              v-model="form.isEntrepreneur">
                            </b-checkbox>
                            </b-field>
                            
                            <b-field label="Entrepreneur Details" v-if="form.isEntrepreneur == 'Yes'" message="Entrepreneur" expanded >
                            <b-input placeholder="e.g. Businessmen" v-model="form.entrepreneur"  />
                            </b-field>

                            </b-field>
                            
                            
                          </div>

                          <div class="column">
                            <b-field label="Married" horizontal>
                            <b-checkbox v-model="form.married"
                                true-value=1
                                false-value=0>
                                {{ form.married }}
                            </b-checkbox>
                            </b-field>
                            <b-field label="Sp. Profession" message="Spouse Profession" horizontal >
                              <b-input placeholder="e.g. Doctor" v-model="form.pouseprofession"  />
                            </b-field>
                            
                            <b-field label="Children Information" message="children" horizontal >
                            <b-input placeholder="e.g. 2" v-model="form.children"  />
                            </b-field>
                            <b-field label="Looking for" message="Looking to enter mahinda college" horizontal >
                            <b-input placeholder="" v-model="form.schoolstatus"  />
                            </b-field>
                            <b-field label="When" message="When" horizontal >
                            <b-input placeholder="" v-model="form.when"  />
                            </b-field>
                            <b-field label="Donations" message="Donations done to school" horizontal >
                            <b-input placeholder="" v-model="form.donations"  />
                            </b-field>
                          </div>

                        </div>


                        <div class="buttons is-centered">
                        <b-field grouped >
                        <b-field horizontal>
                        <b-button type="is-primary" :loading="isLoading" native-type="submit">Submit</b-button>
                        </b-field>
                      
                        </b-field>
                        </div>
                               
          </form>
        </card-component>

        
      </tiles>
    </section>

     

  </div>
</template>

<script>

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
  name: 'UserForm',
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

      isModalActive: false,
      trashObject: null,
      paginated: true,
      perPage: 5,
       
    }
  },
  computed: {
    titleStack () {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.form.name
      } else {
        lastCrumb = this.userName
      }

      return [
        'Admin',
        'User',
        lastCrumb
      ]
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Edit User '
      } else {
        return 'Edit User ' 
      }
    },
    trashSubject () {
      if (this.trashObject) {
        return this.trashObject.Taskname
      }

      if (this.checkedRows.length) {
        return `${this.checkedRows.length} entries`
      }

      return null
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
        active:null,
        name: null,
        email: null,
        phone: null,
        address: null,
        job: null,
        isEntrepreneur:null,
        entrepreneur: null,
        married :null,
        pouseprofession: null,
        children:null,
        schoolstatus:null,
        when:null,
        donations: null,
        joined_date: null,
        route: null,
        created_date:null
        
      }
    },


 
    fileIdUpdated (fileId) {
      this.form.file_id = fileId
      this.form.avatar_filename = null
    },
    input (v) {
      //this.createdReadable = moment(v).format('MMM D, Y').toString()
    },

    getData () {
      if (this.id) {
        axios
          .get(`/user/${this.id}`)
          .then(r => {
            this.form = r.data.data
            this.item = r.data.data

            this.form.created_date = new Date(r.data.data.created_mm_dd_yyyy)
            this.form.deliverydate = new Date(r.data.data.deliverydate)
            
                       
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

    },
    
    submit () {
      this.isLoading = true
      let method = 'post'
      let url = '/user/store'

      if (this.id) {
        method = 'patch'
        url = `/user/${this.id}`
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
    },
  }
}
</script>
