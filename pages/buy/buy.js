// pages/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conList:[
      { icon: "A", text1: "商品名称/品牌/颜色/尺码", text2: "点此可查看详情并评价商铺", money1: "￥130.00", money2: "￥240.00", },
      { icon: "B", text1: "商品名称/品牌/颜色/尺码", text2: "点此可查看详情并评价商铺", money1: "￥130.00", money2: "￥240.00", },
      { icon: "C", text1: "商品名称/品牌/颜色/尺码", text2: "点此可查看详情并评价商铺", money1: "￥130.00", money2: "￥240.00", },
      { icon: "D", text1: "商品名称/品牌/颜色/尺码", text2: "点此可查看详情并评价商铺", money1: "￥130.00", money2: "￥240.00", },
      { icon: "E", text1: "商品名称/品牌/颜色/尺码", text2: "点此可查看详情并评价商铺", money1: "￥130.00", money2: "￥240.00", },
    ],
    moneyTwo: "0", //账户余额度
    money: "467.00", //支付额度
    payBoxIndex:false,
    markIndex:false
  },
  goCulb:function(){
    wx.navigateTo({
      url:"/pages/club/club"
    })
  },
  inPayBox: function () {
    console.log(3)
    this.setData({
      markIndex: true,
      payBoxIndex: true
    })
  },
  inMark: function () {
    this.setData({
      markIndex: false,
      payBoxIndex: false
    })
  },
  goAssess:function(){
    wx.navigateTo({
      url: "/pages/assess/assess",
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