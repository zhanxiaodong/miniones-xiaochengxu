var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require("../../utils/util.js")
import { $wuxDialog } from '../../components/wux'
Page({
  data: {
    needAuth: false,
    boxstep: 0,
    codeImg: 'https://oss.bananayc.com/minianys/TBJt5WKs5RZPrMK5nxMS5wd385Gz6XaQ.png',
    defaultImg: '/images/ava.png',
    array: ['', '沟通风格更亲切', '搭配风格更前卫', '仅是想尝试新的选择'],
    index: 0,
    tabs: ["我的搭配师", "搭配盒子"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    orderNo: 'ali20180125',
    phone: "400-108-2628",
    hasbox: false,
    progressData: [
      {
        desc: '搭配师收到您的盒子需求'
      },
      {
        desc: '搭配师尝试进一步与您沟通,在结束后会亲手精选2-3套合适小朋友的服饰配件,装进mini盒子寄给您.'
      },
      {
        desc: 'mini盒子送达，小朋友记得亲自打开，然后在家逐一试穿，留下小朋友喜欢的并付款。会员用户享受多重折扣叠加哦。'
      },
      {
        desc: '其余衣服您可以在7日内免费退回。请点击此处一键预约取件。也可以在首页退回按钮完成退件。'
      },
      {
        desc: '希望您和小朋友能喜欢我们的推荐，如果可以，您可以为小朋友拍摄美美的照片，上传至小朋友个人look。我们将为您送上20-99不等的代金券哦～'
      }
    ]
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
    }
  },
  onShow: function () {
    this.findBox()
  },
  onLoad: function (options) {
    this.checkAuth()
    if (options.boxId) {
      var boxId = options.boxId
      this.setData({
        activeIndex: 1
      })
    }
    if (options.activeIndex) {
      this.setData({
        activeIndex: options.activeIndex
      })
    }
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    that.findStylist()
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  go: function (e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    wx.switchTab({
      url: '../index/index',
    })
  },
  findBox: function () {
    var that = this
    wx.request({
      url: util.requestUrl + 'box/findBox?openId=' + wx.getStorageSync('openId'),
      success: function (res) {
        var result = res.data.data
        if (result) {
          var status = result.status
          var boxstep = that.data.boxstep
          if (status == 'LINK_UP' || status == 'NOTIFY_EXPRESS' || status == 'DISPATCHING') {
            boxstep = 1
          } else if (status == 'DELIVERY_COMPLETE') {
            boxstep = 2
          } else if (status == 'PAY_PART' || status == 'RETURN_EXPRESS') {
            boxstep = 3
          } else if (status == 'PAY_COMPLETE' || status == 'END') {
            boxstep = 4
          }
          that.setData({
            box: result,
            hasbox: true,
            boxstep: boxstep
          })
        }
      }
    })
  },
  findStylist: function () {
    var openId = wx.getStorageSync('openId')
    var that = this
    wx.request({
      url: util.requestUrl + 'stylist/findByOpenId?openId=' + openId,
      success: function (res) {
        if (res.data.data) {
          that.setData({
            stylist: res.data.data
          })
        }
      }
    })
  },
  edit: function () {
    wx.navigateTo({
      url: '../babydetail/babydetail'
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      urls: this.data.codeImg.split(',')
    })
  },
  add: function () {
    wx.navigateTo({
      url: '../editdata/editdata'
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    var stylistId = this.data.stylist.id
    var openId = wx.getStorageSync('openId')
    var phone = this.data.phone
    var that = this
    var item = new Object()
    item.openId = openId
    item.desc = array[index]
    item.oldStylistId = stylistId
    $wuxDialog.confirm({
      content: '我们已收到您的变更需求,将尽快为您匹配新人选.您也可以直接联系' + phone + ',由人工处理请求.',
      cancelText: '拨打',
      confirmText: '确定',
      onConfirm(e) {
        wx.request({
          url: util.requestUrl + 'stylist/changeStylist',
          method: 'POST',
          data: item
        })
      },
      onCancel(e) {
        wx.makePhoneCall({
          phoneNumber: phone,
        })
      },
    })
  },
  addorder: function () {
    var boxId = this.data.box.id
    wx.navigateTo({
      url: '../pay/pay?boxId=' + boxId
    })
  }
});