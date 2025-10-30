import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Check, Star } from 'lucide-react-native';
import { useState, useEffect } from 'react';

export default function CraftingExperience() {
  const [progress, setProgress] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(50);
    }, 500);

    const questionTimer = setTimeout(() => {
      setShowQuestion(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(questionTimer);
    };
  }, []);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          We are crafting your{'\n'}...learning experience
        </Text>

        <View style={styles.statusContainer}>
          <View style={styles.statusHeader}>
            <Check size={24} color="#10b981" strokeWidth={3} />
            <Text style={styles.statusLabel}>Goals</Text>
          </View>

          <View style={styles.progressSection}>
            <Text style={styles.progressText}>50%</Text>
            <View style={styles.progressInfo}>
              <Text style={styles.progressLabel}>Setting skills to improve</Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {showQuestion && (
        <View style={styles.questionContainer}>
          <Text style={styles.questionPrompt}>To move forward, specify</Text>
          <Text style={styles.questionText}>
            Are you familiar with investing and{'\n'}stock markets?
          </Text>

          <View style={styles.answersContainer}>
            <TouchableOpacity
              style={[
                styles.answerButton,
                selectedAnswer === 'yes' && styles.answerButtonSelected,
              ]}
              onPress={() => handleAnswer('yes')}>
              <Text style={styles.answerText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.answerButton,
                selectedAnswer === 'no' && styles.answerButtonSelected,
              ]}
              onPress={() => handleAnswer('no')}>
              <Text style={styles.answerText}>No</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialProof}>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={20} color="#fbbf24" fill="#fbbf24" strokeWidth={0} />
              ))}
            </View>
            <Text style={styles.socialProofText}>285K+ people choose us</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 36,
  },
  statusContainer: {
    gap: 24,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressSection: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    minWidth: 50,
  },
  progressInfo: {
    flex: 1,
    gap: 12,
  },
  progressLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  questionPrompt: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  answersContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  answerButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  answerButtonSelected: {
    backgroundColor: '#e0e7ff',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  answerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  socialProof: {
    alignItems: 'center',
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  socialProofText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
});
