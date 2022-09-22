const logger = (store) => (next) => (action) => {
  if (!window.PRODUCTION) {
    console.group(!action.type ? 'ASYNC_ACTION' : action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
  }
  let result = next(action);
  return result;
};

export default logger;
