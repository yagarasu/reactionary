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

  pushInto (arr, el, weight) {
    if (!Array.isArray(arr)) throw new TypeError('pushInto requires arr to be an array')
    let idx = 0
    while (idx < arr.length && weight <= arr[idx].weight) { idx++ }
    arr.splice(idx, 0, { el, weight })
  }

  get (type) {
    const types = ['routes', 'middlewares', 'sagas', 'reducers']
    if (!types.includes(type)) throw new TypeError(`Invalid type ${type}.`)
    const repo = this[type]
    if (Array.isArray(repo)) {
      return repo.map(({ el }) => el)
    } else {
      return repo
    }
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

  trigger (hook, ...args) {
    this.modules.forEach(m => typeof m[hook] === 'function' && m[hook](...args))
  }

}

export default ModuleManager
