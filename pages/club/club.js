var util = require("../../utils/util.js")
var viplev = require("../../utils/viplev.js")
import { $wuxDialog } from '../../components/wux'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conList:[
      { img: "/images/vip-one.png", text: "免服务费"},
      { img: "/images/vip-two.png", text: "会员折上折" },
      { img: "/images/vip-three.png", text: "专属搭配师" },
      { img: "/images/vip-four.png", text: "199免/季" },
      { img: "/images/vip-five.png", text: "全账号通行" },
    ],
    hiddenYEAR: false,
    choose:'FIRST',
    scrollTop: '50',
    toView: 'red',
    vipprice:"199.00"
  },
  chooseFirst:function(){
    this.setData({
      choose: 'FIRST',
      vipprice:"199.00"
    })
  },
  chooseYear:function(){
    this.setData({
      choose: 'YEAR',
      vipprice: "99.00"
    })
  },

  onLoad: function (options) {
    this.findUser()
    this.findBalance()
    if (options.inter) {
      this.setData({
        inter: options.inter
      })
    }
    var level = wx.getStorageSync('level')
    if (level == '40') {
      this.setData({
        hiddenYEAR: true
      })
    }
    if (options.up) {
      this.setData({
        up: true
      })
    }
  },
  findUser: function () {
    var openId = wx.getStorageSync('openId')
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findUserByOpenId?openId=' + openId,
      success: function (res) {
        var result = res.data.data
        var level = result.level
        var levelTime = result.levelTime ? result.levelTime : ''
        var btnedit = true
        if (level >= viplev.FIRST) {
          btnedit = false
        }
        that.setData({
          level: level,
          btnedit: btnedit,
          levelTime: levelTime
        })
        that.updateTitle(level, levelTime, '')
        if (result.vipNum) {
          var numstr = result.vipNum + '/1000'
          that.setData({
            'viptypelist[0].num': numstr
          })
        }
      }
    })
  },
  findBalance: function () {
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findBalance?openId=' + wx.getStorageSync('openId'),
      success: function (res) {
        var result = res.data.data
        if (result) {
          var balance = result.balanceAmount + result.backMoney
          that.setData({
            balance: balance
          })
        }
      }
    })
  },
  updateTitle: function (lev, levTime, choose) {
    this.setData({
      level: lev,
    })
    if (choose) {
      this.btnUpdate(choose)
    }
    wx.setStorageSync('level', lev)
  },
  btnUpdate: function (choose) {
    var btnedit = this.data.btnedit
    var level = this.data.level
    if (choose == 'FIRST') {
      btnedit = false
    } else if (choose == 'YEAR') {
      btnedit = false
    }  else {
      btnedit = true
    }
    this.setData({
      btnedit: btnedit
    })
  },

  /*click: function () {
    this.setData({
      toView:'red'
    })
  },*/

  goLast: function (level) {
    if (this.data.inter && this.data.inter != 'setting') {
      setTimeout(function () {
        wx.redirectTo({
          url: '../editcom/editcom',
        })
      }.bind(this), 2000)
    }
    if (this.data.up) {
      let pages = getCurrentPages(); //当前页面
      let prevPage = pages[pages.length - 2]; //上一页面
      prevPage.setData({ //直接给上移页面赋值
        update: true,
        level: level
      });
      wx.navigateBack({})
    }
  },
  balancePay: function (e) {
    var that = this
    var vipprice = that.data.vipprice
    var balance = that.data.balance
    if (balance < vipprice) {
      wx.showToast({
        title: '余额不足',
      })
    } else {
      var choose = that.data.choose
      var item = new Object()
      item.openId = wx.getStorageSync('openId')
      item.amount = that.data.vipprice
      item.type = 'VIP'
      item.formId = e.detail.formId
      var vipOrder = new Object()
      var levTime
      if (choose == 'FIRST') {
        vipOrder.level = viplev.FIRST
        levTime = '12'
      } else if (choose == 'YEAR') {
        vipOrder.level = viplev.YEAR
        vipOrder.brand = that.data.brandType
      } else {
        vipOrder.level = viplev.EXP
      }
      item.vipOrder = vipOrder
      wx.request({
        url: util.requestUrl + 'user/balancePay',
        method: 'POST',
        data: item,
        success: function (res) {
          that.updateTitle(vipOrder.level, levTime, choose)
          that.hideModal('pay')
          that.goLast(vipOrder.level)
          that.setData({
            btnedit: false
          })
          that.confirm()
        }
      })
    }
  },
  hideModal: function () {
    var that = this
    that.setData({
      payStatus: false
    })
  },
  wepay: function (e) {
    var that = this
    var choose = that.data.choose
    var item = new Object()
    item.openId = wx.getStorageSync('openId')
    item.amount = that.data.vipprice
    item.type = 'VIP'
    item.formId = e.detail.formId
    var vipOrder = new Object()
    var levTime
    if (choose == 'FIRST') {
      vipOrder.level = viplev.FIRST
    } else if (choose == 'YEAR') {
      vipOrder.level = viplev.YEAR
      levTime = '12'
    } else {
      vipOrder.level = viplev.EXP
    }
    item.vipOrder = vipOrder
    wx.request({
      url: util.requestUrl + 'wechat/wxPay',
      data: item,
      method: 'POST',
      success: function (res) {
        var param = res.data;
        wx.requestPayment({
          timeStamp: param.data.timeStamp,
          nonceStr: param.data.nonceStr,
          package: param.data.package,
          signType: 'MD5',
          paySign: param.data.paySign,
          success: function (event) {
            that.updateTitle(vipOrder.level, levTime, choose)
            that.hideModal('pay')
            that.goLast(vipOrder.level)
            that.confirm()
          },
          fail: function (error) {
          },
          complete: function () {
             
          }
        });
      }
    });
  },

  confirm: function () {
    var that = this
    if (this.data.up) {
      let pages = getCurrentPages(); //当前页面
      let prevPage = pages[pages.length - 2]; //上一页面
      prevPage.setData({ //直接给上移页面赋值
        update: true,
        level: level
      });
      wx.navigateBack({})
    }
    else {
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../vip/vip',
        })
      }, 2000)
    } 
  },

  confirmInfo: function () {
    var that = this
    that.setData({
      payStatus: true
    })
  },
  
})