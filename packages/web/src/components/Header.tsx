import Nav from '@/components/Nav';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-lg shadow-gray-200/50 nav flex flex-wrap items-center justify-between p-4">
      <div className="flex flex-no-shrink items-center justify-center text-xl font-extrabold text-primary ml-2 py-3">
        <Link to="/">GrothHackers Challenge</Link>
      </div>
      <Nav />
    </header>
  );
}
