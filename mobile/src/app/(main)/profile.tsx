import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { Colors } from '../../constants/theme';

type CaseRecord = {
  id: string;
  patientName: string | null;
  tooth: string;
  dx: string;
  fileSystem: string;
  createdAt: string;
};

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase
          .from('Case')
          .select('*')
          .eq('userId', user.id)
          .order('createdAt', { ascending: false });
        setCases(data || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  let displayName = 'Doctor';
  let initials = 'DR';
  if (user) {
    const nameStr = user.user_metadata?.full_name || user.email.split('@')[0];
    displayName = /^dr\.?\s/i.test(nameStr) ? nameStr : `Dr. ${nameStr}`;
    const parts = nameStr.replace(/^dr\.?\s+/i, '').split(/[-_.\s]+/);
    initials = parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : nameStr.substring(0, 2).toUpperCase();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Banner */}
      <View style={styles.banner}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View>
          <Text style={styles.bannerName}>{displayName}</Text>
          <Text style={styles.bannerSub}>{cases.length} cases total</Text>
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="document-text" size={20} color={Colors.mintForeground} />
          <Text style={styles.statValue}>{cases.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.mintForeground} />
          <Text style={styles.statValue}>{cases.filter(c => c.dx).length}</Text>
          <Text style={styles.statLabel}>Diagnosed</Text>
        </View>
      </View>

      {/* Cases list */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Cases</Text>
        <TouchableOpacity onPress={() => router.push('/(main)/workflow' as any)}>
          <Text style={styles.addCase}>+ Add Case</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.emptyText}>Loading...</Text>
      ) : cases.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="folder-open-outline" size={48} color={Colors.border} />
          <Text style={styles.emptyText}>No cases yet.</Text>
          <TouchableOpacity style={styles.startBtn} onPress={() => router.push('/(main)/workflow' as any)}>
            <Text style={styles.startBtnText}>Start New Case</Text>
          </TouchableOpacity>
        </View>
      ) : (
        cases.map((c) => (
          <TouchableOpacity key={c.id} style={styles.caseCard} onPress={() => router.push(`/(main)/cases/${c.id}` as any)}>
            <View style={styles.toothBadge}>
              <Text style={styles.toothBadgeText}>{c.tooth}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.caseName}>{c.patientName || c.dx || 'Unnamed'}</Text>
              <Text style={styles.caseSub}>{c.dx} · {new Date(c.createdAt).toLocaleDateString()}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Completed</Text>
            </View>
          </TouchableOpacity>
        ))
      )}

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={18} color={Colors.destructive} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: Colors.background, flexGrow: 1, paddingBottom: 40 },

  banner: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.mint, borderRadius: 20, padding: 20, marginBottom: 20, gap: 16 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.card, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 20, fontWeight: 'bold', color: Colors.mintForeground },
  bannerName: { fontSize: 16, fontWeight: '600', color: Colors.mintForeground },
  bannerSub: { fontSize: 13, color: Colors.mintForeground, opacity: 0.8 },

  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: Colors.card, borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: Colors.border, gap: 4 },
  statValue: { fontSize: 22, fontWeight: 'bold', color: Colors.foreground },
  statLabel: { fontSize: 11, color: Colors.mutedForeground, textTransform: 'uppercase', fontWeight: 'bold' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: Colors.mutedForeground, textTransform: 'uppercase', letterSpacing: 1 },
  addCase: { fontSize: 13, fontWeight: 'bold', color: Colors.primary },

  caseCard: { flexDirection: 'row', backgroundColor: Colors.card, borderRadius: 16, padding: 16, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: Colors.border, gap: 12 },
  toothBadge: { width: 42, height: 42, borderRadius: 12, backgroundColor: Colors.peach, justifyContent: 'center', alignItems: 'center' },
  toothBadgeText: { fontSize: 14, fontWeight: 'bold', color: Colors.peachForeground },
  caseName: { fontSize: 14, fontWeight: '600', color: Colors.foreground },
  caseSub: { fontSize: 12, color: Colors.mutedForeground, marginTop: 2 },
  statusBadge: { backgroundColor: Colors.mint, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 10, fontWeight: 'bold', color: Colors.mintForeground, textTransform: 'uppercase' },

  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyText: { color: Colors.mutedForeground, fontSize: 14 },
  startBtn: { backgroundColor: Colors.foreground, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  startBtnText: { color: Colors.background, fontWeight: 'bold' },

  signOutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 32, gap: 8, padding: 16 },
  signOutText: { color: Colors.destructive, fontWeight: 'bold', fontSize: 15 },
});
