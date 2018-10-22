// pages/demo/demo.js
Page({

  data: {
    starFlag: 1,
    selectedFavorites: []
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
  }
})