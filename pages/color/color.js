var util = require("../../utils/util.js")
Page({
  data: {
    colorAllItems: [
      { value: '素雅灰色系' },
      { value: '活跃亮色系' },
      { value: '接受合理搭配的任何色系' }
    ],
    checkboxItems: [
      { value: '安全', show: true },
      { value: '舒适', show: true },
      { value: '个性', show: true },
      { value: '实惠', show: true },
      { value: '品牌', show: true },
      { value: '好看', show: true },
    ],
    pasteAllItems: [{
      value: '节制',
      math: '99-199/套'
    },
    {
      value: '正常',
      math: '199-399/套'
    },
    {
      value: '小资',
      math: '299-499/套'
    },
    {
      value: '轻奢',
      math: '800+/套'
    },
    ],
    frequencyAllItems: [
      { value: '每月' },
      { value: '每两月' },
      { value: '每季度' },
      { value: '其他' }
    ],
  },
  onLoad: function (options) {
    var that = this
    var editBaby = wx.getStorageSync('editBaby')
    var id = editBaby.id ? editBaby.id : "5c1c5dc2696ed90e70a8766a"
    that.setData({
      id: id
    })
    wx.request({
      url: util.requestUrl + 'baby/findBabyById?id=' + id,
      success: function (res) {
        var result = res.data.data
        if (result){
          var oldColorType = result.colorType
          var attitude = result.attitude
          var consumDesc = result.consumDesc
          var frequency = result.frequency
          if (oldColorType) {
            that.updateColorAll(oldColorType)
          }
          if (attitude) {
            that.initAttitude(attitude)
          }
          if (consumDesc) {
            that.updatePasteAll(consumDesc)
          }
          if (frequency) {
            that.updateFrequencyAll(frequency)
          }
        }
      }
    })
  },
  colorAllChange: function (e) {
    var value = e.detail.value
    this.updateColorAll(value)
    var index
    var colorAllItems = this.data.colorAllItems
    for (var i = 0; i < colorAllItems.length; ++i) {
      if (value == colorAllItems[i].value) {
        index = i
        break;
      }
    }
    this.setData({
      colorAllItems: colorAllItems
    })
  },
  updateColorAll: function (value) {
    var colorAllItems = util.radioGroupChange(this.data.colorAllItems, value)
    this.setData({
      colorAllItems: colorAllItems,
      oldColorType: value
    })
  },

  initAttitude: function (attitude) {
    var checkboxItems = this.data.checkboxItems
    var cusArr = new Array()
    for (var i = 0; i < attitude.length; ++i) {
      var value = attitude[i]
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
      attitude: attitude
    })
  },
  checkboxChange: function (e) {
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    if (values.length > 2) {
      values = values.slice(1)
    }
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
      attitude: values
    });
  },

  pasteAllChange: function (e) {
    var value = e.detail.value
    this.data.consumDesc = value
    this.updatePasteAll(value)
    var index
    var pasteAllItems = this.data.pasteAllItems
    for (var i = 0; i < pasteAllItems.length; ++i) {
      if (value == pasteAllItems[i].value) {
        index = i
        break;
      }
    }
    this.setData({
      pasteAllItems: pasteAllItems
    })
  },
  updatePasteAll: function (value) {
    console.log(value)
    var pasteAllItems = util.radioGroupChange(this.data.pasteAllItems, value.split(' ')[0])
    console.log(pasteAllItems)
    this.setData({
      pasteAllItems: pasteAllItems,
      consumDesc: value
    })
  },

  frequencyAllChange: function (e) {
    var value = e.detail.value
    this.updateFrequencyAll(value)
    var index
    var frequencyAllItems = this.data.frequencyAllItems
    for (var i = 0; i < frequencyAllItems.length; ++i) {
      if (value == frequencyAllItems[i].value) {
        index = i
        break;
      }
    }
    this.setData({
      frequencyAllItems: frequencyAllItems
    })
  },
  updateFrequencyAll: function (value) {
    var frequencyAllItems = util.radioGroupChange(this.data.frequencyAllItems, value)
    this.setData({
      frequencyAllItems: frequencyAllItems,
      frequency: value
    })
  },

  next: function () {
    this.updateBaby()
    wx.navigateTo({
      url: "/pages/attitude/attitude"
      })
  },
  updateBaby: function () {
    var oldColorType = this.data.oldColorType
    var attitude = this.data.attitude
    var consumDesc = this.data.consumDesc
    var frequency = this.data.frequency
    var item = new Object()
    item.id = this.data.id
    item.colorType = oldColorType
    item.frequency = frequency
    item.attitude = attitude
    item.consumDesc = consumDesc
    wx.request({
      url: util.requestUrl + 'baby/updateBaby',
      method: 'POST',
      data: item
    })
  }
})