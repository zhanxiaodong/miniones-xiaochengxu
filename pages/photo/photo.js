var util = require("../../utils/util.js")
const uploadImage = require('../../utils/uploadoss.js');
Page({
  data: {
    id: '',
    inter:'',
    isUpload: false
  },
  onLoad: function(options) {
    var that = this
    var uploadImgTemp = options.uploadImgTemp
    var id = options.id
    var inter = options.inter
    if (inter) {
      that.setData({
        inter: inter
      })
    }
    if (options.uploadImgTemp && id) {
      that.setData({
        uploadImgTemp: uploadImgTemp,
        uploadImg: uploadImgTemp,
        id: id
      })
      // that.imageLoad(result.bodyPic,120,120)
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
    var id = this.data.id
    wx.navigateTo({
      url: '/pages/character/character?id=' + id + '&inter=' + inter,
    })
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