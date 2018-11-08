var util = require("../../utils/util.js")
import { $wuxDialog } from '../../components/wux'
Page({
  data:{
    balance:0.00,
    showModalStatus: false,
    moneyList: [
      {
        value: 100,
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
  onLoad:function(){
  },
  onShow: function () {
    this.findBalance()
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          mapheight: res.windowHeight
        })
        
      }
    })
  },
  findBalance:function(){
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findBalanceDetail?openId=' + wx.getStorageSync('openId'),
      success: function (res) {
        var result = res.data.data
        if (result) {
          var balance = result.balanceAmount + result.backMoney
          that.setData({
            balance: balance.toFixed(2),
            detail: result
          })
        }
      }
    })
  },
  clearRadio: function () {
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
  changeAmount: function (e) {
    var reAmount = e.detail.value
    this.updateRealAmount(reAmount)
    this.setData({
      reAmount: reAmount,
      resultAmount: reAmount
    })
  },
  updateRealAmount: function (reAmount){
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
  radioChange: function (e) {

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
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  pay: function () {
    var that = this
    var resultAmount = that.data.resultAmount
    var item = new Object()
    item.openId = wx.getStorageSync('openId')
    item.amount = resultAmount
    item.type = 'RECHARGE'

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
            that.findBalance()
            wx.showToast({
              title: '充值成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              showModalStatus:false
            })
          },
          fail: function (error) {
            console.log("支付失败")
            console.log(error)
          },
          complete: function () {
            console.log("pay complete")

          }
        });
      }
    });

  },
  refund: function(){
    var that = this
    var detail = that.data.detail
    var level = wx.getStorageSync('level')
    if (!level && level < 20) {
      $wuxDialog.alert({
        content: '提现需先完成注册，成为体验会员！'
      })
    }else if(!detail || detail.balanceAmount == 0 ){
      $wuxDialog.alert({
        content: '您没有金额可以提现！现有金额为系统赠送,只能用在消费中!'
      })
    } else if (detail && detail.num){
      $wuxDialog.alert({
        content: '您有盒子在进程中,暂不能提现！'
      })
    } else {
      wx.navigateTo({
        url: '../refund/refund?detail=' + JSON.stringify(this.data.detail),
      })
    }
  }
});