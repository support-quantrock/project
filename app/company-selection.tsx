import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useState } from 'react';

export default function CompanySelection() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const companies = [
    { label: 'Netflix', value: 'netflix', emoji: '🎬' },
    { label: 'Microsoft', value: 'microsoft', emoji: '🪟' },
    { label: 'Shell', value: 'shell', emoji: '🐚' },
    { label: 'Tesla', value: 'tesla', emoji: '🚗' },
    { label: 'Apple', value: 'apple', emoji: '🍎' },
    { label: 'Amazon', value: 'amazon', emoji: '📦' },
    { label: 'Bitcoin', value: 'bitcoin', emoji: '₿' },
    { label: 'Google', value: 'google', emoji: 'G' },
    { label: 'McDonalds', value: 'mcdonalds', emoji: 'M' },
    { label: 'Pfizer', value: 'pfizer', emoji: '💊' },
    { label: 'Exxon', value: 'exxon', emoji: '⛽' },
  ];

  const toggleCompany = (value: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(value)
        ? prev.filter((company) => company !== value)
        : [...prev, value]
    );
  };

  const handleContinue = () => {
    router.push('/investment-readiness');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>19/21</Text>
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
          Choose topics you are{'\n'}interested in
        </Text>

        <View style={styles.companiesContainer}>
          <View style={styles.companiesRow}>
            <TouchableOpacity
              style={[
                styles.companyChip,
                selectedCompanies.includes(companies[0].value) && styles.companyChipSelected,
              ]}
              onPress={() => toggleCompany(companies[0].value)}>
              <Text style={styles.companyLabel}>{companies[0].label}</Text>
              <Text style={styles.companyEmoji}>{companies[0].emoji}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.companyChip,
                selectedCompanies.includes(companies[1].value) && styles.companyChipSelected,
              ]}
              onPress={() => toggleCompany(companies[1].value)}>
              <Text style={styles.companyLabel}>{companies[1].label}</Text>
              <Text style={styles.companyEmoji}>{companies[1].emoji}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.companiesRow}>
            <TouchableOpacity
              style={[
                styles.companyChip,
                selectedCompanies.includes(companies[2].value) && styles.companyChipSelected,
              ]}
              onPress={() => toggleCompany(companies[2].value)}>
              <Text style={styles.companyLabel}>{companies[2].label}</Text>
              <Text style={styles.companyEmoji}>{companies[2].emoji}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.companyChip,
                selectedCompanies.includes(companies[3].value) && styles.companyChipSelected,
              ]}
              onPress={() => toggleCompany(companies[3].value)}>
              <Text style={styles.companyLabel}>{companies[3].label}</Text>
              <Text style={styles.companyEmoji}>{companies[3].emoji}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.companyChip,
                selectedCompanies.includes(companies[4].value) && styles.companyChipSelected,
              ]}
              onPress={() => toggleCompany(companies[4].value)}>
              <Text style={styles.companyLabel}>{companies[4].label}</Text>
              <Text style={styles.companyEmoji}>{companies[4].emoji}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.companiesRow}>
            <TouchableOpacity
              style={[
                styles.companyChip,
                selectedCompanies.includes(companies[5].value) && styles.companyChipSelected,
              ]}
              onPress={() => toggleCompany(companies[5].value)}>
              <Text style={styles.companyLabel}>{companies[5].label}</Text>
              <Text style={styles.companyEmoji}>{companies[5].emoji}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.companyChip,
                selectedCompanies.includes(companies[6].value) && styles.companyChipSelected,
              ]}
              onPress={() => toggleCompany(companies[6].value)}>
              <Text style={styles.companyLabel}>{companies[6].label}</Text>
              <Text style={styles.companyEmoji}>{companies[6].emoji}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.companiesRow}>
            <TouchableOpacity
              style={[
                styles.companyChip,
                selectedCompanies.includes(companies[7].value) && styles.companyChipSelected,
              ]}
              onPress={() => toggleCompany(companies[7].value)}>
              <Text style={styles.companyLabel}>{companies[7].label}</Text>
              <Text style={styles.companyEmoji}>{companies[7].emoji}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.companyChip,
                selectedCompanies.includes(companies[8].value) && styles.companyChipSelected,
              ]}
              onPress={() => toggleCompany(companies[8].value)}>
              <Text style={styles.companyLabel}>{companies[8].label}</Text>
              <Text style={styles.companyEmoji}>{companies[8].emoji}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.companiesRow}>
            <TouchableOpacity
              style={[
                styles.companyChip,
                selectedCompanies.includes(companies[9].value) && styles.companyChipSelected,
              ]}
              onPress={() => toggleCompany(companies[9].value)}>
              <Text style={styles.companyLabel}>{companies[9].label}</Text>
              <Text style={styles.companyEmoji}>{companies[9].emoji}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.companyChip,
                selectedCompanies.includes(companies[10].value) && styles.companyChipSelected,
              ]}
              onPress={() => toggleCompany(companies[10].value)}>
              <Text style={styles.companyLabel}>{companies[10].label}</Text>
              <Text style={styles.companyEmoji}>{companies[10].emoji}</Text>
            </TouchableOpacity>
          </View>
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
  companiesContainer: {
    gap: 12,
  },
  companiesRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  companyChip: {
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  companyChipSelected: {
    backgroundColor: '#6366f1',
  },
  companyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  companyEmoji: {
    fontSize: 18,
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
