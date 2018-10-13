// pages/first/fisrt.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require("../../utils/util.js")
var viplev = require('../../utils/viplev.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    needAuth: false,
    vipurl: '/images/icons/h-gray.png',
    gift: '/images/showa.png',
    tabs: ["首页", "穿搭", "营养", "心智", "亲子"],
    message: '欢迎体验迷你王国',
    btnMsg: '预约衣盒',
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    hidIndex:false,
    hidIndexs:true
  },
  onGotUserInfo: function (e) {
    if (e.detail.userInfo) {
      util.getOpenId()
      this.checkAuth()
    }
  },
  checkAuth: function () {
    if (!wx.getStorageSync('openId')) {
      this.setData({
        needAuth: true
      })
    } else {
      this.setData({
        needAuth: false
      })
    }
  },
  getBoxBefore:function(){
    wx.navigateTo({
      url: '/pages/babyInfo/babyInfo',
    })
   },

   goBuy:function(){
     wx.navigateTo({
       url: '/pages/buy/buy',
     })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!wx.getStorageSync('openId')) {
      that.setData({
        needAuth: true
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (!wx.getStorageSync('openId')) {
      that.setData({
        needAuth: true
      })
    } else {
      this.fillInfo()
    }
  },
  /**
   * 填充信息
   * 未登录已注册 -》跳转登录界面
   * 未登录未注册 -》check
   * 已登录 -》显示界面
   */
  fillInfo: function () {
    var that = this
    var babyEdit = that.data.babyEdit
    var level = wx.getStorageSync('level')
    var openId = wx.getStorageSync('openId')
    if (level == viplev.LOOK) {//未输入手机号
      wx.navigateTo({
        url: '/pages/log/log',
      })
    } else {
      wx.request({
        url: util.requestUrl + 'user/findInfoByOpenId?openId=' + openId,
        success: function (res) {
          var result = res.data.data
          var stylist = result.stylist
          var baby = result.baby

          if (!stylist) {
            stylist = new Object()
            stylist.name = '待分配'
          }
          stylist.url = '../designinfo/designinfo'

          if (!baby) {
            baby = new Object()
            baby.call = '待完善'
          }
          baby.url = '../babyinfo/babyinfo?edit=true'
          var user = res.data.data.user
          var vipurl = that.data.vipurl
          if (user.level >= viplev.YEAR) {
            vipurl = '/images/icons/h-yellow.png'
          }
          var userLev = that.data.userLev
          if (user.level == viplev.EXP) {
            userLev = '体验用户'
          } else if (user.level == viplev.YEAR) {
            userLev = '年度会员用户'
          } else if (user.level > viplev.YEAR) {
            userLev = '终身会员用户'
          }
          var boxStatus = result.boxStatus
          var boxId = result.boxId ? result.boxId : null
          var btnMsg = util.changeMsg(boxStatus, 'btn')
          var message = util.changeMsg(boxStatus, 'msg')
          that.setData({
            user: user,
            vipurl: vipurl,
            stylist: stylist,
            baby: baby,
            boxId: boxId,
            boxStatus: boxStatus,
            btnMsg: btnMsg,
            message: message,
            userLev: userLev
          })
        }
      })
    }
  },
  updateNext: function (boxStatus, plan, message) {
    if (boxStatus == 'PAY_COMPLETE' || boxStatus == 'END') {
      message = this.updateMonth(plan, message)
    } else {
      this.updateMonth(plan, '')
    }
    return message
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})