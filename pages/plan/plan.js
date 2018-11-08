var util = require("../../utils/util.js")
Page({
  data: {
    radioItems: [{
        title: '任性推荐(1个月/次)',
        name: '童年不同样,天天穿新衣&每个月给您孩子准备一个定制搭配盒子.',
        value: '1'
      },
      {
        title: '标准推荐(2个月/次)',
        name: '工作太忙顾及不到孩子的穿着?交给我们&每2个月给您孩子准备一个定制搭配盒子.',
        value: '3'
      },
      {
        title: '节日推荐',
        name: '希望孩子有个快乐的节日?交给我们&每个重要的节日给您孩子准备一个定制的盒子.',
        value: '2'
      }
    ],
    btnMsg: '下一步'
  },
  onLoad: function(options) {
    var param = options.inter
    var setting = options.setting
    if (param) {
      this.setData({
        isEdit: true
      })
    }
    if (setting) {
      this.setData({
        setting: options.setting
      })
    }
    this.init()
    this.updateInfo()
  },
  init: function() {
    var that = this
    var setting = that.data.setting
    if (setting) {
      wx.setNavigationBarTitle({
        title: '修改订阅计划'
      })
      that.setData({
        btnMsg: '修改'
      })
    }
  },
  radioChange: function(e) {
    var value = e.detail.value
    var radioItems = util.radioGroupChange(this.data.radioItems, value)
    console.log(radioItems)
    this.setData({
      radioItems: radioItems,
      planAuto: value
    });
  },
  updateInfo: function() {
    var openId = wx.getStorageSync('openId')
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findUserByOpenId?openId=' + openId,
      success: function(res) {
        var result = res.data.data
        var planAuto = result.planAuto
        var intel = that.data.intel
        if (planAuto) {
          intel = true
          var radioItems = util.radioGroupChange(that.data.radioItems, planAuto)
          console.log(radioItems)
          that.setData({
            intel: intel,
            radioItems: radioItems
          })
        }
      }
    })
  },
  next: function() {
    var intel = this.data.intel
    var setting = this.data.setting
    var item = new Object()
    item.wechatOpenId = wx.getStorageSync('openId')
    item.planAuto = this.data.planAuto
    var that = this
    wx.request({
      url: util.requestUrl + 'user/updateUser',
      method: 'POST',
      data: item,
      success: function() {
        that.updateStep()
        if (setting) {
          wx.navigateBack()
        } else {
          wx.redirectTo({
            url: '../create/create',
          })
        }
      }
    })
  },
  updateStep: function() {
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