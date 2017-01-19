
module.exports = function (content) {
  this.cacheable()
  var isProduction = this.minimize || process.env.NODE_ENV === 'production'
  var hash = require('hash-sum')
  var cache = Object.create(null)

  function genId (file) {
    return cache[file] || (cache[file] = hash(file))
  }

  if (!isProduction) {
    var filePath = this.resourcePath
    var moduleId = genId(filePath)

    // TODO : Extract component name from the code (fix failing test)

    content += `
      if (module.hot) {
        const api = require('vue-hot-reload-api')
        const Vue = require('vue')
        api.install(Vue, false)
        module.hot.accept()
        
        if (!module.hot.data) {
          api.createRecord('${moduleId}', HelloWord)
        } else {
          api.reload('${moduleId}', HelloWord.options)
        }
      }
    `
  }

  return content

}