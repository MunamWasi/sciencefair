var css = require('dom-css')
var inherits = require('inherits')
var EventEmitter = require('events').EventEmitter

inherits(Search, EventEmitter)

function Search (container) {
  if (!(this instanceof Search)) return new Search(container)
  var self = this

  var input = container.appendChild(document.createElement('input'))
  var img = container.appendChild(document.createElement('img'))
  img.width = '25'
  img.height = '25'
  img.src = './images/search.svg'

  var buttons = container.appendChild(document.createElement('div'))

  var first = buttons.appendChild(document.createElement('img'))
  first.src = "./images/first.svg"
  var prev = buttons.appendChild(document.createElement('img'))
  prev.src = "./images/prev.svg"
  var next = buttons.appendChild(document.createElement('img'))
  next.src = "./images/next.svg"
  var last = buttons.appendChild(document.createElement('img'))
  last.src = "./images/last.svg"

  css(img, {
    position: 'absolute',
    marginTop: 'calc(4% + 2px)',
    marginLeft: 'calc(5% + 2px)',
    zIndex: 900,
    display: 'none'
  })

  css(input,{
    position: 'absolute',
    marginTop: '4%',
    marginLeft: '5%',
    width: '36%',
    height: '30px',
    border: 'none',
    borderBottom: 'dotted 2px rgb(33,33,39)',
    fontSize: '130%',
    paddingLeft: '35px',
    paddingBottom: '5px',
    fontFamily: 'CooperHewitt-Book',
    background: 'none',
    display: 'none'
  })

  css(buttons, {
    position: 'absolute',
    marginTop: '4%',
    right: '5%',
    border: 'none',
    fontSize: '130%',
    paddingBottom: '5px',
    fontFamily: 'CooperHewitt-Book'
  })

  var buttonStyle = {
    color: 'rgb(202,172,77)',
    background: 'none',
    padding: '3px',
    marginLeft: '10px',
    height: 60,
    width: 60
  }

  css(first, buttonStyle)
  css(prev, buttonStyle)
  css(next, buttonStyle)
  css(last, buttonStyle)

  input.onfocus = function () {
    css(input, {
      outline: 'none'
    })
  }

  input.onblur = function () {
    css(input, {
      outline: 'none'
    })
  }

  input.oninput = function () {
    self.emit('input', input.value)
  }

  first.onclick = function () {
    self.emit('first')
  }

  prev.onclick = function () {
    self.emit('prev')
  }

  next.onclick = function () {
    self.emit('next')
  }

  last.onclick = function () {
    self.emit('last')
  }

  self.showSearch = function () {
    css(img, { display: 'block' })
    css(input, { display: 'block' })
    input.focus()
  }

  self.showButtons = function () {
    self.showFirst()
    self.showPrev()
    self.showNext()
    self.showLast()
  }

  self.showPrev = function () {
    css(prev, { display: 'inline-block' })
  }

  self.showNext = function () {
    css(next, { display: 'inline-block' })
  }

  self.showFirst = function () {
    css(first, { display: 'inline-block' })
  }

  self.showLast = function () {
    css(last, { display: 'inline-block' })
  }

  self.hideButtons = function () {
    self.hideFirst()
    self.hidePrev()
    self.hideNext()
    self.hideLast()
  }

  self.hidePrev = function () {
    css(prev, { display: 'none' })
  }

  self.hideNext = function () {
    css(next, { display: 'none' })
  }

  self.hideFirst = function () {
    css(first, { display: 'none' })
  }

  self.hideLast = function () {
    css(last, { display: 'none' })
  }


  self.updateButtons = function(stats) {
    var first = stats.from == 0
    var mid = !first && stats.to < stats.total
    var last = stats.to >= stats.total
    if (first) {
      css(prev, { display: 'none' })
      css(next, { display: 'block' })
    } else if (mid) {
      search.showButtons()
    } else if (last) {
      css(prev, { display: 'block' })
      css(next, { display: 'none' })
    }
  }

  self.hideButtons()

}

module.exports = Search
