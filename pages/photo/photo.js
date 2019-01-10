var util = require("../../utils/util.js")
const uploadImage = require('../../utils/uploadoss.js');
Page({
  data: {
    id: '',
    uploadImgTemp: '/images/photo.png',
    isUpload: false
  },
  onLoad: function(options) {
    var that = this
    var editBaby = wx.getStorageSync('editBaby')
    
    var uploadImgTemp = editBaby.bodyPic ? editBaby.bodyPic : '/images/photo.png'
    var id = editBaby.id
    var inter = editBaby.inter
    if (uploadImgTemp && id) {
      that.setData({
        uploadImgTemp: uploadImgTemp,
        uploadImg: uploadImgTemp,
        id: id,
        inter: inter
      })
    }
  },
  uploadImg: function() {
    var id = this.data.id
    var item = new Object()
    if (id) {
      item.id = id
      item.study = this.data.form.study
      wx.request({
        url: util.requestUrl + 'baby/updateBaby',
        method: 'POST',
        data: item
      })
    }
    this.setData({
      imgshow: true
    })

  },
  next: function() {
    this.updateStep()
    var bodyPic = this.data.uploadImg
    if (bodyPic) {
      var item = new Object()
      item.id = this.data.id
      item.bodyPic = bodyPic
      wx.request({
        url: util.requestUrl + 'baby/updateBaby',
        method: 'POST',
        data: item
      })
    }
    var inter = this.data.inter
    if (inter == 'add') {
      let pages = getCurrentPages(); //当前页面
      let prevPage = pages[pages.length - 2]; //上一页面
      wx.navigateBack({
        delta: 5
      })
    } else {
      wx.navigateTo({
        url: '/pages/create/create'
      })
    }
  },
  updateStep: function () {
    var item = new Object()
    item.wechatOpenId = wx.getStorageSync('openId')
    item.step = 10
    var lev = wx.getStorageSync('level')
    if (lev < 20) {
      wx.setStorageSync('level', '20')
      wx.request({
        url: util.requestUrl + 'user/updateStep',
        method: 'POST',
        data: item
      })
    }
  },
  getImage: function() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var filePath = res.tempFilePaths
        that.setData({
          uploadImgTemp: filePath[0]
        })
        var fileName = uploadImage({
          filePath: filePath[0],
          dir: "minianys/"
        })
        if (fileName) {
          fileName = 'https://oss.miniones.cn/minianys/' + fileName
          that.setData({
            uploadImg: fileName,
            isUpload: true
          })
        }

      }
    })
  },
  imageLoad: function(e) {
    var imageSize = util.imageUtil(e, 120, 120)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  save: function() {
    var fileName = this.data.uploadImg
    if (!fileName) {
      this.showModal('请上传图片')
    } else {
      var item = new Object()
      item.id = this.data.form.id
      item.bodyPic = this.data.uploadImg
      wx.request({
        url: util.requestUrl + 'baby/updateBaby',
        method: 'POST',
        data: item,
        success: function() {
          wx.navigateBack()
        }
      })
    }
  },
})