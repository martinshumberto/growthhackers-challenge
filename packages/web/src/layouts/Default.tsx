import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

function Default() {
  return (
    <div className="bg-primary-100 min-h-screen h-full block pb-20">
      <Header />
      <div className="flex justify-center mt-24 text-center container mx-auto">
        <div className="flex flex-col items-center rounded-xl bg-white px-4 md:py-20 md:px-48 shadow-2xl shadow-primary/20 border-4 border-primary mx-6 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Default;
