import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useState } from 'react';

export default function TimeCommitment() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeOptions = [
    { value: 'high-risk', label: 'I seek the highest returns even if the risks are high.' },
    { value: 'moderate-risk', label: 'I accept some risk to achieve better growth.' },
    { value: 'low-risk', label: 'I prefer safety even if the return is lower.' },
  ];

  const handleContinue = () => {
    router.push('/debt-type');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>
          <Text style={styles.progressCurrent}>14</Text>
          <Text style={styles.progressSeparator}> / </Text>
          <Text style={styles.progressTotal}>21</Text>
        </Text>
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
          Which statement best describes your attitude toward investment risk?
        </Text>

        <View style={styles.optionsContainer}>
          {timeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionCard,
                selectedTime === option.value && styles.optionCardSelected,
              ]}
              onPress={() => setSelectedTime(option.value)}>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedTime && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedTime}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
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
    fontWeight: '500',
  },
  progressCurrent: {
    color: '#9ca3af',
  },
  progressSeparator: {
    color: '#9ca3af',
  },
  progressTotal: {
    color: '#6366f1',
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
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 32,
    lineHeight: 36,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  optionCardSelected: {
    backgroundColor: '#e0e7ff',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 16,
  },
  continueButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
