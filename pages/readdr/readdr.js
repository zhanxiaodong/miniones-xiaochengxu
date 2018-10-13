var util = require("../../utils/util.js")
Page({
  data: {
    icon: '../../images/icons/edit.png',
    check:false,
    readdrList: null,
    radioItems: [
      { name: 'cell standard', value: '0' },
      { name: 'cell standard', value: '1', checked: true }
    ],
  },
  onLoad: function(options){
    var check = options.check
    if(check){
      this.setData({
        check: check
      })
    }
  },
  onShow:function(){
    this.getAddrList()
  },
  getAddrList:function(){
    var that = this
    var userId = wx.getStorageSync('userId')
    var openId = wx.getStorageSync('openId')
    wx.request({
      url: util.requestUrl + 'user/findAddressList?userId=' + userId + '&openId=' + openId,
      success:function(res){
        var addrList = res.data.data
        if (addrList != null && addrList.length > 0 ){
          that.setData({
            readdrList: res.data.data
          })
        }        
      }
    })
  },
  radioChange: function (e) {
    var readdrList = this.data.readdrList;
    var address
    for (var i = 0, len = readdrList.length; i < len; ++i) {
      var result = readdrList[i].id == e.detail.value
      readdrList[i].checked = result
      if(result){
        address = readdrList[i]
      }
    }

    this.setData({
      readdrList: readdrList
    });
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      address: address,
      selAddress: 'yes'
    });
    wx.navigateBack()
  },
  add: function (e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    wx.navigateTo({
      url: '../editaddr/editaddr',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },
  edit:function(event){
    var item = event.currentTarget.dataset.objectItem
    wx.navigateTo({
      url: '../editaddr/editaddr?item=' + JSON.stringify(item),
    })
  }
});