import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

export default function AgeSelection() {
  const ageGroups = [
    { label: '<30', row: 0, col: 0 },
    { label: '30-39', row: 0, col: 1 },
    { label: '40-49', row: 1, col: 0 },
    { label: '50-59', row: 1, col: 1 },
    { label: '+60', row: 2, col: 0 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.skipText}>2/21</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>⚡ Quantrock</Text>
        <TouchableOpacity onPress={() => router.push('/dashboard')}>
          <ArrowRight size={24} color="#000" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          What is your age?
        </Text>

        <View style={styles.gridContainer}>
          {ageGroups.map((group, index) => (
            <TouchableOpacity
              key={index}
              style={styles.ageCard}
              onPress={() => router.push('/education-level')}>
              <View style={styles.imageCircle}>
                <Text style={styles.imagePlaceholder}>👤</Text>
              </View>
              <View style={styles.ageButton}>
                <ArrowRight size={20} color="#fff" strokeWidth={2} />
                <Text style={styles.ageText}>{group.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree with{'\n'}
            <Text style={styles.link}>Terms and Conditions</Text>,{' '}
            <Text style={styles.link}>Privacy Policy</Text>,{' '}
            <Text style={styles.link}>Subscription Terms</Text>
          </Text>
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
  skipText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  logo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3b82f6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 36,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
  },
  ageCard: {
    alignItems: 'center',
    width: '45%',
    maxWidth: 140,
  },
  imageCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  imagePlaceholder: {
    fontSize: 40,
  },
  ageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    gap: 4,
    width: '100%',
  },
  ageText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 32,
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
});
