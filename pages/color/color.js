Page({
    data: {
      colorAllItems: [
        { value: '接受全色系' },
        { value: '偏好高饱和度/高亮' },
        { value: '偏好饱和度/灰调' }
      ],
    },
    colorAllChange: function (e) {
      var value = e.detail.value
      this.updateColorAll(value)

      var index
      var colorItems = this.data.colorItems
      var colorAllItems = this.data.colorAllItems
      for (var i = 0; i < colorAllItems.length; ++i) {
        if (value == colorAllItems[i].value) {
          index = i
          break;
        }
      }


      if (index && index != 0) {
        var oldColor = new Array()
        for (var i = 0; i < colorItems.length; ++i) {
          if (i % 3 == index) {
            colorItems[i].checked = true
            oldColor.push(colorItems[i].value)
          } else {
            colorItems[i].checked = false
          }
        }
        this.setData({
          colorItems: colorItems,
          oldColor: oldColor
        })
      }
    },
    updateColorAll: function (value) {
      var colorAllItems = util.radioGroupChange(this.data.colorAllItems, value)
      this.setData({
        colorAllItems: colorAllItems,
        oldColorType: value
      })
    },
    colorChange: function (e) {
      this.updateColor(e.detail.value)
    },
    updateColor: function (values) {
      var colorItems = util.checkboxGroupChange(this.data.colorItems, values)
      this.setData({
        colorItems: colorItems,
        oldColor: values
      })
    },
    next: function () {
        wx.navigateTo({
            url:"/pages/attitude/attitude"
          })
    }
})