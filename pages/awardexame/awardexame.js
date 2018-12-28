var util = require("../../utils/util.js")
Page({
  data: {
    show: true,
    confirmNo: false,
    awardImg: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/dahua.png',
    image: 'http://miniany.oss-cn-beijing.aliyuncs.com/minianys/question-green.png',
    result: {
      awards: ['仔细答题结束可以获得随机现金红包', '每满1000份回答，现金红包翻倍一次'],
      deadlineStr: '2018-10-31 00:00截至',
      rules: '任意用户皆可参与问卷并获得奖励；\n现金红包翻倍最高5倍',
      joinNum: 0,
    },
    needAuth: false,
    shareOpenId: ''
  },
  onLoad: function(options) {
    console.log(options)
    var that = this
    if (options.shareOpenId) {
      that.setData({
        shareOpenId: options.shareOpenId
      })
    }
    if (options.shareType) {
      that.setData({
        shareType: options.shareType
      })
    }
    that.checkAuth()
    this.findActivity();
  },
  checkAuth: function() {
    if (!wx.getStorageSync('openId')) {
      this.setData({
        needAuth: true
      })
    } else {
      this.setData({
        needAuth: false
      })
      this.saveShareRecord(wx.getStorageSync('openId'))
    }
  },
  onGotUserInfo: function(e) {
    if (e.detail.userInfo) {
      this.getOpenId()
    }
  },
  saveShareRecord: function(openId) {
    var that = this
    var item = new Object()
    item.openId = openId
    var shareType = that.data.shareType
    if (shareType) {
      item.shareType = shareType
    }
    var shareOpenId = that.data.shareOpenId
    if (shareType) {
      item.shareOpenId = shareOpenId
    }
    util.saveShareRecord(item)
  },
  getOpenId: function() {
    var that = this
    wx.login({
      success: function(res) {
        var code = res.code
        if (code) {
          wx.getUserInfo({
            withCredentials: true,
            success: function(resU) {
              wx.setStorageSync('userInfo', resU.userInfo);
              wx.request({
                url: util.requestUrl + 'wechat/decodeUserInfo',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  encryptedData: resU.encryptedData,
                  iv: resU.iv,
                  code: code
                },
                success: function(data) {
                  var openId = data.data.data.openid
                  wx.setStorageSync('openId', openId)
                  wx.request({
                    url: util.requestUrl + 'user/findUserByOpenId?openId=' + openId,
                    success: function(res) {
                      var result = res.data.data
                      var level = "0"
                      if (result) {
                        level = result.level
                      }
                      wx.setStorageSync('level', level)
                      that.checkAuth()
                      that.saveShareRecord(openId)
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  findActivity: function() {
    var that = this
    wx.request({
      url: util.requestUrl + 'survey/findActivity?title=WQDC&openId=' + wx.getStorageSync('openId'),
      success: function(res) {
        var result = res.data.data
        if (result) {
          wx.setNavigationBarTitle({
            title: result.content,
          })
          that.setData({
            result: result
          })
          var surveyRecord = result.surveyRecord
          if (surveyRecord) {
            that.setData({
              show: false
            })
          } else {
            that.setData({
              show: true
            })
          }
        }
      }
    })
  },
  clickTab: function() {
    var that = this
    if (that.data.show) {
      var item = new Object()
      item.openId = wx.getStorageSync('openId')
      item.activityId = this.data.result.id
      wx.request({
        url: util.requestUrl + 'survey/joinActivity',
        method: 'POST',
        data: item,
        success: function(res) {
          that.findActivity()
        }
      })
    }
    that.setData({
      confirmNo: true
    })
  },
  // goPeople: function() {
  //   wx.navigateTo({
  //     url: '../awardPeople/awardPeople',
  //   })
  // },

  // goIndex: function() {
  //   wx.reLaunch({
  //     url: '../index/index',
  //   })
  // },
  // 取消弹窗
  hideComfirm: function(e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    this.setData({
      confirmNo: false
    })
  },
})