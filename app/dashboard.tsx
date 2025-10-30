import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Image, Modal, TextInput, Switch, PanResponder } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search, Star, Bell, Eye, ChevronDown, Flag, X, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useRef } from 'react';
import Svg, { Circle } from 'react-native-svg';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [selectedStage, setSelectedStage] = useState('CHALLENGE');
  const [selectedOrderTab, setSelectedOrderTab] = useState('Open');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedBottomTab, setSelectedBottomTab] = useState('watchlist');
  const [modalVisible, setModalVisible] = useState(false);
  const [isModifyingOrder, setIsModifyingOrder] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [inputType, setInputType] = useState<'units' | 'amount'>('amount');
  const [protectorEnabled, setProtectorEnabled] = useState(false);
  const [selectedStock, setSelectedStock] = useState({ symbol: 'MCD', name: "McDonald's Corporation", price: 307.77, change: 3.01 });
  const [riskPercentage, setRiskPercentage] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [stopLossValue, setStopLossValue] = useState('0');
  const [stopLossDollar, setStopLossDollar] = useState('0');
  const [isEditingStopLoss, setIsEditingStopLoss] = useState(false);
  const [isEditingStopLossDollar, setIsEditingStopLossDollar] = useState(false);
  const [takeProfitValue, setTakeProfitValue] = useState('0');
  const [takeProfitDollar, setTakeProfitDollar] = useState('0');
  const [isEditingTakeProfit, setIsEditingTakeProfit] = useState(false);
  const [isEditingTakeProfitDollar, setIsEditingTakeProfitDollar] = useState(false);
  const [takeProfitModalVisible, setTakeProfitModalVisible] = useState(false);
  const [tpPercent, setTpPercent] = useState('1.00');
  const [tpAmount, setTpAmount] = useState('100.00');
  const [tpPrice, setTpPrice] = useState('99.00');
  const [tpSliderPercent, setTpSliderPercent] = useState(1);
  const [stopLossModalVisible, setStopLossModalVisible] = useState(false);
  const [slPercent, setSlPercent] = useState('1.00');
  const [slAmount, setSlAmount] = useState('100.00');
  const [slPrice, setSlPrice] = useState('99.00');
  const [slSliderPercent, setSlSliderPercent] = useState(1);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const sliderWidth = useRef(0);
  const tpSliderWidth = useRef(0);
  const slSliderWidth = useRef(0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const availableFunds = 59462.33;

  const calculateInputValue = (percentage: number) => {
    if (inputType === 'amount') {
      return (availableFunds * percentage / 100).toFixed(2);
    } else {
      const unitPrice = selectedStock.price;
      const units = Math.floor((availableFunds * percentage / 100) / unitPrice);
      return units.toString();
    }
  };

  const calculateTakeProfitValues = (percentage: number) => {
    const basePrice = selectedStock.price;
    const profitPrice = basePrice * (1 + percentage / 100);
    const amount = (parseFloat(inputValue || '0') * percentage / 100);

    setTpPercent(percentage.toFixed(2));
    setTpPrice(profitPrice.toFixed(2));
    setTpAmount(amount.toFixed(2));
    setTpSliderPercent(percentage);
  };

  const handleTpPercentChange = (value: string) => {
    setTpPercent(value);
    const percentage = parseFloat(value) || 0;
    const basePrice = selectedStock.price;
    const profitPrice = basePrice * (1 + percentage / 100);
    const amount = (parseFloat(inputValue || '0') * percentage / 100);

    setTpPrice(profitPrice.toFixed(2));
    setTpAmount(amount.toFixed(2));
    setTpSliderPercent(Math.min(100, Math.max(0, percentage)));
  };

  const handleTpAmountChange = (value: string) => {
    setTpAmount(value);
    const amount = parseFloat(value) || 0;
    const totalAmount = parseFloat(inputValue || '1');
    const percentage = (amount / totalAmount) * 100;
    const basePrice = selectedStock.price;
    const profitPrice = basePrice * (1 + percentage / 100);

    setTpPercent(percentage.toFixed(2));
    setTpPrice(profitPrice.toFixed(2));
    setTpSliderPercent(Math.min(100, Math.max(0, percentage)));
  };

  const handleTpPriceChange = (value: string) => {
    setTpPrice(value);
    const profitPrice = parseFloat(value) || 0;
    const basePrice = selectedStock.price;
    const percentage = ((profitPrice - basePrice) / basePrice) * 100;
    const amount = (parseFloat(inputValue || '0') * percentage / 100);

    setTpPercent(percentage.toFixed(2));
    setTpAmount(amount.toFixed(2));
    setTpSliderPercent(Math.min(100, Math.max(0, percentage)));
  };

  const calculateStopLossValues = (percentage: number) => {
    const basePrice = selectedStock.price;
    const lossPrice = basePrice * (1 - percentage / 100);
    const amount = (parseFloat(inputValue || '0') * percentage / 100);

    setSlPercent(percentage.toFixed(2));
    setSlPrice(lossPrice.toFixed(2));
    setSlAmount(amount.toFixed(2));
    setSlSliderPercent(percentage);
  };

  const handleSlPercentChange = (value: string) => {
    setSlPercent(value);
    const percentage = parseFloat(value) || 0;
    const basePrice = selectedStock.price;
    const lossPrice = basePrice * (1 - percentage / 100);
    const amount = (parseFloat(inputValue || '0') * percentage / 100);

    setSlPrice(lossPrice.toFixed(2));
    setSlAmount(amount.toFixed(2));
    setSlSliderPercent(Math.min(100, Math.max(0, percentage)));
  };

  const handleSlAmountChange = (value: string) => {
    setSlAmount(value);
    const amount = parseFloat(value) || 0;
    const totalAmount = parseFloat(inputValue || '1');
    const percentage = (amount / totalAmount) * 100;
    const basePrice = selectedStock.price;
    const lossPrice = basePrice * (1 - percentage / 100);

    setSlPercent(percentage.toFixed(2));
    setSlPrice(lossPrice.toFixed(2));
    setSlSliderPercent(Math.min(100, Math.max(0, percentage)));
  };

  const handleSlPriceChange = (value: string) => {
    setSlPrice(value);
    const price = parseFloat(value) || 0;
    const basePrice = selectedStock.price;
    const percentage = ((basePrice - price) / basePrice) * 100;
    const amount = (parseFloat(inputValue || '0') * percentage / 100);

    setSlPercent(percentage.toFixed(2));
    setSlAmount(amount.toFixed(2));
    setSlSliderPercent(Math.min(100, Math.max(0, percentage)));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const locationX = evt.nativeEvent.locationX;
        const percentage = Math.max(0, Math.min(100, (locationX / sliderWidth.current) * 100));
        setRiskPercentage(percentage);
        setInputValue(calculateInputValue(percentage));
      },
      onPanResponderMove: (evt) => {
        const locationX = evt.nativeEvent.locationX;
        const percentage = Math.max(0, Math.min(100, (locationX / sliderWidth.current) * 100));
        setRiskPercentage(percentage);
        setInputValue(calculateInputValue(percentage));
      },
    })
  ).current;

  const tpPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const locationX = evt.nativeEvent.locationX;
        const percentage = Math.max(0, Math.min(100, (locationX / tpSliderWidth.current) * 100));
        calculateTakeProfitValues(percentage);
      },
      onPanResponderMove: (evt) => {
        const locationX = evt.nativeEvent.locationX;
        const percentage = Math.max(0, Math.min(100, (locationX / tpSliderWidth.current) * 100));
        calculateTakeProfitValues(percentage);
      },
    })
  ).current;

  const slPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const locationX = evt.nativeEvent.locationX;
        const percentage = Math.max(0, Math.min(100, (locationX / slSliderWidth.current) * 100));
        calculateStopLossValues(percentage);
      },
      onPanResponderMove: (evt) => {
        const locationX = evt.nativeEvent.locationX;
        const percentage = Math.max(0, Math.min(100, (locationX / slSliderWidth.current) * 100));
        calculateStopLossValues(percentage);
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#fff" strokeWidth={2} />
        </TouchableOpacity>

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
        <LinearGradient
          colors={['#1a1a3e', '#0f0f23']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.accountCard}>

          <View style={styles.accountHeader}>
            <View style={styles.accountInfo}>
              <View style={styles.flag}>
                <Flag size={20} color="#3b82f6" strokeWidth={2} />
              </View>
              <Text style={styles.accountNumber}>801088226</Text>
              <Text style={styles.demoLabel}>Demo</Text>
              <ChevronDown size={16} color="#9ca3af" strokeWidth={2} />
            </View>
            <TouchableOpacity style={styles.statsIcon} onPress={() => router.push('/qchat')}>
              <LinearGradient
                colors={['#a855f7', '#3b82f6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statsIconGradient}>
                <Text style={styles.statsIconText}>📊</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.netAssetsRow}>
            <Text style={styles.netAssetsLabel}>Net Assets</Text>
            <Eye size={20} color="#9ca3af" strokeWidth={2} />
          </View>

          <View style={styles.netAssetsValueRow}>
            <Text style={styles.netAssetsValue}>9,645.50 <Text style={styles.currency}>USD</Text></Text>
            <TouchableOpacity onPress={() => setInfoModalVisible(true)} style={styles.infoIconContainer}>
              <Info size={16} color="#9ca3af" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <View style={styles.profitRow}>
            <Text style={styles.profitLabel}>Unrealized P/L</Text>
            <Text style={styles.profitValue}>+$360.00 (+1.48%)</Text>
            <Text style={styles.profitArrow}>›</Text>
          </View>

          <View style={styles.profitSeparator} />

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Cash Available</Text>
              <Text style={styles.metricValue}>$6,000.0</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Invest Value</Text>
              <Text style={styles.metricValue}>$4,000.0</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Market Value</Text>
              <Text style={styles.metricValue}>$4,500.0</Text>
            </View>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarLabels}>
              <Text style={styles.progressBarLabel}>0</Text>
              <Text style={styles.progressBarLabel}>100</Text>
            </View>
            <LinearGradient
              colors={['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.progressBar}
            />
            <View style={[styles.progressTriangle, { left: '3%' }]} />
          </View>

          <Text style={styles.investedPercentage}>3% invested</Text>

          <TouchableOpacity style={styles.cardIndicatorWrapper} onPress={toggleExpand}>
            <Animated.View style={{ transform: [{ rotate }] }}>
              <ChevronDown size={24} color="rgba(255, 255, 255, 0.5)" strokeWidth={2} />
            </Animated.View>
          </TouchableOpacity>

          {isExpanded && (
            <>
              <View style={styles.tabsContainer}>
                <View style={styles.tabWrapper}>
                  <TouchableOpacity
                    style={[styles.tab, selectedTab === 'Overview' && styles.tabActive]}
                    onPress={() => setSelectedTab('Overview')}>
                    <Text style={[styles.tabText, selectedTab === 'Overview' && styles.tabTextActive]}>
                      Overview
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.stageSliderContainer}>
                <View style={styles.stageLabelRow}>
                  <Text style={styles.stageSliderLabel}>TRAINING</Text>
                  <Text style={styles.stageSliderLabel}>CHALLENGE</Text>
                  <Text style={styles.stageSliderLabel}>TRADING</Text>
                </View>
                <View style={styles.stageSlider}>
                  <View style={styles.stageSliderSection}>
                    {[...Array(10)].map((_, i) => (
                      <View
                        key={`green-${i}`}
                        style={[
                          styles.sliderBlock,
                          {
                            backgroundColor: `rgba(34, 197, 94, ${0.3 + (i * 0.07)})`,
                          },
                        ]}
                      />
                    ))}
                  </View>
                  <View style={styles.stageSliderSection}>
                    {[...Array(10)].map((_, i) => (
                      <View
                        key={`orange-${i}`}
                        style={[
                          styles.sliderBlock,
                          {
                            backgroundColor: `rgba(249, 115, 22, ${0.3 + (i * 0.07)})`,
                            borderRightWidth: i === 4 ? 2 : 0,
                            borderRightColor: i === 4 ? '#000000' : 'transparent',
                          },
                        ]}
                      />
                    ))}
                  </View>
                  <View style={styles.stageSliderSection}>
                    {[...Array(12)].map((_, i) => (
                      <View
                        key={`blue-${i}`}
                        style={[
                          styles.sliderBlock,
                          {
                            backgroundColor: `rgba(59, 130, 246, ${0.3 + (i * 0.058)})`,
                          },
                        ]}
                      />
                    ))}
                  </View>
                </View>
                <View style={styles.stagePointer}>
                  <View style={styles.stagePointerTriangle} />
                  <Text style={styles.stagePointerText}>STAGE</Text>
                </View>
              </View>

              <View style={styles.performanceSection}>

            <Text style={styles.sectionTitle}>Portfolio Performance</Text>

            <View style={styles.timePeriods}>
              <TouchableOpacity style={styles.timePeriodActive}>
                <Text style={styles.timePeriodTextActive}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.timePeriod}>
                <Text style={styles.timePeriodText}>D</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.timePeriod}>
                <Text style={styles.timePeriodText}>W</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.timePeriod}>
                <Text style={styles.timePeriodText}>M</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.timePeriod}>
                <Text style={styles.timePeriodText}>Y</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.performanceMetrics}>
              <View style={styles.riskLevelCard}>
                <Text style={styles.riskLevelTitle}>Risk Level</Text>
                <View style={styles.riskScaleContainer}>
                  <View style={styles.riskScale}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => {
                      const colors = [
                        '#2d5016', '#5a9129', '#7ba83e', '#b8d568', '#e8d75f',
                        '#f4a84f', '#f78d47', '#e85555', '#c74444', '#4a4a4a'
                      ];
                      return (
                        <View
                          key={num}
                          style={[
                            styles.riskBox,
                            { backgroundColor: colors[index] },
                            index === 0 && styles.riskBoxFirst,
                            index === 9 && styles.riskBoxLast,
                          ]}
                        >
                          <Text style={styles.riskNumber}>{num}</Text>
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.riskPointerContainer}>
                    <View style={[styles.riskPointer, { left: '15%' }]}>
                      <View style={styles.riskPointerTriangle} />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.returnCircle}>
                <Svg width={140} height={70} viewBox="0 0 140 70">
                  <Circle
                    cx="70"
                    cy="70"
                    r="60"
                    stroke="#1e293b"
                    strokeWidth="12"
                    fill="none"
                  />
                  <Circle
                    cx="70"
                    cy="70"
                    r="60"
                    stroke="#22c55e"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="377"
                    strokeDashoffset="360"
                    strokeLinecap="round"
                  />
                </Svg>
                <View style={styles.returnContent}>
                  <Text style={styles.returnLabel}>Return</Text>
                  <Text style={styles.returnValue}>1.49 <Text style={styles.returnPercent}>%</Text></Text>
                  <Text style={styles.returnStatus}>Not Qualified</Text>
                </View>
              </View>
            </View>

            <View style={styles.lossLimitsCard}>
              <View style={styles.riskStatsRow}>
                <View style={styles.riskStatItem}>
                  <View style={styles.circularProgress}>
                    <Svg width={48} height={48} viewBox="0 0 48 48">
                      <Circle
                        cx={24}
                        cy={24}
                        r={20}
                        stroke="#e5e7eb"
                        strokeWidth={4}
                        fill="none"
                      />
                      <Circle
                        cx={24}
                        cy={24}
                        r={20}
                        stroke="#10b981"
                        strokeWidth={4}
                        fill="none"
                        strokeDasharray={`${125.6 * 0.25} ${125.6 * 0.75}`}
                        strokeLinecap="round"
                        transform="rotate(-90 24 24)"
                      />
                    </Svg>
                    <View style={styles.circularProgressTriangle} />
                  </View>
                  <View>
                    <Text style={styles.riskStatLabel}>Max Daily Loss</Text>
                    <Text style={styles.riskStatValue}>5.0% $ 500</Text>
                  </View>
                </View>
                <View style={styles.riskStatItem}>
                  <View style={styles.circularProgress}>
                    <Svg width={48} height={48} viewBox="0 0 48 48">
                      <Circle
                        cx={24}
                        cy={24}
                        r={20}
                        stroke="#e5e7eb"
                        strokeWidth={4}
                        fill="none"
                      />
                      <Circle
                        cx={24}
                        cy={24}
                        r={20}
                        stroke="#ef4444"
                        strokeWidth={4}
                        fill="none"
                        strokeDasharray={`${125.6 * 0.4} ${125.6 * 0.6}`}
                        strokeLinecap="round"
                        transform="rotate(-90 24 24)"
                      />
                    </Svg>
                    <View style={styles.circularProgressTriangleDown} />
                  </View>
                  <View>
                    <Text style={styles.riskStatLabel}>Max Loss Limit</Text>
                    <Text style={styles.riskStatValue}>10 % $ 1000</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>AVG Profit</Text>
                <Text style={styles.statValue}>-6.80 %</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>AVG Loss</Text>
                <Text style={styles.statValue}>6</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Profit Factor</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
            </View>
          </View>

          <View style={styles.assetsSection}>
            <Text style={styles.assetsTitle}>Assets Allocation</Text>

            <View style={styles.allocationContainer}>
              <View style={styles.donutContainer}>
                <Svg width={200} height={200} viewBox="0 0 200 200">
                  <Circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#ef4444"
                    strokeWidth="30"
                    fill="none"
                    strokeDasharray="502"
                    strokeDashoffset="150"
                  />
                  <Circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#3b82f6"
                    strokeWidth="30"
                    fill="none"
                    strokeDasharray="502"
                    strokeDashoffset="200"
                  />
                  <Circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#eab308"
                    strokeWidth="30"
                    fill="none"
                    strokeDasharray="502"
                    strokeDashoffset="400"
                  />
                </Svg>
                <View style={styles.donutCenter}>
                  <Text style={styles.donutLabel}>Invested %</Text>
                  <Text style={styles.donutValue}>40 %</Text>
                </View>
              </View>

              <View style={styles.allocationLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#ef4444' }]} />
                  <Text style={styles.legendText}>COMMODITIES (70%)</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#f97316' }]} />
                  <Text style={styles.legendText}>CRYPTO (6.11%)</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#3b82f6' }]} />
                  <Text style={styles.legendText}>FOREX (10.64%)</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#eab308' }]} />
                  <Text style={styles.legendText}>STOCK (76.18%)</Text>
                </View>
              </View>
            </View>
          </View>
            </>
          )}
        </LinearGradient>

        <View style={styles.bottomTabsContainer}>
          <TouchableOpacity
            style={[styles.bottomTab, selectedBottomTab === 'watchlist' && styles.bottomTabActive]}
            onPress={() => setSelectedBottomTab('watchlist')}>
            <Text style={[styles.bottomTabText, selectedBottomTab === 'watchlist' && styles.bottomTabTextActive]}>
              Watch List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomTab, selectedBottomTab === 'holding' && styles.bottomTabActive]}
            onPress={() => setSelectedBottomTab('holding')}>
            <Text style={[styles.bottomTabText, selectedBottomTab === 'holding' && styles.bottomTabTextActive]}>
              Holding
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomTab, selectedBottomTab === 'orders' && styles.bottomTabActive]}
            onPress={() => setSelectedBottomTab('orders')}>
            <Text style={[styles.bottomTabText, selectedBottomTab === 'orders' && styles.bottomTabTextActive]}>
              Orders
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomTabContent}>
          {selectedBottomTab === 'watchlist' && (
            <View style={styles.watchlistContainer}>
              <View style={styles.watchlistHeader}>
                <Text style={styles.watchlistHeaderText}>ASSET</Text>
                <Text style={styles.watchlistHeaderText}>PRICE/% CHANGE</Text>
              </View>

              <TouchableOpacity style={styles.assetRow} onPress={() => router.push('/trading-plan')}>
                <View style={styles.assetLeft}>
                  <View style={[styles.assetIcon, { backgroundColor: '#00a4ef' }]}>
                    <Text style={styles.assetIconText}>M</Text>
                  </View>
                  <View>
                    <Text style={styles.assetSymbol}>MSFT</Text>
                    <Text style={styles.assetName}>Microsoft Corp</Text>
                  </View>
                </View>
                <View style={styles.assetRight}>
                  <Text style={styles.assetPrice}>$447.67</Text>
                  <Text style={styles.assetChangeNegative}>-2.11 -0.47%</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.assetRow} onPress={() => router.push('/trading-plan')}>
                <View style={styles.assetLeft}>
                  <View style={[styles.assetIcon, { backgroundColor: '#555555' }]}>
                    <Text style={styles.assetIconText}>A</Text>
                  </View>
                  <View>
                    <Text style={styles.assetSymbol}>AAPL</Text>
                    <Text style={styles.assetName}>Apple Inc</Text>
                  </View>
                </View>
                <View style={styles.assetRight}>
                  <Text style={styles.assetPrice}>$208.14</Text>
                  <Text style={styles.assetChangePositive}>+0.65 +0.31%</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.assetRow} onPress={() => router.push('/trading-plan')}>
                <View style={styles.assetLeft}>
                  <View style={[styles.assetIcon, { backgroundColor: '#76b900' }]}>
                    <Text style={styles.assetIconText}>N</Text>
                  </View>
                  <View>
                    <Text style={styles.assetSymbol}>NVDA</Text>
                    <Text style={styles.assetName}>NVIDIA Corp</Text>
                  </View>
                </View>
                <View style={styles.assetRight}>
                  <Text style={styles.assetPrice}>$118.11</Text>
                  <Text style={styles.assetChangeNegative}>-8.46 -6.68%</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.assetRow} onPress={() => router.push('/trading-plan')}>
                <View style={styles.assetLeft}>
                  <View style={[styles.assetIcon, { backgroundColor: '#555555' }]}>
                    <Text style={styles.assetIconText}>A</Text>
                  </View>
                  <View>
                    <Text style={styles.assetSymbol}>AMZN</Text>
                    <Text style={styles.assetName}>Amazon.com Inc</Text>
                  </View>
                </View>
                <View style={styles.assetRight}>
                  <Text style={styles.assetPrice}>$185.57</Text>
                  <Text style={styles.assetChangeNegative}>-3.51 -1.86%</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.assetRow} onPress={() => router.push('/trading-plan')}>
                <View style={styles.assetLeft}>
                  <View style={[styles.assetIcon, { backgroundColor: '#0668e1' }]}>
                    <Text style={styles.assetIconText}>M</Text>
                  </View>
                  <View>
                    <Text style={styles.assetSymbol}>META</Text>
                    <Text style={styles.assetName}>Meta Platforms Inc</Text>
                  </View>
                </View>
                <View style={styles.assetRight}>
                  <Text style={styles.assetPrice}>$498.91</Text>
                  <Text style={styles.assetChangePositive}>+4.13 +0.83%</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.assetRow} onPress={() => router.push('/trading-plan')}>
                <View style={styles.assetLeft}>
                  <View style={[styles.assetIcon, { backgroundColor: '#f7931a' }]}>
                    <Text style={styles.assetIconText}>₿</Text>
                  </View>
                  <View>
                    <Text style={styles.assetSymbol}>BTC</Text>
                    <Text style={styles.assetName}>Bitcoin</Text>
                  </View>
                </View>
                <View style={styles.assetRight}>
                  <Text style={styles.assetPrice}>$61,429.63</Text>
                  <Text style={styles.assetChangeNegative}>-1,409.66 -2.24%</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.assetRow} onPress={() => router.push('/trading-plan')}>
                <View style={styles.assetLeft}>
                  <View style={[styles.assetIcon, { backgroundColor: '#e50914' }]}>
                    <Text style={styles.assetIconText}>N</Text>
                  </View>
                  <View>
                    <Text style={styles.assetSymbol}>NFLX</Text>
                    <Text style={styles.assetName}>Netflix Inc</Text>
                  </View>
                </View>
                <View style={styles.assetRight}>
                  <Text style={styles.assetPrice}>$645.28</Text>
                  <Text style={styles.assetChangePositive}>+8.45 +1.33%</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.assetRow} onPress={() => router.push('/trading-plan')}>
                <View style={styles.assetLeft}>
                  <View style={[styles.assetIcon, { backgroundColor: '#00a4e4' }]}>
                    <Text style={styles.assetIconText}>T</Text>
                  </View>
                  <View>
                    <Text style={styles.assetSymbol}>TSLA</Text>
                    <Text style={styles.assetName}>Tesla Inc</Text>
                  </View>
                </View>
                <View style={styles.assetRight}>
                  <Text style={styles.assetPrice}>$238.72</Text>
                  <Text style={styles.assetChangePositive}>+12.15 +5.36%</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {selectedBottomTab === 'orders' && (
            <View style={styles.ordersContainer}>
              <View style={styles.orderStatusContainer}>
                <TouchableOpacity
                  style={[
                    styles.orderStatusTab,
                    selectedOrderTab === 'Open' && styles.orderStatusTabActive,
                  ]}
                  onPress={() => setSelectedOrderTab('Open')}
                >
                  <Text
                    style={[
                      styles.orderStatusText,
                      selectedOrderTab === 'Open' && styles.orderStatusTextActive,
                    ]}
                  >
                    Open <Text style={styles.orderCountText}>(2)</Text>
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.orderStatusTab,
                    selectedOrderTab === 'Pending' && styles.orderStatusTabActive,
                  ]}
                  onPress={() => setSelectedOrderTab('Pending')}
                >
                  <Text
                    style={[
                      styles.orderStatusText,
                      selectedOrderTab === 'Pending' && styles.orderStatusTextActive,
                    ]}
                  >
                    Pending <Text style={styles.orderCountText}>(3)</Text>
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.orderStatusTab,
                    selectedOrderTab === 'Closed' && styles.orderStatusTabActive,
                  ]}
                  onPress={() => setSelectedOrderTab('Closed')}
                >
                  <Text
                    style={[
                      styles.orderStatusText,
                      selectedOrderTab === 'Closed' && styles.orderStatusTextActive,
                    ]}
                  >
                    Closed <Text style={styles.orderCountText}>(2)</Text>
                  </Text>
                </TouchableOpacity>
              </View>

              {selectedOrderTab === 'Open' && (
                <>
                  <TouchableOpacity style={styles.orderCard} onPress={() => { setSelectedStock({ symbol: 'AAPL', name: 'Apple Inc', price: 250.00, change: 1.49 }); setIsModifyingOrder(false); setIsModifyingOrder(false); setModalVisible(true); }}>
                    <Text style={styles.orderDate}>08-10-2025 14:23</Text>
                    <View style={styles.orderHeader}>
                      <View style={styles.orderLeft}>
                        <Image source={{ uri: 'https://logo.clearbit.com/apple.com' }} style={styles.orderLogo} />
                        <View>
                          <Text style={styles.orderSymbol}>AAPL</Text>
                          <Text style={styles.orderName}>Apple Inc</Text>
                        </View>
                      </View>
                      <View style={styles.portfolioBadge}>
                        <View style={styles.portfolioIconDot} />
                        <Text style={styles.portfolioText}>Portfolio 12%</Text>
                      </View>
                    </View>

                    <View style={styles.orderDetails}>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}><Text style={styles.orderGreenText}>New Buy</Text> <Text style={styles.orderGreenText}>20 %</Text> <Text style={styles.orderArrowWhite}>→</Text> Units</Text>
                        <Text style={styles.orderDetailValue}>250</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Invested</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 60,500 <Text style={styles.orderArrow}>→</Text> <Text style={styles.orderGreenText}>$ 60,700</Text>
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Entry Price</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 245.50 <Text style={styles.orderArrow}>→</Text> <Text style={styles.orderGreenText}>$ 250.00</Text>
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelRed}>SL</Text>
                        <Text style={styles.orderRedText}>$ 240.00</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelGreen}>TP</Text>
                        <Text style={styles.orderGreenText}>$ 260.00</Text>
                      </View>
                    </View>

                    <View style={styles.orderProfitGreen}>
                      <Text style={styles.orderProfitAmountGreen}>+$360.00</Text>
                      <Text style={styles.orderProfitPercentGreen}>(+1.49%)</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.orderCard} onPress={() => { setSelectedStock({ symbol: 'AAPL', name: 'Apple Inc', price: 295.20, change: -1.85 }); setIsModifyingOrder(false); setModalVisible(true); }}>
                    <Text style={styles.orderDate}>05-10-2025 09:45</Text>
                    <View style={styles.orderHeader}>
                      <View style={styles.orderLeft}>
                        <Image source={{ uri: 'https://logo.clearbit.com/apple.com' }} style={styles.orderLogo} />
                        <View>
                          <Text style={styles.orderSymbol}>AAPL</Text>
                          <Text style={styles.orderName}>Apple Inc</Text>
                        </View>
                      </View>
                      <View style={styles.portfolioBadge}>
                        <View style={styles.portfolioIconDot} />
                        <Text style={styles.portfolioText}>Portfolio 8%</Text>
                      </View>
                    </View>

                    <View style={styles.orderDetails}>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}><Text style={styles.orderGreenText}>Add</Text> <Text style={styles.orderGreenText}>10%</Text> <Text style={styles.orderArrowWhite}>→</Text> Units</Text>
                        <Text style={styles.orderDetailValue}>150</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Invested</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 45,200 <Text style={styles.orderArrow}>→</Text> <Text style={styles.orderRedText}>$ 44,280</Text>
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Entry Price</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 301.33 <Text style={styles.orderArrow}>→</Text> <Text style={styles.orderRedText}>$ 295.20</Text>
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelRed}>SL</Text>
                        <Text style={styles.orderRedText}>$ 290.00</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelGreen}>TP</Text>
                        <Text style={styles.orderGreenText}>$ 315.00</Text>
                      </View>
                    </View>

                    <View style={styles.orderProfitRed}>
                      <Text style={styles.orderProfitAmountRed}>-$920.00</Text>
                      <Text style={styles.orderProfitPercentRed}>(-2.04%)</Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}

              {selectedOrderTab === 'Pending' && (
                <>
                  <TouchableOpacity style={styles.orderCard} onPress={() => { setSelectedStock({ symbol: 'TSLA', name: 'Tesla Inc', price: 245.00, change: 2.04 }); setIsModifyingOrder(false); setModalVisible(true); }}>
                    <Text style={styles.orderDate}>15-03-2025 11:30</Text>
                    <View style={styles.orderHeader}>
                      <View style={styles.orderLeft}>
                        <Image source={{ uri: 'https://logo.clearbit.com/tesla.com' }} style={styles.orderLogo} />
                        <View>
                          <Text style={styles.orderSymbol}>TSLA</Text>
                          <Text style={styles.orderName}>Tesla Inc</Text>
                        </View>
                      </View>
                      <View style={styles.portfolioBadge}>
                        <View style={styles.portfolioIconDot} />
                        <Text style={styles.portfolioText}>Portfolio 5%</Text>
                      </View>
                    </View>

                    <View style={styles.orderDetails}>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}><Text style={styles.orderGreenText}>New Buy</Text> <Text style={styles.orderGreenText}>10 %</Text> <Text style={styles.orderArrowWhite}>→</Text> Units</Text>
                        <Text style={styles.orderDetailValue}>100</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Invested</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 24,000 <Text style={styles.orderArrow}>→</Text> <Text style={styles.orderGreenText}>$ 24,500</Text>
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Entry Price</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 240.00 <Text style={styles.orderArrow}>→</Text> <Text style={styles.orderGreenText}>$ 245.00</Text>
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelRed}>SL</Text>
                        <Text style={styles.orderRedText}>$ 235.00</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelGreen}>TP</Text>
                        <Text style={styles.orderGreenText}>$ 255.00</Text>
                      </View>
                    </View>
                    <View style={styles.orderButtonsRow}>
                      <TouchableOpacity style={styles.analysisButton} onPress={() => { setSelectedStock({ symbol: 'TSLA', name: 'Tesla Inc', price: 245.00, change: 2.04 }); setIsModifyingOrder(true); setModalVisible(true); }}>
                        <Text style={styles.analysisButtonText}>Modify Order</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.cancelButton} onPress={() => setCancelModalVisible(true)}>
                        <Text style={styles.cancelButtonText}>Cancel Order</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.orderCard} onPress={() => { setSelectedStock({ symbol: 'MSFT', name: 'Microsoft Corp', price: 342.00, change: 0.59 }); setIsModifyingOrder(false); setModalVisible(true); }}>
                    <Text style={styles.orderDate}>14-03-2025 16:10</Text>
                    <View style={styles.orderHeader}>
                      <View style={styles.orderLeft}>
                        <Image source={{ uri: 'https://logo.clearbit.com/microsoft.com' }} style={styles.orderLogo} />
                        <View>
                          <Text style={styles.orderSymbol}>MSFT</Text>
                          <Text style={styles.orderName}>Microsoft Corp</Text>
                        </View>
                      </View>
                      <View style={styles.portfolioBadge}>
                        <View style={styles.portfolioIconDot} />
                        <Text style={styles.portfolioText}>Portfolio 10%</Text>
                      </View>
                    </View>

                    <View style={styles.orderDetails}>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}><Text style={styles.orderGreenText}>Add</Text> <Text style={styles.orderGreenText}>10%</Text> <Text style={styles.orderArrowWhite}>→</Text> Units</Text>
                        <Text style={styles.orderDetailValue}>200</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Invested</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 68,000 <Text style={styles.orderArrow}>→</Text> <Text style={styles.orderGreenText}>$ 68,400</Text>
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Entry Price</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 340.00 <Text style={styles.orderArrow}>→</Text> <Text style={styles.orderGreenText}>$ 342.00</Text>
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelRed}>SL</Text>
                        <Text style={styles.orderRedText}>$ 330.00</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelGreen}>TP</Text>
                        <Text style={styles.orderGreenText}>$ 355.00</Text>
                      </View>
                    </View>
                    <View style={styles.orderButtonsRow}>
                      <TouchableOpacity style={styles.analysisButton} onPress={() => { setSelectedStock({ symbol: 'MSFT', name: 'Microsoft Corp', price: 342.00, change: 0.59 }); setIsModifyingOrder(true); setModalVisible(true); }}>
                        <Text style={styles.analysisButtonText}>Modify Order</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.cancelButton} onPress={() => setCancelModalVisible(true)}>
                        <Text style={styles.cancelButtonText}>Cancel Order</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.orderCard} onPress={() => { setSelectedStock({ symbol: 'AAPL', name: 'Apple Inc', price: 175.00, change: -1.12 }); setIsModifyingOrder(false); setModalVisible(true); }}>
                    <Text style={styles.orderDate}>13-03-2025 10:05</Text>
                    <View style={styles.orderHeader}>
                      <View style={styles.orderLeft}>
                        <Image source={{ uri: 'https://logo.clearbit.com/apple.com' }} style={styles.orderLogo} />
                        <View>
                          <Text style={styles.orderSymbol}>AAPL</Text>
                          <Text style={styles.orderName}>Apple Inc</Text>
                        </View>
                      </View>
                      <View style={styles.portfolioBadge}>
                        <View style={styles.portfolioIconDot} />
                        <Text style={styles.portfolioText}>Portfolio 8%</Text>
                      </View>
                    </View>

                    <View style={styles.orderDetails}>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}><Text style={styles.orderRedText}>Reduce</Text> <Text style={styles.orderRedText}>10%</Text> <Text style={styles.orderArrowWhite}>→</Text> Units</Text>
                        <Text style={styles.orderDetailValue}>50</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Invested</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 17,500 <Text style={styles.orderArrow}>→</Text> <Text style={styles.orderRedText}>$ 15,750</Text>
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Entry Price</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 175.00 <Text style={styles.orderArrow}>→</Text> $ 175.00
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelRed}>SL</Text>
                        <Text style={styles.orderRedText}>$ 165.00</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelGreen}>TP</Text>
                        <Text style={styles.orderGreenText}>$ 185.00</Text>
                      </View>
                    </View>
                    <View style={styles.orderButtonsRow}>
                      <TouchableOpacity style={styles.analysisButton} onPress={() => { setSelectedStock({ symbol: 'AAPL', name: 'Apple Inc', price: 175.00, change: -1.12 }); setIsModifyingOrder(true); setModalVisible(true); }}>
                        <Text style={styles.analysisButtonText}>Modify Order</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.cancelButton} onPress={() => setCancelModalVisible(true)}>
                        <Text style={styles.cancelButtonText}>Cancel Order</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.orderCard} onPress={() => { setSelectedStock({ symbol: 'NVDA', name: 'NVIDIA Corp', price: 512.00, change: 3.45 }); setIsModifyingOrder(false); setModalVisible(true); }}>
                    <Text style={styles.orderDate}>12-03-2025 13:52</Text>
                    <View style={styles.orderHeader}>
                      <View style={styles.orderLeft}>
                        <Image source={{ uri: 'https://logo.clearbit.com/nvidia.com' }} style={styles.orderLogo} />
                        <View>
                          <Text style={styles.orderSymbol}>NVDA</Text>
                          <Text style={styles.orderName}>NVIDIA Corp</Text>
                        </View>
                      </View>
                      <View style={styles.portfolioBadge}>
                        <View style={styles.portfolioIconDot} />
                        <Text style={styles.portfolioText}>Portfolio 12%</Text>
                      </View>
                    </View>

                    <View style={styles.orderDetails}>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}><Text style={styles.orderRedText}>Sold Out</Text> <Text style={styles.orderRedText}>100%</Text> <Text style={styles.orderArrowWhite}>→</Text> Units</Text>
                        <Text style={styles.orderDetailValue}>0</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Invested</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 51,200 <Text style={styles.orderArrow}>→</Text> <Text style={styles.orderRedText}>$ 0</Text>
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Entry Price</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 512.00 <Text style={styles.orderArrow}>→</Text> $ 512.00
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelRed}>SL</Text>
                        <Text style={styles.orderRedText}>$ 490.00</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelGreen}>TP</Text>
                        <Text style={styles.orderGreenText}>$ 530.00</Text>
                      </View>
                    </View>
                    <View style={styles.orderButtonsRow}>
                      <TouchableOpacity style={styles.analysisButton} onPress={() => { setSelectedStock({ symbol: 'NVDA', name: 'NVIDIA Corp', price: 512.00, change: 3.45 }); setIsModifyingOrder(true); setModalVisible(true); }}>
                        <Text style={styles.analysisButtonText}>Modify Order</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.cancelButton} onPress={() => setCancelModalVisible(true)}>
                        <Text style={styles.cancelButtonText}>Cancel Order</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </>
              )}

              {selectedOrderTab === 'Closed' && (
                <>
                  <View style={styles.orderCard}>
                    <Text style={styles.orderDate}>20-09-2025 15:30</Text>
                    <View style={styles.orderHeader}>
                      <View style={styles.orderLeft}>
                        <Image source={{ uri: 'https://logo.clearbit.com/amazon.com' }} style={styles.orderLogo} />
                        <View>
                          <Text style={styles.orderSymbol}>AMZN</Text>
                          <Text style={styles.orderName}>Amazon Inc</Text>
                        </View>
                      </View>
                      <View style={styles.portfolioBadge}>
                        <View style={styles.portfolioIconDot} />
                        <Text style={styles.portfolioText}>Portfolio 7%</Text>
                      </View>
                    </View>

                    <View style={styles.orderDetails}>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}><Text style={styles.orderRedText}>Reduce</Text> <Text style={styles.orderRedText}>10%</Text> <Text style={styles.orderArrowWhite}>→</Text> Units</Text>
                        <Text style={styles.orderDetailValue}>80</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Invested</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 12,000 <Text style={styles.orderArrow}>→</Text> <Text style={styles.orderGreenText}>$ 12,800</Text>
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Avg Price</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 150.00 <Text style={styles.orderArrow}>→</Text> $ 160.00
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelRed}>SL</Text>
                        <Text style={styles.orderRedText}>$ 145.00</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelGreen}>TP</Text>
                        <Text style={styles.orderGreenText}>$ 170.00</Text>
                      </View>
                    </View>

                    <View style={styles.orderProfitGreen}>
                      <Text style={styles.orderProfitAmountGreen}>+$800.00</Text>
                      <Text style={styles.orderProfitPercentGreen}>(+6.67%)</Text>
                    </View>
                  </View>

                  <View style={styles.orderCard}>
                    <Text style={styles.orderDate}>15-09-2025 12:18</Text>
                    <View style={styles.orderHeader}>
                      <View style={styles.orderLeft}>
                        <Image source={{ uri: 'https://logo.clearbit.com/netflix.com' }} style={styles.orderLogo} />
                        <View>
                          <Text style={styles.orderSymbol}>NFLX</Text>
                          <Text style={styles.orderName}>Netflix Inc</Text>
                        </View>
                      </View>
                      <View style={styles.portfolioBadge}>
                        <View style={styles.portfolioIconDot} />
                        <Text style={styles.portfolioText}>Portfolio 4%</Text>
                      </View>
                    </View>

                    <View style={styles.orderDetails}>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}><Text style={styles.orderRedText}>Soldout</Text> <Text style={styles.orderRedText}>10%</Text> <Text style={styles.orderArrowWhite}>→</Text> Units</Text>
                        <Text style={styles.orderDetailValue}>50</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Invested</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 20,000 <Text style={styles.orderArrow}>→</Text> <Text style={styles.orderGreenText}>$ 21,000</Text>
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Avg Price</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 400.00 <Text style={styles.orderArrow}>→</Text> $ 420.00
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelRed}>SL</Text>
                        <Text style={styles.orderRedText}>$ 390.00</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelGreen}>TP</Text>
                        <Text style={styles.orderGreenText}>$ 440.00</Text>
                      </View>
                    </View>

                    <View style={styles.orderProfitGreen}>
                      <Text style={styles.orderProfitAmountGreen}>+$1,000.00</Text>
                      <Text style={styles.orderProfitPercentGreen}>(+5.00%)</Text>
                    </View>
                  </View>

                  <View style={styles.orderCard}>
                    <Text style={styles.orderDate}>10-09-2025 09:42</Text>
                    <View style={styles.orderHeader}>
                      <View style={styles.orderLeft}>
                        <Image source={{ uri: 'https://logo.clearbit.com/meta.com' }} style={styles.orderLogo} />
                        <View>
                          <Text style={styles.orderSymbol}>META</Text>
                          <Text style={styles.orderName}>Meta Platforms</Text>
                        </View>
                      </View>
                      <View style={styles.portfolioBadge}>
                        <View style={styles.portfolioIconDot} />
                        <Text style={styles.portfolioText}>Portfolio 6%</Text>
                      </View>
                    </View>

                    <View style={styles.orderDetails}>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}><Text style={styles.orderYellowText}>Cancelled</Text> <Text style={styles.orderArrowWhite}>→</Text> Units</Text>
                        <Text style={styles.orderDetailValue}>120</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Invested</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 35,400
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Avg Price</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 295.00
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelRed}>SL</Text>
                        <Text style={styles.orderRedText}>$ 285.00</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelGreen}>TP</Text>
                        <Text style={styles.orderGreenText}>$ 330.00</Text>
                      </View>
                    </View>

                    <View style={styles.orderCancelledYellow}>
                      <Text style={styles.orderCancelledYellowText}>Cancelled by User</Text>
                    </View>
                  </View>

                  <View style={styles.orderCard}>
                    <Text style={styles.orderDate}>05-09-2025 16:55</Text>
                    <View style={styles.orderHeader}>
                      <View style={styles.orderLeft}>
                        <Image source={{ uri: 'https://logo.clearbit.com/google.com' }} style={styles.orderLogo} />
                        <View>
                          <Text style={styles.orderSymbol}>GOOGL</Text>
                          <Text style={styles.orderName}>Alphabet Inc</Text>
                        </View>
                      </View>
                      <View style={styles.portfolioBadge}>
                        <View style={styles.portfolioIconDot} />
                        <Text style={styles.portfolioText}>Portfolio 9%</Text>
                      </View>
                    </View>

                    <View style={styles.orderDetails}>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}><Text style={styles.orderYellowText}>Rejected</Text> <Text style={styles.orderArrowWhite}>→</Text> Units</Text>
                        <Text style={styles.orderDetailValue}>200</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Invested</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 28,500
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabel}>Avg Price</Text>
                        <Text style={styles.orderDetailValue}>
                          $ 142.50
                        </Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelRed}>SL</Text>
                        <Text style={styles.orderRedText}>$ 135.00</Text>
                      </View>
                      <View style={styles.orderDetailRow}>
                        <Text style={styles.orderDetailLabelGreen}>TP</Text>
                        <Text style={styles.orderGreenText}>$ 155.00</Text>
                      </View>
                    </View>

                    <View style={styles.orderCancelledYellow}>
                      <Text style={styles.orderCancelledYellowText}>Not enough money</Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          )}
          {selectedBottomTab === 'holding' && (
            <View style={styles.holdingContainer}>
              <TouchableOpacity style={styles.holdingCard} onPress={() => { setSelectedStock({ symbol: 'AAPL', name: 'Apple Inc', price: 250.00, change: 1.49 }); setIsModifyingOrder(false); setModalVisible(true); }}>
                <View style={styles.holdingHeader}>
                  <View style={styles.holdingLeft}>
                    <Image source={{ uri: 'https://logo.clearbit.com/apple.com' }} style={styles.holdingLogo} />
                    <View>
                      <Text style={styles.holdingSymbol}>AAPL</Text>
                      <Text style={styles.holdingName}>Apple Inc</Text>
                    </View>
                  </View>
                  <View style={styles.portfolioBadge}>
                    <View style={styles.portfolioIconDot} />
                    <Text style={styles.portfolioText}>Portfolio 12%</Text>
                  </View>
                </View>

                <View style={styles.holdingDetails}>
                  <View style={styles.holdingDetailRow}>
                    <Text style={styles.holdingDetailLabel}>Quantity</Text>
                    <Text style={styles.holdingDetailValue}>250</Text>
                  </View>
                  <View style={styles.holdingDetailRow}>
                    <Text style={styles.holdingDetailLabel}>Invested</Text>
                    <Text style={styles.holdingDetailValue}>
                      $ 60,500 <Text style={styles.holdingArrow}>→</Text> <Text style={styles.holdingGreenText}>$ 60,700</Text>
                    </Text>
                  </View>
                  <View style={styles.holdingDetailRow}>
                    <Text style={styles.holdingDetailLabel}>Avg Price</Text>
                    <Text style={styles.holdingDetailValue}>
                      $ 245.50 <Text style={styles.holdingArrow}>→</Text> <Text style={styles.holdingGreenText}>$ 250.00</Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.holdingProfitTransparent}>
                  <Text style={styles.holdingProfitAmountTransparent}>+$360.00</Text>
                  <Text style={styles.holdingProfitPercentTransparent}>(+1.49%)</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.holdingCard} onPress={() => { setSelectedStock({ symbol: 'NFLX', name: 'Netflix Inc', price: 645.28, change: -1.89 }); setIsModifyingOrder(false); setModalVisible(true); }}>
                <View style={styles.holdingHeader}>
                  <View style={styles.holdingLeft}>
                    <Image source={{ uri: 'https://logo.clearbit.com/netflix.com' }} style={styles.holdingLogo} />
                    <View>
                      <Text style={styles.holdingSymbol}>NFLX</Text>
                      <Text style={styles.holdingName}>Netflix Inc</Text>
                    </View>
                  </View>
                  <View style={styles.portfolioBadge}>
                    <View style={styles.portfolioIconDot} />
                    <Text style={styles.portfolioText}>Portfolio 8%</Text>
                  </View>
                </View>

                <View style={styles.holdingDetails}>
                  <View style={styles.holdingDetailRow}>
                    <Text style={styles.holdingDetailLabel}>Quantity</Text>
                    <Text style={styles.holdingDetailValue}>150</Text>
                  </View>
                  <View style={styles.holdingDetailRow}>
                    <Text style={styles.holdingDetailLabel}>Invested</Text>
                    <Text style={styles.holdingDetailValue}>
                      $ 95,000 <Text style={styles.holdingArrow}>→</Text> <Text style={styles.holdingGreenText}>$ 96,792</Text>
                    </Text>
                  </View>
                  <View style={styles.holdingDetailRow}>
                    <Text style={styles.holdingDetailLabel}>Avg Price</Text>
                    <Text style={styles.holdingDetailValue}>
                      $ 633.33 <Text style={styles.holdingArrow}>→</Text> <Text style={styles.holdingGreenText}>$ 645.28</Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.holdingProfitRed}>
                  <Text style={styles.holdingProfitAmountRed}>-$1,792.00</Text>
                  <Text style={styles.holdingProfitPercentRed}>(-1.89%)</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.holdingCard} onPress={() => { setSelectedStock({ symbol: 'TSLA', name: 'Tesla Inc', price: 238.72, change: 6.10 }); setIsModifyingOrder(false); setModalVisible(true); }}>
                <View style={styles.holdingHeader}>
                  <View style={styles.holdingLeft}>
                    <Image source={{ uri: 'https://logo.clearbit.com/tesla.com' }} style={styles.holdingLogo} />
                    <View>
                      <Text style={styles.holdingSymbol}>TSLA</Text>
                      <Text style={styles.holdingName}>Tesla Inc</Text>
                    </View>
                  </View>
                  <View style={styles.portfolioBadge}>
                    <View style={styles.portfolioIconDot} />
                    <Text style={styles.portfolioText}>Portfolio 6%</Text>
                  </View>
                </View>

                <View style={styles.holdingDetails}>
                  <View style={styles.holdingDetailRow}>
                    <Text style={styles.holdingDetailLabel}>Quantity</Text>
                    <Text style={styles.holdingDetailValue}>200</Text>
                  </View>
                  <View style={styles.holdingDetailRow}>
                    <Text style={styles.holdingDetailLabel}>Invested</Text>
                    <Text style={styles.holdingDetailValue}>
                      $ 45,000 <Text style={styles.holdingArrow}>→</Text> <Text style={styles.holdingGreenText}>$ 47,744</Text>
                    </Text>
                  </View>
                  <View style={styles.holdingDetailRow}>
                    <Text style={styles.holdingDetailLabel}>Avg Price</Text>
                    <Text style={styles.holdingDetailValue}>
                      $ 225.00 <Text style={styles.holdingArrow}>→</Text> <Text style={styles.holdingGreenText}>$ 238.72</Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.holdingProfitGreen}>
                  <Text style={styles.holdingProfitAmountGreen}>+$2,744.00</Text>
                  <Text style={styles.holdingProfitPercentGreen}>(+6.10%)</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <ArrowLeft size={24} color="#fff" strokeWidth={2} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Analysis</Text>
              <TouchableOpacity>
                <Star size={24} color="#fbbf24" strokeWidth={2} fill="#fbbf24" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScrollView}>
              <View style={styles.stockHeader}>
                <View style={styles.stockIcon}>
                  <Text style={styles.stockIconText}>M</Text>
                </View>
                <View style={styles.stockInfo}>
                  <Text style={styles.stockSymbol}>{selectedStock.symbol}</Text>
                  <Text style={styles.stockName}>{selectedStock.name}</Text>
                </View>
              </View>

              <View style={styles.stockPriceInfo}>
                <Text style={styles.stockPrice}>$ {selectedStock.price.toFixed(2)}</Text>
                <Text style={[styles.stockChange, selectedStock.change >= 0 ? styles.stockChangePositive : styles.stockChangeNegative]}>
                  {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)}%
                </Text>
              </View>

              <View style={styles.marketStatusBadge}>
                <View style={styles.marketStatusDot} />
                <Text style={styles.marketStatusText}>MARKET OPEN</Text>
              </View>

              <View style={styles.tradeButtons}>
                <TouchableOpacity
                  style={[styles.tradeButton, tradeType === 'buy' && styles.tradeButtonBuyActive]}
                  onPress={() => setTradeType('buy')}>
                  <Text style={[styles.tradeButtonText, tradeType === 'buy' && styles.tradeButtonTextActive]}>Buy/Long</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tradeButton, tradeType === 'sell' && styles.tradeButtonSellActive]}
                  onPress={() => setTradeType('sell')}>
                  <Text style={[styles.tradeButtonText, tradeType === 'sell' && styles.tradeButtonTextActive]}>Sell/Short</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.orderTypeTabsContainer}>
                <View style={styles.orderTypeTabs}>
                  <TouchableOpacity
                    style={[styles.orderTypeTab, orderType === 'market' && styles.orderTypeTabActive]}
                    onPress={() => setOrderType('market')}>
                    <Text style={[styles.orderTypeTabText, orderType === 'market' && styles.orderTypeTabTextActive]}>Market</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.orderTypeTab, orderType === 'limit' && styles.orderTypeTabActive]}
                    onPress={() => setOrderType('limit')}>
                    <Text style={[styles.orderTypeTabText, orderType === 'limit' && styles.orderTypeTabTextActive]}>Limit/Stop</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.priceRow}>
                <View style={[styles.priceItem, { alignItems: 'flex-start' }]}>
                  <Text style={[styles.priceLabel, { textAlign: 'left' }]}>Buy Price</Text>
                  {orderType === 'limit' ? (
                    <TextInput
                      style={[styles.priceValueInput, { textAlign: 'left' }]}
                      defaultValue="293.53"
                      keyboardType="numeric"
                      placeholderTextColor="#3b82f6"
                    />
                  ) : (
                    <Text style={[styles.priceValue, { textAlign: 'left' }]}>$293.53</Text>
                  )}
                </View>
                <View style={styles.priceItem}>
                  <Text style={styles.priceLabel}>Available Funds</Text>
                  <Text style={styles.priceValueGreen}>$59462.33</Text>
                </View>
              </View>

              <View style={styles.inputToggleContainer}>
                <LinearGradient
                  colors={['#8b5cf6', '#ec4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.inputToggleGradientBorder}>
                  <View style={styles.inputToggle}>
                    <TouchableOpacity
                      style={[styles.inputToggleButton, inputType === 'units' && styles.inputToggleButtonActive]}
                      onPress={() => setInputType('units')}>
                      <Text style={[styles.inputToggleText, inputType === 'units' && styles.inputToggleTextActive]}>Units</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.inputToggleButton, inputType === 'amount' && styles.inputToggleButtonActive]}
                      onPress={() => setInputType('amount')}>
                      <Text style={[styles.inputToggleText, inputType === 'amount' && styles.inputToggleTextActive]}>Amount</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.riskSliderContainer}>
                <View style={styles.riskScaleContainer}>
                  <View style={styles.riskScale}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => {
                      const colors = [
                        '#2d5016', '#5a9129', '#7ba83e', '#b8d568', '#e8d75f',
                        '#f4a84f', '#f78d47', '#e85555', '#c74444', '#4a4a4a'
                      ];
                      return (
                        <View
                          key={num}
                          style={[
                            styles.riskBox,
                            { backgroundColor: colors[index] },
                            index === 0 && styles.riskBoxFirst,
                            index === 9 && styles.riskBoxLast,
                          ]}
                        >
                          <Text style={styles.riskNumber}>{num}</Text>
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.riskPointerContainer}>
                    <View style={[styles.riskPointer, { left: `${Math.min(90, riskPercentage * 0.9)}%` }]}>
                      <View style={styles.riskPointerTriangle} />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.amountInput}>
                <TextInput
                  style={styles.amountInputField}
                  placeholder={inputType === 'units' ? 'quantity...' : 'amount...'}
                  placeholderTextColor="#6b7280"
                  keyboardType="numeric"
                  value={inputValue}
                  onChangeText={setInputValue}
                />
                <Text style={styles.amountCurrency}>{inputType === 'units' ? 'QTY' : 'USD'}</Text>
              </View>

              <View style={styles.equityInfo}>
                <Text style={styles.equityText}>
                  {inputType === 'units' ? (parseFloat(inputValue || '0') * selectedStock.price).toFixed(2) : (parseFloat(inputValue || '0') / selectedStock.price).toFixed(2)} {inputType === 'units' ? 'USD' : 'QUANTITY'} | OF EQUITY <Text style={styles.equityPercent}>{riskPercentage.toFixed(0)}%</Text>
                </Text>
              </View>

              <View style={styles.protectorContainer}>
                <View style={styles.protectorHeader}>
                  <Switch
                    value={protectorEnabled}
                    onValueChange={setProtectorEnabled}
                    trackColor={{ false: '#374151', true: '#f59e0b' }}
                    thumbColor={protectorEnabled ? '#fbbf24' : '#9ca3af'}
                  />
                  <Text style={styles.protectorLabel}>Quantrock Protector</Text>
                </View>

                {protectorEnabled && (
                  <View style={styles.stopLossRow}>
                    <TouchableOpacity
                      style={styles.stopLossItem}
                      onPress={() => {
                        setSlPercent(stopLossValue || '1.00');
                        setSlAmount(stopLossDollar || '100.00');
                        const percentage = parseFloat(stopLossValue || '1');
                        const lossPrice = selectedStock.price * (1 - percentage / 100);
                        setSlPrice(lossPrice.toFixed(2));
                        setSlSliderPercent(Math.min(100, Math.max(0, percentage)));
                        setStopLossModalVisible(true);
                      }}>
                      <Text style={styles.stopLossLabel}>StopLoss <Info size={14} color="#9ca3af" /></Text>
                      <Text style={styles.stopLossValue}>$ {stopLossDollar}</Text>
                      <Text style={styles.stopLossSubValue}>{stopLossValue}%</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.stopLossItem}
                      onPress={() => {
                        setTpPercent(takeProfitValue || '1.00');
                        setTpAmount(takeProfitDollar || '100.00');
                        const percentage = parseFloat(takeProfitValue || '1');
                        const profitPrice = selectedStock.price * (1 + percentage / 100);
                        setTpPrice(profitPrice.toFixed(2));
                        setTpSliderPercent(Math.min(100, Math.max(0, percentage)));
                        setTakeProfitModalVisible(true);
                      }}>
                      <Text style={styles.stopLossProfitLabel}>TakeProfit <Info size={14} color="#9ca3af" /></Text>
                      <Text style={styles.stopLossProfitValue}>$ {takeProfitDollar}</Text>
                      <Text style={styles.stopLossSubValue}>{takeProfitValue}%</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={styles.warningBox}>
                <Text style={styles.warningIcon}>!</Text>
                <Text style={styles.warningText}>
                  Attention! The trade will be executed at market conditions, difference with requested price may be significant!
                </Text>
              </View>

              <TouchableOpacity style={styles.confirmButton} onPress={() => {
                setModalVisible(false);
                setSuccessModalVisible(true);
                setIsModifyingOrder(false);
              }}>
                <LinearGradient
                  colors={['#22c55e', '#16a34a']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.confirmButtonGradient}>
                  <Text style={styles.confirmButtonText}>{isModifyingOrder ? 'Modify' : 'Confirm'}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={successModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}>
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalContainer}>
            <View style={styles.successIconContainer}>
              <View style={styles.successIcon}>
                <Svg width="60" height="60" viewBox="0 0 60 60">
                  <Circle cx="30" cy="30" r="28" fill="#22c55e" opacity="0.2" />
                  <Circle cx="30" cy="30" r="22" fill="#22c55e" />
                </Svg>
                <View style={styles.successCheckmark}>
                  <Text style={styles.successCheckmarkText}>✓</Text>
                </View>
              </View>
            </View>

            <Text style={styles.successTitle}>Order Successful</Text>

            <Text style={styles.successMessage}>
              Your buy order for {inputValue || '2.56'} of {selectedStock.symbol} has been placed successfully. Thank you for trading with Quantrock
            </Text>

            <TouchableOpacity
              style={styles.successButton}
              onPress={() => {
                setSuccessModalVisible(false);
                setSelectedBottomTab('holding');
              }}>
              <LinearGradient
                colors={['#22c55e', '#16a34a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.successButtonGradient}>
                <Text style={styles.successButtonText}>OK</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={cancelModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setCancelModalVisible(false)}>
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalContainer}>
            <View style={styles.successIconContainer}>
              <View style={styles.cancelIcon}>
                <Svg width="60" height="60" viewBox="0 0 60 60">
                  <Circle cx="30" cy="30" r="28" fill="#ef4444" opacity="0.2" />
                  <Circle cx="30" cy="30" r="22" fill="#ef4444" />
                </Svg>
                <View style={styles.successCheckmark}>
                  <Text style={styles.successCheckmarkText}>✓</Text>
                </View>
              </View>
            </View>

            <Text style={styles.successTitle}>Order Cancelled</Text>

            <TouchableOpacity
              style={styles.successButton}
              onPress={() => {
                setCancelModalVisible(false);
              }}>
              <LinearGradient
                colors={['#ef4444', '#dc2626']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.successButtonGradient}>
                <Text style={styles.successButtonText}>OK</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={takeProfitModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}>
        <View style={styles.takeProfitModalOverlay}>
          <TouchableOpacity
            style={styles.takeProfitModalContainer}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}>
            <LinearGradient
              colors={['#0f172a', '#1e293b', '#0f172a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.takeProfitModal}>

              <View style={styles.takeProfitHeader}>
                <View style={styles.takeProfitIcon}>
                  <Text style={styles.takeProfitIconText}>📈</Text>
                </View>
                <Text style={styles.takeProfitTitle}>Take Profit</Text>
              </View>

              <View style={styles.takeProfitSliderContainer}>
                <View style={styles.takeProfitSliderLabels}>
                  <Text style={styles.takeProfitSliderLabel}>0%</Text>
                  <Text style={styles.takeProfitSliderLabel}>100%</Text>
                </View>
                <View
                  style={styles.takeProfitSliderTrack}
                  {...tpPanResponder.panHandlers}
                  onLayout={(e) => {
                    tpSliderWidth.current = e.nativeEvent.layout.width;
                  }}>
                  <LinearGradient
                    colors={['#22c55e', '#10b981', '#22c55e']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.takeProfitSliderFill, { width: `${tpSliderPercent}%` }]}
                  />
                </View>
              </View>

              <View style={styles.takeProfitInputsRow}>
                <View style={styles.takeProfitInputGroup}>
                  <Text style={styles.takeProfitInputLabel}>Percent</Text>
                  <View style={styles.takeProfitInputWrapper}>
                    <Text style={styles.takeProfitInputPrefix}>%</Text>
                    <TextInput
                      style={styles.takeProfitInput}
                      value={tpPercent}
                      onChangeText={handleTpPercentChange}
                      keyboardType="numeric"
                      placeholderTextColor="#4b5563"
                    />
                  </View>
                </View>

                <View style={styles.takeProfitInputGroup}>
                  <Text style={styles.takeProfitInputLabel}>Amount</Text>
                  <View style={styles.takeProfitInputWrapper}>
                    <Text style={styles.takeProfitInputPrefix}>$</Text>
                    <TextInput
                      style={styles.takeProfitInput}
                      value={tpAmount}
                      onChangeText={handleTpAmountChange}
                      keyboardType="numeric"
                      placeholderTextColor="#4b5563"
                    />
                  </View>
                </View>

                <View style={styles.takeProfitInputGroup}>
                  <Text style={styles.takeProfitInputLabel}>Price</Text>
                  <View style={styles.takeProfitInputWrapper}>
                    <Text style={styles.takeProfitInputPrefix}>$</Text>
                    <TextInput
                      style={styles.takeProfitInput}
                      value={tpPrice}
                      onChangeText={handleTpPriceChange}
                      keyboardType="numeric"
                      placeholderTextColor="#4b5563"
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.takeProfitConfirmButton}
                onPress={() => {
                  setTakeProfitDollar(tpAmount);
                  setTakeProfitValue(tpPercent);
                  setTakeProfitModalVisible(false);
                }}>
                <LinearGradient
                  colors={['#22c55e', '#16a34a']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.takeProfitConfirmGradient}>
                  <Text style={styles.takeProfitConfirmText}>Confirm</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={stopLossModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}>
        <View style={styles.takeProfitModalOverlay}>
          <TouchableOpacity
            style={styles.stopLossModalContainer}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}>
            <LinearGradient
              colors={['#0f172a', '#1e293b', '#0f172a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.takeProfitModal}>
              <Text style={styles.stopLossModalTitle}>Set Stop Loss</Text>

              <View style={styles.takeProfitSliderContainer}>
                <View style={styles.takeProfitSliderLabels}>
                  <Text style={styles.stopLossSliderLabel}>0%</Text>
                  <Text style={styles.stopLossSliderLabel}>100%</Text>
                </View>
                <View
                  style={styles.stopLossSliderTrack}
                  {...slPanResponder.panHandlers}
                  onLayout={(e) => {
                    slSliderWidth.current = e.nativeEvent.layout.width;
                  }}>
                  <LinearGradient
                    colors={['#ef4444', '#dc2626', '#ef4444']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.takeProfitSliderFill, { width: `${slSliderPercent}%` }]}
                  />
                </View>
              </View>

              <View style={styles.takeProfitInputsRow}>
                <View style={styles.takeProfitInputGroup}>
                  <Text style={styles.stopLossInputLabel}>Percent</Text>
                  <View style={styles.stopLossInputWrapper}>
                    <Text style={styles.stopLossInputPrefix}>%</Text>
                    <TextInput
                      style={styles.takeProfitInput}
                      value={slPercent}
                      onChangeText={handleSlPercentChange}
                      keyboardType="numeric"
                      placeholderTextColor="#4b5563"
                    />
                  </View>
                </View>

                <View style={styles.takeProfitInputGroup}>
                  <Text style={styles.stopLossInputLabel}>Amount</Text>
                  <View style={styles.stopLossInputWrapper}>
                    <Text style={styles.stopLossInputPrefix}>$</Text>
                    <TextInput
                      style={styles.takeProfitInput}
                      value={slAmount}
                      onChangeText={handleSlAmountChange}
                      keyboardType="numeric"
                      placeholderTextColor="#4b5563"
                    />
                  </View>
                </View>

                <View style={styles.takeProfitInputGroup}>
                  <Text style={styles.stopLossInputLabel}>Price</Text>
                  <View style={styles.stopLossInputWrapper}>
                    <Text style={styles.stopLossInputPrefix}>$</Text>
                    <TextInput
                      style={styles.takeProfitInput}
                      value={slPrice}
                      onChangeText={handleSlPriceChange}
                      keyboardType="numeric"
                      placeholderTextColor="#4b5563"
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.takeProfitConfirmButton}
                onPress={() => {
                  setStopLossDollar(slAmount);
                  setStopLossValue(slPercent);
                  setStopLossModalVisible(false);
                }}>
                <LinearGradient
                  colors={['#ef4444', '#dc2626']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.takeProfitConfirmGradient}>
                  <Text style={styles.takeProfitConfirmText}>Confirm</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Info Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={infoModalVisible}
        onRequestClose={() => setInfoModalVisible(false)}>
        <View style={styles.infoModalOverlay}>
          <View style={styles.infoModalContent}>
            <TouchableOpacity
              style={styles.infoModalClose}
              onPress={() => setInfoModalVisible(false)}>
              <X size={24} color="#9ca3af" strokeWidth={2} />
            </TouchableOpacity>
            <View style={styles.infoModalIcon}>
              <Info size={40} color="#3b82f6" strokeWidth={2} />
            </View>
            <Text style={styles.infoModalText}>
              No real money here, folks. But don't let that stop you from pretending you're a Wall Street tycoon! Happy trading
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050510',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    backgroundColor: '#050510',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
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
    padding: 16,
  },
  accountCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flag: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  demoLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  statsIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statsIconGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsIconText: {
    fontSize: 24,
  },
  netAssetsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  netAssetsLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  netAssetsValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  netAssetsValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
  },
  currency: {
    fontSize: 20,
    fontWeight: '400',
  },
  investedPercentage: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9ca3af',
    marginBottom: 8,
  },
  profitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  profitLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  profitValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22c55e',
  },
  profitArrow: {
    fontSize: 18,
    color: '#9ca3af',
  },
  profitSeparator: {
    height: 2,
    backgroundColor: '#1e293b',
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricItem: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#d1d5db',
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94a3b8',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  progressTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#22c55e',
    marginLeft: -5,
  },
  cardIndicatorWrapper: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  tabWrapper: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderRadius: 12,
    padding: 4,
    width: '50%',
  },
  stageSliderContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  stageSlider: {
    flexDirection: 'row',
    height: 32,
    borderRadius: 8,
    overflow: 'hidden',
  },
  stageSliderSection: {
    flex: 1,
    flexDirection: 'row',
  },
  sliderBlock: {
    flex: 1,
    height: '100%',
  },
  stageLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  stageSliderLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  stagePointer: {
    alignItems: 'center',
    marginTop: 8,
  },
  stagePointerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#3b82f6',
    marginBottom: 4,
  },
  stagePointerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tabActive: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9ca3af',
  },
  tabTextActive: {
    color: '#fff',
  },
  performanceSection: {
    marginTop: 16,
  },
  stageSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  stageButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    alignItems: 'center',
  },
  stageButtonActive: {
    backgroundColor: '#7c3aed',
  },
  stageButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af',
    textAlign: 'center',
  },
  stageButtonTextActive: {
    color: '#fff',
  },
  stageLabel: {
    alignSelf: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  stageLabelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3b82f6',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  timePeriods: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  timePeriod: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timePeriodActive: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timePeriodText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9ca3af',
  },
  timePeriodTextActive: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  performanceMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  riskLevelCard: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  riskLevelTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  riskScaleContainer: {
    position: 'relative',
  },
  riskScale: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 16,
  },
  riskBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1,
  },
  riskBoxFirst: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  riskBoxLast: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  riskNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  riskPointerContainer: {
    position: 'relative',
    height: 12,
    marginTop: -4,
  },
  riskPointer: {
    position: 'absolute',
    alignItems: 'center',
    width: 16,
    marginLeft: -8,
  },
  riskPointerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    transform: [{ rotate: '180deg' }],
  },
  lossLimitsCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    marginTop: 16,
  },
  riskStats: {
    gap: 12,
  },
  riskStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  riskStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  circularProgress: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgressTriangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#10b981',
  },
  circularProgressTriangleDown: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ef4444',
  },
  riskStatLabel: {
    fontSize: 13,
    color: '#9ca3af',
  },
  riskStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  returnCircle: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnContent: {
    position: 'absolute',
    alignItems: 'center',
  },
  returnLabel: {
    fontSize: 13,
    color: '#22c55e',
    marginBottom: 4,
  },
  returnValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#22c55e',
  },
  returnPercent: {
    fontSize: 16,
  },
  returnStatus: {
    fontSize: 13,
    color: '#f97316',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  assetsSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  assetsTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#06b6d4',
    textAlign: 'center',
    marginBottom: 24,
  },
  allocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  donutContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  donutLabel: {
    fontSize: 15,
    color: '#9ca3af',
    marginBottom: 4,
  },
  donutValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  allocationLegend: {
    flex: 1,
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  bottomTabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  bottomTabActive: {
    backgroundColor: '#3b82f6',
  },
  bottomTabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9ca3af',
  },
  bottomTabTextActive: {
    color: '#fff',
  },
  bottomTabContent: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  tabContentContainer: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '500',
  },
  watchlistContainer: {
    backgroundColor: '#0a0a15',
    borderRadius: 16,
    padding: 16,
  },
  watchlistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 8,
  },
  watchlistHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9ca3af',
    letterSpacing: 0.5,
  },
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assetIconText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  assetSymbol: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  assetName: {
    fontSize: 14,
    color: '#9ca3af',
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  assetPrice: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  assetChangePositive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22c55e',
  },
  assetChangeNegative: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  holdingContainer: {
    gap: 16,
  },
  holdingCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  holdingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  holdingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  holdingLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  holdingSymbol: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  holdingName: {
    fontSize: 14,
    color: '#9ca3af',
  },
  portfolioBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8b5cf6',
  },
  portfolioIconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8b5cf6',
  },
  portfolioText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8b5cf6',
  },
  holdingDetails: {
    gap: 8,
    marginBottom: 16,
  },
  holdingDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  holdingDetailLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  holdingDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d1d5db',
  },
  holdingArrow: {
    fontSize: 14,
    color: '#22c55e',
  },
  holdingGreenText: {
    color: '#22c55e',
  },
  holdingRedText: {
    color: '#ef4444',
  },
  holdingProfit: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  holdingProfitAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  holdingProfitPercent: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22c55e',
  },
  holdingProfitGreen: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  holdingProfitAmountGreen: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  holdingProfitPercentGreen: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  holdingProfitTransparent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#374151',
  },
  holdingProfitAmountTransparent: {
    fontSize: 20,
    fontWeight: '700',
    color: '#22c55e',
  },
  holdingProfitPercentTransparent: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22c55e',
  },
  holdingProfitRed: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  holdingProfitAmountRed: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  holdingProfitPercentRed: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  ordersContainer: {
    gap: 16,
  },
  orderCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  orderLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  orderSymbol: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  orderName: {
    fontSize: 14,
    color: '#9ca3af',
  },
  orderDetails: {
    gap: 8,
    marginBottom: 16,
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDetailLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  orderDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d1d5db',
  },
  orderArrow: {
    fontSize: 14,
    color: '#22c55e',
  },
  orderArrowWhite: {
    fontSize: 14,
    color: '#ffffff',
  },
  orderGreenText: {
    color: '#22c55e',
  },
  orderRedText: {
    color: '#ef4444',
  },
  orderDetailLabelRed: {
    fontSize: 14,
    color: '#ef4444',
  },
  orderDetailLabelGreen: {
    fontSize: 14,
    color: '#22c55e',
  },
  holdingDetailLabelRed: {
    fontSize: 14,
    color: '#ef4444',
  },
  holdingDetailLabelGreen: {
    fontSize: 14,
    color: '#22c55e',
  },
  orderProfit: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  orderProfitAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  orderProfitPercent: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22c55e',
  },
  orderProfitGreen: {
    backgroundColor: '#374151',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  orderProfitAmountGreen: {
    fontSize: 20,
    fontWeight: '700',
    color: '#22c55e',
  },
  orderProfitPercentGreen: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22c55e',
  },
  orderProfitRed: {
    backgroundColor: '#374151',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  orderProfitAmountRed: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ef4444',
  },
  orderProfitPercentRed: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ef4444',
  },
  orderCancelled: {
    backgroundColor: '#374151',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderCancelledText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9ca3af',
  },
  orderCancelledYellow: {
    backgroundColor: '#374151',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderCancelledYellowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fbbf24',
  },
  orderYellowText: {
    color: '#fbbf24',
  },
  orderStatusContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 4,
  },
  orderStatusTab: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  orderStatusTabActive: {
    borderBottomColor: '#6366f1',
  },
  orderStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af',
  },
  orderStatusTextActive: {
    color: '#fff',
  },
  orderCountText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
  },
  orderButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  analysisButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  analysisButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  orderDate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#0a0a15',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  modalScrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  stockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  stockIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockIconText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  stockInfo: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  stockName: {
    fontSize: 15,
    color: '#a855f7',
  },
  stockPriceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  stockPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  stockChange: {
    fontSize: 20,
    fontWeight: '600',
  },
  stockChangePositive: {
    color: '#22c55e',
  },
  stockChangeNegative: {
    color: '#ef4444',
  },
  marketStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(156, 163, 175, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  marketStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9ca3af',
  },
  marketStatusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9ca3af',
  },
  tradeButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  tradeButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    backgroundColor: '#1a1a2e',
  },
  tradeButtonBuyActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  tradeButtonSellActive: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  tradeButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#9ca3af',
  },
  tradeButtonTextActive: {
    color: '#fff',
  },
  orderTypeTabsContainer: {
    marginBottom: 24,
  },
  orderTypeTabs: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    gap: 16,
  },
  orderTypeTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  orderTypeTabActive: {
    borderBottomColor: '#8b5cf6',
  },
  orderTypeTabText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#9ca3af',
  },
  orderTypeTabTextActive: {
    color: '#fff',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  priceItem: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 6,
    textAlign: 'right',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3b82f6',
    textAlign: 'right',
  },
  priceValueInput: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3b82f6',
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    paddingVertical: 4,
    minWidth: 100,
    textAlign: 'right',
  },
  priceValueGreen: {
    fontSize: 20,
    fontWeight: '700',
    color: '#22c55e',
    textAlign: 'right',
  },
  inputToggleContainer: {
    alignSelf: 'center',
    marginBottom: 24,
    alignItems: 'center',
  },
  inputToggleGradientBorder: {
    borderRadius: 35,
    padding: 2.5,
  },
  inputToggle: {
    flexDirection: 'row',
    backgroundColor: '#0a0a15',
    borderRadius: 33,
    padding: 3,
    overflow: 'hidden',
  },
  inputToggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    alignItems: 'center',
    borderRadius: 31,
  },
  inputToggleButtonActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
  },
  inputToggleText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#6b7280',
  },
  inputToggleTextActive: {
    color: '#fff',
  },
  riskSliderContainer: {
    marginBottom: 24,
  },
  riskSlider: {
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
    position: 'relative',
  },
  riskThumb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#22c55e',
    borderWidth: 4,
    borderColor: '#0a0a15',
    position: 'absolute',
    top: -10,
    marginLeft: -16,
  },
  riskLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  riskLabel: {
    fontSize: 13,
    color: '#9ca3af',
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#8b5cf6',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
  },
  amountInputField: {
    flex: 1,
    fontSize: 17,
    color: '#6b7280',
  },
  amountCurrency: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  equityInfo: {
    marginBottom: 24,
  },
  equityBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  equityText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  equityPercent: {
    color: '#3b82f6',
  },
  protectorContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  protectorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  protectorLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  stopLossRow: {
    flexDirection: 'row',
    gap: 16,
  },
  stopLossItem: {
    flex: 1,
  },
  stopLossLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ef4444',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stopLossProfitLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22c55e',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stopLossValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  stopLossProfitValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  stopLossSubValue: {
    fontSize: 15,
    color: '#9ca3af',
  },
  stopLossSubValueInput: {
    fontSize: 15,
    color: '#fff',
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#f59e0b',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 60,
    textAlign: 'center',
  },
  stopLossDollarInput: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#f59e0b',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 4,
    minWidth: 80,
    textAlign: 'left',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  warningIcon: {
    fontSize: 22,
    color: '#eab308',
    fontWeight: '700',
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#eab308',
    lineHeight: 18,
  },
  confirmButton: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 32,
  },
  confirmButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  takeProfitModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  takeProfitModalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#22c55e',
    borderBottomWidth: 0,
  },
  stopLossModalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ef4444',
    borderBottomWidth: 0,
  },
  takeProfitModal: {
    padding: 24,
    paddingBottom: 32,
  },
  takeProfitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  takeProfitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  takeProfitIconText: {
    fontSize: 26,
  },
  takeProfitTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: '#22c55e',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  stopLossModalTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: '#ef4444',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  takeProfitSliderContainer: {
    marginBottom: 24,
  },
  takeProfitSliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  takeProfitSliderLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9ca3af',
  },
  stopLossSliderLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ef4444',
  },
  takeProfitSliderTrack: {
    height: 8,
    backgroundColor: '#1e293b',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  stopLossSliderTrack: {
    height: 8,
    backgroundColor: '#1e293b',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  takeProfitSliderFill: {
    height: '100%',
  },
  takeProfitInputsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  takeProfitInputGroup: {
    flex: 1,
  },
  takeProfitInputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22c55e',
    marginBottom: 8,
    textAlign: 'center',
  },
  stopLossInputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ef4444',
    marginBottom: 8,
    textAlign: 'center',
  },
  takeProfitInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  stopLossInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  takeProfitInputPrefix: {
    fontSize: 17,
    fontWeight: '600',
    color: '#22c55e',
  },
  stopLossInputPrefix: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ef4444',
  },
  takeProfitInput: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    minWidth: 60,
  },
  takeProfitConfirmButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  takeProfitConfirmGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  takeProfitConfirmText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 32,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
  },
  successIconContainer: {
    marginBottom: 24,
  },
  successIcon: {
    position: 'relative',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCheckmark: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCheckmarkText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  successButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  successButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  cancelIcon: {
    position: 'relative',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoIconContainer: {
    marginLeft: 8,
    marginRight: 4,
  },
  infoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoModalContent: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
  },
  infoModalClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  infoModalIcon: {
    marginTop: 20,
    marginBottom: 16,
  },
  infoModalText: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 24,
  },
});
