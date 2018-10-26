// pages/awardexame/awardexame.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     awardImg: '/images/bd1.png',
     deadline: '2018-10-31 00:00截至',
     count: '998',
     awardList: [{
       index: '奖项一',
       detail: '仔细答题结束可以获得随机现金红包'
     },
     {
       index: '奖项二',
       detail: '每满1000份回答，现金红包翻倍一次'
     }]
  },

  clickTab: function () {
    wx.navigateTo({
      url: '../awardone/awardone',
    })
  }
})