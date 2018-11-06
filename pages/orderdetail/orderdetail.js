var util = require("../../utils/util.js")
Page({
  data: {
    src: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/phone-2.png',
    goodsList:[],
    payBoxInfo:{},
    payAmount:0.0,
    evaluateStatus:'去评价'
  },
  onLoad: function (options) {
    if (options.boxId) {
      this.setData({
        boxId: options.boxId
      })
    }
    this.findBox()
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