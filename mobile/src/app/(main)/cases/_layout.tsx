import { Stack } from 'expo-router';

export default function CasesLayout() {
  return (
    <Stack>
      <Stack.Screen name="[caseId]" options={{ title: 'Case Details' }} />
    </Stack>
  );
}
