import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import Svg, { Path, Circle } from 'react-native-svg';

function GaugeIcon() {
  return (
    <Svg width="80" height="50" viewBox="0 0 100 60">
      <Path
        d="M 10 50 A 40 40 0 0 1 90 50"
        stroke="#ef4444"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M 50 50 A 40 40 0 0 1 70 30"
        stroke="#fbbf24"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M 70 30 A 40 40 0 0 1 90 50"
        stroke="#22c55e"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <Circle cx="50" cy="50" r="4" fill="#1f2937" />
      <Path
        d="M 50 50 L 30 25"
        stroke="#1f2937"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function IncomeLevel() {
  const incomeLevels = [
    { label: 'Not Stable', value: 'not-stable' },
    { label: 'Stable', value: 'stable' },
    { label: 'Very Stable', value: 'very-stable' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>8/21</Text>
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
          Choose your current{'\n'}income stability
        </Text>

        <View style={styles.optionsContainer}>
          {incomeLevels.map((level, index) => (
            <TouchableOpacity
              key={index}
              style={styles.incomeCard}
              onPress={() => router.push('/credit-card-payment')}>
              <GaugeIcon />
              <Text style={styles.incomeLabel}>{level.label}</Text>
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
    width: '8%',
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
    gap: 16,
  },
  incomeCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 100,
  },
  incomeLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
});
