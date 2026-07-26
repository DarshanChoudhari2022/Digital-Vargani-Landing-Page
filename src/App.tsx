import {
  BadgeIndianRupee,
  Building2,
  CheckCircle2,
  Copy,
  FileText,
  LayoutDashboard,
  LogIn,
  LogOut,
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
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

type PaymentMode = 'CASH' | 'UPI' | 'CHEQUE' | 'BANK_TRANSFER' | 'OTHER';
type UserRole = 'MANDAL_ADMIN' | 'KHAJINDAR' | 'GROUP_LEADER' | 'MEMBER' | 'SUPER_ADMIN';
type Screen = 'dashboard' | 'mandals' | 'members' | 'template' | 'generate' | 'slips';

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
  city: string;
  contactPhone: string;
  khajindarName: string;
  locality: string;
  name: string;
}

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
const SESSION_KEY = 'digital-vargani-admin-session';
const DEMO_MANDALS_KEY = 'digital-vargani-demo-mandals';
const DEMO_IDENTIFIER = 'admin@akhilnayak.local';
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
    setBusy(true);
    try {
      const nextSession = await apiRequest<AuthSession>('/auth/login', {
        body: JSON.stringify({
          identifier: String(form.get('identifier')),
          password: String(form.get('password')),
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
    const newMandal: DemoMandal = {
      additionalMembers: String(form.get('additionalMembers') || ''),
      address: String(form.get('address') || ''),
      adhyakshName: String(form.get('adhyakshName') || ''),
      city: String(form.get('city') || ''),
      contactPhone: String(form.get('contactPhone') || ''),
      khajindarName: String(form.get('khajindarName') || ''),
      locality: String(form.get('locality') || ''),
      name: String(form.get('name') || ''),
    };

    if (session?.user.role === 'SUPER_ADMIN') {
      setBusy(true);
      try {
        await apiRequest(
          '/mandals',
          {
            body: JSON.stringify({
              address: newMandal.address,
              admin: {
                email: String(form.get('adminEmail') || ''),
                name: newMandal.adhyakshName,
                password: String(form.get('adminPassword') || DEMO_PASSWORD),
                phone: newMandal.contactPhone,
              },
              city: newMandal.city,
              contactName: newMandal.adhyakshName,
              contactPhone: newMandal.contactPhone,
              locality: newMandal.locality,
              name: newMandal.name,
              plan: 'starter',
              state: 'Maharashtra',
            }),
            method: 'POST',
          },
          session,
        );
        setNotice(`${newMandal.name} created in production.`);
      } catch (error) {
        setNotice(error instanceof Error ? error.message : 'Could not create mandal.');
      } finally {
        setBusy(false);
      }
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

  return (
    <main className="shell">
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
              onClick={() => setActiveScreen(item.id)}
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
          <button className="logout" onClick={logout} type="button">
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
  const [loginType, setLoginType] = useState<'adhyaksh' | 'member'>('adhyaksh');
  const isAdhyaksh = loginType === 'adhyaksh';

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
          <div className="login-toggle">
            <button className={isAdhyaksh ? 'active' : ''} onClick={() => setLoginType('adhyaksh')} type="button">
              <ShieldCheck size={18} />
              Adhyaksh Login
            </button>
            <button className={!isAdhyaksh ? 'active' : ''} onClick={() => setLoginType('member')} type="button">
              <UsersRound size={18} />
              Member Login
            </button>
          </div>

          <form className="login-panel clean" key={loginType} onSubmit={onSubmit}>
            <div className="panel-title">
              {isAdhyaksh ? <ShieldCheck size={24} /> : <LogIn size={24} />}
              <div>
                <strong>{isAdhyaksh ? 'Adhyaksh / Main Admin Login' : 'Member Collection Login'}</strong>
                <span>
                  {isAdhyaksh
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
                defaultValue={isAdhyaksh ? DEMO_IDENTIFIER : 'amit@akhilnayak.local'}
              />
            </label>
            <label>
              Password
              <input name="password" required type="password" defaultValue={DEMO_PASSWORD} />
            </label>
            <button className="primary" disabled={busy} type="submit">
              <ShieldCheck size={18} />
              {isAdhyaksh ? 'Login To Admin Console' : 'Login To Vargani Screen'}
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
  const [fieldLabel, setFieldLabel] = useState('');
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
          <img alt="Akhilnayak Mitra Mandal Vargani slip template" src={templatePreview} />
          {[
            ['slipNumber', 'Slip No.'],
            ['contributorName', 'Name'],
            ['contributorAddress', 'Address'],
            ['building_name', 'Building / Lane'],
            ['amount', 'Amount'],
            ['createdAt', 'Date'],
          ].map(([field, label]) => (
            <span className={`field-anchor ${field}`} key={field}>{label}</span>
          ))}
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
          {['Slip No.', 'Date', 'Name', 'Address', 'Amount', 'Shop Name', 'Mobile No.', 'Payment Mode', 'Area', 'Collector Name', 'Donor Type', 'Building / Lane'].map((field) => (
            <button key={field} type="button">+ {field}</button>
          ))}
          {(activeForm?.customFields ?? []).map((field) => (
            <button key={field.id} type="button">+ {field.label}</button>
          ))}
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
