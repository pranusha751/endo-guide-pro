import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitialized(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const segs = segments as string[];
    const inAuthGroup = segs[0] === '(auth)';

    if (session) {
      if (segs.length === 0 || inAuthGroup) {
        router.replace('/(main)' as any);
      }
    } else if (!session && !inAuthGroup) {
      router.replace('/(auth)/login' as any);
    }
  }, [session, initialized, segments]);

  return <Slot />;
}
