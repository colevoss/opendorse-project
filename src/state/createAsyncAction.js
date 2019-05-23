/**
 * This function will create a set of actions that correspond to an aysnchronous action.
 *
 * @example
 *
 * const fetchPostsActions = createAsyncAction('POSTS', async (authorId, dispatch, getState) => {
 *   const response = await fetch(`route/to/posts/for/author/${authorId}`);
 *
 *   const posts = await response.json();
 *
 *   return posts;
 * })
 *
 * `fetchPostsActions` is an object with `request, recieve, error, fetch` functions.
 * It will also contain an `actionTypes` object that contains the key: value pair of the generated action names/types
 *
 * Calling `fetchPostsActions.fetch('authorId1')` will dispath the `{ type: 'POSTS_REQUEST', params: 'authorId1' }` action
 * before making the api call. It will then dispatch `{ type: 'POSTS_RECEIVE', results: [...], params: 'authorId1 }` action.
 * If the request fails the `{ type: 'POSTS_FETCH_ERROR, params: 'authorId1', error: ... }` action will be dispatched.
 *
 * @param {String} actionBase The base string for the dispatched action types
 * @param {Function} asyncFn The asynchronous function to be called in the .fetch action
 */
const createAsyncAction = (actionBase = '', asyncFn) => {
  const requestActionType = `${actionBase}_REQUEST`;
  const receiveActionType = `${actionBase}_RECEIVE`;
  const errorActionType = `${actionBase}_FETCH_ERROR`;

  const request = (params) => ({
    type: requestActionType,
    params,
  });

  const receive = (params, results) => ({
    type: receiveActionType,
    params,
    results,
  });

  const error = (params, error) => ({
    type: errorActionType,
    params,
    error,
  });

  const fetch = (params) => async (dispatch, getState) => {
    dispatch(request(params));

    try {
      const result = await asyncFn(params, dispatch, getState);
      dispatch(receive(params, result));
    } catch (e) {
      dispatch(error(params, e));
    }
  };

  return {
    request,
    receive,
    error,
    fetch,
    actionTypes: {
      [requestActionType]: requestActionType,
      [receiveActionType]: receiveActionType,
      [errorActionType]: errorActionType,
    },
  };
};

export default createAsyncAction;
