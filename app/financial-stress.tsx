import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

export default function FinancialStress() {
  const stressOptions = [
    {
      label: "I'm anxious\nabout it most\nof the time",
      value: 'anxious_most_time',
      emoji: '🤕',
    },
    {
      label: 'I feel stressed\nall the time',
      value: 'stressed_all_time',
      emoji: '😐',
    },
    {
      label: 'I rarely feel\nstressed about\nmoney',
      value: 'rarely_stressed',
      emoji: '😌',
    },
    {
      label: 'I worry about\nfinancial\nsituation\nsometimes',
      value: 'worry_sometimes',
      emoji: '😳',
    },
  ];

  const handleOptionPress = (value: string) => {
    // TODO: Save selection to Supabase if needed
    router.push('/retirement-planning');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>16/21</Text>
        <Text style={styles.logo}>⚡ Quantrock</Text>
        <TouchableOpacity onPress={() => router.push('/dashboard')}>
          <ArrowRight size={24} color="#000" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          How often do you feel{'\n'}stressed about your{'\n'}financial situation?
        </Text>

        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => handleOptionPress(stressOptions[0].value)}>
              <Text style={styles.emoji}>{stressOptions[0].emoji}</Text>
              <Text style={styles.optionLabel}>{stressOptions[0].label}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => handleOptionPress(stressOptions[1].value)}>
              <Text style={styles.emoji}>{stressOptions[1].emoji}</Text>
              <Text style={styles.optionLabel}>{stressOptions[1].label}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => handleOptionPress(stressOptions[2].value)}>
              <Text style={styles.emoji}>{stressOptions[2].emoji}</Text>
              <Text style={styles.optionLabel}>{stressOptions[2].label}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => handleOptionPress(stressOptions[3].value)}>
              <Text style={styles.emoji}>{stressOptions[3].emoji}</Text>
              <Text style={styles.optionLabel}>{stressOptions[3].label}</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 16,
  },
  progressText: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '500',
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6366f1',
  },
  progressBarContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '96%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 36,
  },
  optionsContainer: {
    gap: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  optionCard: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 20,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    lineHeight: 18,
  },
});
