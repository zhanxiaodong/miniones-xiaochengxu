var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require("../../utils/util.js")
Page({
  data: {
    tabs: ["我的宝贝", "我的公益"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    defaultAva: '../../images/ava.png',
    babyList: []
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    })
    var stylistId = options.stylistId
    if (stylistId) {
      that.setData({
        stylistId: stylistId
      })
    }
  },
  onShow: function () {
    var that = this
    wx.request({
      url: util.requestUrl + 'baby/findBabyList?openId=' + wx.getStorageSync('openId'),
      success: function (res) {
        that.setData({
          babyList: res.data.data
        })
      }
    })
  },
  choose: function (event) {
    util.saveFormId(wx.getStorageSync('openId'), event.detail.formId)
    var babyId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/affirm/affirm?babyId=" + babyId + '&stylistId=' + this.data.stylistId,
    })
  },
  add: function (e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    wx.navigateTo({
      url: '../detail/detail?inter=add',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  }
});