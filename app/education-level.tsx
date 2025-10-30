import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

export default function EducationLevel() {
  const educationOptions = [
    {
      label: 'High school or below',
      value: 'high_school',
    },
    {
      label: 'University degree',
      value: 'university',
    },
    {
      label: 'Postgraduate studies',
      value: 'postgraduate',
    },
  ];

  const handleOptionPress = (value: string) => {
    router.push('/accumulation-goal');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>3/21</Text>
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
          What is your current{'\n'}education level?
        </Text>

        <View style={styles.optionsContainer}>
          {educationOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionCard}
              onPress={() => handleOptionPress(option.value)}>
              <Text style={styles.optionLabel}>{option.label}</Text>
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
    width: '15%',
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
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    minHeight: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
});
