import { atom } from "jotai";

export const currentDBIdAtom = atom("");
export const currentDBNameAtom = atom("");
export const currentDocIndexAtom = atom(0);

export const isEditModeAtom = atom(false);
export const isListViewAtom = atom(true);
export const isRelationshipAtom = atom(false);

export const isOnSaveAtom = atom(false);

export const relationshipsDataAtom = atom(null);
export const documentsIdsAtom = atom([]);

export const isInitialAtom = atom(true);
