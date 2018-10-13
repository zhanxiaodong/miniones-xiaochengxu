Page({
  data: {
    radioItems: [
      {
        title: '任性推荐(1个月/次)',
        name: '童年不同样,天天穿新衣&每个月给您孩子准备一个定制搭配盒子.',
        value: '1'
      },
      {
        title: '标准推荐(2个月/次)',
        name: '工作太忙顾及不到孩子的穿着?交给我们&每2个月给您孩子准备一个定制搭配盒子.',
        value: '3'
      },
      {
        title: '节日推荐',
        name: '希望孩子有个快乐的节日?交给我们&每个重要的节日给您孩子准备一个定制的盒子.',
        value: '2'
      }]
  },

  next: function () {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
})