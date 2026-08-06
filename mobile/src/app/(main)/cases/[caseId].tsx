import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { TEETH } from '../../../lib/endo-data';

export default function CaseDetailsScreen() {
  const { caseId } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCase();
  }, [caseId]);

  const fetchCase = async () => {
    const { data: caseData } = await supabase.from('Case').select('*').eq('id', caseId).single();
    setData(caseData);
    setLoading(false);
  };

  if (loading) return <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 50 }} />;
  if (!data) return <Text style={{ textAlign: 'center', marginTop: 50 }}>Case not found</Text>;

  const toothInfo = TEETH.find((t: any) => t.fdi === data.tooth);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <Ionicons name="person-circle" size={48} color="#ccc" />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.patientName}>{data.patientName || 'Anonymous'}</Text>
          <Text style={styles.patientDetails}>
            {data.patientAge ? `${data.patientAge} yrs ` : ''}
            {data.patientGender ? `· ${data.patientGender}` : ''}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Clinical Information</Text>
        <Row label="Tooth" value={`${data.tooth} — ${toothInfo?.name || ''}`} />
        <Row label="Diagnosis" value={data.dx} />
        <Row label="File System" value={data.fileSystem} />
        <Row label="Date Saved" value={new Date(data.createdAt).toLocaleString()} />
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Anatomy Reference</Text>
        <Row label="Roots" value={toothInfo?.roots || '—'} />
        <Row label="Canals" value={toothInfo?.canals || '—'} />
        <Row label="Working Length" value={toothInfo?.workingLength || '—'} />
        <Row label="Rubber Dam" value={toothInfo?.clamp || '—'} />
      </View>
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
  headerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 2 },
  patientName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  patientDetails: { fontSize: 14, color: '#666', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 2 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#888', textTransform: 'uppercase', marginBottom: 10 },
  rowItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  rowLabel: { fontSize: 14, color: '#666' },
  rowValue: { fontSize: 14, fontWeight: 'bold', color: '#333', maxWidth: '60%', textAlign: 'right' },
});
