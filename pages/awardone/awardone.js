var util = require("../../utils/util.js")
Page({
  data: {
    index: 1,
    sum: 1,
    result: [],
    question: '您对孩子目前的日常穿搭是否满意？',
    answerAllItems: [{
        value: '非常满意'
      },
      {
        value: '比较满意'
      },
      {
        value: '不太满意'
      },
      {
        value: '非常不满意'
      }
    ],
    surveyResults: [],
    enable: false,
    times: 4,
    choose:false
  },
  onLoad: function(options) {
    console.log(options)
    if (options.activityId) {
      this.setData({
        activityId: options.activityId
      })
    }
    this.findSurveyByType()
  },
  countDown: function() {
    var times = this.data.times
    var choose = this.data.choose
    if (times > 1) {
      times--
      this.setData({
        times: times
      })
      setTimeout(this.countDown, 1000);
    } else {
      console.log(choose)
      this.setData({
        times: '',
        enable: choose
      })
    }
  },
  next: function() {
    var that = this
    var index = that.data.index
    var sum = that.data.sum
    if (index < sum) {
      this.setData({
        index: index + 1,
        enable: false,
        choose: false,
        times: 4
      })
      this.updateTitle()
    }
  },
  /**
   * 更新title
   */
  updateTitle: function() {
    var that = this
    wx.setNavigationBarTitle({
      title: that.data.index + '/' + that.data.sum,
    })
    that.updateQuestions()
    that.countDown()
  },
  /**
   * 获取type=AWARDQUESTION下所有的题目
   */
  findSurveyByType: function() {
    var openId = wx.getStorageSync('openId')
    var that = this
    wx.request({
      url: util.requestUrl + 'survey/findSurveyByType?type=AWARDQUESTION',
      success: function(res) {
        var result = res.data.data
        if (result) {
          var sum = res.data.data.length
          that.setData({
            result: result,
            sum: sum
          })
          that.updateTitle()
        }
      }
    })
  },
  updateQuestions: function() {
    var that = this
    var index = that.data.index
    var sum = that.data.sum
    var result = that.data.result
    if (sum > 0) {
      var surveyId = result[index - 1].id
      var question = result[index - 1].question
      var answerArr = result[index - 1].answer
      var answerAllItems = new Array()
      for (var i = 0; i < answerArr.length; i++) {
        answerAllItems.push({
          value: answerArr[i]
        })
      }
      that.setData({
        surveyId: surveyId,
        question: question,
        answerAllItems: answerAllItems
      })
    }
  },
  answerAllChange: function(e) {
    var value = e.detail.value
    this.updateAnswerAll(value)
    var index
    var answerAllItems = this.data.answerAllItems
    for (var i = 0; i < answerAllItems.length; ++i) {
      if (value == answerAllItems[i].value) {
        index = i
        break;
      }
    }
    this.setData({
      answerAllItems: answerAllItems
    })
  },
  updateAnswerAll: function(value) {
    var that = this
    var surveyResult = new Object()
    surveyResult.surveyId = that.data.surveyId
    surveyResult.question = that.data.question
    surveyResult.answer = value
    var surveyResults
    surveyResults = that.data.surveyResults
    if (!surveyResults) {
      surveyResults = new Array()
    }
    var hasCount = 0
    surveyResults.push(surveyResult)
    for (var i = 0; i < surveyResults.length; i++) {
      if (surveyResults[i].surveyId == surveyResult.surveyId) {
        hasCount++;
        if (hasCount == 2) {
          surveyResults.splice(i - 1, 1)
        }
      }
    }
    var answerAllItems = util.radioGroupChange(this.data.answerAllItems, value)
    this.setData({
      choose:true,
      answerAllItems: answerAllItems,
      surveyResults: surveyResults,
      enable: this.data.times == 1 || !this.data.times,
      times: this.data.times == 1 ? '' : this.data.times
    })
  },
  saveSurveyRecord: function() {
    var item = new Object();
    item.openId = wx.getStorageSync('openId')
    var surveyResults = this.data.surveyResults
    var activityId = this.data.activityId
    if (surveyResults) {
      item.surveyResults = surveyResults
    }
    item.activityId = activityId
    wx.request({
      url: util.requestUrl + 'survey/saveSurveyRecord',
      method: 'POST',
      data: item,
      success: function(res) {
        var result = res.data.data
        if (result) {
          var bonus = result.bonus
          wx.redirectTo({
            url: '../buffer/buffer?bonus=' + bonus + '&activityId=' + activityId,
          })
        }
      }
    })
  }
})