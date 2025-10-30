import { View, Text, StyleSheet } from 'react-native';

export default function OffersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Offers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
});
