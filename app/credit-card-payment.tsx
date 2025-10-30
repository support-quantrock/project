import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

export default function CreditCardPayment() {
  const frequencyOptions = [
    { label: 'Sell immediately', value: 'sell-immediately' },
    { label: 'Reduce and wait', value: 'reduce-and-wait' },
    { label: 'Do nothing', value: 'do-nothing' },
    { label: 'Buy more', value: 'buy-more' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>9/21</Text>
        <Text style={styles.logo}>⚡ Quantrock</Text>
        <TouchableOpacity onPress={() => router.push('/dashboard')}>
          <ArrowRight size={24} color="#000" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          What you will do if your portfolio dropped down by 20%?
        </Text>

        <View style={styles.optionsContainer}>
          {frequencyOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionCard}
              onPress={() => router.push('/credit-card-frequency')}>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  progressText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  logo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3b82f6',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '24%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 36,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 20,
    minHeight: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
});
