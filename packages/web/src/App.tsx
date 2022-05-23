import { useRoutes } from 'react-router-dom';
import routes from './routes';

export default function App() {
  const page = useRoutes(routes);
  return (
    <>
      {page}
      <div id="modal-root"></div>
    </>
  );
}
