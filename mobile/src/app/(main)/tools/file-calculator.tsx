import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
// We are using custom Touchables instead of Picker.
import { TouchableOpacity } from 'react-native';
import { FILE_PROTOCOLS, FILE_SYSTEMS, FileSystem } from '../../../lib/endo-data';
import { Ionicons } from '@expo/vector-icons';

export default function FileCalculatorScreen() {
  const [fileSys, setFileSys] = useState<FileSystem>('ProTaper Gold');
  const protocol = FILE_PROTOCOLS[fileSys];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>File Sequence Calculator</Text>
      <Text style={styles.headerSubtitle}>Optimized protocols for major file systems</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Select System</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.systemSelector}>
          {FILE_SYSTEMS.map((sys) => (
            <TouchableOpacity
              key={sys}
              style={[styles.systemButton, fileSys === sys && styles.systemButtonActive]}
              onPress={() => setFileSys(sys)}
            >
              <Text style={[styles.systemButtonText, fileSys === sys && styles.systemButtonTextActive]}>
                {sys}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>SPEED</Text>
            <Text style={styles.statValue}>{protocol.rpm}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>TORQUE</Text>
            <Text style={styles.statValue}>{protocol.torque}</Text>
          </View>
        </View>
      </View>

      <Section title="Glide Path" items={protocol.glidePath} icon="git-merge" color="#28a745" />
      <Section title="Shaping" items={protocol.shaping} icon="flash" color="#ffc107" />
      <Section title="Finishing" items={protocol.finishing} icon="checkmark-circle" color="#17a2b8" />

      <View style={[styles.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <Text style={styles.mafLabel}>Standard MAF</Text>
        <Text style={styles.mafValue}>{protocol.maf}</Text>
      </View>
    </ScrollView>
  );
}

function Section({ title, items, icon, color }: { title: string, items: string[], icon: any, color: string }) {
  return (
    <View style={styles.card}>
      <View style={[styles.cardHeader, { borderBottomColor: color, borderBottomWidth: 2 }]}>
        <Ionicons name={icon} size={20} color={color} style={{ marginRight: 8 }} />
        <Text style={[styles.sectionTitle, { color: color, marginBottom: 0 }]}>{title}</Text>
      </View>
      <View style={{ paddingTop: 15 }}>
        {items.map((item, idx) => (
          <View key={idx} style={styles.listItem}>
            <View style={[styles.listBullet, { backgroundColor: color }]}>
              <Text style={styles.listBulletText}>{idx + 1}</Text>
            </View>
            <Text style={styles.listItemText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#333',
    marginBottom: 10,
  },
  systemSelector: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  systemButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  systemButtonActive: {
    backgroundColor: '#007bff',
  },
  systemButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  systemButtonTextActive: {
    color: '#fff',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#007bff',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  listBulletText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  listItemText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  mafLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  mafValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
});
