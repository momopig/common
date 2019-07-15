/**
 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
 *
 * @param { String } selector A string containing a selector expression to match elements against.
 *
 * @return { Array } D3 selection

 * */
d3.selection.prototype.closest = function(selector) {
  let closestMatchDom = undefined
  let matchArr = []
  this.each(function() {
    let currentDom = this
    while(typeof currentDom.parentNode.matches === 'function' && !closestMatchDom) { // from itself
      if(currentDom.matches(selector)) {
        closestMatchDom = currentDom
        matchArr.push(closestMatchDom)
      }
      currentDom = currentDom.parentNode
    }
    closestMatchDom = undefined
  })
  return d3.selectAll(matchArr)
}

/**
 * DIY D3 Event Delegation
 *
 * @param { String } parentSelector
 * @param { String } childSelector
 * @param { String } events Such as 'click contextmenu'
 * @param { PlainObject } data A custom data which is passed to handler.
 * @param { Function } handler A function to execute when the event of childDom is triggered.
 * @param { Function } inverseHandler A function to execute when the event of childDom is not triggered but the event of parentDom is triggered
 *
 * */
function eventDelegate(parentSelector, childSelector, events, data, handler, inverseHandler) {
  let $container = d3.select(parentSelector)
  $container.on(events, function () {
    let event = d3.event
    let target = event.target
    let $target = d3.select(target)
    let $currentTarget = null

    if (!$target.closest(childSelector).empty() && !$container.select(childSelector).empty()) {
      $currentTarget = $target.closest(childSelector)
    } else {
      if (inverseHandler) {
        inverseHandler.call(target, $target, data)
      }
      return
    }
    d3.event.data = data
    handler.call($currentTarget.node(), $currentTarget, data)
  })
}
