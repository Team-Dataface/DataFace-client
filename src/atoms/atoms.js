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

export const documentsDataAtom = atom([]);
export const draggingElementAtom = atom(null);
export const elementScaleAtom = atom([]);

export const showCreateDBModalAtom = atom(false);
export const showAddDocumentModalAtom = atom(false);
export const showDeleteDocumentModalAtom = atom(false);
export const showRelationshipModalAtom = atom(false);
export const showDeleteDBModalAtom = atom(false);
export const deleteTargetDBIdAtom = atom(null);
export const showDeleteRelationshipModalAtom = atom(false);
export const deleteTargetRelationshipAtom = atom(null);
export const isLastDocumentAtom = atom(false);

export const addDocfieldsAtom = atom([]);
export const createDBFieldsAtom = atom([
  {
    id: crypto.randomUUID(),
    fieldName: "",
    fieldType: "Text",
  },
]);

export const relationshipsAtom = atom([]);
export const relationshipStepAtom = atom("start");
export const relationDataAtom = atom({
  primaryFieldName: "",
  foreignDbId: "",
  foreignFieldName: "",
  foreignFieldsToDisplay: [],
  foreignDb: null,
});
export const targetDatabasesAtom = atom([]);
