import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, User, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TradingPlan() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>⚡ Quantrock</Text>
        <TouchableOpacity onPress={() => router.push('/dashboard')}>
          <ArrowRight size={24} color="#000" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
        <Text style={styles.titleBold}>Rate your level of investment experience.</Text>
        <Text style={styles.titleNormal}>This assessment will determine the investment plan and risk level suitable for you.</Text>
        <Text style={styles.subtitle}>:Select your gender</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => router.push('/age-selection')}>
            <View style={styles.imageContainer}>
              <View style={[styles.imageCircle, styles.imageCircleMale]}>
                <User size={80} color="#22c55e" strokeWidth={2} />
              </View>
            </View>
            <LinearGradient
              colors={['#22c55e', '#16a34a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.optionButton}>
              <ArrowRight size={20} color="#fff" strokeWidth={3} />
              <Text style={styles.optionText}>MALE</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => router.push('/age-selection')}>
            <View style={styles.imageContainer}>
              <View style={[styles.imageCircle, styles.imageCircleFemale]}>
                <Users size={80} color="#3b82f6" strokeWidth={2} />
              </View>
            </View>
            <LinearGradient
              colors={['#3b82f6', '#2563eb']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.optionButton}>
              <ArrowRight size={20} color="#fff" strokeWidth={3} />
              <Text style={styles.optionText}>FEMALE</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By clicking "Male" or "Female", you agree with{' '}
            <Text style={styles.link}>Terms and Conditions</Text>,{' '}
            <Text style={styles.link}>Privacy Policy</Text>,{' '}
            <Text style={styles.link}>Subscription Terms</Text>
          </Text>
          <Text style={styles.copyright}>
            Copyright © 2024. <Text style={styles.link}>Quantrock</Text>
          </Text>
          <Text style={styles.copyright}>All Rights Reserved.</Text>
        </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  titleBold: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  titleNormal: {
    fontSize: 13,
    fontWeight: '400',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  optionCard: {
    alignItems: 'center',
    maxWidth: 150,
  },
  imageContainer: {
    marginBottom: 12,
  },
  imageCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageCircleMale: {
    borderColor: '#22c55e',
  },
  imageCircleFemale: {
    borderColor: '#3b82f6',
  },
  imagePlaceholder: {
    fontSize: 64,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    minWidth: 140,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  footer: {
    marginTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 8,
  },
  footerText: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 12,
  },
  link: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  copyright: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },
});
