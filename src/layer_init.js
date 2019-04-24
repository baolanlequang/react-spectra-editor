import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';

import { resetScanAll } from './actions/scan';
import { initPredictStatus } from './actions/predict';
import LayerPrism from './layer_prism';

const styles = () => ({
});

class LayerInit extends React.Component {
  constructor(props) {
    super(props);

    this.normChange = this.normChange.bind(this);
    this.execReset = this.execReset.bind(this);
  }

  componentDidMount() {
    this.execReset();
  }

  componentDidUpdate(prevProps) {
    this.normChange(prevProps);
  }

  normChange(prevProps) {
    const oldFeat = prevProps.entity.features[0];
    const { entity } = this.props;
    const newFeat = entity.features[0];

    if (oldFeat !== newFeat) {
      this.execReset();
    }
  }

  execReset() {
    const { entity, resetScanAllAct } = this.props;
    const baseFeat = entity.features[0];
    resetScanAllAct(baseFeat);
  }

  render() {
    const {
      entity, cLabel, xLabel, yLabel, operations, predictObj,
      initPredictStatusAct,
    } = this.props;

    const xxLabel = xLabel === '' ? `X (${entity.spectrum.xUnit})` : xLabel;
    const yyLabel = yLabel === '' ? `Y (${entity.spectrum.yUnit})` : yLabel;

    initPredictStatusAct(predictObj.predictions);

    return (
      <LayerPrism
        entity={entity}
        cLabel={cLabel}
        xLabel={xxLabel}
        yLabel={yyLabel}
        predictObj={predictObj}
        operations={operations}
      />
    );
  }
}

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {}
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    resetScanAllAct: resetScanAll,
    initPredictStatusAct: initPredictStatus,
  }, dispatch)
);

LayerInit.propTypes = {
  entity: PropTypes.object.isRequired,
  cLabel: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired,
  predictObj: PropTypes.object.isRequired,
  operations: PropTypes.array.isRequired,
  resetScanAllAct: PropTypes.func.isRequired,
  initPredictStatusAct: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps, mapDispatchToProps,
)(withStyles(styles)(LayerInit));
