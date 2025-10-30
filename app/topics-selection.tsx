import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useState } from 'react';

export default function TopicsSelection() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const topics = [
    { label: 'Stocks', value: 'stocks' },
    { label: 'Crypto', value: 'crypto' },
    { label: 'ETFs', value: 'etfs' },
    { label: 'Bonds', value: 'bonds' },
    { label: 'Real Estate', value: 'real_estate' },
  ];

  const toggleTopic = (value: string) => {
    setSelectedTopics((prev) =>
      prev.includes(value)
        ? prev.filter((topic) => topic !== value)
        : [...prev, value]
    );
  };

  const handleContinue = () => {
    // TODO: Save selected topics to Supabase if needed
    router.push('/goal-selection');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>
          <Text style={styles.progressCurrent}>11</Text>
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
          Which asset classes do you prefer to invest in?
        </Text>

        <View style={styles.topicsContainer}>
          {topics.map((topic) => (
            <TouchableOpacity
              key={topic.value}
              style={[
                styles.topicChip,
                selectedTopics.includes(topic.value) && styles.topicChipSelected,
              ]}
              onPress={() => toggleTopic(topic.value)}>
              <Text
                style={[
                  styles.topicLabel,
                  selectedTopics.includes(topic.value) && styles.topicLabelSelected,
                ]}>
                {topic.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
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
    marginBottom: 32,
    lineHeight: 36,
  },
  topicsContainer: {
    gap: 12,
  },
  topicsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  topicChip: {
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 16,
    minWidth: 100,
  },
  topicChipWide: {
    minWidth: 140,
  },
  topicChipFull: {
    flex: 1,
    alignItems: 'center',
  },
  topicChipSelected: {
    backgroundColor: '#6366f1',
  },
  topicLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  topicLabelSelected: {
    color: '#fff',
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
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
