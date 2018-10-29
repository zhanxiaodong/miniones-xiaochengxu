// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  onShow: function () {
    setTimeout(function () {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }, 2000)
  },

})