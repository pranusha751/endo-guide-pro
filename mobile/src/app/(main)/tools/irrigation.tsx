import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IRRIGATION_STEPS, IRRIGATION_SAFETY } from '../../../lib/endo-data';

export default function IrrigationScreen() {
  const [doneSteps, setDoneSteps] = useState<Record<string, boolean>>({});

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Irrigation Protocol</Text>
      <Text style={styles.subtitle}>Standard sequence for canal disinfection</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Protocol Steps</Text>
        {IRRIGATION_STEPS.map((s) => {
          const done = !!doneSteps[s.id];
          return (
            <TouchableOpacity 
              key={s.id} 
              onPress={() => setDoneSteps({ ...doneSteps, [s.id]: !done })}
              style={[styles.stepItem, done && styles.stepItemDone]}
            >
              <View style={[styles.checkbox, done && styles.checkboxDone]}>
                {done && <Ionicons name="checkmark" size={16} color="#fff" />}
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.stepTitle}>{s.label}</Text>
                  {s.warning && <Ionicons name="warning" size={16} color="#ffc107" style={{ marginLeft: 5 }} />}
                </View>
                <Text style={styles.stepDesc}>{s.concentration} · {s.volume} · {s.time}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.warningCard}>
        <Text style={styles.warningCardTitle}><Ionicons name="warning" size={16} /> Safety Guidelines</Text>
        {IRRIGATION_SAFETY.map((s, idx) => (
          <View key={idx} style={styles.liItem}>
            <View style={styles.bullet} />
            <Text style={styles.liText}>{s}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', textTransform: 'uppercase', marginBottom: 15 },
  stepItem: { flexDirection: 'row', padding: 15, borderWidth: 1, borderColor: '#eee', borderRadius: 12, marginBottom: 10, backgroundColor: '#fff' },
  stepItemDone: { backgroundColor: '#d4edda', borderColor: '#c3e6cb' },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#ddd', marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  checkboxDone: { backgroundColor: '#28a745', borderColor: '#28a745' },
  stepTitle: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  stepDesc: { fontSize: 12, color: '#666', marginTop: 4 },
  warningCard: { backgroundColor: '#fff3cd', borderColor: '#ffeeba', borderWidth: 1, borderRadius: 12, padding: 15 },
  warningCardTitle: { fontSize: 16, fontWeight: 'bold', color: '#856404', marginBottom: 15 },
  liItem: { flexDirection: 'row', marginBottom: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#856404', marginTop: 6, marginRight: 10 },
  liText: { fontSize: 14, color: '#856404', flex: 1, lineHeight: 20 },
});
