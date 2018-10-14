var util = require("../../utils/util.js")
Page({
    data: {
        pasteAllItems: [
            { value: '节制', math: '￥50-100/套'},
            { value: '正常', math: '￥100-300/套'},
            { value: '小资', math: '￥300-500/套' },
            { value: '轻奢', math: '￥500+/套'},
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
          if (consumDescTem) {
            var consumDesc = JSON.parse(consumDescTem)
            that.setData({
              consumDesc: consumDesc
            })
          }
        }
      })
    },
    pasteAllChange: function (e) {
      var value = e.detail.value
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
      wx.navigateTo({
          url: '/pages/plan/plan'
      })
    }
})