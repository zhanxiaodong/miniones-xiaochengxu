var util = require("../../utils/util.js")
Page({
  data: {
  
  },
  onUnload: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  onShareAppMessage: function (res) {
    var shareOpenId = wx.getStorageSync('openId')
    var shareUserInfo = wx.getStorageSync('userInfo').nickName
    console.log(shareUserInfo, shareOpenId)
    return {
      title: '帮帮我！我想要这个赠品',
      path: 'pages/shareothers/shareothers?shareType=FINSHEDBOOK&shareOpenId=' + shareOpenId + '&shareUserInfo=' + shareUserInfo,
      imageUrl: "https://miniany.oss-cn-beijing.aliyuncs.com/minianys/milk.jpg",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
})