// app.selectors.ts
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

// Selector to get the app state from the store

const profileState = createFeatureSelector<AppState>('profileVisible')

// Selector to get the profileVisible property from the app state
export const selectProfileVisible = createSelector(
    profileState,
  (appState: AppState) => appState.profileVisible
);