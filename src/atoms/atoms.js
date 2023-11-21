import { atom } from "jotai";

export const userAtom = atom("");

export const currentDBIdAtom = atom("");
export const currentDBNameAtom = atom("");
export const currentDocIndexAtom = atom(0);

export const isEditModeAtom = atom(false);
export const isListViewAtom = atom(true);
export const isRelationshipAtom = atom(false);

export const relationshipsDataAtom = atom(null);
export const documentsIdsAtom = atom([]);

export const isInitialAtom = atom(true);
export const changedDocAtom = atom([]);

export const docDataAtom = atom([]);
export const primaryFieldAtom = atom(null);
export const draggingElementAtom = atom(null);
export const elementScaleAtom = atom([]);

export const showCreateDBModalAtom = atom(false);
export const showAddDocumentModalAtom = atom(false);
export const showDeleteDocumentModalAtom = atom(false);
export const isLastDocumentAtom = atom(false);

export const fieldsAtom = atom([]);
