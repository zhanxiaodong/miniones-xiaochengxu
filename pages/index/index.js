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
    userLev: '访客用户',
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
      this.fillInfo()
    }
  },
  getBoxBefore:function(e){
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var level = wx.getStorageSync('level')
    var baby = this.data.baby
    if (!level || level == viplev.LOOK) {
      wx.navigateTo({
        url: '../log/log'
      })
    // } else if (level < viplev.EXP) {
    //   var plan = this.data.user.plan
    //   var pagen = wx.getStorageSync('pagen')
    //   if (baby && plan) {
    //     this.getBox()
    //   } else {
    //     if (pagen) {
    //       wx.navigateTo({
    //         url: '../editdata/editdata'
    //       })
    //     } else {
    //       wx.navigateTo({
    //         url: '../log/log'
    //       })
    //     }
    //   }
    } else {
      this.getBox()
    }
  },
  /**
   * 没有流程中的
   */
  boxNone: function () {
    wx.navigateTo({
      url: '/pages/babyInfo/babyInfo?stylistId=' + this.data.stylist.id
    })
  },
  /**
   * 查看盒子
   */
  seeBox: function () {
    wx.navigateTo({
      url: '../designinfo/designinfo?boxId=' + this.data.boxId
    })
  },
  evaBox: function () {
    wx.navigateTo({
      url: '../evaluate/evaluate?boxId=' + this.data.boxId
    })
  },
  payBox: function () {
    wx.navigateTo({
      url: '../pay/pay?boxId=' + this.data.boxId
    })
  },
  backBox: function () {
    wx.navigateTo({
      url: '../back/back?boxId=' + this.data.boxId
    })
  },
  /**
  * 要一个盒子操作按钮
  */
  getBox: function (e) {
    var level = wx.getStorageSync('level')
    if (level == viplev.LOOK) {
      this.goConfirm()
    } else {
      var boxStatus = this.data.boxStatus
      console.log(boxStatus)
      switch (boxStatus) {
        case 'NONE':
          this.boxNone()
          break;
        case 'PAY_COMPLETE':
          this.boxNone()
          break;
        case 'END':
          this.boxNone()
          break;
        case 'CLOSE':
          this.boxNone()
          break;
        case 'CREATE':
          this.seeBox()
          break;
        case 'LINK_UP':
          this.seeBox()
          break;
        case 'NOTIFY_EXPRESS':
          this.seeBox()
          break;
        case 'RETURN_EXPRESS':
          this.seeBox()
          break;
        case 'DISPATCHING':
          this.seeBox()
          break;
        case 'DELIVERY_COMPLETE':
          this.evaBox()
          break;
        case 'EVALUATED':
          this.payBox()
          break;
        case 'PAY_PART':
          this.backBox()
          break;
      }
    }
  },

   goBuy:function(){
     wx.navigateTo({
       url: '/pages/buy/buy',
     })
   },
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
})