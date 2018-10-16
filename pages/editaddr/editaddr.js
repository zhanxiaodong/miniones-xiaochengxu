import WxValidate from '../../utils/WxValidate'
var util = require("../../utils/util.js")
import { $wuxDialog } from '../../components/wux'
Page({
  data: {
    name: '',
    form: {
      id: '',
      name: '',
      address: null,
      addressDetail: null,
      type: null,
      lat: null,
      lng: null,
      label: null,
      tel: null
    },
    labelItems: [
      { name: '家', value: '家' },
      { name: '老家', value: '老家' },
      { name: '公司', value: '公司' }
    ],
    roleItems: [
      { name: '先生', value: '先生' },
      { name: '女士', value: '女士' },
      { name: '小朋友', value: '小朋友' }
    ]
  },
  inputChange: function (e) {
    var filed = e.currentTarget.dataset.filed

    if (filed) {
      var up
      if (filed == 'name') {
        up = 'form.name'
      } else if (filed == 'tel') {
        up = 'form.tel'
      } else if (filed == 'addressDetail') {
        up = 'form.addressDetail'
      } else if (filed == 'address') {
        up = 'addressTemp'
      }
      if (up) {
        this.setData({
          [up]: e.detail.value
        })
      }
    }
  },
  chooseAddr: function (e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var that = this
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
        var form = that.data.form
        var labelItems = that.data.labelItems
        var roleItems = that.data.roleItems
        if (!form.type) {
          form.type = '先生'
          roleItems[0].checked = true
        }
        if (!form.label) {
          form.label = '家'
          labelItems[0].checked = true
        }
        form.name = res.userName
        form.tel = res.telNumber
        form.address = res.provinceName + res.cityName + res.countyName
        form.addressDetail = res.detailInfo
        form.status = 'ENABLE'
        form.province = res.provinceName
        form.city = res.cityName
        form.district = res.countyName
        form.adCode = res.postalCode
        form.cityCode = res.nationalCode
        that.setData({
          form: form,
          labelItems: labelItems,
          roleItems: roleItems
        })
      }
    })
  },
  /**
   * 选择地址
   */
  choose: function (e) {
    var that = this
    wx.getSetting({
      success: function(res){
        var authse = res.authSetting
        var auth = authse['scope.userLocation']
        console.log(authse['scope.userLocation'])
        if (!auth && auth != false){
          wx.authorize({
            scope: 'scope.userLocation',
            success: function(res){
              if (res.errMsg == "authorize:ok"){
                wx.chooseLocation({
                  success: function (res) {
                    var form = that.data.form
                    form.address = res.address
                    form.lng = res.longitude
                    form.lat = res.latitude
                    that.setData({
                      longitude: res.longitude,
                      latitude: res.latitude,
                      form: form
                    })
                  },
                })
              } else {
                $wuxDialog.alert({
                  content: '您未授权使用定位功能！'
                })
              }
            },
            fail(res){
              $wuxDialog.alert({
                content: '您未授权使用定位功能！'
              })
            }
          })
        }else if(!authse['scope.userLocation']){
          wx.openSetting({
            success: function(data){
              if(data.authSetting['scope.userLocation']){
                wx.chooseLocation({
                  success: function (res) {
                    var form = that.data.form
                    form.address = res.address
                    form.lng = res.longitude
                    form.lat = res.latitude
                    that.setData({
                      longitude: res.longitude,
                      latitude: res.latitude,
                      form: form
                    })
                  },
                })
              } else {
                $wuxDialog.alert({
                  content: '您未授权使用定位功能！'
                })
              }
            }
          })
        } else {
          wx.chooseLocation({
            success: function (res) {
              var form = that.data.form
              form.address = res.address
              form.lng = res.longitude
              form.lat = res.latitude
              that.setData({
                longitude: res.longitude,
                latitude: res.latitude,
                form: form
              })
            },
          })
        }
      }
    })
    
  },
  onLoad: function (options) {
    this.initValidate()
    if (options.item) {
      var item = JSON.parse(options.item)
      var labelItems = this.data.labelItems;
      var label = item.label
      for (var i = 0, len = labelItems.length; i < len; ++i) {
        labelItems[i].checked = labelItems[i].value == label;
      }
      var roleItems = this.data.roleItems;
      for (var i = 0, len = roleItems.length; i < len; ++i) {
        roleItems[i].checked = roleItems[i].value == item.type;
      }
      this.setData({
        form: item,
        labelItems: labelItems,
        roleItems: roleItems
      })
    }

  },
  /**
   * 标签选项
   */
  labelChange: function (e) {
    var labelItems = this.data.labelItems;
    for (var i = 0, len = labelItems.length; i < len; ++i) {
      labelItems[i].checked = labelItems[i].value == e.detail.value;
    }
    this.setData({
      labelItems: labelItems,
      'form.label': e.detail.value
    });
  },
  /**
   * 联系人身份
   */
  roleChange: function (e) {
    var roleItems = this.data.roleItems;
    for (var i = 0, len = roleItems.length; i < len; ++i) {
      roleItems[i].checked = roleItems[i].value == e.detail.value;
    }

    this.setData({
      roleItems: roleItems,
      'form.type': e.detail.value
    });
  },
  initValidate() {
    const rules = {
      name: {
        required: true
      },
      type: {
        required: true
      },
      tel: {
        required: true,
        tel: true
      },
      address: {
        required: true
      },
      addressDetail: {
        required: true
      },
      label: {
        required: true
      }
    }

    const messages = {
      name: {
        required: '名称不能为空'
      },
      type: {
        required: '联系人标签不能为空'
      },
      tel: {
        required: '电话不能为空'
      },
      address: {
        required: '地址不能为空'
      },
      addressDetail: {
        required: '详细地址不能为空'
      },
      label: {
        required: '标签不能为空'
      }
    }

    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)
  },
  showModal(error) {
    wx.showToast({
      title: error.msg,
      icon: 'success',
      duration: 1000
    });
  },
  submitForm: function (e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    const params = e.detail.value
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    if(!this.data.form.address ){
      var tempa = this.data.addressTemp
      if (!tempa){
        wx.showToast({
          title: '地址不能为空',
          icon: 'success',
          duration: 1000
        });
        return false
      } else {
        this.setData({
          'form.address': tempa
        })
      }
    }
    var form = this.data.form
    this.saveOrUpdate(form)
  },
  /**
   * 保存地址
   */
  saveOrUpdate: function (form) {
    var userId = wx.getStorageSync('userId')
    var openId = wx.getStorageSync('openId')
    form.userId = userId
    form.openId = openId
    form.lat = this.data.form.lat
    form.lng = this.data.form.lng
    var id = this.data.form.id.trim()
    var url = util.requestUrl + 'user/saveAddress'
    if (id) {
      url = util.requestUrl + 'user/updateAddress'
      form.id = id
    } else {
      form.id = null
    }
    wx.request({
      url: url,
      method: 'POST',
      data: form,
      success: function (res) {
        wx.navigateBack()
      }
    })

  },
  /**
   * 删除地址
   */
  del: function (event) {
    util.saveFormId(wx.getStorageSync('openId'), event.detail.formId)
    var id = event.currentTarget.dataset.id
    $wuxDialog.confirm({
      content: '确认删除地址?',
      cancelText: '取消',
      confirmText: '确认',
      onConfirm(e) {
        wx.request({
          url: util.requestUrl + 'user/deleteAddress?id=' + id,
          success: function () {
            wx.navigateBack()
          }
        })
      }
    })
  }
});