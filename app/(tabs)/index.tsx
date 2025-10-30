import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Timer, Check, Zap, ChevronDown, Search, Star, Bell, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [isFirstCardExpanded, setIsFirstCardExpanded] = useState(false);
  const [isSecondCardExpanded, setIsSecondCardExpanded] = useState(false);

  const firstCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(isFirstCardExpanded ? 2000 : 0, { duration: 300 }),
      opacity: withTiming(isFirstCardExpanded ? 1 : 0, { duration: 300 }),
      overflow: 'hidden',
    };
  });

  const secondCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(isSecondCardExpanded ? 2000 : 0, { duration: 300 }),
      opacity: withTiming(isSecondCardExpanded ? 1 : 0, { duration: 300 }),
      overflow: 'hidden',
    };
  });

  const firstArrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isFirstCardExpanded ? '180deg' : '0deg', { duration: 300 }) }],
    };
  });

  const secondArrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isSecondCardExpanded ? '180deg' : '0deg', { duration: 300 }) }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.avatarButton}>
            <View style={styles.avatar}>
              <User size={24} color="#fff" strokeWidth={2} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Star size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>

      <View style={styles.card}>
        <LinearGradient
          colors={['#065f46', '#064e3b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}>
          <View style={[styles.iconContainer, styles.iconContainerGreen]}>
            <Timer size={28} color="#22c55e" strokeWidth={2} />
          </View>

          <Text style={styles.cardTitle}>Free Trial</Text>
          <Text style={[styles.cardSubtitle, styles.cardSubtitleGreen]}>Master Your Skills</Text>

          <Text style={[styles.cardDescription, styles.cardDescriptionWhite]}>
            Start investing risk-free with a free demo account designed specifically for beginners, university, and high-school students to practice trading in a professional simulation environment, and become eligible to move up to the Challenge Stage and upgrade to Premium Pro Membership.
          </Text>

          <View style={[styles.highlightBox, styles.highlightBoxGreen]}>
            <Text style={styles.highlightTitle}>Start Now:</Text>
            <View style={styles.highlightItem}>
              <Check size={16} color="#22c55e" strokeWidth={3} />
              <Text style={styles.highlightText}>Trade anytime</Text>
            </View>
            <View style={styles.highlightItem}>
              <Check size={16} color="#22c55e" strokeWidth={3} />
              <Text style={styles.highlightText}>Choose the portfolio size that suits you</Text>
            </View>
            <View style={styles.highlightItem}>
              <Check size={16} color="#22c55e" strokeWidth={3} />
              <Text style={styles.highlightText}>Enjoy a 30-day intensive hands-on experience</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => setIsFirstCardExpanded(!isFirstCardExpanded)}>
            <Text style={styles.expandButtonText}>Stage Requirements:</Text>
            <Animated.View style={firstArrowAnimatedStyle}>
              <ChevronDown size={24} color="#22c55e" strokeWidth={2} />
            </Animated.View>
          </TouchableOpacity>

          <Animated.View style={firstCardAnimatedStyle}>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Begin trading at any time (no fixed start date)</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Select portfolio size: $10,000 – $50,000 – $100,000</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Daily loss limit: 5%</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Total loss limit: 10%</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Profit threshold: 6% → victory to the top performer</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Maximum symbol weight: 10% of total portfolio.</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Minimum of 30 executed trades</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Required instruments: S&P 500 / Gold / Major Currencies / Bitcoin</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#22c55e" strokeWidth={3} />
                <Text style={styles.featureText}>Account leverage: 1:1</Text>
              </View>
            </View>
          </Animated.View>

          <TouchableOpacity style={[styles.button, styles.buttonGreen]} onPress={() => router.push('/challenge-signup?mode=free')}>
            <Text style={styles.buttonText}>Start Free Trial</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.card}>
        <LinearGradient
          colors={['#7c3aed', '#4c1d95']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}>
          <View style={[styles.iconContainer, styles.iconContainerPurple]}>
            <Zap size={28} color="#a78bfa" strokeWidth={2} />
          </View>

          <Text style={styles.cardTitle}>Quantrock Trading Challenge</Text>
          <Text style={[styles.cardSubtitle, styles.cardSubtitlePurple]}>Exclusively for Premium Pro members</Text>

          <Text style={[styles.cardDescription, styles.cardDescriptionWhite]}>
            Start your journey with a $100,000 simulated account to showcase your trading skills, pass the evaluation, and qualify to manage a $10,000 live funded account while keeping 50% of the profits — all without risking your own capital.
          </Text>

          <View style={[styles.benefitsBox, styles.benefitsBoxPurple]}>
            <Text style={styles.benefitsTitle}>Premium Pro Membership Benefits:</Text>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>A $100,000 simulated account that qualifies you for managing a $10,000 live funded account</Text>
            </View>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>Real-time updates from top global bank analyses</Text>
            </View>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>Live tracking of hedge fund trades and U.S. Congress members' portfolios</Text>
            </View>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>Two progressive challenge rounds to sharpen your trading skills</Text>
            </View>
            <View style={styles.benefitItem}>
              <Check size={16} color="#a78bfa" strokeWidth={3} />
              <Text style={styles.benefitText}>Comprehensive performance analysis to support your growth step by step</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => setIsSecondCardExpanded(!isSecondCardExpanded)}>
            <Text style={styles.expandButtonText}>Challenge Details</Text>
            <Animated.View style={secondArrowAnimatedStyle}>
              <ChevronDown size={24} color="#a78bfa" strokeWidth={2} />
            </Animated.View>
          </TouchableOpacity>

          <Animated.View style={secondCardAnimatedStyle}>
            <View style={styles.roundsContainer}>
              <Text style={styles.roundsTitle}>Round One: Performance Test</Text>
              <View style={styles.roundItem}>
                <Check size={16} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.roundText}>Daily loss limit: 5%</Text>
              </View>
              <View style={styles.roundItem}>
                <Check size={16} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.roundText}>Total loss limit: 10%</Text>
              </View>
              <View style={styles.roundItem}>
                <Check size={16} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.roundText}>Profit threshold: 10%</Text>
              </View>
              <View style={styles.roundItem}>
                <Check size={16} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.roundText}>Two weeks period</Text>
              </View>

              <Text style={[styles.roundsTitle, { marginTop: 16 }]}>Round Two: Final Evaluation</Text>
              <View style={styles.roundItem}>
                <Check size={16} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.roundText}>Daily loss limit: 3%</Text>
              </View>
              <View style={styles.roundItem}>
                <Check size={16} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.roundText}>Total loss limit: 6%</Text>
              </View>
              <View style={styles.roundItem}>
                <Check size={16} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.roundText}>Profit threshold: 6%</Text>
              </View>
              <View style={styles.roundItem}>
                <Check size={16} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.roundText}>Two weeks period</Text>
              </View>
            </View>

            <View style={styles.featuresList}>
              <Text style={[styles.roundsTitle, { marginBottom: 10 }]}>Challenge Rules</Text>
              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Begin trading at any time (no fixed start date)</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Select portfolio size: $10,000 – $50,000 – $100,000</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Maximum symbol weight: 10% of total portfolio.</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Minimum of 30 executed trades</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Required instruments: S&P 500 / Gold / Major Currencies / Bitcoin</Text>
              </View>

              <View style={styles.featureItem}>
                <Check size={20} color="#a78bfa" strokeWidth={3} />
                <Text style={styles.featureText}>Account leverage: 1:1</Text>
              </View>
            </View>
          </Animated.View>

          <TouchableOpacity style={[styles.button, styles.buttonPurple]} onPress={() => router.push('/challenge-signup')}>
            <Text style={styles.buttonText}>Start Quantrock Challenge</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About the Challenge</Text>
        <Text style={styles.aboutSubtitle}>
          The Largest Investment Challenge Combining Training, Competition, and Real Rewards
        </Text>
        <Text style={styles.aboutDescription}>
          The Quantrock Investment Simulation Challenge was created to bridge the gap between academic knowledge and real-world trading practice, offering professionals, beginners, university and high school students a realistic and risk-free experience. You will step into the role of a Portfolio Manager and Executive Trader in a professional simulation environment that combines practical training, real challenges, and tangible rewards, giving you an authentic feel for the financial markets.
        </Text>
      </View>
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
    paddingTop: 4,
    paddingBottom: 6,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerLeft: {
    flex: 1,
  },
  avatarButton: {
    width: 40,
    height: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e3a8a',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  iconButton: {
    width: 24,
    height: 24,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 20,
  },
  card: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradientCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    alignSelf: 'center',
  },
  iconContainerGreen: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  iconContainerPurple: {
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardSubtitlePurple: {
    color: '#fff',
  },
  cardSubtitleGreen: {
    color: '#fff',
  },
  cardDescription: {
    fontSize: 11,
    color: '#94a3b8',
    lineHeight: 17,
    marginBottom: 16,
    textAlign: 'center',
  },
  cardDescriptionWhite: {
    color: '#fff',
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 6,
  },
  expandButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  featuresList: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 10,
    fontWeight: '500',
    flex: 1,
    lineHeight: 16,
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonGreen: {
    borderColor: '#22c55e',
  },
  buttonPurple: {
    borderColor: '#a78bfa',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  aboutSection: {
    marginTop: 8,
    marginBottom: 32,
    padding: 24,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  aboutSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 16,
    lineHeight: 20,
  },
  aboutDescription: {
    fontSize: 11,
    color: '#cbd5e1',
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  highlightBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  highlightBoxGreen: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  highlightTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  benefitsBox: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  benefitsBoxPurple: {
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  benefitsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
    flex: 1,
    lineHeight: 16,
  },
  joinText: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 17,
  },
  joinTextPurple: {
    color: '#fff',
  },
  roundsContainer: {
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  roundsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  roundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  roundText: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
});
