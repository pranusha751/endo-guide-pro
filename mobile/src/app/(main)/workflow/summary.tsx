import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { TEETH, DIAGNOSES, FILE_PROTOCOLS, FileSystem } from '../../../lib/endo-data';
import { Colors } from '../../../constants/theme';

export default function WorkflowSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const toothStr = (params.tooth as string) || "16";
  const dxStr = (params.dx as string) || "normal";
  const filesStr = (params.files as string) || "ProTaper Gold";
  const patientName = (params.patientName as string) || "";
  const patientAge = (params.patientAge as string) || "";
  const patientGender = (params.patientGender as string) || "";

  const toothInfo = TEETH.find((t: any) => t.fdi === toothStr);
  const dxInfo = DIAGNOSES.find((d: any) => d.id === dxStr);
  const protocol = FILE_PROTOCOLS[filesStr as FileSystem];

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      const dateObj = new Date();
      const dateStr = dateObj.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const now = dateObj.toISOString();

      const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };

      // Workaround for legacy foreign key constraint on Case_userId_fkey
      await supabase.from('User').upsert({
        id: user.id,
        email: user.email || 'migrated@example.com',
        fullName: 'Migrated User',
        passwordHash: 'migrated',
        isEmailVerified: true,
        updatedAt: now
      }, { onConflict: 'id' });

      const { error } = await supabase.from('Case').insert({
        id: uuidv4(),
        userId: user.id,
        patientName: patientName || 'Anonymous',
        patientAge: patientAge || null,
        patientGender: patientGender || null,
        tooth: toothStr,
        dx: dxInfo?.label || dxStr,
        date: dateStr,
        status: "Active",
        fileSystem: filesStr,
        timestamp: dateObj.getTime(),
        createdAt: now,
        updatedAt: now,
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

  const handleShare = async () => {
    const summaryText = `Endo Guide Pro Case Summary\n\nTooth: ${toothStr} — ${toothInfo?.name}\nDiagnosis: ${dxInfo?.label ?? "—"}\nAccess: ${toothInfo?.accessShape ?? "—"}\nFile System: ${filesStr}\nTarget MAF: ${protocol?.maf ?? "—"}\nClamp: ${toothInfo?.clamp ?? "—"}\n\nGenerated via Endo Guide Pro`;
    
    try {
      await Share.share({
        message: summaryText,
      });
    } catch (error: any) {
      Alert.alert("Share failed", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.banner}>
        <View style={styles.bannerIcon}>
          <Ionicons name="checkmark-circle" size={32} color="#fff" />
        </View>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Protocol Complete</Text>
          <Text style={styles.bannerSub}>Treatment plan successfully generated</Text>
        </View>
      </View>

      {(patientName || patientAge || patientGender) ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Patient Details</Text>
          {!!patientName && <Row label="Name" value={patientName} />}
          {!!patientAge && <Row label="Age" value={patientAge} />}
          {!!patientGender && <Row label="Gender" value={patientGender} />}
        </View>
      ) : null}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Clinical Details</Text>
        <Row label="Tooth" value={`${toothStr} — ${toothInfo?.name}`} />
        <Row label="Diagnosis" value={dxInfo?.label ?? "—"} color={dxInfo?.color} />
        <Row label="Access" value={toothInfo?.accessShape ?? "—"} />
        <Row label="File System" value={filesStr} />
        <Row label="Target MAF" value={protocol?.maf ?? "—"} />
        <Row label="Clamp" value={toothInfo?.clamp ?? "—"} />
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Ionicons name="share-social" size={20} color="#007bff" />
        <Text style={styles.shareButtonText}>SHARE REPORT</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.saveButton, loading && { opacity: 0.7 }]} 
        onPress={handleSave}
        disabled={loading}
      >
        <Ionicons name="save" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>
          {loading ? 'Saving...' : 'Save to Clinical Record'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        * This summary is for clinical reference only. Ensure all findings are cross-verified with radiographic and clinical examination before finalizing the treatment record.
      </Text>
    </ScrollView>
  );
}

const Row = ({ label, value, color }: { label: string, value: string, color?: string }) => {
  const getBadgeColor = (c?: string) => {
    if (c === 'mint') return { bg: '#d4edda', text: '#155724' };
    if (c === 'warning') return { bg: '#fff3cd', text: '#856404' };
    if (c === 'destructive') return { bg: '#f8d7da', text: '#721c24' };
    if (c === 'peach') return { bg: '#ffe8cc', text: '#d9480f' };
    return null;
  };
  const badge = getBadgeColor(color);

  return (
    <View style={styles.rowItem}>
      <Text style={styles.rowLabel}>{label}</Text>
      {badge ? (
        <View style={[styles.badge, { backgroundColor: badge.bg }]}>
          <Text style={[styles.badgeText, { color: badge.text }]}>{value}</Text>
        </View>
      ) : (
        <Text style={styles.rowValue}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: Colors.background, flexGrow: 1, paddingBottom: 40 },
  
  banner: { flexDirection: 'row', backgroundColor: Colors.mint, borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  bannerIcon: { width: 50, height: 50, borderRadius: 16, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  bannerTextContainer: { flex: 1 },
  bannerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.mintForeground },
  bannerSub: { fontSize: 13, color: Colors.mintForeground, marginTop: 4, opacity: 0.8 },

  card: { backgroundColor: Colors.card, borderRadius: 16, padding: 20, marginBottom: 15, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  cardTitle: { fontSize: 12, fontWeight: 'bold', color: Colors.mutedForeground, marginBottom: 15, textTransform: 'uppercase', letterSpacing: 1 },
  
  rowItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border },
  rowLabel: { fontSize: 14, color: Colors.mutedForeground },
  rowValue: { fontSize: 14, fontWeight: 'bold', color: Colors.foreground },
  
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 13, fontWeight: 'bold' },

  shareButton: { backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border, padding: 16, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } },
  shareButtonText: { color: Colors.primary, fontSize: 14, fontWeight: 'bold', marginLeft: 10, letterSpacing: 1 },

  saveButton: { backgroundColor: Colors.foreground, padding: 18, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  saveButtonText: { color: Colors.card, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },

  disclaimer: { fontSize: 10, color: Colors.mutedForeground, textAlign: 'center', lineHeight: 16, paddingHorizontal: 10 }
});
