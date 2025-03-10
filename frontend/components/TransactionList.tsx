import { View, Text, StyleSheet, FlatList } from 'react-native';
import { format } from 'date-fns';
import { ShoppingBag, Coffee, Chrome as Home, Car, Utensils, Film } from 'lucide-react-native';

const CATEGORY_ICONS = {
  shopping: ShoppingBag,
  coffee: Coffee,
  housing: Home,
  transport: Car,
  food: Utensils,
  entertainment: Film,
};

type Transaction = {
  id: string;
  description: string;
  amount: number;
  category: keyof typeof CATEGORY_ICONS;
  date: Date;
};

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    description: 'Grocery Shopping',
    amount: 85.50,
    category: 'shopping',
    date: new Date('2024-01-26T10:00:00'),
  },
  {
    id: '2',
    description: 'Coffee Shop',
    amount: 4.50,
    category: 'coffee',
    date: new Date('2024-01-26T09:00:00'),
  },
  {
    id: '3',
    description: 'Rent Payment',
    amount: 1200.00,
    category: 'housing',
    date: new Date('2024-01-25T15:00:00'),
  },
  {
    id: '4',
    description: 'Uber Ride',
    amount: 25.30,
    category: 'transport',
    date: new Date('2024-01-25T14:30:00'),
  },
  {
    id: '5',
    description: 'Restaurant Dinner',
    amount: 45.80,
    category: 'food',
    date: new Date('2024-01-24T20:00:00'),
  },
];

export function TransactionList() {
  const renderTransaction = ({ item }: { item: Transaction }) => {
    const Icon = CATEGORY_ICONS[item.category];

    return (
      <View style={styles.transactionItem}>
        <View style={styles.iconContainer}>
          <Icon size={20} color="#4B5563" />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.date}>{format(item.date, 'MMM d, h:mm a')}</Text>
        </View>
        <Text style={styles.amount}>-${item.amount.toFixed(2)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={SAMPLE_TRANSACTIONS}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 12,
  },
  description: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#111827',
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  amount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
});