const chain = (...cbs) =>
  (...args) =>
    cbs.reduce((acc, cb) =>
      [...acc, (cb && cb(...args))], []
    )
