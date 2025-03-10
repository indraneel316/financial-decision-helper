import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BudgetCycle } from '@/components/BudgetCycle';
import { CategoryBudget } from '@/components/CategoryBudget';

export default function BudgetScreen() {
  const currentCycle = {
    totalBudget: 5000,
    duration: '1 Month',
    savingsTarget: 1000,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
  };

  const categories = [
    { category: 'groceries', allocated: 800, spent: 650 },
    { category: 'housing', allocated: 1500, spent: 1500 },
    { category: 'transport', allocated: 400, spent: 320 },
    { category: 'dining', allocated: 300, spent: 450 },
    { category: 'entertainment', allocated: 200, spent: 180 },
    { category: 'coffee', allocated: 100, spent: 85 },
  ] as const;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Budget Overview</Text>
        <Text style={styles.subtitle}>Track and manage your budget cycles</Text>

        <BudgetCycle {...currentCycle} />

        <Text style={styles.sectionTitle}>Category Breakdown</Text>
        {categories.map((cat) => (
          <CategoryBudget key={cat.category} {...cat} />
        ))}
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
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginTop: 8,
    marginBottom: 16,
  },
});