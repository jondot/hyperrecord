const L = require('lodash')

const record = opts => {
  return target => {
    target.init(target.schema, opts)
    if (target.hooks) {
      L.mapValues(target.hooks, (v, k) =>
        L.each(L.castArray(v), m => target.hook(k, target[m]))
      )
    }
  }
}

module.exports = record
