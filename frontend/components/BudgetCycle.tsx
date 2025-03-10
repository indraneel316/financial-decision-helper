import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Wallet, Target } from 'lucide-react-native';

type BudgetCycleProps = {
  totalBudget: number;
  duration: string;
  savingsTarget: number;
  startDate: Date;
  endDate: Date;
  onPress?: () => void;
};

export function BudgetCycle({ totalBudget, duration, savingsTarget, startDate, endDate, onPress }: BudgetCycleProps) {
  const progress = 65; // This would be calculated based on actual spending

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>Current Budget Cycle</Text>
        <Text style={styles.dates}>
          {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <Wallet size={20} color="#4F46E5" />
          </View>
          <View>
            <Text style={styles.statLabel}>Total Budget</Text>
            <Text style={styles.statValue}>${totalBudget.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <Calendar size={20} color="#4F46E5" />
          </View>
          <View>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>{duration}</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <Target size={20} color="#4F46E5" />
          </View>
          <View>
            <Text style={styles.statLabel}>Savings Target</Text>
            <Text style={styles.statValue}>${savingsTarget.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress}% of budget used</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 4,
  },
  dates: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  statValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
});