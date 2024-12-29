import { useState, useEffect } from 'react';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';

export function useFirestoreConnection() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    let timeout: NodeJS.Timeout;

    const handleConnectionError = () => {
      setIsOnline(false);
      // Tenter de se reconnecter toutes les 30 secondes
      timeout = setTimeout(async () => {
        try {
          await enableNetwork(db);
          setIsOnline(true);
        } catch (err) {
          handleConnectionError();
        }
      }, 30000);
    };

    const initialize = async () => {
      try {
        await enableNetwork(db);
        setIsOnline(true);
      } catch (err) {
        handleConnectionError();
      }
    };

    initialize();

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      disableNetwork(db).catch(console.error);
    };
  }, []);

  return { isOnline };
}