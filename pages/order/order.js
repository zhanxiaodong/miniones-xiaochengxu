var util = require("../../utils/util.js")
Page({
  data: {
    tabs: ["完成订单","正在服务"],
    activeIndex: 1,
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

  emptyStatus: function () {
      
  },

  goassess: function (e) {
    var boxId = e.currentTarget.dataset.id
    wx.reLaunch({
      url: '../assess/assess?back=true&boxId=' + boxId
    })
  },
  tabClick: function (e) {
    
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (this.data.activeIndex==0 && this.data.successOrder.length==0) {
      console.log(11111)
    }
    if (this.data.activeIndex == 1 && this.data.serveOrder.length == 0) {
      console.log(2222)
    }
    console.log(this.data.activeIndex, this.data.successOrder, this.data.serveOrder)
    
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