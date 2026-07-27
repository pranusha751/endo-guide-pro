import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TEETH, ACCESS_GUIDES } from '../../lib/endo-data';
import { Picker } from '@react-native-picker/picker';

export default function AnatomyScreen() {
  const [tooth, setTooth] = useState("16");
  const toothInfo = TEETH.find((t) => t.fdi === tooth);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Anatomy Guidelines</Text>
      <Text style={styles.subtitle}>Select a tooth to view anatomy</Text>

      <View style={styles.pickerContainer}>
        <Picker selectedValue={tooth} onValueChange={(itemValue) => setTooth(itemValue)}>
          {TEETH.map((t) => (
            <Picker.Item key={t.fdi} label={`${t.fdi} — ${t.name}`} value={t.fdi} />
          ))}
        </Picker>
      </View>

      {toothInfo && (
        <View style={styles.card}>
          <View style={styles.toothGraphic}>
            <Text style={styles.toothGraphicText}>{toothInfo.fdi}</Text>
          </View>
          
          <Row label="Name" value={toothInfo.name} />
          <Row label="Roots" value={toothInfo.roots} />
          <Row label="Canals" value={toothInfo.canals} />
          <Row label="Access Shape" value={toothInfo.accessShape} />
          <Row label="Working Length" value={toothInfo.workingLength} />
        </View>
      )}
    </ScrollView>
  );
}

const Row = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.rowItem}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  pickerContainer: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#fff', overflow: 'hidden', marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, elevation: 2 },
  toothGraphic: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#d4edda', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#c3e6cb' },
  toothGraphicText: { fontSize: 28, fontWeight: 'bold', color: '#155724' },
  rowItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  rowLabel: { fontSize: 14, color: '#666' },
  rowValue: { fontSize: 14, fontWeight: 'bold', color: '#333' },
});
