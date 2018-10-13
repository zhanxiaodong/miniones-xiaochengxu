var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require("../../utils/util.js")
Page({
  data: {
    tabs: ["我的宝贝", "我的公益"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    edit: false,
    defaultAva: '../../images/ava.png',
    babyList: [
      {
        id: '1',
        call: '阿离',
        avatar: '../../images/ava.png',
        birth: '3岁6月',
        weight: '23',
        size: '29',
        num: 23
      },
      {
        id: '2',
        call: '测试',
        avatar: '../../images/ava.png',
        birth: '5岁6月',
        weight: '32',
        size: '23',
        num: 44
      }
    ]
  },
  /**
   * 选择小朋友
   */
  choiceBaby:function(){
    wx.navigateTo({
      url: "/pages/affirm/affirm",
    })
  },
  babyChange: function (e) {

    var babyList = this.data.babyList
    var baby
    for (var i = 0, len = babyList.length; i < len; ++i) {
      var result = babyList[i].id == e.detail.value
      babyList[i].checked = result
      if (result) {
        baby = babyList[i]
      }
    }

    this.setData({
      babyList: babyList,
    })

    //更新baby的信息为default
    baby.babyDefault = true
    wx.request({
      url: util.requestUrl + 'baby/updateBaby',
      method: 'POST',
      data: baby,
      success: function (res) {
        wx.navigateBack()
      }
    })

  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    })
    var edit = options.edit
    var stylistId = options.stylistId
    if (edit) {
      that.setData({
        edit: true,
        stylistId: stylistId
      })
    }
  },

  onShow: function () {
    var that = this
    wx.request({
      url: util.requestUrl + 'baby/findBabyList?openId=' + wx.getStorageSync('openId'),
      success: function (res) {
        that.setData({
          babyList: res.data.data
        })
      }
    })
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  edit: function (event) {
    util.saveFormId(wx.getStorageSync('openId'), event.detail.formId)
    var babyId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/getbox/getbox?babyId=" + babyId + '&stylistId=' + this.data.stylistId,
    })
  },
  add: function (e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    wx.navigateTo({
      url: '../detail/detail?inter=add',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  }
});