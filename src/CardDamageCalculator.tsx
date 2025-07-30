import { useState } from 'react';
import { Plus, X, Zap, Heart, Sparkles, Target, ArrowLeft, Coins, Users, Flame, Droplets } from 'lucide-react';

interface DamageType {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  kidDescription: string;
  example: string;
  color: string;
  category: string;
}

const DAMAGE_TYPES: DamageType[] = [
  {
    id: 'base_additive',
    title: '90+ Base + Additive',
    icon: <Plus className="w-6 h-6" />,
    description: 'Base damage plus extra for each condition',
    kidDescription: 'Start with base damage and add more for each energy card.',
    example: '90 + 30 per energy attached',
    color: 'from-red-500 to-red-600',
    category: 'Basic',
  },
  {
    id: 'multiplicative',
    title: '30× Multiplicative',
    icon: <X className="w-6 h-6" />,
    description: 'Multiply base value by condition count',
    kidDescription: 'Damage is the modifier times the number of energy cards.',
    example: '30 × number of energy cards',
    color: 'from-purple-500 to-purple-600',
    category: 'Basic',
  },
  {
    id: 'static_conditional',
    title: 'Static Conditional',
    icon: <Target className="w-6 h-6" />,
    description: 'Fixed bonus if condition is met',
    kidDescription: 'Add bonus damage when the condition is true.',
    example: '+60 if opponent is Pokemon-EX',
    color: 'from-blue-500 to-blue-600',
    category: 'Conditional',
  },
  {
    id: 'replace_damage',
    title: 'Replace Damage',
    icon: <Sparkles className="w-6 h-6" />,
    description: 'Override damage if condition met',
    kidDescription: 'Use new damage instead if the condition is true.',
    example: '120 instead if evolved this turn',
    color: 'from-green-500 to-green-600',
    category: 'Conditional',
  },
  {
    id: 'cost_based',
    title: 'Cost-Based Scaling',
    icon: <Flame className="w-6 h-6" />,
    description: 'Damage based on cards discarded',
    kidDescription: 'Damage depends on how many cards you discard.',
    example: '50 per Fire energy discarded',
    color: 'from-orange-500 to-orange-600',
    category: 'Advanced',
  },
  {
    id: 'energy_specific',
    title: 'Energy-Type Specific',
    icon: <Droplets className="w-6 h-6" />,
    description: 'Bonus for specific energy types',
    kidDescription: 'Add damage for each matching energy you have.',
    example: '+20 per Fire energy attached',
    color: 'from-pink-500 to-pink-600',
    category: 'Advanced',
  },
  {
    id: 'game_state',
    title: 'Game State Based',
    icon: <Users className="w-6 h-6" />,
    description: 'Based on board or hand state',
    kidDescription: 'Damage depends on things like cards in hand.',
    example: '+20 per card in opponent\'s hand',
    color: 'from-teal-500 to-teal-600',
    category: 'Advanced',
  },
  {
    id: 'coin_flip',
    title: 'Coin Flip Effects',
    icon: <Coins className="w-6 h-6" />,
    description: 'Damage based on coin flip results',
    kidDescription: 'Damage grows with each heads you flip.',
    example: '80 damage per heads (flip 3)',
    color: 'from-yellow-500 to-yellow-600',
    category: 'Random',
  },
];

export default function CardDamageCalculator({
  kidMode,
  setKidMode,
}: {
  kidMode: boolean;
  setKidMode: (value: boolean) => void;
}) {
  const [currentMode, setCurrentMode] = useState<DamageType | null>(null);
  const [baseDamage, setBaseDamage] = useState(90);
  const [operation, setOperation] = useState('add');
  const [modifier, setModifier] = useState(30);
  const [count, setCount] = useState(2);
  const [conditionMet, setConditionMet] = useState(false);
  const [staticBonus, setStaticBonus] = useState(60);
  const [replacementDamage, setReplacementDamage] = useState(120);
  const [coinFlips, setCoinFlips] = useState(3);
  const [headsCount, setHeadsCount] = useState(2);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateDamage = () => {
    switch (currentMode?.id) {
      case 'base_additive':
        return baseDamage + modifier * count;
      case 'multiplicative':
        return modifier * count;
      case 'static_conditional':
        return baseDamage + (conditionMet ? staticBonus : 0);
      case 'replace_damage':
        return conditionMet ? replacementDamage : baseDamage;
      case 'cost_based':
      case 'energy_specific':
      case 'game_state':
        return modifier * count;
      case 'coin_flip':
        return modifier * headsCount;
      default:
        return 0;
    }
  };

  const triggerCalculation = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 300);
  };

  const handlePreset = (
    base: number,
    op: string,
    mod: number,
    cnt: number
  ) => {
    setBaseDamage(base);
    setOperation(op);
    setModifier(mod);
    setCount(cnt);
    triggerCalculation();
  };

  if (!currentMode) {
    const categories = Array.from(
      new Set(DAMAGE_TYPES.map((type) => type.category))
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-3 sm:p-4">
        <button
          onClick={() => setKidMode(!kidMode)}
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg hover:bg-white ${
            kidMode ? 'bg-yellow-300 text-gray-800' : 'bg-white/80 text-gray-800'
          }`}
        >
          {kidMode ? 'Kid Mode: ON' : 'Kid Mode: OFF'}
        </button>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 drop-shadow-2xl flex items-center justify-center gap-2 flex-wrap">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
              <span>Pokemon TCG Damage Calculator</span>
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
            </h1>
            <p className="text-lg sm:text-xl text-purple-100 font-medium">
              Choose your attack type to calculate damage!
            </p>
            <p className="mt-2 text-sm text-yellow-100 font-semibold">
              {kidMode ? 'Kid Mode is ON' : 'Kid Mode is OFF'}
            </p>
          </div>

          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                {category} Attacks
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {DAMAGE_TYPES.filter((type) => type.category === category).map(
                  (type) => (
                    <button
                      key={type.id}
                      onClick={() => setCurrentMode(type)}
                      className={`bg-gradient-to-r ${type.color} text-white p-4 sm:p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation group`}
                    >
                      <div className="text-center space-y-3">
                        <div className="flex justify-center group-hover:scale-110 transition-transform">
                          {type.icon}
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl">
                          {type.title}
                        </h3>
                        <p className="text-sm opacity-90 leading-tight">
                          {kidMode ? type.kidDescription : type.description}
                        </p>
                        <div className="bg-white/20 rounded-lg p-2 text-xs font-medium">
                          {type.example}
                        </div>
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const totalDamage = calculateDamage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 relative">
          <button
            onClick={() => setCurrentMode(null)}
            className="absolute left-4 top-4 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setKidMode(!kidMode)}
            className={`absolute right-4 top-4 px-4 py-2 rounded-lg shadow-lg hover:bg-white ${
              kidMode ? 'bg-yellow-300 text-gray-800' : 'bg-white/80 text-gray-800'
            }`}
          >
            {kidMode ? 'Kid Mode: ON' : 'Kid Mode: OFF'}
          </button>

          <div
            className={`inline-flex items-center gap-3 bg-gradient-to-r ${currentMode?.color} text-white px-6 py-3 rounded-2xl shadow-lg mb-4`}
          >
            {currentMode?.icon}
            <h1 className="text-xl sm:text-2xl font-bold">
              {currentMode?.title}
            </h1>
          </div>
          <p className="text-lg text-purple-100 font-medium">
            {kidMode ? currentMode?.kidDescription : currentMode?.description}
          </p>
          <p className="mt-2 text-sm text-yellow-100 font-semibold">
            {kidMode ? 'Kid Mode is ON' : 'Kid Mode is OFF'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
              <Zap className="mr-2 text-yellow-500 w-6 h-6 sm:w-7 sm:h-7" />
              Attack Setup
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {['base_additive', 'static_conditional', 'replace_damage'].includes(
                currentMode!.id
              ) && (
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 sm:p-5 rounded-2xl border-2 border-red-200 shadow-sm">
                  <label className="block text-base sm:text-lg font-bold text-red-700 mb-3">
                    🔥 Base Damage
                  </label>
                  <input
                    type="number"
                    value={baseDamage}
                    onChange={(e) => {
                      setBaseDamage(Number(e.target.value) || 0);
                      triggerCalculation();
                    }}
                    className="w-full p-4 text-2xl sm:text-3xl font-bold text-center rounded-xl border-3 border-red-300 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 bg-white shadow-inner"
                    min="0"
                    placeholder="90"
                  />
                </div>
              )}

              {[
                'base_additive',
                'multiplicative',
                'cost_based',
                'energy_specific',
                'game_state',
                'coin_flip',
              ].includes(currentMode!.id) && (
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 sm:p-5 rounded-2xl border-2 border-orange-200 shadow-sm">
                  <label className="block text-base sm:text-lg font-bold text-orange-700 mb-3">
                    {currentMode!.id === 'base_additive'
                      ? '⚡ Damage per Unit'
                      : currentMode!.id === 'multiplicative'
                      ? '✨ Damage Multiplier'
                      : currentMode!.id === 'coin_flip'
                      ? '🪙 Damage per Heads'
                      : '💥 Damage per Unit'}
                  </label>
                  <input
                    type="number"
                    value={modifier}
                    onChange={(e) => {
                      setModifier(Number(e.target.value) || 0);
                      triggerCalculation();
                    }}
                    className="w-full p-4 text-2xl sm:text-3xl font-bold text-center rounded-xl border-3 border-orange-300 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-200 bg-white shadow-inner"
                    min="0"
                    placeholder="30"
                  />
                </div>
              )}

              {[
                'base_additive',
                'multiplicative',
                'cost_based',
                'energy_specific',
                'game_state',
              ].includes(currentMode!.id) && (
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 sm:p-5 rounded-2xl border-2 border-green-200 shadow-sm">
                  <label className="block text-base sm:text-lg font-bold text-green-700 mb-3 text-center">
                    {currentMode!.id === 'base_additive'
                      ? '🔋 Energy Cards'
                      : currentMode!.id === 'cost_based'
                      ? '💸 Cards Discarded'
                      : currentMode!.id === 'energy_specific'
                      ? '🔥 Specific Energy'
                      : currentMode!.id === 'game_state'
                      ? '📋 Count'
                      : '🔢 Quantity'}
                  </label>
                  <div className="flex items-center justify-center space-x-4 sm:space-x-6">
                    <button
                      onClick={() => {
                        setCount(Math.max(0, count - 1));
                        triggerCalculation();
                      }}
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-red-500 text-white rounded-full font-bold text-xl sm:text-2xl hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
                    >
                      -
                    </button>
                    <div className="bg-white rounded-2xl px-6 py-4 shadow-inner border-2 border-green-200 min-w-20 sm:min-w-24">
                      <span className="text-3xl sm:text-4xl font-black text-green-700 block text-center">
                        {count}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setCount(count + 1);
                        triggerCalculation();
                      }}
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 text-white rounded-full font-bold text-xl sm:text-2xl hover:bg-green-600 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {['static_conditional', 'replace_damage'].includes(currentMode!.id) && (
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-5 rounded-2xl border-2 border-blue-200 shadow-sm">
                  <label className="block text-base sm:text-lg font-bold text-blue-700 mb-3">
                    🎯 Condition Met?
                  </label>
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        setConditionMet(!conditionMet);
                        triggerCalculation();
                      }}
                      className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                        conditionMet
                          ? 'bg-green-500 text-white shadow-lg transform scale-105'
                          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                      }`}
                    >
                      {conditionMet ? '✅ YES' : '❌ NO'}
                    </button>
                  </div>
                </div>
              )}

              {currentMode!.id === 'static_conditional' && (
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 sm:p-5 rounded-2xl border-2 border-purple-200 shadow-sm">
                  <label className="block text-base sm:text-lg font-bold text-purple-700 mb-3">
                    💥 Bonus Damage
                  </label>
                  <input
                    type="number"
                    value={staticBonus}
                    onChange={(e) => {
                      setStaticBonus(Number(e.target.value) || 0);
                      triggerCalculation();
                    }}
                    className="w-full p-4 text-2xl sm:text-3xl font-bold text-center rounded-xl border-3 border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-200 bg-white shadow-inner"
                    min="0"
                    placeholder="60"
                  />
                </div>
              )}

              {currentMode!.id === 'replace_damage' && (
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 sm:p-5 rounded-2xl border-2 border-emerald-200 shadow-sm">
                  <label className="block text-base sm:text-lg font-bold text-emerald-700 mb-3">
                    🔄 Replacement Damage
                  </label>
                  <input
                    type="number"
                    value={replacementDamage}
                    onChange={(e) => {
                      setReplacementDamage(Number(e.target.value) || 0);
                      triggerCalculation();
                    }}
                    className="w-full p-4 text-2xl sm:text-3xl font-bold text-center rounded-xl border-3 border-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 transition-all duration-200 bg-white shadow-inner"
                    min="0"
                    placeholder="120"
                  />
                </div>
              )}

              {currentMode!.id === 'coin_flip' && (
                <>
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 sm:p-5 rounded-2xl border-2 border-yellow-200 shadow-sm">
                    <label className="block text-base sm:text-lg font-bold text-yellow-700 mb-3 text-center">
                      🪙 Total Coin Flips
                    </label>
                    <div className="flex items-center justify-center space-x-4 sm:space-x-6">
                      <button
                        onClick={() => {
                          setCoinFlips(Math.max(1, coinFlips - 1));
                          setHeadsCount(Math.min(headsCount, coinFlips - 1));
                          triggerCalculation();
                        }}
                        className="w-14 h-14 sm:w-16 sm:h-16 bg-red-500 text-white rounded-full font-bold text-xl sm:text-2xl hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
                      >
                        -
                      </button>
                      <div className="bg-white rounded-2xl px-6 py-4 shadow-inner border-2 border-yellow-200 min-w-20 sm:min-w-24">
                        <span className="text-3xl sm:text-4xl font-black text-yellow-700 block text-center">
                          {coinFlips}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setCoinFlips(coinFlips + 1);
                          triggerCalculation();
                        }}
                        className="w-14 h-14 sm:w-16 sm:h-16 bg-yellow-500 text-white rounded-full font-bold text-xl sm:text-2xl hover:bg-yellow-600 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 sm:p-5 rounded-2xl border-2 border-amber-200 shadow-sm">
                    <label className="block text-base sm:text-lg font-bold text-amber-700 mb-3 text-center">
                      ✨ Number of Heads
                    </label>
                    <div className="flex items-center justify-center space-x-4 sm:space-x-6">
                      <button
                        onClick={() => {
                          setHeadsCount(Math.max(0, headsCount - 1));
                          triggerCalculation();
                        }}
                        className="w-14 h-14 sm:w-16 sm:h-16 bg-red-500 text-white rounded-full font-bold text-xl sm:text-2xl hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
                      >
                        -
                      </button>
                      <div className="bg-white rounded-2xl px-6 py-4 shadow-inner border-2 border-amber-200 min-w-20 sm:min-w-24">
                        <span className="text-3xl sm:text-4xl font-black text-amber-700 block text-center">
                          {headsCount}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setHeadsCount(Math.min(coinFlips, headsCount + 1));
                          triggerCalculation();
                        }}
                        className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-500 text-white rounded-full font-bold text-xl sm:text-2xl hover:bg-amber-600 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              )}
              {kidMode && (
                <p className="text-center text-sm text-gray-700">
                  Tip: use the plus and minus buttons to change the numbers.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
              <Heart className="mr-2 text-red-500 w-6 h-6 sm:w-7 sm:h-7" />
              Damage Calculation
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 rounded-2xl border-2 border-gray-200 shadow-inner">
                <div className="text-center space-y-4">
                  <div className="text-sm sm:text-base text-gray-600 font-medium">
                    {currentMode!.id === 'base_additive' &&
                      'Base Damage + (Modifier × Count)'}
                    {currentMode!.id === 'multiplicative' && 'Modifier × Count'}
                    {currentMode!.id === 'static_conditional' &&
                      `Base Damage ${conditionMet ? '+ Bonus' : ''}`}
                    {currentMode!.id === 'replace_damage' &&
                      (conditionMet ? 'Replacement Damage' : 'Base Damage')}
                    {currentMode!.id === 'cost_based' &&
                      'Damage × Cards Discarded'}
                    {currentMode!.id === 'energy_specific' &&
                      'Damage × Specific Energy'}
                    {currentMode!.id === 'game_state' && 'Damage × Count'}
                    {currentMode!.id === 'coin_flip' && 'Damage × Heads'}
                  </div>

                  <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-xl sm:text-2xl font-bold flex-wrap">
                    {currentMode!.id === 'base_additive' && (
                      <>
                        <span className="bg-red-200 px-3 py-2 rounded-lg shadow-sm border border-red-300 text-red-800">
                          {baseDamage}
                        </span>
                        <Plus size={20} className="text-gray-600" />
                        <span className="bg-orange-200 px-2 py-2 rounded-lg shadow-sm border border-orange-300 text-orange-800">
                          ({modifier}
                        </span>
                        <X size={16} className="text-gray-600" />
                        <span className="bg-green-200 px-2 py-2 rounded-lg shadow-sm border border-green-300 text-green-800">
                          {count})
                        </span>
                      </>
                    )}

                    {[
                      'multiplicative',
                      'cost_based',
                      'energy_specific',
                      'game_state',
                    ].includes(currentMode!.id) && (
                      <>
                        <span className="bg-orange-200 px-4 py-2 rounded-lg shadow-sm border border-orange-300 text-orange-800">
                          {modifier}
                        </span>
                        <X size={20} className="text-gray-600" />
                        <span className="bg-green-200 px-4 py-2 rounded-lg shadow-sm border border-green-300 text-green-800">
                          {count}
                        </span>
                      </>
                    )}

                    {currentMode!.id === 'static_conditional' && (
                      <>
                        <span className="bg-red-200 px-4 py-2 rounded-lg shadow-sm border border-red-300 text-red-800">
                          {baseDamage}
                        </span>
                        {conditionMet && (
                          <>
                            <Plus size={20} className="text-gray-600" />
                            <span className="bg-purple-200 px-4 py-2 rounded-lg shadow-sm border border-purple-300 text-purple-800">
                              {staticBonus}
                            </span>
                          </>
                        )}
                      </>
                    )}

                    {currentMode!.id === 'replace_damage' && (
                      <span
                        className={`px-4 py-2 rounded-lg shadow-sm border ${
                          conditionMet
                            ? 'bg-emerald-200 border-emerald-300 text-emerald-800'
                            : 'bg-red-200 border-red-300 text-red-800'
                        }`}
                      >
                        {conditionMet ? replacementDamage : baseDamage}
                      </span>
                    )}

                    {currentMode!.id === 'coin_flip' && (
                      <>
                        <span className="bg-orange-200 px-4 py-2 rounded-lg shadow-sm border border-orange-300 text-orange-800">
                          {modifier}
                        </span>
                        <X size={20} className="text-gray-600" />
                        <span className="bg-amber-200 px-4 py-2 rounded-lg shadow-sm border border-amber-300 text-amber-800">
                          {headsCount}
                        </span>
                      </>
                    )}
                  </div>

                  {['base_additive', 'static_conditional'].includes(
                    currentMode!.id
                  ) && (
                    <div className="text-lg sm:text-xl text-gray-600 font-medium">
                      {currentMode!.id === 'base_additive' &&
                        `= ${baseDamage} + ${modifier * count}`}
                      {currentMode!.id === 'static_conditional' &&
                        conditionMet &&
                        `= ${baseDamage} + ${staticBonus}`}
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`bg-gradient-to-r ${currentMode!.color} p-6 sm:p-8 rounded-2xl text-center shadow-2xl transform transition-all duration-300 ${
                  isCalculating ? 'scale-105 shadow-3xl' : 'hover:scale-102'
                }`}
              >
                <div className="text-white text-base sm:text-lg font-bold mb-2 flex items-center justify-center">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Total Damage
                  <Sparkles className="ml-2 w-5 h-5" />
                </div>
                <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-white drop-shadow-2xl">
                  {totalDamage}
                  <span className="text-yellow-200 ml-2">⚡</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-200">
                <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-3 text-center">
                  📙 How This Attack Works
                </h3>
                <div className="text-xs sm:text-sm text-gray-600 text-center">
                  <div className="bg-white p-3 rounded-lg border border-indigo-200">
                    {currentMode?.example}
                  </div>
                  {kidMode && (
                    <p className="mt-2">Follow the example to see how damage is counted.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
