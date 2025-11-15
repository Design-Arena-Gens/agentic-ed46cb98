'use client';

import { useState } from 'react';

const styles = [
  { id: 'corporate', name: '🏢 Corporate', desc: 'Professionnel et élégant' },
  { id: 'portrait', name: '👤 Portrait', desc: 'Visage et expressions' },
  { id: 'product', name: '📦 Produit', desc: 'Photographie commerciale' },
  { id: 'event', name: '🎉 Événement', desc: 'Mariages, conférences' },
  { id: 'real-estate', name: '🏠 Immobilier', desc: 'Architecture et espaces' },
  { id: 'food', name: '🍽️ Culinaire', desc: 'Plats et restaurants' }
];

const enhancements = [
  { id: 'upscale', label: 'Ultra Haute Résolution (8K)', desc: 'Augmentation massive de résolution' },
  { id: 'denoise', label: 'Réduction du Bruit', desc: 'Élimination du grain' },
  { id: 'sharpen', label: 'Netteté Professionnelle', desc: 'Détails précis' },
  { id: 'color', label: 'Correction Colorimétrique', desc: 'Couleurs vibrantes et naturelles' },
  { id: 'lighting', label: 'Optimisation Lumière', desc: 'Exposition et contraste' },
  { id: 'details', label: 'Récupération des Détails', desc: 'Restauration des textures' }
];

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState('corporate');
  const [selectedEnhancements, setSelectedEnhancements] = useState<string[]>([
    'upscale', 'denoise', 'sharpen', 'color', 'lighting', 'details'
  ]);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleEnhancement = (id: string) => {
    setSelectedEnhancements(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const generatePrompt = () => {
    const styleDescriptions: Record<string, string> = {
      corporate: 'photo d\'entreprise professionnelle avec éclairage studio, fond neutre élégant, tenue professionnelle impeccable',
      portrait: 'portrait professionnel avec bokeh naturel, éclairage flatté, expression naturelle et authentique',
      product: 'photographie produit e-commerce avec fond blanc pur, éclairage multi-angles, reflets professionnels',
      event: 'photographie d\'événement avec ambiance dynamique, couleurs vibrantes, moments authentiques capturés',
      'real-estate': 'photographie immobilière avec perspective corrigée, lumière naturelle optimisée, espace valorisé',
      food: 'photographie culinaire appétissante, éclairage chaud, composition artistique, couleurs naturelles'
    };

    const enhancementTexts: Record<string, string> = {
      upscale: '- Augmenter la résolution à 8K minimum (7680x4320 pixels)\n- Utiliser l\'upscaling intelligent avec préservation des détails\n- Générer des pixels supplémentaires de manière cohérente',
      denoise: '- Éliminer tout le bruit numérique et grain ISO\n- Préserver les détails fins pendant la réduction du bruit\n- Obtenir une image parfaitement lisse dans les zones unies',
      sharpen: '- Appliquer une netteté professionnelle sans halos\n- Accentuer les contours et les textures importantes\n- Rendre chaque détail cristallin et précis',
      color: '- Corriger la balance des blancs pour des tons naturels\n- Augmenter la saturation de manière subtile et élégante\n- Harmoniser toutes les couleurs pour un rendu cohérent\n- Obtenir des couleurs riches et professionnelles',
      lighting: '- Équilibrer l\'exposition dans toutes les zones\n- Récupérer les détails dans les ombres et hautes lumières\n- Ajouter du contraste naturel et de la profondeur\n- Optimiser la luminosité générale',
      details: '- Restaurer tous les détails perdus par la compression\n- Améliorer la netteté des textures (tissus, peau, matériaux)\n- Reconstruire les zones floues de manière réaliste\n- Préserver l\'aspect naturel sans artefacts'
    };

    const selectedEnhancementTexts = selectedEnhancements
      .map(id => enhancementTexts[id])
      .join('\n\n');

    const prompt = `Je souhaite que tu améliores cette photo de qualité médiocre pour obtenir une image moderne, professionnelle et haute résolution.

STYLE VISÉ : ${styleDescriptions[selectedStyle]}

AMÉLIORATIONS À APPLIQUER :

${selectedEnhancementTexts}

OBJECTIFS FINAUX :
✓ Qualité d'image exceptionnelle digne d'une publication professionnelle
✓ Résolution ultra-haute permettant l'impression grand format
✓ Rendu moderne et esthétique correspondant aux standards actuels
✓ Image exploitable pour usage commercial ou professionnel
✓ Aucun artefact visible, aspect parfaitement naturel

IMPORTANT :
- Préserve l'authenticité de la scène originale
- Évite tout effet artificiel ou sur-traitement
- Maintiens un rendu réaliste et crédible
- Optimise pour un usage professionnel

Merci de traiter cette image avec le plus haut niveau de qualité possible.`;

    setGeneratedPrompt(prompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🎨 Générateur de Prompt Photo Pro</h1>
        <p>Créez des prompts optimisés pour améliorer vos photos avec ChatGPT</p>
      </header>

      <div className="card">
        <div className="section">
          <h2>1. Choisissez le style de photo</h2>
          <div className="style-grid">
            {styles.map(style => (
              <button
                key={style.id}
                className={`style-button ${selectedStyle === style.id ? 'active' : ''}`}
                onClick={() => setSelectedStyle(style.id)}
              >
                <div>{style.name}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '5px' }}>
                  {style.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>2. Sélectionnez les améliorations souhaitées</h2>
          <div className="options-grid">
            {enhancements.map(enhancement => (
              <div key={enhancement.id} className="option-group">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedEnhancements.includes(enhancement.id)}
                    onChange={() => toggleEnhancement(enhancement.id)}
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>{enhancement.label}</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '2px' }}>
                      {enhancement.desc}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <button className="generate-button" onClick={generatePrompt}>
          ✨ Générer le Prompt Optimisé
        </button>

        {generatedPrompt && (
          <div className="result">
            <h3>📋 Votre Prompt Personnalisé</h3>
            <div className="prompt-text">{generatedPrompt}</div>
            <button
              className={`copy-button ${copied ? 'copied' : ''}`}
              onClick={copyToClipboard}
            >
              {copied ? '✓ Copié !' : '📋 Copier le Prompt'}
            </button>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>💡 Conseil : Uploadez votre photo sur ChatGPT et collez ce prompt pour obtenir les meilleurs résultats</p>
      </footer>
    </div>
  );
}
