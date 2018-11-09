var util = require("../../utils/util.js")
Page({
  data: {
    awardlist: [{
        title: '邀请体验券',
        detail: '1元体验，3套时尚搭配免费送到家',
        color: '#04B8A0'
      },
      {
        title: '99抵扣券',
        detail: '会员专享，每季度可领600低扣券',
        color: '#04B8A0'
      },
      {
        title: '199抵扣券',
        detail: '会员专享，每季度可领600低扣券',
        color: '#04B8A0'
      }
    ],
    needAuth: false,
  },

  goGuide: function() {
    wx.redirectTo({
      url: '/pages/guide/guide'
    })
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
  },
  saveShareRecord: function (openId) {
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
  }
})