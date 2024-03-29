var util = require("../../utils/util.js")
import { $wuxDialog } from '../../components/wux'
Page({
  data: {
    icon: '/images/star.png',
    iconGreen: '/images/star-green.png',
    starFlag: null,
    selectedFavorites: [],
    desc:null,
    feedbacks: [
      { id: 1, value: "我非常乐意继续体验衣盒服务", desc: "我们将为您提供更佳服务", checked: 'true'  },
      { id: 2, value: "我会考虑继续体验衣盒服务", desc: "我们将尝试再次为您提供服务"},
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
    console.log(options)
    if (options.boxId) {
      this.setData({
        boxId: options.boxId
      })
    }
    this.findBoxEvaByBoxId()
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
      starFlag: Number(index),
      selectedFavorites:[]
    })
  },
  bindRemarks: function (e) {
    var desc = e.detail.value
    this.setData({
      desc: desc
    })
  },
  /**
   * 提交评价
   */
  saveEva: function () {
    var evaluate = new Object()
    evaluate.id = this.data.id
    evaluate.openId = wx.getStorageSync('openId')
    evaluate.boxId = this.data.boxId
    evaluate.evalLabel = this.data.selectedFavorites
    evaluate.feedback = this.data.feedback 
    evaluate.rec = this.data.starFlag
    evaluate.desc = this.data.desc
    wx.request({
      url: util.requestUrl + 'box/saveBoxEva',
      method: 'POST',
      data: evaluate,
      success: function (res) {
        wx.showToast({
          title: '评价成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.reLaunch({
            url: '../index/index',
          })
        },2000)
      }
    })
  },
  findBoxEvaByBoxId() {
    // 5c2f27ac6c88376b51f14d97
    var boxId = this.data.boxId
    var that = this
    wx.request({
      url: util.requestUrl + 'box/findBoxEvaByBoxId?boxId=' + boxId,
      success: function (res) {
        var reault = res.data.data
        if (reault) {
          that.setData({
            id: reault.id
          })
        }
      }
    })
  },
})