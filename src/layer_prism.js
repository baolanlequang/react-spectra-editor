import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import PanelViewer from './components/panel/index';
import CmdBar from './components/cmd_bar/index';
import LayerContent from './layer_content';
import { LIST_UI_VIEWER_TYPE } from './constants/list_ui';
import { extractParams } from './helpers/extractParams';

const styles = () => ({
});

const LayerPrism = ({
  entity, cLabel, xLabel, yLabel, operations, forecast,
  thresSt, scanSt, uiSt,
}) => {
  const { topic, feature, hasEdit } = extractParams(entity, thresSt, scanSt);
  if (!topic) return null;

  const { viewer } = uiSt;
  if (viewer === LIST_UI_VIEWER_TYPE.ANALYSIS) {
    return (
      <div>
        <CmdBar
          feature={feature}
          hasEdit={hasEdit}
          operations={operations}
        />
        <div className="react-spectrum-editor">
          <Grid container>
            <Grid item xs={12}>
              <LayerContent
                topic={topic}
                feature={feature}
                cLabel={cLabel}
                xLabel={xLabel}
                yLabel={yLabel}
                forecast={forecast}
                operations={operations}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CmdBar
        feature={feature}
        hasEdit={hasEdit}
        operations={operations}
      />
      <div className="react-spectrum-editor">
        <Grid container>
          <Grid item xs={9}>
            <LayerContent
              topic={topic}
              feature={feature}
              cLabel={cLabel}
              xLabel={xLabel}
              yLabel={yLabel}
              forecast={forecast}
              operations={operations}
            />
          </Grid>
          <Grid item xs={3} align="center">
            <PanelViewer
              feature={feature}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    scanSt: state.scan,
    thresSt: state.threshold,
    uiSt: state.ui,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

LayerPrism.propTypes = {
  entity: PropTypes.object.isRequired,
  cLabel: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired,
  forecast: PropTypes.object.isRequired,
  operations: PropTypes.array.isRequired,
  thresSt: PropTypes.object.isRequired,
  scanSt: PropTypes.object.isRequired,
  uiSt: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps, mapDispatchToProps,
)(withStyles(styles)(LayerPrism));
