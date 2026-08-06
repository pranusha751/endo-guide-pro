import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/theme';
import { useRouter } from 'expo-router';
import {
  TEETH,
  FILE_PROTOCOLS,
  FILE_SYSTEMS,
  FileSystem,
  DIAGNOSES,
  IRRIGATION_STEPS,
  IRRIGATION_SAFETY,
  ACCESS_GUIDES,
  BUR_RECOMMENDATIONS,
  MAF_GUIDANCE,
  RUBBER_DAM_TIPS,
} from '../../../lib/endo-data';

const STEPS = [
  "Tooth", "Symptoms", "Pulp Tests", "Diagnosis", 
  "Access", "Files", "Irrigation", "Rubber Dam", "Summary"
];

function accessGroupFor(fdi: string, group: string) {
  const upper = fdi.startsWith("1") || fdi.startsWith("2");
  if (group === "anterior") {
    if (upper && fdi.endsWith("3")) return "Max Canine";
    return upper ? "Max Incisors" : "Mand Incisors";
  }
  if (group === "premolar") return upper ? "Max Premolars" : "Mand Premolars";
  return upper ? "Max Molars" : "Mand Molars";
}

interface Symptoms {
  spontaneous: boolean;
  cold: "none" | "brief" | "lingering";
  biting: boolean;
  swelling: "none" | "localized" | "diffuse";
  sinus: boolean;
}

interface PulpTests {
  cold: string;
  ept: string;
  percussion: string;
  palpation: string;
  radiograph: string;
}

export default function WorkflowScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("Select");
  const [tooth, setTooth] = useState("16");
  const [symptoms, setSymptoms] = useState<Symptoms>({
    spontaneous: false, cold: "none", biting: false, swelling: "none", sinus: false,
  });
  const [tests, setTests] = useState<PulpTests>({
    cold: "Normal", ept: "Normal", percussion: "Negative", palpation: "Negative", radiograph: "Normal PDL",
  });
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [fileSys, setFileSys] = useState<FileSystem>("ProTaper Gold");
  const [bindingSize, setBindingSize] = useState("15");
  const [irrigDone, setIrrigDone] = useState<Record<string, boolean>>({});

  const toothInfo = useMemo(() => TEETH.find((t: any) => t.fdi === tooth), [tooth]);
  const protocol = FILE_PROTOCOLS[fileSys];

  const suggestedDx = useMemo(() => {
    if (symptoms.swelling === "diffuse") return "acute-abscess";
    if (symptoms.sinus) return "chronic-abscess";
    if (symptoms.swelling === "localized" && symptoms.spontaneous) return "acute-abscess";
    if (tests.percussion !== "Negative" && (tests.cold === "No response" || tests.radiograph === "PA radiolucency")) return "apical";
    if (tests.cold === "No response" && tests.ept === "No response") return "necrosis";
    if (symptoms.cold === "lingering" || symptoms.spontaneous) return "irreversible-symp";
    if (symptoms.cold === "brief") return "reversible";
    return "normal";
  }, [symptoms, tests]);

  const activeDx = diagnosis || suggestedDx;
  const dxInfo = DIAGNOSES.find((d: any) => d.id === activeDx);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Endodontic Workflow</Text>
        <Text style={styles.subtitle}>Step {step + 1} of {STEPS.length} · {STEPS[step]}</Text>
        
        <View style={styles.progressBar}>
          {STEPS.map((_, i) => (
            <View key={i} style={[styles.progressItem, i <= step ? styles.progressActive : styles.progressInactive]} />
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 0 && (
          <Card title="Patient & Tooth Selection">
            <Label text="Patient Name (Optional)" />
            <TextInput style={styles.input} value={patientName} onChangeText={setPatientName} placeholder="e.g. John Doe" />
            
            <View style={styles.row}>
              <View style={{flex: 1, marginRight: 10}}>
                <Label text="Age" />
                <TextInput style={styles.input} value={patientAge} onChangeText={setPatientAge} placeholder="e.g. 45" keyboardType="numeric" />
              </View>
              <View style={{flex: 1}}>
                <SelectField label="Gender" value={patientGender} options={["Select", "Male", "Female", "Other"]} onChange={setPatientGender} />
              </View>
            </View>
            
            <View style={styles.divider} />
            <Label text="FDI Tooth Number" />
            <View style={styles.pickerContainer}>
              <Picker selectedValue={tooth} onValueChange={(itemValue) => setTooth(itemValue)}>
                {TEETH.map((t: any) => (
                  <Picker.Item key={t.fdi} label={`${t.fdi} — ${t.name}`} value={t.fdi} />
                ))}
              </Picker>
            </View>

            {toothInfo && (
              <View style={styles.statsGrid}>
                <Stat label="Roots" value={toothInfo.roots} />
                <Stat label="Canals" value={toothInfo.canals} />
                <Stat label="Access shape" value={toothInfo.accessShape} />
                <Stat label="Working length" value={toothInfo.workingLength} />
              </View>
            )}
          </Card>
        )}

        {step === 1 && (
          <Card title="Symptoms">
            <Toggle label="Spontaneous pain" value={symptoms.spontaneous} onChange={(v) => setSymptoms({ ...symptoms, spontaneous: v })} />
            <SegGroup label="Pain to cold" value={symptoms.cold} options={["none", "brief", "lingering"]} onChange={(v) => setSymptoms({ ...symptoms, cold: v as any })} />
            <Toggle label="Pain on biting" value={symptoms.biting} onChange={(v) => setSymptoms({ ...symptoms, biting: v })} />
            <SegGroup label="Swelling" value={symptoms.swelling} options={["none", "localized", "diffuse"]} onChange={(v) => setSymptoms({ ...symptoms, swelling: v as any })} />
            <Toggle label="Sinus tract" value={symptoms.sinus} onChange={(v) => setSymptoms({ ...symptoms, sinus: v })} />
          </Card>
        )}

        {step === 2 && (
          <Card title="Pulp & Periapical Tests">
            <SelectField label="Cold test" value={tests.cold} options={["Normal", "Brief response", "Lingering response", "No response"]} onChange={(v) => setTests({ ...tests, cold: v })} />
            <SelectField label="EPT response" value={tests.ept} options={["Normal", "Reduced", "Heightened", "No response"]} onChange={(v) => setTests({ ...tests, ept: v })} />
            <SelectField label="Percussion" value={tests.percussion} options={["Negative", "Mild", "Severe"]} onChange={(v) => setTests({ ...tests, percussion: v })} />
            <SelectField label="Palpation" value={tests.palpation} options={["Negative", "Tender", "Swelling"]} onChange={(v) => setTests({ ...tests, palpation: v })} />
            <SelectField label="Radiograph findings" value={tests.radiograph} options={["Normal PDL", "Widened PDL", "PA radiolucency", "Resorption"]} onChange={(v) => setTests({ ...tests, radiograph: v })} />
          </Card>
        )}

        {step === 3 && (
          <View>
            <Card title="Suggested Diagnosis">
              <View style={[styles.dxBox, { backgroundColor: dxInfo?.color === 'mint' ? '#d4edda' : dxInfo?.color === 'peach' ? '#ffe8cc' : dxInfo?.color === 'warning' ? '#fff3cd' : '#f8d7da' }]}>
                <Text style={styles.dxBoxLabel}>Most likely</Text>
                <Text style={styles.dxBoxTitle}>{dxInfo?.label}</Text>
                <Text style={styles.dxBoxDesc}>{dxInfo?.treatment}</Text>
              </View>
            </Card>
            <Card title="Override (Manual)">
              {DIAGNOSES.map((d: any) => (
                <TouchableOpacity key={d.id} onPress={() => setDiagnosis(d.id)} style={[styles.dxItem, activeDx === d.id && styles.dxItemActive]}>
                  <Text style={styles.dxItemTitle}>{d.label}</Text>
                  <Text style={styles.dxItemDesc}>{d.treatment}</Text>
                </TouchableOpacity>
              ))}
            </Card>
          </View>
        )}

        {step === 4 && toothInfo && (() => {
          const guide = ACCESS_GUIDES.find((g: any) => g.group === accessGroupFor(toothInfo.fdi, toothInfo.group))!;
          return (
            <View>
              <Card title="Access Cavity Design">
                <View style={styles.toothGraphic}>
                  <Text style={styles.toothGraphicText}>{toothInfo.fdi}</Text>
                  <Text style={styles.toothGraphicSub}>{guide.shape}</Text>
                </View>
                <Stat label="Tooth group" value={guide.group} />
                <Stat label="Access shape" value={guide.shape} />
                <Stat label="Bur entry point" value={guide.entry} />
                <Stat label="Key landmarks" value={guide.landmarks} />
              </Card>
              <Card title="Bur Recommendations">
                {BUR_RECOMMENDATIONS.map((b: any) => (
                  <Text key={b.phase} style={styles.liText}><Text style={{fontWeight: 'bold'}}>{b.phase}: </Text>{b.bur}</Text>
                ))}
              </Card>
              <Card title="Common Errors">
                <Text style={styles.liText}>{guide.errors}</Text>
              </Card>
            </View>
          );
        })()}

        {step === 5 && (
          <View>
            <Card title="File System">
              <SelectField label="System" value={fileSys} options={FILE_SYSTEMS as unknown as string[]} onChange={(v) => setFileSys(v as FileSystem)} />
              <Label text={`Initial binding file size (#${bindingSize})`} />
              {/* React Native core doesn't have a Slider. Using simple TextInput for binding size to avoid installing more packages */}
              <TextInput style={styles.input} value={bindingSize} onChangeText={setBindingSize} keyboardType="numeric" />
            </Card>
            <Card title="Sequence">
              <Section heading="Glide path" items={protocol.glidePath} />
              <Section heading="Shaping" items={protocol.shaping} />
              <Section heading="Finishing" items={protocol.finishing} />
              <View style={styles.statsGrid}>
                <Stat label="RPM" value={protocol.rpm} />
                <Stat label="Torque" value={protocol.torque} />
                <Stat label="Taper" value={protocol.taper} />
                <Stat label="Master apical file" value={protocol.maf} />
              </View>
            </Card>
            <Card title="MAF Guidance">
              {MAF_GUIDANCE.map((m: any) => (
                <Text key={m.canal} style={styles.liText}><Text style={{fontWeight: 'bold'}}>{m.canal}: </Text>{m.maf}</Text>
              ))}
            </Card>
          </View>
        )}

        {step === 6 && (
          <Card title="Irrigation Protocol">
            {IRRIGATION_STEPS.map((s: any) => {
              const done = !!irrigDone[s.id];
              return (
                <TouchableOpacity key={s.id} onPress={() => setIrrigDone({ ...irrigDone, [s.id]: !done })} style={[styles.irrigItem, done && styles.irrigItemDone]}>
                  <View style={[styles.checkbox, done && styles.checkboxDone]}>
                    {done && <Ionicons name="checkmark" size={16} color="#fff" />}
                  </View>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.irrigItemTitle}>{s.label}</Text>
                      {s.warning && <Ionicons name="warning" size={16} color="#ffc107" style={{marginLeft: 5}} />}
                    </View>
                    <Text style={styles.irrigItemDesc}>{s.concentration} · {s.volume} · {s.time}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            <View style={styles.warningBox}>
              <Text style={styles.warningTitle}><Ionicons name="warning" size={16} /> Safety notes</Text>
              {IRRIGATION_SAFETY.map((s: any, i: any) => <Text key={i} style={styles.warningText}>• {s}</Text>)}
            </View>
          </Card>
        )}

        {step === 7 && toothInfo && (
          <View>
            <Card title="Rubber Dam Setup">
              <View style={styles.groupBadge}>
                <Text style={styles.groupBadgeLabel}>Tooth group</Text>
                <Text style={styles.groupBadgeValue}>{toothInfo.group}</Text>
              </View>
              <Stat label="Recommended clamp" value={toothInfo.clamp} />
            </Card>
            <Card title="Tips & Clamp Guide">
              {RUBBER_DAM_TIPS.map((t: any) => (
                <View key={t.category} style={styles.tipBox}>
                  <Text style={styles.tipBoxTitle}>{t.category}</Text>
                  <Text style={styles.tipBoxDesc}>{t.details}</Text>
                </View>
              ))}
            </Card>
          </View>
        )}

        {step === 8 && (
          <View>
            <Card title="Case Summary">
              <Row label="Tooth" value={`${tooth} — ${toothInfo?.name}`} />
              <Row label="Diagnosis" value={dxInfo?.label ?? "—"} />
              <Row label="Access" value={toothInfo?.accessShape ?? "—"} />
              <Row label="File system" value={fileSys} />
              <Row label="MAF" value={protocol.maf} />
              <Row label="Clamp" value={toothInfo?.clamp ?? "—"} />
            </Card>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => router.push({
                pathname: '/(main)/workflow/summary',
                params: {
                  tooth,
                  dx: activeDx,
                  files: fileSys,
                  patientName,
                  patientAge,
                  patientGender: patientGender === "Select" ? "" : patientGender,
                }
              } as any)}
            >
              <Ionicons name="save" size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Save Case & Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={styles.footerNav}>
        <TouchableOpacity style={[styles.navBtn, styles.navBtnBack, step === 0 && {opacity: 0.5}]} onPress={prev} disabled={step === 0}>
          <Ionicons name="chevron-back" size={20} color="#333" />
          <Text style={styles.navBtnTextBack}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navBtn, styles.navBtnNext, step === STEPS.length - 1 && {opacity: 0.5}]} onPress={next} disabled={step === STEPS.length - 1}>
          <Text style={styles.navBtnTextNext}>Continue</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Components
const Card = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const Label = ({ text }: { text: string }) => <Text style={styles.label}>{text}</Text>;

const Stat = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.statBox}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const Row = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.rowItem}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const Toggle = ({ label, value, onChange }: { label: string, value: boolean, onChange: (v: boolean) => void }) => (
  <View style={styles.toggleRow}>
    <Text style={styles.toggleLabel}>{label}</Text>
    <Switch value={value} onValueChange={onChange} trackColor={{ true: '#007bff' }} />
  </View>
);

const SegGroup = ({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) => (
  <View style={styles.segGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.segRow}>
      {options.map((o) => (
        <TouchableOpacity key={o} style={[styles.segBtn, value === o && styles.segBtnActive]} onPress={() => onChange(o)}>
          <Text style={[styles.segBtnText, value === o && styles.segBtnTextActive]}>{o}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const SelectField = ({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) => (
  <View style={{ marginBottom: 15 }}>
    <Label text={label} />
    <View style={styles.pickerContainer}>
      <Picker selectedValue={value} onValueChange={onChange}>
        {options.map((o) => <Picker.Item key={o} label={o} value={o} />)}
      </Picker>
    </View>
  </View>
);

const Section = ({ heading, items }: { heading: string, items: string[] }) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={styles.label}>{heading}</Text>
    {items.map((item, i) => (
      <View key={i} style={styles.sectionLi}>
        <View style={styles.sectionBullet}><Text style={styles.sectionBulletText}>{i + 1}</Text></View>
        <Text style={styles.sectionText}>{item}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: 20, backgroundColor: Colors.card, borderBottomWidth: 1, borderBottomColor: Colors.border },
  title: { fontSize: 22, fontWeight: 'bold', color: Colors.foreground },
  subtitle: { fontSize: 14, color: Colors.mutedForeground, marginTop: 5, marginBottom: 15 },
  progressBar: { flexDirection: 'row', gap: 4 },
  progressItem: { height: 6, flex: 1, borderRadius: 3 },
  progressActive: { backgroundColor: Colors.primary },
  progressInactive: { backgroundColor: Colors.muted },
  scrollContent: { padding: 15, paddingBottom: 100 },
  card: { backgroundColor: Colors.card, borderRadius: 16, padding: 15, marginBottom: 15, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  cardTitle: { fontSize: 12, fontWeight: 'bold', color: Colors.mutedForeground, textTransform: 'uppercase', marginBottom: 15, letterSpacing: 1 },
  label: { fontSize: 12, fontWeight: '600', color: Colors.foreground, marginBottom: 5 },
  input: { backgroundColor: Colors.input, borderWidth: 1, borderColor: Colors.border, borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 15, color: Colors.foreground },
  row: { flexDirection: 'row' },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 15 },
  pickerContainer: { borderWidth: 1, borderColor: Colors.border, borderRadius: 8, backgroundColor: Colors.input, overflow: 'hidden' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 15, marginHorizontal: -5 },
  statBox: { backgroundColor: Colors.mint, padding: 10, borderRadius: 8, width: '47%', margin: '1.5%', marginBottom: 10 },
  statLabel: { fontSize: 10, fontWeight: 'bold', color: Colors.mintForeground, textTransform: 'uppercase' },
  statValue: { fontSize: 14, fontWeight: '600', color: Colors.foreground, marginTop: 4 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  toggleLabel: { fontSize: 16, color: Colors.foreground },
  segGroup: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  segRow: { flexDirection: 'row', gap: 8 },
  segBtn: { flex: 1, paddingVertical: 8, borderWidth: 1, borderColor: Colors.border, borderRadius: 8, alignItems: 'center', backgroundColor: Colors.card },
  segBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  segBtnText: { fontSize: 14, color: Colors.mutedForeground, textTransform: 'capitalize' },
  segBtnTextActive: { color: Colors.primaryForeground, fontWeight: 'bold' },
  dxBox: { padding: 15, borderRadius: 12 },
  dxBoxLabel: { fontSize: 12, color: Colors.mutedForeground, textTransform: 'uppercase', fontWeight: 'bold' },
  dxBoxTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.foreground, marginTop: 5 },
  dxBoxDesc: { fontSize: 14, color: Colors.foreground, marginTop: 5 },
  dxItem: { padding: 15, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, marginBottom: 10 },
  dxItemActive: { borderColor: Colors.primary, backgroundColor: Colors.mint },
  dxItemTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.foreground },
  dxItemDesc: { fontSize: 12, color: Colors.mutedForeground, marginTop: 4 },
  toothGraphic: { width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.mint, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  toothGraphicText: { fontSize: 32, fontWeight: 'bold', color: Colors.mintForeground },
  toothGraphicSub: { fontSize: 12, color: Colors.mintForeground, opacity: 0.8 },
  liText: { fontSize: 14, color: Colors.foreground, marginBottom: 8, lineHeight: 20 },
  irrigItem: { flexDirection: 'row', padding: 15, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, marginBottom: 10, backgroundColor: Colors.card },
  irrigItemDone: { backgroundColor: Colors.mint, borderColor: Colors.primary },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: Colors.border, marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  checkboxDone: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  irrigItemTitle: { fontSize: 15, fontWeight: 'bold', color: Colors.foreground },
  irrigItemDesc: { fontSize: 12, color: Colors.mutedForeground, marginTop: 4 },
  warningBox: { backgroundColor: Colors.warning, borderColor: Colors.border, borderWidth: 1, borderRadius: 12, padding: 15, marginTop: 10 },
  warningTitle: { fontSize: 14, fontWeight: 'bold', color: Colors.warningForeground, marginBottom: 10 },
  warningText: { fontSize: 12, color: Colors.warningForeground, marginBottom: 5 },
  groupBadge: { backgroundColor: Colors.peach, padding: 15, borderRadius: 12, marginBottom: 15 },
  groupBadgeLabel: { fontSize: 12, color: Colors.peachForeground, textTransform: 'uppercase', fontWeight: 'bold' },
  groupBadgeValue: { fontSize: 18, fontWeight: 'bold', color: Colors.peachForeground, marginTop: 5, textTransform: 'capitalize' },
  tipBox: { borderWidth: 1, borderColor: Colors.border, borderRadius: 12, padding: 15, marginBottom: 10 },
  tipBoxTitle: { fontSize: 14, fontWeight: 'bold', color: Colors.foreground },
  tipBoxDesc: { fontSize: 13, color: Colors.mutedForeground, marginTop: 5 },
  rowItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  rowLabel: { fontSize: 14, color: Colors.mutedForeground },
  rowValue: { fontSize: 14, fontWeight: 'bold', color: Colors.foreground },
  saveButton: { backgroundColor: Colors.foreground, padding: 15, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: Colors.background, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  sectionLi: { flexDirection: 'row', marginBottom: 8, alignItems: 'center' },
  sectionBullet: { width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  sectionBulletText: { color: Colors.primaryForeground, fontSize: 10, fontWeight: 'bold' },
  sectionText: { fontSize: 14, color: Colors.foreground, flex: 1 },
  footerNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: 15, backgroundColor: Colors.card, borderTopWidth: 1, borderTopColor: Colors.border, gap: 10 },
  navBtn: { flex: 1, padding: 15, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  navBtnBack: { backgroundColor: Colors.input, borderWidth: 1, borderColor: Colors.border },
  navBtnNext: { backgroundColor: Colors.foreground },
  navBtnTextBack: { color: Colors.foreground, fontSize: 16, fontWeight: '600', marginLeft: 5 },
  navBtnTextNext: { color: Colors.background, fontSize: 16, fontWeight: '600', marginRight: 5 },
});
