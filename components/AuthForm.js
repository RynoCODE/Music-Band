import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AuthForm({ type }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'login') {
      if (username === 'user' && password === 'password') router.push('/');
      else setError('Invalid credentials. Try user/password.');
    } else {
      if (username && password) router.push('/');
      else setError('Please enter username and password.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-secondary p-8 rounded-xl shadow-lg w-full max-w-sm mx-auto mt-24 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2">{type === 'login' ? 'Login' : 'Sign Up'}</h2>
      <input className="p-3 rounded-lg bg-primary border border-neutral-700" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="p-3 rounded-lg bg-primary border border-neutral-700" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <button className="bg-accent text-white py-2 rounded-lg font-semibold hover:bg-accent/80 transition" type="submit">{type === 'login' ? 'Login' : 'Sign Up'}</button>
      <div className="text-sm text-neutral-400 mt-2">
        {type === 'login' ? (
          <>Don't have an account? <a href="/signup" className="text-accent">Sign Up</a></>
        ) : (
          <>Already have an account? <a href="/login" className="text-accent">Login</a></>
        )}
      </div>
    </form>
  );
}
