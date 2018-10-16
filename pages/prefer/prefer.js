var util = require("../../utils/util.js")
Page({
  data: {
    inter: null,
    tempvalue: null,
    frontType: 'style',
    gender: true,
    checkboxItems: [
      { value: '时尚+', show: true },
      { value: '优雅' },
      { value: '美式' },
      { value: '轻奢' },
      { value: '前卫' },
      { value: '休闲+', show: true },
      { value: '居家' },
      { value: '运动休闲' },
      { value: '宽松' },
      { value: '民族+', show: true },
      { value: '复古' },
      { value: '棉麻' },
      { value: '森系' },
      { value: '田园+', show: true },
      { value: '碎花' },
      { value: '小方格' },
      { value: '细条纹' },
      { value: '学院+', show: true },
      { value: '英伦' },
      { value: '精致' },
      { value: '修身' },
      { value: '卡通+', show: true },
      { value: '卡通形象' },
      { value: '图形' },
      { value: '色彩' }
    ],
    colorItems: [
      {
        value: '白色',
        color: '#ffffff'
      },
      {
        value: '黑色',
        color: '#000000'
      },
      {
        value: '灰色',
        color: '#C2C8CC'
      },
      {
        value: '藏青',
        color: '#293460'
      },
      {
        value: '亮蓝',
        color: '#4F6DA0'
      },
      {
        value: '灰蓝',
        color: '#97B0CF'
      },
      {
        value: '酒红',
        color: '#CC3333'
      },
      {
        value: '大红',
        color: '#FF3333'
      },
      {
        value: '浅粉',
        color: '#FF9999'
      },
      {
        value: '紫色',
        color: '#615584'
      },
      {
        value: '亮紫',
        color: '#7652DE'
      },
      {
        value: '浅紫',
        color: '#C7BAEF'
      },
      {
        value: '橘色',
        color: '#FF7800'
      },
      {
        value: '亮桔',
        color: '#FF641D'
      },
      {
        value: '卡其',
        color: '#E4B88B'
      },
      {
        value: '黄色',
        color: '#FFDC51'
      },
      {
        value: '明黄',
        color: '#FFFF00'
      },
      {
        value: '米黄',
        color: '#F9F0C5'
      },
      {
        value: '青绿',
        color: '#009999'
      },
      {
        value: '草绿',
        color: '#00CC99'
      },
      {
        value: '嫩绿',
        color: '#97EED9'
      }
    ],
    boyDetail: [
      {
        value: '拼接'
      },
      {
        value: '连帽'
      },
      {
        value: '柳丁'
      },
      {
        value: 'logo'
      },
      {
        value: 'v领'
      },
      {
        value: '圆领'
      },
      {
        value: 'polo领'
      },
      {
        value: '小脚'
      },
      {
        value: '喇叭'
      },
      {
        value: '流苏'
      },
      {
        value: '蕾丝'
      },
      {
        value: '彼得潘领'
      },
      {
        value: '印花'
      },
      {
        value: '刺绣'
      },
      {
        value: '镂空'
      },
      {
        value: '荷叶边'
      }
    ],
    girlDetail: [
      {
        value: '拼接'
      },
      {
        value: '连帽'
      },
      {
        value: '柳丁'
      },
      {
        value: '金属'
      },
      {
        value: 'logo'
      },
      {
        value: '条纹'
      },
      {
        value: '格子'
      },
      {
        value: 'v领'
      },
      {
        value: '圆领'
      },
      {
        value: 'polo领'
      },
      {
        value: '小脚'
      },
      {
        value: '喇叭'
      },
      {
        value: '背带'
      }
    ],
    colorAllItems: [
      { value: '接受全色系'},
      { value: '偏好高饱和度/高亮'},
      { value: '偏好饱和度/灰调' }
    ]
  },
  colorAllChange: function (e) {
    var value = e.detail.value
    this.updateColorAll(value)

    var index
    var colorItems = this.data.colorItems
    var colorAllItems = this.data.colorAllItems
    for (var i = 0; i < colorAllItems.length;++i ){
      if (value == colorAllItems[i].value){
        index = i
        break;
      }
    }
    
  
    if (index && index != 0) {
      var oldColor = new Array()
      for (var i = 0; i < colorItems.length; ++i) {
        if (i % 3 == index) {
          colorItems[i].checked = true
          oldColor.push(colorItems[i].value)
        } else {
          colorItems[i].checked = false
        }
      }
      this.setData({
        colorItems: colorItems,
        oldColor: oldColor
      })
    }
  },
  updateColorAll:function(value){
    var colorAllItems = util.radioGroupChange(this.data.colorAllItems, value)
    this.setData({
      colorAllItems: colorAllItems,
      oldColorType: value
    })
  },
  colorChange: function (e) {
    this.updateColor(e.detail.value)
  },
  updateColor:function(values){
    var colorItems = util.checkboxGroupChange(this.data.colorItems, values)
    this.setData({
      colorItems: colorItems,
      oldColor: values
    })
  },
  girlChange: function (e) {
    this.updateGirl(e.detail.value)
  },
  updateGirl: function (values) {
    var girlDetail = util.checkboxGroupChange(this.data.girlDetail, values)
    this.setData({
      girlDetail: girlDetail,
      oldGirl: values
    })
  },
  boyChange: function (e) {
      this.updateBoy(e.detail.value)
  },
  updateBoy:function(values){
    var boyDetail = util.checkboxGroupChange(this.data.boyDetail, values)
    this.setData({
      boyDetail: boyDetail,
      oldBoy: values
    })
  },
  checkboxChange: function (e) {
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    checkboxItems = this.updateItems(checkboxItems, values);
    this.setData({
      checkboxItems: checkboxItems,
      oldStyle: values
    });
  },
  onLoad: function (options) {
    var inter = options.inter
    this.updateInfo()
    if (inter) {
      this.setData({
        inter: inter
      })
    }
    var frontType = options.frontType
    if(frontType){
      this.setData({
        frontType: frontType
      })
    }
  },
  updateInfo: function(){
    var openId = wx.getStorageSync('openId')
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findUserByOpenId?openId=' + openId,
      success:function(res){
        var result = res.data.data
        var oldStyle = result.style
        if(oldStyle){
          that.initStyle(oldStyle)
        }
        var oldColor = result.color
        if(oldColor){
          that.updateColor(oldColor)
        }
        var oldColorType = result.colorType
        if (!oldColorType){
          oldColorType = '接受全色系'
        }
        that.updateColorAll(oldColorType)
        var boyDetail = result.boyDetail
        if(boyDetail){
          that.updateBoy(boyDetail)
        }
        var girlDetail = result.girlDetail
        if (girlDetail) {
          that.updateGirl(girlDetail)
        }
      }
    })

  },
  initStyle: function(oldStyle){
    var checkboxItems = this.data.checkboxItems
    var cusArr = new Array()
    for(var i=0; i < oldStyle.length; ++i){
      var value = oldStyle[i]
      var hasV = false
      for(var j = 0; j < checkboxItems.length; ++j){
        if(checkboxItems[j].value == value){
          hasV = true
          checkboxItems[j].show = true
          checkboxItems[j].checked = true;
          break;
        }
      }
      if (!hasV){
        var temO = new Object()
        temO.value = value
        temO.show = true
        temO.checked = true;
        checkboxItems.push(temO)
      }
    }
    this.setData({
      checkboxItems: checkboxItems,
      oldStyle: oldStyle
    })
  },
  updateItems: function (checkboxItems, values){
    for (var h = 0; h < values.length; ++h) {
      if (values[h] == '时尚+') {
        checkboxItems[1].show = true
        checkboxItems[2].show = true
        checkboxItems[3].show = true
        checkboxItems[4].show = true
      } else if (values[h] == '休闲+') {
        checkboxItems[6].show = true
        checkboxItems[7].show = true
        checkboxItems[8].show = true
      } else if (values[h] == '民族+') {
        checkboxItems[10].show = true
        checkboxItems[11].show = true
        checkboxItems[12].show = true
      } else if (values[h] == '田园+') {
        checkboxItems[14].show = true
        checkboxItems[15].show = true
        checkboxItems[16].show = true
      } else if (values[h] == '学院+') {
        checkboxItems[18].show = true
        checkboxItems[19].show = true
        checkboxItems[20].show = true
      } else if (values[h] == '卡通+') {
        checkboxItems[22].show = true
        checkboxItems[23].show = true
        checkboxItems[24].show = true
      }
    }
    return checkboxItems
  },
  /**
   * 添加自定义风格
   */
  addStyle: function (e) {
    var checkboxItems = this.data.checkboxItems
    var value = e.detail.value
    if(!value.trim()){
      return
    }
    var cusO = new Object()
    cusO.value = e.detail.value
    cusO.show = true
    cusO.checked = true
    checkboxItems.push(cusO)
    var oldStyle = this.data.oldStyle
    if (!oldStyle){
      oldStyle = new Array()
    }
    oldStyle.push(e.detail.value)
    this.setData({
      tempvalue: null,
      checkboxItems: checkboxItems,
      oldStyle: oldStyle
    })
  },
  adddetail: function (e) {
    var gender = this.data.gender
    var value = e.detail.value
    if (!value.trim()) {
      return
    }
    var cusO = new Object()
    cusO.value = e.detail.value
    cusO.checked = true
    var checkboxItems
    if (gender) {
      checkboxItems = this.data.boyDetail
      checkboxItems.push(cusO)
      var oldBoy = this.data.oldBoy
      if(!oldBoy){
        oldBoy = new Array()
      }
      oldBoy.push(e.detail.value)
      this.setData({
        tempvalue: null,
        boyDetail: checkboxItems,
        oldBoy: oldBoy
      })
    } else {
      checkboxItems = this.data.girlDetail
      checkboxItems.push(cusO)
      var oldGirl = this.data.oldGirl
      if (!oldGirl) {
        oldGirl = new Array()
      }
      oldGirl.push(e.detail.value)
      this.setData({
        tempvalue: null,
        girlDetail: checkboxItems,
        oldGirl: oldGirl
      })
    }


  },
  next: function (e) {
    var inter = this.data.inter
    var frontType = e.currentTarget.dataset.fronttype
    var method = e.currentTarget.dataset.method
    if(method == 'jump'){
      switch (frontType) {
        case 'color':
          frontType = 'style'
          break;
        case 'detail':
          frontType = 'color'
          break;
      }
    } else if (method == 'next'){
      this.genItem(frontType)
      switch (frontType) {
        case 'style':
          
          frontType = 'color'
          wx.setNavigationBarTitle({
            title: '色彩偏好',
          })
          this.updateStepSett(frontType)
          this.updateStep()
          break;
        case 'color':
          frontType = 'detail'
          wx.setNavigationBarTitle({
            title: '细节',
          })
          this.updateStepSett(frontType)
          break;
        case 'detail':
          var url = '../except/except'
          if (inter) {
            url = url + '?inter=' + inter
          }
          this.updateStepSett('except')
          wx.redirectTo({
            url: url
          })
          break;
      }
    } else {
      this.genItem(frontType)
      wx.navigateBack()
    }
    
    this.setData({
      frontType: frontType
    })
    /**wx.navigateTo({
      url: '../attibute/attibute?inter=' + inter
    })*/
  },
  updateStepSett: function(step){
    wx.setStorageSync('pagen', step)
  },
  updateStep: function(){
    var item = new Object()
    item.wechatOpenId = wx.getStorageSync('openId')
    item.step = 2
    wx.request({
      url: util.requestUrl + 'user/updateStep',
      method: 'POST',
      data: item
    })
  },
  genItem: function (frontType){
    var item = new Object()
    item.wechatOpenId = wx.getStorageSync('openId')
    var isUp = false
    switch (frontType) {
      case 'style':
        var oldStyle = this.data.oldStyle
        if(oldStyle){
          isUp = true
          item.style = oldStyle
        }
        break;
      case 'color':
        var oldColor = this.data.oldColor
        if (oldColor) {
          isUp = true
          item.color = oldColor
          item.colorType = this.data.oldColorType
        }
        break;
      case 'detail':
        var boyDetail = this.data.oldBoy
        var girlDetail = this.data.oldDetail
        if (boyDetail) {
          isUp = true
          item.boyDetail = boyDetail
        }
        if (girlDetail) {
          isUp = true
          item.girlDetail = girlDetail
        }
        break;
    }
    if (isUp){
      this.updateUser(item)
    }
  },
  updateUser: function(item){
    wx.request({
      url: util.requestUrl + 'user/updateUser',
      method: 'POST',
      data: item
    })
  }
});