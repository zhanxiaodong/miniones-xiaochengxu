var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require("../../utils/util.js");
var viplev = require('../../utils/viplev.js');
let wechat = require("../../utils/wechat");
let amap = require("../../utils/gdmap/amap");
const app = getApp();
Page({
  data: {
    boxCount:'',
    themList: [{
      img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/shengdanlu.png',
        title: '圣诞季'
      },
      {
        img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/shoutao.png',
        title: '保暖季'
      },
      {
        img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/mianbao.png',
        title: '换洗季'
      }
    ],
    showModalStatus: false,
    needAuth: false,
    gift: '/images/showa.png',
    tabs: ["穿搭", "玩具", "营养", "学习", "亲子"],
    message: '当前没有进行中的搭配',
    nextMessage:'',
    btnMsg: '开启服务',
    tryOnDays: 0,
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  
   /* 修改孩子信息*/
  babyNext: function () {
    wx.navigateTo({
      url: '/pages/babyInfo/babyInfo?edit=edit'
    })
  },
  /* 参与抽奖路由*/
  //goAward: function() {
   // wx.navigateTo({
     // url: '../awardexame/awardexame'
    //})
  //},

  onGotUserInfo: function(e) {
    if (e.detail.userInfo) {
      this.getOpenId()
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
      this.getBox()
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
    var babyCount = this.data.babyCount
    if (babyCount != 1){
      wx.navigateTo({
        url: '../babyInfo/babyInfo?stylistId=' + this.data.stylist.id
      })
    }else{
      wx.navigateTo({
        url: "../affirm/affirm?babyId=" + this.data.baby.id + '&stylistId=' + this.data.stylist.id
      })
    }
  },
  /**
   * 确认系统盒子
   */
  boxConfirm: function () {
    wx.navigateTo({
      url: '../affirm/affirm?boxId=' + this.data.boxId
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
  excepBox: function() {
    wx.navigateTo({
      url: '../orderdetail/orderdetail?boxId=' + this.data.boxId
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
        case 'PRE_CREATE':
          this.boxConfirm()
          break;
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
        case 'RETURN_EXCEPTION':
          this.excepBox()
          break;
      }
    }
  },
  onLoad: function(options) {
    app.editTabBar();
    var that = this
    that.checkAuth()
    amap.getWeather().then(res => {
      that.setData({
        weather:res
      })
    })
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    }
    // var boxCount = wx.getStorageSync('box.count')
    // if (boxCount) {
    //   that.setData({
    //     boxCount: boxCount
    //   })
    // }
    //console.log(boxCount)
    var baby = wx.getStorageSync('baby.data')
    if (baby) {
      that.setData({
        baby: baby
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
    if (needAuth) {
      this.fillInfo()
    }
  },
  /**
   * 填充信息
   * 未登录已注册 -》跳转登录界面
   * 未登录未注册 -》check
   * 已登录 -》显示界面
   */
  fillInfo: function() {
    console.log('fillInfo')
    wx.showLoading({
      title: '',
    })
    var that = this
    var level = wx.getStorageSync('level')
    var openId = wx.getStorageSync('openId')
    wx.request({
      url: util.requestUrl + 'user/findInfoByOpenId?openId=' + openId,
      success: function(res) {
        wx.hideLoading()
        var result = res.data.data
        var user = res.data.data.user
        var stylist = result.stylist ? result.stylist : null
        var baby = result.baby ? result.baby : null
        var tryOnDays = result.tryOnDays ? result.tryOnDays : 0
        var boxCount = result.boxCount
        var boxStatus = result.boxStatus
        var boxId = result.boxId ? result.boxId : null
        var nextBoxTime = result.nextBoxTime ? result.nextBoxTime : null
        var babyCount = result.babyCount ? result.babyCount : 0
        var btnMsg = util.changeMsg(boxStatus, 'btn')
        var message = util.changeMsg(boxStatus, 'msg')
        var nextMessage = '';
        if (nextBoxTime) {
          if (boxStatus == 'PAY_COMPLETE' || boxStatus == 'END') {
            message = message + nextBoxTime
            nextMessage = '开启第' + boxCount + '个穿搭惊喜'
          } 
        }
        if (!level || level == viplev.LOOK) {
          btnMsg = '开启服务'
        }
        var gift = util.changeMsg(boxStatus, 'img')
        that.showModal(boxStatus, user)
        that.setData({
          boxCount: boxCount,
          user: user,
          stylist: stylist,
          babyCount:babyCount,
          baby: baby,
          boxId: boxId,
          boxStatus: boxStatus,
          btnMsg: btnMsg,
          message: message,
          nextMessage: nextMessage,
          gift: gift,
          tryOnDays: tryOnDays
        })
      }
    })
  },
  hideModal: function(e) {
    this.setData({
      showModalStatus: false
    })
    wx.setStorageSync('times', 1)
  },
  showModal: function(boxStatus, user) {
    var times = wx.getStorageSync('times')
    var level = user ? user.level : ''
    console.log(level, times, boxStatus)
    if (level && level >= viplev.REG && !times && boxStatus == 'NONE') {
      var userLev = '体验用户'
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo.nickName) {
        this.setData({
          nickName: userInfo.nickName
        })
      }
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
      setTimeout(function() {
        this.setData({
          showModalStatus: true
        })
      }.bind(this), 1000)
    }
  },
  getOpenId: function() {
    var that = this
    wx.login({
      success: function(res) {
        var code = res.code
        if (code) {
          wx.getUserInfo({
            withCredentials: true,
            success: function(resU) {
              wx.setStorageSync('userInfo', resU.userInfo);
              wx.request({
                url: util.requestUrl + 'wechat/decodeUserInfo',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  encryptedData: resU.encryptedData,
                  iv: resU.iv,
                  code: code
                },
                success: function(data) {
                  var openId = data.data.data.openid
                  wx.setStorageSync('openId', openId)
                  wx.request({
                    url: util.requestUrl + 'user/findUserByOpenId?openId=' + openId,
                    success: function(res) {
                      var result = res.data.data
                      var level = "0"
                      if (result) {
                        level = result.level
                      }
                      wx.setStorageSync('level', level)
                      that.checkAuth()
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  }
})