var util = require("../../utils/util.js");
const app = getApp();
Page({
  data: {
    about: '',
    activeIndex: 0,
    tabs: ["0-1岁", "1-2岁", "2-3岁", "3-4岁", "4-5岁", "5-6岁"],
    titleOne: '迷你王国的全新购物体验',
    titleTwo: '超过10,000名高知妈妈的托付',
    titleThree: '为什么要选择迷你王国',
    titleFour: '订阅会员专享特权',
    titleFive: '盒子里面都有什么',
    imgUrls: [
      'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/topbackground.png',
      'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/lunbotu7.png',
      'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/lunbotu8.png',
      'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/lunbotu9.png',
      'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/lunbotu10.png'
    ],
    whatBox: [
      { img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/clo.png', title: '3-5件衣服' },
      { img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/ote.png', title: '1-2配饰' },
      { img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/sho.png', title: '1-2鞋履' },
      { img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/flw.png', title: '1-2洗护香氛' }
    ],
    vipicon: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/vip-icon-one.png',
    vipbd: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/vipinfo.png',
    planphoto: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/dingyue375.png',
    vipGrey: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/vipbg-grey.png',
    vipYellow: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/vipbg-yellow.png',
    vipGreen: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/vipbg-green.png',
    vipOne: '/images/1.png',
    vipTwo: '/images/2.png',
    boxImg: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/topbg.png',
    contactImg: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/erweima.jpg',
    babyInfo: [{
      order: '第一盒', date: '11月11日', character: '保暖|换洗|换季'
    },
    {
      order: '第二盒', date: '12月12日', character: '圣诞|保暖|换洗'
    }],
    sectionOne: [{
      math: '1',
      title: '一次一盒'
    },
    {
      math: '3',
      title: '2-3套专业搭配'
    },
    {
      math: '50%',
      title: '售价不高于5折'
    }
    ],
    sectionTwo: [{
        math: '60',
        title: '全球精选品牌'
      },
      {
        math: '22,000',
        title: '严选品质单品'
      },
      {
        math: '190,000',
        title: '亲子家庭托付'
      },
    ],
    vipList: [{
        math: '01.',
        title: '注册订阅',
        content: '填写孩子的个性资料，并设定你的预期。'
      },
      {
        math: '02.',
        title: '要个盒子',
        content: '随时随地，一键下单，2-3套精美搭配顺丰到家。'
      },
    ],
    vipListAgain: [{
      math: '03.',
      title: '在家试穿',
      content: '留下孩子喜欢的进行购买，会员享优惠折扣。'
      },
      {
        math: '04.',
        title: '免费退回',
        content: '不合适的免费退回，一键顺丰上门取走。'
      },
      {
        math: '05.',
        title: '连续服务',
        content: '等待下一个衣盒，也可以主动发起需求。'
      },
    ],
    vipPrivilege: [{
      img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/zhekou2.png',
        title: '专属搭配'
      },
      {
        img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/zhekou.png',
        title: '专享折扣'
      },
      {
        img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/zhekou3.png',
        title: '先试后买'
      },
      {
        img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/zhekou4.png',
        title: '往返包邮'
      }
    ],
     
    indicatorDots: false,
    autoplay: true,
    interval: 8000,
    duration: 1000,
    circular: true,

    lunbotuList: [{
      img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/sara.png',
      photo: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/sara1.png',
      name: 'sara',
      company: '华为',
      job: '高级经理',
      detail: '14年在美国出差就听说过这种购物方式，很感兴趣，觉得很棒。今年年初miniones在国内上线的时候，我立即要了一个盒子，说实话第一个盒子并没有十分惊艳，但我还是买了会员，因为我需要一个可靠的服务帮我节省时间。',
      like: '品牌偏好：Next (UK) ｜Jacadi (FR)',
      set: '消费预设：500+/套',
      add: '累计盒子：6个'
    },
      {
        img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/xinghumama.png',
        photo: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/xinghumama1.png',
        name: '@幸胡麻麻',
        company: '自媒体人',
        job: '全职妈妈',
        detail: '我们家小可的很多衣服都在微商上买的。微商的衣服好看是好看，就是质量实在是...收了几次亲盒后最大的感受是衣服摸起来都很软糯，质量真的很棒！',
        like: '品牌偏好：马克珍妮(CN) ｜巴布豆(CN)',
        set: '消费预设：100 - 300 / 套',
        add: '累计盒子：3个'
      },
      { 
        img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/dajiaoban.png',
        photo: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/dajiaoban1.png',
        name: '@大脚板',
        company: '私企',
        job: '主管',
        detail: '为什么选择你们？方便啊，自己花时间去筛选还是花点钱让可靠的人帮你准备，我选择后者。别问，问就是懒。',
        like: '品牌偏好：马克珍妮(CN) ｜Bebeby(CN)',
        set: '消费预设：100 - 300 / 套',
        add: '累计盒子：3个'
      },
      { 
        img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/baibaibai.png',
        photo: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/baibaibai1.png',
        name: '@白白白',
        company: '网易',
        job: '平面设计',
        detail: '衣服都很舒适，之前收到防晒服和遮阳帽正好旅游用上，刚收到的这个盒子里给我放了一个全棉时代的纱布浴巾，我想知道搭配师是怎么知道我正好想买这个的～',
        like: '品牌偏好：Zara(ES) ｜Carter(US)',
        set: '消费预设：100 - 300 / 套',
        add: '累计盒子：4个'
      },
      { 
        img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/jiangyiyi.png',
        photo: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/jiangyiyi1.png',
        name: '@江一一',
        company: '艺人',
        job: '演员模特',
        detail: '非常有趣的购物体验， 补充了我在工作忙碌时的疏忽，迷你王国会主动提醒我并配送一个丰富的搭配盒子，有些之前没见过的牌子，但看到衣服会十分惊喜。',
        like: '品牌偏好：Bopoint(FR) ｜Nonas(ES)',
        set: '消费预设：500 + /套',
        add: '累计盒子：8个'
      }],

    contentList: [{
        img: '/images/1.png',
        index: '1',
        title: '开启成长档案',
        describe: '告诉我们你的孩子的个性、风格、大小，',
        last: '并设定你的预算'
      },
      {
        img: '/images/2.png',
        index: '2',
        title: '收取定制衣盒',
        describe: '个性匹配的孩童穿搭组合将免费送货上门，',
        last: '打开盒子在家试穿'
      },
      {
        img: '/images/3.png',
        index: '3',
        title: '留下孩子喜欢的',
        describe: '选择你和孩子喜欢的商品买单！',
        last: '我们提供了优厚的折扣'
      },
      {
        img: '/images/4.png',
        index: '4',
        title: '退回剩下的',
        describe: '你只需点击一键召回，',
        last: '顺丰将主动上门取走剩下的商品'
      },
      {
        img: '/images/5.png',
        index: '5',
        title: '随时更改订阅',
        describe: '你可以随时再发起衣盒请求,',
        last: '我们也提供了人性化的周期订阅提醒服务'
      },
    ],
    describeList: [{
      img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/xin.png',
        title: '智慧推荐',
        describe: '给孩子成长需求推荐，合理搭配'
      },
      {
        img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/biaoqian-one.png',
        title: '好看不贵',
        describe: '精选商品搭配组合，优质评价'
      },
      {
        img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/liwu-one.png',
        title: '先试后买',
        describe: '喜欢才付款，剩下的免费一键退回'
      },
      {
        img: 'https://miniany.oss-cn-beijing.aliyuncs.com/minianys/kafei.png',
        title: '方便省心',
        describe: '一键购物/退回，顺丰免费上门'
      },
    ],
    questionList: [{
        title: 'Q：发起一个盒子收钱吗？',
        one: '订阅会员享无限免费盒子。',
        two: '非会员用户每次盒子仅收取29元，服务包含搭配/包装/顺丰来回，并且这笔费用在支付时可直接抵扣。'
      },
      {
        title: 'Q：盒子里的商品什么价格？',
        one: '通常每件20-200元。',
        two: '我们会根据您设置的消费意愿进行合适的推送，如果您整盒留下时，还将额外获得40% 的折扣。'
      },
      {
        title: 'Q：收到的盒子里没有喜欢的怎么办？',
        one: '您不需要做任何支付。',
        two: '非常抱歉没有匹配到准确的商品给您，您可以免费一键退回，顺丰将上门取走盒子。'
      },
      {
        title: 'Q：会员有什么作用？',
        one: '更多的折扣与更稳定的服务。',
        two: '仅需支付99 / 199成为会员，每季度将收到199-499的无门槛立减券，并享无限配送/优先配送 / 节日礼包等特权。'
      },
      {
        title: 'Q：为什么收到盒子前看不到服饰照片？',
        one: '图片会说谎，实物不会。',
        two: '我们将更多的可能性放进盒子里，直接送到您家里，可能孩子没有尝试过的风格，但试穿的时候却非常棒！轻松享受品质生活吧。'
      },
    ],
    level: wx.getStorageSync('level') ? wx.getStorageSync('level') : 0
  },
  onLoad: function(options) {
    console.log(options);
    app.editTabBar();
    this.checkAuth()
    var about = options.about;
    var that = this;
    if (about) {
      that.setData({
        about: about
      })
    }
  },

  /* 右上角转发*/
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '给你孩子免费寄去搭配衣盒，全球品牌先试后买',
      path: '/pages/guide/guide',
      imageUrl: "https://miniany.oss-cn-beijing.aliyuncs.com/minianys/share-guide.jpg",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  
  previewImage: function (e) {
    wx.previewImage({
      urls: this.data.contactImg.split(',') // 需要预览的图片http链接列表   
    })
  },
  onGotUserInfo: function(e) {
    if (e.detail.userInfo) {
      this.getOpenId()
    }
  },
  getOpenId: function () {
    var that = this
    wx.login({
      success: function (res) {
        var code = res.code
        if (code) {
          wx.getUserInfo({
            withCredentials: true,
            success: function (resU) {
              wx.setStorageSync('userInfo', resU.userInfo);

              wx.request({
                url: util.requestUrl + 'wechat/decodeUserInfo',
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
                    url: util.requestUrl + 'user/findUserByOpenId?openId=' + openId,
                    success: function (res) {
                      var result = res.data.data
                      var level = "0"
                      if (result) {
                        level = result.level
                      }
                      wx.setStorageSync('level', level)
                      that.checkAuth()
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  checkAuth: function() {
    var that = this
    if (!wx.getStorageSync('openId')) {
      that.setData({
        needAuth: true
      })
    } else {
      that.setData({
        needAuth: false
      })
      var openId = wx.getStorageSync('openId')
      wx.request({
        url: util.requestUrl + 'user/updateGuide?openId=' + openId,
      })
      var level = wx.getStorageSync('level')
      if (level) {
        that.setData({
          level: level
        })
      } 
      wx.request({
        url: util.requestUrl + 'baby/findBabyByOpenId?openId=' + openId,
        success: function (res) {
          var result = res.data.data
          console.log(result)
          if (result){
            that.setData({
              result: result
            })
          }
        }
      })
    }
  },
  newNext: function () {
    var that = this
    var openId = wx.getStorageSync('openId')
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: util.requestUrl + 'user/findUserInfo?openId=' + openId,
      success: function (res) {
      wx.hideLoading()
      wx.navigateTo({
      url: "/pages/index/index",
        })
       }
      }) 
  },
  
  yearNext: function () {
    var that = this
    var openId = wx.getStorageSync('openId')
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: util.requestUrl + 'user/findUserInfo?openId=' + openId,
      success: function (res) {
        wx.hideLoading()
        var result = res.data.data
        var level = res.data.data.user.level
        console.log(level)
        wx.setStorageSync("level", level)
        if (level == '40' || level == '50') {
          wx.showToast({
            title: '您已经是会员～',
          })
        } else
    wx.navigateTo({
      url: "/pages/club/club",
    })
    }
   })
  },

  continueNext: function () {
    var that = this
    var openId = wx.getStorageSync('openId')
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: util.requestUrl + 'user/findUserInfo?openId=' + openId,
      success: function (res) {
        wx.hideLoading()
        var result = res.data.data
        var level = res.data.data.user.level
        console.log(level)
        wx.setStorageSync("level", level)
        if (level == '40' || level == '50') {
          wx.showToast({
            title: '您已经是会员～',
          })
        } else
          wx.navigateTo({
            url: "/pages/club/club",
          })
      }
    })
  },
  
  tabClick: function (e) {
    var that = this;
    if (this.data.activeIndex === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  tabClick: function (e) {
    var activeId = e.currentTarget.id
    this.setData({
      activeIndex: e.currentTarget.id
    })
},
  clickIndex: function() {
    var level = wx.getStorageSync('level')
    if (!level || level == 0) {
      util.updateStep(1)
    }
    wx.reLaunch({
      url: '../index/index',
    })
  }, 
})