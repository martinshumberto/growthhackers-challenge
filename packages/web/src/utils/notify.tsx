import { Store } from 'react-notifications-component';

export default function notify({ title, message, type }) {
  if (typeof window !== 'undefined') {
    Store.addNotification({
      title,
      message,
      type,
      insert: 'bottom',
      container: 'bottom-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 8000,
        onScreen: true,
      },
    });
  }
}
