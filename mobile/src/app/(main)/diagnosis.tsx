import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { DIAGNOSES } from '../../lib/endo-data';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

export default function DiagnosisScreen() {
  const [selectedDx, setSelectedDx] = useState<string | null>(null);
  const dxInfo = DIAGNOSES.find(d => d.id === selectedDx);

  const getBadgeBg = (color?: string) => {
    if (color === 'mint') return { bg: Colors.mint, text: Colors.mintForeground };
    if (color === 'peach') return { bg: Colors.peach, text: Colors.peachForeground };
    if (color === 'warning') return { bg: Colors.warning, text: Colors.warningForeground };
    return { bg: '#fde8e8', text: '#991b1b' };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quick Diagnosis</Text>
      <Text style={styles.subtitle}>Reference guide for pulpal and periapical conditions</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
        {DIAGNOSES.map((d) => {
          const badge = getBadgeBg(d.color);
          return (
            <TouchableOpacity
              key={d.id}
              style={[styles.chip, selectedDx === d.id && { backgroundColor: badge.bg, borderColor: badge.text }]}
              onPress={() => setSelectedDx(d.id)}
            >
              <Text style={[styles.chipText, selectedDx === d.id && { color: badge.text, fontWeight: 'bold' }]}>
                {d.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {dxInfo ? (() => {
        const badge = getBadgeBg(dxInfo.color);
        return (
          <View style={styles.card}>
            <View style={[styles.headerBox, { backgroundColor: badge.bg }]}>
              <Text style={[styles.headerTitle, { color: badge.text }]}>{dxInfo.label}</Text>
            </View>
            <Row label="Symptoms" value={dxInfo.symptoms} />
            <Row label="Pulp Tests" value={dxInfo.pulpTests} />
            <Row label="Radiograph" value={dxInfo.radiograph} />
            <View style={[styles.treatmentBox, { backgroundColor: Colors.mint }]}>
              <Text style={[styles.treatmentLabel, { color: Colors.mintForeground }]}>Treatment</Text>
              <Text style={[styles.treatmentValue, { color: Colors.mintForeground }]}>{dxInfo.treatment}</Text>
            </View>
          </View>
        );
      })() : (
        <View style={styles.emptyState}>
          <Ionicons name="medical" size={48} color={Colors.border} />
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
  container: { padding: 20, backgroundColor: Colors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.foreground },
  subtitle: { fontSize: 14, color: Colors.mutedForeground, marginBottom: 20 },
  chipContainer: { flexDirection: 'row', marginBottom: 20, maxHeight: 45 },
  chip: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, backgroundColor: Colors.muted, marginRight: 10, height: 40, justifyContent: 'center', borderWidth: 1, borderColor: Colors.border },
  chipText: { fontSize: 14, fontWeight: '600', color: Colors.mutedForeground },
  card: { backgroundColor: Colors.card, borderRadius: 16, padding: 15, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  headerBox: { padding: 15, borderRadius: 12, marginBottom: 15 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  row: { marginBottom: 15, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  rowLabel: { fontSize: 12, fontWeight: 'bold', color: Colors.mutedForeground, textTransform: 'uppercase', marginBottom: 5 },
  rowValue: { fontSize: 15, color: Colors.foreground },
  treatmentBox: { padding: 15, borderRadius: 12, marginTop: 10 },
  treatmentLabel: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 },
  treatmentValue: { fontSize: 16, fontWeight: 'bold' },
  emptyState: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: Colors.mutedForeground, marginTop: 10 },
});
