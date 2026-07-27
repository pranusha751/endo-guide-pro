import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { DIAGNOSES } from '../../lib/endo-data';
import { Ionicons } from '@expo/vector-icons';

export default function DiagnosisScreen() {
  const [selectedDx, setSelectedDx] = useState<string | null>(null);

  const dxInfo = DIAGNOSES.find(d => d.id === selectedDx);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quick Diagnosis</Text>
      <Text style={styles.subtitle}>Reference guide for pulpal and periapical conditions</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
        {DIAGNOSES.map((d) => (
          <TouchableOpacity 
            key={d.id} 
            style={[styles.chip, selectedDx === d.id && styles.chipActive]}
            onPress={() => setSelectedDx(d.id)}
          >
            <Text style={[styles.chipText, selectedDx === d.id && styles.chipTextActive]}>
              {d.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {dxInfo ? (
        <View style={styles.card}>
          <View style={[styles.headerBox, { backgroundColor: dxInfo.color === 'mint' ? '#d4edda' : dxInfo.color === 'peach' ? '#ffe8cc' : dxInfo.color === 'warning' ? '#fff3cd' : '#f8d7da' }]}>
            <Text style={styles.headerTitle}>{dxInfo.label}</Text>
          </View>
          <Row label="Symptoms" value={dxInfo.symptoms} />
          <Row label="Pulp Tests" value={dxInfo.pulpTests} />
          <Row label="Radiograph" value={dxInfo.radiograph} />
          <View style={styles.treatmentBox}>
            <Text style={styles.treatmentLabel}>Treatment</Text>
            <Text style={styles.treatmentValue}>{dxInfo.treatment}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="medical" size={48} color="#ccc" />
          <Text style={styles.emptyText}>Select a diagnosis above to view details</Text>
        </View>
      )}
    </ScrollView>
  );
}

const Row = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  chipContainer: { flexDirection: 'row', marginBottom: 20, maxHeight: 45 },
  chip: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, backgroundColor: '#e0e0e0', marginRight: 10, height: 40, justifyContent: 'center' },
  chipActive: { backgroundColor: '#007bff' },
  chipText: { fontSize: 14, fontWeight: '600', color: '#555' },
  chipTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, elevation: 2 },
  headerBox: { padding: 15, borderRadius: 8, marginBottom: 15 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  row: { marginBottom: 15 },
  rowLabel: { fontSize: 12, fontWeight: 'bold', color: '#888', textTransform: 'uppercase', marginBottom: 5 },
  rowValue: { fontSize: 15, color: '#333' },
  treatmentBox: { backgroundColor: '#e6f2ff', padding: 15, borderRadius: 8, marginTop: 10 },
  treatmentLabel: { fontSize: 12, fontWeight: 'bold', color: '#007bff', textTransform: 'uppercase', marginBottom: 5 },
  treatmentValue: { fontSize: 16, fontWeight: 'bold', color: '#0056b3' },
  emptyState: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#999', marginTop: 10 }
});
