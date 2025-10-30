import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

export default function SavingHabit() {
  const savingOptions = [
    {
      label: 'I want to save\n,money\nbut I can\'t',
      value: 'want_but_cant',
      emoji: '😞',
    },
    {
      label: "I don't save\nmoney",
      value: 'dont_save',
      emoji: '😐',
    },
    {
      label: 'I try to save\nmoney\nall the time',
      value: 'save_all_time',
      emoji: '😌',
    },
    {
      label: 'I save money\nsometimes',
      value: 'save_sometimes',
      emoji: '🙂',
    },
  ];

  const handleOptionPress = (value: string) => {
    // TODO: Save selection to Supabase if needed
    router.push('/company-selection');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>18/21</Text>
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
          Do you have a habit{'\n'}of saving money?
        </Text>

        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => handleOptionPress(savingOptions[0].value)}>
              <Text style={styles.emoji}>{savingOptions[0].emoji}</Text>
              <Text style={styles.optionLabel}>{savingOptions[0].label}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => handleOptionPress(savingOptions[1].value)}>
              <Text style={styles.emoji}>{savingOptions[1].emoji}</Text>
              <Text style={styles.optionLabel}>{savingOptions[1].label}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => handleOptionPress(savingOptions[2].value)}>
              <Text style={styles.emoji}>{savingOptions[2].emoji}</Text>
              <Text style={styles.optionLabel}>{savingOptions[2].label}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => handleOptionPress(savingOptions[3].value)}>
              <Text style={styles.emoji}>{savingOptions[3].emoji}</Text>
              <Text style={styles.optionLabel}>{savingOptions[3].label}</Text>
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
    width: '100%',
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
