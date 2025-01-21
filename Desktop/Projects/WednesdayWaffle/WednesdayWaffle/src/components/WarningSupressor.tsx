import React, { useEffect } from 'react';
import { LogBox } from 'react-native';

interface Props {
  children: React.ReactNode;
}

export function WarningSupressor({ children }: Props) {
  useEffect(() => {
    // Ignore specific Reanimated warning
    LogBox.ignoreLogs([
      "[Reanimated] Reduced motion setting is enabled on this device",
    ]);
  }, []);

  return <>{children}</>;
}
