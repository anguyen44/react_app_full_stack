/**
 * Prompts a user when they exit the page
 */

import { useCallback, useContext, useEffect, useState } from "react";
import {
  UNSAFE_NavigationContext as NavigationContext,
  useLocation,
  useNavigate,
} from "react-router-dom";

function useNavigateUrl(handleNavigationBlocking, canShowDialogPrompt = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!canShowDialogPrompt) {
      return;
    }

    const push = navigator.push;

    navigator.push = (...args) => {
      handleNavigationBlocking(args[0]);
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, canShowDialogPrompt, handleNavigationBlocking]);
}

export function useNavigatingAway(canShowDialogPrompt) {
  const currentLocation = useLocation();
  const navigate = useNavigate();

  const [showDialogPrompt, setShowDialogPrompt] = useState(false);
  const [wantToNavigateTo, setWantToNavigateTo] = useState(null);
  const [isNavigationConfirmed, setIsNavigationConfirmed] = useState(false);

  const confirmNavigation = useCallback(() => {
    setIsNavigationConfirmed(true);
    setShowDialogPrompt(false);
  }, []);

  const cancelNavigation = useCallback(() => {
    setIsNavigationConfirmed(false);
    setShowDialogPrompt(false);
  }, []);

  const handleNavigationBlocking = useCallback(
    (locationToNavigateTo) => {
      if (
        !isNavigationConfirmed &&
        locationToNavigateTo.pathname !== currentLocation.pathname
      ) {
        setShowDialogPrompt(true);
        setWantToNavigateTo(locationToNavigateTo);
      }
    },
    [isNavigationConfirmed, currentLocation],
  );

  useEffect(() => {
    if (
      isNavigationConfirmed &&
      wantToNavigateTo &&
      wantToNavigateTo.pathname
    ) {
      navigate(wantToNavigateTo.pathname, {
        state: { previousUrl: currentLocation.pathname },
      });
    }
  }, [isNavigationConfirmed, wantToNavigateTo]);

  useEffect(() => {
    if (canShowDialogPrompt) {
      setIsNavigationConfirmed(false);
    }
  }, [canShowDialogPrompt]);

  useNavigateUrl(handleNavigationBlocking, canShowDialogPrompt);

  return { showDialogPrompt, confirmNavigation, cancelNavigation };
}
