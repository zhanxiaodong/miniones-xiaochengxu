var util = require("../../utils/util.js")
Page({
  data: {
    colorAllItems: [
      { value: '素雅灰色系' },
      { value: '活跃亮色系' },
      { value: '接受合理搭配的任何色系' }
    ],
    checkboxItems: [
      { value: '安全', show: true },
      { value: '舒适', show: true },
      { value: '个性', show: true },
      { value: '实惠', show: true },
      { value: '品牌', show: true },
      { value: '好看', show: true },
    ],
    pasteAllItems: [{
      value: '节制',
      math: '99-199/套'
    },
    {
      value: '正常',
      math: '199-399/套'
    },
    {
      value: '小资',
      math: '299-499/套'
    },
    {
      value: '轻奢',
      math: '800+/套'
    },
    ],
    radioItems: [
      { value: '每月' },
      { value: '每两月' },
      { value: '每季度' },
      { value: '其他' }
    ],
  },
  onLoad: function (options) {
    var that = this
    var editBaby = wx.getStorageSync('editBaby')
    var id = editBaby.id
    that.setData({
      id: id
    })
    wx.request({
      url: util.requestUrl + 'baby/findBabyById?id=' + id,
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
    this.updateBaby()
    wx.navigateTo({
      url: "/pages/attitude/attitude"
      })
  },
  updateBaby: function () {
    var colorType = this.data.oldColorType
    if (colorType) {
      var item = new Object()
      item.id = this.data.id
      item.colorType = colorType
      wx.request({
        url: util.requestUrl + 'baby/updateBaby',
        method: 'POST',
        data: item
      })
    }
  }
})