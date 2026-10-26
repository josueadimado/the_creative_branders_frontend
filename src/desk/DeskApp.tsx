import { createContext, useContext, useEffect, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowUpRight,
  Eye,
  EyeOff,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  Mail,
  Menu,
  NotebookPen,
  PanelsTopLeft,
  Settings,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { NavLink, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { clearToken, deskJson, readToken, saveToken } from "./api";
import MessagesDesk from "./MessagesDesk";
import NotesDesk from "./NotesDesk";
import Overview from "./Overview";
import PagesDesk from "./PagesDesk";
import ProjectsDesk from "./ProjectsDesk";
import SettingsDesk from "./SettingsDesk";

type AuthValue = {
  token: string;
  setToken: (token: string) => void;
};

const DeskAuth = createContext<AuthValue>({ token: "", setToken: () => undefined });

function useDeskAuth() {
  return useContext(DeskAuth);
}

/** The browser tab title, and a note telling search engines to skip this page. */
function useDeskTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    const meta = document.createElement("meta");
    meta.setAttribute("name", "robots");
    meta.setAttribute("content", "noindex, nofollow");
    document.head.appendChild(meta);
    return () => {
      document.title = previous;
      meta.remove();
    };
  }, [title]);
}

const groups: { label: string; links: { to: string; label: string; icon: LucideIcon; end?: boolean }[] }[] = [
  {
    label: "Website",
    links: [
      { to: "/desk", label: "Dashboard", end: true, icon: LayoutDashboard },
      { to: "/desk/pages", label: "Pages", icon: LayoutTemplate },
      { to: "/desk/projects", label: "Projects", icon: PanelsTopLeft },
      { to: "/desk/notes", label: "Notes", icon: NotebookPen },
      { to: "/desk/settings", label: "Studio details", icon: Settings },
    ],
  },
  {
    label: "Inbox",
    links: [
      { to: "/desk/briefs", label: "Project briefs", icon: Inbox },
      { to: "/desk/waitlist", label: "Waitlist", icon: Users },
      { to: "/desk/newsletter", label: "Newsletter", icon: Mail },
      { to: "/desk/academy", label: "Academy", icon: GraduationCap },
    ],
  },
];

function NavItems({
  collapsed,
  onNavigate,
  unread,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
  unread: number;
}) {
  return (
    <nav className="flex flex-1 flex-col gap-6 px-3">
      {groups.map((group) => (
        <div key={group.label}>
          <p className={`px-3 pb-2 text-xs font-medium uppercase tracking-wide text-white/45 ${collapsed ? "sr-only" : ""}`}>
            {group.label}
          </p>
          <div className="flex flex-col gap-0.5">
            {group.links.map((link) => {
              const Icon = link.icon;
              const showCount = link.to === "/desk/briefs" && unread > 0;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  title={link.label}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                      collapsed ? "justify-center" : ""
                    } ${isActive ? "bg-white/10 font-medium text-white" : "text-white/75 hover:bg-white/5 hover:text-white"}`
                  }
                >
                  <Icon size={18} aria-hidden="true" />
                  <span className={collapsed ? "sr-only" : "min-w-0 flex-1"}>{link.label}</span>
                  {showCount ? (
                    <span
                      className={`grid h-5 min-w-5 place-items-center rounded-full bg-signal px-1 text-[11px] font-semibold text-navy ${
                        collapsed ? "absolute right-1.5 top-1 h-2 w-2 min-w-0 p-0" : ""
                      }`}
                    >
                      <span className={collapsed ? "sr-only" : ""}>{unread}</span>
                    </span>
                  ) : null}
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

function Login() {
  const { token, setToken } = useDeskAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const from = (location.state as { from?: string } | null)?.from || "/desk";
  useDeskTitle("Sign in | Studio desk");

  if (token) return <Navigate to={from} replace />;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await deskJson<{ token: string }>("/login/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      saveToken(result.token);
      setToken(result.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "That username or password is not right.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 text-navy">
      <Helmet>
        <title>Sign in | Studio desk</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo variant="light" />
        </div>
        <form onSubmit={onSubmit} className="rounded-2xl border border-mist bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold tracking-tight">Sign in to the studio desk</h1>
          <label className="mt-5 block text-sm font-medium">
            Username
            <input
              className="mt-1.5 w-full rounded-xl border border-mist bg-white px-3.5 py-2.5 text-base text-navy outline-none focus:border-deep"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Password
            <span className="relative mt-1.5 block">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-xl border border-mist bg-white py-2.5 pl-3.5 pr-11 text-base text-navy outline-none focus:border-deep"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>
          {error ? <p className="mt-4 text-sm text-red-800">{error}</p> : null}
          <button type="submit" className="btn btn-inverse mt-6 w-full rounded-full" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-slate">
          Closing this tab signs you out. After too many tries, wait 15 minutes.
        </p>
      </div>
    </main>
  );
}

function SideFoot({ collapsed, onSignOut }: { collapsed?: boolean; onSignOut: () => void }) {
  const item = `flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/75 hover:bg-white/5 hover:text-white ${
    collapsed ? "justify-center" : ""
  }`;
  return (
    <div className="mt-auto flex flex-col gap-1 border-t border-white/10 px-3 py-4">
      <a className={item} href="/" title="View the website">
        <ArrowUpRight size={18} aria-hidden="true" />
        <span className={collapsed ? "sr-only" : ""}>View the website</span>
      </a>
      <button type="button" className={`${item} text-left`} title="Sign out" onClick={onSignOut}>
        <LogOut size={18} aria-hidden="true" />
        <span className={collapsed ? "sr-only" : ""}>Sign out</span>
      </button>
    </div>
  );
}

function Shell() {
  const { token, setToken } = useDeskAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Wide screens: false shows the names. True keeps only the icons, so the page can use the space.
  const [collapsed, setCollapsed] = useState(false);
  // Narrow screens: the menu covers the page until it is closed.
  const [menuOpen, setMenuOpen] = useState(false);
  const [wide, setWide] = useState(() => window.matchMedia("(min-width: 1024px)").matches);
  const [unread, setUnread] = useState(0);
  useDeskTitle("Studio desk");

  useEffect(() => {
    deskJson<{ unread_inquiries?: number }>("/overview/")
      .then((data) => setUnread(data.unread_inquiries || 0))
      .catch(() => setUnread(0));
  }, [location.pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setWide(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  if (!token) return <Navigate to="/desk/login" replace />;

  async function signOut() {
    try {
      await deskJson("/logout/", { method: "POST" });
    } catch {
      // The token is already gone, or the server is offline. Either way, leave the desk.
    }
    clearToken();
    setToken("");
    navigate("/desk/login", { replace: true });
  }

  function toggleMenu() {
    if (wide) {
      setCollapsed((value) => !value);
      return;
    }
    setMenuOpen((open) => !open);
  }

  const menuIsOpen = wide ? !collapsed : menuOpen;
  const menuLabel = menuIsOpen ? "Close menu" : "Open menu";

  return (
    <div className="flex h-screen overflow-hidden bg-paper text-navy">
      <Helmet>
        <title>Studio desk</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* The menu stays put. Only the page on the right moves when you scroll. */}
      <aside
        className={`hidden h-full shrink-0 flex-col overflow-y-auto bg-navy text-white lg:flex ${
          collapsed ? "w-[4.5rem]" : "w-64"
        }`}
      >
        <div className={`flex items-center px-3 py-5 ${collapsed ? "justify-center" : "gap-3"}`}>
          {collapsed ? (
            <img src="/brand/tcb-monogram-white.svg" alt="" width={32} height={32} className="h-8 w-8" />
          ) : (
            <div className="min-w-0 overflow-hidden">
              <Logo variant="white" />
            </div>
          )}
        </div>
          <NavItems collapsed={collapsed} unread={unread} />
        <SideFoot collapsed={collapsed} onSignOut={signOut} />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-mist bg-paper px-4">
          <button
            type="button"
            className="rounded-xl border border-mist bg-white p-2 text-navy"
            aria-label={menuLabel}
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <p className="text-sm font-medium text-navy lg:hidden">Studio desk</p>
        </header>
        {menuOpen ? (
          <div className="fixed inset-0 z-30 flex flex-col bg-navy px-3 pb-4 pt-5 text-white lg:hidden">
            <div className="mb-6 flex items-center justify-between px-2">
              <Logo variant="white" />
              <button type="button" aria-label="Close menu" className="p-2" onClick={() => setMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <NavItems unread={unread} onNavigate={() => setMenuOpen(false)} />
            <SideFoot onSignOut={signOut} />
          </div>
        ) : null}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <main className="w-full px-6 py-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

function DeskRoutes() {
  return (
    <Routes>
      <Route path="/desk/login" element={<Login />} />
      <Route path="/desk" element={<Shell />}>
        <Route index element={<Overview />} />
        <Route path="pages" element={<PagesDesk />} />
        <Route path="pages/:slug" element={<PagesDesk />} />
        <Route path="projects" element={<ProjectsDesk />} />
        <Route path="projects/:id" element={<ProjectsDesk />} />
        <Route path="notes" element={<NotesDesk />} />
        <Route path="notes/:id" element={<NotesDesk />} />
        <Route path="settings" element={<SettingsDesk />} />
        <Route path="briefs" element={<MessagesDesk kind="briefs" />} />
        <Route path="briefs/:id" element={<MessagesDesk kind="briefs" />} />
        <Route path="waitlist" element={<MessagesDesk kind="waitlist" />} />
        <Route path="newsletter" element={<MessagesDesk kind="newsletter" />} />
        <Route path="academy" element={<MessagesDesk kind="academy" />} />
      </Route>
    </Routes>
  );
}

/** The private studio desk. It does not use the public header or footer. */
export default function DeskApp() {
  const [token, setToken] = useState(readToken);
  return (
    <DeskAuth.Provider value={{ token, setToken }}>
      <DeskRoutes />
    </DeskAuth.Provider>
  );
}
