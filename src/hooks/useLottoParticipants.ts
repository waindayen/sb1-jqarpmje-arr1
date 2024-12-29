import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Participant {
  id: string;
  userId: string;
  lottoId: string;
  selectedNumbers: number[];
  purchaseDate: string;
  ticketPrice: number;
  currency: string;
}

export function useLottoParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const participationsRef = collection(db, 'lotto_participations');
        const q = query(participationsRef, orderBy('purchaseDate', 'desc'));
        const snapshot = await getDocs(q);
        
        const participantsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Participant[];

        setParticipants(participantsData);
      } catch (err) {
        console.error('Error fetching participants:', err);
        setError('Erreur lors du chargement des participants');
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  return { participants, loading, error };
}