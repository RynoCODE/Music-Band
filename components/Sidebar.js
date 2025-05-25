import Link from 'next/link';
import { Home, Search, ListMusic, User } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();
  const nav = [
    { href: '/', label: 'Home', icon: <Home size={20} /> },
    { href: '/search', label: 'Search', icon: <Search size={20} /> },
    { href: '/playlists', label: 'My Playlists', icon: <ListMusic size={20} /> },
  ];
  return (
    <aside className="hidden md:flex flex-col w-56 bg-secondary p-4 rounded-xl m-4 mr-0">
      <div className="mb-8 flex items-center gap-2">
        <User size={28} />
        <span className="font-bold text-lg">Music Band</span>
      </div>
      <nav className="flex flex-col gap-2">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} legacyBehavior>
            <a className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/20 transition ${router.pathname === item.href ? 'bg-accent/30' : ''}`}>
              {item.icon}
              {item.label}
            </a>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
