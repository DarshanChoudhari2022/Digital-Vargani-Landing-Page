import {
  ArrowLeft,
  BadgeIndianRupee,
  Building2,
  CheckCircle2,
  Copy,
  FileText,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Plus,
  Printer,
  ReceiptText,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  UsersRound,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, PointerEvent, ReactNode } from 'react';

type PaymentMode = 'CASH' | 'UPI' | 'CHEQUE' | 'BANK_TRANSFER' | 'OTHER';
type TextAlign = 'left' | 'center' | 'right';
type TextWrapMode = 'single' | 'wrap' | 'shrink';
type TextDecoration = 'none' | 'underline' | 'line-through';
type UserRole = 'MANDAL_ADMIN' | 'KHAJINDAR' | 'GROUP_LEADER' | 'MEMBER' | 'SUPER_ADMIN';
type Screen = 'dashboard' | 'mandals' | 'members' | 'template' | 'generate' | 'slips';
type OwnerScreen = 'dashboard' | 'mandals';
type OwnerMandalTab = 'overview' | 'template';

interface TemplatePlacement {
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
  color: string;
  fontFamily: string;
  fontSize: number;
  fontStyle: 'normal' | 'italic';
  fontWeight: number;
  height: number;
  letterSpacing: number;
  lineHeight: number;
  opacity: number;
  padding: number;
  rotate: number;
  shadow: boolean;
  textAlign: TextAlign;
  textDecoration: TextDecoration;
  textTransform: 'none' | 'uppercase' | 'capitalize';
  textWrap: TextWrapMode;
  width: number;
  x: number;
  y: number;
}

interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: { id: string; mandalId: string | null; name: string; role: UserRole };
}

interface CustomField {
  id: string;
  key: string;
  label: string;
  required: boolean;
  sortOrder: number;
  type: string;
}

interface Festival {
  id: string;
  name: string;
  status: string;
  targetAmount?: number | string | null;
  type: string;
}

interface Member {
  id: string;
  areaName?: string | null;
  displayName: string;
  phone?: string | null;
  group?: { id: string; name: string; areaName?: string | null } | null;
  user?: { email?: string | null; name: string; phone?: string | null; role: UserRole; status: string };
}

interface Group {
  id: string;
  areaName?: string | null;
  name: string;
  leader?: { name: string; phone?: string | null } | null;
  _count?: { members: number; slips: number };
}

interface Slip {
  id: string;
  amount: string | number;
  areaName?: string | null;
  contributorName: string;
  contributorPhone?: string | null;
  createdAt: string;
  paymentMode: PaymentMode;
  shopName?: string | null;
  slipNumber: string;
  status?: string;
}

interface Template {
  id: string;
  name: string;
  status: string;
  versions: Array<{
    id: string;
    backgroundFileUrl: string;
    canvasHeight: number;
    canvasWidth: number;
    isActive: boolean;
    version: number;
  }>;
}

interface ActiveForm {
  customFields: CustomField[];
  festival: Festival;
  member?: Member | null;
}

interface CollectionReport {
  balance: number;
  byCollector?: Array<{ collectorName: string; slipCount: number; totalAmount: number }>;
  byPaymentMode?: Array<{ paymentMode: PaymentMode; slipCount: number; totalAmount: number }>;
  slipCount: number;
  totalCollection: number;
  totalExpenses: number;
}

interface DemoMandal {
  additionalMembers: string;
  address: string;
  adhyakshName: string;
  adminEmail?: string;
  adminPassword?: string;
  city: string;
  contactEmail?: string;
  contactPhone: string;
  khajindarName: string;
  logoUrl?: string;
  locality: string;
  memberCount?: string;
  name: string;
}

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
const SESSION_KEY = 'digital-vargani-admin-session';
const DEMO_MANDALS_KEY = 'digital-vargani-demo-mandals';
const DEMO_IDENTIFIER = 'admin@akhilnayak.local';
const SUPER_ADMIN_IDENTIFIER = 'owner@digitalvargani.local';
const DEMO_PASSWORD = 'Demo@123456789';
const TEMPLATE_IMAGE = '/templates/akhilnayak-mitra-mandal-vargani.jpeg';

const navItems: Array<{ id: Screen; icon: ReactNode; label: string }> = [
  { id: 'dashboard', icon: <LayoutDashboard size={19} />, label: 'Dashboard' },
  { id: 'mandals', icon: <Building2 size={19} />, label: 'Mandals' },
  { id: 'members', icon: <UsersRound size={19} />, label: 'Members' },
  { id: 'template', icon: <FileText size={19} />, label: 'Vargani Template' },
  { id: 'generate', icon: <ReceiptText size={19} />, label: 'Generate' },
  { id: 'slips', icon: <BadgeIndianRupee size={19} />, label: 'Latest Slips' },
];

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [activeForm, setActiveForm] = useState<ActiveForm | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [slips, setSlips] = useState<Slip[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [report, setReport] = useState<CollectionReport | null>(null);
  const [selectedSlip, setSelectedSlip] = useState<Slip | null>(null);
  const [templatePreview, setTemplatePreview] = useState(TEMPLATE_IMAGE);
  const [notice, setNotice] = useState('Login with main mandal admin to open the console.');
  const [busy, setBusy] = useState(false);
  const [demoMandals, setDemoMandals] = useState<DemoMandal[]>([]);
  const [collectorModalOpen, setCollectorModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mandalId = session?.user.mandalId;
  const festivalId = activeForm?.festival.id;
  const filteredSlips = slips.filter((slip) => {
    const haystack = `${slip.slipNumber} ${slip.contributorName} ${slip.shopName ?? ''} ${slip.areaName ?? ''}`;
    return haystack.toLowerCase().includes(query.toLowerCase());
  });
  const totalCollection = useMemo(
    () => slips.reduce((sum, slip) => sum + Number(slip.amount), 0),
    [slips],
  );
  const activeTemplate = templates.find((template) =>
    template.versions.some((version) => version.isActive),
  );
  const latestTemplateVersion = activeTemplate?.versions.find((version) => version.isActive);

  useEffect(() => {
    const stored = window.localStorage.getItem(SESSION_KEY);
    if (!stored) return;
    const parsed = JSON.parse(stored) as AuthSession;
    setSession(parsed);
    void loadWorkspace(parsed);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(DEMO_MANDALS_KEY);
    if (stored) setDemoMandals(JSON.parse(stored) as DemoMandal[]);
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const identifier = String(form.get('identifier') || '');
    const password = String(form.get('password') || '');
    setBusy(true);
    try {
      if (identifier === SUPER_ADMIN_IDENTIFIER && password === DEMO_PASSWORD) {
        const ownerSession: AuthSession = {
          accessToken: 'demo-super-admin-token',
          refreshToken: 'demo-super-admin-refresh',
          user: { id: 'super-admin-demo', mandalId: null, name: 'Digital Vargani Owner', role: 'SUPER_ADMIN' },
        };
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(ownerSession));
        setSession(ownerSession);
        setNotice('Logged in as Digital Vargani owner.');
        return;
      }

      const nextSession = await apiRequest<AuthSession>('/auth/login', {
        body: JSON.stringify({
          identifier,
          password,
        }),
        method: 'POST',
      });
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
      setSession(nextSession);
      await loadWorkspace(nextSession);
      setNotice(`Logged in as ${nextSession.user.name}.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Login failed.');
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    if (session) await apiRequest('/auth/logout', { method: 'POST' }, session).catch(() => undefined);
    window.localStorage.removeItem(SESSION_KEY);
    setSession(null);
    setActiveForm(null);
    setGroups([]);
    setMembers([]);
    setSlips([]);
    setTemplates([]);
    setReport(null);
    setSelectedSlip(null);
    setNotice('Logged out. Login again to use the console.');
  }

  async function loadWorkspace(currentSession = session) {
    if (!currentSession) return;
    if (currentSession.user.role === 'SUPER_ADMIN' && !currentSession.user.mandalId) {
      setNotice('Owner workspace loaded. Manage all onboarded mandals from here.');
      return;
    }
    setBusy(true);
    try {
      const form = await apiRequest<ActiveForm>('/vargani/active-form', {}, currentSession);
      const slipList = await apiRequest<{ items: Slip[] }>('/vargani/slips?limit=50', {}, currentSession);
      setActiveForm(form);
      setSlips(slipList.items);
      setSelectedSlip(slipList.items[0] ?? null);

      if (
        currentSession.user.mandalId &&
        ['KHAJINDAR', 'MANDAL_ADMIN', 'SUPER_ADMIN'].includes(currentSession.user.role)
      ) {
        const base = `/mandals/${currentSession.user.mandalId}/festivals/${form.festival.id}`;
        const [nextGroups, nextMembers, nextTemplates, nextReport] = await Promise.all([
          apiRequest<Group[]>(`${base}/groups`, {}, currentSession),
          apiRequest<Member[]>(`${base}/members`, {}, currentSession),
          apiRequest<Template[]>(`${base}/templates`, {}, currentSession),
          apiRequest<CollectionReport>(`${base}/reports/collections`, {}, currentSession),
        ]);
        setGroups(nextGroups);
        setMembers(nextMembers);
        setTemplates(nextTemplates);
        setReport(nextReport);
      }

      setNotice('Live mandal data loaded from Supabase.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not load workspace.');
    } finally {
      setBusy(false);
    }
  }

  async function createMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session || !mandalId || !festivalId) return;
    const form = new FormData(event.currentTarget);
    setBusy(true);
    try {
      await apiRequest(
        `/mandals/${mandalId}/festivals/${festivalId}/members`,
        {
          body: JSON.stringify({
            areaName: String(form.get('areaName') || ''),
            email: String(form.get('email') || ''),
            groupId: String(form.get('groupId') || '') || undefined,
            name: String(form.get('name') || ''),
            password: String(form.get('password') || DEMO_PASSWORD),
            phone: String(form.get('phone') || ''),
            role: String(form.get('role') || 'MEMBER') as UserRole,
          }),
          method: 'POST',
        },
        session,
      );
      event.currentTarget.reset();
      await loadWorkspace(session);
      setNotice('Member login created successfully.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not create member login.');
    } finally {
      setBusy(false);
    }
  }

  async function createMandal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const logo = form.get('logo');
    const newMandal: DemoMandal = {
      additionalMembers: String(form.get('additionalMembers') || ''),
      address: String(form.get('address') || ''),
      adhyakshName: String(form.get('adhyakshName') || ''),
      adminEmail: String(form.get('adminEmail') || `admin@${slugify(String(form.get('name') || 'mandal'))}.local`),
      adminPassword: String(form.get('adminPassword') || DEMO_PASSWORD),
      city: String(form.get('city') || ''),
      contactEmail: String(form.get('contactEmail') || ''),
      contactPhone: String(form.get('contactPhone') || ''),
      khajindarName: String(form.get('khajindarName') || ''),
      logoUrl: logo instanceof File && logo.size > 0 ? URL.createObjectURL(logo) : '',
      locality: String(form.get('locality') || ''),
      memberCount: String(form.get('memberCount') || ''),
      name: String(form.get('name') || ''),
    };

    if (session?.user.role === 'SUPER_ADMIN') {
      const nextMandals = [newMandal, ...demoMandals];
      setDemoMandals(nextMandals);
      window.localStorage.setItem(DEMO_MANDALS_KEY, JSON.stringify(nextMandals));
      event.currentTarget.reset();
      setNotice(`${newMandal.name} added to owner dashboard.`);
      return;
    }

    const nextMandals = [newMandal, ...demoMandals];
    setDemoMandals(nextMandals);
    window.localStorage.setItem(DEMO_MANDALS_KEY, JSON.stringify(nextMandals));
    event.currentTarget.reset();
    setNotice(`${newMandal.name} added to the onboarding demo list.`);
  }

  async function createCustomField(label: string, required = true) {
    if (!session || !mandalId || !festivalId || !label.trim()) return;
    setBusy(true);
    try {
      await apiRequest(
        `/mandals/${mandalId}/festivals/${festivalId}/custom-fields`,
        {
          body: JSON.stringify({
            dashboardFilter: true,
            label: label.trim(),
            printOnSlip: true,
            required,
            sortOrder: (activeForm?.customFields.length ?? 0) + 1,
            type: 'TEXT',
          }),
          method: 'POST',
        },
        session,
      );
      await loadWorkspace(session);
      setNotice(`${label} field added to the live template form.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not add field.');
    } finally {
      setBusy(false);
    }
  }

  async function generateSlip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    const form = new FormData(event.currentTarget);
    const customData = Object.fromEntries(
      (activeForm?.customFields ?? []).map((field) => [
        field.key,
        String(form.get(`custom_${field.key}`) || ''),
      ]),
    );
    setBusy(true);
    try {
      const slip = await apiRequest<Slip>(
        '/vargani/slips',
        {
          body: JSON.stringify({
            amount: Number(form.get('amount')),
            areaName: String(form.get('areaName')),
            contributorAddress: String(form.get('contributorAddress')),
            contributorName: String(form.get('contributorName')),
            contributorPhone: String(form.get('contributorPhone')),
            customData,
            idempotencyKey: crypto.randomUUID(),
            paymentMode: String(form.get('paymentMode')) as PaymentMode,
            shopName: String(form.get('shopName')),
          }),
          method: 'POST',
        },
        session,
      );
      setSlips((current) => [slip, ...current]);
      setSelectedSlip(slip);
      setActiveScreen('slips');
      event.currentTarget.reset();
      await loadWorkspace(session);
      setNotice(`Slip ${slip.slipNumber} generated successfully.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not generate slip.');
    } finally {
      setBusy(false);
    }
  }

  const receiptUrl = selectedSlip ? `${API_BASE_URL}/vargani/slips/${selectedSlip.id}/receipt.html` : '';

  if (session?.user.role === 'MEMBER') {
    return (
      <MemberCollectorApp
        activeForm={activeForm}
        busy={busy}
        modalOpen={collectorModalOpen}
        notice={notice}
        onGenerate={generateSlip}
        onLogout={logout}
        onModalChange={setCollectorModalOpen}
        receiptUrl={receiptUrl}
        selectedSlip={selectedSlip}
        session={session}
        setSelectedSlip={setSelectedSlip}
        slips={slips}
      />
    );
  }

  if (!session) {
    return <LoginPanel onSubmit={login} busy={busy} notice={notice} />;
  }

  if (session.user.role === 'SUPER_ADMIN') {
    return (
      <SuperAdminApp
        demoMandals={demoMandals}
        notice={notice}
        onCreateMandal={createMandal}
        onLogout={logout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        session={session}
        templatePreview={templatePreview}
        onPreviewChange={setTemplatePreview}
      />
    );
  }

  return (
    <main className={`shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="mobile-menu-toggle" onClick={() => setSidebarOpen((open) => !open)} type="button">
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      {sidebarOpen && <button aria-label="Close menu" className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} type="button" />}
      <aside className="sidebar">
        <div className="brand">
          <span>DV</span>
          <div>
            <strong>Digital Vargani</strong>
            <small>Festival Collection OS</small>
          </div>
        </div>

        <nav>
          {navItems.map((item) => (
            <button
              className={activeScreen === item.id ? 'active' : ''}
              key={item.id}
              onClick={() => {
                setActiveScreen(item.id);
                setSidebarOpen(false);
              }}
              type="button"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <span>{session.user.name.charAt(0)}</span>
            <div>
              <strong>{session.user.name}</strong>
              <small>{session.user.role.replaceAll('_', ' ')}</small>
            </div>
          </div>
          <button className="logout" onClick={() => { setSidebarOpen(false); logout(); }} type="button">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <section className="content">
        <AdminTopbar session={session} />
        <header className="page-header">
          <div>
            <h1>{screenTitle(activeScreen)}</h1>
            <p>{screenSubtitle(activeScreen)}</p>
          </div>
          <div className="header-actions">
            <button disabled={busy} onClick={() => loadWorkspace()} type="button">
              <RefreshCw size={18} />
              Refresh
            </button>
            <a className={receiptUrl ? 'primary' : 'primary disabled'} href={receiptUrl || '#'} target="_blank">
              <Printer size={18} />
              Open Receipt
            </a>
          </div>
        </header>

        <div className={`notice ${busy ? 'busy' : ''}`}>{busy ? 'Working...' : notice}</div>

        <>
          {activeScreen === 'dashboard' && (
            <Dashboard
              groups={groups}
              members={members}
              report={report}
              slips={slips}
              templates={templates}
              totalCollection={totalCollection}
            />
          )}
          {activeScreen === 'mandals' && (
            <MandalsView
              activeForm={activeForm}
              demoMandals={demoMandals}
              groups={groups}
              members={members}
              onCreateMandal={createMandal}
              report={report}
              templates={templates}
            />
          )}
          {activeScreen === 'members' && (
            <MembersView groups={groups} members={members} onCreateMember={createMember} />
          )}
          {activeScreen === 'template' && (
            <TemplateView
              activeForm={activeForm}
              activeTemplate={activeTemplate}
              latestTemplateVersion={latestTemplateVersion}
              onAddField={createCustomField}
              onPreviewChange={setTemplatePreview}
              templatePreview={templatePreview}
            />
          )}
          {activeScreen === 'generate' && (
            <GenerateView
              activeForm={activeForm}
              busy={busy}
              onGenerate={generateSlip}
              templatePreview={templatePreview}
            />
          )}
          {activeScreen === 'slips' && (
            <SlipsView
              query={query}
              receiptUrl={receiptUrl}
              selectedSlip={selectedSlip}
              setQuery={setQuery}
              setSelectedSlip={setSelectedSlip}
              slips={filteredSlips}
            />
          )}
        </>
      </section>
    </main>
  );
}

function AdminTopbar({ session }: { session: AuthSession }) {
  return (
    <div className="app-topbar">
      <strong>Digital Vargani</strong>
      <div className="top-search">
        <Search size={18} />
        <span>Search</span>
        <kbd>Ctrl K</kbd>
      </div>
      <div className="join-code">
        JOIN CODE <strong>VARGANI2026</strong>
        <Copy size={16} />
      </div>
      <button type="button">English</button>
      <div className="top-user">
        <span>{session.user.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
        <div>
          <strong>{session.user.name}</strong>
          <small>{session.user.role.replaceAll('_', ' ')}</small>
        </div>
      </div>
    </div>
  );
}

function SuperAdminApp({
  demoMandals,
  notice,
  onCreateMandal,
  onLogout,
  onPreviewChange,
  session,
  setSidebarOpen,
  sidebarOpen,
  templatePreview,
}: {
  demoMandals: DemoMandal[];
  notice: string;
  onCreateMandal: (event: FormEvent<HTMLFormElement>) => void;
  onLogout: () => void;
  onPreviewChange: (url: string) => void;
  session: AuthSession;
  setSidebarOpen: (open: boolean | ((current: boolean) => boolean)) => void;
  sidebarOpen: boolean;
  templatePreview: string;
}) {
  const seedMandal: DemoMandal = {
    additionalMembers: 'Secretary, Treasurer, Decorator Lead',
    address: 'Prathama Building, S.R.P.F. Gate No. 1, Ramtekdi, Pune',
    adhyakshName: 'Akhilnayak Adhyaksh',
    adminEmail: 'admin@akhilnayak.local',
    adminPassword: DEMO_PASSWORD,
    city: 'Pune',
    contactEmail: 'contact@akhilnayak.local',
    contactPhone: '+91 9890978952',
    khajindarName: 'Akhilnayak Khajindar',
    locality: 'Ramtekdi',
    memberCount: '7',
    name: 'Akhilnayak Mitra Mandal',
  };
  const mandals = demoMandals.length ? demoMandals : [seedMandal];
  const [ownerScreen, setOwnerScreen] = useState<OwnerScreen>('dashboard');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [detailTab, setDetailTab] = useState<OwnerMandalTab>('overview');
  const [addMandalOpen, setAddMandalOpen] = useState(false);
  const [managedIndex, setManagedIndex] = useState<number | null>(null);
  const [ownerQuery, setOwnerQuery] = useState('');
  const [mandalLogins, setMandalLogins] = useState<Record<string, Array<{ role: string; username: string; password: string }>>>({});
  const selectedMandal = mandals[Math.min(selectedIndex, mandals.length - 1)] ?? seedMandal;
  const selectedKey = selectedMandal.name;
  const extraLogins = mandalLogins[selectedKey] ?? [];
  const totalMembers = mandals.reduce((sum, mandal) => sum + Number(mandal.memberCount || 0), 0);
  const totalSlipsGenerated = 0;
  const filteredMandals = mandals
    .map((mandal, index) => ({ index, mandal }))
    .filter(({ mandal }) => {
      const query = ownerQuery.trim().toLowerCase();
      if (!query) return true;
      return [mandal.name, mandal.address, mandal.locality, mandal.city, mandal.contactEmail]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });

  function openAddMandal() {
    setOwnerScreen('mandals');
    setManagedIndex(null);
    setAddMandalOpen(true);
    setSidebarOpen(false);
  }

  function openMandal(index: number) {
    setSelectedIndex(index);
    setManagedIndex(index);
    setOwnerScreen('mandals');
    setDetailTab('overview');
    setAddMandalOpen(false);
    setSidebarOpen(false);
  }

  function createLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextLogin = {
      password: String(form.get('password') || DEMO_PASSWORD),
      role: String(form.get('role') || 'Khajindar'),
      username: String(form.get('username') || ''),
    };
    setMandalLogins((current) => ({
      ...current,
      [selectedKey]: [nextLogin, ...(current[selectedKey] ?? [])],
    }));
    event.currentTarget.reset();
  }

  return (
    <main className={`shell owner-shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="mobile-menu-toggle" onClick={() => setSidebarOpen((open) => !open)} type="button">
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      {sidebarOpen && <button aria-label="Close menu" className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} type="button" />}
      <aside className="sidebar">
        <div className="brand">
          <span>DV</span>
          <div>
            <strong>Digital Vargani</strong>
            <small>Super Admin Console</small>
          </div>
        </div>
        <nav>
          <button className={ownerScreen === 'dashboard' ? 'active' : ''} onClick={() => { setOwnerScreen('dashboard'); setManagedIndex(null); setSidebarOpen(false); }} type="button">
            <LayoutDashboard size={19} />Dashboard
          </button>
          <button className={ownerScreen === 'mandals' ? 'active' : ''} onClick={() => { setOwnerScreen('mandals'); setManagedIndex(null); setSidebarOpen(false); }} type="button">
            <Building2 size={19} />Mandals
          </button>
        </nav>
        <div className="sidebar-footer">
          <div className="user-chip">
            <span>O</span>
            <div>
              <strong>{session.user.name}</strong>
              <small>SUPER ADMIN</small>
            </div>
          </div>
          <button className="logout" onClick={() => { setSidebarOpen(false); onLogout(); }} type="button"><LogOut size={18} />Logout</button>
        </div>
      </aside>

      <section className="content">
        <AdminTopbar session={session} />
        <header className="page-header">
          <div>
            <h1>{ownerScreen === 'dashboard' ? 'Dashboard' : 'Mandals'}</h1>
            <p>{ownerScreen === 'dashboard' ? 'Track all onboarded mandals and software operations.' : 'Add mandals and manage each client account.'}</p>
          </div>
          <div className="header-actions">
            <button onClick={openAddMandal} type="button"><Plus size={18} />Add Mandal</button>
          </div>
        </header>
        <div className="notice">{notice}</div>

        {ownerScreen === 'dashboard' && (
          <>
            <section className="stats-grid compact owner-stat-grid">
              <Stat icon={<Building2 />} label="Total Mandals" note="Onboarded client mandals" value={String(mandals.length)} />
              <Stat icon={<UsersRound />} label="Total Members" note="Across all mandals" value={String(totalMembers)} />
              <Stat icon={<FileText />} label="Slips Generated" note="Live receipt records" value={String(totalSlipsGenerated)} />
            </section>
            <section className="owner-list-head">
              <div>
                <h2>Mandals</h2>
                <p>Each block represents one mandal. Open Manage to set logins and templates.</p>
              </div>
              <button className="primary" onClick={openAddMandal} type="button"><Plus size={18} />Add Mandal</button>
            </section>
            <section className="owner-toolbar">
              <div className="search-input">
                <Search size={20} />
                <input onChange={(event) => setOwnerQuery(event.target.value)} placeholder="Search mandals by name, area, email..." value={ownerQuery} />
              </div>
              <span>{filteredMandals.length} of {mandals.length} mandals</span>
            </section>
            <MandalCardGrid items={filteredMandals} onManage={openMandal} />
          </>
        )}

        {ownerScreen === 'mandals' && managedIndex === null && (
          <>
            <section className="stats-grid compact owner-stat-grid">
              <Stat icon={<Building2 />} label="Total Mandals" note="Onboarded" value={String(mandals.length)} />
              <Stat icon={<UsersRound />} label="Total Members" note="Declared collectors" value={String(totalMembers)} />
              <Stat icon={<ReceiptText />} label="Slips Generated" note="Across mandals" value={String(totalSlipsGenerated)} />
            </section>
            {addMandalOpen && (
              <form className="card form-grid owner-add-panel" onSubmit={(event) => { onCreateMandal(event); setAddMandalOpen(false); }}>
                <div className="panel-title full">
                  <Plus size={22} />
                  <div>
                    <strong>Add Mandal</strong>
                    <span>Mandal name is required. Address, logo, contacts and member count are optional.</span>
                  </div>
                  <button className="ghost-button" onClick={() => setAddMandalOpen(false)} type="button">Close</button>
                </div>
                <label className="full">Mandal Name *<input name="name" required placeholder="Rahul Mitra Mandal" /></label>
                <label>Address<input name="address" placeholder="Full mandal address" /></label>
                <label>Locality<input name="locality" placeholder="Dapodi, Pune" /></label>
                <label>City<input name="city" defaultValue="Pune" /></label>
                <label>Phone No.<input name="contactPhone" placeholder="+91..." /></label>
                <label>Contact Email<input name="contactEmail" placeholder="contact@mandal.local" /></label>
                <label>No. of Members<input name="memberCount" inputMode="numeric" placeholder="50" /></label>
                <label className="full">Mandal Logo<input accept="image/*" name="logo" type="file" /></label>
                <button className="primary full" type="submit"><Plus size={18} />Add Mandal</button>
              </form>
            )}
            <section className="owner-toolbar">
              <div className="search-input">
                <Search size={20} />
                <input onChange={(event) => setOwnerQuery(event.target.value)} placeholder="Search mandals by name, area, email..." value={ownerQuery} />
              </div>
              <span>{filteredMandals.length} of {mandals.length} mandals</span>
            </section>
            <MandalCardGrid items={filteredMandals} onManage={openMandal} />
          </>
        )}

        {ownerScreen === 'mandals' && managedIndex !== null && (
          <section className="owner-managed-view">
            <button className="back-link" onClick={() => setManagedIndex(null)} type="button">
              <ArrowLeft size={20} />Back to Mandals
            </button>
            <div className="card owner-detail-card">
              <div className="owner-detail-header">
                <MandalAvatar mandal={selectedMandal} />
                <div>
                  <strong>{selectedMandal.name}</strong>
                  <span>{selectedMandal.address || selectedMandal.locality || 'Address not added'}</span>
                </div>
              </div>
              <div className="detail-tabs">
                <button className={detailTab === 'overview' ? 'active' : ''} onClick={() => setDetailTab('overview')} type="button">Overview</button>
                <button className={detailTab === 'template' ? 'active' : ''} onClick={() => setDetailTab('template')} type="button">Template</button>
              </div>

              {detailTab === 'overview' && (
                <section className="owner-overview">
                  <div className="login-card">
                    <div className="panel-title">
                      <ShieldCheck size={22} />
                      <div>
                        <strong>Adhyaksh Login</strong>
                        <span>Main mandal login to manage their team.</span>
                      </div>
                    </div>
                    <StatusLine label="Login URL" value="digital-vargani-landing-page.vercel.app" />
                    <StatusLine label="Username" value={selectedMandal.adminEmail || `admin@${slugify(selectedMandal.name)}.local`} />
                    <StatusLine label="Password" value={selectedMandal.adminPassword || DEMO_PASSWORD} />
                  </div>
                  <form className="card form-grid" onSubmit={createLogin}>
                    <div className="panel-title full">
                      <Plus size={22} />
                      <div>
                        <strong>Generate More Logins</strong>
                        <span>Khajindar, karyakari, group leader, or member.</span>
                      </div>
                    </div>
                    <label>Role<select name="role"><option>Khajindar</option><option>Karyakari</option><option>Group Leader</option><option>Member</option></select></label>
                    <label>Username<input name="username" required placeholder="khajindar@mandal.local" /></label>
                    <label>Password<input name="password" defaultValue={DEMO_PASSWORD} /></label>
                    <button className="primary" type="submit"><Plus size={18} />Generate Login</button>
                  </form>
                  <div className="table-list">
                    {[{ role: 'Adhyaksh', username: selectedMandal.adminEmail || `admin@${slugify(selectedMandal.name)}.local`, password: selectedMandal.adminPassword || DEMO_PASSWORD }, ...extraLogins].map((login) => (
                      <div className="table-row owner-login-row" key={`${login.role}-${login.username}`}>
                        <span className="avatar small">{login.role.charAt(0)}</span>
                        <strong>{login.role}</strong>
                        <span>{login.username}</span>
                        <em>{login.password}</em>
                        <button type="button"><Copy size={16} />Copy</button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {detailTab === 'template' && (
                <TemplateView
                  activeForm={null}
                  onAddField={() => undefined}
                  onPreviewChange={onPreviewChange}
                  templatePreview={templatePreview}
                />
              )}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function MandalCardGrid({
  items,
  onManage,
}: {
  items: Array<{ index: number; mandal: DemoMandal }>;
  onManage: (index: number) => void;
}) {
  return (
    <section className="mandal-card-grid">
      {items.map(({ index, mandal }) => (
        <article className="owner-client-card" key={`${mandal.name}-${index}`}>
          <div className="mandal-card-topline" />
          <div className="owner-client-main">
            <MandalAvatar mandal={mandal} />
            <div>
              <strong>{mandal.name}</strong>
              <span>{mandal.address || mandal.locality || mandal.city || 'Location not set'}</span>
            </div>
          </div>
          <div className="mandal-card-meta">
            <span>{Number(mandal.memberCount || 0)} members</span>
            <span>{mandal.contactPhone || 'Phone pending'}</span>
            <em>Template Ready</em>
          </div>
          <button onClick={() => onManage(index)} type="button">Manage</button>
        </article>
      ))}
      {!items.length && (
        <div className="empty-card">
          <Building2 size={34} />
          <strong>No mandals found</strong>
          <span>Try another search or add a new mandal.</span>
        </div>
      )}
    </section>
  );
}

function MandalAvatar({ mandal }: { mandal: DemoMandal }) {
  if (mandal.logoUrl) return <img alt="" className="mandal-avatar-img" src={mandal.logoUrl} />;
  return <span className="avatar">{mandal.name.charAt(0).toUpperCase()}</span>;
}

function MemberCollectorApp({
  activeForm,
  busy,
  modalOpen,
  notice,
  onGenerate,
  onLogout,
  onModalChange,
  receiptUrl,
  selectedSlip,
  session,
  setSelectedSlip,
  slips,
}: {
  activeForm: ActiveForm | null;
  busy: boolean;
  modalOpen: boolean;
  notice: string;
  onGenerate: (event: FormEvent<HTMLFormElement>) => void;
  onLogout: () => void;
  onModalChange: (open: boolean) => void;
  receiptUrl: string;
  selectedSlip: Slip | null;
  session: AuthSession;
  setSelectedSlip: (slip: Slip) => void;
  slips: Slip[];
}) {
  const collected = slips.reduce((sum, slip) => sum + Number(slip.amount), 0);
  const paidSlips = slips.length;

  return (
    <main className="member-shell">
      <aside className="member-sidebar">
        <div className="mandal-profile">
          <div className="mandal-logo">DV</div>
          <div>
            <h2>Akhilnayak Mitra Mandal</h2>
            <p>Ramtekdi, Pune</p>
          </div>
        </div>
        <div className="mandal-contact">
          <span>Prathama Building, S.R.P.F. Gate No. 1</span>
          <span>+91 9890978952</span>
        </div>
        <nav className="member-nav">
          <button className="active" type="button">
            <ReceiptText size={20} />
            Vargani Slips
          </button>
        </nav>
        <div className="sidebar-footer">
          <div className="user-chip">
            <span>{session.user.name.charAt(0)}</span>
            <div>
              <strong>{session.user.name}</strong>
              <small>Collection Member</small>
            </div>
          </div>
          <button className="logout" onClick={onLogout} type="button">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <section className="member-content">
        <header className="member-header">
          <div>
            <h1>Vargani Slips</h1>
            <p>{activeForm?.festival.name ?? 'Active Festival'}</p>
          </div>
          <select defaultValue="2026" aria-label="Active year">
            <option value="2026">Year 2026</option>
          </select>
        </header>

        <section className="member-hero">
          <div>
            <h2>Vargani Slips</h2>
            <p>Generate and manage your vargani receipts</p>
          </div>
          <button className="primary" onClick={() => onModalChange(true)} type="button">
            <Plus size={18} />
            New Vargani Entry
          </button>
        </section>

        <div className={`notice ${busy ? 'busy' : ''}`}>{busy ? 'Working...' : notice}</div>

        <section className="member-stats">
          <Stat icon={<ReceiptText />} label="Total Entries" note="Your slips" value={String(slips.length)} />
          <Stat icon={<BadgeIndianRupee />} label="Collected" note={`${paidSlips} paid`} value={money(collected)} />
          <Stat icon={<CheckCircle2 />} label="Paid Slips" note="Generated receipts" value={String(paidSlips)} />
          <Stat icon={<FileText />} label="Pending Slips" note="No slip until paid" value="0" />
        </section>

        <section className="member-table-card">
          <div className="table-toolbar">
            <div className="tab-strip">
              <button className="active" type="button">All ({slips.length})</button>
              <button type="button">Paid ({paidSlips})</button>
              <button type="button">Pending (0)</button>
            </div>
            <div className="search-box"><Search size={18} /><input placeholder="Search by name, shop, location..." /></div>
          </div>
          <div className="member-slip-table">
            <div className="member-slip-head">
              <span>Slip #</span><span>Name / Shop</span><span>Amount</span><span>Mobile</span><span>Status / Mode</span><span>Date</span><span>Actions</span>
            </div>
            {slips.map((slip) => (
              <button
                className={selectedSlip?.id === slip.id ? 'member-slip-row selected' : 'member-slip-row'}
                key={slip.id}
                onClick={() => setSelectedSlip(slip)}
                type="button"
              >
                <strong>{slip.slipNumber}</strong>
                <span>{slip.contributorName}<small>{slip.shopName || slip.areaName || '-'}</small></span>
                <b>{money(Number(slip.amount))}</b>
                <span>{slip.contributorPhone || '-'}</span>
                <em>Paid · {slip.paymentMode}</em>
                <span>{new Date(slip.createdAt).toLocaleDateString('en-IN')}</span>
                <a className={selectedSlip?.id === slip.id && receiptUrl ? '' : 'disabled'} href={receiptUrl || '#'} target="_blank">Slip</a>
              </button>
            ))}
          </div>
        </section>
      </section>

      {modalOpen && (
        <div className="modal-backdrop">
          <form
            className="vargani-modal"
            onSubmit={(event) => {
              onGenerate(event);
              onModalChange(false);
            }}
          >
            <button className="modal-close" onClick={() => onModalChange(false)} type="button">x</button>
            <div className="panel-title">
              <ReceiptText size={22} />
              <div>
                <strong>New Vargani Entry</strong>
                <span>Fill contribution details and generate slip.</span>
              </div>
            </div>
            <label>Name *<input name="contributorName" required placeholder="Enter full name" /></label>
            <label>Shop Name<input name="shopName" placeholder="Enter shop / business name" /></label>
            <label>Amount (Rs.) *<input inputMode="numeric" name="amount" required placeholder="e.g. 1500" /></label>
            <label>Location *<input name="areaName" required placeholder="e.g. Ramtekdi, Pune" /></label>
            <label>Address<textarea name="contributorAddress" placeholder="Full address (optional)" /></label>
            <label>WhatsApp Number<input name="contributorPhone" placeholder="+91 10 digit WhatsApp number" /></label>
            {(activeForm?.customFields ?? []).map((field) => (
              <label key={field.id}>{field.label}<input name={`custom_${field.key}`} required={field.required} /></label>
            ))}
            <label>
              Payment Mode *
              <select name="paymentMode" defaultValue="CASH">
                <option value="CASH">Cash</option>
                <option value="UPI">Online / UPI</option>
                <option value="CHEQUE">Cheque</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
              </select>
            </label>
            <div className="modal-actions">
              <button onClick={() => onModalChange(false)} type="button">Cancel</button>
              <button className="success" disabled={busy} type="submit"><CheckCircle2 size={18} />Confirm & Generate Slip</button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

function LoginPanel({
  busy,
  notice,
  onSubmit,
}: {
  busy: boolean;
  notice: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const [loginType, setLoginType] = useState<'owner' | 'adhyaksh' | 'member'>('owner');
  const isAdhyaksh = loginType === 'adhyaksh';
  const isOwner = loginType === 'owner';

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <div className="auth-brand">
          <span>DV</span>
          <div>
            <strong>Digital Vargani</strong>
            <small>Festival Collection OS</small>
          </div>
        </div>
        <div className="auth-illustration">
          <div className="receipt-card">
            <ReceiptText size={40} />
            <span>Digital Vargani Slip</span>
            <strong>Rs. 2,100</strong>
          </div>
          <div className="auth-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
        <p>Secure, simple, and fast collection for mandal teams.</p>
      </section>

      <section className="auth-form-panel">
        <div className="auth-card">
          <div className="login-toggle two">
            <button className={isAdhyaksh ? 'active' : ''} onClick={() => setLoginType('adhyaksh')} type="button">
              <ShieldCheck size={18} />
              Adhyaksh Login
            </button>
            <button className={loginType === 'member' ? 'active' : ''} onClick={() => setLoginType('member')} type="button">
              <UsersRound size={18} />
              Member Login
            </button>
          </div>

          <form className="login-panel clean" key={loginType} onSubmit={onSubmit}>
            <div className="panel-title">
              {isAdhyaksh ? <ShieldCheck size={24} /> : <LogIn size={24} />}
              <div>
                <strong>{isOwner ? 'Super Admin Login' : isAdhyaksh ? 'Adhyaksh / Main Admin Login' : 'Member Collection Login'}</strong>
                <span>
                  {isOwner
                    ? 'Add mandals, manage client logins, and configure vargani templates.'
                    : isAdhyaksh
                    ? 'Create mandals, manage template and review collections.'
                    : 'Login and start adding new vargani entries.'}
                </span>
              </div>
            </div>
            <label>
              Email / Username
              <input
                name="identifier"
                required
                defaultValue={isOwner ? SUPER_ADMIN_IDENTIFIER : isAdhyaksh ? DEMO_IDENTIFIER : 'amit@akhilnayak.local'}
              />
            </label>
            <label>
              Password
              <input name="password" required type="password" defaultValue={DEMO_PASSWORD} />
            </label>
            <button className="primary" disabled={busy} type="submit">
              <ShieldCheck size={18} />
              {isOwner ? 'Login To Super Admin Console' : isAdhyaksh ? 'Login To Admin Console' : 'Login To Vargani Screen'}
            </button>
          </form>

          <div className={`notice ${busy ? 'busy' : ''}`}>{busy ? 'Working...' : notice}</div>
          <div className="login-help">
            <strong>Do not have login details?</strong>
            <span>Contact your mandal admin to create your member account.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function Dashboard({
  groups,
  members,
  report,
  slips,
  templates,
  totalCollection,
}: {
  groups: Group[];
  members: Member[];
  report: CollectionReport | null;
  slips: Slip[];
  templates: Template[];
  totalCollection: number;
}) {
  return (
    <>
      <section className="command-hero">
        <div>
          <span>Admin Command Center</span>
          <h2>Akhilnayak Mitra Mandal Festival Collection OS</h2>
          <p>Track vargani, member activity, template readiness, and live receipt generation from one focused console.</p>
        </div>
        <div className="hero-actions">
          <button className="primary" type="button"><ReceiptText size={18} />Raise Vargani</button>
          <button type="button"><SlidersHorizontal size={18} />View Reports</button>
        </div>
      </section>
      <section className="stats-grid">
        <Stat icon={<Building2 />} label="Total Mandals" note="Active demo mandal" value="1" />
        <Stat icon={<UsersRound />} label="Total Members" note={`${groups.length} collection groups`} value={String(members.length)} />
        <Stat icon={<ReceiptText />} label="Slips Generated" note="Latest live records" value={String(report?.slipCount ?? slips.length)} />
        <Stat icon={<BadgeIndianRupee />} label="Total Vargani" note="Live Supabase amount" value={money(report?.totalCollection ?? totalCollection)} />
      </section>
      <section className="operations-grid">
        <div className="card">
          <div className="panel-title">
            <CheckCircle2 size={22} />
            <div>
              <strong>Readiness</strong>
              <span>Production services for demo</span>
            </div>
          </div>
          <StatusLine label="Database" value="connected" />
          <StatusLine label="API" value="connected" />
          <StatusLine label="Template" value={templates.length ? 'ready' : 'pending'} />
          <StatusLine label="Login" value="active" />
        </div>
        <div className="card">
          <div className="panel-title">
            <BadgeIndianRupee size={22} />
            <div>
              <strong>Collection By Payment</strong>
              <span>Cash, UPI, cheque split</span>
            </div>
          </div>
          {(report?.byPaymentMode ?? []).slice(0, 5).map((item) => (
            <StatusLine key={item.paymentMode} label={item.paymentMode} value={money(Number(item.totalAmount))} />
          ))}
        </div>
        <div className="card">
          <div className="panel-title">
            <ReceiptText size={22} />
            <div>
              <strong>Recent Slips</strong>
              <span>Generated by mandal members</span>
            </div>
          </div>
          {slips.slice(0, 5).map((slip) => (
            <StatusLine key={slip.id} label={slip.contributorName} value={money(Number(slip.amount))} />
          ))}
        </div>
      </section>
    </>
  );
}

function MandalsView({
  activeForm,
  demoMandals,
  groups,
  members,
  onCreateMandal,
  report,
  templates,
}: {
  activeForm: ActiveForm | null;
  demoMandals: DemoMandal[];
  groups: Group[];
  members: Member[];
  onCreateMandal: (event: FormEvent<HTMLFormElement>) => void;
  report: CollectionReport | null;
  templates: Template[];
}) {
  return (
    <>
      <section className="stats-grid compact">
        <Stat icon={<Building2 />} label="Total Mandals" note="Onboarded" value={String(1 + demoMandals.length)} />
        <Stat icon={<UsersRound />} label="Total Members" note="Collectors" value={String(members.length)} />
        <Stat icon={<ReceiptText />} label="Slips" note="Active festival" value={String(report?.slipCount ?? 0)} />
      </section>
      <section className="mandal-page-grid">
        <form className="card form-grid add-mandal-card" onSubmit={onCreateMandal}>
          <div className="panel-title full">
            <Plus size={22} />
            <div>
              <strong>Add Mandal</strong>
              <span>Onboard mandal name, location, adhyaksh, khajindar and members.</span>
            </div>
          </div>
          <label>Mandal Name<input name="name" required placeholder="Rahul Mitra Mandal" /></label>
          <label>Locality<input name="locality" required placeholder="Hadapsar, Pune" /></label>
          <label>City<input name="city" required defaultValue="Pune" /></label>
          <label>Contact Phone<input name="contactPhone" required placeholder="+919876543210" /></label>
          <label>Adhyaksh Name<input name="adhyakshName" required placeholder="Adhyaksh full name" /></label>
          <label>Khajindar Name<input name="khajindarName" required placeholder="Khajindar full name" /></label>
          <label className="full">Full Address<input name="address" required placeholder="Building, road, area, city" /></label>
          <label className="full">Additional Members<textarea name="additionalMembers" placeholder="Secretary, vice president, decorators, volunteers..." /></label>
          <label>Admin Email<input name="adminEmail" placeholder="admin@mandal.local" /></label>
          <label>Default Password<input name="adminPassword" defaultValue={DEMO_PASSWORD} /></label>
          <button className="primary full" type="submit"><Plus size={18} />Add Mandal</button>
        </form>
        <div className="mandal-grid">
        <article className="mandal-card">
          <div className="avatar">अ</div>
          <div>
            <h3>Akhilnayak Mitra Mandal</h3>
            <p>Prathama Building, S.R.P.F. Gate No. 1, Ramtekdi, Pune</p>
            <div className="chips">
              <span>{members.length} members</span>
              <span>{groups.length} groups</span>
              <span>{templates.length ? 'Template Ready' : 'Template Pending'}</span>
              <span>{activeForm?.festival.name ?? 'Ganpati Festival 2026'}</span>
            </div>
          </div>
          <button type="button">Manage</button>
        </article>
          {demoMandals.map((mandal, index) => (
            <article className="mandal-card" key={`${mandal.name}-${index}`}>
              <div className="avatar">{mandal.name.charAt(0)}</div>
              <div>
                <h3>{mandal.name}</h3>
                <p>{`${mandal.address || mandal.locality}, ${mandal.city}`}</p>
                <div className="chips">
                  <span>{mandal.additionalMembers ? mandal.additionalMembers.split(',').length + 2 : 2} members</span>
                  <span>{mandal.adhyakshName} Adhyaksh</span>
                  <span>{mandal.khajindarName} Khajindar</span>
                  <span>Template Pending</span>
                </div>
              </div>
              <button type="button">Manage</button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function MembersView({
  groups,
  members,
  onCreateMember,
}: {
  groups: Group[];
  members: Member[];
  onCreateMember: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section className="split-grid">
      <form className="card form-grid" onSubmit={onCreateMember}>
        <div className="panel-title full">
          <Plus size={22} />
          <div>
            <strong>Create Member Login</strong>
            <span>Khajindar, group leader, and collection member accounts.</span>
          </div>
        </div>
        <label>Name<input name="name" required placeholder="Rahul Shinde" /></label>
        <label>Email<input name="email" required placeholder="rahul@mandal.local" /></label>
        <label>Phone<input name="phone" placeholder="+919876543210" /></label>
        <label>Password<input name="password" required defaultValue={DEMO_PASSWORD} /></label>
        <label>
          Role
          <select name="role" defaultValue="MEMBER">
            <option value="KHAJINDAR">Khajindar</option>
            <option value="GROUP_LEADER">Group Leader</option>
            <option value="MEMBER">Member</option>
          </select>
        </label>
        <label>
          Group
          <select name="groupId">
            <option value="">No group</option>
            {groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}
          </select>
        </label>
        <label className="full">Area<input name="areaName" placeholder="Ramtekdi Market" /></label>
        <button className="primary full" type="submit"><Plus size={18} />Create Login</button>
      </form>
      <div className="card">
        <div className="panel-title">
          <UsersRound size={22} />
          <div>
            <strong>Members</strong>
            <span>{members.length} active collector logins</span>
          </div>
        </div>
        <div className="table-list">
          {members.length === 0 && (
            <div className="empty-state">
              <UsersRound size={28} />
              <strong>No member logins yet</strong>
              <span>Create collector accounts for khajindar, group leaders, and members.</span>
            </div>
          )}
          {members.map((member) => (
            <div className="table-row" key={member.id}>
              <span className="avatar small">{member.displayName.charAt(0)}</span>
              <strong>{member.displayName}</strong>
              <span>{member.user?.role.replaceAll('_', ' ')}</span>
              <span>{member.group?.name ?? member.areaName ?? 'No group'}</span>
              <em>{member.user?.email ?? member.phone ?? '-'}</em>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplateView({
  activeForm,
  activeTemplate,
  latestTemplateVersion,
  onAddField,
  onPreviewChange,
  templatePreview,
}: {
  activeForm: ActiveForm | null;
  activeTemplate?: Template;
  latestTemplateVersion?: Template['versions'][number];
  onAddField: (label: string, required?: boolean) => void;
  onPreviewChange: (url: string) => void;
  templatePreview: string;
}) {
  type ResizeHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
  type FieldInteraction =
    | { fieldKey: string; origin: TemplatePlacement; startX: number; startY: number; type: 'move' }
    | { fieldKey: string; handle: ResizeHandle; origin: TemplatePlacement; startX: number; startY: number; type: 'resize' };

  const [fieldLabel, setFieldLabel] = useState('');
  const canvasWidth = latestTemplateVersion?.canvasWidth ?? 1328;
  const canvasHeight = latestTemplateVersion?.canvasHeight ?? 800;
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const fieldOptions = useMemo(
    () => [
      { key: 'slipNumber', label: 'Slip No.' },
      { key: 'createdAt', label: 'Date' },
      { key: 'contributorName', label: 'Name' },
      { key: 'contributorAddress', label: 'Address' },
      { key: 'amount', label: 'Amount' },
      { key: 'shopName', label: 'Shop Name' },
      { key: 'contributorPhone', label: 'Mobile No.' },
      { key: 'paymentMode', label: 'Payment Mode' },
      { key: 'areaName', label: 'Area' },
      { key: 'collectorName', label: 'Collector Name' },
      { key: 'donorType', label: 'Donor Type' },
      { key: 'building_name', label: 'Building / Lane' },
      ...(activeForm?.customFields ?? []).map((field) => ({ key: field.key, label: field.label })),
    ],
    [activeForm?.customFields],
  );
  const [activeField, setActiveField] = useState('slipNumber');
  const [interaction, setInteraction] = useState<FieldInteraction | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [contextMenu, setContextMenu] = useState<{ fieldKey: string; x: number; y: number } | null>(null);
  const [placements, setPlacements] = useState<Record<string, TemplatePlacement>>({
    amount: {
      ...defaultPlacement(),
      color: '#111111',
      fontSize: 31,
      fontWeight: 900,
      height: 52,
      textAlign: 'left',
      width: 250,
      x: 720,
      y: 680,
    },
    building_name: {
      ...defaultPlacement(),
      color: '#111111',
      fontSize: 24,
      fontWeight: 700,
      height: 48,
      textAlign: 'left',
      width: 420,
      x: 715,
      y: 623,
    },
    contributorAddress: {
      ...defaultPlacement(),
      color: '#111111',
      fontSize: 27,
      fontWeight: 800,
      height: 70,
      textAlign: 'left',
      textWrap: 'wrap',
      width: 560,
      x: 715,
      y: 574,
    },
    contributorName: {
      ...defaultPlacement(),
      color: '#111111',
      fontSize: 30,
      fontWeight: 900,
      height: 58,
      textAlign: 'left',
      width: 610,
      x: 670,
      y: 515,
    },
    createdAt: {
      ...defaultPlacement(),
      color: '#111111',
      fontSize: 25,
      fontWeight: 800,
      height: 46,
      textAlign: 'center',
      width: 160,
      x: 1115,
      y: 455,
    },
    slipNumber: {
      ...defaultPlacement(),
      color: '#b62028',
      fontSize: 31,
      fontWeight: 900,
      height: 48,
      textAlign: 'left',
      width: 100,
      x: 648,
      y: 445,
    },
  });
  const selectedPlacement = placements[activeField] ?? defaultPlacement();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return;
      if ((event.key === 'Delete' || event.key === 'Backspace') && placements[activeField]) {
        event.preventDefault();
        removePlacement(activeField);
      }
      if (event.key === 'Escape') setContextMenu(null);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeField, placements]);

  function pointFromClient(clientX: number, clientY: number) {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: clamp(Math.round(((clientX - rect.left) / rect.width) * canvasWidth), 0, canvasWidth),
      y: clamp(Math.round(((clientY - rect.top) / rect.height) * canvasHeight), 0, canvasHeight),
    };
  }

  function updatePlacement(fieldKey: string, partial: Partial<TemplatePlacement>) {
    setPlacements((current) => ({
      ...current,
      [fieldKey]: {
        ...defaultPlacement(),
        ...current[fieldKey],
        ...partial,
      },
    }));
  }

  function placeActiveField(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    if (event.target !== event.currentTarget) return;
    if (interaction) return;
    setContextMenu(null);
    const point = pointFromClient(event.clientX, event.clientY);
    const placement = placements[activeField] ?? defaultPlacement();
    updatePlacement(activeField, {
      x: clamp(point.x, 0, canvasWidth - placement.width),
      y: clamp(point.y, 0, canvasHeight - placement.height),
    });
  }

  function handleCanvasPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!interaction) return;
    event.preventDefault();
    const point = pointFromClient(event.clientX, event.clientY);
    const deltaX = point.x - interaction.startX;
    const deltaY = point.y - interaction.startY;
    const origin = interaction.origin;
    if (interaction.type === 'move') {
      updatePlacement(interaction.fieldKey, {
        x: clamp(origin.x + deltaX, 0, canvasWidth - origin.width),
        y: clamp(origin.y + deltaY, 0, canvasHeight - origin.height),
      });
      return;
    }

    let nextX = origin.x;
    let nextY = origin.y;
    let nextWidth = origin.width;
    let nextHeight = origin.height;
    if (interaction.handle.includes('e')) nextWidth = origin.width + deltaX;
    if (interaction.handle.includes('s')) nextHeight = origin.height + deltaY;
    if (interaction.handle.includes('w')) {
      nextX = origin.x + deltaX;
      nextWidth = origin.width - deltaX;
    }
    if (interaction.handle.includes('n')) {
      nextY = origin.y + deltaY;
      nextHeight = origin.height - deltaY;
    }
    nextWidth = clamp(nextWidth, 48, canvasWidth - nextX);
    nextHeight = clamp(nextHeight, 24, canvasHeight - nextY);
    nextX = clamp(nextX, 0, canvasWidth - nextWidth);
    nextY = clamp(nextY, 0, canvasHeight - nextHeight);
    updatePlacement(interaction.fieldKey, {
      height: nextHeight,
      width: nextWidth,
      x: nextX,
      y: nextY,
    });
  }

  function startMove(fieldKey: string, event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const point = pointFromClient(event.clientX, event.clientY);
    setActiveField(fieldKey);
    setContextMenu(null);
    setInteraction({
      fieldKey,
      origin: placements[fieldKey] ?? defaultPlacement(),
      startX: point.x,
      startY: point.y,
      type: 'move',
    });
  }

  function startResize(fieldKey: string, handle: ResizeHandle, event: PointerEvent<HTMLSpanElement>) {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const point = pointFromClient(event.clientX, event.clientY);
    setActiveField(fieldKey);
    setContextMenu(null);
    setInteraction({
      fieldKey,
      handle,
      origin: placements[fieldKey] ?? defaultPlacement(),
      startX: point.x,
      startY: point.y,
      type: 'resize',
    });
  }

  function removePlacement(fieldKey = activeField) {
    setPlacements((current) => {
      const next = { ...current };
      delete next[fieldKey];
      return next;
    });
    setContextMenu(null);
  }

  function duplicatePlacement(fieldKey = activeField) {
    const source = placements[fieldKey];
    if (!source) return;
    const duplicateKey = `${fieldKey}_copy_${Date.now()}`;
    setPlacements((current) => ({
      ...current,
      [duplicateKey]: {
        ...source,
        x: source.x + 24,
        y: source.y + 24,
      },
    }));
    setActiveField(duplicateKey);
    setContextMenu(null);
  }

  function bringPlacementForward(fieldKey = activeField) {
    const source = placements[fieldKey];
    if (!source) return;
    setPlacements((current) => {
      const next = { ...current };
      delete next[fieldKey];
      return { ...next, [fieldKey]: source };
    });
    setContextMenu(null);
  }

  function centerFieldOnSlip(fieldKey = activeField) {
    const source = placements[fieldKey] ?? defaultPlacement();
    updatePlacement(fieldKey, { x: Math.round((canvasWidth - source.width) / 2) });
    setContextMenu(null);
  }

  function fullWidthCenterField(fieldKey = activeField) {
    updatePlacement(fieldKey, {
      textAlign: 'center',
      width: canvasWidth - 80,
      x: 40,
    });
    setContextMenu(null);
  }

  function contextAction(fieldKey: string, action: string) {
    const source = placements[fieldKey] ?? defaultPlacement();
    const actions: Record<string, () => void> = {
      black: () => updatePlacement(fieldKey, { color: '#111111' }),
      bold: () => updatePlacement(fieldKey, { fontWeight: source.fontWeight >= 800 ? 500 : 900 }),
      border: () => updatePlacement(fieldKey, { borderColor: source.borderColor === 'transparent' ? '#ff4f0a' : 'transparent' }),
      capitalize: () => updatePlacement(fieldKey, { textTransform: source.textTransform === 'capitalize' ? 'none' : 'capitalize' }),
      center: () => updatePlacement(fieldKey, { textAlign: 'center' }),
      centerField: () => centerFieldOnSlip(fieldKey),
      delete: () => removePlacement(fieldKey),
      duplicate: () => duplicatePlacement(fieldKey),
      fontArial: () => updatePlacement(fieldKey, { fontFamily: 'Arial, sans-serif' }),
      fontDevanagari: () => updatePlacement(fieldKey, { fontFamily: '"Noto Sans Devanagari", Arial, sans-serif' }),
      fontGeorgia: () => updatePlacement(fieldKey, { fontFamily: 'Georgia, serif' }),
      fullWidth: () => fullWidthCenterField(fieldKey),
      grid: () => setShowGrid((value) => !value),
      italic: () => updatePlacement(fieldKey, { fontStyle: source.fontStyle === 'italic' ? 'normal' : 'italic' }),
      larger: () => updatePlacement(fieldKey, { fontSize: clamp(source.fontSize + 2, 8, 96) }),
      left: () => updatePlacement(fieldKey, { textAlign: 'left' }),
      orange: () => updatePlacement(fieldKey, { color: '#ff4f0a' }),
      red: () => updatePlacement(fieldKey, { color: '#b62028' }),
      resetRotate: () => updatePlacement(fieldKey, { rotate: 0 }),
      right: () => updatePlacement(fieldKey, { textAlign: 'right' }),
      rotateLeft: () => updatePlacement(fieldKey, { rotate: source.rotate - 5 }),
      rotateRight: () => updatePlacement(fieldKey, { rotate: source.rotate + 5 }),
      shadow: () => updatePlacement(fieldKey, { shadow: !source.shadow }),
      shrink: () => updatePlacement(fieldKey, { fontSize: clamp(source.fontSize - 2, 8, 96), textWrap: 'shrink' }),
      smaller: () => updatePlacement(fieldKey, { fontSize: clamp(source.fontSize - 2, 8, 96) }),
      splitHold: () => updatePlacement(fieldKey, { height: Math.max(source.height, source.fontSize * 2.7), textWrap: 'wrap' }),
      transparentBg: () => updatePlacement(fieldKey, { backgroundColor: 'transparent' }),
      underline: () => updatePlacement(fieldKey, { textDecoration: source.textDecoration === 'underline' ? 'none' : 'underline' }),
      uppercase: () => updatePlacement(fieldKey, { textTransform: source.textTransform === 'uppercase' ? 'none' : 'uppercase' }),
      whiteBg: () => updatePlacement(fieldKey, { backgroundColor: 'rgba(255, 255, 255, 0.78)' }),
      wrap: () => updatePlacement(fieldKey, { textWrap: source.textWrap === 'wrap' ? 'single' : 'wrap' }),
    };
    actions[action]?.();
  }

  return (
    <section className="template-grid">
      <div className="card template-stage">
        <div className="panel-title">
          <FileText size={22} />
          <div>
            <strong>{activeTemplate?.name ?? 'Akhilnayak Vargani Template'}</strong>
            <span>
              {latestTemplateVersion
                ? `${latestTemplateVersion.canvasWidth} x ${latestTemplateVersion.canvasHeight}px active`
                : 'Upload and map fields over the slip'}
            </span>
          </div>
        </div>
        <div className="toolbar">
          <label className="upload-button">
            <Upload size={18} />
            Upload Template
            <input
              accept="image/*"
              type="file"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onPreviewChange(URL.createObjectURL(file));
              }}
            />
          </label>
          <button type="button"><SlidersHorizontal size={18} />Slip Size</button>
          <button type="button"><CheckCircle2 size={18} />Save Template</button>
        </div>
        <div className="template-canvas">
          <div
            className={`template-map-canvas ${showGrid ? 'show-grid' : ''}`}
            ref={canvasRef}
            onPointerDown={placeActiveField}
            onPointerMove={handleCanvasPointerMove}
            onPointerUp={() => setInteraction(null)}
            onPointerCancel={() => setInteraction(null)}
            onContextMenu={(event) => {
              event.preventDefault();
              setContextMenu(null);
            }}
            style={{ aspectRatio: `${canvasWidth} / ${canvasHeight}` }}
          >
            <img alt="Akhilnayak Mitra Mandal Vargani slip template" src={templatePreview} />
            {Object.entries(placements).map(([key, placement]) => {
              const field = fieldOptions.find((item) => item.key === key);
              const sampleValue = sampleFieldValue(key, field?.label ?? key);
              const fontSize =
                placement.textWrap === 'shrink' && sampleValue.length > 18
                  ? Math.max(10, placement.fontSize - Math.ceil((sampleValue.length - 18) / 3))
                  : placement.fontSize;
              return (
                <div
                  className={`field-anchor ${activeField === key ? 'active' : ''}`}
                  key={key}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setActiveField(key);
                    setContextMenu({ fieldKey: key, x: event.clientX, y: event.clientY });
                  }}
                  onPointerDown={(event) => startMove(key, event)}
                  role="button"
                  style={{
                    alignItems: placement.textWrap === 'single' ? 'center' : 'flex-start',
                    backgroundColor: placement.backgroundColor,
                    borderColor: placement.borderColor,
                    borderRadius: `${placement.borderRadius}px`,
                    color: placement.color,
                    fontFamily: placement.fontFamily,
                    fontSize: `${fontSize}px`,
                    fontStyle: placement.fontStyle,
                    fontWeight: placement.fontWeight,
                    height: `${(placement.height / canvasHeight) * 100}%`,
                    left: `${(placement.x / canvasWidth) * 100}%`,
                    letterSpacing: `${placement.letterSpacing}px`,
                    lineHeight: placement.lineHeight,
                    opacity: placement.opacity,
                    padding: `${placement.padding}px`,
                    textDecoration: placement.textDecoration,
                    textAlign: placement.textAlign,
                    textShadow: placement.shadow ? '0 2px 4px rgba(0, 0, 0, 0.35)' : 'none',
                    textTransform: placement.textTransform,
                    top: `${(placement.y / canvasHeight) * 100}%`,
                    transform: `rotate(${placement.rotate}deg)`,
                    width: `${(placement.width / canvasWidth) * 100}%`,
                    whiteSpace: placement.textWrap === 'single' ? 'nowrap' : 'normal',
                    wordBreak: placement.textWrap === 'single' ? 'normal' : 'break-word',
                  }}
                  tabIndex={0}
                >
                  <span>{sampleValue}</span>
                  {activeField === key && (
                    <>
                      {(['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'] as ResizeHandle[]).map((handle) => (
                        <span
                          aria-hidden="true"
                          className={`resize-handle handle-${handle}`}
                          key={handle}
                          onPointerDown={(event) => startResize(key, handle, event)}
                        />
                      ))}
                    </>
                  )}
                </div>
              );
            })}
            {contextMenu && (
              <div
                className="field-context-menu"
                style={{
                  left: `${contextMenu.x}px`,
                  top: `${contextMenu.y}px`,
                }}
              >
                <div className="context-menu-title">Text Properties</div>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'larger')} type="button">Increase Text Size</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'smaller')} type="button">Reduce Text Size</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'bold')} type="button">Bold / Normal</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'italic')} type="button">Italic</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'underline')} type="button">Underline</button>
                <div className="context-menu-title">Background Properties</div>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'transparentBg')} type="button">Transparent Background</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'whiteBg')} type="button">White Background</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'border')} type="button">Toggle Border</button>
                <div className="context-menu-title">Alignments</div>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'centerField')} type="button">Center Field on Slip</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'fullWidth')} type="button">Full Width + Center Text</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'grid')} type="button">Grid View</button>
                <div className="context-menu-title">Color / Rotate / Font</div>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'orange')} type="button">Color: Orange</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'red')} type="button">Color: Receipt Red</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'black')} type="button">Color: Black</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'rotateLeft')} type="button">Rotate -5 degrees</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'rotateRight')} type="button">Rotate +5 degrees</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'resetRotate')} type="button">Reset Rotate</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'fontArial')} type="button">Font: Arial</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'fontDevanagari')} type="button">Font: Devanagari</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'fontGeorgia')} type="button">Font: Serif</button>
                <div className="context-menu-title">Size / Wrap</div>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'splitHold')} type="button">Split Hold Size</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'wrap')} type="button">WordWrap Text</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'shrink')} type="button">WordWrap / Reduce Font Size</button>
                <button onClick={() => contextAction(contextMenu.fieldKey, 'shadow')} type="button">Shadow</button>
                <div className="context-menu-title">Layer</div>
                <button onClick={() => removePlacement(contextMenu.fieldKey)} type="button">Delete Field</button>
                <button onClick={() => duplicatePlacement(contextMenu.fieldKey)} type="button">Duplicate Field</button>
                <button onClick={() => bringPlacementForward(contextMenu.fieldKey)} type="button">Bring To Front</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <aside className="card settings-panel">
        <div className="template-settings">
          <strong>Slip Settings</strong>
          <label>
            Template Size
            <select defaultValue="landscape">
              <option value="landscape">Landscape Vargani Slip</option>
              <option value="portrait">Portrait Receipt</option>
              <option value="custom">Custom Size</option>
            </select>
          </label>
          <div className="mini-grid">
            <label>Width<input defaultValue="1328" /></label>
            <label>Height<input defaultValue="800" /></label>
          </div>
          <div className="mini-grid">
            <label>DPI<select defaultValue="300"><option value="300">300 DPI Standard</option><option value="150">150 DPI Preview</option></select></label>
            <label>Bleed (mm)<input defaultValue="1" /></label>
          </div>
        </div>
        <div className="panel-title">
          <Settings size={22} />
          <div>
            <strong>Field Mapping</strong>
            <span>Place boxes exactly on printed slip labels.</span>
          </div>
        </div>
        <div className="field-pills">
          {fieldOptions.map((field) => (
            <button
              className={activeField === field.key ? 'active' : ''}
              key={field.key}
              onClick={() => {
                setActiveField(field.key);
                updatePlacement(field.key, placements[field.key] ?? defaultPlacement());
              }}
              type="button"
            >
              + {field.label}
            </button>
          ))}
        </div>
        <div className="template-settings">
          <strong>Selected Field</strong>
          <div className="mini-grid">
            <label>X<input type="number" value={selectedPlacement.x} onChange={(event) => updatePlacement(activeField, { x: Number(event.target.value) })} /></label>
            <label>Y<input type="number" value={selectedPlacement.y} onChange={(event) => updatePlacement(activeField, { y: Number(event.target.value) })} /></label>
            <label>Width<input type="number" value={selectedPlacement.width} onChange={(event) => updatePlacement(activeField, { width: Number(event.target.value) })} /></label>
            <label>Height<input type="number" value={selectedPlacement.height} onChange={(event) => updatePlacement(activeField, { height: Number(event.target.value) })} /></label>
          </div>
          <div className="mini-grid">
            <label>Font Size<input type="number" value={selectedPlacement.fontSize} onChange={(event) => updatePlacement(activeField, { fontSize: Number(event.target.value) })} /></label>
            <label>Align<select value={selectedPlacement.textAlign} onChange={(event) => updatePlacement(activeField, { textAlign: event.target.value as TextAlign })}><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></label>
          </div>
          <label>Font Family<select value={selectedPlacement.fontFamily} onChange={(event) => updatePlacement(activeField, { fontFamily: event.target.value })}><option value="Arial, sans-serif">Arial</option><option value='"Noto Sans Devanagari", Arial, sans-serif'>Noto Sans Devanagari</option><option value="Inter, Arial, sans-serif">Inter</option><option value="Georgia, serif">Serif</option><option value='"Arial Narrow", Arial, sans-serif'>Arial Narrow</option></select></label>
          <div className="mini-grid">
            <label>Weight<select value={selectedPlacement.fontWeight} onChange={(event) => updatePlacement(activeField, { fontWeight: Number(event.target.value) })}><option value={400}>Regular</option><option value={700}>Bold</option><option value={800}>Extra Bold</option><option value={900}>Black</option></select></label>
            <label>Wrap<select value={selectedPlacement.textWrap} onChange={(event) => updatePlacement(activeField, { textWrap: event.target.value as TextWrapMode })}><option value="single">Single line</option><option value="wrap">Word wrap</option><option value="shrink">Auto reduce</option></select></label>
          </div>
          <div className="field-style-buttons">
            <button className={selectedPlacement.fontWeight >= 800 ? 'active' : ''} onClick={() => contextAction(activeField, 'bold')} type="button">B</button>
            <button className={selectedPlacement.fontStyle === 'italic' ? 'active' : ''} onClick={() => contextAction(activeField, 'italic')} type="button">I</button>
            <button className={selectedPlacement.textDecoration === 'underline' ? 'active' : ''} onClick={() => contextAction(activeField, 'underline')} type="button">U</button>
            <button className={selectedPlacement.shadow ? 'active' : ''} onClick={() => contextAction(activeField, 'shadow')} type="button">Shadow</button>
          </div>
          <div className="mini-grid">
            <label>Text Color<input type="color" value={selectedPlacement.color} onChange={(event) => updatePlacement(activeField, { color: event.target.value })} /></label>
            <label>Background<input type="color" value={toColorInput(selectedPlacement.backgroundColor)} onChange={(event) => updatePlacement(activeField, { backgroundColor: event.target.value })} /></label>
          </div>
          <div className="mini-grid">
            <label>Border Color<input type="color" value={toColorInput(selectedPlacement.borderColor)} onChange={(event) => updatePlacement(activeField, { borderColor: event.target.value })} /></label>
            <label>Radius<input type="number" value={selectedPlacement.borderRadius} onChange={(event) => updatePlacement(activeField, { borderRadius: Number(event.target.value) })} /></label>
          </div>
          <div className="mini-grid">
            <label>Line Height<input step="0.05" type="number" value={selectedPlacement.lineHeight} onChange={(event) => updatePlacement(activeField, { lineHeight: Number(event.target.value) })} /></label>
            <label>Letter Space<input type="number" value={selectedPlacement.letterSpacing} onChange={(event) => updatePlacement(activeField, { letterSpacing: Number(event.target.value) })} /></label>
            <label>Rotate<input type="number" value={selectedPlacement.rotate} onChange={(event) => updatePlacement(activeField, { rotate: Number(event.target.value) })} /></label>
            <label>Padding<input type="number" value={selectedPlacement.padding} onChange={(event) => updatePlacement(activeField, { padding: Number(event.target.value) })} /></label>
          </div>
          <div className="template-action-row wide">
            <button disabled={!placements[activeField]} onClick={() => centerFieldOnSlip(activeField)} type="button">Center Field on Slip</button>
            <button disabled={!placements[activeField]} onClick={() => fullWidthCenterField(activeField)} type="button">Full Width + Center Text</button>
          </div>
          <div className="template-action-row">
            <button disabled={!placements[activeField]} onClick={() => removePlacement(activeField)} type="button">Delete Field</button>
            <button disabled={!placements[activeField]} onClick={() => duplicatePlacement(activeField)} type="button">Duplicate</button>
          </div>
        </div>
        <div className="template-settings layers-panel">
          <strong>Layers ({Object.keys(placements).length})</strong>
          {Object.entries(placements).reverse().map(([key]) => {
            const field = fieldOptions.find((item) => item.key === key);
            return (
              <div className={activeField === key ? 'layer-row active' : 'layer-row'} key={key}>
                <button onClick={() => setActiveField(key)} type="button">{field?.label ?? key.replace(/_copy_\d+$/, ' Copy')}</button>
                <button onClick={() => removePlacement(key)} type="button">Delete</button>
              </div>
            );
          })}
        </div>
        <div className="add-field">
          <strong>Add Custom Field</strong>
          <input value={fieldLabel} onChange={(event) => setFieldLabel(event.target.value)} placeholder="e.g. Building / Lane" />
          <button onClick={() => { void onAddField(fieldLabel, true); setFieldLabel(''); }} type="button">
            <Plus size={18} />Add
          </button>
        </div>
      </aside>
    </section>
  );
}

function GenerateView({
  activeForm,
  busy,
  onGenerate,
  templatePreview,
}: {
  activeForm: ActiveForm | null;
  busy: boolean;
  onGenerate: (event: FormEvent<HTMLFormElement>) => void;
  templatePreview: string;
}) {
  return (
    <section className="split-grid">
      <form className="card form-grid" onSubmit={onGenerate}>
        <div className="panel-title full">
          <ReceiptText size={22} />
          <div>
            <strong>Generate Vargani Slip</strong>
            <span>Members fill this on mobile while collecting vargani.</span>
          </div>
        </div>
        <label>Contributor Name<input disabled={busy} name="contributorName" required placeholder="Donor or shop owner" /></label>
        <label>Shop / Company<input disabled={busy} name="shopName" placeholder="Optional" /></label>
        <label>Mobile<input disabled={busy} name="contributorPhone" placeholder="+91..." /></label>
        <label>Area<input disabled={busy} name="areaName" required placeholder="Ramtekdi" /></label>
        <label>Amount<input disabled={busy} inputMode="numeric" name="amount" required placeholder="2100" /></label>
        <label>
          Payment
          <select disabled={busy} name="paymentMode" defaultValue="UPI">
            <option value="CASH">Cash</option>
            <option value="UPI">UPI</option>
            <option value="CHEQUE">Cheque</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
            <option value="OTHER">Other</option>
          </select>
        </label>
        <label className="full">Address<input disabled={busy} name="contributorAddress" placeholder="Building, lane, shop address" /></label>
        {(activeForm?.customFields ?? []).map((field) => (
          <label key={field.id}>
            {field.label}
            <input disabled={busy} name={`custom_${field.key}`} required={field.required} />
          </label>
        ))}
        <button className="primary full" disabled={busy} type="submit"><ReceiptText size={18} />Generate Digital Slip</button>
      </form>
      <div className="card phone-preview">
        <img alt="Vargani template preview" src={templatePreview} />
      </div>
    </section>
  );
}

function SlipsView({
  query,
  receiptUrl,
  selectedSlip,
  setQuery,
  setSelectedSlip,
  slips,
}: {
  query: string;
  receiptUrl: string;
  selectedSlip: Slip | null;
  setQuery: (value: string) => void;
  setSelectedSlip: (slip: Slip) => void;
  slips: Slip[];
}) {
  return (
    <section className="card">
      <div className="table-toolbar">
        <div className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search slip, name, shop, area..." /></div>
        <a className={receiptUrl ? 'primary' : 'primary disabled'} href={receiptUrl || '#'} target="_blank"><Printer size={18} />Print Selected</a>
      </div>
      <div className="slip-table">
        <div className="slip-head"><span>Slip No.</span><span>Name</span><span>Shop</span><span>Area</span><span>Amount</span><span>Payment</span><span>Action</span></div>
        {slips.length === 0 && (
          <div className="empty-state">
            <ReceiptText size={28} />
            <strong>No slips generated yet</strong>
            <span>Generate the first vargani slip from the member or admin generator.</span>
          </div>
        )}
        {slips.map((slip) => (
          <button className={selectedSlip?.id === slip.id ? 'slip-row selected' : 'slip-row'} key={slip.id} onClick={() => setSelectedSlip(slip)} type="button">
            <strong>{slip.slipNumber}</strong>
            <span>{slip.contributorName}</span>
            <span>{slip.shopName || '-'}</span>
            <span>{slip.areaName || '-'}</span>
            <span>{money(Number(slip.amount))}</span>
            <em>{slip.paymentMode}</em>
            <Copy size={17} />
          </button>
        ))}
      </div>
    </section>
  );
}

function Stat({ icon, label, note, value }: { icon: ReactNode; label: string; note: string; value: string }) {
  return (
    <article className="stat">
      <div>{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="status-line">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function defaultPlacement(): TemplatePlacement {
  return {
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    borderColor: '#ff4f0a',
    borderRadius: 6,
    color: '#111111',
    fontFamily: 'Arial, sans-serif',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: 800,
    height: 48,
    letterSpacing: 0,
    lineHeight: 1.15,
    opacity: 1,
    padding: 5,
    rotate: 0,
    shadow: false,
    textAlign: 'left',
    textDecoration: 'none',
    textTransform: 'none',
    textWrap: 'single',
    width: 280,
    x: 120,
    y: 120,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function toColorInput(value: string) {
  if (/^#[0-9a-f]{6}$/i.test(value)) return value;
  if (value === 'transparent') return '#ffffff';
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return '#ffffff';
  return `#${[match[1], match[2], match[3]].map((part) => Number(part).toString(16).padStart(2, '0')).join('')}`;
}

function sampleFieldValue(key: string, label: string) {
  const samples: Record<string, string> = {
    amount: '5100',
    areaName: 'Ramtekdi',
    building_name: 'Prathama Building',
    collectorName: 'Amit Collector',
    contributorAddress: 'Ramtekdi, Pune',
    contributorName: 'Mahesh Traders',
    contributorPhone: '9876543210',
    createdAt: '26/07/2026',
    donorType: 'Shop',
    paymentMode: 'UPI',
    shopName: 'Mahesh Traders',
    slipNumber: '003',
  };

  return samples[key] ?? label;
}

async function apiRequest<T>(path: string, options: RequestInit = {}, session?: AuthSession | null): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
      ...options.headers,
    },
  });
  if (!response.ok) throw new Error(readErrorMessage(await response.text(), response.status));
  return response.json() as Promise<T>;
}

function screenTitle(screen: Screen) {
  return {
    dashboard: 'Dashboard',
    generate: 'Generate Slip',
    mandals: 'Mandals',
    members: 'Members & Logins',
    slips: 'Latest Slips',
    template: 'Vargani Template',
  }[screen];
}

function screenSubtitle(screen: Screen) {
  return {
    dashboard: "Welcome back. Here's your mandal overview.",
    generate: 'Live vargani slip generator for collection members.',
    mandals: 'Manage onboarded mandals and festival readiness.',
    members: 'Create and manage khajindar, leader, and member logins.',
    slips: 'All latest generated vargani slips from the mandal.',
    template: 'Upload slip template and map custom fields accurately.',
  }[screen];
}

function readErrorMessage(body: string, status: number) {
  try {
    const parsed = JSON.parse(body) as { error?: string; message?: string | string[] };
    if (Array.isArray(parsed.message)) return parsed.message.join(', ');
    return parsed.message || parsed.error || `Request failed with ${status}`;
  } catch {
    return `Request failed with ${status}`;
  }
}

function normalizeApiBaseUrl(value?: string) {
  const baseUrl = (value || 'https://digital-vargani-api.vercel.app').replace(/\/$/, '');
  if (/\/api\/v\d+$/.test(baseUrl)) return baseUrl;
  if (baseUrl.endsWith('/api')) return `${baseUrl}/v1`;
  return `${baseUrl}/api/v1`;
}

function money(value: number) {
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(Number.isFinite(value) ? value : 0);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'mandal';
}
