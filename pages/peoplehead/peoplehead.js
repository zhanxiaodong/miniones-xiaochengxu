var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: []
  },
  onLoad(options) {
    var activityId = options.activityId ? options.activityId : "5c2589a9f49b0a2fa857968d"
    var that = this
    wx.request({
      url: util.requestUrl + '/survey/findJoinPerson?activityId=' + activityId,
      success: function (res) {
        var result = res.data.data
        if (result) {
          that.setData({
            result: result
          })
        }
      }
    })
  }
  
})