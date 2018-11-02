// pages/demo/demo.js
var util = require("../../utils/util.js")
var viplev = require('../../utils/viplev.js')

Page({
 /* onSelectFavorites(e) {
    this.data.selectedFavorites = e.detail.value
    console.log(e.detail.value)
  },

  onSelect(e) {
    var index = e.target.dataset.index
    this.setData({
      starFlag: Number(index)
    })
  },

  doPageToNext() {
    console.log('selectedFavorites', this.data.selectedFavorites)
    console.log('selectedFavorites', this.data.selectedFavorites.join(','))
  },

  hideModal: function (e) {
    this.setData(
      {
        showModalStatus: false
      }
    )
    //wx.setStorageSync('times', 1)
  },

  offClick: function () {
    this.setData({
      showModalStatus: false
    }) 
  },
  
  clickBox: function () {
    wx.redirectTo({
      url: '/pages/affirm/affirm',
    })
  }*/
  data: {
    text: "这是一条测试公告，看看效果怎么样，2019年3月23日",
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marquee_margin: 30,
    size: 14,
    interval: 20 // 时间间隔
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow: function () {
    var that = this;
    var length = that.data.text.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    //console.log(length,windowWidth);
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    that.scrolltxt();// 第一个字消失后立即从右边出现
  },

  scrolltxt: function () {
    var that = this;
    var length = that.data.length;//滚动文字的宽度
    var windowWidth = that.data.windowWidth;//屏幕宽度
    if (length > windowWidth) {
      var interval = setInterval(function () {
        var maxscrollwidth = length + that.data.marquee_margin;//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        }
        else {
          //console.log("替换");
          that.setData({
            marqueeDistance: 0 // 直接重新滚动
          });
          clearInterval(interval);
          that.scrolltxt();
        }
      }, that.data.interval);
    }
    else {
      that.setData({ marquee_margin: "1000" });//只显示一条不滚动右边间距加大，防止重复显示
    }
  }

})