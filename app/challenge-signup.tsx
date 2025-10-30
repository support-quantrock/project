import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, User, Mail, Phone, DollarSign } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function ChallengeSignup() {
  const { mode } = useLocalSearchParams();
  const isFreeTrial = mode === 'free';
  const isAddFund = mode === 'addfund';

  const freeTrialSizes = [
    { value: '10000', label: '$10,000', popular: true, priceMain: 'Free', priceSub: 'without risking' },
    { value: '7500', label: '$7,500', popular: false, priceMain: 'Free', priceSub: 'without risking' },
    { value: '5000', label: '$5,000', popular: false, priceMain: 'Free', priceSub: 'without risking' },
    { value: '2500', label: '$2,500', popular: false, priceMain: 'Free', priceSub: 'without risking' },
  ];

  const premiumSizes = [
    { value: '100000', label: '$100,000', popular: true, priceMain: 'Free', priceSub: 'without risking' },
    { value: '75000', label: '$75,000', popular: false, priceMain: 'Free', priceSub: 'without risking' },
    { value: '50000', label: '$50,000', popular: false, priceMain: 'Free', priceSub: 'without risking' },
    { value: '25000', label: '$25,000', popular: false, priceMain: 'Free', priceSub: 'without risking' },
    { value: '10000', label: '$10,000', popular: false, priceMain: 'Free', priceSub: 'without risking' },
  ];

  const addFundSizes = [
    { value: '100000', label: '$100,000', popular: true, priceMain: '97$', priceSub: 'one time payment' },
    { value: '75000', label: '$75,000', popular: false, priceMain: '79$', priceSub: 'one time payment' },
    { value: '50000', label: '$50,000', popular: false, priceMain: '69$', priceSub: 'one time payment' },
  ];

  const portfolioSizes = isFreeTrial ? freeTrialSizes : (isAddFund ? addFundSizes : premiumSizes);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioSize: portfolioSizes[0].value,
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Start Your Challenge</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <LinearGradient
          colors={['#1e3a8a', '#1e293b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.formCard}>

          <Text style={styles.formTitle}>🚀 Start Your Trading Simulation</Text>
          <Text style={styles.formSubtitle}>We recommend choosing a trial amount close to what you plan to invest later — it's the safest way to learn how markets work and build confidence without risking real money.{'\n\n'}💼 Select your starting portfolio amount.</Text>

          <View style={styles.portfolioOptions}>
            {portfolioSizes.map((size) => (
              <TouchableOpacity
                key={size.value}
                style={[
                  styles.portfolioOption,
                  formData.portfolioSize === size.value && styles.portfolioOptionActive,
                ]}
                onPress={() => setFormData({ ...formData, portfolioSize: size.value })}>
                {size.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Popular</Text>
                  </View>
                )}
                <View style={styles.portfolioContent}>
                  <Text style={styles.portfolioLabel}>Balance</Text>
                  <Text style={styles.portfolioAmount}>{size.label}</Text>
                </View>
                <View style={styles.portfolioRight}>
                  <Text style={styles.freeText}>{size.priceMain}</Text>
                  <Text style={[styles.priceSubText, isFreeTrial && styles.priceSubTextSmall]}>{size.priceSub}</Text>
                  <View style={[styles.colorCircle, { borderColor: size.popular ? '#a855f7' : '#ef4444' }]}>
                    {formData.portfolioSize === size.value && (
                      <View style={[styles.colorCircleDot, { backgroundColor: size.popular ? '#a855f7' : '#ef4444' }]} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
              {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>I accept the general terms and conditions of use</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, !acceptedTerms && styles.submitButtonDisabled]}
            onPress={() => acceptedTerms && router.push('/dashboard')}
            disabled={!acceptedTerms}
          >
            <Text style={styles.submitButtonText}>{isAddFund ? 'Portfolio deposit' : 'Create portfolio'}</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            By submitting, you agree to our Terms of Service and Privacy Policy. You will receive a confirmation email with next steps.
          </Text>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  formCard: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#fff',
  },
  portfolioOptions: {
    gap: 16,
  },
  portfolioOption: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#7c3aed',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  portfolioOptionActive: {
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    borderColor: '#a855f7',
  },
  popularBadge: {
    position: 'absolute',
    top: -1,
    left: 16,
    backgroundColor: '#7c3aed',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  popularText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  portfolioContent: {
    flex: 1,
  },
  portfolioLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
    marginBottom: 4,
  },
  portfolioAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  portfolioRight: {
    alignItems: 'flex-end',
  },
  freeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  priceSubText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 4,
  },
  priceSubTextSmall: {
    fontSize: 11,
    fontWeight: '500',
  },
  withoutRiskText: {
    fontSize: 14,
    color: '#10b981',
    marginBottom: 6,
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorCircleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  portfolioText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#94a3b8',
    marginLeft: 12,
  },
  portfolioTextActive: {
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#1e293b',
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  disclaimer: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },
  infoCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 8,
  },
  infoInput: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  stepsCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    marginBottom: 20,
  },
  stepsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3b82f6',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
    paddingTop: 4,
  },
});
