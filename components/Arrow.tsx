import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface ArrowProps {
  width?: number;
  height?: number;
  style?: ViewStyle;
}

export default function Arrow({ width = 200, height = 60, style }: ArrowProps) {
  return (
    <View style={[styles.arrow, { width, height }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 200 60" preserveAspectRatio="none">
        <Path
          d="M0 30 L160 30 M140 10 L170 30 L140 50"
          stroke="#3b82f6"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    width: 200,
    height: 60,
  },
});
