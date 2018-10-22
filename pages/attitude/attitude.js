var util = require("../../utils/util.js")
Page({
  data: {
      checkboxItems: [
          { value: '安全', show: true},
          { value: '舒适', show: true},
          { value: '个性', show: true},
          { value: '实惠', show: true},
          { value: '品牌', show: true},
          { value: '好看', show: true},
        ]
  },
  onLoad: function (options) {
    console.log(options)
    var inter = options.inter
    this.updateInfo()
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
        var attitude = result.attitude
        if (attitude) {
          that.initAttitude(attitude)
        }
      }
    })
  },
  initAttitude: function (attitude) {
    var checkboxItems = this.data.checkboxItems
    var cusArr = new Array()
    for (var i = 0; i < attitude.length; ++i) {
      var value = attitude[i]
      var hasV = false
      for (var j = 0; j < checkboxItems.length; ++j) {
        if (checkboxItems[j].value == value) {
          hasV = true
          checkboxItems[j].show = true
          checkboxItems[j].checked = true;
          break;
        }
      }
      if (!hasV) {
        var temO = new Object()
        temO.value = value
        temO.show = true
        temO.checked = true;
        checkboxItems.push(temO)
      }
    }
    this.setData({
      checkboxItems: checkboxItems,
      attitude: attitude
    })
  },
  checkboxChange: function (e) {
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    if (values.length > 2) {
      values = values.slice(1)
    }
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems,
      attitude: values
    });
  },
  
  next:function(){
    this.updateUser()
    wx.navigateTo({
        url: '/pages/paste/paste'
    })
  },
  updateUser: function () {
    var item = new Object();
    item.wechatOpenId = wx.getStorageSync('openId')
    var attitude = this.data.attitude
    if (attitude) {
      item.attitude = attitude
    }
    wx.request({
      url: util.requestUrl + 'user/updateUser',
      method: 'POST',
      data: item
    })
    wx.setStorageSync('pagen', 'paste')
  }
})