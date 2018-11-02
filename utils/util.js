function formatTime(date, spe) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join(spe) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function saveFormId(openId, formId) {
  var item = new Object()
  item.openId = openId
  item.formId = formId
  wx.request({
    url: requestUrl + 'wechat/saveFormId',
    method: 'POST',
    data: item
  })
}

/**
 * 配件定义
 */
function getParts() {
  var parts = [
    {
      id: '1',
      value: '帽子'
    },
    {
      id: '2',
      value: '围巾'
    },
    {
      id: '3',
      value: '包包'
    },
    {
      id: '4',
      value: '手环'
    },
    {
      id: '5',
      value: '鞋子'
    },
    {
      id: '6',
      value: '袜子'
    },
    {
      id: '7',
      value: '玩具'
    }
  ]
  return parts
}
var occasions = [
  {
    id: '1',
    url: '/images/img14.png',
    value: '居家生活'
  },
  {
    id: '2',
    url: '/images/img15.png',
    value: '校园生活'
  },
  {
    id: '3',
    url: '/images/img16.png',
    value: '节日礼仪'
  },
  {
    id: '4',
    url: '/images/img17.png',
    value: '亲子度假'
  },
  {
    id: '5',
    url: '/images/img18.png',
    value: '运动休闲'
  },
  {
    id: '6',
    url: '/images/img19.png',
    value: '日常换洗'
  }
]
var alltype = [
  {
    value: 'T恤'
  },
  {
    value: '外套'
  },
  {
    value: '裤子'
  },
  {
    value: '裙子'
  },
  {
    value: '帽子'
  },
  {
    value: '袜子'
  },
  {
    value: '围巾'
  },
  {
    value: '发箍'
  },
  {
    value: '鞋子'
  },
  {
    value: '包包'
  }
]
/**
 * 上装
 */
var jackets = [
  {
    id: '1',
    value: '圆领T恤'
  },
  {
    id: '2',
    value: 'V领T恤'
  },
  {
    id: '3',
    value: '短袖衬衫'
  },
  {
    id: '4',
    value: '长袖衬衫'
  },
  {
    id: '5',
    value: '外套'
  },
  {
    id: '6',
    value: '套装'
  }
]
/**
 * 下装
 */
function getDowns() {

  var down = [
    {
      id: '1',
      value: '休闲裤'
    },
    {
      id: '2',
      value: '牛仔裤'
    },
    {
      id: '3',
      value: '七分裤'
    },
    {
      id: '4',
      value: '九分裤'
    }
  ]
  return down
}

/**
 * 获取今天
 * 格式为yyyy-mm-dd
 */
function getToday(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
function getMonth(date) {
  var month = date.getMonth() + 1
  return month
}
function formatDate(date) {
  var date = new Date(date)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var str = '上午'
  if (hour > 12) {
    str = '下午'
  }

  return year + '年' + month + '月' + day + '日' + ' ' + str + hour + ':' + minute
}
//邮箱以及手机的正则表达式
function regexConfig() {
  var reg = {
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    phone: /^1(3|4|5|7|8)\d{9}$/
  }
  return reg;
}

/**
 * 随机生成长度的字符串
 */
function randomString(len) {
  len = len || 32;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
/**
 * 获取月份
 */
function getMonths() {
  var months = [
    {
      name: '1',
      value: '1'
    },
    {
      name: '2',
      value: '2'
    },
    {
      name: '3',
      value: '3'
    },
    {
      name: '4',
      value: '4'
    },
    {
      name: '5',
      value: '5'
    },
    {
      name: '6',
      value: '6'
    },
    {
      name: '7',
      value: '7'
    },
    {
      name: '8',
      value: '8'
    },
    {
      name: '9',
      value: '9'
    },
    {
      name: '10',
      value: '10'
    },
    {
      name: '11',
      value: '11'
    },
    {
      name: '12',
      value: '12'
    }
  ]
  return months
}
/**
 * 首页文字变化
 */
function changeMsg(status, type) {
  var result
  if (type == 'btn') {
    switch (status) {
      case 'CREATE':
        result = '搭配准备'
        break;
      case 'LINK_UP':
        result = '搭配准备'
        break;
      case 'NOTIFY_EXPRESS':
        result = '正在配送'
        break;
      case 'DISPATCHING':
        result = '正在配送'
        break;
      case 'DELIVERY_COMPLETE':
        result = '评价与付款'
        break;
      case 'EVALUATED':
        result = '购买与退件'
        break;
      case 'PAY_COMPLETE':
        result = '免费要个盒子'
        break;
      case 'PAY_PART':
        result = '免费召回'
        break;
      case 'RETURN_EXPRESS':
        result = '等待取件'
        break;
      case 'END':
        result = '免费要个盒子'
        break;
      default:
        result = '免费要个盒子'
        break;
    }
  } else if (type == 'img') {
    switch (status) {
      case 'CREATE':
        result = '/images/showa.png'
        break;
      case 'LINK_UP':
        result = '/images/boxs/ready.png'
        break;
      case 'NOTIFY_EXPRESS':
        result = '/images/boxs/Transport.png'
        break;
      case 'DISPATCHING':
        result = '/images/boxs/Transport.png'
        break;
      case 'DELIVERY_COMPLETE':
        result = '/images/boxs/open.png'
        break;
      case 'EVALUATED':
        result = '/images/boxs/open.png'
        break;
      case 'PAY_COMPLETE':
        result = '/images/showa.png'
        break;
      case 'PAY_PART':
        result = '/images/boxs/open.png'
        break;
      case 'RETURN_EXPRESS':
        result = '/images/showa.png'
        break;
      case 'END':
        result = '/images/showa.png'
        break;
      default:
        result = '/images/showa.png'
        break;
    }
  } else {
    switch (status) {
      case 'CREATE':
        result = '请您耐心等待衣盒配送'
        break;
      case 'LINK_UP':
        result = '请您耐心等待衣盒配送'
        break;
      case 'NOTIFY_EXPRESS': 
        result = '请您耐心等待衣盒送达'
        break;
      case 'DISPATCHING':
        result = '请您耐心等待衣盒送达'
        break;
      case 'DELIVERY_COMPLETE':
        result = '感觉如何？来评价下吧'
        break;
      case 'EVALUATED':
        result = '配送成功，为喜欢的买单！'
        break;
      case 'PAY_COMPLETE':
        result = '下一次盒子: '
        break;
      case 'PAY_PART':
        result = '送没有留下的小衣服回家吧'
        break;
      case 'RETURN_EXPRESS':
        result = '请耐心等待快递员上门取件'
        break;
      case 'END':
        result = '下一次盒子: '
        break;
      default:
        result = '当前没有进行中的搭配'
        break;
    }
  }
  return result
}

/**
 * 多选项值变动
 */
function checkboxGroupChange(group, values) {
  if (values && values.length > 0) {
    for (var i = 0, lenI = group.length; i < lenI; ++i) {
      group[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (group[i].value == values[j]) {
          group[i].checked = true;
          break;
        }
      }
    }
  } else {
    for (var i = 0, lenI = group.length; i < lenI; ++i) {
      group[i].checked = false;
    }
  }
  return group;
}
/**
 * 单选框值进行变动
 */
function radioGroupChange(group, value) {
  if (value) {
    for (var i = 0, len = group.length; i < len; ++i) {
      group[i].checked = group[i].value == value;
    }
  }
  return group
}
// const requestUrl = 'https://minianys.bananayc.com/merchant/'
// const requestUrl = 'https://interface.miniones.cn/merchant/'

const requestUrl = 'https://interface.miniones.cn/merchant_new/'
//  const requestUrl = 'http://192.168.0.2:8080/merchant/'
//const requestUrl = 'http://localhost:8080/merchant/'
function imageUtil(e, windowWidth, windowHeight) {
  var imageSize = {};
  var originalWidth = e.detail.width;//图片原始宽  
  var originalHeight = e.detail.height;//图片原始高  
  var originalScale = originalHeight / originalWidth;//图片高宽比  
  var windowscale = windowHeight / windowWidth;//屏幕高宽比
  if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比  
    //图片缩放后的宽为屏幕宽  
    imageSize.imageWidth = windowWidth;
    imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
  } else {//图片高宽比大于屏幕高宽比  
    //图片缩放后的高为屏幕高  
    imageSize.imageHeight = windowHeight;
    imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
  }
  return imageSize;
}
function getOpenId() {
  var openId = wx.getStorageSync('openId')
    if (!openId) {
      wx.login({
        success: function (res) {
          var code = res.code
          if (code) {
            wx.getUserInfo({
              withCredentials: true,
              success: function (resU) {
                wx.setStorageSync('userInfo', resU.userInfo);
                wx.request({
                  url: requestUrl + 'wechat/decodeUserInfo',
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    encryptedData: resU.encryptedData,
                    iv: resU.iv,
                    code: code
                  },
                  success: function (data) {
                    var openId = data.data.data.openid
                    wx.setStorageSync('openId', openId)
                    wx.request({
                      url: requestUrl + 'user/findUserByOpenId?openId=' + openId,
                      success: function (res) {
                        var result = res.data.data
                        var level = "0"
                        if (result) {
                          level = result.level
                        }
                        wx.setStorageSync('level', level)
                      }
                    })
                  }
                })
              },
              fail: function () {
                wx.showModal({
                  title: '警告通知',
                  content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: (res) => {
                          if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                            wx.login({
                              success: function (res_login) {
                                if (res_login.code) {
                                  wx.getUserInfo({
                                    withCredentials: true,
                                    success: function (res_user) {
                                      wx.request({
                                        url: requestUrl + 'wechat/decodeUserInfo',
                                        method: 'POST',
                                        header: {
                                          'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        data: {
                                          code: res_login.code,
                                          encryptedData: res_user.encryptedData,
                                          iv: res_user.iv
                                        },
                                        success: function (res) {
                                          var openId = data.data.data.openid
                                          wx.setStorageSync('openId', openId);
                                          getUserInfo(openId)
                                        }
                                      })
                                    }
                                  })
                                }
                              }
                            });
                          }
                        }, fail: function (res) {

                        }
                      })

                    }
                  }
                })
              }
            })
          }
        }
      })
    }
  return openId
}
function getUserInfo(openId) {
  if (openId) {
    wx.request({
      url: requestUrl + 'user/findUserByOpenId?openId=' + openId,
      success: function (res) {
        var result = res.data.data
        var level = 0
        if (result) {
          level = result.level
        }
        wx.setStorageSync('level', level)
      }
    })
  } else {
    wx.setStorageSync('level', '0')
  }

}

function updateStep (step) {
  var item = new Object()
  item.wechatOpenId = wx.getStorageSync('openId')
  item.step = step
  wx.request({
    url: requestUrl + 'user/updateStep',
    method: 'POST',
    data: item
  })
}

/**
 * 是否老用户
 */
function checkOldUser(item) {
  var result = false
  wx.request({
    url: requestUrl + 'user/checkOldUser',
    method: 'POST',
    data: item,
    success: function (res) {
      result = res.data.data
    }
  })
  return result
}

function getPhoneNum(e) {
  var mobile = ''
  wx.login({
    success: function (res) {
      console.log(res)
      var code = res.code
      if (code) {
        wx.request({
          url: requestUrl + 'wechat/decodeUserInfo',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            code: code
          },
          success: function (resD) {
            var result = resD.data.data
            if (result) {
              var tel = result.userInfo.phoneNumber
              var openId = result.openid
              var copyUser = result.copyUser
              getUserInfo(openId)
              if (copyUser) {
                wx.showToast({
                  title: '复制信息成功',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function () {
                  wx.switchTab({
                    url: '../index/index'
                  })
                }, 2000)
              } else {
                wx.redirectTo({
                  url: '../detail/detail',
                })
              }
            }
          }
        })
      }
    }
  })
  return mobile
}
module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  regexConfig: regexConfig,
  randomString: randomString,
  checkboxGroupChange: checkboxGroupChange,
  getMonths: getMonths,
  getToday: getToday,
  getParts: getParts,
  getDowns: getDowns,
  jackets: jackets,
  occasions: occasions,
  radioGroupChange: radioGroupChange,
  changeMsg: changeMsg,
  getMonth: getMonth,
  alltype: alltype,
  requestUrl: requestUrl,
  imageUtil: imageUtil,
  getOpenId: getOpenId,
  getPhoneNum: getPhoneNum,
  getUserInfo: getUserInfo,
  saveFormId: saveFormId,
  checkOldUser: checkOldUser,
  updateStep: updateStep
}