Page({
    data: {
        checkboxItems: [
            { value: '安全', show: true},
            { value: '舒适'},
            { value: '个性'},
            { value: '实惠'},
            { value: '品牌'},
            { value: '好看'},
          ]
    },
    next:function(){
        wx.navigateTo({
            url: '/pages/paste/paste'
        })
    }
})