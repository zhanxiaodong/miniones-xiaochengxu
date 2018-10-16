var util = require("../../utils/util.js")
Page({
    data: {
      colorAllItems: [
        { value: '接受合理搭配的所有颜色' },
        { value: '不喜欢灰暗色系' },
        { value: '不喜欢鲜艳色系' }
      ],
    },
    onLoad: function (options) {
      console.log(options)
      var inter = options.inter
      var style = options.style
      this.updateInfo()
      if (style) {
        this.setData({
          style: style
        })
      }
      if (inter) {
        this.setData({
          inter: inter
        })
      }
      var frontType = options.frontType
      if (frontType) {
        this.setData({
          frontType: frontType
        })
      }
    },
    updateInfo: function () {
      var openId = wx.getStorageSync('openId')
      var that = this
      wx.request({
        url: util.requestUrl + 'user/findUserByOpenId?openId=' + openId,
        success: function (res) {
          var result = res.data.data
          var oldColorType = result.colorType
          if (!oldColorType) {
            oldColorType = '接受全色系'
          }
          that.updateColorAll(oldColorType)
        }
      })
    },
    colorAllChange: function (e) {
      var value = e.detail.value
      console.log(value)
      this.updateColorAll(value)

      var index
      var colorAllItems = this.data.colorAllItems
      for (var i = 0; i < colorAllItems.length; ++i) {
        if (value == colorAllItems[i].value) {
          index = i
          break;
        }
      }
    },
    updateColorAll: function (value) {
      var colorAllItems = util.radioGroupChange(this.data.colorAllItems, value)
      this.setData({
        colorAllItems: colorAllItems,
        oldColorType: value
      })
    },
    next: function () {
        wx.navigateTo({
          url: "/pages/attitude/attitude?style=" + this.data.style + "&colorType=" + this.data.oldColorType
          })
    }
})