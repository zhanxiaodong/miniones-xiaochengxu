var util = require("../../utils/util.js")
var viplev = require("../../utils/viplev.js")
import { $wuxDialog } from '../../components/wux'
Page({
  data: {
    vipPrivileges: [{
      img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/Zhekou.png?x-oss-process=image/resize,h_80,w_80',
      title: '专属搭配'
    },
    {
      img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/Zhekou2.png',
      title: '专享折扣'
    },
    {
      img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/Zhekou3.png',
      title: '先试后买'
    },
    {
      img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/Zhekou4.png',
      title: '往返包邮'
    },
    {
      img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/Zhekou5.png',
      title: '生日礼盒'
    },
    {
      img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/Zhekou6.png',
      title: '周年礼券'
    },
    {
      img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/Zhekou7.png',
      title: '免费订阅'
    }
    ],
    conList:[
      { img: "/images/vip-one.png", text: "免服务费"},
      { img: "/images/vip-two.png", text: "会员折上折" },
      { img: "/images/vip-three.png", text: "专属搭配师" },
      { img: "/images/vip-four.png", text: "￥199免/季" },
      { img: "/images/vip-five.png", text: "全账号通行" },
    ],
    choose:'FIRST',
    scrollTop: '50',
    toView: 'red',
    vipprice:"199.00",
    upgrade:false
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
    if (options.up) {
      this.setData({
        up: true
      })
    }
    if (options.upgrade) {
      this.setData({
        upgrade: true,
        vipprice: 100
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

  vipNext: function () {
     wx.navigateTo({
       url: '/pages/vipquestion/vipquestion',
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
      var upgrade = that.data.upgrade
      var item = new Object()
      item.openId = wx.getStorageSync('openId')
      item.amount = that.data.vipprice
      item.type = 'VIP'
      item.formId = e.detail.formId
      var vipOrder = new Object()
      var levTime
      if (choose == 'FIRST') {
        if (upgrade) {
          vipOrder.upgrade = upgrade
        }
        vipOrder.level = viplev.FIRST
      } else if (choose == 'YEAR') {
        levTime = '12'
        vipOrder.level = viplev.YEAR
        vipOrder.brand = that.data.brandType
      } else {
        vipOrder.level = viplev.EXP
      }
      item.vipOrder = vipOrder
      console.log(item)
      wx.showLoading({
        title: '',
        mask: true
      })
      wx.request({
        url: util.requestUrl + 'user/balancePay',
        method: 'POST',
        data: item,
        success: function (res) {
          wx.hideLoading()
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
      payStatus: false,
      redeemStatus: false
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
    var upgrade = this.data.upgrade
    if (choose == 'FIRST') {
      if (upgrade) {
        vipOrder.upgrade = upgrade
      }
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
            that.goLast
            (vipOrder.level)
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
    } else {
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
      that.setData({
        payStatus: true
      })
    }
  },
  
  redeem: function () {
    var that = this
    that.setData({
      redeemStatus: true
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
        if (code == '0') {
          var message = res.data.message
          $wuxDialog.alert({
            content: '兑换失败!' + message
          })
        } else {
          $wuxDialog.alert({
            content: "兑换成功！"
          })
          that.hideModal()
        }
      }
    })
  }

})