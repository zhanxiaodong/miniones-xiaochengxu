var util = require("../../utils/util.js")
Page({
  data: {
    tabs: ["完成订单","正在服务"],
    activeIndex: 0,
    successOrder: [],
    serveOrder: [],
  },
  onLoad: function (options) {
    this.findRecord()
    this.findServiceRecord()
  },
  findServiceRecord: function () {
    var that = this
    wx.request({
      url: util.requestUrl + 'box/findServiceBoxRecord?openId=' + wx.getStorageSync('openId'),
      success: function (res) {
        var result = res.data.data
        if (result) {
          that.setData({
            serveOrder: result
          })
        }
      }
    })
  },
  findRecord: function () {
    var that = this
    wx.request({
      url: util.requestUrl + 'box/findBoxRecord?openId=' + wx.getStorageSync('openId'),
      success: function (res) {
        var result = res.data.data
        if (result) {
          that.setData({
            successOrder: result
          })
        }
      }
    })
  },
  goassess: function (e) {
    var boxId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../assess/assess?back=true&boxId=' + boxId
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  edit: function (event) {
    util.saveFormId(wx.getStorageSync('openId'), event.detail.formId)
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../order/order?inter=edit&id=' + id
    })
  },
  orderDetail: function (e) {
    var boxId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../orderdetail/orderdetail?boxId=' + boxId
    })
  },
  serveDetail: function(e) {
    var boxId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../servedetail/servedetail?boxId=' + boxId
    })
  }
})