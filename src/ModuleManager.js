class ModuleManager {
  constructor(modules) {
    this.modules = modules.map(m => new m())
    this.routes = []
    this.routeNotFound = {}
    this.reducers = {}
    this.middlewares = []
    this.sagas = []
    this.modules.forEach(m => m.initialize())
  }

  register () {
    this.modules.forEach(m => m.register(this))
  }

  pushInto(arr, el, weight) {
    if (!Array.isArray(arr)) throw new TypeError('pushInto requires arr to be an array')
    let idx = 0
    while (idx < arr.length && weight <= arr[idx].weight) { idx++ }
    arr.splice(idx, 0, { el, weight })
  }

  getFrom(type) {
    console.log('getFrom', type)
    const arr = this[type]
    if (!Array.isArray(arr)) throw new TypeError('getFrom requires type to map to an internal array')
    return arr.map(({ el }) => el)
  }

  registerRoute (path, component, extra, weight = 0) {
    this.pushInto(this.routes, { path, component, exact: true, ...extra }, weight)
  }

  registerNotFound (component, extra) {
    this.routeNotFound = { component, ...extra }
  }

  registerReducer (key, reducer) {
    this.reducers[key] = reducer
  }

  registerMiddleware (middleware, weight = 0) {
    this.pushInto(this.middlewares, middleware, weight)
  }

  registerSaga (saga, weight = 0) {
    this.pushInto(this.sagas, saga, weight)
  }

}

export default ModuleManager
