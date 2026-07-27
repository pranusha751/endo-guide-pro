import { Stack } from 'expo-router';

export default function WorkflowLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="summary" options={{ title: 'Case Summary' }} />
    </Stack>
  );
}
