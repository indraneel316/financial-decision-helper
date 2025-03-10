import { View, Text, StyleSheet } from 'react-native';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

type DashboardCardProps = {
  title: string;
  amount: number;
  type: 'income' | 'expense';
  percentage?: number;
};

export function DashboardCard({ title, amount, type, percentage }: DashboardCardProps) {
  const isPositive = type === 'income' || (percentage && percentage > 0);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.amountRow}>
        <Text style={styles.amount}>
          ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </Text>
        {percentage && (
          <View style={[styles.percentageContainer, isPositive ? styles.positive : styles.negative]}>
            {isPositive ? (
              <ArrowUpRight size={16} color="#10B981" />
            ) : (
              <ArrowDownRight size={16} color="#EF4444" />
            )}
            <Text style={[styles.percentage, isPositive ? styles.positiveText : styles.negativeText]}>
              {Math.abs(percentage)}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#111827',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  positive: {
    backgroundColor: '#D1FAE5',
  },
  negative: {
    backgroundColor: '#FEE2E2',
  },
  percentage: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  positiveText: {
    color: '#059669',
  },
  negativeText: {
    color: '#DC2626',
  },
});