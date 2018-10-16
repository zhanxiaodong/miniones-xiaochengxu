import WxValidate from '../../utils/WxValidate'
var util = require("../../utils/util.js")
const uploadImage = require('../../utils/uploadoss.js');
Page({
  inter: null,
  imgshow: false,
  data: {
    heightNum: 0,
    date: "yyyy-mm-dd",
    uploadImgTemp: '/images/photo.png',
    sexItems: [
      { value: '男孩' },
      { value: '女孩' }
    ],
    form: {
      call: '',
      birth: '',
      height: '',
      weight: '',
      size: '',
      skinColor: ''
    },
    heights: [
      '不确定', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140'
    ],
    weights: [
      '不确定', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '34', '36', '38', '40', '40+'
    ],
    sizes: [
      '不确定', '16', '18', '20', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '35+'
    ],
    skinColors: ['不确定', '白皙', '正常', '偏黑'],
  },
  onLoad: function (options) {
    this.initValidate()
    var inter = options.inter
    var id = options.id
    if (inter) {
      this.setData({
        inter: inter,
        checkOrEdit: true
      })
    }
    var step = options.step
    if (step) {
      this.setData({
        step: step
      })
    }
    //id不为空,需要获取到宝贝的详情
    var that = this
    if (id) {
      wx.request({
        url: util.requestUrl + 'baby/findBabyById?id=' + id,
        success: function (res) {
          var result = res.data.data
          if (!result.birth) {
            result.birth = util.getToday(new Date())
          }
          var sexItems = util.radioGroupChange(that.data.sexItems, result.gender)
          var heightNum = 0
          if (result.height && result.height != '不确定') {
            heightNum = result.height - 49
          }
          that.setData({
            heightNum: heightNum,
            form: result,
            date: result.birth,
            sexItems: sexItems
          })
          if (result.bodyPic) {
            that.setData({
              uploadImgTemp: result.bodyPic,
              uploadImg: result.bodyPic
            })
            // that.imageLoad(result.bodyPic,120,120)
          }
        }
      })
    }
    that.updateHeight()
  },
  updateHeight: function (e) {
    var heights = new Array()
    heights.push("不确定")
    for (var i = 50; i < 141; i++) {
      heights.push(i)
    }
    this.setData({
      heights: heights
    })
  },
  radioChange: function (e) {
    var radioItems = this.data.sexItems;
    var value = e.detail.value
    radioItems = util.radioGroupChange(radioItems, value)
    var gender = 'form.gender'
    this.setData({
      sexItems: radioItems,
      [gender]: value
    })
  },
  showModal(error) {
    wx.showToast({
      title: error,
      icon: 'success',
      duration: 1000
    });
  },
  bindDateChange: function (e) {
    var filed = e.currentTarget.dataset.filed
    var up = 'form.' + filed
    var value = e.detail.value
    if (filed != 'birth') {
      switch (filed) {
        case 'height':
          value = this.data.heights[value]
          break;
        case 'weight':
          value = this.data.weights[value]
          break;
        case 'size':
          value = this.data.sizes[value]
          break;
        case 'skinColor':
          value = this.data.skinColors[value]
          break;
      }
    }
    this.setData({
      [up]: value
    })
  },
  back: function () {
    wx.navigateBack()
  },
  submitForm: function (e) {
    const params = e.detail.value
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error.msg)
      return false
    }
    var url = util.requestUrl + 'baby/saveBaby'
    if (this.data.form.id) {
      url = util.requestUrl + 'baby/updateBaby'
      params.id = this.data.form.id
    }

    params.gender = this.data.form.gender
    var that = this
    params.openId = wx.getStorageSync('openId')
    wx.request({
      url: url,
      method: 'POST',
      data: params,
      success: function (res) {
        if (!that.data.form.id) {
          var form = res.data.data
          console.log(res.data.data)
          console.log(form)
          that.setData({
            form: form
          })
        }
        wx.navigateTo({
          url: '/pages/photo/photo?uploadImgTemp=' + that.uploadImgTemp + '&id=' + that.data.form.id
        })
      }
    })
  },
  initValidate() {
    const rules = {
      call: {
        required: true
      },
      gender: {
        required: true
      },
      height: {
        required: true
      },
      weight: {
        required: true
      },
      size: {
        required: true
      },
      skinColor: {
        required: true
      }
      /**,
      feature: {
        required: true
      }*/
    }

    const messages = {
      call: {
        required: '称呼不能为空'
      },
      gender: {
        required: '性别不能为空'
      },
      birth: {
        required: '生日不能为空'
      },
      height: {
        required: '身高不能为空'
      },
      weight: {
        required: '体重不能为空'
      },
      size: {
        required: '鞋码不能为空'
      },
      skinColor: {
        required: '肤色不能为空'
      }
    }

    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)
  },
})