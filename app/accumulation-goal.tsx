import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useState } from 'react';

export default function AccumulationGoal() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goals = [
    { value: 'capital-growth', label: 'Capital growth' },
    { value: 'extra-income', label: 'Extra income' },
    { value: 'secure-capital', label: 'Secure capital' },
  ];

  const handleContinue = () => {
    router.push('/goal-timeline');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>
          <Text style={styles.progressCurrent}>4</Text>
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

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          What is your main goal from investing?
        </Text>


        <View style={styles.goalsContainer}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.value}
              style={[
                styles.goalCard,
                selectedGoal === goal.value && styles.goalCardSelected,
              ]}
              onPress={() => setSelectedGoal(goal.value)}>
              <Text style={styles.goalLabel}>{goal.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedGoal && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedGoal}>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 15,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  goalsContainer: {
    gap: 16,
  },
  goalCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  goalCardSelected: {
    backgroundColor: '#e0e7ff',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  goalEmoji: {
    fontSize: 48,
  },
  goalLabel: {
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
