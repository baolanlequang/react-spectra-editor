import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import { setUiSweepType } from '../../actions/ui';
import { clearMpyAll } from '../../actions/multiplicity';
import {
  LIST_UI_SWEEP_TYPE,
} from '../../constants/list_ui';
import Cfg from '../../helpers/cfg';
import TriBtn from './tri_btn';

const styles = () => ({
  btn: {
    minWidth: 40,
  },
  btnTxt: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  btnTxtX: {
    marginLeft: 2,
  },
  btnHighlight: {
    backgroundColor: '#2196f3',
    color: '#fff',
    minWidth: 40,
    '&:hover': {
      backgroundColor: '#51c6f3',
    },
  },
  txtField: {
    width: 80,
    margin: '6px 3px 0 3px',
  },
  txtInput: {
    height: 30,
  },
  sweepWrap: {
    border: '1px dashed',
    borderRadius: '5px',
    width: 24,
  },
});

const highlight = (criteria, cls) => (criteria ? cls.btnHighlight : cls.btn);

const Multiplicity = ({
  classes, uiSt, layoutSt, multiplicitySt,
  setUiSweepTypeAct, clearMpyAllAct,
}) => {
  const { sweepType } = uiSt;
  const onSweepMutAdd = () => setUiSweepTypeAct(LIST_UI_SWEEP_TYPE.MULTIPLICITY_SWEEP_ADD);
  const onOneMutAdd = () => setUiSweepTypeAct(LIST_UI_SWEEP_TYPE.MULTIPLICITY_ONE_RM);
  const onPeakMutAdd = () => setUiSweepTypeAct(LIST_UI_SWEEP_TYPE.MULTIPLICITY_PEAK_ADD);
  const onPeakMutRm = () => setUiSweepTypeAct(LIST_UI_SWEEP_TYPE.MULTIPLICITY_PEAK_RM);

  return (
    <span>
      <Tooltip title={<span className="txt-sv-tp">Add Multiplicity</span>}>
        <span>
          <Button
            className={
              highlight(sweepType === LIST_UI_SWEEP_TYPE.MULTIPLICITY_SWEEP_ADD, classes)
            }
            disabled={Cfg.btnCmdMpy(layoutSt)}
            onClick={onSweepMutAdd}
          >
            <span className={classNames(classes.btnTxt, classes.sweepWrap, 'cmd-txt-btn')}>J+</span>
          </Button>
        </span>
      </Tooltip>
      <Tooltip title={<span className="txt-sv-tp">Remove Multiplicity</span>}>
        <span>
          <Button
            className={
              highlight(sweepType === LIST_UI_SWEEP_TYPE.MULTIPLICITY_ONE_RM, classes)
            }
            disabled={Cfg.btnCmdMpy(layoutSt)}
            onClick={onOneMutAdd}
          >
            <span className={classNames(classes.btnTxt, 'cmd-txt-btn')}>J-</span>
          </Button>
        </span>
      </Tooltip>
      <Tooltip title={<span className="txt-sv-tp">Add Peak for Multiplicity</span>}>
        <span>
          <Button
            className={
              highlight(sweepType === LIST_UI_SWEEP_TYPE.MULTIPLICITY_PEAK_ADD, classes)
            }
            disabled={Cfg.btnCmdMpyPeak(layoutSt, multiplicitySt)}
            onClick={onPeakMutAdd}
          >
            <span className={classNames(classes.btnTxt, 'cmd-txt-btn')}>JP+</span>
          </Button>
        </span>
      </Tooltip>
      <Tooltip title={<span className="txt-sv-tp">Remove Peak for Multiplicity</span>}>
        <span>
          <Button
            className={
              highlight(sweepType === LIST_UI_SWEEP_TYPE.MULTIPLICITY_PEAK_REMOVE, classes)
            }
            disabled={Cfg.btnCmdMpyPeak(layoutSt, multiplicitySt)}
            onClick={onPeakMutRm}
          >
            <span className={classNames(classes.btnTxt, 'cmd-txt-btn')}>JP-</span>
          </Button>
        </span>
      </Tooltip>
      <TriBtn
        content={{ tp: 'Clear All Multiplicity' }}
        cb={clearMpyAllAct}
      >
        <span className={classNames(classes.btnTxt, 'cmd-txt-btn')}>J</span>
        <span className={classNames(classes.btnTxtX, 'cmd-txt-btn')}>X</span>
      </TriBtn>
    </span>
  );
};

const mapStateToProps = (state, props) => ( // eslint-disable-line
  {
    uiSt: state.ui,
    layoutSt: state.layout,
    multiplicitySt: state.multiplicity,
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setUiSweepTypeAct: setUiSweepType,
    clearMpyAllAct: clearMpyAll,
  }, dispatch)
);

Multiplicity.propTypes = {
  classes: PropTypes.object.isRequired,
  uiSt: PropTypes.object.isRequired,
  layoutSt: PropTypes.string.isRequired,
  multiplicitySt: PropTypes.object.isRequired,
  setUiSweepTypeAct: PropTypes.func.isRequired,
  clearMpyAllAct: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Multiplicity));

/*
      <Tooltip title={<span className="txt-sv-tp">Select Multiplicity</span>}>
        <span>
          <Button
            className={
              highlight(sweepType === LIST_UI_SWEEP_TYPE.MULTIPLICITY_ONE_CLICK, classes)
            }
            disabled={isDisable}
            onClick={onOneMutClk}
          >
            <span className={classes.btnTxt}>J</span>
            <Icon path={mdiCursorDefaultOutline} size={0.5} color={iconColor} />
          </Button>
        </span>
      </Tooltip>
      <Tooltip title={<span className="txt-sv-tp">Remove Peak for Multiplicity</span>}>
        <span>
          <Button
            className={
              highlight(sweepType === LIST_UI_SWEEP_TYPE.MULTIPLICITY_PEAK_RM, classes)
            }
            disabled={isDisable || isDisablePeak}
            onClick={onPeakMutRm}
          >
            <span className={classes.btnTxt}>JP-</span>
          </Button>
        </span>
      </Tooltip>
*/
