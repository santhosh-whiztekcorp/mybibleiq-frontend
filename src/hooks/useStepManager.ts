import { useState, useCallback } from "react";

export function useStepManager(totalSteps: number) {
  const [step, setStep] = useState(0);

  const next = useCallback(() => {
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }, [totalSteps]);

  const prev = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  return {
    step,
    next,
    prev,
    isFirst: step === 0,
    isLast: step === totalSteps - 1,
  };
}
