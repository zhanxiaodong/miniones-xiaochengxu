var util = require("../../utils/util.js")
var viplev = require('../../utils/viplev.js')
import {
  $wuxDialog
} from '../../components/wux'
Page({
  data: {
    payAmount: 0,
    realPayAmount: 0,
    expCouponAmount: 0,
    expCoupon: null,
    payStatus: false,
    recharge: false,
    useExpCoupon: false,
    weights: [
      '不确定', '10', '12', '14', '16', '18', '20', '22', '24', '26'
    ],
    markIndex:false,
    hidIndex:false,
    addressInfo:null,
    date: "",
    remarks:null,
    more:{
      occasions:'日常（默认）',
      consumList:'不变（默认）'
    }
  },
  onLoad: function (options) {
    var babyId = options.babyId
    var stylistId = options.stylistId
    var today = util.getToday(new Date())
    this.setData({
      date: today,
      babyId: babyId,
      stylistId: stylistId
    })
    var level = wx.getStorageSync('level')
    if (level < 40) {
      this.updatePayAmount()
    }
    this.findExpCoupon()
  },
  updatePayAmount: function () {
    var that = this
    wx.request({
      url: util.requestUrl + 'box/updatePayAmount?openId=' + wx.getStorageSync('openId'),
      success: function (res) {
        that.setData({
          payAmount: res.data.data,
          realPayAmount: res.data.data
        })
      }
    })
  },
  wepay: function (e) {
    var item = this.updateItem()
    item.payChannel = 'WECHAT'
    item.type = 'SERVICE'
    item.amount = this.data.realPayAmount
    // item.amount = 1.01
    if (this.data.useExpCoupon) {
      item.expCoupon = this.data.expCoupon
    }
    item.formId = e.detail.formId
    var that = this
    wx.request({
      url: util.requestUrl + 'wechat/wxPay',
      method: 'POST',
      data: item,
      success: function (res) {
        var param = res.data;
        item.otherNo = param.data.orderNo
        wx.requestPayment({
          timeStamp: param.data.timeStamp,
          nonceStr: param.data.nonceStr,
          package: param.data.package,
          signType: 'MD5',
          paySign: param.data.paySign,
          success: function (event) {
            console.log(111111)
            that.setData({
              recharge: false,
              payStatus: false
            })
            wx.request({
              url: util.requestUrl + 'user/balanceGetBox',
              method: 'POST',
              data: item,
              success: function (res) {
                wx.navigateTo({
                  url: '../giftBox/giftBox',
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
  findExpCoupon: function () {
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findCoupon?openId=' + wx.getStorageSync('openId') + '&type=EXPVOUCHER&status=CREATE',
      success: function (res) {
        if (res.data.data) {
          that.setData({
            expCoupon: res.data.data[0],
            expCouponAmount: res.data.data[0].amount
          })
        }
      }
    })
  },
  hideModal: function (e) {
    if (this.data.recharge) {
      this.setData({
        recharge: false
      })
    } else {
      this.setData({
        payStatus: false
      })
    }
  },
  bindRemarks: function (e) {
    var remarks = e.detail.value
    this.setData({
      remarks: remarks
    })
  },
  more: function (e) {
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
  getAddr: function () {
    wx.navigateTo({
      url: '../readdr/readdr?check=' + true
    })
  },
  bindInput: function (e) {
    this.setData({
      style: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 要一个盒子
   */
  needBox: function (e) {
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
            payStatus: true,
            realPayAmount: realPayAmount,
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
  changeRe: function () {
    this.setData({
      recharge: true
    })
  },
  updateItem: function () {
    var that = this
    var box = that.data.more
    if (!box) {
      box = new Object()
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
  saveBox: function (e) {
    var that = this
    var box = that.data.more
    console.log(box)
    if (!box) {
      box = new Object()
    }
    box.type = 'GEN'
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
      success: function (res) {
        var code = res.data.code
        if (code == "0") {
          $wuxDialog.alert({
            content: res.data.message
          })
        } else {
          var status = box.status
          var boxId = res.data.data.id
          let pages = getCurrentPages(); //当前页面
          let prevPage = pages[pages.length - 2]; //上一页面
          prevPage.setData({ //直接给上移页面赋值
            boxStatus: status,
            boxId: boxId
          });
          wx.redirectTo({
            url: '../designinfo/designinfo?boxId=' + boxId
          })
        }
      }
    })
  },
  goGift:function(){
    wx.navigateTo({
      url: '/pages/gift/gift',
    })
  },
  inMark:function(){
    this.setData({
      markIndex: false,
      hidIndex: false
    })
  }
})