// pages/buffer/buffer.js
Page({
  data: {

  },

  onShow: function () {
    setTimeout(function () {
      wx.reLaunch({
        url: '/pages/awardmoney/awardmoney',
      })
    }, 2000)
  },
 
})