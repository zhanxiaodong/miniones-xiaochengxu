var util = require("../../utils/util.js")
Page({
  data:{
    tabs:['可使用','已过期'],
    activeIndex: 0,
    index: 0,
    coupons:[],
    expiredCoupons:[],
    sliderOffset: 0,
    sliderLeft: 0,
    pick:false
  },
  onLoad:function(options){
    var pick = options.pick
    if (pick) {
      this.setData({
        pick: pick
      })
    }
    this.findCoupon()
    this.findExpiredCoupon()
  },
  radioChange: function (e) {
    var value = e.detail.value
    var coupons = this.data.coupons
    var voucher
    for (var i = 0, len = coupons.length; i < len; ++i) {
      var temp = coupons[i].id == value
      coupons[i].checked = temp;
      if(temp){
        voucher = coupons[i]
      }
    }
    
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      voucher: voucher
    });
    wx.navigateBack()
  },
  findCoupon:function(){
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findCoupon?openId=' + wx.getStorageSync('openId'),
      success:function(res){
        var result = res.data.data
        if(result){
          that.setData({
            coupons: result
          })
        }
      }
    })
  },

  findExpiredCoupon:function(){
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findExpiredCoupon?openId=' + wx.getStorageSync('openId'),
      success:function(res){
        var result = res.data.data
        if(result){
          that.setData({
            expiredCoupons: result
          })
        }
      }
    })
  },
  
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});