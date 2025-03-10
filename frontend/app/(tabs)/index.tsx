import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DashboardCard } from '@/components/DashboardCard';
import { TransactionList } from '@/components/TransactionList';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.cardsContainer}>
          <DashboardCard
            title="Total Spent"
            amount={1360.50}
            type="expense"
            percentage={-12.5}
          />
          <DashboardCard
            title="Total Saved"
            amount={450.00}
            type="income"
            percentage={8.3}
          />
        </View>
        <View style={styles.transactionsContainer}>
          <TransactionList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  transactionsContainer: {
    flex: 1,
  },
});