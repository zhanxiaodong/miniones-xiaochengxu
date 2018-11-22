// pages/load/load.js
Page({

  data: {

  },

  onShow: function () {
    setTimeout(function () {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }, 1000)
  },
})