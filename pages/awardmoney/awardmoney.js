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
        bonus: Number(bonus).toFixed(2)
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
    this.findSurveyRecord()
  },
  findSurveyRecord: function() {
    var that = this
    var item = new Object();
    item.openId = wx.getStorageSync('openId')
    item.activityId = that.data.activityId
    wx.request({
      url: util.requestUrl + 'survey/findSurveyRecord',
      method: 'POST',
      data: item,
      success: function(res) {
        var surveyRecord = res.data.data
        if (surveyRecord) {
          that.setData({
            surveyRecord: surveyRecord
          })
        }
      }
    })
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
        wx.showToast({
          title: '成功翻倍',
        })
        var result = res.data.data
        that.setData({
          bonus: result.totalBonus.toFixed(2),
          forward: 'forward'
        })
      }
    })
  },
  onShareAppMessage: function(res) {
    var shareOpenId = wx.getStorageSync('openId')
    console.log(shareOpenId)
    var forward = this.data.forward
    if (forward != 'forward') {
      this.shareActivity()
      this.setData({
        forward:'forward'
      })
    }
    return {
      title: '这是一个有红包的问卷哦（限宝妈参与）',
      path: 'pages/awardexame/awardexame?shareType=EXAME&shareOpenId=' + shareOpenId,
      imageUrl: "http://miniany.oss-cn-beijing.aliyuncs.com/minianys/shareImg.jpg",
    }
  },
  returnIndex: function() {
    wx.reLaunch({
      url: '../index/index',
    })
  }

})