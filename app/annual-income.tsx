import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

export default function AnnualIncome() {
  const incomeRanges = [
    { label: '$10,000', value: '10000' },
    { label: '$25,000', value: '25000' },
    { label: '$50,000', value: '50000' },
    { label: '$100,000', value: '100000' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>13/21</Text>
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
          What is your preferred size for the demo portfolio?
        </Text>

        <View style={styles.optionsContainer}>
          {incomeRanges.map((range, index) => (
            <TouchableOpacity
              key={index}
              style={styles.incomeCard}
              onPress={() => router.push('/time-commitment')}>
              <Text style={styles.incomeLabel}>{range.label}</Text>
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
    width: '12%',
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
  incomeCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
  },
  incomeLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
});
