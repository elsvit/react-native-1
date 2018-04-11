// @flow

function deferred(): Object {
  const d = {};

  d.promise = new Promise((resolve, reject) => {
    d.resolve = resolve;
    d.reject = reject;
  });

  return d;
}

export default () => (next: (a: Object) => void) => (action: Object) => {
  const { promisified, ...fields } = action;
  if (!promisified) {
    return next(action);
  }

  const d = deferred();
  next({ ...fields, deferred: d });
  return d.promise;
};
