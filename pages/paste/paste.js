var util = require("../../utils/util.js")
Page({
  data: {
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
  },
  onLoad: function(options) {
    var that = this
    var editBaby = wx.getStorageSync('editBaby')
    var id = editBaby.id
    var inter = editBaby.inter
    that.setData({
      id: id,
      inter: inter
    })
    wx.request({
      url: util.requestUrl + 'baby/findBabyById?id=' + id,
      success: function(res) {
        var result = res.data.data
        var consumDesc = result.consumDesc
        if (consumDesc) {
          that.updatePasteAll(consumDesc)
        }
      }
    })
  },
  pasteAllChange: function(e) {
    var value = e.detail.value
    this.data.consumDesc = value
    this.updatePasteAll(value)
    var index
    var pasteAllItems = this.data.pasteAllItems
    for (var i = 0; i < pasteAllItems.length; ++i) {
      if (value == pasteAllItems[i].value) {
        index = i
        break;
      }
    }
    this.setData({
      pasteAllItems: pasteAllItems
    })
  },
  updatePasteAll: function (value) {
    console.log(value)
    var pasteAllItems = util.radioGroupChange(this.data.pasteAllItems, value.split(' ')[0])
    console.log(pasteAllItems)
    this.setData({
      pasteAllItems: pasteAllItems,
      consumDesc: value
    })
  },
  updateBaby: function(item) {
    wx.request({
      url: util.requestUrl + 'baby/updateBaby',
      method: 'POST',
      data: item
    })
  },
  next: function() {
    this.updateStep()
    var consumDesc = this.data.consumDesc
    var item = new Object()
    item.id = this.data.id
    item.consumDesc = consumDesc
    this.updateBaby(item)
    var inter = this.data.inter
    if (inter == 'add') {
      let pages = getCurrentPages(); //当前页面
      let prevPage = pages[pages.length - 2]; //上一页面
      wx.navigateBack({
        delta: 7
      })
    } else {
      wx.navigateTo({
        url: '/pages/create/create'
      })
    }
  },
  updateStep: function () {
    var item = new Object()
    item.wechatOpenId = wx.getStorageSync('openId')
    item.step = 10
    var lev = wx.getStorageSync('level')
    if (lev < 20) {
      wx.setStorageSync('level', '20')
      wx.request({
        url: util.requestUrl + 'user/updateStep',
        method: 'POST',
        data: item
      })
    }
  }
})