// @flow

export const API_REQUEST: 'API_REQUEST' = 'API_REQUEST';

export type ApiRequest<M> = {
  type: typeof API_REQUEST,
  types: Array<string>,
  call: () => Promise<M>,
};

export function promisify(actionCreator: (*) => Object) {
  return (...args: Array<*>) => {
    return {
      ...actionCreator(...args),
      promisified: true,
    };
  };
}
