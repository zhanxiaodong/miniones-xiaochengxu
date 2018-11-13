var util = require("../../utils/util.js")
Page({
  data: {
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    defaultAva: '../../images/ava.png',
    babyList: [],
    edit: false
  },
  onLoad: function(options) {
    console.log(options)
    var that = this;
    var stylistId = options.stylistId

    if (stylistId) {
      that.setData({
        stylistId: stylistId
      })
    }
    var edit = options.edit
    if (edit) {
      that.setData({
        edit: edit == 'edit' ? true : false
      })
    }
  },
  onShow: function() {
    var that = this
    wx.request({
      url: util.requestUrl + 'baby/findBabyList?openId=' + wx.getStorageSync('openId'),
      success: function(res) {
        if (res.data.data) {
          that.initBoby(res.data.data)
        }
      }
    })
  },
  initBoby: function(babyList) {
    var babyArr = babyList.map(item => {
      item.birth = this.setAge(item.birth)
      return item
    })
    this.setData({
      babyList: babyArr
    })
  },
  setAge: function(birth) {
    if (!birth) {
      return ''
    }
    var result
    var timeA = birth.split('-')
    var nowD = new Date()
    var days = 0;
    var months = 0;
    var years = 0;
    days = nowD.getDate() - Number(timeA[2])
    if (days < 0) {
      months = -1
      days = 30 + days
    }
    months = nowD.getMonth() - timeA[1]
    if (months < 0) {
      years = -1
      months = 12 + months
    }
    years = years + (nowD.getFullYear() - timeA[0])

    var yearString = years > 0 ? years + "岁" : "";
    var mnthString = months > 0 ? months + "月" : "";
    var dayString = days > 0 ? days + "天" : "";
    if (years >= 1) {
      result = yearString + mnthString;
    } else {
      result = days > 0 ? mnthString + dayString : mnthString;
    }
    return result
  },
  choose: function(event) {
    var babyId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: "../affirm/affirm?babyId=" + babyId + '&stylistId=' + this.data.stylistId,
    })
  },
  add: function(e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    wx.navigateTo({
      url: '../detail/detail?inter=add'
    })
  },
  edit: function(event) {
    util.saveFormId(wx.getStorageSync('openId'), event.detail.formId)
    var edit = this.data.edit
    if (edit) {
      var babyId = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '../detail/detail?inter=add&id=' + babyId
      })
    }
  }
});