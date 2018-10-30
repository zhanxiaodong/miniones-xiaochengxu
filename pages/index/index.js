var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require("../../utils/util.js")
var viplev = require('../../utils/viplev.js')
Page({
  data: {
    showModalStatus: 'false',
    needAuth: false,
    gift: '/images/showa.png',
    tabs: ["穿搭", "玩具", "营养", "学习", "亲子"],
    message: '当前没有进行中的搭配',
    btnMsg: '预约衣盒',
    tryOnDays: 0,
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onGotUserInfo: function(e) {
    if (e.detail.userInfo) {
      util.getOpenId()
      this.checkAuth()
    }
  },
  checkAuth: function() {
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
  getBoxBefore: function(e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var level = wx.getStorageSync('level')
    var baby = this.data.baby
    var user = this.data.user
    if (!level || level == viplev.LOOK || !user) {
      wx.navigateTo({
        url: '../log/log'
      })
    } else {
      var planAuto = this.data.user.planAuto
      var plan = this.data.user.plan
      var stylist = this.data.stylist
      var pagen = wx.getStorageSync('pagen')
      if ((planAuto > 0 && stylist) || (plan && stylist)) {
        this.getBox()
      } else {
        var url = '../style/style'
        if (pagen) {
          if (pagen == 'color') {
            url = '../color/color'
          } else if (pagen == 'attitude') {
            url = '../attitude/attitude'
          } else if (pagen == 'paste') {
            url = '../paste/paste'
          } else if (pagen == 'plan') {
            url = '../plan/plan'
          }
        }
        wx.navigateTo({
          url: url
        })
      }
    }
  },
  userReg: function() {
    wx.navigateTo({
      url: '../log/log'
    })
  },
  /**
   * 没有流程中的
   */
  boxNone: function() {
    wx.navigateTo({
      url: '../babyInfo/babyInfo?stylistId=' + this.data.stylist.id
    })
  },
  /**
   * 查看盒子
   */
  seeBox: function() {
    wx.navigateTo({
      url: '../servedetail/servedetail?boxId=' + this.data.boxId
    })
  },
  evaBox: function() {
    wx.navigateTo({
      url: '../buy/buy?boxId=' + this.data.boxId
    })
  },
  payBox: function() {
    wx.navigateTo({
      url: '../buy/buy?boxId=' + this.data.boxId
    })
  },
  backBox: function(hasBack) {
    wx.navigateTo({
      url: '../back/back?boxId=' + this.data.boxId + '&hasBack=' + hasBack
    })
  },
  /**
   * 要一个盒子操作按钮
   */
  getBox: function(e) {
    var level = wx.getStorageSync('level')
    if (level == viplev.LOOK) {
      this.userReg()
    } else {
      var boxStatus = this.data.boxStatus
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
          this.backBox(true)
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
          this.backBox(false)
          break;
      }
    }
  },
  onLoad: function(options) {
    var that = this
    that.checkAuth()
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo.nickName) {
      that.setData({
        nickName: userInfo.nickName
      })
    }

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    })
  },
  onShow: function() {
    var needAuth = this.data.needAuth
    if (!needAuth) {
      this.fillInfo()
    }
  },
  setStep: function(data) {
    var user = data.user
    var stylist = data.stylist
    var finshedInfo = false
    if (user) {
      var planAuto = data.user.planAuto
      var plan = data.user.plan
      var guide = data.user.guide
      if (!guide) {
        wx.navigateTo({
          url: '../guide/guide'
        })
      }
      if ((planAuto > 0 && stylist) || (plan && stylist)) {
        finshedInfo = true
      } else if (!user.style) {
        wx.setStorageSync('pagen', '')
      } else if (!user.colorType) {
        wx.setStorageSync('pagen', 'color')
      } else if (!user.attitude) {
        wx.setStorageSync('pagen', 'attitude')
      } else if (!user.consumDesc) {
        wx.setStorageSync('pagen', 'paste')
      } else if (!user.planAuto || !stylist) {
        wx.setStorageSync('pagen', 'plan')
      } else {
        wx.setStorageSync('pagen', '')
        finshedInfo = true
      }
    } else {
      wx.setStorageSync('level', 0)
    }
    console.log(wx.getStorageSync('pagen'))
    return finshedInfo
  },
  /**
   * 填充信息
   * 未登录已注册 -》跳转登录界面
   * 未登录未注册 -》check
   * 已登录 -》显示界面
   */
  fillInfo: function() {
    var that = this
    var level = wx.getStorageSync('level')
    var openId = wx.getStorageSync('openId')
    if (!level || level == viplev.LOOK) {
      that.setData({
        btnMsg: "开启服务"
      })
    }
    wx.request({
      url: util.requestUrl + 'user/findInfoByOpenId?openId=' + openId,
      success: function(res) {
        var result = res.data.data
        var user = res.data.data.user
        var stylist = result.stylist ? result.stylist : null
        var baby = result.baby ? result.baby : null
        var tryOnDays = result.tryOnDays ? result.tryOnDays : 0
        var boxStatus = result.boxStatus
        var boxId = result.boxId ? result.boxId : null
        var btnMsg = util.changeMsg(boxStatus, 'btn')
        var message = util.changeMsg(boxStatus, 'msg')
        that.showModal(boxStatus,user.level)
        message = that.updateNext(boxStatus, user.plan, message)
        if (!that.setStep(res.data.data)) {
          btnMsg = '完善信息'
          message = '当前没有进行中的搭配'
        }
        var gift = util.changeMsg(boxStatus, 'img')
        that.setData({
          user: user,
          stylist: stylist,
          baby: baby,
          boxId: boxId,
          boxStatus: boxStatus,
          btnMsg: btnMsg,
          message: message,
          gift: gift,
          tryOnDays: tryOnDays
        })
      }
    })
  },
  updateNext: function(boxStatus, plan, message) {
    if (boxStatus == 'PAY_COMPLETE' || boxStatus == 'END') {
      message = this.updateMonth(plan, message)
    } else {
      this.updateMonth(plan, '')
    }
    return message
  },
  updateMonth: function(plan, message) {
    var nowM = util.getMonth(new Date())
    var hasN = false
    if (plan) {
      for (var i = 0; i < plan.length; ++i) {
        if (plan[i] > nowM) {
          nowM = Number(plan[i])
          hasN = true
          break;
        }
      }
    }
    if (!hasN) {
      nowM = nowM + 1
    }
    message = message + nowM + "月15日"
    this.setData({
      plantitle: message
    })
    return message
  },
  hideModal: function (e) {
    this.setData(
      {
        showModalStatus: false
      }
    )
    wx.setStorageSync('times', 1)
  },
  showModal: function (boxStatus, level) {
    var times = wx.getStorageSync('times')
    var userLev
    if (level == viplev.EXP) {
      userLev = '体验用户'
    } else if (level == viplev.YEAR) {
      userLev = '年度会员用户'
    } else if (level > viplev.YEAR) {
      userLev = '终身会员用户'
    }
    if (userLev) {
      this.setData({
        userLev: userLev
      })
    }
    if (level >= viplev.REG && !times && boxStatus == 'NONE') (
      setTimeout(function () {
        this.setData(
          {
            showModalStatus: true
          }
        )
      }.bind(this), 1000)
    )
  },
})