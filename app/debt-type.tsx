import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, Hop as Home, Car, GraduationCap, CreditCard } from 'lucide-react-native';

export default function DebtType() {
  const debtOptions = [
    {
      label: 'Mortgage',
      value: 'mortgage',
      icon: Home,
    },
    {
      label: 'Auto loan',
      value: 'auto_loan',
      icon: Car,
    },
    {
      label: 'Student loan',
      value: 'student_loan',
      icon: GraduationCap,
    },
    {
      label: 'Credit card debt',
      value: 'credit_card_debt',
      icon: CreditCard,
    },
    {
      label: "I don't have any debts",
      value: 'no_debts',
      icon: null,
    },
  ];

  const handleOptionPress = (value: string) => {
    // TODO: Save selection to Supabase if needed
    router.push('/financial-stress');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>15/21</Text>
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
        <Text style={styles.title}>What is your largest debt?</Text>
        <Text style={styles.subtitle}>.Please specify the debt type</Text>

        <View style={styles.optionsContainer}>
          {debtOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionCard}
              onPress={() => handleOptionPress(option.value)}>
              <View style={styles.iconContainer}>
                {option.icon ? (
                  <option.icon size={48} color="#4b5563" strokeWidth={1.5} />
                ) : (
                  <Text style={styles.eyesEmoji}>👀</Text>
                )}
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    width: '92%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyesEmoji: {
    fontSize: 48,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
});
