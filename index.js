
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
    var regex = new RegExp(/([a-z]+) = __decorate\(\[\s+Component/gi)
    var matches = regex.exec(content)

    if (matches !== null) {
      content += `
        if (module.hot) {
          const api = require('vue-hot-reload-api')
          const Vue = require('vue')
          api.install(Vue, false)
          module.hot.accept()
          
          if (!module.hot.data) {
            api.createRecord('${moduleId}', ${matches[1]})
          } else {
            api.reload('${moduleId}', ${matches[1]}.options)
          }
        }
      `
    }
  }
  return content
}