const { expectSaga } = require('redux-saga-test-plan');
const saga = require('./saga');
const { errorAction } = require('./saga');

describe('saga', () => {
  it('catches the error', () => {
    return expectSaga(saga)
      .put(errorAction('Error from forked task'))
      .run();
  });

  it("should catch the error, but doesn't do it in time", () => {
    return expectSaga(saga, true)
      .put(errorAction('Error from forked task'))
      .run();
  });
});
