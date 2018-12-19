var util = require("../../utils/util.js")
Page({
  data: {
    tempvalue: null,
    gender: true,
    checkboxItems: []
  },
  onShow:function(){
    var checkboxItems = [
      {
        value: '时尚', img: wx.getStorageSync('editBaby').gender == '女孩' ? 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/fashionnv.png' : 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/fashionnan.png', show: true
      },
      {
        value: '卡通', img: wx.getStorageSync('editBaby').gender == '女孩' ? 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/katongnv.png' : 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/katongnan.png', show: true
      },
      {
        value: '运动', img: wx.getStorageSync('editBaby').gender == '女孩' ? 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/sportnv.png' : 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/yundongnan.png', show: true
      },
      {
        value: '休闲', img: wx.getStorageSync('editBaby').gender == '女孩' ? 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/xiuxiannv.png' : 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/xiuxiannan.png', show: true
      },

      {
        value: '文艺', img: wx.getStorageSync('editBaby').gender == '女孩' ? 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/wenyinv.png' : 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/wenyinan.png', show: true
      },
      {
        value: wx.getStorageSync('editBaby').gender == '女孩' ? '淑女' : '绅士', img: wx.getStorageSync('editBaby').gender == '女孩' ? 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/shunv.png' : 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/shenshinan.png', show: true
      },
    ]
    this.setData({
      checkboxItems: checkboxItems
    })
  },
  onLoad: function (options) {
    var that = this
    var editBaby = wx.getStorageSync('editBaby')
    console.log(editBaby.gender)
    var id = editBaby.id
    that.setData({
      id: id
    })
    wx.request({
      url: util.requestUrl + 'baby/findBabyById?id=' + id,
      success: function (res) {
        var result = res.data.data
        var oldStyle = result.style
        if (oldStyle) {
          that.initStyle(oldStyle)
        }
      }
    })
  },
  initStyle: function (oldStyle) {
    var checkboxItems = this.data.checkboxItems
    var cusArr = new Array()
    for (var i = 0; i < oldStyle.length; ++i) {
      var value = oldStyle[i]
      for (var j = 0; j < checkboxItems.length; ++j) {
        if (checkboxItems[j].value == value) {
          checkboxItems[j].show = true
          checkboxItems[j].checked = true;
          break;
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems,
      oldStyle: oldStyle
    })
  },
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
    this.updateBaby()
    wx.navigateTo({
      url: '/pages/color/color'
    })
  },
  updateBaby: function () {
    var style = this.data.oldStyle
    if (style) {
      var item = new Object()
      item.id = this.data.id
      item.style = style
      wx.request({
        url: util.requestUrl + 'baby/updateBaby',
        method: 'POST',
        data: item
      })
    }
  }
})