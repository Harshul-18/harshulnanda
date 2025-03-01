
import { useState, useEffect } from "react";

interface TypingEffectProps {
  messages: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenMessages?: number;
}

export function TypingEffect({ 
  messages, 
  typingSpeed = 50, 
  deletingSpeed = 10,
  delayBetweenMessages = 2000
}: TypingEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timer: number;

    if (isWaiting) {
      timer = window.setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBetweenMessages);
      return () => clearTimeout(timer);
    }

    const currentMessage = messages[currentTextIndex];

    if (isDeleting) {
      timer = window.setTimeout(() => {
        setDisplayedText(currentMessage.substring(0, displayedText.length - 1));
        
        if (displayedText.length <= 1) {
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }
      }, deletingSpeed);
    } else {
      timer = window.setTimeout(() => {
        setDisplayedText(currentMessage.substring(0, displayedText.length + 1));
        
        if (displayedText.length >= currentMessage.length) {
          setIsWaiting(true);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTextIndex, isWaiting, messages, typingSpeed, deletingSpeed, delayBetweenMessages]);

  return (
    <div className="flex items-baseline">
      <div className="text-foreground">{displayedText}</div>
      <div className="cursor-blink"></div>
    </div>
  );
}

export default TypingEffect;
