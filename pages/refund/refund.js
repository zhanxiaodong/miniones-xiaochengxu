const util = require('../../utils/util.js')
import { $wuxDialog } from '../../components/wux'
Page({
  data: {
    btnStatus: false,
    detail:{
      balanceAmount: 20.05,
      backMoney: 5
    }
  },
  onLoad: function (options) {
    var detailStr =  options.detail
    if(detailStr){
      var detail = JSON.parse(detailStr)
      this.setData({
        detail: detail
      })
    }
  },
  inputChange: function(e){
    var temp = e.detail.value
    var btnStatus = this.data.btnStatus
    if (!temp || temp == 0 || temp > this.data.detail.balanceAmount){
      btnStatus = false
    } else {
      btnStatus = true
    }
    this.setData({
      refundAmount: temp,
      btnStatus: btnStatus
    })
  },
  allRefund: function(){
    this.setData({
      refundAmount: this.data.detail.balanceAmount,
      btnStatus: true
    })
  },
  refund: function(){
    var item = new Object()
    item.openId = wx.getStorageSync('openId')
    item.amount = this.data.refundAmount
    item.dealType = 'BALANCE'
    wx.request({
      url: util.requestUrl + 'user/transfer',
      method: 'POST',
      data: item,
      success:function(res){
        var result = res.data.data
        if(result){
          $wuxDialog.alert({
            content: result
          })
        }else{
          $wuxDialog.alert({
            content: '提现成功，请注意账户信息提示。',
            onConfirm(e) {
                wx.navigateBack()
            }
          })
        }
      }
    })
  },
  showReason: function(){
    $wuxDialog.alert({
      content: '余额提现时将等比扣除充值奖励金额，充值奖励金额不能直接转出，仅可用于消费使用。'
    })
  }
})
