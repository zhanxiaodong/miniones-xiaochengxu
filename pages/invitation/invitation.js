var util = require("../../utils/util.js")
Page({
  data:{
    showModalStatus: false,
    needAuth: false
  },
  modalStatus: function(e){
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    this.setData({
      showModalStatus: !this.data.showModalStatus
    })
  },
  onGotUserInfo: function (e) {
    if (e.detail.userInfo) {
      util.getOpenId()
      this.checkAuth()
    }
  },
  checkAuth: function () {
    if (!wx.getStorageSync('openId')) {
      this.setData({
        needAuth: true
      })
    } else {
      this.setData({
        needAuth: false
      })
    }
  },
  goBalance: function(e){
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    wx.navigateTo({
      url: '../balance/balance'
    })
  },
  onLoad: function(){
    this.checkAuth()
    this.findCash()
  },
  findCash: function(){
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findCashByOpenId?openId=' + wx.getStorageSync('openId') + '&type=CASHGIFT',
      success: function(res){
        that.setData({
          casha: res.data.data
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '孩童穿搭订阅:职场妈妈最爱,省时省心省力',
      imageUrl: "/images/inv.jpg",
      path: "pages/index/index?openId=" + wx.getStorageSync('openId')
    }
  }
});