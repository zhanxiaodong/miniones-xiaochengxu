// pages/club/club.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conList:[
      { img: "../../images/img1.jpg", text: "免服务费"},
      { img: "../../images/img1.jpg", text: "会员折上折" },
      { img: "../../images/img1.jpg", text: "专属搭配师" },
      { img: "../../images/img1.jpg", text: "199免/季" },
      { img: "../../images/img1.jpg", text: "全账号通行" },
    ],
    checkOne:true,
    checkTwo: false,
    moneyIndex:"199.00"
  },
  inCheckTwo:function(){
    if (this.data.checkOne = true) {
      this.setData({
        checkOne: false
      })
    }
    this.setData({
      checkTwo: true,
      moneyIndex:"99.00"
    })

  },
  inCheck:function(){
    if(this.data.checkTwo =true){
      this.setData({
        checkTwo:false
      })
    }
    this.setData({
      checkOne:true,
      moneyIndex: "199.00"
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