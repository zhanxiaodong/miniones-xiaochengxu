var util = require("../../utils/util.js")
Page({
    data: {
        inter: null,
        tempvalue: null,
        frontType: 'style',
        gender: true,
        checkboxItems: [
          { value: '时尚', show: true},
          { value: '休闲', show: true},
          { value: '卡通', show: true},
          { value: '运动', show: true},
          { value: '民族', show: true},
          { value: '优雅', show: true},
          { value: '其它', show: true},
          { value: '暂无', show: true},
        ]
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
      console.log(checkboxItems)
      this.setData({
        checkboxItems: checkboxItems,
        oldStyle: values
      });
      
    },
    /**
     * 添加自定义风格
     */
    addStyle: function (e) {
      var checkboxItems = this.data.checkboxItems
      var value = e.detail.value
      if (!value.trim()) {
        return
      }
      var cusO = new Object()
      cusO.value = e.detail.value
      cusO.show = true
      cusO.checked = true
      checkboxItems.push(cusO)
      var oldStyle = this.data.oldStyle
      if (!oldStyle) {
        oldStyle = new Array()
      }
      oldStyle.push(e.detail.value)
      this.setData({
        tempvalue: null,
        checkboxItems: checkboxItems,
        oldStyle: oldStyle
      })
    },
    next: function(){
        wx.navigateTo({
          url: '/pages/color/color?styleItems=' + this.checkboxItems
        })
    }
})