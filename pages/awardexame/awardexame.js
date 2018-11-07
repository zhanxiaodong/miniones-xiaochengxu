var util = require("../../utils/util.js")
Page({
  data: {
    awardImg: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/bd1.png',
    image: 'http://miniany.oss-cn-beijing.aliyuncs.com/minianys/question-green.png',
    result: {
      awards: ['仔细答题结束可以获得随机现金红包', '每满1000份回答，现金红包翻倍一次'],
      deadlineStr: '2018-10-31 00:00截至',
      rules: '任意用户皆可参与问卷并获得奖励；\n现金红包翻倍最高5倍',
      joinNum: 0,
    },
    shareOpenId:''
  },
  onLoad: function(options) {
    console.log(options)
    if (options.shareOpenId) {
      this.setData({
        shareOpenId: options.shareOpenId
      })
    }
    this.findActivity();
  },
  findActivity: function() {
    var that = this
    wx.request({
      url: util.requestUrl + 'survey/findActivity?title=WQDC&openId=' + wx.getStorageSync('openId'),
      success: function(res) {
        var result = res.data.data
        if (result) {
          that.setData({
            result: result
          })
          var surveyRecord = result.surveyRecord
          if (surveyRecord) {
            var totalBonus = surveyRecord.bonus + surveyRecord.shareBonus
            var url = '../awardmoney/awardmoney?bonus=' + totalBonus + '&forward=forward&activityId=' + surveyRecord.activityId
            if (surveyRecord.shareBonus == 0) {
              url = '../awardmoney/awardmoney?bonus=' + totalBonus + '&activityId=' + surveyRecord.activityId
            }
            wx.redirectTo({
              url: url,
            })
          }
        }
      }
    })
  },
  clickTab: function() {
    wx.navigateTo({
      url: '../awardone/awardone?activityId=' + this.data.result.id + '&shareOpenId=' + this.data.shareOpenId,
    })
  },

  goPeople: function() {
    wx.navigateTo({
      url: '../awardPeople/awardPeople',
    })
  },

  goIndex: function() {
    wx.switchTab({
      url: '../index/index',
    })
  }
})