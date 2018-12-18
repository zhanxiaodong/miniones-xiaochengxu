var util = require("../../utils/util.js")
Page({
  data: {
    inter: null,
    tempvalue: null,
    frontType: 'style',
    gender: true,
    checkboxItems: [
      { value: '时尚', img: '/images/phone-2.png', show: true },
      { value: '休闲', img: '/images/phone-2.png', show: true },
      { value: '卡通', img: '/images/phone-2.png', show: true },
      { value: '运动', img: '/images/phone-2.png', show: true },
      { value: '民族', img: '/images/phone-2.png', show: true },
      { value: '优雅', img: '/images/phone-2.png',show: true },
    ]
  },
  onLoad: function (options) {
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
        var oldStyle = result.style
        // if (oldStyle) {
        //   that.initStyle(oldStyle)
        // }
      }
    })
  },
  // initStyle: function (oldStyle) {
  //   console.log(oldStyle)
  //   var checkboxItems = this.data.checkboxItems
  //   var cusArr = new Array()
  //   for (var i = 0; i < oldStyle.length; ++i) {
  //     var value = oldStyle[i]
  //     var hasV = false
  //     for (var j = 0; j < checkboxItems.length; ++j) {
  //       if (checkboxItems[j].value == value) {
  //         hasV = true
  //         checkboxItems[j].show = true
  //         checkboxItems[j].checked = true;
  //         break;
  //       }
  //     }
  //     if (!hasV) {
  //       var temO = new Object()
  //       temO.value = value
  //       temO.show = true
  //       temO.checked = true;
  //       checkboxItems.push(temO)
  //     }
  //   }
  //   this.setData({
  //     checkboxItems: checkboxItems,
  //     oldStyle: oldStyle
  //   })
  // },
  checkboxChange: function (e) {
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
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
      oldStyle: values,
    });
  },
  
  next: function () {
    this.updateUser()
    util.updateStep(3)
    wx.navigateTo({
      url: '/pages/color/color'
    })
  },
  updateUser: function () {
    var item = new Object();
    item.wechatOpenId = wx.getStorageSync('openId')
    var style = this.data.oldStyle
    if (style) {
      item.style = style
    }
    wx.request({
      url: util.requestUrl + 'user/updateUser',
      method: 'POST',
      data: item
    })
    wx.setStorageSync('pagen', 'color')
  }
})