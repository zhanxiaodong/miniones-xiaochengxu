var util = require("../../utils/util.js")
var viplev = require('../../utils/viplev.js')
import {
  $wuxDialog
} from '../../components/wux'
// import { toFix } from '../addmul.wxs'
Page({
  data: {
    show: true,
    otherdesc: '3件及以上8折，整盒7折',
    other: false,
    otherAmount: 0,
    showModalStatus: false,
    confirmNo: false,
    resultAmount: 0.00,
    saveHidden: true,
    goodsTotal: 0.00,
    totalPrice: 0.00,
    subPrice: 0.00,
    badgeAmount: 0.00,
    mgic: '/images/mg.png',
    defaultImg:'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/shoplist.jpg?x-oss-process=image/resize,h_100,w_100',
    imgSize:'?x-oss-process=image/resize,h_100,w_100',
    totalScoreToPay: 0.00,
    allSelect: false,
    badgenum: 0.0,
    vipDicount: 39.00,
    orderPay: 0.0,
    cashuse: true,
    discountPrice: 0.00,
    chooseCount: 0,
    avgPrice: 0.00,
    backCount: 0,
    vipoprice: 99,
    checkboxItems: [
      { value: '太小了', },
      { value: '太大了', },
      { value: '贵了' },
      { value: '款式不喜欢' },
      { value: '面料问题' },
      { value: '颜色问题' },
    ]
  },
  onLoad: function(options) {
    var that = this
    var initAmount = Math.floor(initAmount * 100) / 100
    if (options.reBuy) {
      that.setData({
        reBuy: options.reBuy == 'true' ? true : false,
        backCount: Number(options.backCount)
      })
    }
    if (options.boxId) {
      var boxId = options.boxId
      that.setData({
        boxId: boxId
      })
      this.updateInfo(null)
    }
    this.findBalance()
  },
  timeFormat(param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown() { //倒计时函数
    let newTime = new Date().getTime();
    let actTime = this.data.actTime;
    let actEndTime = null;
    if (actTime - newTime > 0) {
      let time = (actTime - newTime) / 1000;
      let day = parseInt(time / (60 * 60 * 24));
      let hou = parseInt(time % (60 * 60 * 24) / 3600);
      let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
      let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
      actEndTime = {
        day: this.timeFormat(day),
        hou: this.timeFormat(hou + day * 24),
        min: this.timeFormat(min),
        sec: this.timeFormat(sec)
      }
      setTimeout(this.countDown, 1000);
    } else {
      actEndTime = {
        day: '00',
        hou: '00',
        min: '00',
        sec: '00'
      }
    }
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      actEndTime: actEndTime
    })
  },
  updateInfo: function(goods) {
    var boxId = this.data.boxId
    var that = this
    wx.request({
      url: util.requestUrl + 'box/findBoxPay?id=' + boxId + '&openId=' + wx.getStorageSync('openId'),
      success: function(res) {
        var result = res.data.data
        var actTime = result.actTime ? result.actTime : 0
        var orderPay = result.orderPay ? result.orderPay : 0.00
        var goodsList = result.goodsList
        var boxNum = result.boxNum
        var voucher = result.voucher ? result.voucher : null
        var cash = result.cash ? result.cash : null
        var badge = result.badge ? result.badge : null
        var level = result.level
        var totalAllPrice = result.totalPrice
        var hasBuy = result.hasBuy ? result.hasBuy : false
        if (goods) {
          level = that.data.level
        }
        var boxNo = result.boxNo
        var couponsNum = result.couponsNum ? result.couponsNum : null
        var vipo
        if (level == viplev.FIRST || level == viplev.YEAR) {
          vipo = new Object()
          vipo.desc = '会员专享9折'
          vipo.discount = 0.1
        } else if (level == viplev.SECOND) {
          vipo = new Object()
          vipo.desc = '会员专享8.8折'
          vipo.discount = 0.12
        } else if (level == viplev.THIRD) {
          vipo.desc = '会员专享8.5折'
          vipo.discount = 0.15
        } else {
          vipo = null
        }
        var badgeAmount = that.data.badgeAmount
        if (badge) {
          badgeAmount = badge.amount
        }
        that.setData({
          boxNum: boxNum,
          voucher: voucher,
          couponsNum: couponsNum,
          cash: cash,
          badge: badge,
          badgeAmount: badgeAmount,
          level: level,
          vipo: vipo,
          boxNo: boxNo,
          actTime: actTime,
          orderPay: orderPay,
          totalAllPrice: totalAllPrice,
          reBuy: hasBuy
        })

        if (goods) {
          var goodsTotal = that.data.goodsTotal
          that.findBalance()
          that.updateAmount(goodsTotal ? goodsTotal : 0.00)
          that.setData({
            update: null
          })
        } else {
          var goodsLength = goodsList.length
          for (var i = 0; i < goodsLength; i++) {
            var postfix = ''
            if (i < 10) {
              postfix = '0' + i
            } else {
              postfix = '' + i
            }
            goodsList[i].id = goodsList[i].id + postfix
          }
          that.setData({
            goodsList: goodsList
          })
          that.countDown() //优惠支付倒计时
          that.bindAllSelect() //默认全选
        }
      }
    })
  },
  onShow: function() {
    var voucher = this.data.voucher
    // if (voucher) {
      var goodsTotal = this.data.goodsTotal
      this.updateAmount(goodsTotal ? goodsTotal : 0.00)
    // }
    var update = this.data.update
    if (update) {
      this.updateInfo(true)
    }
  },
  findBalance: function() {
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findBalance?openId=' + wx.getStorageSync('openId'),
      success: function(res) {
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
  rmPostfix: function() {
    var checkLists = this.data.checkList
    var checks = new Array()
    if (checkLists) {
      for (var i = 0; i < checkLists.length; i++) {
        var item = checkLists[i]
        item = item.substring(0, item.length - 2)
        checks.push(item)
      }
    }
    return checks
  },
  choseCoupo: function() {
    var goodsTotal = this.data.goodsTotal
    wx.navigateTo({
      url: '/pages/coupon/coupon?pick=true&vouType=VOUCHER&condition=' + goodsTotal,
    })
  },
  /**
   * 提交订单
   */
  toPayOrder: function(e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var checkList = this.data.checkList
    if (checkList && checkList.length > 0) {
      this.showModal()
    } else {
      this.showComfirm()
    }

  },
  /**
   * 全选按钮
   */
  bindAllSelect: function() {
    var currentAllSelect = this.data.allSelect
    var list = this.data.goodsList
    var goodsTotal = 0.00
    var valusLen = 0
    var checkList
    if (currentAllSelect) {
      for (var i = 0; i < list.length; i++) {
        var curItem = list[i];
        curItem.checked = false;
      }
      checkList = null
    } else {
      checkList = new Array()
      for (var i = 0; i < list.length; i++) {
        var curItem = list[i];
        curItem.checked = true;
        goodsTotal = goodsTotal + list[i].realAmount
        checkList.push(curItem.id)
      }
      valusLen = this.data.goodsList.length
    }
    if (!currentAllSelect) {
      this.setData({
        other: true,
        otherdesc: '整盒7折',
        otherDic: 0.3
      })
    } else if (valusLen >= 3) {
      this.setData({
        other: true,
        otherdesc: '3件及以上8折',
        otherDic: 0.2
      })
    } else {
      this.setData({
        other: false,
        otherdesc: '整盒7折',
        otherDic: 0.3
      })
    }
    if (currentAllSelect) {
      this.setData({
        other: true,
        otherdesc: '整盒7折',
        otherDic: 0.3
      })
    }
    this.setData({
      goodsList: list,
      checkList: checkList,
      allSelect: !currentAllSelect,
      chooseCount: valusLen
    })
    this.updateAmount(goodsTotal)
  },
  updateAmount: function(goodsTotal) {
    var subPrice = 0.00
    var totalPrice = 0.00
    var discountPrice = 0.00
    var badgeAmount = 0.00
    var otherAmount = 0.00
    var vipoprice = 0.00
    var avgPrice = 0.00
    goodsTotal = Number(goodsTotal)
    if (goodsTotal > 0) {
      totalPrice = goodsTotal
      var voucher = this.data.voucher
      var reBuy = this.data.reBuy
      if (voucher && totalPrice != 0 && !reBuy) {
        var vouAmount = voucher.amount
        var vouCondition = voucher.condition ? voucher.condition : 0
        if (totalPrice >= vouCondition) {
          if (vouAmount > totalPrice) {
            subPrice = totalPrice
            totalPrice = 0
          } else {
            totalPrice = totalPrice - voucher.amount
            subPrice = subPrice + voucher.amount
          }
        } else {
          this.setData({
            voucher: null
          })
        }
      }
      var orderPay = this.data.orderPay
      if (orderPay) {
        if (orderPay > 0 && !reBuy) {
          if (orderPay > totalPrice) {
            subPrice = totalPrice
            totalPrice = 0
          } else {
            totalPrice = totalPrice - orderPay
            subPrice = subPrice + orderPay
          }
        }
      }
      var vipo = this.data.vipo
      if (vipo && totalPrice > 0) {
        discountPrice = totalPrice * vipo.discount
        totalPrice = totalPrice - discountPrice
        subPrice = subPrice + discountPrice
      } else {
        vipoprice = totalPrice * 0.1 + 99
      }
      if (this.data.other && totalPrice > 0 ) {
        var voucher = this.data.voucher
        if (!voucher || (voucher && !voucher.condition)) {
          otherAmount = totalPrice * this.data.otherDic
          totalPrice = totalPrice - otherAmount
          subPrice = subPrice + otherAmount
        }
      }
      var chooseCount = this.data.chooseCount
      if (chooseCount && totalPrice > 0) {
        avgPrice = (totalPrice / chooseCount).toFixed(2)
      }
    } else {
      this.setData({
        voucher: null
      })
    }
    this.setData({
      vipoprice: vipoprice.toFixed(2),
      otherAmount: otherAmount.toFixed(2),
      badgeAmount: badgeAmount,
      goodsTotal: goodsTotal.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      avgPrice: avgPrice,
      subPrice: subPrice.toFixed(2),
      badgenum: (totalPrice / 199).toFixed(2),
      discountPrice: discountPrice.toFixed(2),
      orderPay: orderPay ? orderPay : 0.00
    })
  },
  goodsChange: function(e) {
    var goodsList = this.data.goodsList,
      values = e.detail.value;
    var goodsLen = goodsList.length
    var valusLen = values.length
    var currentAllSelect = this.data.allSelect
    var goodsTotal = 0.00
    if (goodsLen == valusLen) {
      currentAllSelect = true
    } else {
      currentAllSelect = false
    }
    for (var i = 0; i < goodsLen; ++i) {
      goodsList[i].checked = false;

      for (var j = 0; j < valusLen; ++j) {
        if (goodsList[i].id == values[j]) {
          goodsList[i].checked = true;
          goodsTotal = goodsTotal + goodsList[i].realAmount
          break;
        } else {
          // 取消选中
          var id = goodsList[i].id
          // 碳层

        }
      }
    }
    if (goodsList.length == valusLen) {
      this.setData({
        other: true,
        otherdesc: '整盒7折',
        otherDic: 0.3
      })
    } else if (valusLen >= 3) {
      this.setData({
        other: true,
        otherdesc: '3件及以上8折',
        otherDic: 0.2
      })
    } else {
      this.setData({
        other: false,
        otherdesc: '整盒7折',
        otherDic: 0.3
      })
    }
    this.setData({
      goodsList: goodsList,
      checkList: values,
      allSelect: currentAllSelect,
      chooseCount: valusLen
    });
    this.updateAmount(goodsTotal)
  },
  showModal: function() {
    this.setData({
      showModalStatus: true
    })
  },
  hideModal: function(e) {
    this.setData({
      showModalStatus: false
    })
  },
  hideImg: function() {
    this.setData({
      confirmNo: false,

    })
  },
  showMsg: function(msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 2000
    })
  },
  /**
   * 余额支付
   */
  balancePay: function(e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var totalPrice = this.data.totalPrice
    var balance = this.data.balance
    if (totalPrice > balance) {
      this.showMsg('余额不足')
    } else {
      var item = this.updateItem()
      var that = this
      wx.showLoading({
        title: '',
        mask: true
      })
      wx.request({
        url: util.requestUrl + 'user/balancePay',
        method: 'POST',
        data: item,
        success: function(res) {
          wx.hideLoading()
          that.setData({
            showModalStatus: false
          })
          that.confirm()
        }
      })
    }
  },
  wepay: function(e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var item = this.updateItem()
    var that = this
    wx.request({
      url: util.requestUrl + 'wechat/wxPay',
      method: 'POST',
      data: item,
      success: function(res) {
        var param = res.data;
        that.setData({
          outTradeNo: param.data.orderNo
        })
        wx.requestPayment({
          timeStamp: param.data.timeStamp,
          nonceStr: param.data.nonceStr,
          package: param.data.package,
          signType: 'MD5',
          paySign: param.data.paySign,
          success: function(event) {
            that.updateBox()
            that.setData({
              showModalStatus: false
            })
            that.confirm()
          }
        });
      }
    });
  },
  confirm: function() {
    var that = this
    var allSelect = that.data.allSelect
    var reBuy = that.data.reBuy
    if (reBuy) {
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function() {
        wx.reLaunch({
          url: '../index/index',
        })
      }, 2000)
    } else {
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function() {
        wx.reLaunch({
          url: '../assess/assess?back=true&boxId=' + that.data.boxId
        })
      }, 2000)
    }
  },
  updateBox() {
    var item = new Object()
    item.boxId = this.data.boxId
    item.orderNo = this.data.boxNo
    item.outTradeNo = this.data.outTradeNo
    wx.request({
      url: util.requestUrl + 'box/updateBoxPay',
      method: 'POST',
      data: item
    })
  },
  updateItem: function() {
    var item = new Object()
    item.openId = wx.getStorageSync('openId')
    item.amount = this.data.totalPrice
    item.type = 'PAY'
    item.checkList = this.rmPostfix()
    item.boxNo = this.data.boxNo
    var badge = this.data.badge
    var voucher = this.data.voucher
    var cash = this.data.cash
    var payBoxInfo = new Object()
    payBoxInfo.badgeId = badge ? badge.id : null
    payBoxInfo.voucherId = voucher ? voucher.id : null
    payBoxInfo.cashId = cash ? cash.id : null
    payBoxInfo.subPrice = this.data.subPrice
    payBoxInfo.VoucherAmount = this.data.voucher ? this.data.voucher.amount : 0
    payBoxInfo.orderPay = this.data.orderPay
    payBoxInfo.discountPrice = this.data.discountPrice
    payBoxInfo.otherAmount = this.data.otherAmount
    payBoxInfo.avgPrice = this.data.avgPrice
    item.payBoxInfo = payBoxInfo
    return item
  },
  hideComfirm: function(e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    this.setData({
      confirmNo: false
    })
  },
  showComfirm: function() {
    this.setData({
      confirmNo: true
    })
  },
  confirmNoPay: function(e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var item = new Object()
    item.openId = wx.getStorageSync('openId')
    item.amount = this.data.totalPrice
    item.type = 'PAY'
    item.boxNo = this.data.boxNo
    var that = this
    item.checkList = this.rmPostfix()
    console.log(item.checkList)
    wx.request({
      url: util.requestUrl + 'user/balancePay',
      method: 'POST',
      data: item,
      success: function(res) {
        wx.navigateTo({
          url: '../back/back?boxId=' + that.data.boxId,
        })
      }
    })
  },
  
  checkboxChange: function (e) {
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems,
    });
    console.log(e.detail.value)
  },
  
  goCulb: function() {
    wx.navigateTo({
      url: "/pages/club/club?up=true"
    })
  },
  refuse: function() {
    wx.reLaunch({
      url: "../index/index",
    })
  },
  sb: function () {
    var that = this
    that.setData({
      show: false
    })
  },
  // ok: function () {
  //   var that = this
  //   that.setData({
  //     show: true
  //   })
  // }
})