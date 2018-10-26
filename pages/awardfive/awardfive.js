var util = require("../../utils/util.js")
Page({
  data: {
    colorAllItems: [
      { value: '优选全球童装品牌' },
      { value: '商品采用国家质检标准' },
      { value: '远低于其他渠道的价格' },
      { value: '免费的专家搭配服务' },
      { value: '0支付先收货，喜欢才买单' },
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
      url: "/pages/awardsix/awardsix"
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