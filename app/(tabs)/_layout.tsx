import { Tabs } from 'expo-router';
import { Sparkles, Target, Activity, MessageSquare, ChartPie as PieChart } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#8b5cf6',
        tabBarInactiveTintColor: '#ffffff',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'AI Picks',
          tabBarIcon: ({ size, color }) => (
            <Sparkles size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          title: 'Forecast',
          tabBarIcon: ({ size, color }) => (
            <Target size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Tracker',
          tabBarIcon: ({ size, color }) => (
            <Activity size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qchat"
        options={{
          title: 'Challenge',
          tabBarIcon: ({ size, color }) => (
            <MessageSquare size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ size, color }) => (
            <PieChart size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
