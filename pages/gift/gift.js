// pages/gift/gift.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onShow: function () {
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/list/list',
      })
    }, 2000)
  },
  
 /*setTimeout(function timeList () {
    wx.navigateTo({
      url: '/pages/list/list',
    })
  }, 2000)*/
})


/*function timegoList() {
  wx.navigateTo({
    url: '/pages/list/list',
  })*/

