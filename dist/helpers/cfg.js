'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _format = require('./format');

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var btnCmdAnaViewer = function btnCmdAnaViewer(layoutSt) {
  return _format2.default.isMsLayout(layoutSt) || _format2.default.isRamanLayout(layoutSt) || _format2.default.is19FLayout(layoutSt) || _format2.default.isUvVisLayout(layoutSt) || _format2.default.isHplcUvVisLayout(layoutSt) || _format2.default.isTGALayout(layoutSt) || _format2.default.isXRDLayout(layoutSt) || _format2.default.is31PLayout(layoutSt) || _format2.default.is15NLayout(layoutSt) || _format2.default.is29SiLayout(layoutSt) || _format2.default.isCyclicVoltaLayout(layoutSt) || _format2.default.isCDSLayout(layoutSt) || _format2.default.isSECLayout(layoutSt);
};

var hideCmdAnaViewer = function hideCmdAnaViewer() {
  return false;
};

var btnCmdAddPeak = function btnCmdAddPeak(layoutSt) {
  return _format2.default.isMsLayout(layoutSt);
};

var btnCmdRmPeak = function btnCmdRmPeak(layoutSt) {
  return _format2.default.isMsLayout(layoutSt);
};

var btnCmdSetRef = function btnCmdSetRef(layoutSt) {
  return !_format2.default.isNmrLayout(layoutSt);
};

var btnCmdIntg = function btnCmdIntg(layoutSt) {
  return !(_format2.default.isNmrLayout(layoutSt) || _format2.default.isHplcUvVisLayout(layoutSt));
};

var btnCmdMpy = function btnCmdMpy(layoutSt) {
  return !_format2.default.isNmrLayout(layoutSt);
};

var btnCmdMpyPeak = function btnCmdMpyPeak(layoutSt, mpySt) {
  var smExtext = mpySt.smExtext;

  return btnCmdMpy(layoutSt) || !smExtext;
};

var hideCmdThres = function hideCmdThres(layoutSt) {
  return _format2.default.isMsLayout(layoutSt);
};

var btnCmdThres = function btnCmdThres(thresVal) {
  return !thresVal;
};

// const hidePanelPeak = layoutSt => Format.isMsLayout(layoutSt);
var hidePanelPeak = function hidePanelPeak(layoutSt) {
  return !_format2.default.isSECLayout(layoutSt);
}; // eslint-disable-line

var hidePanelMpy = function hidePanelMpy(layoutSt) {
  return !_format2.default.isNmrLayout(layoutSt);
};

var hidePanelCompare = function hidePanelCompare(layoutSt) {
  return !(_format2.default.isIrLayout(layoutSt) || _format2.default.isHplcUvVisLayout(layoutSt) || _format2.default.isXRDLayout(layoutSt));
};

var hideSolvent = function hideSolvent(layoutSt) {
  return !_format2.default.isNmrLayout(layoutSt);
};

var showTwoThreshold = function showTwoThreshold(layoutSt) {
  return _format2.default.isCyclicVoltaLayout(layoutSt);
};

var hidePanelCyclicVolta = function hidePanelCyclicVolta(layoutSt) {
  return !_format2.default.isCyclicVoltaLayout(layoutSt);
};

var Config = {
  btnCmdAnaViewer: btnCmdAnaViewer,
  hideCmdAnaViewer: hideCmdAnaViewer,
  btnCmdAddPeak: btnCmdAddPeak,
  btnCmdRmPeak: btnCmdRmPeak,
  btnCmdSetRef: btnCmdSetRef,
  btnCmdIntg: btnCmdIntg,
  btnCmdMpy: btnCmdMpy,
  btnCmdMpyPeak: btnCmdMpyPeak,
  hideCmdThres: hideCmdThres,
  btnCmdThres: btnCmdThres,
  hidePanelPeak: hidePanelPeak,
  hidePanelMpy: hidePanelMpy,
  hidePanelCompare: hidePanelCompare,
  hideSolvent: hideSolvent,
  showTwoThreshold: showTwoThreshold,
  hidePanelCyclicVolta: hidePanelCyclicVolta
};

exports.default = Config;