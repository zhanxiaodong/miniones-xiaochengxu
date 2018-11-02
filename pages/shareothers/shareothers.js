// pages/shareothers/shareothers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
       awardlist: [
         { title: '邀请体验券', detail: '1元体验，3套时尚搭配免费送到家', color: '#04B8A0'},
         { title: '99抵扣券', detail: '会员专享，每季度可领600低扣券', color: '#04B8A0'},
         { title: '199抵扣券', detail: '会员专享，每季度可领600低扣券', color: '#04B8A0'}
       ]
  },
  
  goGuide: function () {
    wx.redirectTo({
      url: '/pages/guide/guide'
    })
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

  }


})