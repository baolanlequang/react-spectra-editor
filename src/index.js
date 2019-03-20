import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import PropTypes from 'prop-types';

import 'regenerator-runtime/runtime'; // eslint-disable-line
import createSagaMiddleware from 'redux-saga';
// import { logger } from 'redux-logger';

import reducers from './reducers/index';
import sagas from './sagas/index';
import Frame from './frame';
import FN from './fn';

// - - - store & middleware - - -
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]; // logger

const store = compose(
  applyMiddleware(...middlewares),
)(createStore)(reducers);

sagaMiddleware.run(sagas);

// - - - React - - -
const SpectraViewer = ({
  entity, cLabel, xLabel, yLabel, operations, predictObj,
}) => (
  <Provider store={store}>
    <Frame
      entity={entity}
      cLabel={cLabel}
      xLabel={xLabel}
      yLabel={yLabel}
      predictObj={predictObj}
      operations={operations}
    />
  </Provider>
);

SpectraViewer.propTypes = {
  entity: PropTypes.object.isRequired,
  cLabel: PropTypes.string,
  xLabel: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired,
  predictObj: PropTypes.object,
  operations: PropTypes.array,
};


SpectraViewer.defaultProps = {
  cLabel: '',
  predictObj: {},
  operations: [],
};

export {
  SpectraViewer, FN,
};
