import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

export default function Default() {
  return (
    <div className="bg-primary-100 min-h-screen h-full block pb-20">
      <Header />
      <div className="flex justify-center mt-12 text-center container mx-auto">
        <div className="flex flex-col items-center rounded-xl bg-white px-8 py-8 md:py-10 md:px-14 shadow-2xl shadow-primary/10 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
