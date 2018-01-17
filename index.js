export default class FreeSelection {
  constructor ({ onStart, onMove, onEnd } = {}) {
    this._init()
    this.enable = true
    this.isSelecting = false
    this.onStart = onStart
    this.onMove = onMove
    this.onEnd = onEnd
  }

  _init () {
    this._initSelectionDom()
    this._listenEvents()
  }

  _initSelectionDom () {
    this._dom = document.createElement('div')
    this._dom.className = 'cursor-selection'
    document.body.appendChild(this._dom)
  }

  _listenEvents () {
    let startX, startY
    window.addEventListener('mousedown', (event) => {
      if (!this.enable) return
      this.isSelecting = true
      startX = event.clientX
      startY = event.clientY
      this._setSize(0, 0)
      this.showSelection()
      this._moveSelectionTo(startX, startY)
      if (this.onStart) this.onStart(startX, startY)
    })
    window.addEventListener('mousemove', (event) => {
      if (!this.enable || !this.isSelecting) return
      const x = event.clientX
      const y = event.clientY
      const rect = this._getSelectedRect(startX, startY, x, y)
      this._makeSelection(rect)
      if (this.onMove) this.onMove(rect)
    })
    window.addEventListener('mouseup', (event) => {
      if (!this.enable) return
      const x = event.clientX
      const y = event.clientY
      const rect = this._getSelectedRect(startX, startY, x, y)
      this.hideSelection()
      if (this.onEnd) this.onEnd(rect)
    })
  }
  
  _getSelectedRect (startX, startY, endX, endY) {
    const disX = endX - startX
    const disY = endY - startY
    if (disX < 0) startX += disX
    if (disY < 0) startY += disY
    return {
      x: startX,
      y: startY,
      width: Math.abs(disX),
      height: Math.abs(disY)
    }
  }

  _setSize (w, h) {
    this._dom.style.width = `${w}px`
    this._dom.style.height = `${h}px`
  }

  _moveSelectionTo (x, y) {
    this._dom.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  _makeSelection (rect) {
    this._moveSelectionTo(rect.x, rect.y)
    this._setSize(rect.width, rect.height)
    this.isSelecting = true
  }

  hideSelection () {
    this._dom.style.display = 'none'
    this.isSelecting = false
  }

  showSelection () {
    this._dom.style.display = 'block'
  }
}

setTimeout(() => {
  const style = document.createElement('style')
  style.innerHTML = `
.cursor-selection {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.1);
  outline: 0.5px solid #999;
}
  `
  document.body.appendChild(style)
})
