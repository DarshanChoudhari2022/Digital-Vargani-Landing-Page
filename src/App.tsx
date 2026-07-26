import {
  BadgeIndianRupee,
  CheckCircle2,
  CircleGauge,
  FileText,
  LogIn,
  LogOut,
  Printer,
  ReceiptText,
  RefreshCw,
  Smartphone,
  UsersRound,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';

type PaymentMode = 'CASH' | 'UPI' | 'CHEQUE' | 'BANK_TRANSFER' | 'OTHER';

interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    mandalId: string | null;
    name: string;
    role: string;
  };
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
  type: string;
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
}

interface ActiveForm {
  customFields: CustomField[];
  festival: Festival;
}

interface CollectionReport {
  balance: number;
  slipCount: number;
  totalCollection: number;
  totalExpenses: number;
}

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
const SESSION_KEY = 'digital-vargani-demo-session';
const DEMO_IDENTIFIER = 'sagar@akhilnayak.local';
const DEMO_PASSWORD = 'Demo@123456789';

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [activeForm, setActiveForm] = useState<ActiveForm | null>(null);
  const [slips, setSlips] = useState<Slip[]>([]);
  const [report, setReport] = useState<CollectionReport | null>(null);
  const [selectedSlip, setSelectedSlip] = useState<Slip | null>(null);
  const [notice, setNotice] = useState('Login to open the live Vargani slip generator.');
  const [busy, setBusy] = useState(false);

  const totalCollection = useMemo(
    () => slips.reduce((sum, slip) => sum + Number(slip.amount), 0),
    [slips],
  );

  useEffect(() => {
    const stored = window.localStorage.getItem(SESSION_KEY);
    if (!stored) return;

    const parsed = JSON.parse(stored) as AuthSession;
    setSession(parsed);
    void loadWorkspace(parsed);
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
      setNotice(`Logged in as ${nextSession.user.name}. Ready to generate slips.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Login failed.');
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    if (session) {
      await apiRequest('/auth/logout', { method: 'POST' }, session).catch(() => undefined);
    }

    window.localStorage.removeItem(SESSION_KEY);
    setSession(null);
    setActiveForm(null);
    setSlips([]);
    setReport(null);
    setSelectedSlip(null);
    setNotice('Logged out. Login again to use the live generator.');
  }

  async function loadWorkspace(currentSession = session) {
    if (!currentSession) return;

    setBusy(true);
    try {
      const form = await apiRequest<ActiveForm>('/vargani/active-form', {}, currentSession);
      const slipList = await apiRequest<{ items: Slip[] }>(
        '/vargani/slips?limit=15',
        {},
        currentSession,
      );
      setActiveForm(form);
      setSlips(slipList.items);
      setSelectedSlip(slipList.items[0] ?? null);

      if (currentSession.user.mandalId) {
        const nextReport = await apiRequest<CollectionReport>(
          `/mandals/${currentSession.user.mandalId}/festivals/${form.festival.id}/reports/collections`,
          {},
          currentSession,
        );
        setReport(nextReport);
      }

      setNotice('Live mandal data loaded from Supabase.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not load workspace.');
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
      event.currentTarget.reset();
      await loadWorkspace(session);
      setNotice(`Slip ${slip.slipNumber} generated successfully.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not generate slip.');
    } finally {
      setBusy(false);
    }
  }

  const receiptUrl = selectedSlip
    ? `${API_BASE_URL}/vargani/slips/${selectedSlip.id}/receipt.html`
    : '';

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">DV</div>
          <div>
            <strong>Digital Vargani</strong>
            <span>Mandal Collection OS</span>
          </div>
        </div>

        <div className="api-pill">
          <CheckCircle2 size={18} />
          <span>Live API connected</span>
        </div>

        {!session ? (
          <form className="login-card" onSubmit={login}>
            <div className="section-title">
              <LogIn size={20} />
              <div>
                <p>Member Login</p>
                <h1>Vargani Slip Generator</h1>
              </div>
            </div>
            <label>
              Identifier
              <input name="identifier" required defaultValue={DEMO_IDENTIFIER} />
            </label>
            <label>
              Password
              <input name="password" required type="password" defaultValue={DEMO_PASSWORD} />
            </label>
            <button className="primary" disabled={busy} type="submit">
              <Smartphone size={18} />
              Login And Start
            </button>
          </form>
        ) : (
          <div className="login-card">
            <div className="section-title">
              <UsersRound size={20} />
              <div>
                <p>Logged In</p>
                <h1>{session.user.name}</h1>
              </div>
            </div>
            <div className="role-chip">{session.user.role}</div>
            <button type="button" onClick={logout}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p>{activeForm?.festival.name ?? 'Akhilnayak Mitra Mandal Demo'}</p>
            <h2>Digital Vargani Slip Generator</h2>
          </div>
          <div className="top-actions">
            <button type="button" onClick={() => loadWorkspace()} disabled={!session || busy}>
              <RefreshCw size={18} />
              Refresh
            </button>
            <a className={receiptUrl ? '' : 'disabled'} href={receiptUrl || '#'} target="_blank">
              <Printer size={18} />
              Open Receipt
            </a>
          </div>
        </header>

        <div className={`notice ${busy ? 'busy' : ''}`}>{busy ? 'Working...' : notice}</div>

        <section className="metrics">
          <Metric
            icon={<BadgeIndianRupee />}
            label="Total Collection"
            value={money(report?.totalCollection ?? totalCollection)}
          />
          <Metric
            icon={<ReceiptText />}
            label="Slips"
            value={String(report?.slipCount ?? slips.length)}
          />
          <Metric
            icon={<FileText />}
            label="Expenses"
            value={money(report?.totalExpenses ?? 0)}
          />
          <Metric icon={<CircleGauge />} label="Balance" value={money(report?.balance ?? 0)} />
        </section>

        <section className="main-grid">
          <form className="panel form-grid" onSubmit={generateSlip}>
            <div className="section-title full">
              <ReceiptText size={20} />
              <div>
                <p>Live Generator</p>
                <h3>Create Vargani Slip</h3>
              </div>
            </div>
            <label>
              Contributor name
              <input
                disabled={!session || busy}
                name="contributorName"
                required
                placeholder="Donor or shop owner"
              />
            </label>
            <label>
              Shop / company
              <input disabled={!session || busy} name="shopName" placeholder="Optional" />
            </label>
            <label>
              Mobile
              <input disabled={!session || busy} name="contributorPhone" placeholder="+91..." />
            </label>
            <label>
              Area
              <input disabled={!session || busy} name="areaName" required placeholder="Ramtekdi" />
            </label>
            <label>
              Amount
              <input
                disabled={!session || busy}
                inputMode="numeric"
                name="amount"
                required
                placeholder="2100"
              />
            </label>
            <label>
              Payment
              <select disabled={!session || busy} name="paymentMode" defaultValue="UPI">
                <option value="CASH">Cash</option>
                <option value="UPI">UPI</option>
                <option value="CHEQUE">Cheque</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="OTHER">Other</option>
              </select>
            </label>
            <label className="full">
              Address
              <input
                disabled={!session || busy}
                name="contributorAddress"
                placeholder="Building, lane, shop address"
              />
            </label>
            {(activeForm?.customFields ?? []).map((field) => (
              <label key={field.id}>
                {field.label}
                <input
                  disabled={!session || busy}
                  name={`custom_${field.key}`}
                  required={field.required}
                />
              </label>
            ))}
            <button className="primary full" disabled={!session || busy} type="submit">
              <ReceiptText size={18} />
              Generate Digital Slip
            </button>
          </form>

          <div className="panel">
            <div className="section-title">
              <ReceiptText size={20} />
              <div>
                <p>Latest Collection</p>
                <h3>Generated Slips</h3>
              </div>
            </div>
            <div className="slip-list">
              {slips.map((slip) => (
                <button
                  className={selectedSlip?.id === slip.id ? 'active' : ''}
                  key={slip.id}
                  onClick={() => setSelectedSlip(slip)}
                  type="button"
                >
                  <span>{slip.slipNumber}</span>
                  <strong>{slip.contributorName}</strong>
                  <em>
                    {money(Number(slip.amount))} | {slip.paymentMode} |{' '}
                    {slip.areaName || 'No area'}
                  </em>
                </button>
              ))}
            </div>
          </div>

          <div className="receipt-preview">
            <div className="receipt">
              <div className="receipt-head">
                <span>DV</span>
                <div>
                  <h3>{selectedSlip?.slipNumber ?? 'No slip selected'}</h3>
                  <p>Verified Digital Vargani Slip</p>
                </div>
              </div>
              <dl>
                <div>
                  <dt>Name</dt>
                  <dd>{selectedSlip?.contributorName ?? '-'}</dd>
                </div>
                <div>
                  <dt>Amount</dt>
                  <dd>{money(Number(selectedSlip?.amount ?? 0))}</dd>
                </div>
                <div>
                  <dt>Shop</dt>
                  <dd>{selectedSlip?.shopName || '-'}</dd>
                </div>
                <div>
                  <dt>Payment</dt>
                  <dd>{selectedSlip?.paymentMode ?? '-'}</dd>
                </div>
                <div>
                  <dt>Area</dt>
                  <dd>{selectedSlip?.areaName || '-'}</dd>
                </div>
                <div>
                  <dt>Mobile</dt>
                  <dd>{selectedSlip?.contributorPhone || '-'}</dd>
                </div>
              </dl>
              <a className={receiptUrl ? 'primary receipt-link' : 'primary receipt-link disabled'} href={receiptUrl || '#'} target="_blank">
                <Printer size={18} />
                Open Printable Receipt
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="metric">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  session?: AuthSession | null,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(readErrorMessage(body, response.status));
  }

  return response.json() as Promise<T>;
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
