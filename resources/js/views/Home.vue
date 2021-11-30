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

      <card-component v-if="this.$store.state.isAdmin" title="Performance" @header-icon-click="fillChartData" icon="finance" header-icon="reload">
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
import ClientsTableSample from '@/components/ClientsTableSample'
export default {
  name: 'home',
  components: {
    ClientsTableSample,
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
      clients:null,
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
    }
  },
 
  mounted () {

    // get cdv file data
    this.getUsercsvData();


    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false
    })
  },
  
  methods: {

    //attch csv data to the chart  
    fillChartData (data) {

      this.defaultChart.chartData = {
        datasets: [
          {
            fill: false,
            label: '# of Precentages',
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 0,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: data
          },
          // {
          //   fill: false,
          //   borderColor: chartConfig.chartColors.default.info,
          //   borderWidth: 2,
          //   borderDash: [],
          //   borderDashOffset: 0.0,
          //   pointBackgroundColor: chartConfig.chartColors.default.info,
          //   pointBorderColor: 'rgba(255,255,255,0)',
          //   pointHoverBackgroundColor: chartConfig.chartColors.default.info,
          //   pointBorderWidth: 20,
          //   pointHoverRadius: 4,
          //   pointHoverBorderWidth: 15,
          //   pointRadius: 4,
          //   data: data
          // },
        ],
        labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
      }
    },

    //return csv data to the home page
    getUsercsvData(){
      this.isLoading = true;

      axios
        .get('/users_csv_data')
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.data) {

            this.clients = r.data.totalUserPercentages
            this.total = r.data.total_users
            // load line chart with csv data
            this.fillChartData(this.clients)
          }

        })
        .catch( err => {
          console.log(err)
          this.isLoading = false
          this.$buefy.toast.open({
            
            message: `Error: ${err}`,
            type: 'is-danger',
            queue: false
          })
        })
    }
    
  }
}
</script>
