import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const redirectUrl = 'https://endo-guide-pro-1.onrender.com/workflow';
    const { data: { session }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { fullName },
      },
    });

    if (error) Alert.alert('Error', error.message);
    else if (!session) Alert.alert('Check your inbox', 'We sent you a verification email. Please verify before signing in.');
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Brand */}
        <View style={styles.brandRow}>
          <View style={styles.logoIcon}>
            <Ionicons name="shield-checkmark" size={32} color={Colors.mintForeground} />
          </View>
          <Text style={styles.brandName}>Endo Guide Pro</Text>
        </View>

        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>Join to start documenting your clinical cases</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFullName}
            value={fullName}
            placeholder="Dr. Jane Smith"
            placeholderTextColor={Colors.mutedForeground}
            autoCapitalize="words"
          />

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
            style={[styles.signUpBtn, loading && { opacity: 0.7 }]}
            disabled={loading}
            onPress={signUpWithEmail}
          >
            <Text style={styles.signUpBtnText}>{loading ? 'Creating account...' : 'Create account'}</Text>
          </TouchableOpacity>

          <Link href={"/(auth)/login" as any} asChild>
            <TouchableOpacity style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>
                Already have an account? <Text style={{ fontWeight: 'bold' }}>Sign in</Text>
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

  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 40, justifyContent: 'center' },
  logoIcon: { width: 50, height: 50, borderRadius: 14, backgroundColor: Colors.mint, justifyContent: 'center', alignItems: 'center' },
  brandName: { fontSize: 22, fontWeight: 'bold', color: Colors.foreground },

  title: { fontSize: 26, fontWeight: 'bold', color: Colors.foreground, marginBottom: 6 },
  subtitle: { fontSize: 14, color: Colors.mutedForeground, marginBottom: 32 },

  form: { gap: 4 },
  label: { fontSize: 13, fontWeight: '600', color: Colors.foreground, marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderColor: Colors.border, padding: 14, borderRadius: 12, backgroundColor: Colors.card, color: Colors.foreground, fontSize: 15, marginBottom: 4 },

  passwordRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  eyeBtn: { padding: 14, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, backgroundColor: Colors.card },

  signUpBtn: { backgroundColor: Colors.foreground, padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 24 },
  signUpBtnText: { color: Colors.background, fontWeight: 'bold', fontSize: 16 },

  secondaryBtn: { padding: 16, alignItems: 'center', marginTop: 8 },
  secondaryBtnText: { color: Colors.mutedForeground, fontSize: 14 },
});
