
const language = {
  chinese: {
    first: "要个盒子",
    second: "查看详情",
    third: '提前配送',
    forth: '购买与退件',
    five: '评价与付款',
    six: '订阅确认'
  },
  english: {
    first: "want a box",
    second: "see details",
    third: 'early delivery',
    forth: 'buy and return',
    five: 'evaluation and payment',
    six: 'subscription confirmation'
  }

}

module.exports = {
  language: language
}

function changeMsgs(status, type) {
  var result
  if (type == 'btn') {
    switch (status) {
      case 'PRE_CREATE':
        result = 'subscription confirmation'
        break;
      case 'CREATE':
        result = 'see details'
        break;
      case 'LINK_UP':
        result = 'see details'
        break;
      case 'NOTIFY_EXPRESS':
        result = 'see details'
        break;
      case 'DISPATCHING':
        result = 'see details'
        break;
      case 'DELIVERY_COMPLETE':
        result = 'see details'
        break;
      case 'EVALUATED':
        result = 'buy and return'
        break;
      case 'PAY_COMPLETE':
        result = 'early delivery'
        break;
      case 'PAY_PART':
        result = 'see details'
        break;
      case 'RETURN_EXPRESS':
        result = 'see details'
        break;
      case 'RETURN_EXCEPTION':
        result = 'see details'
        break;
      case 'END':
        result = 'early delivery'
        break;
      default:
        result = 'want a box'
        break;
    }
  } else if (type == 'describe') {
    switch (status) {
      case 'PRE_CREATE':
        result = 'wearing a clothes box'
        break;
      case 'CREATE':
        result = 'delivering'
        break;
      case 'LINK_UP':
        result = 'delivering'
        break;
      case 'NOTIFY_EXPRESS':
        result = 'delivering'
        break;
      case 'DISPATCHING':
        result = 'delivering'
        break;
      case 'DELIVERY_COMPLETE':
        result = 'clothes box arrived'
        break;
      case 'EVALUATED':
        result = 'clothes box arrived'
        break;
      case 'PAY_COMPLETE':
        result = 'wearing a clothes box'
        break;
      case 'PAY_PART':
        result = 'free recall'
        break;
      case 'RETURN_EXCEPTION':
        result = 'recall exception'
        break;
      case 'RETURN_EXPRESS':
        result = 'free recall'
        break;
      case 'END':
        result = 'wearing a clothes box'
        break;
      default:
        result = 'first subscription'
        break;
    }
  } else {
    switch (status) {
      case 'PRE_CREATE':
        result = 'There is currently a box in the subscription cycle'
        break;
      case 'CREATE':
        result = 'Please wait patiently for the delivery of the case'
        break;
      case 'LINK_UP':
        result = 'Please wait patiently for the delivery of the case'
        break;
      case 'NOTIFY_EXPRESS':
        result = 'Please wait patiently for the delivery of the case'
        break;
      case 'DISPATCHING':
        result = 'Please wait patiently for the delivery of the case'
        break;
      case 'DELIVERY_COMPLETE':
        result = 'how are you feeling? Let’s evaluate it.'
        break;
      case 'EVALUATED':
        result = 'Limited time trial: 3 days'
        break;
      case 'PAY_COMPLETE':
        result = '本期配送日: '
        break;
      case 'PAY_PART':
        result = 'Free recall within 7 days'
        break;
      case 'RETURN_EXPRESS':
        result = 'Please be patient and wait for the courier to pick up the item'
        break;
      case 'RETURN_EXCEPTION':
        result = 'There is a recall exception in the current order'
        break;
      case 'END':
        result = '本期配送日: '
        break;
      default:
        result = 'Free delivery, try before you buy'
        break;
    }
  }
  return result
}