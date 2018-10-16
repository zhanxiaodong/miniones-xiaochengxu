// pages/body/body.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choiceList:[
      { text: "春季",},
      { text: "夏季" },
      { text: "秋季" },
      { text: "冬季" },

    ],
    sceneList:[
      { lick:"mus1", text: "日常（默认）", check: false},
      { lick: "mus2", text: "校园", check: false},
      { lick: "mus3", text: "节日", check: false },
      { lick: "mus4", text: "度假", check: false },
    ],
    goodList: [
      { text: "不变（默认）" },
      { text: "接受更多尝试" },
    ]
  
  },
  goAffirm:function(){
    wx.navigateTo({
      url: '/pages/affirm/affirm',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  choicemus1:function(){
    wx.navigateTo({
      url: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    var items = this.data.sceneList;
        for (var j = 0; j < items.length; j++) {
          console.log(j,11)
          if (items[j].check) {
            items[j].check = false;
        }else if(items[j].check == false){
          items[j].check = true
        }
      
    }
    this.setData({
      sceneList: items
    });
    
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