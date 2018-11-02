// pages/demo/demo.js
var util = require("../../utils/util.js")
var viplev = require('../../utils/viplev.js')

/*Page({

  data: {
    showModalStatus: 'false'
  },

  onSelectFavorites(e) {
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
  }
})*/

Page({
  onClick() {
    wx.showModal({
      title: 'Thank you for your support!',
      showCancel: !1,
    })
  },
})