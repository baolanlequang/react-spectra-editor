import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import PanelViewer from './components/panel/index';
import Content from './content';

const styles = () => ({
});

const extractMs = feature => (
  {
    topic: feature.data[0],
    feature,
    hasEdit: false,
  }
);

const extractNmrIr = (entity, managerSt) => {
  const { spectrum, features } = entity;
  const [peakAll, peakEdit] = features;
  const hasEdit = peakEdit && peakEdit.data
    ? peakEdit.data[0].x.length > 0
    : false;

  const feature = hasEdit && managerSt.isEdit ? peakEdit : peakAll;
  return { topic: spectrum.data[0], feature, hasEdit };
};

const extract = (entity, managerSt, scanSt) => {
  const defaultIdx = entity.features[0].scanTarget || 1;
  const idx = scanSt.target || defaultIdx;
  const feature = entity.features[idx - 1];
  if (!feature) return {};
  const layout = feature.dataType;
  const isMS = layout === 'MASS SPECTRUM';
  return isMS
    ? extractMs(feature)
    : extractNmrIr(entity, managerSt);
};

const Frame = ({
  entity, cLabel, xLabel, yLabel, operations, predictObj,
  managerSt, scanSt,
}) => {
  const { topic, feature, hasEdit } = extract(entity, managerSt, scanSt);

  if (!topic) return null;

  return (
    <div className="react-spectrum-viewer">
      <Grid container>
        <Grid item xs={9}>
          <Content
            topic={topic}
            feature={feature}
            cLabel={cLabel}
            xLabel={xLabel}
            yLabel={yLabel}
            predictObj={predictObj}
          />
        </Grid>
        <Grid item xs={3} align="center">
          <PanelViewer
            feature={feature}
            hasEdit={hasEdit}
            operations={operations}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    scanSt: state.scan,
    managerSt: state.manager,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

Frame.propTypes = {
  entity: PropTypes.object.isRequired,
  cLabel: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired,
  predictObj: PropTypes.object.isRequired,
  operations: PropTypes.array.isRequired,
  managerSt: PropTypes.object.isRequired,
  scanSt: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps, mapDispatchToProps,
)(withStyles(styles)(Frame));
