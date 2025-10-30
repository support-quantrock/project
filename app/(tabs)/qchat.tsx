import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Linking } from 'react-native';
import { Trophy, Medal, Award, MapPin, Users, TrendingUp, Calendar, Target, ChartBar as BarChart3, TrendingUp as TrendingUpIcon, Info, Search, Star, Bell, User, ChevronDown, CircleUser as UserCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useState, useRef, useEffect } from 'react';
import { router } from 'expo-router';
import Arrow from '@/components/Arrow';

const getCountryFlag = (countryCode: string) => {
  const flags: { [key: string]: string } = {
    'US': '🇺🇸',
    'GB': '🇬🇧',
    'CN': '🇨🇳',
    'DE': '🇩🇪',
    'FR': '🇫🇷',
    'CA': '🇨🇦',
    'AU': '🇦🇺',
    'JP': '🇯🇵',
    'IT': '🇮🇹',
    'ES': '🇪🇸',
  };
  return flags[countryCode] || '🏳️';
};

export default function QChat() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeSponsorIndex, setActiveSponsorIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'training' | 'challenge' | 'trading'>('challenge');
  const [activeSponsorTab, setActiveSponsorTab] = useState<'banking' | 'educational' | 'media'>('banking');
  const [expandedTraining, setExpandedTraining] = useState(false);
  const [expandedChallenge, setExpandedChallenge] = useState(false);
  const [expandedTrading, setExpandedTrading] = useState(false);
  const [expandedCard1, setExpandedCard1] = useState(false);
  const [expandedCard2, setExpandedCard2] = useState(false);
  const [expandedCard3, setExpandedCard3] = useState(false);
  const carouselRef = useRef<ScrollView>(null);
  const sponsorCarouselRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const sponsorAutoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  const challengeCardDetails = [
    {
      id: 1,
      title: 'Stage Requirements',
      items: [
        'Begin trading at any time (no fixed start date)',
        'Select portfolio size: $10,000 – $50,000 – $100,000',
        'Daily loss limit: 5%',
        'Total loss limit: 10%',
        'Profit threshold: 6% → victory to the top performer',
        'Maximum position size: 10% of total portfolio',
        'Minimum of 30 executed trades',
        'Required instruments: S&P 500 / Gold / Major Currencies / Bitcoin',
        'Account leverage: 1:1',
      ],
    },
    {
      id: 2,
      title: 'Challenge Rules',
      items: [
        'Begin trading at any time (no fixed start date)',
        'Select portfolio size: $10,000 – $50,000 – $100,000',
        'Maximum position size: 10% of total portfolio',
        'Minimum of 30 executed trades',
        'Required instruments: S&P 500 / Gold / Major Currencies / Bitcoin',
        'Account leverage: 1:1',
      ],
    },
    {
      id: 3,
      title: 'Funded Trading Rules',
      items: [
        'No maximum trading duration',
        'Open profit target',
        'Minimum profit withdrawal: 3%',
        'Maximum daily loss: 3%',
        'Maximum total loss: 10%',
        'Max position size: 3% per trade',
        'Direct support from Quantrock experts',
        'Inactive for 30 days → disqualified',
        'Asset Classes: Stocks listed in the S&P 500 - Gold - EUR/USD - Bitcoin',
        'Account leverage 1:1',
      ],
    },
  ];

  const challengeCards = [
    {
      id: 1,
      title: 'Training Stage',
      subtitle: 'This optional stage is designed for professionals, beginners, university students, and high school students to practice and refine their trading strategies in a simulated environment.',
      badge: 'Optional',
      badgeColor: '#fbbf24',
      avatarIcon: Target,
      gradientColors: ['#065f46', '#064e3b'],
      info: [
        { icon: Target, label: 'Portfolio:', value: '$10K - $100K' },
        { icon: TrendingUp, label: 'Profit Target:', value: '6%' },
        { icon: Award, label: 'Min Trades:', value: '30' },
        { icon: Calendar, label: 'Daily Loss:', value: '5% Max' },
      ],
    },
    {
      id: 2,
      title: 'Challenge Stage',
      subtitle: 'Your first step to advance your trading skills through two rounds: Performance Test and Evaluation. Start with a simulated account up to $100,000, then progress to live trading.',
      badge: 'Pro',
      badgeColor: '#10b981',
      avatarIcon: Trophy,
      gradientColors: ['#7c3aed', '#4c1d95'],
      info: [
        { icon: Target, label: 'Portfolio:', value: '$10K - $100K' },
        { icon: Award, label: 'Min Trades:', value: '30' },
        { icon: BarChart3, label: 'Max Position:', value: '10%' },
        { icon: TrendingUp, label: 'Leverage:', value: '1:1' },
      ],
    },
    {
      id: 3,
      title: 'Trading Stage',
      subtitle: 'Top performers get a $10,000 funded live account and keep 50% of profits. Includes Premium support, direct guidance from Quantrock experts, and clear performance tracking.',
      badge: 'Premium',
      badgeColor: '#f59e0b',
      avatarIcon: TrendingUpIcon,
      gradientColors: ['#7c2d12', '#dc2626'],
      info: [
        { icon: Target, label: 'Funded:', value: '$10,000' },
        { icon: TrendingUp, label: 'Profit Share:', value: '50%' },
        { icon: Award, label: 'Max Position:', value: '3%' },
        { icon: BarChart3, label: 'Daily Loss:', value: '3% Max' },
      ],
    },
  ];

  const leaderboardData = [
    { rank: 1, name: 'Sarah Chen', profit: '+24.5%', trades: 47, country: 'US', profitAmount: '$73,500', equity: '$373,500', gain: '25%', accountSize: '$300,000.00' },
    { rank: 2, name: 'Alex Morgan', profit: '+18.2%', trades: 52, country: 'GB', profitAmount: '$54,600', equity: '$354,600', gain: '18%', accountSize: '$300,000.00' },
    { rank: 3, name: 'Jordan Smith', profit: '+15.8%', trades: 41, country: 'US', profitAmount: '$47,400', equity: '$347,400', gain: '16%', accountSize: '$300,000.00' },
    { rank: 4, name: 'Michael Brown', profit: '+14.1%', trades: 39, country: 'CA', profitAmount: '$42,300', equity: '$342,300', gain: '14%', accountSize: '$300,000.00' },
    { rank: 5, name: 'Emma Wilson', profit: '+13.5%', trades: 35, country: 'AU', profitAmount: '$40,500', equity: '$340,500', gain: '14%', accountSize: '$300,000.00' },
    { rank: 6, name: 'David Martinez', profit: '+12.8%', trades: 42, country: 'ES', profitAmount: '$38,400', equity: '$338,400', gain: '13%', accountSize: '$300,000.00' },
    { rank: 7, name: 'Sophia Garcia', profit: '+11.9%', trades: 31, country: 'IT', profitAmount: '$35,700', equity: '$335,700', gain: '12%', accountSize: '$300,000.00' },
    { rank: 8, name: 'James Anderson', profit: '+11.2%', trades: 37, country: 'GB', profitAmount: '$33,600', equity: '$333,600', gain: '11%', accountSize: '$300,000.00' },
    { rank: 9, name: 'Olivia Taylor', profit: '+10.7%', trades: 33, country: 'US', profitAmount: '$32,100', equity: '$332,100', gain: '11%', accountSize: '$300,000.00' },
    { rank: 10, name: 'Daniel Thomas', profit: '+10.3%', trades: 29, country: 'DE', profitAmount: '$30,900', equity: '$330,900', gain: '10%', accountSize: '$300,000.00' },
  ];

  const trainingLeaderboardData = [
    { rank: 1, name: 'Emma Davis', profit: '+22.3%', trades: 45, country: 'US', profitAmount: '$66,900', equity: '$366,900', gain: '22%', accountSize: '$300,000.00' },
    { rank: 2, name: 'Mike Johnson', profit: '+16.8%', trades: 38, country: 'GB', profitAmount: '$50,400', equity: '$350,400', gain: '17%', accountSize: '$300,000.00' },
    { rank: 3, name: 'Chris Lee', profit: '+14.2%', trades: 32, country: 'CN', profitAmount: '$42,600', equity: '$342,600', gain: '14%', accountSize: '$300,000.00' },
    { rank: 4, name: 'LIAOYI_WANG', profit: '+13.4%', trades: 36, country: 'CN', profitAmount: '$40,200', equity: '$340,200', gain: '13%', accountSize: '$300,000.00' },
    { rank: 5, name: 'NM.swing', profit: '+12.9%', trades: 34, country: 'GB', profitAmount: '$38,700', equity: '$338,700', gain: '13%', accountSize: '$300,000.00' },
    { rank: 6, name: 'Lisa Brown', profit: '+12.1%', trades: 30, country: 'CA', profitAmount: '$36,300', equity: '$336,300', gain: '12%', accountSize: '$300,000.00' },
    { rank: 7, name: 'Tom Harris', profit: '+11.6%', trades: 28, country: 'AU', profitAmount: '$34,800', equity: '$334,800', gain: '12%', accountSize: '$300,000.00' },
    { rank: 8, name: 'Nina Green', profit: '+10.9%', trades: 26, country: 'JP', profitAmount: '$32,700', equity: '$332,700', gain: '11%', accountSize: '$300,000.00' },
    { rank: 9, name: 'Jack Miller', profit: '+10.4%', trades: 24, country: 'IT', profitAmount: '$31,200', equity: '$331,200', gain: '10%', accountSize: '$300,000.00' },
    { rank: 10, name: 'Kate Wilson', profit: '+9.8%', trades: 22, country: 'ES', profitAmount: '$29,400', equity: '$329,400', gain: '10%', accountSize: '$300,000.00' },
  ];

  const tradingLeaderboardData = [
    { rank: 1, name: 'David Brown', profit: '+35.9%', trades: 72, country: 'US', profitAmount: '$107,700', equity: '$407,700', gain: '36%', accountSize: '$300,000.00' },
    { rank: 2, name: 'Lisa Wang', profit: '+28.7%', trades: 68, country: 'CN', profitAmount: '$86,100', equity: '$386,100', gain: '29%', accountSize: '$300,000.00' },
    { rank: 3, name: 'Ana Garcia', profit: '+24.1%', trades: 59, country: 'ES', profitAmount: '$72,300', equity: '$372,300', gain: '24%', accountSize: '$300,000.00' },
    { rank: 4, name: 'Robert Kim', profit: '+22.5%', trades: 64, country: 'KR', profitAmount: '$67,500', equity: '$367,500', gain: '23%', accountSize: '$300,000.00' },
    { rank: 5, name: 'Maria Lopez', profit: '+21.3%', trades: 56, country: 'MX', profitAmount: '$63,900', equity: '$363,900', gain: '21%', accountSize: '$300,000.00' },
    { rank: 6, name: 'Kevin Chen', profit: '+20.8%', trades: 61, country: 'CN', profitAmount: '$62,400', equity: '$362,400', gain: '21%', accountSize: '$300,000.00' },
    { rank: 7, name: 'Sophie Turner', profit: '+19.4%', trades: 53, country: 'GB', profitAmount: '$58,200', equity: '$358,200', gain: '19%', accountSize: '$300,000.00' },
    { rank: 8, name: 'Mark Johnson', profit: '+18.9%', trades: 58, country: 'US', profitAmount: '$56,700', equity: '$356,700', gain: '19%', accountSize: '$300,000.00' },
    { rank: 9, name: 'Emily Zhang', profit: '+17.6%', trades: 49, country: 'CN', profitAmount: '$52,800', equity: '$352,800', gain: '18%', accountSize: '$300,000.00' },
    { rank: 10, name: 'Alex Rivera', profit: '+16.8%', trades: 51, country: 'US', profitAmount: '$50,400', equity: '$350,400', gain: '17%', accountSize: '$300,000.00' },
  ];

  const bankingSponsors = [
    {
      id: 1,
      title: 'Global Trade Bank',
      subtitle: 'Leading international banking solutions for traders and investors worldwide.',
      badge: 'Elite',
      badgeColor: '#fbbf24',
      gradientColors: ['#1e3a8a', '#7c3aed'],
      info: [
        { icon: MapPin, label: 'Location:', value: 'New York' },
        { icon: Users, label: 'Clients:', value: '50,000+' },
        { icon: TrendingUp, label: 'Services:', value: 'Trading, Banking' },
        { icon: Calendar, label: 'Established:', value: '2005' },
      ],
    },
    {
      id: 2,
      title: 'Quantum Finance',
      subtitle: 'Premium financial services with advanced trading infrastructure and support.',
      badge: 'Pro',
      badgeColor: '#10b981',
      gradientColors: ['#064e3b', '#0891b2'],
      info: [
        { icon: MapPin, label: 'Location:', value: 'London' },
        { icon: Users, label: 'Clients:', value: '35,000+' },
        { icon: TrendingUp, label: 'Services:', value: 'Investment, Wealth' },
        { icon: Calendar, label: 'Established:', value: '2010' },
      ],
    },
  ];

  const educationalSponsors = [
    {
      id: 3,
      title: 'Capital Academy',
      subtitle: 'The leading online company in e-learning, providing world-class education and training.',
      badge: 'Elite',
      badgeColor: '#fbbf24',
      gradientColors: ['#1e3a8a', '#7c3aed'],
      info: [
        { icon: MapPin, label: 'Location:', value: 'Dubai' },
        { icon: Users, label: 'Students:', value: '10,000+' },
        { icon: TrendingUp, label: 'Courses:', value: 'Trading, Finance' },
        { icon: Calendar, label: 'Established:', value: '2018' },
      ],
    },
    {
      id: 4,
      title: 'Investing Academy',
      subtitle: 'The leading education institute in Saudi Arabia for investment and trading excellence.',
      badge: 'Pro',
      badgeColor: '#10b981',
      gradientColors: ['#064e3b', '#0891b2'],
      info: [
        { icon: MapPin, label: 'Location:', value: 'Saudi Arabia' },
        { icon: Users, label: 'Students:', value: '5,000+' },
        { icon: TrendingUp, label: 'Courses:', value: 'Investment, Markets' },
        { icon: Calendar, label: 'Established:', value: '2019' },
      ],
    },
  ];

  const mediaSponsors = [
    {
      id: 5,
      title: 'Crypto Masters Cup',
      subtitle: 'Exclusive cryptocurrency trading competition with cutting-edge analytics tools.',
      badge: 'Premium',
      badgeColor: '#f59e0b',
      gradientColors: ['#7c2d12', '#dc2626'],
      info: [
        { icon: MapPin, label: 'Location:', value: 'Digital' },
        { icon: Users, label: 'Traders:', value: '8,000+' },
        { icon: BarChart3, label: 'Assets:', value: 'BTC, ETH, ALT' },
        { icon: Calendar, label: 'Launched:', value: '2022' },
      ],
    },
    {
      id: 6,
      title: 'Trade Media Network',
      subtitle: 'Global financial news and analysis platform for professional traders.',
      badge: 'Premium',
      badgeColor: '#f59e0b',
      gradientColors: ['#7c2d12', '#dc2626'],
      info: [
        { icon: MapPin, label: 'Location:', value: 'Singapore' },
        { icon: Users, label: 'Readers:', value: '2M+' },
        { icon: BarChart3, label: 'Coverage:', value: 'Stocks, Forex, Crypto' },
        { icon: Calendar, label: 'Launched:', value: '2020' },
      ],
    },
  ];

  const getCurrentSponsors = () => {
    switch (activeSponsorTab) {
      case 'banking':
        return bankingSponsors;
      case 'educational':
        return educationalSponsors;
      case 'media':
        return mediaSponsors;
      default:
        return bankingSponsors;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [activeCardIndex, width]);

  useEffect(() => {
    setActiveSponsorIndex(0);
    startSponsorAutoScroll();
    return () => {
      if (sponsorAutoScrollInterval.current) {
        clearInterval(sponsorAutoScrollInterval.current);
      }
    };
  }, [activeSponsorTab, activeSponsorIndex, width]);

  const startAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }

    autoScrollInterval.current = setInterval(() => {
      const nextIndex = (activeCardIndex + 1) % challengeCards.length;
      scrollToCard(nextIndex);
    }, 5000);
  };

  const scrollToCard = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = width - 40;
      carouselRef.current.scrollTo({
        x: index * cardWidth,
        animated: true,
      });
      setActiveCardIndex(index);
    }
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const cardWidth = width - 40;
    const index = Math.round(scrollPosition / cardWidth);
    if (index !== activeCardIndex) {
      setActiveCardIndex(index);
    }
  };

  const handleScrollBeginDrag = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
  };

  const handleScrollEndDrag = () => {
    startAutoScroll();
  };

  const startSponsorAutoScroll = () => {
    if (sponsorAutoScrollInterval.current) {
      clearInterval(sponsorAutoScrollInterval.current);
    }

    sponsorAutoScrollInterval.current = setInterval(() => {
      const currentSponsors = getCurrentSponsors();
      const nextIndex = (activeSponsorIndex + 1) % currentSponsors.length;
      scrollToSponsorCard(nextIndex);
    }, 3000);
  };

  const scrollToSponsorCard = (index: number) => {
    if (sponsorCarouselRef.current) {
      const cardWidth = width - 40;
      sponsorCarouselRef.current.scrollTo({
        x: index * cardWidth,
        animated: true,
      });
      setActiveSponsorIndex(index);
    }
  };

  const handleSponsorScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const cardWidth = width - 40;
    const index = Math.round(scrollPosition / cardWidth);
    if (index !== activeSponsorIndex) {
      setActiveSponsorIndex(index);
    }
  };

  const handleSponsorScrollBeginDrag = () => {
    if (sponsorAutoScrollInterval.current) {
      clearInterval(sponsorAutoScrollInterval.current);
    }
  };

  const handleSponsorScrollEndDrag = () => {
    startSponsorAutoScroll();
  };

  const renderChallengeCard = (card: any) => {
    const IconComponent1 = card.info[0].icon;
    const IconComponent2 = card.info[1].icon;
    const IconComponent3 = card.info[2].icon;
    const IconComponent4 = card.info[3].icon;
    const AvatarIcon = card.avatarIcon;

    const isExpanded = card.id === 1 ? expandedCard1 : card.id === 2 ? expandedCard2 : expandedCard3;
    const setExpanded = card.id === 1 ? setExpandedCard1 : card.id === 2 ? setExpandedCard2 : setExpandedCard3;
    const details = challengeCardDetails.find(d => d.id === card.id);

    return (
      <View key={card.id} style={[styles.carouselItem, { width: width - 40 }]}>
        <View style={styles.profileCard}>
          <LinearGradient
            colors={card.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileGradient}>

            <View style={styles.glowBorder} />

            <View style={styles.topRow}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarImage}>
                  <AvatarIcon size={32} color="#fbbf24" strokeWidth={2} />
                </View>
              </View>

              <View style={styles.profileTitleContainer}>
                <View style={styles.titleRow}>
                  <Text style={styles.profileTitle}>{card.title}</Text>
                  <View style={[styles.badge, { borderColor: card.badgeColor, backgroundColor: `${card.badgeColor}33` }]}>
                    <Text style={[styles.badgeText, { color: card.badgeColor }]}>{card.badge}</Text>
                  </View>
                </View>
                <Text style={styles.profileSubtitle}>
                  {card.subtitle}
                </Text>
              </View>
            </View>

            <View style={styles.bottomRow}>
              <View style={styles.infoGrid}>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <IconComponent1 size={18} color="#3b82f6" strokeWidth={2} />
                    <Text style={styles.infoLabel}>{card.info[0].label}</Text>
                    <Text style={styles.infoValue}>{card.info[0].value}</Text>
                  </View>

                  <View style={styles.infoItem}>
                    <IconComponent2 size={18} color="#3b82f6" strokeWidth={2} />
                    <Text style={styles.infoLabel}>{card.info[1].label}</Text>
                    <Text style={styles.infoValue}>{card.info[1].value}</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <IconComponent3 size={18} color="#3b82f6" strokeWidth={2} />
                    <Text style={styles.infoLabel}>{card.info[2].label}</Text>
                    <Text style={styles.infoValue}>{card.info[2].value}</Text>
                  </View>

                  <View style={styles.infoItem}>
                    <IconComponent4 size={18} color="#3b82f6" strokeWidth={2} />
                    <Text style={styles.infoLabel}>{card.info[3].label}</Text>
                    <Text style={styles.infoValue}>{card.info[3].value}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.visitButton}>
                <Text style={styles.visitButtonText}>Join</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => setExpanded(!isExpanded)}>
              <ChevronDown
                size={24}
                color="#fff"
                strokeWidth={2}
                style={[styles.expandIcon, isExpanded && styles.expandIconRotated]}
              />
            </TouchableOpacity>

            {isExpanded && details && (
              <View style={styles.expandedCardDetails}>
                <Text style={styles.detailsTitle}>{details.title}</Text>
                {details.items.map((item, index) => (
                  <View key={index} style={styles.detailItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.detailText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}

          </LinearGradient>
        </View>
      </View>
    );
  };

  const renderSponsorCard = (card: any) => {
    const IconComponent1 = card.info[0].icon;
    const IconComponent2 = card.info[1].icon;
    const IconComponent3 = card.info[2].icon;
    const IconComponent4 = card.info[3].icon;

    return (
      <View key={card.id} style={[styles.carouselItem, { width: width - 40 }]}>
        <View style={styles.profileCard}>
          <LinearGradient
            colors={card.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileGradient}>

            <View style={styles.glowBorder} />

            <View style={styles.topRow}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarImage}>
                  <Trophy size={32} color="#fbbf24" strokeWidth={2} />
                </View>
              </View>

              <View style={styles.profileTitleContainer}>
                <View style={styles.titleRow}>
                  <Text style={styles.profileTitle}>{card.title}</Text>
                  <View style={[styles.badge, { borderColor: card.badgeColor, backgroundColor: `${card.badgeColor}33` }]}>
                    <Text style={[styles.badgeText, { color: card.badgeColor }]}>{card.badge}</Text>
                  </View>
                </View>
                <Text style={styles.profileSubtitle}>
                  {card.subtitle}
                </Text>
              </View>
            </View>

            <View style={styles.bottomRow}>
              <View style={styles.infoGrid}>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <IconComponent1 size={18} color="#3b82f6" strokeWidth={2} />
                    <Text style={styles.infoLabel}>{card.info[0].label}</Text>
                    <Text style={styles.infoValue}>{card.info[0].value}</Text>
                  </View>

                  <View style={styles.infoItem}>
                    <IconComponent2 size={18} color="#3b82f6" strokeWidth={2} />
                    <Text style={styles.infoLabel}>{card.info[1].label}</Text>
                    <Text style={styles.infoValue}>{card.info[1].value}</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <IconComponent3 size={18} color="#3b82f6" strokeWidth={2} />
                    <Text style={styles.infoLabel}>{card.info[2].label}</Text>
                    <Text style={styles.infoValue}>{card.info[2].value}</Text>
                  </View>

                  <View style={styles.infoItem}>
                    <IconComponent4 size={18} color="#3b82f6" strokeWidth={2} />
                    <Text style={styles.infoLabel}>{card.info[3].label}</Text>
                    <Text style={styles.infoValue}>{card.info[3].value}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.visitButton}>
                <Text style={styles.visitButtonText}>Visit</Text>
              </TouchableOpacity>
            </View>

          </LinearGradient>
        </View>
      </View>
    );
  };

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

      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quantrock Global Investment Championship</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'training' && styles.activeTab]}
            onPress={() => setActiveTab('training')}>
            <Text style={[styles.tabText, activeTab === 'training' && styles.activeTabText]}>Training</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'challenge' && styles.activeTab]}
            onPress={() => setActiveTab('challenge')}>
            <Text style={[styles.tabText, activeTab === 'challenge' && styles.activeTabText]}>Challenge</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[styles.tab, activeTab === 'trading' && styles.activeTab]}
            onPress={() => setActiveTab('trading')}>
            <Text style={[styles.tabText, activeTab === 'trading' && styles.activeTabText]}>Trading</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.contentContainer}>
          {activeTab === 'training' && (
            <View style={styles.card}>
              <LinearGradient
                colors={['#065f46', '#064e3b']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientCard}>

                <View style={styles.cardTitle}>
                  <View style={styles.cardTitleLeft}>
                    <Trophy size={28} color="#fbbf24" strokeWidth={2} />
                    <Text style={styles.titleText}>Training Leaderboard</Text>
                  </View>
                  <Text style={styles.yourRankText}>Your rank: 15</Text>
                </View>

                <View style={styles.podiumContainer}>
                  <View style={[styles.podiumPosition, styles.secondPlace]}>
                    <View style={styles.roundHolder}>
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankBadgeText}>#2</Text>
                      </View>
                      <View style={styles.roundAvatar}>
                        <Image
                          source="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                          style={styles.avatarImage}
                          contentFit="cover"
                          transition={200}
                        />
                      </View>
                      <Text style={styles.podiumFlag}>{getCountryFlag(trainingLeaderboardData[1].country)}</Text>
                    </View>
                    <View style={styles.podiumContent}>
                      <Text style={styles.userName}>{trainingLeaderboardData[1].name}</Text>
                      <View style={styles.portfolioRow}>
                        <Text style={styles.portfolioLabel}>Portfolio:</Text>
                      </View>
                      <View style={styles.portfolioValues}>
                        <Text style={styles.portfolioValue}>$300K</Text>
                        <Text style={styles.arrowSymbol}>→</Text>
                        <Text style={styles.portfolioValueAfter}>${(300 * 1.168).toFixed(0)}K</Text>
                      </View>
                      <View style={styles.profitBox}>
                        <Text style={styles.profitAmount}>{trainingLeaderboardData[1].profitAmount}</Text>
                        <Text style={styles.profitPercent}>{trainingLeaderboardData[1].profit}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.podiumPosition, styles.firstPlace]}>
                    <View style={styles.roundHolder}>
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankBadgeText}>#1</Text>
                      </View>
                      <View style={[styles.roundAvatar, styles.firstAvatar]}>
                        <Image
                          source="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                          style={styles.avatarImage}
                          contentFit="cover"
                          transition={200}
                        />
                      </View>
                      <Text style={styles.podiumFlag}>{getCountryFlag(trainingLeaderboardData[0].country)}</Text>
                    </View>
                    <View style={styles.podiumContent}>
                      <Text style={styles.userName}>{trainingLeaderboardData[0].name}</Text>
                      <View style={styles.portfolioRow}>
                        <Text style={styles.portfolioLabel}>Portfolio:</Text>
                      </View>
                      <View style={styles.portfolioValues}>
                        <Text style={styles.portfolioValue}>$300K</Text>
                        <Text style={styles.arrowSymbol}>→</Text>
                        <Text style={styles.portfolioValueAfter}>${(300 * 1.223).toFixed(0)}K</Text>
                      </View>
                      <View style={styles.profitBox}>
                        <Text style={styles.profitAmount}>{trainingLeaderboardData[0].profitAmount}</Text>
                        <Text style={styles.profitPercent}>{trainingLeaderboardData[0].profit}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.podiumPosition, styles.thirdPlace]}>
                    <View style={styles.roundHolder}>
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankBadgeText}>#3</Text>
                      </View>
                      <View style={styles.roundAvatar}>
                        <Image
                          source="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
                          style={styles.avatarImage}
                          contentFit="cover"
                          transition={200}
                        />
                      </View>
                      <Text style={styles.podiumFlag}>{getCountryFlag(trainingLeaderboardData[2].country)}</Text>
                    </View>
                    <View style={styles.podiumContent}>
                      <Text style={styles.userName}>{trainingLeaderboardData[2].name}</Text>
                      <View style={styles.portfolioRow}>
                        <Text style={styles.portfolioLabel}>Portfolio:</Text>
                      </View>
                      <View style={styles.portfolioValues}>
                        <Text style={styles.portfolioValue}>$300K</Text>
                        <Text style={styles.arrowSymbol}>→</Text>
                        <Text style={styles.portfolioValueAfter}>${(300 * 1.142).toFixed(0)}K</Text>
                      </View>
                      <View style={styles.profitBox}>
                        <Text style={styles.profitAmount}>{trainingLeaderboardData[2].profitAmount}</Text>
                        <Text style={styles.profitPercent}>{trainingLeaderboardData[2].profit}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={() => setExpandedTraining(!expandedTraining)}>
                  <ChevronDown
                    size={24}
                    color="#fff"
                    strokeWidth={2}
                    style={[styles.expandIcon, expandedTraining && styles.expandIconRotated]}
                  />
                </TouchableOpacity>

                {expandedTraining && (
                  <View style={styles.expandedList}>
                    {trainingLeaderboardData.slice(3).map((item) => (
                      <View key={item.rank} style={styles.detailedLeaderboardCard}>
                        <View style={styles.rankCircle}>
                          <Text style={styles.rankCircleText}>{item.rank}</Text>
                        </View>
                        <View style={styles.detailedCardHeader}>
                          <View style={styles.detailedRankBadge}>
                            <UserCircle size={32} color="#94a3b8" strokeWidth={2} />
                          </View>
                          <View style={styles.detailedNameSection}>
                            <Text style={styles.detailedName}>{item.name}</Text>
                            <View style={styles.countryBadge}>
                              <Text style={styles.countryCode}>{item.country}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.detailedAccountRow}>
                          <Text style={styles.detailedAccountLabel}>Portfolio value:</Text>
                          <View style={styles.portfolioValueContainer}>
                            <View style={styles.portfolioFlexRow}>
                              <Text style={styles.detailedAccountValue}>$10,000</Text>
                              <View style={styles.arrowWithDays}>
                                <Text style={styles.daysText}>90 days</Text>
                                <Text style={styles.tallArrowText}>⟶</Text>
                              </View>
                              <Text style={styles.detailedAccountValueGreen}>$20,000</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.profitDisplayContainer}>
                          <Text style={styles.profitDisplayText}>+$360.00 <Text style={styles.profitPercentage}>(+1.49%)</Text></Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}

              </LinearGradient>
            </View>
          )}

          {activeTab === 'challenge' && (
            <View style={styles.card}>
              <LinearGradient
                colors={['#7c3aed', '#4c1d95']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientCard}>

                <View style={styles.cardTitle}>
                  <View style={styles.cardTitleLeft}>
                    <Trophy size={28} color="#fbbf24" strokeWidth={2} />
                    <Text style={styles.titleText}>Challenge Leaderboard</Text>
                  </View>
                  <Text style={styles.yourRankText}>Your rank: 15</Text>
                </View>

                <View style={styles.podiumContainer}>
                  <View style={[styles.podiumPosition, styles.secondPlace]}>
                    <View style={styles.roundHolder}>
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankBadgeText}>#2</Text>
                      </View>
                      <View style={styles.roundAvatar}>
                        <Image
                          source="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                          style={styles.avatarImage}
                          contentFit="cover"
                          transition={200}
                        />
                      </View>
                      <Text style={styles.podiumFlag}>{getCountryFlag(leaderboardData[1].country)}</Text>
                    </View>
                    <View style={styles.podiumContent}>
                      <Text style={styles.userName}>{leaderboardData[1].name}</Text>
                      <View style={styles.portfolioRow}>
                        <Text style={styles.portfolioLabel}>Portfolio:</Text>
                      </View>
                      <View style={styles.portfolioValues}>
                        <Text style={styles.portfolioValue}>$300K</Text>
                        <Text style={styles.arrowSymbol}>→</Text>
                        <Text style={styles.portfolioValueAfter}>${(300 * 1.182).toFixed(0)}K</Text>
                      </View>
                      <View style={styles.profitBox}>
                        <Text style={styles.profitAmount}>{leaderboardData[1].profitAmount}</Text>
                        <Text style={styles.profitPercent}>{leaderboardData[1].profit}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.podiumPosition, styles.firstPlace]}>
                    <View style={styles.roundHolder}>
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankBadgeText}>#1</Text>
                      </View>
                      <View style={[styles.roundAvatar, styles.firstAvatar]}>
                        <Image
                          source="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                          style={styles.avatarImage}
                          contentFit="cover"
                          transition={200}
                        />
                      </View>
                      <Text style={styles.podiumFlag}>{getCountryFlag(leaderboardData[0].country)}</Text>
                    </View>
                    <View style={styles.podiumContent}>
                      <Text style={styles.userName}>{leaderboardData[0].name}</Text>
                      <View style={styles.portfolioRow}>
                        <Text style={styles.portfolioLabel}>Portfolio:</Text>
                      </View>
                      <View style={styles.portfolioValues}>
                        <Text style={styles.portfolioValue}>$300K</Text>
                        <Text style={styles.arrowSymbol}>→</Text>
                        <Text style={styles.portfolioValueAfter}>${(300 * 1.245).toFixed(0)}K</Text>
                      </View>
                      <View style={styles.profitBox}>
                        <Text style={styles.profitAmount}>{leaderboardData[0].profitAmount}</Text>
                        <Text style={styles.profitPercent}>{leaderboardData[0].profit}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.podiumPosition, styles.thirdPlace]}>
                    <View style={styles.roundHolder}>
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankBadgeText}>#3</Text>
                      </View>
                      <View style={styles.roundAvatar}>
                        <Image
                          source="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
                          style={styles.avatarImage}
                          contentFit="cover"
                          transition={200}
                        />
                      </View>
                      <Text style={styles.podiumFlag}>{getCountryFlag(leaderboardData[2].country)}</Text>
                    </View>
                    <View style={styles.podiumContent}>
                      <Text style={styles.userName}>{leaderboardData[2].name}</Text>
                      <View style={styles.portfolioRow}>
                        <Text style={styles.portfolioLabel}>Portfolio:</Text>
                      </View>
                      <View style={styles.portfolioValues}>
                        <Text style={styles.portfolioValue}>$300K</Text>
                        <Text style={styles.arrowSymbol}>→</Text>
                        <Text style={styles.portfolioValueAfter}>${(300 * 1.158).toFixed(0)}K</Text>
                      </View>
                      <View style={styles.profitBox}>
                        <Text style={styles.profitAmount}>{leaderboardData[2].profitAmount}</Text>
                        <Text style={styles.profitPercent}>{leaderboardData[2].profit}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={() => setExpandedChallenge(!expandedChallenge)}>
                  <ChevronDown
                    size={24}
                    color="#fff"
                    strokeWidth={2}
                    style={[styles.expandIcon, expandedChallenge && styles.expandIconRotated]}
                  />
                </TouchableOpacity>

                {expandedChallenge && (
                  <View style={styles.expandedList}>
                    {leaderboardData.slice(3).map((item) => (
                      <View key={item.rank} style={styles.detailedLeaderboardCard}>
                        <View style={styles.rankCircle}>
                          <Text style={styles.rankCircleText}>{item.rank}</Text>
                        </View>
                        <View style={styles.detailedCardHeader}>
                          <View style={styles.detailedRankBadge}>
                            <UserCircle size={32} color="#94a3b8" strokeWidth={2} />
                          </View>
                          <View style={styles.detailedNameSection}>
                            <Text style={styles.detailedName}>{item.name}</Text>
                            <View style={styles.countryBadge}>
                              <Text style={styles.countryCode}>{item.country}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.detailedAccountRow}>
                          <Text style={styles.detailedAccountLabel}>Equity:</Text>
                          <View style={styles.portfolioValueContainer}>
                            <View style={styles.portfolioFlexRow}>
                              <Text style={styles.detailedAccountValue}>$10,000</Text>
                              <View style={styles.arrowWithDays}>
                                <Text style={styles.daysText}>90 days</Text>
                                <Text style={styles.tallArrowText}>⟶</Text>
                              </View>
                              <Text style={styles.detailedAccountValueGreen}>$20,000</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.profitDisplayContainer}>
                          <Text style={styles.profitDisplayText}>+$360.00 <Text style={styles.profitPercentage}>(+1.49%)</Text></Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}

              </LinearGradient>
            </View>
          )}

          {activeTab === 'trading' && (
            <View style={styles.card}>
              <LinearGradient
                colors={['#1e3a8a', '#1e293b']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientCard}>

                <View style={styles.cardTitle}>
                  <Trophy size={28} color="#fbbf24" strokeWidth={2} />
                  <Text style={styles.titleText}>Trading Leaderboard</Text>
                </View>

                <View style={styles.podiumContainer}>
                  <View style={[styles.podiumPosition, styles.secondPlace]}>
                    <View style={styles.roundHolder}>
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankBadgeText}>#2</Text>
                      </View>
                      <View style={styles.roundAvatar}>
                        <Image
                          source="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                          style={styles.avatarImage}
                          contentFit="cover"
                          transition={200}
                        />
                      </View>
                      <Text style={styles.podiumFlag}>{getCountryFlag(tradingLeaderboardData[1].country)}</Text>
                    </View>
                    <View style={styles.podiumContent}>
                      <Text style={styles.userName}>{tradingLeaderboardData[1].name}</Text>
                      <View style={styles.portfolioRow}>
                        <Text style={styles.portfolioLabel}>Portfolio:</Text>
                      </View>
                      <View style={styles.portfolioValues}>
                        <Text style={styles.portfolioValue}>$300K</Text>
                        <Text style={styles.arrowSymbol}>→</Text>
                        <Text style={styles.portfolioValueAfter}>${(300 * 1.287).toFixed(0)}K</Text>
                      </View>
                      <View style={styles.profitBox}>
                        <Text style={styles.profitAmount}>{tradingLeaderboardData[1].profitAmount}</Text>
                        <Text style={styles.profitPercent}>{tradingLeaderboardData[1].profit}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.podiumPosition, styles.firstPlace]}>
                    <View style={styles.roundHolder}>
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankBadgeText}>#1</Text>
                      </View>
                      <View style={[styles.roundAvatar, styles.firstAvatar]}>
                        <Image
                          source="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                          style={styles.avatarImage}
                          contentFit="cover"
                          transition={200}
                        />
                      </View>
                      <Text style={styles.podiumFlag}>{getCountryFlag(tradingLeaderboardData[0].country)}</Text>
                    </View>
                    <View style={styles.podiumContent}>
                      <Text style={styles.userName}>{tradingLeaderboardData[0].name}</Text>
                      <View style={styles.portfolioRow}>
                        <Text style={styles.portfolioLabel}>Portfolio:</Text>
                      </View>
                      <View style={styles.portfolioValues}>
                        <Text style={styles.portfolioValue}>$300K</Text>
                        <Text style={styles.arrowSymbol}>→</Text>
                        <Text style={styles.portfolioValueAfter}>${(300 * 1.359).toFixed(0)}K</Text>
                      </View>
                      <View style={styles.profitBox}>
                        <Text style={styles.profitAmount}>{tradingLeaderboardData[0].profitAmount}</Text>
                        <Text style={styles.profitPercent}>{tradingLeaderboardData[0].profit}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.podiumPosition, styles.thirdPlace]}>
                    <View style={styles.roundHolder}>
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankBadgeText}>#3</Text>
                      </View>
                      <View style={styles.roundAvatar}>
                        <Image
                          source="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
                          style={styles.avatarImage}
                          contentFit="cover"
                          transition={200}
                        />
                      </View>
                      <Text style={styles.podiumFlag}>{getCountryFlag(tradingLeaderboardData[2].country)}</Text>
                    </View>
                    <View style={styles.podiumContent}>
                      <Text style={styles.userName}>{tradingLeaderboardData[2].name}</Text>
                      <View style={styles.portfolioRow}>
                        <Text style={styles.portfolioLabel}>Portfolio:</Text>
                      </View>
                      <View style={styles.portfolioValues}>
                        <Text style={styles.portfolioValue}>$300K</Text>
                        <Text style={styles.arrowSymbol}>→</Text>
                        <Text style={styles.portfolioValueAfter}>${(300 * 1.241).toFixed(0)}K</Text>
                      </View>
                      <View style={styles.profitBox}>
                        <Text style={styles.profitAmount}>{tradingLeaderboardData[2].profitAmount}</Text>
                        <Text style={styles.profitPercent}>{tradingLeaderboardData[2].profit}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={() => setExpandedTrading(!expandedTrading)}>
                  <ChevronDown
                    size={24}
                    color="#fff"
                    strokeWidth={2}
                    style={[styles.expandIcon, expandedTrading && styles.expandIconRotated]}
                  />
                </TouchableOpacity>

                {expandedTrading && (
                  <View style={styles.expandedList}>
                    {tradingLeaderboardData.slice(3).map((item) => (
                      <View key={item.rank} style={styles.detailedLeaderboardCard}>
                        <View style={styles.rankCircle}>
                          <Text style={styles.rankCircleText}>{item.rank}</Text>
                        </View>
                        <View style={styles.detailedCardHeader}>
                          <View style={styles.detailedRankBadge}>
                            <UserCircle size={32} color="#94a3b8" strokeWidth={2} />
                          </View>
                          <View style={styles.detailedNameSection}>
                            <Text style={styles.detailedName}>{item.name}</Text>
                            <View style={styles.countryBadge}>
                              <Text style={styles.countryCode}>{item.country}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.detailedAccountRow}>
                          <Text style={styles.detailedAccountLabel}>Portfolio value:</Text>
                          <View style={styles.portfolioValueContainer}>
                            <View style={styles.portfolioFlexRow}>
                              <Text style={styles.detailedAccountValue}>$10,000</Text>
                              <View style={styles.arrowWithDays}>
                                <Text style={styles.daysText}>90 days</Text>
                                <Text style={styles.tallArrowText}>⟶</Text>
                              </View>
                              <Text style={styles.detailedAccountValueGreen}>$20,000</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.profitDisplayContainer}>
                          <Text style={styles.profitDisplayText}>+$360.00 <Text style={styles.profitPercentage}>(+1.49%)</Text></Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}

              </LinearGradient>
            </View>
          )}
        </View>

        <View style={styles.championshipSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quantrock Championship Stages</Text>
          </View>

          <View style={styles.carouselContainer}>
            <ScrollView
              ref={carouselRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={width - 40}
              onScrollBeginDrag={handleScrollBeginDrag}
              onScrollEndDrag={handleScrollEndDrag}
              contentContainerStyle={styles.carouselContent}>
              {challengeCards.map(card => renderChallengeCard(card))}
            </ScrollView>

            <View style={styles.pagination}>
              {challengeCards.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    activeCardIndex === index && styles.paginationDotActive
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.heroCard}>
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradient}>

              <View style={styles.heroBadge}>
                <Trophy size={16} color="#fbbf24" strokeWidth={2} />
                <Text style={styles.heroBadgeText}>Quantrock Global Investment Championship</Text>
              </View>

              <Text style={styles.heroTitle}>From Training to Challenge...</Text>
              <Text style={styles.heroTitle}>
                Up to a <Text style={styles.heroHighlight}>Real Portfolio</Text>
              </Text>
              <Text style={styles.heroAmount}>$10,000 and 50% of Profits</Text>

              <Text style={styles.heroDescription}>
                A comprehensive program designed to refine investors' skills and empower them to experience a real investment journey that starts with learning on a simulated portfolio and ends with managing real portfolios.
              </Text>

              <View style={styles.heroButtons}>
                <TouchableOpacity
                  style={styles.heroButtonSecondary}
                  onPress={() => Linking.openURL('https://challenge.quantrock.com/')}>
                  <Text style={styles.heroButtonSecondaryText}>How It Works</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.heroButtonPrimary}
                  onPress={() => router.push('/')}>
                  <Text style={styles.heroButtonPrimaryText}>Start Challenge</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>$10,000</Text>
                  <Text style={styles.statLabel}>Real Funding</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>50%</Text>
                  <Text style={styles.statLabel}>Profit Share</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>High Watermark</Text>
                  <Text style={styles.statLabel}>Profit Protection</Text>
                </View>
              </View>

            </LinearGradient>
          </View>

          <View style={styles.tradingPowerCard}>
            <LinearGradient
              colors={['#1e293b', '#334155']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.tradingPowerGradient}>

              <View style={styles.tradingPowerLeft}>
                <View style={styles.coinsIcon}>
                  <View style={styles.coinStack}>
                    <TrendingUpIcon size={24} color="#f97316" strokeWidth={2.5} />
                  </View>
                </View>

                <Text style={styles.tradingPowerTitle}>Small Investment.</Text>
                <Text style={[styles.tradingPowerTitle, styles.tradingPowerHighlight]}>
                  Big Trading Power.
                </Text>

                <Text style={styles.tradingPowerDescription}>
                  For every $1 you pay, you unlock access to up to $150 in trading capital.
                </Text>

                <TouchableOpacity style={styles.joinButton} onPress={() => router.push('/')}>
                  <Text style={styles.joinButtonText}>Join Challenge</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tradingPowerRight}>
                <View style={styles.visualizationContainer}>
                  <View style={styles.multiplierBadge}>
                    <Text style={styles.multiplierText}>X150</Text>
                    <Info size={16} color="#94a3b8" strokeWidth={2} />
                  </View>

                  <Text style={styles.tradingPowerLabel}>Trading Power</Text>

                  <View style={styles.circleVisualization}>
                    <View style={styles.smallCircle}>
                      <Text style={styles.smallCircleText}>$69</Text>
                    </View>
                    <View style={styles.largeCircle}>
                      <Text style={styles.largeCircleText}>$10,000</Text>
                    </View>
                    <View style={styles.connectionLines} />
                  </View>

                  <View style={styles.legend}>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendDot, styles.legendDotBlue]} />
                      <Text style={styles.legendText}>Initial investment</Text>
                    </View>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendDot, styles.legendDotOrange]} />
                      <Text style={styles.legendText}>Trading power</Text>
                    </View>
                  </View>
                </View>
              </View>

            </LinearGradient>
          </View>

        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sponsors</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeSponsorTab === 'banking' && styles.activeTab]}
            onPress={() => setActiveSponsorTab('banking')}>
            <Text style={[styles.tabText, activeSponsorTab === 'banking' && styles.activeTabText]}>Banking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeSponsorTab === 'educational' && styles.activeTab]}
            onPress={() => setActiveSponsorTab('educational')}>
            <Text style={[styles.tabText, activeSponsorTab === 'educational' && styles.activeTabText]}>Educational</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeSponsorTab === 'media' && styles.activeTab]}
            onPress={() => setActiveSponsorTab('media')}>
            <Text style={[styles.tabText, activeSponsorTab === 'media' && styles.activeTabText]}>Media</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sponsorCarouselContainer}>
          <ScrollView
            ref={sponsorCarouselRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleSponsorScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={width - 40}
            onScrollBeginDrag={handleSponsorScrollBeginDrag}
            onScrollEndDrag={handleSponsorScrollEndDrag}
            contentContainerStyle={styles.carouselContent}>
            {getCurrentSponsors().map(card => renderSponsorCard(card))}
          </ScrollView>

          <View style={styles.pagination}>
            {getCurrentSponsors().map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  activeSponsorIndex === index && styles.paginationDotActive
                ]}
              />
            ))}
          </View>
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
  carouselContainer: {
    paddingVertical: 24,
  },
  sponsorCarouselContainer: {
    paddingVertical: 24,
  },
  carouselContent: {
    paddingHorizontal: 20,
    gap: 0,
  },
  carouselItem: {
    paddingRight: 0,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  paginationDotActive: {
    backgroundColor: '#3b82f6',
    width: 24,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0,
  },
  championshipSection: {
    marginBottom: 20,
  },
  profileCard: {
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  profileGradient: {
    padding: 16,
    borderRadius: 24,
    position: 'relative',
  },
  glowBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.5)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTitleContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  profileSubtitle: {
    fontSize: 11,
    color: '#cbd5e1',
    lineHeight: 16,
    letterSpacing: 0.1,
  },
  badge: {
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoGrid: {
    flex: 1,
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  infoValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  visitButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderWidth: 2,
    borderColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visitButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradientCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  cardTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  yourRankText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    opacity: 0.9,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  podiumContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 16,
    paddingBottom: 8,
  },
  podiumPosition: {
    flex: 1,
    alignItems: 'center',
  },
  firstPlace: {
    marginTop: 0,
  },
  secondPlace: {
    marginTop: 20,
  },
  thirdPlace: {
    marginTop: 30,
  },
  roundHolder: {
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  rankBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    borderWidth: 2,
    borderColor: '#1e3a8a',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  rankBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  roundAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderWidth: 3,
    borderColor: '#94a3b8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  firstAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#fbbf24',
    borderWidth: 4,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  podiumFlag: {
    fontSize: 24,
    marginTop: 4,
  },
  userInfo: {
    alignItems: 'center',
    gap: 4,
  },
  podiumContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  portfolioRow: {
    alignItems: 'center',
    marginTop: 4,
  },
  portfolioLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#cbd5e1',
    letterSpacing: 0.2,
  },
  portfolioValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  portfolioValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.2,
  },
  portfolioValueAfter: {
    fontSize: 11,
    fontWeight: '700',
    color: '#22c55e',
    letterSpacing: 0.2,
  },
  arrowSymbol: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '700',
  },
  profitBox: {
    alignItems: 'center',
    gap: 2,
    marginTop: 4,
  },
  profitAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#22c55e',
    letterSpacing: 0.2,
  },
  profitPercent: {
    fontSize: 14,
    fontWeight: '700',
    color: '#22c55e',
    letterSpacing: 0.2,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  profitText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22c55e',
    marginTop: 2,
  },
  smallProfit: {
    fontSize: 16,
  },
  tradesText: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
  },
  heroCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  heroGradient: {
    padding: 24,
    borderRadius: 24,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fbbf24',
    letterSpacing: 0.2,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 36,
    letterSpacing: 0.3,
  },
  heroHighlight: {
    color: '#fbbf24',
  },
  heroAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fbbf24',
    marginTop: 8,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  heroDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
    marginBottom: 24,
    letterSpacing: 0.2,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  heroButtonSecondary: {
    flex: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.4)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  heroButtonSecondaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  heroButtonPrimary: {
    flex: 1,
    backgroundColor: '#06b6d4',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  heroButtonPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
    textAlign: 'center',
  },
  tradingPowerCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 24,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tradingPowerGradient: {
    padding: 24,
    borderRadius: 24,
  },
  tradingPowerLeft: {
    marginBottom: 32,
  },
  coinsIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  coinStack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradingPowerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 40,
    letterSpacing: 0.5,
  },
  tradingPowerHighlight: {
    color: '#f97316',
    marginBottom: 16,
  },
  tradingPowerDescription: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 24,
    marginBottom: 24,
    letterSpacing: 0.2,
  },
  joinButton: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  tradingPowerRight: {
    width: '100%',
  },
  visualizationContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
  },
  multiplierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  multiplierText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  tradingPowerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
    marginBottom: 20,
  },
  circleVisualization: {
    position: 'relative',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  smallCircle: {
    position: 'absolute',
    left: 20,
    bottom: 40,
    width: 80,
    height: 80,
    backgroundColor: '#06b6d4',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  smallCircleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  largeCircle: {
    position: 'absolute',
    right: 0,
    top: 20,
    width: 160,
    height: 160,
    backgroundColor: '#f97316',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  largeCircleText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  connectionLines: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendDotBlue: {
    backgroundColor: '#06b6d4',
  },
  legendDotOrange: {
    backgroundColor: '#f97316',
  },
  legendText: {
    fontSize: 12,
    color: '#cbd5e1',
    fontWeight: '500',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 6,
    gap: 0,
    borderWidth: 3,
    borderColor: '#3b82f6',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.3,
  },
  activeTabText: {
    color: '#fff',
  },
  expandButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  expandIcon: {
    transform: [{ rotate: '0deg' }],
  },
  expandIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  expandedList: {
    marginTop: 16,
    gap: 12,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  leaderboardRank: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fbbf24',
    width: 40,
  },
  leaderboardName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.2,
  },
  leaderboardProfit: {
    fontSize: 14,
    fontWeight: '700',
    color: '#22c55e',
    marginRight: 12,
  },
  leaderboardTrades: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  expandedCardDetails: {
    marginTop: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 10,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3b82f6',
    marginTop: 6,
  },
  detailText: {
    flex: 1,
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  detailedLeaderboardCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  rankCircle: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderWidth: 2,
    borderColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  rankCircleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3b82f6',
    letterSpacing: 0.3,
  },
  detailedCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  detailedRankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailedRankNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  detailedRankNumberSmall: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
    letterSpacing: 0.3,
  },
  detailedNameSection: {
    flex: 1,
  },
  detailedName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  countryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  countryFlag: {
    fontSize: 16,
  },
  countryCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
  detailedStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailedStatItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  detailedStatLabel: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 4,
  },
  detailedStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  detailedGainValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10b981',
    letterSpacing: 0.3,
  },
  detailedAccountRow: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailedAccountLabel: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  portfolioValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailedAccountValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  detailedAccountValueGreen: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10b981',
    letterSpacing: 0.3,
  },
  arrowContainer: {
    alignItems: 'center',
    gap: 2,
  },
  valueWithDays: {
    alignItems: 'flex-end',
    gap: 2,
  },
  portfolioFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  arrowWithDays: {
    alignItems: 'center',
    gap: 0,
  },
  daysText: {
    fontSize: 9,
    fontWeight: '500',
    color: '#94a3b8',
    letterSpacing: 0.3,
    marginBottom: -4,
  },
  tallArrowText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3b82f6',
    letterSpacing: 0,
  },
  profitDisplayContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  profitDisplayText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10b981',
    letterSpacing: 0.3,
  },
  profitPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
    opacity: 0.8,
  },
});
