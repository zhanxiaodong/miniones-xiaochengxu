Page({
    data: {
        pasteAllItems: [
            { value: '节制', math: '￥50-100/套'},
            { value: '正常', math: '￥100-300/套'},
            { value: '小资', math: '￥300-500/套' },
            { value: '轻奢', math: '￥500+/套'},
          ],
    },
    /*pasteAllChange: function (e) {
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
        }*/
    next:function(){
        wx.navigateTo({
            url: '/pages/plan/plan'
        })
    }
})