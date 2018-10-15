var util = require("../../utils/util.js")
Page({
  data: {
    season:[
      { id: 1, value: "春季" },
      { id: 2, value: "夏季" },
      { id: 3, value: "秋季" },
      { id: 4, value: "冬季" }
    ],
    occasions:[
      { id: 1, value: "日常（默认）", checked: false },
      { id: 2, value: "校园", check: false },
      { id: 3, value: "节日", check: false },
      { id: 4, value: "度假", check: false }
    ], 
    consumList: [
      { id: 1, value: "不变（默认）", checked: false},
      { id: 2, value: "接受更多尝试" }
    ],
    accepts: [
      { id: 1, value: "accept", checked: false},
    ]
  },

  onLoad: function (options) {
    var that = this
    var more
    if (options.more) {
      more = JSON.parse(options.more)
    }
    var season = that.data.season
    var occasions = that.data.occasions
    var consumList = that.data.consumList
    var accepts = that.data.accepts
    if (more) {
      season = util.checkboxGroupChange(season, more.season)
      occasions = util.checkboxGroupChange(occasions, more.occasions)
      consumList = util.radioGroupChange(consumList, more.consum)
      accepts = util.radioGroupChange(accepts, more.accepts)
    } else {
      more = new Object()
    }
    that.setData({
      season: season,
      occasions: occasions,
      more: more,
      consumList: consumList,
      accepts: accepts
    })
  },
  seasonChange: function (e) {
    var values = e.detail.value
    var season = util.checkboxGroupChange(this.data.season, values)
    var more = this.data.more
    more.season = values
    this.setData({
      season: season,
      more: more
    });
  },
  occasionsChange: function (e) {
    var values = e.detail.value
    var occasions = util.checkboxGroupChange(this.data.occasions, values)
    var more = this.data.more
    more.occasions = values
    this.setData({
      occasions: occasions,
      more: more
    });
  },
  radioChange: function (e) {
    var consumList = this.data.consumList;
    consumList = util.radioGroupChange(consumList, e.detail.value)
    var more = this.data.more
    more.consum = e.detail.value
    this.setData({
      consumList: consumList,
      more: more
    });
  },
  acceptChange: function (e) {
    var values = e.detail.value
    var accepts = util.checkboxGroupChange(this.data.accepts, values)
    var more = this.data.more
    more.accepts = values
    this.setData({
      accepts: accepts,
      more: more
    });
  },
  confirm: function () {
    var more = this.data.more
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      more: more
    });
    console.log(more)
    wx.navigateBack()
  }
})