import FreeSelection from '../index.js'

const selection = new FreeSelection({
  onStart (x, y) {
    console.log('起始点', x, y)
  },

  onMove (rect) {
    console.log('划选矩形区域', rect)
  },

  onEnd (rect) {
    console.log('结束选择的时候的矩形区域', rect)
  }
})

/* 取消划选功能 */
selection.enable = false

/* 启动划选功能 */
selection.enable = true
