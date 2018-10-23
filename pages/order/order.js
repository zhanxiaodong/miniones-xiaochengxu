// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["完成订单","正在服务"],
    activeIndex: 0,
    successOrder: [
      {
        successTitle:'服务已完成',
        time: "2018-12-12 11:11:11",
        woman: 'c.c',
        evaluateStatus: '已评价',
        price: '380.00',
      },
      {
        successTitle:'服务已完成',
        time: "2018-12-12 11:11:11",
        woman: 'c.c',
        evaluateStatus: '已评价',
        price: '380.00',
      },
    ],
    serveOrder: [
      {
      serveStatus:'正在服务',
      serveTime: "2018-12-12 11:11:11",
      woman: 'd.d',
      evaluateStatus:'已评价',
      payStatus: '未支付',
      price: '330',
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  edit: function (event) {
    util.saveFormId(wx.getStorageSync('openId'), event.detail.formId)
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../order/order?inter=edit&id=' + id
    })
  },
  orderDetail: function () {
    wx.navigateTo({
      url: '../orderdetail/orderdetail'
    })
  }
})