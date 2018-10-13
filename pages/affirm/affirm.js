// pages/affirm/affirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conList:[
      { icon: "icon-dingwei", text1: "您的寄件地址", text2: "收件地址", text3:"选择地址便于顺丰人员上门取件",font: "icon-arrow-right-copy" },
      { icon: "icon-solid-time", text1: "配送时间", text2: "（预计8月9号）", font: "icon-arrow-right-copy" },
      { icon: "icon-lingdang", text1: "明确需求", text2: "选填...", font: "icon-arrow-right-copy" },
    ],
    updatePanelAnimationData:{},
    updatePanelTop:2000,
    markIndex:0,
    hidIndex:false,
    addressInfo:null,
    date: "",
  },
  goBody:function(){
    wx.navigateTo({
      url: '/pages/body/body',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  goGift:function(){
    wx.navigateTo({
      url: '/pages/gift/gift',
    })
  },
  //选择寄件地址上拉页面
  showUpdatePanelEvent() {
    showUpdatePanel.call(this);
  },
  inTrue:function(){
    console.log(3)
    this.setData({
      markIndex: true,
      hidIndex: true
    })
  },
  inMark:function(){
    this.setData({
      markIndex: false,
      hidIndex: false
    })
  },
  chooseAddress(){
    console.log(343)
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          addressInfo: res
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //选择日期的方法
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
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
function showUpdatePanel() {
 
  let animation = wx.createAnimation({
    duration: 1000
  });
  
  animation.translateY('-100%').step();

  this.setData({
    updatePanelAnimationData: animation.export()
  });
}