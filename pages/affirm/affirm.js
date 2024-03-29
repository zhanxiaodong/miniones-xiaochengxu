var util = require("../../utils/util.js")
var viplev = require('../../utils/viplev.js')
var dateUtils = require('../../utils/date.js')
import {
  $wuxDialog
} from '../../components/wux'
Page({
  data: {
    onFocus: false, //textarea焦点是否选中
    isShowText: false, //控制显示 textarea 还是 text
    remark: '', //用于存储textarea输入内容
    payAmount: 0,
    realPayAmount: 0,
    expCouponAmount: 0,
    expCoupon: null,
    payStatus: false,
    useExpCoupon: false,
    markIndex: false,
    hidIndex: false,
    addressInfo: null,
    date: "",
    remarks: null,
    more: {
      occasions: '日常（默认）',
      consumList: '不变（默认）'
    },
    date: {
      month: '',
      day: ''
    }
  },

  onShowTextare() { //显示textare
    this.setData({
      isShowText: false,
      onFocus: true
    })
  },
  onShowText() { //显示text
    this.setData({
      isShowText: true,
      onFocus: false
    })
  },
  onRemarkInput(event) { //保存输入框填写内容
    var value = event.detail.value;
    this.setData({
      remark: value,
    });
  },

  onLoad: function(options) {
    var that = this
    var boxId = options.boxId
    var babyId
    var stylistId
    if(boxId){
      wx.request({
        url: util.requestUrl + 'box/findById?boxId=' + boxId,
        success: function (res) {
          if (res.data.data) {
            babyId = res.data.data.babyId
            stylistId = res.data.data.stylistId
            that.setData({
              stylistId: stylistId,
              babyId: babyId
            })
          }
        }
      })
      that.setData({
        boxId: boxId
      })
    } else {
      that.setData({
        stylistId: options.stylistId,
        babyId: options.babyId
      })
    }
    var chooseDate = dateUtils.formatDate(dateUtils.plusDay(new Date(), 3))
    var today = dateUtils.formatDate2(dateUtils.plusDay(new Date(), 3))
    that.setData({
      date: today,
      chooseDate: chooseDate
    })
    var level = wx.getStorageSync('level')
    if (level < 40) {
      that.updatePayAmount()
    }
    that.findExpCoupon()
    that.findLastBox()
  },
  updatePayAmount: function() {
    var that = this
    wx.request({
      url: util.requestUrl + 'box/updatePayAmount?openId=' + wx.getStorageSync('openId'),
      success: function(res) {
        that.setData({
          payAmount: res.data.data,
          realPayAmount: res.data.data
        })
      }
    })
  },
  wepay: function(e) {
    var item = this.updateItem()
    item.payChannel = 'WECHAT'
    item.type = 'SERVICE'
    item.amount = this.data.realPayAmount
    if (this.data.useExpCoupon) {
      item.expCoupon = this.data.expCoupon
    }
    item.formId = e.detail.formId
    var that = this
    wx.request({
      url: util.requestUrl + 'wechat/wxPay',
      method: 'POST',
      data: item,
      success: function(res) {
        var param = res.data;
        item.otherNo = param.data.orderNo
        wx.requestPayment({
          timeStamp: param.data.timeStamp,
          nonceStr: param.data.nonceStr,
          package: param.data.package,
          signType: 'MD5',
          paySign: param.data.paySign,
          success: function(event) {
            that.setData({
              payStatus: false
            })
            wx.request({
              url: util.requestUrl + 'user/balanceGetBox',
              method: 'POST',
              data: item,
              success: function(res) {
                wx.navigateTo({
                  url: '../list/list',
                })
              }
            })
          }
        });
      }
    });
  },
  /**
   * 查看是否存在体验券
   */
  findExpCoupon: function() {
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findCoupon?openId=' + wx.getStorageSync('openId') + '&type=EXPVOUCHER&status=CREATE',
      success: function(res) {
        if (res.data.data) {
          that.setData({
            expCoupon: res.data.data[0],
            expCouponAmount: res.data.data[0].amount
          })
        }
      }
    })
  },
  findLastBox: function() {
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findLastBox?openId=' + wx.getStorageSync('openId'),
      success: function(res) {
        if (res.data.data) {
          that.setData({
            address: res.data.data.address
          })
        }
      }
    })
  },
  bindRemarks: function(e) {
    var remarks = e.detail.value
    this.setData({
      remarks: remarks
    })
  },
  more: function(e) {
    var more = this.data.more
    if (more) {
      wx.navigateTo({
        url: '/pages/body/body?more=' + JSON.stringify(more),
      })
    } else {
      wx.navigateTo({
        url: '/pages/body/body'
      })
    }
  },
  /**
   * 选择地址
   */
  getAddr: function() {
    wx.navigateTo({
      url: '../readdr/readdr?check=' + true
    })
  },
  bindInput: function(e) {
    this.setData({
      style: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log(e)
    var dataRes = e.detail.value
    var newDate = dateUtils.plusDay(dateUtils.parseDate(dataRes), 0)
    this.setData({
      date: dateUtils.formatDate2(newDate)
    })
  },
  /**
   * 要一个盒子
   */
  needBox: function(e) {
    var that = this
    var address = that.data.address
    if (!address) {
      wx.showToast({
        title: '请选择地址',
        image: '/images/icons/warn.png',
        duration: 1000
      })
    } else {
      var level = wx.getStorageSync('level')
      if (level < viplev.YEAR) {
        if (that.data.payAmount > 0) {
          var payAmount = that.data.payAmount
          var expCouponAmount = that.data.expCouponAmount
          var realPayAmount = that.data.realPayAmount
          var useExpCoupon = that.data.useExpCoupon
          if (expCouponAmount && !that.data.payStatus) {
            realPayAmount = payAmount - expCouponAmount
            useExpCoupon = true
          }
          if (realPayAmount < 0) {
            realPayAmount = 0
          }
          that.setData({
            /*isShowText: true,*/
            payStatus: true,
            realPayAmount: realPayAmount.toFixed(1),
            markIndex: true,
            hidIndex: true,
            useExpCoupon: useExpCoupon
          })
        } else {
          that.saveBox(e)
        }
      } else {
        that.saveBox(e)
      }
    }
  },
  updateItem: function() {
    var that = this
    var box = that.data.more
    var boxId = that.data.boxId
    if (!box) {
      box = new Object()
    }
    if (boxId) {
      box.id = that.data.boxId
    }
    box.serviceAmount = this.data.payAmount
    box.payType = 'SERVICE'
    box.type = 'GEN'
    box.status = 'CREATE'
    box.orderTime = that.data.date
    box.openId = wx.getStorageSync('openId')
    box.stylistId = that.data.stylistId
    box.babyId = that.data.babyId
    box.style = that.data.style
    box.address = that.data.address
    box.remarks = that.data.remarks
    return box
  },
  saveBox: function(e) {
    var that = this
    var box = that.data.more
    var boxId = that.data.boxId
    console.log(box)
    if (!box) {
      box = new Object()
    }
    box.type = 'GEN'
    if (boxId){
      box.type ='SYSTEMSEND' 
      box.id = boxId
    }
    box.status = 'CREATE'
    box.orderTime = that.data.date
    box.openId = wx.getStorageSync('openId')
    box.stylistId = that.data.stylistId
    box.babyId = that.data.babyId
    box.style = that.data.style
    box.address = this.data.address
    box.remarks = that.data.remarks
    box.formId = e.detail.formId
     wx.request({
       url: util.requestUrl + 'box/saveBox',
       method: 'POST',
       data: box,
       success: function(res) {
         var code = res.data.code
         if (code == "0") {
           $wuxDialog.alert({
             content: res.data.message
           })
         } else {
           wx.showToast({
             title: '预约成功',
             duration: 1000
           })
           setTimeout(function () {
             wx.navigateTo({
               url: '../index/index',
             })
           }, 1000) 
         }
         console.log(code)
       }
     })
    console.log(box)
  },
  inMark: function() {
    this.setData({
      payStatus: false,
      markIndex: false,
      hidIndex: false
    })
  },
  cancelBox: function() {
    var item = new Object()
    item.closeReason = "客户自行要求取消"
    item.id = "5c2f27ac6c88376b51f14d97"
    item.orderNo = "minianys"
    item.status = "CLOSE"
    wx.request({
      url: util.requestUrl + 'box/closeBox',
      method: 'POST',
      data: item,
      success: function (res) {
        wx.showToast({
          title: '预约成功',
          duration: 1000
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '../index/index',
          })
        }, 1000) 
      }
    })
  }
})