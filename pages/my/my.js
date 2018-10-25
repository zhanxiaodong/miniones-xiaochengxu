// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    babyMath: '2',
    womanMath: '1',
    orderMath: '3',
    reduceMath: '50'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  goWoman: function () {
    wx.navigateTo({
      url: '../designinfo/designinfo',
    })
  },

  goOrder:function() {
    wx.navigateTo({
      url: '../order/order',
    })
  },

  goBaby: function () {
    wx.navigateTo({
      url: '../babyInfo/babyInfo',
    })
  },

  goReduce: function () {
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },

  goVip: function () {
    wx.navigateTo({
      url: '../club/club',
    })
  },

  goPlan: function () {
    wx.navigateTo({
      url: '../plan/plan',
    })
  },

  goWallet: function () {
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },

  goGuide: function () {
    wx.navigateTo({
      url: '../guide/guide',
    })
  }

})