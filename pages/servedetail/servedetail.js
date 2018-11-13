var util = require("../../utils/util.js")
Page({
  data: {
    src: '/images/phone-2.png',
    progressData: [],
  },
  onLoad: function(options) {
    if (options.boxId){
      this.setData({
        boxId: options.boxId
      })
    }
    this.findBoxTrack()
  },
  findBoxTrack: function() {
    var that = this
    var boxId = that.data.boxId
    if (boxId) {
      wx.request({
        url: util.requestUrl + 'box/findBoxTrack?boxId=' + boxId,
        success: function (res) {
          var result = res.data.data
          if (result.boxTrack) {
            that.setData({
              progressData: result.boxTrack
            })
          }
        }
      })
    }
  },
  
})