import Nav from '@/components/Nav';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-lg shadow-primary/5 nav flex flex-wrap items-center justify-between p-4">
      <div className="flex flex-no-shrink items-center justify-center text-xl font-extrabold ml-2 py-3">
        <Link to="/">
          <span className="text-secondary">GrowthHackers</span>{' '}
          <span className="text-primary">Challenge</span>
        </Link>
      </div>
      <Nav />
    </header>
  );
}
