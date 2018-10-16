//初始化数据
function tabbarinit() {
  return [
    
    {
      "current": 0,
      "pagePath": "/pages/classify/index",
      "iconPath": "/images/icons/home-gray.png",
      "selectedIconPath": "/images/icons/home-green.png",
      "text": "主页"
    },
    {
      "current": 0,
      "pagePath": "/pages/cart/index",
      "iconPath": "/images/icons/pre-gray.png",
      "selectedIconPath": "/images/icons/pre-green.png",
      "text": "盒子"

    },
    {
      "current": 0,
      "pagePath": "/pages/my/index",
      "iconPath": "/images/icons/my-gray.png",
      "selectedIconPath": "/images/icons/my-green.png",
      "text": "我的"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}