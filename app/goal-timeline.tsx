import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useState } from 'react';

export default function GoalTimeline() {
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);

  const timelines = [
    { value: 'less-than-3', label: 'Less than 3 years' },
    { value: '3-to-5', label: 'From 3 to 5 years' },
    { value: 'more-than-5', label: 'More than 5 years' },
  ];

  const handleContinue = () => {
    router.push('/financial-planning-knowledge');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>
          <Text style={styles.progressCurrent}>5</Text>
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
        <Text style={styles.title}>When you will need to use your invested money?</Text>

        <View style={styles.timelinesContainer}>
          {timelines.map((timeline) => (
            <TouchableOpacity
              key={timeline.value}
              style={[
                styles.timelineCard,
                selectedTimeline === timeline.value && styles.timelineCardSelected,
              ]}
              onPress={() => setSelectedTimeline(timeline.value)}>
              <Text style={styles.timelineLabel}>{timeline.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedTimeline && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedTimeline}>
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
  },
  timelinesContainer: {
    gap: 16,
  },
  timelineCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  timelineCardSelected: {
    backgroundColor: '#e0e7ff',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  timelineLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
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
