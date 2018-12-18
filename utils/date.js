
// yyyy-MM-dd
function parseDate(dateStr) {
  var pattern = /([0-9]{4,})-([0-9]{2,})-([0-9]{2,})/
  if ( !pattern.test(dateStr) ) {
    throw new Error(dateStr + '格式不满足yyyy-MM-dd')
  }
  return new Date(RegExp.$1, parseInt(RegExp.$2, 10) - 1, RegExp.$3)
}

// yyyy-MM-dd HH:mm:ss
function parseDateTime(dateTimeStr) {
  var pattern = /([0-9]{4,}-[0-9]{2,}-[0-9]{2,})\s([0-9]{2,}:[0-9]{2,}:[0-9]{2,})/
  if (!pattern.test(dateStr)) {
    throw new Error(dateTimeStr + '格式不满足yyyy-MM-dd HH:mm:ss')
  }
  return parseTime(RegExp.$2, parseDate(RegExp.$1));
}

// HH:mm:ss
function parseTime(timeStr, date) {
  var pattern = /([0-9]{2,}):([0-9]{2,}):([0-9]{2,})/
  if (!pattern.test(dateStr)) {
    throw new Error(timeStr + '格式不满足HH:mm:ss')
  }
  var now = date || new Date();
  now.setFullYear(RegExp.$1);
  now.setMonth(RegExp.$2)
  now.setDate(RegExp.$3)
  return now;
}

function plusDay(date, days) {
  var timestamp = date.valueOf()
  var daysMilles = days * 24 * 3600 * 1000
  return new Date(timestamp + daysMilles)
}

function formatDate(date, spe) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join(spe || '-')
}

function formatDate2(date, spe) {
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [month, day].map(formatNumber).join(spe || '-')
}

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

exports.parseTime = parseTime
exports.parseDate = parseDate
exports.parseDateTime = parseDateTime
exports.formatDate = formatDate
exports.formatDate2 = formatDate2
exports.plusDay = plusDay
