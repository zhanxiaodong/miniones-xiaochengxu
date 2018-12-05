var util = require("../../utils/util.js")
Page({
  data: {
    src: '/images/phone-2.png',
    goodsList:[],
    payBoxInfo:{},
    payAmount:0.0,
    evaluateStatus:'去评价',
    returnException:null,
  },
  onLoad: function (options) {
    if (options.boxId) {
      this.setData({
        boxId: options.boxId
      })
    }
    this.findBox()
    this.findBackException()
  },
  findBox: function () {
    var that = this
    var boxId = that.data.boxId
    if (boxId) {
      wx.request({
        url: util.requestUrl + 'box/findBoxByBoxId?boxId=' + boxId,
        success: function (res) {
          var result = res.data.data
          if (result.goodsList) {
            that.setData({
              goodsList: result.goodsList
            })
          }
          if (result.payBoxInfo) {
            that.setData({
              payBoxInfo: result.payBoxInfo
            })
          }
          that.setData({
            payAmount: result.payAmount,
            evaluateStatus: result.evaluateStatus
          })
        }
      })
    }
  },
  findBackException: function () {
    var that = this
    wx.request({
      url: util.requestUrl + 'box/findBackException?boxId=' + that.data.boxId,
      success: function (res) {
        var result = res.data.data
        if (result.returnException) {
          that.setData({
            returnException: result.returnException,
            boxNo: result.boxNo,
            payGoodsList: result.payGoodsList,
            noPayGoodsList: result.noPayGoodsList,
            boxStatus: result.boxStatus
          })
        }
      }
    })
  },
  wepay: function (e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var item = this.updateItem()
    var that = this
    wx.request({
      url: util.requestUrl + 'wechat/wxPay',
      method: 'POST',
      data: item,
      success: function (res) {
        var param = res.data;
        that.setData({
          outTradeNo: param.data.orderNo
        })
        wx.requestPayment({
          timeStamp: param.data.timeStamp,
          nonceStr: param.data.nonceStr,
          package: param.data.package,
          signType: 'MD5',
          paySign: param.data.paySign,
          success: function (event) {
            that.updateBox()
            that.setData({
              showModalStatus: false
            })
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              wx.reLaunch({
                url: '../index/index',
              })
            }, 2000)
          }
        });
      }
    });
  },
  updateBox() {
    var item = new Object()
    item.boxId = this.data.boxId
    item.orderNo = this.data.boxNo
    item.outTradeNo = this.data.outTradeNo
    wx.request({
      url: util.requestUrl + 'box/updateBoxDiffPay',
      method: 'POST',
      data: item
    })
  },
  updateItem: function () {
    var item = new Object()
    item.openId = wx.getStorageSync('openId')
    item.amount = this.data.returnException.needBackPayAmount
    item.type = 'PAY'
    item.checkList = this.data.returnException.needBackGoods
    item.boxNo = this.data.boxNo
    return item
  },
  serveDetail: function (e) {
    var boxId = this.data.boxId
    wx.navigateTo({
      url: '../servedetail/servedetail?boxId=' + boxId
    })
  },
  goassess: function () {
    var boxId = this.data.boxId
    wx.reLaunch({
      url: '../assess/assess?back=true&boxId=' + boxId
    })
  },
})