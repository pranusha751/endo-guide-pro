import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TEETH } from '../../lib/endo-data';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../constants/theme';

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
  container: { padding: 20, backgroundColor: Colors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.foreground },
  subtitle: { fontSize: 14, color: Colors.mutedForeground, marginBottom: 20 },
  pickerContainer: { borderWidth: 1, borderColor: Colors.border, borderRadius: 12, backgroundColor: Colors.card, overflow: 'hidden', marginBottom: 20 },
  card: { backgroundColor: Colors.card, borderRadius: 16, padding: 15, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  toothGraphic: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.mint, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  toothGraphicText: { fontSize: 28, fontWeight: 'bold', color: Colors.mintForeground },
  rowItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  rowLabel: { fontSize: 14, color: Colors.mutedForeground },
  rowValue: { fontSize: 14, fontWeight: 'bold', color: Colors.foreground },
});
