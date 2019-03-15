import * as d3 from 'd3';
import d3Tip from 'd3-tip';

const InitScale = (target, reverse = true) => {
  const xRange = reverse ? [target.w, 0] : [0, target.w];
  const x = d3.scaleLinear()
    .range(xRange);
  const y = d3.scaleLinear()
    .range([target.h, 0]);
  return { x, y };
};

const InitAxisCall = (count) => {
  const yAxisFormat = d3.format('.2n');
  const xAxisCall = d3.axisBottom()
    .ticks(10);
  const yAxisCall = d3.axisLeft()
    .ticks(count)
    .tickFormat(yAxisFormat);
  return { x: xAxisCall, y: yAxisCall };
};

const InitPathCall = (target) => {
  const line = d3.line()
    .x(d => target.scales.x(d.x))
    .y(d => target.scales.y(d.y));
  return line;
};

const tpStyle = () => {
  const stBorder = ' border: 2px solid #aaa;';
  const stBorderRadius = ' border-radius: 5px;';
  const stBackground = ' background: #555;';
  const stColor = ' color: #fff;';
  const stPadding = ' padding: 8px;';
  const stOpacity = ' opacity: 0.9; ';
  const stZindex = ' z-index: 1999;';
  const style = stBorder + stBorderRadius + stBackground + stColor
    + stPadding + stOpacity + stPadding + stZindex;

  return style;
};

const tpDiv = d => (
  `
  <div
    class="peak-tp"
    style="${tpStyle()}"
  >
    <span> x: ${d3.format('.3~s')(d.x)}</span>
    <br/>
    <span> y: ${d3.format('.2~e')(d.y)}</span>
  <div>
  `
);

const InitTip = () => {
  const tip = d3Tip()
    .attr('class', 'd3-tip')
    .html(d => tpDiv(d));
  return tip;
};

export {
  InitScale, InitAxisCall, InitPathCall, InitTip,
};
