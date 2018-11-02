Page({
  data: {

  },

  onLoad: function () {
    var bonus = options.bonus
    var activityId = options.activityId
    if (bonus) {
      this.setData({
        bonus: options.bonus
      })
    }
    if (activityId) {
      this.setData({
        activityId: options.activityId
      })
    }
  },
  onShow: function () {
    var bonus = this.data.bonus
    var activityId = this.data.activityId
    setTimeout(function () {
      wx.reLaunch({
       url: '../buffer/buffer?bonus=' + bonus + '&activityId=' + activityId,
      })
    }, 2000)
  },
 
})