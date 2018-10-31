// pages/awardmoney/awardmoney.js
Page({
  data: {
    money: '2.25',
    topImg: '',
  },
  
  sendFriend: function () {
    wx.navigateTo({
      url: '',
    })
  },

  returnIndex: function () {
    wx.switchTab({
      url: '../index/index',
    })
  }
  
})