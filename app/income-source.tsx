import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, Briefcase, TrendingUp } from 'lucide-react-native';

export default function IncomeSource() {
  const incomeSources = [
    { label: 'Employee', icon: '💼' },
    { label: 'Business Owner /\nSelf-Employed', icon: '💼' },
    { label: 'Retired', icon: '🏖️' },
    { label: 'Student', icon: '🎓' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>7/21</Text>
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
          What is your current{'\n'}income source?
        </Text>

        <View style={styles.optionsContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.sourceCard}
              onPress={() => router.push('/income-level')}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconEmoji}>{incomeSources[0].icon}</Text>
              </View>
              <Text style={styles.sourceLabel}>{incomeSources[0].label}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sourceCard}
              onPress={() => router.push('/income-level')}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconEmoji}>{incomeSources[1].icon}</Text>
              </View>
              <Text style={styles.sourceLabel}>{incomeSources[1].label}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.sourceCard}
              onPress={() => router.push('/income-level')}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconEmoji}>{incomeSources[2].icon}</Text>
              </View>
              <Text style={styles.sourceLabel}>{incomeSources[2].label}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sourceCard}
              onPress={() => router.push('/income-level')}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconEmoji}>{incomeSources[3].icon}</Text>
              </View>
              <Text style={styles.sourceLabel}>{incomeSources[3].label}</Text>
            </TouchableOpacity>
          </View>
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
    width: '16%',
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
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  sourceCard: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },
  sourceCardWide: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 100,
    gap: 24,
  },
  iconContainer: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 64,
  },
  sourceLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    lineHeight: 18,
  },
  sourceLabelWide: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
});
