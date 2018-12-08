var util = require("../../utils/util.js");
import { $wuxDialog } from '../../components/wux'
const app = getApp();
Page({
  data: {
    user: {
      days: 0,
      babyCount: 0,
      stylistCount: 0,
      currentBoxCount: 0,
      CouponCount:0,
    },
    userInfo: {},
    vipImg: '/images/icons/h-gray.png'
  },
  
  onLoad: function (options) {
    app.editTabBar();
  },

  onShow: function(options) {
    this.findInfo()
  },
  findInfo: function() {
    var that = this
    var openId = wx.getStorageSync('openId')
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    }
    wx.request({
      url: util.requestUrl + 'user/findUserInfo?openId=' + openId,
      success: function(res) {
        var result = res.data.data
        var level = res.data.data.user.level
        var vipImg = that.data.vipImg
        if (level >= 40){
          vipImg = '/images/icons/h-yellow.png'
        }
        that.setData({
          user: result,
          vipImg: vipImg
        })
      }
    })
  },
  goWoman: function() {
    wx.navigateTo({
      url: '../designinfo/designinfo',
    })
  },
  goOrder: function() {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  goBaby: function() {
    wx.navigateTo({
      url: '../babyInfo/babyInfo?edit=edit',
    })
  },
  goReduce: function() {
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },
  invitePerson: function() {
    wx.navigateTo({
      url: '../invitation/invitation',
    })
  },
  goVip: function() {
    var that = this
    var openId = wx.getStorageSync('openId')
    wx.request({
      url: util.requestUrl + 'user/findUserInfo?openId=' + openId,
      success: function (res) {
        var result = res.data.data
        var level = res.data.data.user.level
        if (level >= 40) {
          wx.navigateTo({
            url: '../vip/vip',
          })
        } else {
          wx.navigateTo({
            url: '../club/club',
          })
        }
        that.setData({
          user: result,
        })
      }
    })
  },
  goPlan: function() {
    wx.navigateTo({
      url: '../plan/plan?setting=setting',
    })
  },
  goWallet: function() {
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },
  goEmpty: function() {
    wx.navigateTo({
      url: '../empty/empty',
    })
  },

  goQuestion: function() {
    wx.navigateTo({
      url: '/pages/normalquestion/normalquestion',
    })
  },
  
  goGuide: function() {
    let about = 'false'
    wx.navigateTo({
      url: '../guide/guide?about=about',
    })
  },

  hideModal: function () {
    var that = this
    that.setData({
      payStatus: false,
      redeemStatus: false
    })
  },

  goExchange: function () {
    var that = this
    var openId = wx.getStorageSync('openId')
    wx.request({
      url: util.requestUrl + 'user/findUserInfo?openId=' + openId,
      success: function (res) {
        var result = res.data.data
        var level = res.data.data.user.level
          console.log(level)
        wx.setStorageSync("level", level)
        if (level == '40' || level == '50') {
         wx.showToast({
           title: '您已经是会员～',
         })
         that.setData({
           redeemStatus: false
        })
      } else {
      that.setData({
        redeemStatus: true
        })
       }
     }
    }) 
  },

  weexchange: function (e) {
    var that = this
    var openId = wx.getStorageSync('openId')
    var code = e.detail.value.input
    
    wx.request({
      url: util.requestUrl + 'user/ExchangeByCode?openId=' + openId + '&code=' + code,
      success: function (res) {
        var result = res.data
        var code = res.data.code
        if(code=='0'){
          var message = res.data.message
          $wuxDialog.alert({
            content: '兑换失败!'+message
          })
        }else{
          $wuxDialog.alert({
            content: "兑换成功！"
          })
          that.hideModal()
          that.findInfo()
        }
      }
    })
  }
})