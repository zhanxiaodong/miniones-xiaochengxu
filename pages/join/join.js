Page({
    data: {

    },
    tell: function(){
        wx.makePhoneCall({
          phoneNumber: '13909090909',
        })
      }
})