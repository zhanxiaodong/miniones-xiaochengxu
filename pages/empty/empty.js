// pages/empty/empty.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  next: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})