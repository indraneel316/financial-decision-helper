import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

type EducationLevel = 'high_school' | 'bachelors' | 'masters' | 'phd' | 'other';
type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed' | 'other';

export default function OnboardingScreen() {
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    occupation: '',
    educationLevel: '' as EducationLevel,
    maritalStatus: '' as MaritalStatus,
    dependents: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const handleSubmit = () => {
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to BudgetWise</Text>
        <Text style={styles.subtitle}>Let's get to know you better</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={formData.age}
              onChangeText={(text) => setFormData({ ...formData, age: text })}
              placeholder="Enter your age"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Annual Income (USD)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={formData.income}
              onChangeText={(text) => setFormData({ ...formData, income: text })}
              placeholder="Enter your annual income"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Occupation</Text>
            <TextInput
              style={styles.input}
              value={formData.occupation}
              onChangeText={(text) => setFormData({ ...formData, occupation: text })}
              placeholder="Enter your occupation"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Education Level</Text>
            <View style={styles.pickerContainer}>
              {['high_school', 'bachelors', 'masters', 'phd', 'other'].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.pickerItem,
                    formData.educationLevel === level && styles.pickerItemSelected,
                  ]}
                  onPress={() => setFormData({ ...formData, educationLevel: level as EducationLevel })}
                >
                  <Text style={[
                    styles.pickerItemText,
                    formData.educationLevel === level && styles.pickerItemTextSelected,
                  ]}>
                    {level.charAt(0).toUpperCase() + level.slice(1).replace('_', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Marital Status</Text>
            <View style={styles.pickerContainer}>
              {['single', 'married', 'divorced', 'widowed', 'other'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.pickerItem,
                    formData.maritalStatus === status && styles.pickerItemSelected,
                  ]}
                  onPress={() => setFormData({ ...formData, maritalStatus: status as MaritalStatus })}
                >
                  <Text style={[
                    styles.pickerItemText,
                    formData.maritalStatus === status && styles.pickerItemTextSelected,
                  ]}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of Dependents</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={formData.dependents}
              onChangeText={(text) => setFormData({ ...formData, dependents: text })}
              placeholder="Enter number of dependents"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 32,
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1a1a1a',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pickerItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  pickerItemSelected: {
    backgroundColor: '#007AFF',
  },
  pickerItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
  },
  pickerItemTextSelected: {
    color: '#fff',
  },
  button: {
    height: 56,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});