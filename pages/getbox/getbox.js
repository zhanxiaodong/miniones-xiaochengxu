var util = require('../../utils/util.js')
var viplev = require('../../utils/viplev.js')
import {
  $wuxDialog
} from '../../components/wux'
Page({
  data: {
    payAmount: 0,
    balance: 0,
    payStatus: false,
    recharge: false,
    weights: [
      '不确定', '10', '12', '14', '16', '18', '20', '22', '24', '26'
    ],
    moneyList: [{
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
  onLoad: function(options) {
    var babyId = options.babyId
    var stylistId = options.stylistId
    var pack = options.pack
    if (pack) {
      this.setData({
        pack: pack
      })
    }
    var today = util.getToday(new Date())
    this.setData({
      date: today,
      babyId: babyId,
      stylistId: stylistId
    })
    var level = wx.getStorageSync('level')
    if(level < 40){
      this.updatePayAmount()
    }
    this.findBalance()
    this.findExpCoupon()
  },
  updatePayAmount: function(){
    var that = this
    wx.request({
      url: util.requestUrl + 'box/updatePayAmount?openId=' + wx.getStorageSync('openId'),
      success: function(res){
        that.setData({
          payAmount: res.data.data
        })
      }
    })
  },
  /**
   * 查看是否存在体验券
   */
  findExpCoupon: function(){
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findCoupon?openId=' + wx.getStorageSync('openId') + '&type=EXPVOUCHER&status=CREATE' ,
      success: function (res) {
        that.setData({
          expCoupon: res.data.data
        })
      }
    })
  },
  /**
   * 余额支付
   */
  balancePay: function (e) {
    var totalPrice = this.data.payAmount
    var balance = this.data.balance
    if (totalPrice > balance) {
      wx.showToast({
        title: '余额不足',
        icon: 'success',
        duration: 1000
      });
    } else {
      var item = this.updateItem()
      item.payChannel = 'BALANCE'
      item.formId = e.detail.formId
      var that = this
      wx.request({
        url: util.requestUrl + 'user/balanceGetBox',
        method: 'POST',
        data: item,
        success: function (res) {
          that.setData({
            recharge: false,
            payStatus: false
          })
          $wuxDialog.alert({
            content: '支付成功,我们将为您精心准备盒子,敬请期待！',
            onConfirm(e) {
              var status = item.status
              let pages = getCurrentPages(); //当前页面
              let prevPage = pages[pages.length - 2]; //上一页面
              prevPage.setData({ //直接给上移页面赋值
                boxStatus: status,
                boxId: res.data.data.id
              });
              wx.navigateBack()
            },
          })
        }
      })
    }
  },
  wepay: function (e) {
    var item = this.updateItem()
    item.payChannel = 'WECHAT'
    item.type = 'SERVICE'
    item.amount = this.data.payAmount
    item.formId = e.detail.formId
    var that = this
    wx.request({
      url: util.requestUrl + 'wechat/wxPay',
      method: 'POST',
      data: item,
      success: function (res) {
        var param = res.data;
        item.otherNo = param.data.orderNo
        wx.requestPayment({
          timeStamp: param.data.timeStamp,
          nonceStr: param.data.nonceStr,
          package: param.data.package,
          signType: 'MD5',
          paySign: param.data.paySign,
          success: function (event) {
            that.setData({
              recharge: false,
              payStatus: false
            })
            wx.request({
              url: util.requestUrl + 'user/balanceGetBox',
              method: 'POST',
              data: item,
              success: function (res) {
                $wuxDialog.alert({
                  content: '支付成功,我们将为您精心准备盒子,敬请期待！',
                  onConfirm(e) {
                    var status = item.status
                    let pages = getCurrentPages(); //当前页面
                    let prevPage = pages[pages.length - 2]; //上一页面
                    prevPage.setData({ //直接给上移页面赋值
                      boxStatus: status,
                      boxId: res.data.data.id
                    });
                    wx.navigateBack()
                  },
                })
              }
            })
          }
        });
      }
    });
  },
  radioChange: function(e) {
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
  clearRadio: function() {
    var moneyList = this.data.moneyList
    for (var i = 0, len = moneyList.length; i < len; ++i) {
      moneyList[i].checked = false;
    }
    this.setData({
      moneyList: moneyList,
      resultAmount: 0.00
    })
  },
  changeAmount: function(e) {
    var reAmount = e.detail.value
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
      reAmount: reAmount,
      realAmount: realAmount,
      resultAmount: reAmount
    })
  },
  showMsg: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 2000
    })
  },
  /**
   * 充值支付
   */
  rechargeO: function() {
    var resultAmount = this.data.resultAmount
    var that = this
    if (resultAmount < 1) {
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
        success: function(res) {
          var param = res.data;
          wx.requestPayment({
            timeStamp: param.data.timeStamp,
            nonceStr: param.data.nonceStr,
            package: param.data.package,
            signType: 'MD5',
            paySign: param.data.paySign,
            success: function(event) {
              that.showMsg('充值成功')
              that.findBalance()
              that.setData({
                recharge: false
              })
            },
            fail: function(error) {
              console.log("支付失败")
              console.log(error)
            },
            complete: function() {
              console.log("pay complete")

            }
          });
        }
      });
    }
  },
  findBalance: function () {
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findBalanceDetail?openId=' + wx.getStorageSync('openId'),
      success: function (res) {
        var result = res.data.data
        if (result) {
          var balance = result.balanceAmount + result.backMoney
          that.setData({
            balance: balance,
            detail: result
          })
        }
      }
    })
  },
  hideModal: function(e) {
    if (this.data.recharge){
      this.setData({
        recharge: false
      })
    } else {
      this.setData({
        payStatus: false
      })
    }
    
  },
  more: function(e) {
    var more = this.data.more
    if (more) {
      wx.navigateTo({
        url: '../more/more?more=' + JSON.stringify(more)
      })
    } else {
      wx.navigateTo({
        url: '../more/more'
      })
    }
  },
  bindChange: function(e) {
    var filed = e.currentTarget.dataset.filed
    var up = filed
    var value = e.detail.value
    if (filed != 'birth') {
      switch (filed) {
        case 'height':
          value = this.data.heights[value]
          break;
        case 'weight':
          value = this.data.weights[value]
          break;
        case 'size':
          value = this.data.sizes[value]
          break;
      }
    }
    this.setData({
      [up]: value
    })
  },
  /**
   * 选择地址
   */
  getAddr: function() {
    wx.navigateTo({
      url: '../readdr/readdr?check=' + true
    })
  },
  bindInput: function(e) {
    this.setData({
      style: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 要一个盒子
   */
  needBox: function(e) {
    var that = this
    var address = that.data.address
    if (!address) {
      wx.showToast({
        title: '请选择地址',
        image: '/images/icons/warn.png',
        duration: 1000
      })
    } else {
      var level = wx.getStorageSync('level')
      // if (level < viplev.EXP) {
      //   $wuxDialog.confirm({
      //     content: '要盒子必须是迷礼会员或体验会员',
      //     cancelText: '取消',
      //     confirmText: '去完善',
      //     onConfirm(e) {
      //       wx.navigateTo({
      //         url: '../viptype/viptype',
      //       })
      //     },
      //     onCancel(e) {},
      //   })
      // } else {
        if(that.data.payAmount > 0){
          that.setData({
            payStatus: true
          })
        } else {
          that.saveBox(e)
        }
      // }
    }
  },
  changeRe: function () {
    this.setData({
      recharge: true
    })
  },
  updateItem: function () {
    var that = this
    var box = that.data.more
    if (!box) {
      box = new Object()
    }
    box.serviceAmount = this.data.payAmount
    box.payType = 'SERVICE'
    box.type = 'GEN'
    box.status = 'CREATE'
    box.orderTime = that.data.date
    box.openId = wx.getStorageSync('openId')
    box.stylistId = that.data.stylistId
    box.babyId = that.data.babyId
    box.style = that.data.style
    box.pack = that.data.pack
    box.address = that.data.address
    return box
  },
  saveBox: function(e) {
    var that = this
    var box = that.data.more
    if (!box) {
      box = new Object()
    }
    box.type = 'GEN'
    box.status = 'CREATE'
    box.orderTime = that.data.date
    box.openId = wx.getStorageSync('openId')
    box.stylistId = that.data.stylistId
    box.babyId = that.data.babyId
    box.style = that.data.style
    box.pack = that.data.pack
    box.address = this.data.address
    box.formId = e.detail.formId

    wx.request({
      url: util.requestUrl + 'box/saveBox',
      method: 'POST',
      data: box,
      success: function(res) {
        var code = res.data.code
        if(code == "0"){
          $wuxDialog.alert({
            content: res.data.message
          })
        } else {
          var status = box.status
          var boxId = res.data.data.id
          let pages = getCurrentPages(); //当前页面
          let prevPage = pages[pages.length - 2]; //上一页面
          prevPage.setData({ //直接给上移页面赋值
            boxStatus: status,
            boxId: boxId
          });
          wx.redirectTo({
            url: '../designinfo/designinfo?boxId=' + boxId
          })
        }
      }
    })
  }
})