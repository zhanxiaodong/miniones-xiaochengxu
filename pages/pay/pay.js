var app = getApp()
var util = require("../../utils/util.js")
var viplev = require('../../utils/viplev.js')
import { $wuxDialog } from '../../components/wux'

Page({
  data: {
    otherdesc: '整盒留下8折',
    other: false,
    otheramount: 0,
    showModalStatus: false,
    confirmNo: false,
    resultAmount:0.00,
    recharge: false,
    saveHidden: true,
    goodsTotal: 0.00,
    totalPrice: 0.00,
    subPrice: 0.00,
    badgeAmount: 0.00,
    mgic:'/images/mg.png',
    totalScoreToPay: 0.00,
    allSelect: false,
    badgenum:0.0,
    firstAmount:39.00,
    vipDicount:39.00,
    cashuse: true,
    discountPrice: 0.00,
    moneyList:[
      {
        value:100,
        revalue: 5
      },
      {
        value: 500,
        revalue: 20
      },
      {
        value: 1000,
        revalue: 50
      },
      {
        value: 2000,
        revalue: 120
      },
      {
        value: 5000,
        revalue: 400
      },
      {
        value: 10000,
        revalue: 1000
      }
    ]
  },
  onLoad: function(options){
    var that = this
    if(options.boxId){
      var boxId = options.boxId
      that.setData({
        boxId: boxId
      })
      this.updateInfo(null)
    }
    this.findBalance()
    
  },
  callPhone: function(){
    wx.makePhoneCall({
      phoneNumber: '400-108-2028'
    })
  },
  updateInfo: function(goods){
    var boxId = this.data.boxId
    var that = this
    wx.request({
      url: util.requestUrl + 'box/findBoxPay?id=' + boxId + '&openId=' + wx.getStorageSync('openId'),
      success: function (res) {
        var result = res.data.data
        var goodsList = result.goodsList
        var boxNum = result.boxNum
        var voucher = result.voucher ? result.voucher : null
        var cash = result.cash ? result.cash : null
        var badge = result.badge ? result.badge : null
        var level = result.level
        var boxNo = result.boxNo
        var couponsNum = result.couponsNum ? result.couponsNum : null
        var vipo
        if (level == viplev.FIRST) {
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
          boxNo: boxNo
        })
        if (goods) {
          var goodsTotal = that.data.goodsTotal
          that.updateAmount(goodsTotal ? goodsTotal : 0.00)
          that.setData({
            update: null
          })
        } else {
          that.setData({
            goodsList: goodsList
          })
        }
      }
    })
  },
  onShow:function(){
    
    var voucher = this.data.voucher
    if(voucher){
      var goodsTotal = this.data.goodsTotal
      this.updateAmount(goodsTotal ? goodsTotal : 0.00)
    }
    var update = this.data.update
    if(update){
      this.updateInfo(true)
    }
  },
  findBalance: function(){
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
  radioChange: function(e){
    var moneyList = this.data.moneyList
    var value = e.detail.value
    moneyList = util.radioGroupChange(moneyList, value)
    this.updateRealAmount(value)
    this.setData({
      moneyList: moneyList,
      resultAmount: value,
      reAmount: null
    })
  },
  /**
   * 提交订单
   */
  toPayOrder: function(e){
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var checkList = this.data.checkList
    if (checkList && checkList.length > 0){
      this.showModal()
    } else{
      this.showComfirm()
    }
    
  },
  /**
   * 全选按钮
   */
  bindAllSelect: function(){
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
    } 
    if (!currentAllSelect) {
      this.setData({
        other: true,
        otherdesc: '整盒留下8折',
        otherDic: 0.2
      })
    } else if (valusLen >= 3) {
      this.setData({
        other: true,
        otherdesc: '3件及以上9折',
        otherDic: 0.1
      })
    } else {
      this.setData({
        other: false,
        otherdesc: '整盒留下8折',
        otherDic: 0.2
      })
    } 
    if (currentAllSelect) {
      this.setData({
        other: true,
        otherdesc: '整盒留下8折',
        otherDic: 0.2
      })
    }
    this.updateAmount(goodsTotal)

    this.setData({
      goodsList : list,
      checkList: checkList,
      allSelect: !currentAllSelect
    })
  },
  updateAmount: function (goodsTotal){

    var subPrice = 0.00
    var totalPrice = 0.00
    var discountPrice = 0.00
    var badgeAmount = 0.00
    var otheramount = 0.00
    var vipoprice = 0.00
    if (goodsTotal > 0) {
      totalPrice = goodsTotal
      if (this.data.boxNum == 1) {
        var firstAmount = this.data.firstAmount
        if(totalPrice < firstAmount){
          totalPrice = 0
          subPrice = goodsTotal
        } else {
          totalPrice = totalPrice - firstAmount
          subPrice = subPrice + firstAmount
        }
      }
      var voucher = this.data.voucher
      if (voucher && totalPrice != 0) {
        var vouAmount = voucher.amount
        if(vouAmount > totalPrice){
          subPrice = totalPrice
          totalPrice = 0
        } else {
          totalPrice = totalPrice - voucher.amount
          subPrice = subPrice + voucher.amount
        }
      }
      var badge = this.data.badge
      if (badge && totalPrice > 0){
        var baType = badge.type
        badgeAmount = badge.amount
        if(baType != 'MONEY'){
          badgeAmount = parseFloat((totalPrice * (10 - badge.discount) / 10).toFixed(2))
        }
        if (totalPrice > badgeAmount) {
          totalPrice = totalPrice - badgeAmount
          subPrice = subPrice + badgeAmount
        } else {
          totalPrice = 0
          subPrice = subPrice + totalPrice
        } 
      } else {
        badgeAmount = (totalPrice / 10).toFixed(2)
      }
      var cash = this.data.cash
      if (cash) {
        if (totalPrice >= cash.condition) {
          totalPrice = totalPrice - cash.amount
          subPrice = subPrice + cash.amount
        } else {
          this.setData({
            cashuse: false
          })
        }
      }
      var vipo = this.data.vipo
      if (vipo && totalPrice > 0){
        discountPrice = totalPrice * vipo.discount
        totalPrice = totalPrice - discountPrice
        subPrice = subPrice + discountPrice
      } else {
        vipoprice = totalPrice * 0.15
      }
      if (this.data.other && totalPrice > 0){
        otheramount = totalPrice * this.data.otherDic
        totalPrice = totalPrice - otheramount
        subPrice = subPrice + otheramount
      }
    }
    this.setData({
      vipoprice: vipoprice.toFixed(2),
      otheramount: otheramount.toFixed(2),
      badgeAmount: badgeAmount,
      goodsTotal: goodsTotal,
      totalPrice: totalPrice.toFixed(2),
      subPrice: subPrice.toFixed(2),
      badgenum: (totalPrice / 199).toFixed(2),
      discountPrice: discountPrice.toFixed(2)
    })
  },
  goodsChange: function (e) {
    var goodsList = this.data.goodsList, values = e.detail.value;
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
        }
      }
    }
    if (goodsList.length == valusLen) {
      this.setData({
        other: true,
        otherdesc: '整盒留下8折',
        otherDic: 0.2
      })
    } else if (valusLen >= 3){
      this.setData({
        other: true,
        otherdesc: '3件及以上9折',
        otherDic: 0.1
      })
    } else{
      this.setData({
        other: false,
        otherdesc: '整盒留下8折',
        otherDic: 0.2
      })
    }
    this.updateAmount(goodsTotal)
    
    this.setData({
      goodsList: goodsList,
      checkList: values,
      allSelect: currentAllSelect
    });
    
  },
  showModal: function () {
    this.setData({
      showModalStatus: true
    })
  },
  hideModal: function (e) {
    if (this.data.recharge) {
      this.setData({
        recharge: false
      })
    } else {
      this.setData({
        showModalStatus: false
      })
    }

  },
  clearRadio: function(){
    var moneyList = this.data.moneyList
    for (var i = 0, len = moneyList.length; i < len; ++i) {
      moneyList[i].checked = false;
    }
    this.setData({
      moneyList: moneyList,
      resultAmount: 0.00,
      realAmount: 0.00
    })
  },
  updateRealAmount: function (reAmount) {
    var realAmount = reAmount
    if (reAmount >= 10000) {
      realAmount = Number(reAmount) + 1000
    } else if (reAmount >= 5000) {
      realAmount = Number(reAmount) + 400
    } else if (reAmount >= 2000) {
      realAmount = Number(reAmount) + 120
    } else if (reAmount >= 1000) {
      realAmount = Number(reAmount) + 50
    } else if (reAmount >= 500) {
      realAmount = Number(reAmount) + 20
    } else if (reAmount >= 100) {
      realAmount = Number(reAmount) + 5
    }
    this.setData({
      realAmount: realAmount
    })
  },
  changeAmount:function(e){
    var reAmount = e.detail.value
    this.updateRealAmount(reAmount)
    this.setData({
      reAmount: reAmount,
      resultAmount: reAmount
    })
  },
  /**
   * 充值支付
   */
  rechargeO: function(){
    var resultAmount = this.data.resultAmount
    var that = this
    if(resultAmount < 0){
      that.showMsg('金额不能小于1元')
    } else {
      var item = new Object()
      item.openId = wx.getStorageSync('openId')
      item.amount = resultAmount
      item.type = 'RECHARGE'
      wx.request({
        url: util.requestUrl + 'wechat/wxPay',
        method: 'POST',
        data: item,
        success: function (res) {
          var param = res.data;
          wx.requestPayment({
            timeStamp: param.data.timeStamp,
            nonceStr: param.data.nonceStr,
            package: param.data.package,
            signType: 'MD5',
            paySign: param.data.paySign,
            success: function (event) {
              that.showMsg('充值成功')
              that.findBalance()
              that.setData({
                recharge: false
              })
            }
          });
        }
      });
    }
  },
  showMsg:function(msg){
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 2000
    })
  },
  changeRe:function(e){
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    this.setData({
      recharge:true
    })
  },
  /**
   * 余额支付
   */
  balancePay: function(e){
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var totalPrice = this.data.totalPrice
    var balance = this.data.balance
    if(totalPrice > balance){
      this.showMsg('余额不足')
    } else {
      var item = this.updateItem()
      var that = this
      wx.request({
        url: util.requestUrl + 'user/balancePay',
        method:'POST',
        data: item,
        success: function(res){
          that.setData({
            recharge: false,
            showModalStatus: false
          })
          that.confirm()
        }
      })
    }
  },
  wepay: function (e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var item = this.updateItem()
    var that = this
    wx.request({
      url: util.requestUrl + 'wechat/wxPay',
      method: 'POST',
      data: item,
      success: function (res) {
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
          success: function (event) {
            that.updateBox()
            that.setData({
              recharge: false,
              showModalStatus: false
            })
            that.confirm()
          }
        });
      }
    });
  },
  confirm: function(){
    var that = this
    $wuxDialog.alert({
      content: '支付成功, 感谢您的合作,希望您对本次服务满意！',
      onConfirm(e) {
        if(that.data.allSelect){
          wx.reLaunch({
            url: '../clothes/clothes?share=true',
          })
        } else {
          wx.reLaunch({
            url: '../clothes/clothes?back=true&boxId=' + that.data.boxId,
          })
        }
      }
    })
  },
  updateBox(){
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
  updateItem:function(){
    var item = new Object()
    item.openId = wx.getStorageSync('openId')
    item.amount = this.data.totalPrice
    item.type = 'PAY'
    item.checkList = this.data.checkList
    item.boxNo = this.data.boxNo
    
    var badge = this.data.badge
    var voucher = this.data.voucher
    var cash = this.data.cash
    var payBoxInfo = new Object()
    payBoxInfo.badgeId = badge ? badge.id : null
    payBoxInfo.voucherId = voucher ? voucher.id : null
    payBoxInfo.cashId = cash ? cash.id : null
    payBoxInfo.subPrice = this.data.subPrice
    item.payBoxInfo = payBoxInfo
    return item
  },
  hideComfirm:function(e){
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    this.setData({
      confirmNo: false
    })
  },
  showComfirm: function () {
    this.setData({
      confirmNo: true
    })
  },
  confirmNoPay: function(e){
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var item = new Object()
    item.openId = wx.getStorageSync('openId')
    item.amount = this.data.totalPrice
    item.type = 'PAY'
    item.checkList = this.data.checkList
    item.boxNo = this.data.boxNo
    var that = this
    wx.request({
      url: util.requestUrl + 'user/balancePay',
      method: 'POST',
      data: item,
      success: function (res) {
        wx.navigateTo({
          url: '../back/back?boxId=' + that.data.boxId,
        })
      }
    })
  },
  goUp: function () {
    wx.navigateTo({
      url: '../viptype/viptype?up=true',
    })
  },
  checkcou: function(){
    wx.navigateTo({
      url: '../coupon/coupon?pick=true',
    })
  }
})