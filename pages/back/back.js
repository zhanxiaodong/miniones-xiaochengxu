import { $wuxDialog } from '../../components/wux'
var util = require("../../utils/util.js")
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({
  data: {
    totalNum: 3,
    goodsList: [],
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2018,
    endYear: 2018,
    showModalStatus:false
  },
  onLoad: function (options) {
    if (options.boxId) {
      var boxId = options.boxId
      this.setData({
        boxId: boxId
      })
      this.findBackList(boxId)
    }
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimeInit();
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj1.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
    this.timeValue()
  },
  timeValue() {
    var dateTime1 = this.data.dateTime1
    var dateTimeArray1 = this.data.dateTimeArray1
    var time = dateTimeArray1[0][dateTime1[0]] + '-' + dateTimeArray1[1][dateTime1[1]]
      + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]]
    this.setData({
      applyDate: time
    });
  },
  changeDateTime1(e) {
    var dateTime1 = e.detail.value
    this.setData({
      dateTime1: dateTime1
    });
    this.timeValue()
  },
  changeDateCanle() {
    this.setData({
      dateTime1: this.data.dateTime
    })
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray1: dateArr
    });
  },
  findBackList: function (boxId) {
    var that = this
    wx.request({
      url: util.requestUrl + 'box/findBackGoods?boxId=' + boxId,
      success: function (res) {
        var result = res.data.data
        if (result.backList) {
          that.setData({
            goodsList: result.backList
          })
          that.bindAllSelect()
        }
        if (result.address) {
          that.setData({
            address: result.address
          })
        }
      }
    })
  },
  pickerOk: function (e) {
    console.log('pickerOk----')
  },
  showModal: function () {
    this.setData({
      showModalStatus: true
    })
  },
  hideModal: function (e) {
    this.setData({
      showModalStatus: false
    })
  },
  reBuy: function() {
    var boxId = this.data.boxId
    wx.navigateTo({
      url: '../buy/buy?boxId=' + boxId + '&reBuy=true'
    })
  },
  /**
   * 提交退件的操作
   */
  commitBack: function (e) {
    var formId = e.detail.formId
    var checkList = this.data.checkList
    var goodsList = this.data.goodsList
    var boxId = this.data.boxId
    if (!checkList || checkList.length != goodsList.length) {
      $wuxDialog.confirm({
        content: '您有未选择推荐的商品,请先完成付款再进行退件',
        cancelText: '取消',
        confirmText: '付款',
        onConfirm(e) {
          wx.navigateTo({
            url: '../buy/buy?boxId=' + boxId + '&reBuy=true'
          })
        },
        onCancel(e) {
        },
      })
    } else {
      var address = this.data.address
      if (!address) {
        this.showMsg('寄件地址为空')
        return
      }
      var applyDate = this.data.applyDate
      if (!applyDate) {
        this.showMsg('上门时间为空')
        return
      }
      var nowDate = util.formatTime(new Date(), '-')
      if (applyDate < nowDate) {
        $wuxDialog.alert({
          content: '上门时间不能早于当前时间!'
        })
        return
      }
      var item = new Object()
      item.boxId = this.data.boxId
      item.status = 'RETURN_EXPRESS'
      item.goodsList = this.data.checkList
      item.addressId = this.data.address.id
      item.applyDate = this.data.applyDate
      item.type = 'RETURN'
      item.formId = formId
      item.openId = wx.getStorageSync('openId')
      $wuxDialog.confirm({
        content: '确认预约召回？请确保取件时间和地址无误～',
        cancelText: '再看看',
        confirmText: '确定',
        onConfirm(e) {
          console.log('退件啦啦啦啦啦啦啦啦啦啦')
          // wx.request({
          //   url: util.requestUrl + 'box/saveBoxBackGoods',
          //   method: 'POST',
          //   data: item,
          //   success: function (res) {
          //     wx.navigateBack()
          //   }
          // })
        },
      })
    }
  },
  showMsg: function (msg) {
    wx.showToast({
      title: msg,
      image: '/images/icons/warn.png',
      duration: 2000
    })
  },
  inputblur: function () {
    console.log('inputblur---')
  },
  bindAllSelect: function () {
    var goodsList = this.data.goodsList
    var currentAllSelect = this.data.allSelect
    var list
    if (goodsList) {
      list = goodsList
    } else {
      list = this.data.goodsList
    }

    var checkList
    if (currentAllSelect) {
      for (var i = 0; i < list.length; i++) {
        var curItem = list[i];
        curItem.checked = false;
      }
      checkList = null
    } else {
      checkList = new Array()
      for (var i = 0; i < list.length; i++) {
        var curItem = list[i]
        curItem.checked = true
        checkList.push(curItem.id)
      }
    }
    this.setData({
      goodsList: list,
      checkList: checkList,
      allSelect: !currentAllSelect
    })
  },
  getAddr: function () {
    wx.navigateTo({
      url: '../readdr/readdr?check=' + true
    })
  },
  goodsChange: function (e) {
    var goodsList = this.data.goodsList, values = e.detail.value;
    var goodsLen = goodsList.length
    var valusLen = values.length
    var currentAllSelect = this.data.allSelect
    if (goodsLen == valusLen) {
      currentAllSelect = true
    } else {
      currentAllSelect = false
    }
    for (var i = 0; i < goodsLen; ++i) {
      goodsList[i].checked = false;

      for (var j = 0; j < valusLen; ++j) {
        if (goodsList[i].id == values[j]) {
          goodsList[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      goodsList: goodsList,
      checkList: values,
      allSelect: currentAllSelect
    });
  }
})