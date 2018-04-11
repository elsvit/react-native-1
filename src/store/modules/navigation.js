// @flow
import { Router } from '../../Router';

const initialState = Router.router.getStateForAction({});

export default function(state: Object = initialState, action: Object) {
  const nextState = Router.router.getStateForAction(action, state);

  return nextState || state;
}
