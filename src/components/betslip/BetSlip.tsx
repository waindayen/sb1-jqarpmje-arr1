import React, { useState, useEffect } from 'react';
import { Trash2, Calculator, AlertCircle } from 'lucide-react';
import { useBetSlip } from '../../contexts/BetSlipContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../utils/format';
import { isBettingClosed } from '../../utils/timeUtils';
import AuthMobileModal from '../auth/AuthMobileModal';
import AuthDesktopModal from '../auth/AuthDesktopModal';
import BettingTimer from '../match/BettingTimer';
import { BettingService } from '../../services/betting';

interface BetSlipProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BetSlip({ isOpen, onClose }: BetSlipProps) {
  const { currentUser } = useAuth();
  const { bets, removeBet, clearBets, updateStake } = useBetSlip();
  const [betType, setBetType] = useState<'simple' | 'combine'>('simple');
  const [stake, setStake] = useState<string>('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [combinedBetsConfig, setCombinedBetsConfig] = useState<any>(null);

  useEffect(() => {
    loadCombinedBetsConfig();
  }, []);

  const loadCombinedBetsConfig = async () => {
    const config = await BettingService.getCombinedBetsConfig();
    setCombinedBetsConfig(config);
  };

  // Filtrer les paris expirés
  const validBets = bets.filter(bet => !isBettingClosed(bet.matchTime));

  const totalOdds = validBets.reduce((acc, bet) => acc * bet.odds, 1);
  const potentialWin = betType === 'combine' 
    ? parseFloat(stake) * totalOdds
    : validBets.reduce((acc, bet) => acc + (bet.stake || 0) * bet.odds, 0);

  const handleStakeChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setStake(value);
      setError(null);
    }
  };

  const validateCombinedBet = () => {
    if (!combinedBetsConfig?.enabled) {
      throw new Error('Les paris combinés sont actuellement désactivés');
    }

    const bet = {
      selections: validBets.map(b => ({
        ...b,
        leagueId: b.leagueId || 'unknown'
      })),
      stake: parseFloat(stake)
    };

    const validationError = BettingService.validateCombinedBet(bet, combinedBetsConfig);
    if (validationError) {
      throw new Error(validationError);
    }
  };

  const handleBetSubmit = async () => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);

      // Validation des mises
      if (betType === 'combine') {
        validateCombinedBet();
        if (!stake || parseFloat(stake) <= 0) {
          throw new Error('Veuillez entrer une mise valide');
        }
      } else {
        const invalidBets = validBets.filter(bet => !bet.stake || bet.stake <= 0);
        if (invalidBets.length > 0) {
          throw new Error('Veuillez entrer une mise pour chaque pari');
        }
      }

      // TODO: Implémenter la soumission des paris
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Réinitialiser le formulaire
      clearBets();
      setStake('');
      setBetType('simple');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatBetAmount = (amount: number) => {
    return formatCurrency(amount, combinedBetsConfig?.currency || 'EUR');
  };

  if (!isOpen) {
    return (
      <button
        onClick={onClose}
        className="fixed right-4 bottom-20 md:bottom-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50 md:block hidden"
      >
        <Calculator className="w-6 h-6" />
        {validBets.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {validBets.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <>
      <div className="fixed right-0 top-[4rem] bottom-16 md:bottom-0 w-80 bg-white shadow-lg flex flex-col z-40">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold">Panier de Paris</h2>
          <button
            onClick={clearBets}
            className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
            title="Vider le panier"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Type de pari */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => setBetType('simple')}
              className={`flex-1 py-2 text-sm font-medium ${
                betType === 'simple'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Paris Simple
            </button>
            <button
              onClick={() => setBetType('combine')}
              disabled={!combinedBetsConfig?.enabled}
              className={`flex-1 py-2 text-sm font-medium ${
                betType === 'combine'
                  ? 'bg-blue-600 text-white'
                  : combinedBetsConfig?.enabled 
                    ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Paris Combiné
            </button>
          </div>
        </div>

        {/* Liste des paris */}
        <div className="flex-1 overflow-auto p-4">
          {validBets.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Aucun pari sélectionné
            </div>
          ) : (
            <div className="space-y-4">
              {validBets.map((bet) => (
                <div
                  key={bet.id}
                  className="bg-gray-50 rounded-lg p-3 relative"
                >
                  <div className="flex justify-between items-start">
                    <div className="pr-8">
                      <div className="text-sm font-medium mb-1">
                        {bet.homeTeam} vs {bet.awayTeam}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {bet.type === '1' ? bet.homeTeam :
                           bet.type === '2' ? bet.awayTeam : 'Match Nul'}
                        </span>
                        <span className="font-bold text-blue-600">{bet.odds}</span>
                      </div>
                      <BettingTimer matchTime={bet.matchTime} />
                    </div>
                    <button
                      onClick={() => removeBet(bet.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Supprimer le pari"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {betType === 'simple' && (
                    <input
                      type="text"
                      placeholder="Mise"
                      value={bet.stake || ''}
                      onChange={(e) => {
                        if (/^\d*\.?\d*$/.test(e.target.value)) {
                          updateStake(bet.id, parseFloat(e.target.value) || 0);
                        }
                      }}
                      className="mt-2 w-full px-3 py-1 rounded border border-gray-200 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {validBets.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <div className="space-y-4">
              {betType === 'combine' && (
                <>
                  <div className="flex justify-between text-sm">
                    <span>Cote totale</span>
                    <span className="font-bold">{totalOdds.toFixed(2)}</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Mise totale"
                    value={stake}
                    onChange={(e) => handleStakeChange(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-gray-200"
                  />
                </>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span>Gain potentiel</span>
                <span className="font-bold text-green-600">
                  {formatBetAmount(potentialWin)}
                </span>
              </div>

              <button
                onClick={handleBetSubmit}
                disabled={isSubmitting || validBets.length === 0}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Validation...' : 'Valider le pari'}
              </button>
            </div>
          </div>
        )}
      </div>

      <AuthMobileModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        message="Connectez-vous pour placer vos paris"
      />
      <AuthDesktopModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        message="Connectez-vous pour placer vos paris"
      />
    </>
  );
}