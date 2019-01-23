var util = require("../../utils/util.js")
Page({
  data: {
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    defaultAva: '/images/ava.png',
    babyList: [],
    edit: false
  },
  onLoad: function(options) {
    console.log(111,options)
    var that = this;
    var setDefault = options.setDefault

    if (setDefault) {
      that.setData({
        setDefault: setDefault
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
    months = nowD.getMonth()+1 - timeA[1]
    if (months < 0) {
      years = -1
      months = 12 + months
    }
    years = years + (nowD.getFullYear() - timeA[0])
    if(years < 0) {
      return ""
    }

    var yearString = years > 0 ? years + "岁" : "";
    var mnthString = months > 0 ? months + "月" : "";
    var dayString = days >= 0 ? days + "天" : "";
    if (years >= 1) {
      result = yearString + mnthString;
    } else {
      result = days > 0 ? mnthString + dayString : mnthString;
    }
    return result
  },
  choose: function(event) {
    var babyId = event.currentTarget.dataset.id
    var openId = wx.getStorageSync('openId')
    wx.request({
      url: util.requestUrl + 'baby/updateBabyDefault?openId=' + openId + '&babyId=' + babyId,
      success: function (res) {
        wx.navigateTo({
          url: "../index/index",
        })
      }
    })
    console.log(babyId)
  },
  add: function(e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var level = wx.getStorageSync('level')
    if (level < 10) {
      wx.showToast({
        title: '请您先注册～',
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../log/log'
        })
      }, 2000)
    } else {
    wx.navigateTo({
      url: '../detail/detail?inter=add'
    })
   }
  },
  edit: function(event) {
    util.saveFormId(wx.getStorageSync('openId'), event.detail.formId)
    var edit = this.data.edit
    console.log(edit)
    if (edit) {
      var babyId = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '../detail/detail?inter=add&id=' + babyId
      })
    }
  }
});