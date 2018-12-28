var util = require("../../utils/util.js")
Page({
  data: {
    frontType: 'character',
    gender: true,
    skinColors: [
      { value: '白皙' },
      { value: '正常' },
      { value: '麦色' },
      { value: '黝黑' }
    ],
    bodyTypes: [
      { value: '纤瘦' },
      { value: '正常' },
      { value: '偏胖' },
      { value: '肥胖' }
    ],
    checkboxItems: [
      { value: '活泼', show: true },
      { value: '腼腆', show: true },
      { value: '搞怪', show: true },
      { value: '甜美', show: true },
      { value: '可爱', show: true },
      { value: '高冷', show: true },
      { value: '文艺', show: true },
      { value: '熊孩子', show: true },
    ]
  },
  onLoad: function (options) {
    var that = this
    var editBaby = wx.getStorageSync('editBaby')
    var id = editBaby.id
    that.setData({
      id: id
    })
    wx.request({
      url: util.requestUrl + 'baby/findBabyById?id=' + id,
      success: function (res) {
        var result = res.data.data
        var oldCharacter = result.character
        if (oldCharacter) {
          that.initCharacter(oldCharacter)
        }
      }
    })
  },
  initCharacter: function (oldCharacter) {
    var checkboxItems = this.data.checkboxItems
    var cusArr = new Array()
    for (var i = 0; i < oldCharacter.length; ++i) {
      var value = oldCharacter[i]
      var hasV = false
      for (var j = 0; j < checkboxItems.length; ++j) {
        if (checkboxItems[j].value == value) {
          hasV = true
          checkboxItems[j].show = true
          checkboxItems[j].checked = true;
          break;
        }
      }
      if (!hasV) {
        var temO = new Object()
        temO.value = value
        temO.show = true
        temO.checked = true;
        checkboxItems.push(temO)
      }
    }
    this.setData({
      checkboxItems: checkboxItems,
      oldCharacter: oldCharacter
    })
  },
  checkboxChange: function (e) {
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems,
      oldCharacter: values
    });
  },
  next: function () {
    this.updateBaby()
    wx.navigateTo({
      url: '/pages/style/style'
    })
  },
  updateBaby: function () {
    var oldCharacter = this.data.oldCharacter
    if (oldCharacter) {
      var item = new Object()
      item.id = this.data.id
      item.character = oldCharacter
      wx.request({
        url: util.requestUrl + 'baby/updateBaby',
        method: 'POST',
        data: item
      })
    }
  }
})