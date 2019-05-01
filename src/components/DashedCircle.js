import React from 'react';
import { PanResponder } from 'react-native';
import Svg, {
  Path, Circle, G, Text,
} from 'react-native-svg';

// eslint-disable-next-line import/prefer-default-export
export class DashedCircle extends React.PureComponent {
  constructor(props) {
    super(props);

    const { width, height } = props;
    const smallestSide = Math.min(width, height);
    this.state = {
      cx: width / 2,
      cy: height / 2,
      r: (smallestSide / 2) * 0.65,
    };
  }

  componentWillMount=() => {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove,
    });
  }

  polarToCartesian = (angle) => {
    const { cx, cy, r } = this.state;
    const a = (angle - 270) * Math.PI / 180.0;
    const x = cx + (r * Math.cos(a));
    const y = cy + (r * Math.sin(a));
    return { x, y };
  }

  cartesianToPolar=(x, y) => {
    const { cx, cy } = this.state;
    return Math.round((Math.atan((y - cy) / (x - cx))) / (Math.PI / 180) + ((x > cx) ? 270 : 90));
  }

  handlePanResponderMove=({ nativeEvent: { locationX, locationY } }) => {
    this.props.onValueChange(this.cartesianToPolar(locationX, locationY));
  }

  render() {
    const {
      width, height, value, meterColor, textColor,
    } = this.props;
    const { cx, cy, r } = this.state;
    const startCoord = this.polarToCartesian(0);
    const endCoord = this.polarToCartesian(value);

    return (
      <Svg width={width} height={height}>
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="blue"
          strokeWidth={7}
          fill="none"
          strokeDasharray="10,7"
        />
        <Path
          strokeDasharray="10,7"
          stroke={meterColor}
          strokeWidth={7}
          fill="none"
          d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${value > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`}
        />
        <G x={endCoord.x - 7.5} y={endCoord.y - 7.5}>
          <Circle cx={7.5} cy={7.5} r={10} fill={meterColor} {...this._panResponder.panHandlers} />
        </G>
        <Text x={cx} y={cy} fontSize={10} fill={textColor} textAnchor="middle">Time Left</Text>
        <Text key={`${value}`} x={cx} y={cy + 20} fontSize={16} fill={textColor} textAnchor="middle">{`${value}`}</Text>
      </Svg>
    );
  }
}
