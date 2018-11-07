var util = require("../../utils/util.js")
Page({
  data: {
    bonus: '0.00',
    forward: '',
    userInfo: {}
  },
  onLoad: function(options) {
    console.log(options)
    var bonus = options.bonus
    var forward = options.forward
    var activityId = options.activityId
    if (bonus) {
      this.setData({
        bonus: options.bonus
      })
    }
    if (forward) {
      this.setData({
        forward: options.forward
      })
    }
    if (activityId) {
      this.setData({
        activityId: options.activityId
      })
    }
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
    }
  },
  shareActivity: function() {
    var that = this
    var item = new Object();
    item.openId = wx.getStorageSync('openId')
    item.activityId = that.data.activityId
    wx.request({
      url: util.requestUrl + 'survey/shareActivity',
      method: 'POST',
      data: item,
      success: function(res) {
        var result = res.data.data
        that.setData({
          bonus: result.totalBonus,
          forward: 'forward'
        })
      }
    })
  },
  onShareAppMessage: function(res) {
    var openId = wx.getStorageSync('openId')
    return {
      title: '这是一个有红包的问卷哦（限宝妈参与）',
      path: 'pages/awardexame/awardexame?openId=' + openId,
      imageUrl: "http://miniany.oss-cn-beijing.aliyuncs.com/minianys/shareImg.jpg",
      success: (res) => {
        var forward = this.data.forward
        if (forward != 'forward'){
          this.shareActivity()
        }
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  returnIndex: function() {
    wx.switchTab({
      url: '../index/index',
    })
  }

})