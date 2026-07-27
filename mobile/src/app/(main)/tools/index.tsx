import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ToolsDashboardScreen() {
  const router = useRouter();

  const tools = [
    {
      id: 'file-calculator',
      name: 'File Calculator',
      description: 'Calculate file sequences based on tooth anatomy.',
      icon: 'calculator',
      route: '/(main)/tools/file-calculator'
    },
    {
      id: 'irrigation',
      name: 'Irrigation Protocol',
      description: 'Step-by-step endodontic irrigation guides.',
      icon: 'water',
      route: null
    },
    {
      id: 'rubber-dam',
      name: 'Rubber Dam Guide',
      description: 'Isolation strategies and clamp selection.',
      icon: 'shield-checkmark',
      route: null
    }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tools.map((tool) => (
        <TouchableOpacity
          key={tool.id}
          style={styles.card}
          onPress={() => tool.route ? router.push(tool.route as any) : alert('Coming soon!')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={tool.icon as any} size={32} color="#007bff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{tool.name}</Text>
            <Text style={styles.cardDesc}>{tool.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e6f2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
  },
});
