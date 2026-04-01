import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

interface SpeechButtonProps {
  textToSpeak: string;
}

const SpeechButton = React.forwardRef<HTMLButtonElement, SpeechButtonProps>(
  ({ textToSpeak }, ref) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleSpeak = () => {
      if ('speechSynthesis' in window) {
        // Cancela qualquer fala em andamento
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.9;
        utterance.pitch = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
      } else {
        alert('Seu navegador não suporta síntese de fala.');
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleSpeak}
        className={`speech-button ${isSpeaking ? 'speaking' : ''}`}
        title="Ouvir texto"
        aria-label={`Ouvir: ${textToSpeak}`}
      >
        <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
      </button>
    );
  }
);

SpeechButton.displayName = 'SpeechButton';

export default SpeechButton;