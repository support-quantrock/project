import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, ThumbsUp } from 'lucide-react-native';
import { useState } from 'react';

export default function InvestmentReadiness() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const ratings = [
    { value: 1, emoji: '👍', label: "I'm totally prepared" },
    { value: 2, emoji: '👍', label: '' },
    { value: 3, emoji: '😐', label: '' },
    { value: 4, emoji: '👎', label: '' },
    { value: 5, emoji: '👎', label: 'I need more information' },
  ];

  const handleContinue = () => {
    router.push('/passive-income-knowledge');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>
          <Text style={styles.progressCurrent}>20</Text>
          <Text style={styles.progressSeparator}>/</Text>
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
          Rate your readiness{'\n'}to invest
        </Text>

        <View style={styles.ratingsContainer}>
          {ratings.map((rating) => (
            <TouchableOpacity
              key={rating.value}
              style={[
                styles.ratingButton,
                (rating.value === 2 || rating.value === 4) && styles.ratingButtonSmall,
                selectedRating === rating.value && styles.ratingButtonSelected,
              ]}
              onPress={() => setSelectedRating(rating.value)}>
              <Text style={[
                styles.emoji,
                (rating.value === 2 || rating.value === 4) && styles.emojiSmall
              ]}>{rating.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.labelsContainer}>
          <Text style={styles.labelLeft}>{ratings[0].label}</Text>
          <Text style={styles.labelRight}>{ratings[4].label}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedRating && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedRating}>
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
    flexDirection: 'row',
  },
  progressFill: {
    height: '100%',
    width: '60%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 36,
  },
  ratingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  ratingButton: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 68,
  },
  ratingButtonSmall: {
    maxWidth: 54,
  },
  ratingButtonSelected: {
    backgroundColor: '#e0e7ff',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  emoji: {
    fontSize: 32,
  },
  emojiSmall: {
    fontSize: 24,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  labelLeft: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    maxWidth: '45%',
  },
  labelRight: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    maxWidth: '45%',
    textAlign: 'right',
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
