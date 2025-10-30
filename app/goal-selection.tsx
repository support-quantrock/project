import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

export default function GoalSelection() {
  const goals = [
    { title: 'Enter challenge', icon: '🏆' },
    { title: 'Prepare for real\ntrading', icon: '📈' },
    { title: 'Test my strategy', icon: '🎯' },
    { title: 'Learning and\nbuild skills', icon: '📚' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>12/21</Text>
        <Text style={styles.logo}>⚡ Quantrock</Text>
        <TouchableOpacity onPress={() => router.push('/dashboard')}>
          <ArrowRight size={24} color="#000" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>What is your main goal in trying Quantrock?</Text>
        <Text style={styles.subtitle}>
          Please select your first priority
        </Text>

        <View style={styles.gridContainer}>
          {goals.map((goal, index) => (
            <TouchableOpacity
              key={index}
              style={styles.goalCard}
              onPress={() => router.push('/annual-income')}>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <View style={styles.goalImageContainer}>
                <Text style={styles.goalIcon}>{goal.icon}</Text>
              </View>
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
    width: '4%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    maxWidth: 400,
  },
  goalCard: {
    width: 160,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  goalTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  goalImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  goalIcon: {
    fontSize: 48,
  },
});
