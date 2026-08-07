import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Sign in failed', error.message);
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo / Brand */}
        <View style={styles.brandRow}>
          <Image
            source={require('@/assets/images/endo-guide-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to your account to continue</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="email@address.com"
            placeholderTextColor={Colors.mutedForeground}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
              placeholder="Password"
              placeholderTextColor={Colors.mutedForeground}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={Colors.mutedForeground} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.signInBtn, loading && { opacity: 0.7 }]}
            disabled={loading}
            onPress={signInWithEmail}
          >
            <Text style={styles.signInBtnText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
          </TouchableOpacity>

          <Link href={"/(auth)/signup" as any} asChild>
            <TouchableOpacity style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>
                Don't have an account? <Text style={{ fontWeight: 'bold' }}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: Colors.background, padding: 28, justifyContent: 'center' },

  brandRow: { alignItems: 'center', marginBottom: 40, justifyContent: 'center' },
  logoImage: { width: 120, height: 120, borderRadius: 28 },

  title: { fontSize: 26, fontWeight: 'bold', color: Colors.foreground, marginBottom: 6 },
  subtitle: { fontSize: 14, color: Colors.mutedForeground, marginBottom: 32 },

  form: { gap: 4 },
  label: { fontSize: 13, fontWeight: '600', color: Colors.foreground, marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderColor: Colors.border, padding: 14, borderRadius: 12, backgroundColor: Colors.card, color: Colors.foreground, fontSize: 15, marginBottom: 4 },

  passwordRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  eyeBtn: { padding: 14, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, backgroundColor: Colors.card },

  signInBtn: { backgroundColor: Colors.foreground, padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 24 },
  signInBtnText: { color: Colors.background, fontWeight: 'bold', fontSize: 16 },

  secondaryBtn: { padding: 16, alignItems: 'center', marginTop: 8 },
  secondaryBtnText: { color: Colors.mutedForeground, fontSize: 14 },
});
