import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { useAuth } from "@/context/authContext";
import { fetchUserActivity, groupUsageByMonth } from "@/components/report";

const tabs = ['Weekly', 'Monthly', 'Yearly'];
const screenWidth = Dimensions.get('window').width;

const UsageReportScreen = () => {
  const [activeTab, setActiveTab] = useState('Yearly');
  const [usageSummary, setUsageSummary] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const loadUsage = async () => {
      const report = await fetchUserActivity(user.id);
      const grouped = groupUsageByMonth(report.pillarUsages);
      setUsageSummary(grouped);
    };
    loadUsage();
  }, [user])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Usage Reports</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabChange(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Graph */}
      <View style={styles.chartPlaceholder}>
        <Text style={{ color: '#999' }}>Graph</Text>
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Pillar Usage</Text>
          <Text style={styles.summaryValue}>0 min</Text>
          <Text style={styles.summaryNote}>Total Pillars: 8</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total Chats</Text>
          <Text style={styles.summaryValue}>15</Text>
          <Text style={styles.summaryNote}>messages</Text>
        </View>
      </View>

      {/* Pillar Details */}
      <Text style={styles.detailTitle}>Pillar Detail</Text>
      <FlatList
        data={[
          { key: 'Stocks', icon: '📈', time: '0min' },
          { key: 'Work', icon: '💼', time: '0min' },
        ]}
        renderItem={({ item }) => (
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>{item.icon} {item.key}</Text>
            <Text style={styles.detailTime}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: '#ccc',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#e0e0e0',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000',
  },
  chartPlaceholder: {
    height: 180,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryBox: {
    width: '48%',
    backgroundColor: '#e8f4ff',
    padding: 15,
    borderRadius: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  summaryNote: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailText: {
    fontSize: 16,
  },
  detailTime: {
    fontSize: 16,
    color: '#999',
  },
});



export default UsageReportScreen;
