/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import { DashedCircle } from './src/components/DashedCircle';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slider2: 270,
    };
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DashedCircle
          width={300}
          height={300}
          meterColor="green"
          textColor="#000"
          value={this.state.slider2}
          onValueChange={value => this.setState({ slider2: value })}
        />
      </View>
    );
  }
}
