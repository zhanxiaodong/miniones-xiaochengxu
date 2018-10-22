var util = require("../../utils/util.js")
import { $wuxDialog } from '../../components/wux'
Page({
  data: {
    icon: '/images/star.png',
    iconGreen: '/images/star-green.png',
    starFlag: null,
    selectedFavorites: [],
    feedbacks: [
      { id: 1, value: "我非常乐意继续体验衣盒服务", desc: "我们将为您提供更佳服务" },
      { id: 2, value: "我会考虑继续体验衣盒服务", desc:"我们将尝试再次为您提供服务" },
      { id: 3, value: "我不会继续体验衣盒服务", desc:"我们将不会再次打扰您" }
    ], 
    starList: [
      {
        favorites: [
          { value: '操作麻烦', name: '操作麻烦' },
          { value: '服务不够', name: '服务不够' },
          { value: '价格太高', name: '价格太高' },
          { value: '搭配不力', name: '搭配不力' },
          { value: '品质不佳', name: '品质不佳' },
          { value: '没有惊喜', name: '没有惊喜' },
        ]
      },
      {
        favorites: [
          { value: '操作麻烦', name: '操作麻烦' },
          { value: '服务不够', name: '服务不够' },
          { value: '价格太高', name: '价格太高' },
          { value: '搭配不力', name: '搭配不力' },
          { value: '品质不佳', name: '品质不佳' },
          { value: '没有惊喜', name: '没有惊喜' },
        ]
      },
      {
        favorites: [
          { value: '操作麻烦', name: '操作麻烦' },
          { value: '服务不够', name: '服务不够' },
          { value: '价格太高', name: '价格太高' },
          { value: '搭配不力', name: '搭配不力' },
          { value: '品质不佳', name: '品质不佳' },
          { value: '没有惊喜', name: '没有惊喜' },
        ]
      },
      {
        favorites: [
          { value: '比较省心', name: '比较省心' },
          { value: '服务还行', name: '服务还行' },
          { value: '价格还行', name: '价格还行' },
          { value: '搭配还行', name: '搭配还行' },
          { value: '品质还行', name: '品质还行' },
          { value: '较有惊喜', name: '较有惊喜' },
        ]
      },
      {
        favorites: [
          { value: '省心', name: '省心' },
          { value: '贴心', name: '贴心' },
          { value: '实惠', name: '实惠' },
          { value: '没搭', name: '没搭' },
          { value: '品质', name: '品质' },
          { value: '惊喜', name: '惊喜' },
        
        ]
      }
    ]
  },
  onLoad: function(options) {
    options.boxId = '5bcd798f9d6128511f4cbba8'
    if (options.allSelect) {
      this.setData({
        allSelect: options.allSelect
      }) 
    }
    if (options.boxId) {
      this.setData({
        boxId: options.boxId
      })
    }
  }, 
  feedbackChange: function (e) {
    var values = e.detail.value
    var feedbacks = util.radioGroupChange(this.data.feedbacks, values)
    this.setData({
      feedbacks: feedbacks,
      feedback: values
    });
  },
  onSelectFavorites(e) {
    // 收集数据
    this.data.selectedFavorites =  e.detail.value
    // ui 显示逻辑
    var index = e.target.dataset.index1
    var star = this.data.starList[index]
    var favorites = star.favorites
    for (let i = 0; i < favorites.length; i++ ) {
      let favor = favorites[i];
      if (e.detail.value.includes(String(favor.value)) ) {
        favorites[i].checked = true
      } else {
        favorites[i].checked = false
      }
    }
    this.setData({
      ['starList[' + index + ']']: star
    })
  },

  onSelect(e) {
    var index = e.target.dataset.index
    this.setData({
      starFlag: Number(index)
    })
  },
  doPageToNext() {
    console.log('selectedFavorites', this.data.selectedFavorites)
    console.log(this.data.feedback)
    console.log('selectedFavorites', this.data.selectedFavorites.join(','))
  },
  /**
   * 提交评价
   */
  saveEva: function () {
    var evaluate = new Object()
    evaluate.openId = wx.getStorageSync('openId')
    evaluate.boxId = this.data.boxId
    evaluate.evalLabel = this.data.selectedFavorites
    evaluate.feedback = this.data.feedback 
    var that = this
    wx.request({
      url: util.requestUrl + 'box/saveBoxEva',
      method: 'POST',
      data: evaluate,
      success: function (res) {
        $wuxDialog.alert({
          content: '订单完成, 感谢您的合作,希望您对本次服务满意！',
          onConfirm(e) {
            wx.reLaunch({
              url: '../index/index',
            })
          }
        })
      }
    })
  },
})