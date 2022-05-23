import { useRoutes } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';
import routes from './routes';

export default function App() {
  const page = useRoutes(routes);
  return (
    <>
      {page}
      <ReactNotifications />
      <div id="modal-root"></div>
    </>
  );
}
