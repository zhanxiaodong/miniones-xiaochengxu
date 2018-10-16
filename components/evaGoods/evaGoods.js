import Component from '../component'
export default {
  /**
	 * 默认数据
	 */
  setDefaults() {
    return {
      sizeItems: [
        {
          value: '合适'
        },
        {
          value: '偏大'
        },
        {
          value: '偏小'
        }
      ],
      callback() { },
    }
  },
  init(id, opts = {}) {
    const options = Object.assign({
      animateCss: undefined,
      visible: !1,
    }, this.setDefaults(), opts)

    component.show()
    return component
  }
}