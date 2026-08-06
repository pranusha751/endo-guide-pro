import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

export default function MainLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopColor: Colors.border,
        },
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.foreground,
      }}
    >
      <Tabs.Screen
        name="workflow"
        options={{
          title: 'Workflow',
          tabBarIcon: ({ color }) => <Ionicons name="git-network" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="anatomy"
        options={{
          title: 'Anatomy',
          tabBarIcon: ({ color }) => <Ionicons name="book" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="diagnosis"
        options={{
          title: 'Diagnosis',
          tabBarIcon: ({ color }) => <Ionicons name="medkit" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: 'Tools',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="hammer" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
      
      {/* Hide the cases detail screens from the tab bar */}
      <Tabs.Screen name="cases" options={{ href: null, headerShown: false }} />
    </Tabs>
  );
}
