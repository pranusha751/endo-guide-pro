import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/theme';

export default function ToolsDashboardScreen() {
  const router = useRouter();

  const tools = [
    {
      id: 'file-calculator',
      name: 'File Calculator',
      description: 'Calculate file sequences based on tooth anatomy.',
      icon: 'calculator',
      route: '/(main)/tools/file-calculator',
    },
    {
      id: 'irrigation',
      name: 'Irrigation Protocol',
      description: 'Step-by-step endodontic irrigation guides.',
      icon: 'water',
      route: '/(main)/tools/irrigation',
    },
    {
      id: 'rubber-dam',
      name: 'Rubber Dam Guide',
      description: 'Isolation strategies and clamp selection.',
      icon: 'shield-checkmark',
      route: '/(main)/tools/rubber-dam',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tools</Text>
      <Text style={styles.subtitle}>Clinical reference and calculators</Text>
      {tools.map((tool) => (
        <TouchableOpacity
          key={tool.id}
          style={styles.card}
          onPress={() => router.push(tool.route as any)}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={tool.icon as any} size={28} color={Colors.mintForeground} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{tool.name}</Text>
            <Text style={styles.cardDesc}>{tool.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.border} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: Colors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.foreground },
  subtitle: { fontSize: 14, color: Colors.mutedForeground, marginBottom: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: Colors.mint,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.foreground, marginBottom: 4 },
  cardDesc: { fontSize: 13, color: Colors.mutedForeground },
});
