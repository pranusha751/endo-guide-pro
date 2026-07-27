import { Stack } from 'expo-router';

export default function ToolsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Tools' }} />
      <Stack.Screen name="file-calculator" options={{ title: 'File Calculator' }} />
    </Stack>
  );
}
