import { atom } from "jotai";

export const isListViewAtom = atom(true);
export const currentDBIdAtom = atom("");
export const currentDBNameAtom = atom("");
export const currentDocIndexAtom = atom(0);
export const isEditModeAtom = atom(false);
export const isOnSaveAtom = atom(false);
export const isRelationshipAtom = atom(false);
export const relationshipsDataAtom = atom(null);
