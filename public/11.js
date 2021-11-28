(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ClientsLogSample.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ClientsLogSample.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_ModalTrashBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/ModalTrashBox */ "./resources/js/components/ModalTrashBox.vue");
/* harmony import */ var _components_ModalLogView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/ModalLogView */ "./resources/js/components/ModalLogView.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ClientsLogSample',
  components: {
    ModalTrashBox: _components_ModalTrashBox__WEBPACK_IMPORTED_MODULE_0__["default"],
    ModalLogView: _components_ModalLogView__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    dataUrl: {
      type: String,
      "default": null
    },
    checkable: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      isModalActive: false,
      isViewModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      arrcount: null,
      viewObject: null
    };
  },
  computed: {
    trashObjectName: function trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name;
      }

      return null;
    } // viewSubject (){
    // return this.clients
    // }

  },
  created: function created() {
    this.getData();
  },
  methods: {
    getData: function getData() {
      var _this = this;

      if (this.dataUrl) {
        this.isLoading = true;
        axios.get(this.dataUrl).then(function (r) {
          _this.isLoading = false;

          if (r.data && r.data.data) {
            if (r.data.data.length > _this.perPage) {
              _this.paginated = true;
              _this.arrcount = r.data.data.length;
            }

            _this.clients = r.data.data;
          }
        })["catch"](function (err) {
          _this.isLoading = false;

          _this.$buefy.toast.open({
            message: "Error: ".concat(e.message),
            type: 'is-danger',
            queue: false
          });
        });
      }
    },
    trashModal: function trashModal(trashObject) {
      this.trashObject = trashObject;
      this.isModalActive = true;
    },
    trashConfirm: function trashConfirm() {
      var _this2 = this;

      this.isModalActive = false;

      if (this.trashObject.advanced > 0 || this.trashObject.status == 'complete') {
        return this.$buefy.toast.open({
          message: "Error: Cannot Delete while payment",
          type: 'is-warning',
          queue: false
        });
      } else {
        axios["delete"]("/serviceclients/".concat(this.trashObject.id, "/destroy")).then(function (r) {
          _this2.getData();

          _this2.$buefy.snackbar.open({
            message: "Deleted ".concat(_this2.trashObject.name),
            queue: false
          });
        })["catch"](function (err) {
          _this2.$buefy.toast.open({
            message: "Error: ".concat(err.message),
            type: 'is-danger',
            queue: false
          });
        });
      }
    },
    trashCancel: function trashCancel() {
      this.isModalActive = false;
    } // openLogView (viewObject = null) {
    //   //this.submit();
    //   this.isViewModalActive = true
    // },
    // viewCancel () {
    //   this.isViewModalActive = false
    // },

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ModalLogView.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ModalLogView.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalBox */ "./resources/js/components/ModalBox.vue");
/* harmony import */ var vue_html_to_paper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-html-to-paper */ "./node_modules/vue-html-to-paper/dist/index.js");
/* harmony import */ var vue_html_to_paper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_html_to_paper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    ModalBox: _ModalBox__WEBPACK_IMPORTED_MODULE_0__["default"],
    VueHtmlToPaper: vue_html_to_paper__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  name: 'ModalLogView',
  props: {
    isActive: {
      type: Boolean,
      "default": false
    },
    confirmLabel: {
      type: String,
      "default": 'Confirm'
    },
    confirmType: {
      type: String,
      "default": 'is-info'
    },
    viewSubject: {
      type: Object,
      "default": null
    }
  },
  data: function data() {
    return {
      isViewModalActive: false,
      printData: null,
      columns: [{
        field: 'id',
        label: 'No',
        width: '40',
        numeric: true
      }, {
        field: 'Taskname',
        label: 'Task Name'
      }, {
        field: 'Tasknote',
        label: 'Task Note'
      }, {
        field: 'Taskprice',
        label: 'Task Price  (Rs.)',
        centered: true
      }]
    };
  },
  computed: {
    confirmButtonClass: function confirmButtonClass() {
      return "button ".concat(this.confirmType);
    }
  },
  methods: {
    cancel: function cancel() {
      this.$emit('cancel');
    },
    confirm: function confirm() {
      this.$emit('confirm');
    },
    print: function print() {
      // Pass the element id here
      this.$htmlToPaper('printMe');
    }
  },
  watch: {
    isActive: function isActive(newValue) {
      this.isViewModalActive = newValue;
    },
    isViewModalActive: function isViewModalActive(newValue) {
      if (!newValue) {
        this.cancel();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Reports/report.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Reports/report.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Charts_chart_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/Charts/chart.config */ "./resources/js/components/Charts/chart.config.js");
/* harmony import */ var _components_TitleBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/TitleBar */ "./resources/js/components/TitleBar.vue");
/* harmony import */ var _components_HeroBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/HeroBar */ "./resources/js/components/HeroBar.vue");
/* harmony import */ var _components_Tiles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/Tiles */ "./resources/js/components/Tiles.vue");
/* harmony import */ var _components_CardWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/CardWidget */ "./resources/js/components/CardWidget.vue");
/* harmony import */ var _components_CardComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/CardComponent */ "./resources/js/components/CardComponent.vue");
/* harmony import */ var _components_Charts_LineChart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/Charts/LineChart */ "./resources/js/components/Charts/LineChart.js");
/* harmony import */ var _components_ClientsLogSample__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/ClientsLogSample */ "./resources/js/components/ClientsLogSample.vue");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// @ is an alias to /src









/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'home',
  components: {
    ClientsLogSample: _components_ClientsLogSample__WEBPACK_IMPORTED_MODULE_7__["default"],
    LineChart: _components_Charts_LineChart__WEBPACK_IMPORTED_MODULE_6__["default"],
    CardComponent: _components_CardComponent__WEBPACK_IMPORTED_MODULE_5__["default"],
    CardWidget: _components_CardWidget__WEBPACK_IMPORTED_MODULE_4__["default"],
    Tiles: _components_Tiles__WEBPACK_IMPORTED_MODULE_3__["default"],
    HeroBar: _components_HeroBar__WEBPACK_IMPORTED_MODULE_2__["default"],
    TitleBar: _components_TitleBar__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: _components_Charts_chart_config__WEBPACK_IMPORTED_MODULE_0__["chartOptionsMain"]
      },
      form: {
        technician_id: null,
        startdate: null,
        enddate: null
      },
      formI: {
        technician_id: null,
        startdate: null,
        enddate: null
      },
      Allservice: 0,
      AllserviceArray: [],
      todayArray: [],
      total: 0,
      today: 0,
      month: 0,
      hidelog: true,
      hideTechLog: false,
      techniciansOn: false,
      paginated: true,
      technicianCommissionArray: [],
      totalIncome: [],
      technicianCommissionArrayCount: false,
      technicianCommissionTotal: null,
      perPage: 5,
      incomebydate: false,
      totalIncomecal: null
    };
  },
  computed: {
    titleStack: function titleStack() {
      return ['Admin', 'Dashboard'];
    }
  },
  //getclientcount(){}
  mounted: function mounted() {
    this.fillChartData();
    this.getStatistics();
    this.getTechnicians();
  },
  methods: {
    randomChartData: function randomChartData(n) {
      var data = [];

      for (var i = 0; i < n; i++) {
        data.push(Math.round(Math.random() * 200));
      }

      return data;
    },
    // inputOne (v) {
    //   this.startdate = moment(v).format('YYYY-MM-DD')
    // },
    fillChartData: function fillChartData() {
      this.defaultChart.chartData = {
        datasets: [{
          fill: false,
          borderColor: _components_Charts_chart_config__WEBPACK_IMPORTED_MODULE_0__["chartColors"]["default"].primary,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: _components_Charts_chart_config__WEBPACK_IMPORTED_MODULE_0__["chartColors"]["default"].primary,
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: _components_Charts_chart_config__WEBPACK_IMPORTED_MODULE_0__["chartColors"]["default"].primary,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.randomChartData(9)
        }, {
          fill: false,
          borderColor: _components_Charts_chart_config__WEBPACK_IMPORTED_MODULE_0__["chartColors"]["default"].info,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: _components_Charts_chart_config__WEBPACK_IMPORTED_MODULE_0__["chartColors"]["default"].info,
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: _components_Charts_chart_config__WEBPACK_IMPORTED_MODULE_0__["chartColors"]["default"].info,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.randomChartData(9)
        }, {
          fill: false,
          borderColor: _components_Charts_chart_config__WEBPACK_IMPORTED_MODULE_0__["chartColors"]["default"].danger,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: _components_Charts_chart_config__WEBPACK_IMPORTED_MODULE_0__["chartColors"]["default"].danger,
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: _components_Charts_chart_config__WEBPACK_IMPORTED_MODULE_0__["chartColors"]["default"].danger,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.randomChartData(9)
        }],
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09']
      };
    },
    submit: function submit() {
      var _this = this;

      this.isLoading = true;
      var method = 'post';
      var url = '/technician/log';
      var sentData = {
        startdate: moment__WEBPACK_IMPORTED_MODULE_8___default()(this.form.startdate).format('YYYY-MM-DD'),
        enddate: moment__WEBPACK_IMPORTED_MODULE_8___default()(this.form.enddate).format('YYYY-MM-DD'),
        techid: this.form.technician_id
      };
      axios({
        method: method,
        url: url,
        data: sentData
      }).then(function (r) {
        _this.isLoading = false;

        if (r.data && r.data.data) {
          if (r.data.data.length > _this.perPage) {
            _this.paginated = true;
          }

          if (r.data.data.length > 0) {
            _this.technicianCommissionArrayCount = true;
          }

          _this.technicianCommissionArray = r.data.data;
          _this.technicianCommissionTotal = _this.technicianCommissionArray.reduce(function (acc, item) {
            return acc + parseInt(item.technicianCommission);
          }, 0);
        } else {
          _this.$buefy.snackbar.open({
            message: 'Something went wrong',
            queue: false
          });
        }
      })["catch"](function (e) {
        _this.isLoading = false;

        _this.$buefy.toast.open({
          message: "Error: ".concat(e.message),
          type: 'is-danger',
          queue: false
        });
      });
    },
    submitIncome: function submitIncome() {
      var _this2 = this;

      this.isLoading = true;
      var method = 'post';
      var url = '/incomeGain';
      var sentData = {
        startdate: moment__WEBPACK_IMPORTED_MODULE_8___default()(this.formI.startdate).format('YYYY-MM-DD'),
        enddate: moment__WEBPACK_IMPORTED_MODULE_8___default()(this.formI.enddate).format('YYYY-MM-DD')
      };
      axios({
        method: method,
        url: url,
        data: sentData
      }).then(function (r) {
        _this2.isLoading = false;

        if (r.data && r.data.data) {
          if (r.data.data.length > _this2.perPage) {
            _this2.paginated = true;
          }

          _this2.totalIncome = r.data.data;
          _this2.totalIncomecal = _this2.totalIncome.reduce(function (acc, item) {
            return acc + parseInt(item.netTotal);
          }, 0);
        } else {
          _this2.$buefy.snackbar.open({
            message: 'Something went wrong',
            queue: false
          });
        }
      })["catch"](function (e) {
        _this2.isLoading = false;

        _this2.$buefy.toast.open({
          message: "Error: ".concat(e.message),
          type: 'is-danger',
          queue: false
        });
      });
    },
    getStatistics: function getStatistics() {
      var _this3 = this;

      this.isLoading = true;
      axios.get('/dashboardstat').then(function (r) {
        _this3.isLoading = false;

        if (r.data && r.data.data) {
          if (r.data.data.length > _this3.perPage) {
            _this3.paginated = true;
          }

          _this3.total = r.data.data.length;
          _this3.AllserviceArray = r.data.data; //all complete array

          _this3.AllserviceArray = r.data.data.filter(function (option) {
            return option.status == 'complete';
          }); //completed today array

          var AllserviceTodayArray = _this3.AllserviceArray.filter(function (option) {
            return moment__WEBPACK_IMPORTED_MODULE_8___default()(String(option.updated_at)).format('MMM D, Y').toString() == moment__WEBPACK_IMPORTED_MODULE_8___default()(String(new Date())).format('MMM D, Y').toString();
          }); //today all array


          _this3.todayArray = r.data.data.filter(function (option) {
            return option.created == moment__WEBPACK_IMPORTED_MODULE_8___default()(String(new Date())).format('MMM D, Y').toString();
          });

          if (_this3.total > 0 && r.data.data) {
            _this3.Allservice = _this3.AllserviceArray.reduce(function (acc, item) {
              return acc + parseInt(item.PaymentDue);
            }, 0) + r.data.data.reduce(function (acc, item) {
              return acc + parseInt(item.advanced);
            }, 0);
          } //     today calculation


          if (_this3.total > 0 && r.data.data) {
            _this3.today = _this3.todayArray.reduce(function (acc, item) {
              return acc + parseInt(item.advanced);
            }, 0) + AllserviceTodayArray.reduce(function (acc, item) {
              return acc + parseInt(item.PaymentDue);
            }, 0);
          } //this month all array


          var AllserviceMonthArray = r.data.data.filter(function (option) {
            return moment__WEBPACK_IMPORTED_MODULE_8___default()(String(option.created)).format('MMM').toString() == moment__WEBPACK_IMPORTED_MODULE_8___default()(String(new Date())).format('MMM').toString();
          }); //this month completed

          var AllserviceMonthCompletedArray = r.data.data.filter(function (option) {
            return option.status == 'complete';
          }); //this month updated

          var AllserviceMonthUpdateArray = AllserviceMonthCompletedArray.filter(function (option) {
            return moment__WEBPACK_IMPORTED_MODULE_8___default()(String(option.updated_at)).format('MMM').toString() == moment__WEBPACK_IMPORTED_MODULE_8___default()(String(new Date())).format('MMM').toString();
          });

          if (_this3.total > 0 && r.data.data) {
            _this3.month = AllserviceMonthArray.reduce(function (acc, item) {
              return acc + parseInt(item.advanced);
            }, 0) + AllserviceMonthUpdateArray.reduce(function (acc, item) {
              return acc + parseInt(item.PaymentDue);
            }, 0);
          }
        }
      })["catch"](function (err) {
        _this3.isLoading = false;

        _this3.$buefy.toast.open({
          message: "Error: ".concat(err.message),
          type: 'is-danger',
          queue: false
        });
      });
    },
    getTechnicians: function getTechnicians() {
      var _this4 = this;

      this.isLoading = true;
      axios.get('/technician').then(function (r) {
        _this4.isLoading = false;

        if (r.data && r.data.data) {
          if (r.data.data.length > _this4.perPage) {
            _this4.paginated = true;
          } // this.technicians = r.data.data


          _this4.technicians = r.data.data.filter(function (option) {
            return option.techStatus == 'Active';
          });

          if (_this4.technicians) {
            _this4.techniciansOn = true;
          }
        }
      })["catch"](function (err) {
        _this4.isLoading = false;

        _this4.$buefy.toast.open({
          message: "Error: ".concat(err.message),
          type: 'is-danger',
          queue: false
        });
      });
    },
    openTechStat: function openTechStat() {
      this.hidelog = false;
      this.hideTechLog = true;
      this.incomebydate = false;
    },
    openIncome: function openIncome() {
      this.hidelog = false;
      this.hideTechLog = false;
      this.technicianCommissionArrayCount = false;
      this.incomebydate = true;
    },
    openLogStat: function openLogStat() {
      this.hidelog = true;
      this.hideTechLog = false;
      this.technicianCommissionArrayCount = false;
      this.incomebydate = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ClientsLogSample.vue?vue&type=template&id=9b27d75e&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ClientsLogSample.vue?vue&type=template&id=9b27d75e& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("modal-trash-box", {
        attrs: {
          "is-active": _vm.isModalActive,
          "trash-subject": _vm.trashObjectName
        },
        on: { confirm: _vm.trashConfirm, cancel: _vm.trashCancel }
      }),
      _vm._v(" "),
      _c(
        "b-table",
        {
          attrs: {
            "checked-rows": _vm.checkedRows,
            checkable: _vm.checkable,
            loading: _vm.isLoading,
            paginated: _vm.paginated,
            "per-page": _vm.perPage,
            striped: true,
            hoverable: true,
            "default-sort": "name",
            data: _vm.clients
          },
          on: {
            "update:checkedRows": function($event) {
              _vm.checkedRows = $event
            },
            "update:checked-rows": function($event) {
              _vm.checkedRows = $event
            }
          },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(props) {
                return [
                  _c(
                    "b-table-column",
                    { staticClass: "has-no-head-mobile is-image-cell" },
                    [
                      props.row.avatar
                        ? _c("div", { staticClass: "image" }, [
                            _c("img", {
                              staticClass: "is-rounded",
                              attrs: { src: props.row.avatar }
                            })
                          ])
                        : _vm._e()
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      attrs: {
                        label: "Service Bill ID",
                        field: "newservice_id",
                        sortable: "",
                        searchable: ""
                      }
                    },
                    [
                      _vm._v(
                        "\n        " +
                          _vm._s(props.row.newservice_id) +
                          "\n      "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      attrs: {
                        label: "Name",
                        field: "name",
                        sortable: "",
                        searchable: ""
                      }
                    },
                    [_vm._v("\n        " + _vm._s(props.row.name) + "\n      ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      attrs: {
                        label: "Telephone",
                        field: "telephone",
                        sortable: "",
                        searchable: ""
                      }
                    },
                    [
                      _vm._v(
                        "\n        " + _vm._s(props.row.telephone) + "\n      "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      attrs: {
                        label: "Delivery date",
                        field: "deliverydate",
                        sortable: "",
                        searchable: ""
                      }
                    },
                    [
                      _vm._v(
                        "\n        " +
                          _vm._s(props.row.deliverydate) +
                          "\n      "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      attrs: {
                        label: "Status",
                        field: "status",
                        sortable: "",
                        searchable: ""
                      }
                    },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(props.row.status) +
                          "\n          "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      attrs: { label: "Created", sortable: "", searchable: "" }
                    },
                    [
                      _c(
                        "small",
                        {
                          staticClass: "has-text-grey is-abbr-like",
                          attrs: { title: props.row.created }
                        },
                        [_vm._v(_vm._s(props.row.created))]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-table-column",
                    {
                      staticClass: "is-actions-cell",
                      attrs: { "custom-key": "actions" }
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "buttons is-right" },
                        [
                          _c(
                            "router-link",
                            {
                              staticClass: "button is-small is-primary",
                              attrs: {
                                to: {
                                  name: "historyLogs.view",
                                  params: { id: props.row.newservice_id }
                                }
                              }
                            },
                            [
                              _c("b-icon", {
                                attrs: { icon: "account", size: "is-small" }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ]
                  )
                ]
              }
            }
          ])
        },
        [
          _vm._v(" "),
          _c(
            "section",
            { staticClass: "section", attrs: { slot: "empty" }, slot: "empty" },
            [
              _c(
                "div",
                { staticClass: "content has-text-grey has-text-centered" },
                [
                  _vm.isLoading
                    ? [
                        _c(
                          "p",
                          [
                            _c("b-icon", {
                              attrs: {
                                icon: "dots-horizontal",
                                size: "is-large"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("p", [_vm._v("Fetching data...")])
                      ]
                    : [
                        _c(
                          "p",
                          [
                            _c("b-icon", {
                              attrs: { icon: "emoticon-sad", size: "is-large" }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("p", [_vm._v("Nothing's here…")])
                      ]
                ],
                2
              )
            ]
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ModalLogView.vue?vue&type=template&id=57ab8687&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ModalLogView.vue?vue&type=template&id=57ab8687& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "b-modal",
    {
      attrs: { active: _vm.isViewModalActive, "has-modal-card": "" },
      on: {
        "update:active": function($event) {
          _vm.isViewModalActive = $event
        }
      }
    },
    [
      _c("div", { staticClass: "modal-card" }, [
        _c("header", { staticClass: "modal-card-head" }, [
          _c("p", { staticClass: "modal-card-title" }, [
            _vm._v("History for service")
          ])
        ]),
        _vm._v(" "),
        _c(
          "section",
          { staticClass: "modal-card-body" },
          [
            _vm._t("default"),
            _vm._v(
              "\n\n     " + _vm._s(_vm.viewSubject.name) + "\n\n       \n    "
            )
          ],
          2
        ),
        _vm._v(" "),
        _c("footer", { staticClass: "modal-card-foot" }, [
          _c(
            "button",
            {
              staticClass: "button",
              attrs: { type: "button" },
              on: { click: _vm.cancel }
            },
            [_vm._v("Cancel")]
          ),
          _vm._v(" "),
          _c(
            "button",
            { class: _vm.confirmButtonClass, on: { click: _vm.print } },
            [_vm._v("Print")]
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Reports/report.vue?vue&type=template&id=2e7b6063&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Reports/report.vue?vue&type=template&id=2e7b6063& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("title-bar", { attrs: { "title-stack": _vm.titleStack } }),
      _vm._v(" "),
      _c("hero-bar", { attrs: { "has-right-visible": false } }, [
        _vm._v("\n      Reports\n    ")
      ]),
      _vm._v(" "),
      _c(
        "section",
        { staticClass: "section is-main-section" },
        [
          _c(
            "tiles",
            [
              _c("card-widget", {
                staticClass: "tile is-child",
                attrs: {
                  type: "is-primary",
                  icon: "account-multiple",
                  number: _vm.total,
                  label: "Clients"
                }
              }),
              _vm._v(" "),
              _c("card-widget", {
                staticClass: "tile is-child",
                attrs: {
                  type: "is-info",
                  icon: "cart-outline",
                  number: _vm.today,
                  prefix: "Rs. ",
                  label: "Today Sales"
                }
              }),
              _vm._v(" "),
              this.$store.state.isAdmin
                ? _c("card-widget", {
                    staticClass: "tile is-child",
                    attrs: {
                      type: "is-info",
                      icon: "cart-outline",
                      number: _vm.month,
                      prefix: "Rs. ",
                      label: "Monthly Sales"
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              this.$store.state.isAdmin
                ? _c("card-widget", {
                    staticClass: "tile is-child",
                    attrs: {
                      type: "is-info",
                      icon: "cart-outline",
                      number: _vm.Allservice,
                      prefix: "Rs. ",
                      label: "All Sales"
                    }
                  })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "tile is-ancestor" }, [
            _c("div", { staticClass: "tile is-vertical " }, [
              _c("div", { staticClass: "tile" }, [
                this.$store.state.isAdmin
                  ? _c(
                      "div",
                      {
                        staticClass: "tile is-parent is-vertical",
                        on: {
                          click: function($event) {
                            return _vm.openLogStat()
                          }
                        }
                      },
                      [_vm._m(0)]
                    )
                  : _vm._e(),
                _vm._v(" "),
                this.$store.state.isAdmin
                  ? _c(
                      "div",
                      {
                        staticClass: "tile is-parent is-vertical",
                        on: {
                          click: function($event) {
                            return _vm.openIncome()
                          }
                        }
                      },
                      [_vm._m(1)]
                    )
                  : _vm._e(),
                _vm._v(" "),
                this.techniciansOn
                  ? _c(
                      "div",
                      {
                        staticClass: "tile is-parent is-vertical",
                        on: {
                          click: function($event) {
                            return _vm.openTechStat()
                          }
                        }
                      },
                      [_vm._m(2)]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm._m(3)
              ])
            ])
          ]),
          _vm._v(" "),
          _vm.hidelog == true && this.$store.state.isAdmin
            ? _c(
                "card-component",
                {
                  staticClass: "has-table has-mobile-sort-spaced",
                  attrs: { title: "Service Log" }
                },
                [
                  _c("clients-log-sample", {
                    attrs: { "data-url": "/serviceclients/servicelog" }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.hideTechLog == true
            ? _c(
                "card-component",
                {
                  staticClass: "has-table has-mobile-sort-spaced",
                  attrs: { title: "Tech Log" }
                },
                [
                  _c("section", { staticClass: "section is-main-section" }, [
                    _c(
                      "form",
                      {
                        on: {
                          submit: function($event) {
                            $event.preventDefault()
                            return _vm.submit($event)
                          }
                        }
                      },
                      [
                        _c(
                          "b-field",
                          { attrs: { grouped: "" } },
                          [
                            _c(
                              "b-field",
                              {
                                attrs: {
                                  label: "Select Technician *",
                                  expanded: ""
                                }
                              },
                              [
                                _c(
                                  "b-select",
                                  {
                                    attrs: { placeholder: "Select Technician" },
                                    model: {
                                      value: _vm.form.technician_id,
                                      callback: function($$v) {
                                        _vm.$set(_vm.form, "technician_id", $$v)
                                      },
                                      expression: "form.technician_id"
                                    }
                                  },
                                  [
                                    _c("option"),
                                    _vm._v(" "),
                                    _vm._l(_vm.technicians, function(option) {
                                      return _c(
                                        "option",
                                        {
                                          key: option.id,
                                          domProps: { value: option.id }
                                        },
                                        [
                                          _vm._v(
                                            "\n                                " +
                                              _vm._s(option.name) +
                                              "\n                            "
                                          )
                                        ]
                                      )
                                    })
                                  ],
                                  2
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-field",
                              { attrs: { label: "Start Date", expanded: "" } },
                              [
                                _c("b-datepicker", {
                                  attrs: { placeholder: "Click to select..." },
                                  model: {
                                    value: _vm.form.startdate,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "startdate", $$v)
                                    },
                                    expression: "form.startdate"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-field",
                              { attrs: { label: "End Date", expanded: "" } },
                              [
                                _c("b-datepicker", {
                                  attrs: { placeholder: "Click to select..." },
                                  model: {
                                    value: _vm.form.enddate,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "enddate", $$v)
                                    },
                                    expression: "form.enddate"
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "b-field",
                          { attrs: { expanded: "" } },
                          [
                            _c(
                              "b-button",
                              {
                                attrs: {
                                  type: "is-primary float-right",
                                  loading: _vm.isLoading,
                                  "native-type": "submit"
                                }
                              },
                              [_vm._v("Submit ")]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ])
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.technicianCommissionArrayCount
            ? _c(
                "card-component",
                {
                  staticClass: "has-table has-mobile-sort-spaced",
                  attrs: { title: "Technician Commissions" }
                },
                [
                  this.technicianCommissionTotal
                    ? _c("span", [
                        _vm._v(
                          "Total Commissions : Rs. " +
                            _vm._s(this.technicianCommissionTotal)
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "b-table",
                    {
                      attrs: {
                        loading: _vm.isLoading,
                        paginated: _vm.paginated,
                        "per-page": _vm.perPage,
                        striped: true,
                        hoverable: true,
                        "default-sort": "id",
                        data: _vm.technicianCommissionArray
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function(props) {
                              return [
                                _c(
                                  "b-table-column",
                                  {
                                    attrs: {
                                      label: "Service Bill",
                                      field: "id",
                                      sortable: "",
                                      searchable: ""
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n              " +
                                        _vm._s(props.row.id) +
                                        "\n            "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-table-column",
                                  {
                                    attrs: {
                                      label: "Name",
                                      field: "name",
                                      sortable: "",
                                      searchable: ""
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n              " +
                                        _vm._s(props.row.name) +
                                        "\n            "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-table-column",
                                  {
                                    attrs: {
                                      label: "Status",
                                      field: "techStatus",
                                      sortable: "",
                                      searchable: ""
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n              " +
                                        _vm._s(props.row.techStatus) +
                                        "\n            "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-table-column",
                                  {
                                    attrs: {
                                      label: "Task name",
                                      field: "Taskname",
                                      sortable: "",
                                      searchable: ""
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n              " +
                                        _vm._s(props.row.Taskname) +
                                        "\n            "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-table-column",
                                  {
                                    attrs: {
                                      label: "Commission",
                                      field: "technicianCommission",
                                      sortable: "",
                                      searchable: ""
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n              " +
                                        _vm._s(props.row.technicianCommission) +
                                        "\n            "
                                    )
                                  ]
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        126542728
                      )
                    },
                    [
                      _vm._v(" "),
                      _c(
                        "section",
                        {
                          staticClass: "section",
                          attrs: { slot: "empty" },
                          slot: "empty"
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass:
                                "content has-text-grey has-text-centered"
                            },
                            [
                              _vm.isLoading
                                ? [
                                    _c(
                                      "p",
                                      [
                                        _c("b-icon", {
                                          attrs: {
                                            icon: "dots-horizontal",
                                            size: "is-large"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("p", [_vm._v("Fetching data...")])
                                  ]
                                : [
                                    _c(
                                      "p",
                                      [
                                        _c("b-icon", {
                                          attrs: {
                                            icon: "emoticon-sad",
                                            size: "is-large"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("p", [_vm._v("Nothing's here…")])
                                  ]
                            ],
                            2
                          )
                        ]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("span", [
                    _vm._v(
                      "Total Commissions : Rs. " +
                        _vm._s(this.technicianCommissionTotal)
                    )
                  ])
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.incomebydate
            ? _c(
                "card-component",
                {
                  staticClass: "has-table has-mobile-sort-spaced",
                  attrs: { title: "Income" }
                },
                [
                  _c(
                    "form",
                    {
                      on: {
                        submit: function($event) {
                          $event.preventDefault()
                          return _vm.submitIncome($event)
                        }
                      }
                    },
                    [
                      _c(
                        "b-field",
                        { attrs: { grouped: "" } },
                        [
                          _c(
                            "b-field",
                            { attrs: { label: "Start Date", expanded: "" } },
                            [
                              _c("b-datepicker", {
                                attrs: { placeholder: "Click to select..." },
                                model: {
                                  value: _vm.formI.startdate,
                                  callback: function($$v) {
                                    _vm.$set(_vm.formI, "startdate", $$v)
                                  },
                                  expression: "formI.startdate"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-field",
                            { attrs: { label: "End Date", expanded: "" } },
                            [
                              _c("b-datepicker", {
                                attrs: { placeholder: "Click to select..." },
                                model: {
                                  value: _vm.formI.enddate,
                                  callback: function($$v) {
                                    _vm.$set(_vm.formI, "enddate", $$v)
                                  },
                                  expression: "formI.enddate"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "b-field",
                        { attrs: { expanded: "" } },
                        [
                          _c(
                            "b-button",
                            {
                              attrs: {
                                type: "is-primary float-right",
                                loading: _vm.isLoading,
                                "native-type": "submit"
                              }
                            },
                            [_vm._v("Submit ")]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  this.totalIncomecal
                    ? _c("span", [
                        _vm._v(
                          "Total Income : Rs. " + _vm._s(this.totalIncomecal)
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "b-table",
                    {
                      attrs: {
                        loading: _vm.isLoading,
                        paginated: _vm.paginated,
                        "per-page": _vm.perPage,
                        striped: true,
                        hoverable: true,
                        "default-sort": "id",
                        data: _vm.totalIncome
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function(props) {
                              return [
                                _c(
                                  "b-table-column",
                                  {
                                    attrs: {
                                      label: "Service Bill",
                                      field: "newservice_id",
                                      sortable: "",
                                      searchable: ""
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n              " +
                                        _vm._s(props.row.newservice_id) +
                                        "\n            "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-table-column",
                                  {
                                    attrs: {
                                      label: "status",
                                      field: "status",
                                      sortable: "",
                                      searchable: ""
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n              " +
                                        _vm._s(props.row.status) +
                                        "\n            "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-table-column",
                                  {
                                    attrs: {
                                      label: "netTotal",
                                      field: "netTotal",
                                      sortable: "",
                                      searchable: ""
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n              " +
                                        _vm._s(props.row.netTotal) +
                                        "\n            "
                                    )
                                  ]
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        1316525909
                      )
                    },
                    [
                      _vm._v(" "),
                      _c(
                        "section",
                        {
                          staticClass: "section",
                          attrs: { slot: "empty" },
                          slot: "empty"
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass:
                                "content has-text-grey has-text-centered"
                            },
                            [
                              _vm.isLoading
                                ? [
                                    _c(
                                      "p",
                                      [
                                        _c("b-icon", {
                                          attrs: {
                                            icon: "dots-horizontal",
                                            size: "is-large"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("p", [_vm._v("Fetching data...")])
                                  ]
                                : [
                                    _c(
                                      "p",
                                      [
                                        _c("b-icon", {
                                          attrs: {
                                            icon: "emoticon-sad",
                                            size: "is-large"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("p", [_vm._v("Nothing's here…")])
                                  ]
                            ],
                            2
                          )
                        ]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  this.totalIncomecal
                    ? _c("span", [
                        _vm._v(
                          "Total Income : Rs. " + _vm._s(this.totalIncomecal)
                        )
                      ])
                    : _vm._e()
                ],
                1
              )
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "article",
      { staticClass: "tile is-child notification is-primary" },
      [
        _c("p", { staticClass: "title" }, [_vm._v("Service")]),
        _vm._v(" "),
        _c("p", { staticClass: "subtitle" }, [_vm._v("Change History")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "article",
      { staticClass: "tile is-child notification is-primary" },
      [
        _c("p", { staticClass: "title" }, [_vm._v("Income")]),
        _vm._v(" "),
        _c("p", { staticClass: "subtitle" }, [_vm._v("Filter By Date")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "article",
      { staticClass: "tile is-child notification is-primary" },
      [
        _c("p", { staticClass: "title" }, [_vm._v("Technicians")]),
        _vm._v(" "),
        _c("p", { staticClass: "subtitle" }, [_vm._v("Commissions")])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "tile is-parent is-vertical" }, [
      _c("article", { staticClass: "tile is-child notification is-primary" }, [
        _c("p", { staticClass: "title" }, [_vm._v("Technicians")]),
        _vm._v(" "),
        _c("p", { staticClass: "subtitle" }, [_vm._v("Top tile")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/ClientsLogSample.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/ClientsLogSample.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ClientsLogSample_vue_vue_type_template_id_9b27d75e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClientsLogSample.vue?vue&type=template&id=9b27d75e& */ "./resources/js/components/ClientsLogSample.vue?vue&type=template&id=9b27d75e&");
/* harmony import */ var _ClientsLogSample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClientsLogSample.vue?vue&type=script&lang=js& */ "./resources/js/components/ClientsLogSample.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ClientsLogSample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ClientsLogSample_vue_vue_type_template_id_9b27d75e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ClientsLogSample_vue_vue_type_template_id_9b27d75e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ClientsLogSample.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ClientsLogSample.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/ClientsLogSample.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsLogSample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ClientsLogSample.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ClientsLogSample.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsLogSample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ClientsLogSample.vue?vue&type=template&id=9b27d75e&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/ClientsLogSample.vue?vue&type=template&id=9b27d75e& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsLogSample_vue_vue_type_template_id_9b27d75e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ClientsLogSample.vue?vue&type=template&id=9b27d75e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ClientsLogSample.vue?vue&type=template&id=9b27d75e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsLogSample_vue_vue_type_template_id_9b27d75e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsLogSample_vue_vue_type_template_id_9b27d75e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/ModalLogView.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/ModalLogView.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalLogView_vue_vue_type_template_id_57ab8687___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalLogView.vue?vue&type=template&id=57ab8687& */ "./resources/js/components/ModalLogView.vue?vue&type=template&id=57ab8687&");
/* harmony import */ var _ModalLogView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalLogView.vue?vue&type=script&lang=js& */ "./resources/js/components/ModalLogView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalLogView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalLogView_vue_vue_type_template_id_57ab8687___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalLogView_vue_vue_type_template_id_57ab8687___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ModalLogView.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ModalLogView.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/ModalLogView.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalLogView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ModalLogView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ModalLogView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalLogView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ModalLogView.vue?vue&type=template&id=57ab8687&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/ModalLogView.vue?vue&type=template&id=57ab8687& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalLogView_vue_vue_type_template_id_57ab8687___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ModalLogView.vue?vue&type=template&id=57ab8687& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ModalLogView.vue?vue&type=template&id=57ab8687&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalLogView_vue_vue_type_template_id_57ab8687___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalLogView_vue_vue_type_template_id_57ab8687___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Reports/report.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/Reports/report.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _report_vue_vue_type_template_id_2e7b6063___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./report.vue?vue&type=template&id=2e7b6063& */ "./resources/js/views/Reports/report.vue?vue&type=template&id=2e7b6063&");
/* harmony import */ var _report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./report.vue?vue&type=script&lang=js& */ "./resources/js/views/Reports/report.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _report_vue_vue_type_template_id_2e7b6063___WEBPACK_IMPORTED_MODULE_0__["render"],
  _report_vue_vue_type_template_id_2e7b6063___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Reports/report.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Reports/report.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/views/Reports/report.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./report.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Reports/report.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Reports/report.vue?vue&type=template&id=2e7b6063&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/Reports/report.vue?vue&type=template&id=2e7b6063& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_template_id_2e7b6063___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./report.vue?vue&type=template&id=2e7b6063& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Reports/report.vue?vue&type=template&id=2e7b6063&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_template_id_2e7b6063___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_template_id_2e7b6063___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);