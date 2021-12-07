<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar :has-right-visible="false">
      Dashboard
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-widget class="tile is-child" type="is-primary" icon="account-multiple"  :number="total"  label="Users"/>
        <card-widget class="tile is-child" type="is-info" icon="account-multiple"  :number="1" label="Unregisterd"/>
      </tiles>

      <card-component :title="getUsercsvData" v-if="this.$store.state.isAdmin"  @header-icon-click="fillChartData" icon="finance" >
        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart style="height: 100%"
                      ref="bigChart"
                      chart-id="big-line-chart"
                      :chart-data="defaultChart.chartData"
                      :extra-options="defaultChart.extraOptions">
          </line-chart>
        </div>
      </card-component>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import * as chartConfig from '@/components/Charts/chart.config'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import LineChart from '@/components/Charts/LineChart'

export default {
  name: 'home',
  components: {
    LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    TitleBar
  },
  
  data () {
    return {
      isLoading: false,
      userPrecentageData:null,
      total:0,

      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain,
       
      },
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Dashboard'
      ]
    },
    //return csv data to the home page
    getUsercsvData(){

      this.isLoading = true;

      axios
        .get('/users_csv_data')
        .then(r => {
          this.isLoading = false
          
          if (r && r.status) {

            this.total = r.data.total_users
            if(r.data.totalUserPercentages){
              this.userPrecentageData = r.data.totalUserPercentages
            
              // load line chart with csv data
              this.fillChartData(this.userPrecentageData)
            }else{
               this.$buefy.toast.open({
            
                message: `Warning: User weekly data precentages not found`,
                type: 'is-warning',
                queue: false
              })
            }
      
          }

        })
        .catch( err => {
          this.isLoading = false
          this.$buefy.toast.open({
            
            message: `Error: ${err.response.data.error}`,
            type: 'is-danger',
            queue: false
          })
          
        })
      
    }
  },
 
  mounted () {

    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false
    })
  },
  
  methods: {

    //attch csv data to the chart  
    fillChartData (Precentage_data) {
    
      this.defaultChart.chartData = {

         datasets: [],
         labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']

      }
      // populate the chart data
      var dataarray = this.defaultChart.chartData;
            Precentage_data.forEach(function (val, i) {
            
              dataarray.datasets.push({
                  label: '# of Precentages :' + (i+1) + 'week',
                  fill: false,
                  borderColor: chartConfig.chartColors.default[i+1],
                  borderWidth: 2,
                  borderDash: [],
                  borderDashOffset: 0.0,
                  pointBackgroundColor: chartConfig.chartColors.default[i+1],
                  pointBorderColor: 'rgba(255,255,255,0)',
                  pointHoverBackgroundColor: chartConfig.chartColors.default[i+1],
                  pointBorderWidth: 0,
                  pointHoverRadius: 4,
                  pointHoverBorderWidth: 15,
                  pointRadius: 4,
                  data: val
              });
            });

    },

    
    
  }
}
</script>
