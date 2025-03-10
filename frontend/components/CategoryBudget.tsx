import { View, Text, StyleSheet } from 'react-native';
import { ShoppingBag, Coffee, Chrome as Home, Car, Utensils, Film, Plus } from 'lucide-react-native';

const CATEGORIES = {
  groceries: { icon: ShoppingBag, color: '#10B981', name: 'Groceries' },
  coffee: { icon: Coffee, color: '#F59E0B', name: 'Coffee & Drinks' },
  housing: { icon: Home, color: '#3B82F6', name: 'Housing' },
  transport: { icon: Car, color: '#EC4899', name: 'Transport' },
  dining: { icon: Utensils, color: '#8B5CF6', name: 'Dining Out' },
  entertainment: { icon: Film, color: '#EF4444', name: 'Entertainment' },
};

type Category = keyof typeof CATEGORIES;

type CategoryBudgetProps = {
  category: Category;
  allocated: number;
  spent: number;
};

export function CategoryBudget({ category, allocated, spent }: CategoryBudgetProps) {
  const { icon: Icon, color, name } = CATEGORIES[category];
  const percentage = Math.min((spent / allocated) * 100, 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
          <Icon size={20} color={color} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>
            ${spent.toLocaleString()} of ${allocated.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${percentage}%`,
                backgroundColor: percentage >= 100 ? '#EF4444' : color 
              }
            ]} 
          />
        </View>
        <Text style={[
          styles.percentage,
          percentage >= 100 && styles.overBudget
        ]}>
          {percentage.toFixed(0)}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    width: 40,
    textAlign: 'right',
  },
  overBudget: {
    color: '#EF4444',
  },
});