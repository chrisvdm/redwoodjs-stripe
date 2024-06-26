interface Deferred<Value> {
  promise: Promise<Value>;
  resolve: (value: Value) => unknown;
  reject: (reason: unknown) => unknown;
}

export const createDeferred = <Value>(): Deferred<Value> => {
  const deferred: Partial<Deferred<Value>> = {};

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred as Deferred<Value>;
};
