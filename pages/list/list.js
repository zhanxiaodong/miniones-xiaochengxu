Page({
  data: {
  
  },
  
  onShareAppMessage: function (res) {
    var shareOpenId = wx.getStorageSync('openId')
    return {
      title: '帮帮我！我想要这个赠品',
      path: 'pages/shareothers/shareothers?shareType=FINSHEDBOOK&shareOpenId=' + shareOpenId,
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