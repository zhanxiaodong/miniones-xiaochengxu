var util = require("../../utils/util.js")
Page({
  data: {
    tabs: ['可使用', '已过期'],
    activeIndex: 0,
    index: 0,
    coupons: [],
    expiredCoupons: [],
    disableCoupons: [],
    sliderOffset: 0,
    sliderLeft: 0,
    pick: false,
    condition: 0,
  },
  onLoad: function(options) {
    var pick = options.pick
    var condition = options.condition
    var vouType = options.vouType
    if (pick) {
      this.setData({
        pick: pick
      })
    }
    if (condition) {
      this.setData({
        condition: condition
      })
    }
    if (vouType) {
      this.setData({
        vouType: vouType
      })
    }
    this.findCoupon()
    this.findExpiredCoupon()
    this.findDisableCoupon()
  },

  radioChange: function(e) {
    var value = e.detail.value
    var coupons = this.data.coupons
    var voucher
    for (var i = 0, len = coupons.length; i < len; ++i) {
      var temp = coupons[i].id == value
      coupons[i].checked = temp;
      if (temp) {
        voucher = coupons[i]
      }
    }

    let pages = getCurrentPages(); //当前页面
    let prevPage = pages[pages.length - 2]; //上一页面
    prevPage.setData({ //直接给上移页面赋值
      voucher: voucher
    });
    wx.navigateBack()
  },

  noChoose: function(e) {
    let pages = getCurrentPages(); //当前页面
    let prevPage = pages[pages.length - 2]; //上一页面
    prevPage.setData({ //直接给上移页面赋值
      voucher: null
    });
    wx.navigateBack()
  },

  findCoupon: function() {
    var that = this
    var condition = that.data.condition
    var vouType = that.data.vouType
    var queryparam = ''
    var url = util.requestUrl + 'user/findCanUseCoupons?openId=' + wx.getStorageSync('openId')
    if (condition && condition > 0) {
      queryparam = '&condition=' + condition
    }
    if (vouType) {
      queryparam = queryparam + '&type=' + vouType
    }
    console.log(queryparam)
    wx.request({
      url: url + queryparam,
      success: function(res) {
        var result = res.data.data
        if (result) {
          that.setData({
            coupons: result
          })
        }
      }
    })
  },
  findDisableCoupon: function() {
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findDisableCoupon?openId=' + wx.getStorageSync('openId'),
      success: function(res) {
        var result = res.data.data
        if (result) {
          that.setData({
            tabs: ['可使用', '已过期', '不可用'],
            disableCoupons: result
          })
        } 
      }
    })
  },
  findExpiredCoupon: function() {
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findExpiredCoupon?openId=' + wx.getStorageSync('openId'),
      success: function(res) {
        var result = res.data.data
        if (result) {
          that.setData({
            expiredCoupons: result
          })
        }
      }
    })
  },

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});