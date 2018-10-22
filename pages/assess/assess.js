
Page({

  /**
   * 页面的初始数据
   */
  /*data: {
    iconfontList:[
      { icon:"icon-xingxing"},
      { icon: "icon-xingxing" },
      { icon: "icon-xingxing" },
      { icon: "icon-xingxing" },
      { icon: "icon-xingxing" },

    ]
  
  },*/

  data: {
    icon: '/images/star.png',
    iconGreen: '/images/star-green.png',
    starFlag: null,
    selectedFavorites: [],
    starList: [
      {
        favorites: [
          { value: 1, name: '操作麻烦' },
          { value: 2, name: '服务不够' },
          { value: 3, name: '价格太高' },
          { value: 4, name: '搭配不力' },
          { value: 5, name: '品质不佳' },
          { value: 6, name: '没有惊喜' },
        ]
      },
      {
        favorites: [
          { value: 1, name: '操作麻烦' },
          { value: 2, name: '服务不够' },
          { value: 3, name: '价格太高' },
          { value: 4, name: '搭配不力' },
          { value: 5, name: '品质不佳' },
          { value: 6, name: '没有惊喜' },
        ]
      },
      {
        favorites: [
          { value: 1, name: '操作麻烦' },
          { value: 2, name: '服务不够' },
          { value: 3, name: '价格太高' },
          { value: 4, name: '搭配不力' },
          { value: 5, name: '品质不佳' },
          { value: 6, name: '没有惊喜' },
        ]
      },
      {
        favorites: [
          { value: 1, name: '比较省心' },
          { value: 2, name: '服务还行' },
          { value: 3, name: '价格还行' },
          { value: 4, name: '搭配还行' },
          { value: 5, name: '品质还行' },
          { value: 6, name: '较有惊喜' },
        ]
      },
      {
        favorites: [
          { value: 1, name: '省心' },
          { value: 2, name: '贴心' },
          { value: 3, name: '实惠' },
          { value: 4, name: '没搭' },
          { value: 5, name: '品质' },
          { value: 6, name: '惊喜' },
        
        ]
      }
    ]
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
    console.log('selectedFavorites', this.data.selectedFavorites.join(','))
  }  
})