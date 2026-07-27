import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RUBBER_DAM_TIPS } from '../../../lib/endo-data';
import { Ionicons } from '@expo/vector-icons';

export default function RubberDamScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rubber Dam Guide</Text>
      <Text style={styles.subtitle}>Isolation strategies and clamp selection</Text>

      {RUBBER_DAM_TIPS.map((t, idx) => (
        <View key={idx} style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="shield-checkmark" size={20} color="#007bff" />
            <Text style={styles.cardTitle}>{t.category}</Text>
          </View>
          <Text style={styles.cardDesc}>{t.details}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginLeft: 10 },
  cardDesc: { fontSize: 14, color: '#444', lineHeight: 22 },
});
