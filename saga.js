const { all, call, fork, join, put, select, take } = require('redux-saga/effects');
const { delay } = require('redux-saga');

const errorAction = payload => ({
  type: 'error',
  payload,
});

function* main(shouldFork) {
  try {
    yield call(guts, shouldFork);
  } catch(e) {
    console.log('caught')
    yield put(errorAction(e.message));
  }
}

function* guts(shouldFork) {
  if (shouldFork) {
    yield fork(rejectedPromise);
  } else {
    yield call(rejectedPromise);
  }
}

function rejectedPromise() {
  return new Promise((resolve, reject) => {
    reject(new Error("Error from forked task"));
  });
}

module.exports = main;
module.exports.errorAction = errorAction;
