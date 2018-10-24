// pages/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleOne:'如何使用迷你王国？',
    titleTwo:'衣服里都有什么？',
    titleThree: '为什么选择迷你王国',
    titleFour: '常见问题FAQ',
    boxImg: '/images/xiaolu.jpg',
    contactImg: '/images/erweima.jpg',
    contentList: [
      {
        img: '/images/1.png', index: '1', title: '开启成长档案', describe: '告诉我们你的孩子的个性、风格、大小，', last: '并设定你的预算'},
      {
        img: '/images/2.png', index: '2', title: '收取定制衣盒', describe: '个性匹配的孩童穿搭组合将免费送货上门，', last: '打开盒子在家试穿'},
      {
        img: '/images/3.png', index: '3',title: '留下孩子喜欢的', describe: '选择你和孩子喜欢的商品买单！', last:'我们提供了优厚的折扣'},
      {
        img: '/images/4.png', index: '4', title: '退回剩下的', describe: '你只需点击一键召回，', last: '顺丰将主动上门取走剩下的商品'},
      {
        img: '/images/5.png', index: '5', title: '随时更改订阅', describe: '你可以随时再发起衣盒请求,', last: '我们也提供了人性化的周期订阅提醒服务'},
    ],
    describeList: [
      {
        img: '/images/why1.png', title: '亲民友好的定价', describe: '由于孩子快速成长需要常换衣服,', last: '我们的服装起价仅为12元'},
      {
    img: '/images/why2.png', title: '独一无二的风格', describe: '不用担心孩子在街上与别人撞衫,', last: '我们不断更新超过100000独特搭配'},
      {
    img: '/images/why3.png', title: '方便、轻松有趣的体验', describe: '我们将试衣间搬到舒适的家中，', last: '省时省心省力，先试后买更放心'},
    ],
    questionList: [
      {
        title: 'Q：发起一个盒子收钱吗？', one: '订阅会员享无限免费盒子。', two: '非会员用户每次盒子仅收取29元，服务包含搭配/包装/顺丰来回，并且这笔费用在支付时可直接抵扣。'},
      {
    title: 'Q：盒子里的商品什么价格？', one: '通常每件20-200元。', two: '我们会根据您设置的消费意愿进行合适的推送，如果您整盒留下时，还将额外获得40% 的折扣。' },
      {
    title: 'Q：收到的盒子里没有喜欢的怎么办？', one: '您不需要做任何支付。', two: '非常抱歉没有匹配到准确的商品给您，您可以免费一键退回，顺丰将上门取走盒子。'},
      {
    title: 'Q：会员有什么作用？', one: '更多的折扣与更稳定的服务。', two: '仅需支付99 / 199成为会员，每季度将收到199-499的无门槛立减券，并享无限配送/优先配送 / 节日礼包等特权。' },
      {
        title: 'Q：为什么收到盒子前看不到服饰照片？', one: '图片会说谎，实物不会。', two: '我们将更多的可能性放进盒子里，直接送到您家里，可能孩子没有尝试过的风格，但试穿的时候却非常棒！轻松享受品质生活吧。'},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})