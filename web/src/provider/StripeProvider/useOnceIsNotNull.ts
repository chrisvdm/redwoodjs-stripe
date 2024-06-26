import { useCallback, useEffect, useRef } from "react";

interface Deferred<Value> {
  promise: Promise<Value>;
  resolve: (value: Value) => unknown;
  reject: (reason: unknown) => unknown;
}

const isNotNull = <Value>(value: Value | null): value is Value =>
  value !== null;

export const createDeferred = <Value>(): Deferred<Value> => {
  const deferred: Partial<Deferred<Value>> = {};

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred as Deferred<Value>;
};

const useWatcher = <Value>(
  value: Value,
  predicateFn: (value: Value) => boolean,
): (() => Promise<Value>) => {
  const isConditionMet = predicateFn(value);
  const deferredRef = useRef(createDeferred<Value>());

  useEffect(() => {
    if (isConditionMet) {
      deferredRef.current.resolve(value);
      deferredRef.current = createDeferred();
    }
  }, [value, isConditionMet]);

  return useCallback(async () => {
    if (isConditionMet) {
      return value;
    } else {
      return await deferredRef.current.promise;
    }
  }, [value, isConditionMet]);
};

export const useOnceIsNotNull = <Value>(value: Value): (() => Promise<Value>) =>
  useWatcher(value, isNotNull);
