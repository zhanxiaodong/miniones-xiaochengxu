var util = require("../../utils/util.js")
Page({
  data: {
    colorAllItems: [
      { value: '商品太多选择困难' },
      { value: '商品良莠不齐难以判断' },
      { value: '经常会觉得贵' },
      { value: '找不到自己想要的' },
      { value: '其他' }
    ],
  },
  onLoad: function (options) {
    var inter = options.inter
    this.updateInfo()
    if (inter) {
      this.setData({
        inter: inter
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
    this.updateColorAll(value)
    var index
    var colorAllItems = this.data.colorAllItems
    for (var i = 0; i < colorAllItems.length; ++i) {
      if (value == colorAllItems[i].value) {
        index = i
        break;
      }
    }
    this.setData({
      colorAllItems: colorAllItems
    })
  },
  updateColorAll: function (value) {
    var colorAllItems = util.radioGroupChange(this.data.colorAllItems, value)
    this.setData({
      colorAllItems: colorAllItems,
      oldColorType: value
    })
  },
  next: function () {
    this.updateUser()
    util.updateStep(4)
    wx.navigateTo({
      url: "/pages/awardfour/awardfour"
    })
  },
  updateUser: function () {
    var item = new Object();
    item.wechatOpenId = wx.getStorageSync('openId')
    var colorType = this.data.oldColorType
    if (colorType) {
      item.colorType = colorType
    }
    wx.request({
      url: util.requestUrl + 'user/updateUser',
      method: 'POST',
      data: item
    })
    wx.setStorageSync('pagen', 'attitude')
  }
})