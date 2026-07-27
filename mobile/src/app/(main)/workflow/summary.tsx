import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { Ionicons } from '@expo/vector-icons';

export default function WorkflowSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      const { error } = await supabase.from('cases').insert({
        user_id: user.id,
        patient_name: params.patientName || 'Anonymous',
        patient_age: params.patientAge ? parseInt(params.patientAge as string) : null,
        patient_gender: params.patientGender || null,
        tooth: params.tooth,
        diagnosis: params.dx,
        file_system: params.files,
      });

      if (error) throw error;
      
      Alert.alert("Success", "Case saved to your profile!");
      router.replace('/(main)/profile' as any);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Final Review</Text>
        
        <Row label="Patient" value={params.patientName as string || 'Not provided'} />
        <Row label="Tooth" value={params.tooth as string} />
        <Row label="Diagnosis" value={params.dx as string} />
        <Row label="File System" value={params.files as string} />
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, loading && { opacity: 0.7 }]} 
        onPress={handleSave}
        disabled={loading}
      >
        <Ionicons name="cloud-upload" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>
          {loading ? 'Saving to Database...' : 'Save Case Permanently'}
        </Text>
      </TouchableOpacity>
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
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15, textTransform: 'uppercase' },
  rowItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  rowLabel: { fontSize: 14, color: '#666' },
  rowValue: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  saveButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
});
