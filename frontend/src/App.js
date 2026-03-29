import React, { useState, useEffect } from "react";

const API = "https://organic-meme-rxx57g46qrrcpq6p-5000.app.github.dev/api/v1";

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #13131a;
    --surface2: #1c1c27;
    --border: #2a2a3d;
    --accent: #7c6aff;
    --accent2: #ff6a8e;
    --accent3: #6affd4;
    --text: #e8e8f0;
    --muted: #6b6b8a;
    --pending: #ffb86a;
    --completed: #6affd4;
    --danger: #ff6a8e;
  }

  body {
    font-family: 'DM Mono', monospace;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(124,106,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,106,255,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  body::after {
    content: '';
    position: fixed;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(124,106,255,0.12) 0%, transparent 70%);
    top: -200px; right: -200px;
    pointer-events: none;
    z-index: 0;
    animation: blobPulse 8s ease-in-out infinite;
  }

  @keyframes blobPulse {
    0%,100% { transform: scale(1) translate(0,0); }
    50%     { transform: scale(1.1) translate(-20px,20px); }
  }

  #root { position: relative; z-index: 1; }

  /* ── AUTH ── */
  .auth-wrap {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
  }

  .auth-card {
    width: 100%; max-width: 420px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 48px 40px;
    position: relative;
    overflow: hidden;
    animation: slideUp 0.5s cubic-bezier(0.22,1,0.36,1);
  }

  .auth-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3));
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .brand {
    font-family: 'Syne', sans-serif;
    font-size: 28px; font-weight: 800; letter-spacing: -1px;
    margin-bottom: 6px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }

  .auth-sub { color: var(--muted); font-size: 13px; margin-bottom: 36px; }

  .tab-row {
    display: flex; gap: 4px;
    background: var(--surface2);
    border-radius: 10px; padding: 4px;
    margin-bottom: 28px;
  }

  .tab-btn {
    flex: 1; padding: 10px; border: none; border-radius: 8px;
    background: transparent; color: var(--muted);
    font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }
  .tab-btn.active {
    background: var(--accent); color: #fff;
    box-shadow: 0 4px 16px rgba(124,106,255,0.35);
  }

  .field { margin-bottom: 16px; }
  .field label {
    display: block; font-size: 11px; color: var(--muted);
    letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;
  }
  .field input, .field textarea, .field select {
    width: 100%;
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 10px; padding: 14px 16px;
    color: var(--text); font-family: 'DM Mono', monospace; font-size: 14px;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .field textarea { resize: vertical; min-height: 90px; font-size: 13px; }
  .field select { cursor: pointer; appearance: none; }
  .field input:focus, .field textarea:focus, .field select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(124,106,255,0.15);
  }

  .btn-primary {
    width: 100%; padding: 14px;
    background: linear-gradient(135deg, var(--accent), #5b4de0);
    border: none; border-radius: 10px; color: #fff;
    font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; margin-top: 8px; transition: all 0.2s;
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(124,106,255,0.4); }
  .btn-primary:active { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .error-msg {
    background: rgba(255,106,142,0.12); border: 1px solid rgba(255,106,142,0.3);
    border-radius: 8px; padding: 12px 16px; font-size: 13px;
    color: var(--danger); margin-top: 16px;
  }

  .success-msg {
    background: rgba(106,255,212,0.1); border: 1px solid rgba(106,255,212,0.3);
    border-radius: 8px; padding: 12px 16px; font-size: 13px;
    color: var(--completed); margin-top: 16px;
  }

  /* ── DASHBOARD ── */
  .dashboard { min-height: 100vh; display: flex; flex-direction: column; }

  .topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 32px; border-bottom: 1px solid var(--border);
    background: rgba(13,13,20,0.85); backdrop-filter: blur(16px);
    position: sticky; top: 0; z-index: 100;
  }

  .topbar-brand {
    font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }

  .topbar-right { display: flex; align-items: center; gap: 16px; }

  .user-chip {
    display: flex; align-items: center; gap: 10px;
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 40px; padding: 8px 16px 8px 8px;
  }

  .user-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: #fff;
  }

  .user-name { font-size: 13px; color: var(--text); }

  .btn-logout {
    background: transparent; border: 1px solid var(--border);
    border-radius: 8px; padding: 8px 14px;
    color: var(--muted); font-family: 'DM Mono', monospace; font-size: 12px;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-logout:hover { border-color: var(--danger); color: var(--danger); }

  .main {
    flex: 1; padding: 40px 32px;
    max-width: 900px; margin: 0 auto; width: 100%;
  }

  .page-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 32px; flex-wrap: wrap; gap: 16px;
  }

  .page-title {
    font-family: 'Syne', sans-serif; font-size: 32px;
    font-weight: 800; letter-spacing: -1px; line-height: 1;
  }
  .page-title span { color: var(--accent); }

  .stats-row { display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; }

  .stat-pill {
    display: flex; align-items: center; gap: 8px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 40px; padding: 10px 20px; font-size: 13px;
  }

  .stat-dot { width: 8px; height: 8px; border-radius: 50%; }

  .btn-add {
    display: flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, var(--accent), #5b4de0);
    border: none; border-radius: 10px; padding: 12px 20px;
    color: #fff; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
    cursor: pointer; transition: all 0.2s; white-space: nowrap;
  }
  .btn-add:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(124,106,255,0.4); }

  .filter-bar { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }

  .filter-chip {
    padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border);
    background: transparent; color: var(--muted);
    font-family: 'DM Mono', monospace; font-size: 12px;
    cursor: pointer; transition: all 0.2s;
  }
  .filter-chip.active { background: var(--surface2); border-color: var(--accent); color: var(--accent); }
  .filter-chip:hover:not(.active) { border-color: var(--muted); color: var(--text); }

  /* ── TASK CARDS ── */
  .task-list { display: flex; flex-direction: column; gap: 12px; }

  .task-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; padding: 20px 24px;
    display: flex; align-items: center; gap: 16px;
    transition: all 0.2s; animation: fadeIn 0.3s ease;
    position: relative; overflow: hidden;
  }
  .task-card::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  }
  .task-card.pending::before  { background: var(--pending); }
  .task-card.completed::before { background: var(--completed); }
  .task-card:hover {
    border-color: rgba(124,106,255,0.4);
    transform: translateX(4px);
    box-shadow: 0 4px 24px rgba(0,0,0,0.3);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .task-check {
    width: 22px; height: 22px; border-radius: 6px;
    border: 2px solid var(--border); background: transparent;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; flex-shrink: 0;
  }
  .task-check.checked { background: var(--completed); border-color: var(--completed); }
  .task-check:hover { border-color: var(--completed); }
  .checkmark { color: #0a0a0f; font-size: 12px; font-weight: 900; }

  .task-body { flex: 1; min-width: 0; }

  .task-title {
    font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 600;
    margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .task-title.done { text-decoration: line-through; color: var(--muted); }

  .task-desc { font-size: 12px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .task-meta { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

  .status-badge {
    font-size: 10px; font-family: 'Syne', sans-serif; font-weight: 700;
    letter-spacing: 0.5px; padding: 4px 10px; border-radius: 6px; text-transform: uppercase;
  }
  .status-badge.pending   { background: rgba(255,184,106,0.15); color: var(--pending); }
  .status-badge.completed { background: rgba(106,255,212,0.12); color: var(--completed); }

  .task-date { font-size: 11px; color: var(--muted); white-space: nowrap; }

  .task-actions { display: flex; gap: 6px; }

  .btn-icon {
    width: 32px; height: 32px; border-radius: 8px;
    border: 1px solid var(--border); background: transparent;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 14px; transition: all 0.2s; color: var(--muted);
  }
  .btn-icon.edit:hover { border-color: var(--accent); color: var(--accent); background: rgba(124,106,255,0.1); }
  .btn-icon.del:hover  { border-color: var(--danger); color: var(--danger); background: rgba(255,106,142,0.1); }

  /* ── EMPTY STATE ── */
  .empty-state { text-align: center; padding: 80px 24px; color: var(--muted); }
  .empty-icon  { font-size: 48px; margin-bottom: 16px; }
  .empty-text  { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 600; color: var(--text); margin-bottom: 8px; }
  .empty-sub   { font-size: 13px; }

  /* ── MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.75);
    backdrop-filter: blur(8px); display: flex;
    align-items: center; justify-content: center;
    z-index: 200; padding: 24px; animation: fadeOverlay 0.2s ease;
  }
  @keyframes fadeOverlay { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 20px; padding: 40px; width: 100%; max-width: 460px;
    animation: modalPop 0.3s cubic-bezier(0.22,1,0.36,1); position: relative;
  }
  .modal::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    border-radius: 20px 20px 0 0;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
  }
  @keyframes modalPop {
    from { opacity: 0; transform: scale(0.92) translateY(16px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  .modal-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; margin-bottom: 24px; }
  .modal-actions { display: flex; gap: 10px; margin-top: 24px; }

  .btn-cancel {
    flex: 1; padding: 12px;
    background: var(--surface2); border: 1px solid var(--border); border-radius: 10px;
    color: var(--muted); font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-cancel:hover { border-color: var(--muted); color: var(--text); }

  .btn-save {
    flex: 2; padding: 12px;
    background: linear-gradient(135deg, var(--accent), #5b4de0);
    border: none; border-radius: 10px; color: #fff;
    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-save:hover { box-shadow: 0 8px 24px rgba(124,106,255,0.4); }
  .btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── LOADER ── */
  .loading-dots { display: flex; gap: 6px; justify-content: center; align-items: center; padding: 60px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); animation: dotBounce 1.2s ease-in-out infinite; }
  .dot:nth-child(2) { animation-delay: 0.2s; background: var(--accent2); }
  .dot:nth-child(3) { animation-delay: 0.4s; background: var(--accent3); }
  @keyframes dotBounce {
    0%,80%,100% { transform: scale(0.7); opacity: 0.4; }
    40%          { transform: scale(1);   opacity: 1; }
  }

  /* ── TOAST ── */
  .toast {
    position: fixed; bottom: 28px; right: 28px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 14px 20px; font-size: 13px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 999;
    animation: toastIn 0.3s cubic-bezier(0.22,1,0.36,1);
    display: flex; align-items: center; gap: 10px;
  }
  .toast.success { border-color: rgba(106,255,212,0.4); color: var(--completed); }
  .toast.error   { border-color: rgba(255,106,142,0.4); color: var(--danger); }
  @keyframes toastIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 600px) {
    .topbar { padding: 16px 20px; }
    .main   { padding: 24px 20px; }
    .task-date { display: none; }
    .modal { padding: 28px 24px; }
    .auth-card { padding: 36px 28px; }
    .user-name { display: none; }
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "U";
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

// ─── API calls ────────────────────────────────────────────────────────────────
function authHeaders(token) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

async function apiRegister(name, email, password) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
}

async function apiLogin(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}

async function apiGetTasks(token) {
  const res = await fetch(`${API}/tasks`, { headers: authHeaders(token) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch tasks");
  return Array.isArray(data) ? data : data.tasks || data.data || [];
}

async function apiCreateTask(token, title, description) {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ title, description }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create task");
  return data;
}

async function apiUpdateTask(token, id, payload) {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update task");
  return data;
}

async function apiDeleteTask(token, id) {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to delete task");
  }
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type }) {
  if (!message) return null;
  return (
    <div className={`toast ${type}`}>
      <span>{type === "success" ? "✓" : "✕"}</span>
      {message}
    </div>
  );
}

// ─── Task Modal ───────────────────────────────────────────────────────────────
function TaskModal({ task, onClose, onSave, saving }) {
  const isEdit = !!task?._id;
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "pending");

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">{isEdit ? "✏️ Edit Task" : "✨ New Task"}</div>

        <div className="field">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            autoFocus
          />
        </div>

        <div className="field">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some details..."
          />
        </div>

        {isEdit && (
          <div className="field">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        )}

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="btn-save"
            disabled={!title.trim() || saving}
            onClick={() => onSave({ title, description, status })}
          >
            {saving ? "Saving…" : isEdit ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Auth Page ────────────────────────────────────────────────────────────────
function AuthPage({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function switchTab(t) {
    setTab(t);
    setError("");
    setSuccess("");
  }

  async function handleSubmit() {
    setError(""); setSuccess(""); setLoading(true);
    try {
      if (tab === "register") {
        await apiRegister(name, email, password);
        setSuccess("Account created! Please login.");
        switchTab("login");
      } else {
        const data = await apiLogin(email, password);
        const token = data.token || data.data?.token;
        const user  = data.user  || data.data?.user || { name: email.split("@")[0] };
        if (!token) throw new Error("No token in response");
        onLogin(token, user);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="brand">TaskFlow</div>
        <div className="auth-sub">RBAC Task Manager</div>

        <div className="tab-row">
          <button className={`tab-btn ${tab === "login" ? "active" : ""}`} onClick={() => switchTab("login")}>Login</button>
          <button className={`tab-btn ${tab === "register" ? "active" : ""}`} onClick={() => switchTab("register")}>Register</button>
        </div>

        {tab === "register" && (
          <div className="field">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
          </div>
        )}

        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait…" : tab === "login" ? "Sign In →" : "Create Account →"}
        </button>

        {error   && <div className="error-msg">⚠ {error}</div>}
        {success && <div className="success-msg">✓ {success}</div>}
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ token, user, onLogout }) {
  const [tasks, setTasks]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]  = useState("all");
  const [modal, setModal]    = useState(null); // null | {} | { task }
  const [saving, setSaving]  = useState(false);
  const [toast, setToast]    = useState(null);

  const userName = user?.name || user?.email?.split("@")[0] || "User";

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function loadTasks() {
    setLoading(true);
    try {
      const data = await apiGetTasks(token);
      setTasks(data);
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadTasks(); }, []);

  async function handleSave({ title, description, status }) {
    setSaving(true);
    try {
      if (modal?.task) {
        await apiUpdateTask(token, modal.task._id, { title, description, status });
        showToast("Task updated!");
      } else {
        await apiCreateTask(token, title, description);
        showToast("Task created!");
      }
      setModal(null);
      loadTasks();
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this task?")) return;
    try {
      await apiDeleteTask(token, id);
      showToast("Task deleted!");
      loadTasks();
    } catch (e) {
      showToast(e.message, "error");
    }
  }

  async function handleToggle(task) {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    try {
      await apiUpdateTask(token, task._id, { ...task, status: newStatus });
      loadTasks();
    } catch (e) {
      showToast(e.message, "error");
    }
  }

  const filtered = tasks.filter((t) => filter === "all" || t.status === filter);
  const pending   = tasks.filter((t) => t.status === "pending").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="dashboard">
      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-brand">TaskFlow</div>
        <div className="topbar-right">
          <div className="user-chip">
            <div className="user-avatar">{getInitials(userName)}</div>
            <span className="user-name">{userName}</span>
          </div>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </div>

      {/* Main content */}
      <div className="main">
        <div className="page-header">
          <div className="page-title">My <span>Tasks</span></div>
          <button className="btn-add" onClick={() => setModal({})}>
            <span style={{ fontSize: "18px" }}>+</span> New Task
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-pill"><div className="stat-dot" style={{ background: "var(--accent)" }} />{tasks.length} Total</div>
          <div className="stat-pill"><div className="stat-dot" style={{ background: "var(--pending)" }} />{pending} Pending</div>
          <div className="stat-pill"><div className="stat-dot" style={{ background: "var(--completed)" }} />{completed} Completed</div>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          {["all", "pending", "completed"].map((f) => (
            <button key={f} className={`filter-chip ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Task list */}
        {loading ? (
          <div className="loading-dots">
            <div className="dot" /><div className="dot" /><div className="dot" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">{filter === "completed" ? "🎉" : "📭"}</div>
            <div className="empty-text">{filter === "completed" ? "Nothing completed yet" : "No tasks here"}</div>
            <div className="empty-sub">{filter === "all" ? "Create your first task above!" : `No ${filter} tasks right now.`}</div>
          </div>
        ) : (
          <div className="task-list">
            {filtered.map((task) => (
              <div key={task._id} className={`task-card ${task.status}`}>
                <div
                  className={`task-check ${task.status === "completed" ? "checked" : ""}`}
                  onClick={() => handleToggle(task)}
                >
                  {task.status === "completed" && <span className="checkmark">✓</span>}
                </div>
                <div className="task-body">
                  <div className={`task-title ${task.status === "completed" ? "done" : ""}`}>{task.title}</div>
                  {task.description && <div className="task-desc">{task.description}</div>}
                </div>
                <div className="task-meta">
                  <span className={`status-badge ${task.status}`}>{task.status}</span>
                  <span className="task-date">{formatDate(task.createdAt)}</span>
                  <div className="task-actions">
                    <button className="btn-icon edit" title="Edit" onClick={() => setModal({ task })}>✏️</button>
                    <button className="btn-icon del"  title="Delete" onClick={() => handleDelete(task._id)}>🗑</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal !== null && (
        <TaskModal
          task={modal.task || null}
          saving={saving}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

// ─── App (root) ───────────────────────────────────────────────────────────────
export default function App() {
  const [auth, setAuth] = useState(() => {
    try {
      const token = localStorage.getItem("tf_token");
      const user  = JSON.parse(localStorage.getItem("tf_user") || "null");
      return token ? { token, user } : null;
    } catch {
      return null;
    }
  });

  // Inject styles once
  useEffect(() => {
    const tag = document.createElement("style");
    tag.innerHTML = styles;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  function handleLogin(token, user) {
    localStorage.setItem("tf_token", token);
    localStorage.setItem("tf_user", JSON.stringify(user));
    setAuth({ token, user });
  }

  function handleLogout() {
    localStorage.removeItem("tf_token");
    localStorage.removeItem("tf_user");
    setAuth(null);
  }

  if (!auth) return <AuthPage onLogin={handleLogin} />;
  return <Dashboard token={auth.token} user={auth.user} onLogout={handleLogout} />;
}