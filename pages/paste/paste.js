var util = require("../../utils/util.js")
Page({
    data: {
        pasteAllItems: [
            { value: '节制', math: '99-199/套'},
            { value: '正常', math: '199-399/套'},
            { value: '小资', math: '299-499/套' },
            { value: '轻奢', math: '800+/套'},
          ],
    },
    onLoad: function (options) {
      var inter = options.inter
      if (inter) {
        this.setData({
          inter: inter
        })
      }
      this.findUser()
    },
    findUser: function () {
      var that = this
      var openId = wx.getStorageSync('openId')
      wx.request({
        url: util.requestUrl + 'user/findUserByOpenId?openId=' + openId,
        success: function (res) {
          var result = res.data.data
          var consumDescTem = result.consumDesc
          var consumDesc = new Object()
          if (consumDescTem) {
            var consumDesc = JSON.parse(consumDescTem)
          }
          that.setData({
            consumDesc: consumDesc
          })
        }
      })
    },
    pasteAllChange: function (e) {
      var value = e.detail.value
      console.log(value)
      this.data.consumDesc.except = value
      var index
      var pasteAllItems = this.data.pasteAllItems
      for (var i = 0; i < pasteAllItems.length; ++i) {
        if (value == pasteAllItems[i].value) {
          index = i
          break;
        }
      }
    },
    updateUser: function (item) {
      wx.request({
        url: util.requestUrl + 'user/updateUser',
        method: 'POST',
        data: item
      })
    },
    next:function(){
      var consumDesc = this.data.consumDesc
      var item = new Object()
      item.wechatOpenId = wx.getStorageSync('openId')
      item.consumDesc = consumDesc
      this.updateUser(item)
      util.updateStep(6)
      wx.setStorageSync('pagen', 'plan')
      wx.navigateTo({
          url: '/pages/plan/plan'
      })
    }
})