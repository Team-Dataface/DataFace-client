import { useAtomValue } from "jotai";

import { documentsAtom, isEditModeAtom } from "../../../atoms/atoms";

import useGetAllDocuments from "../../../apis/useGetAllDocuments";

import TableHead from "./TableHead";
import TableBody from "./TableBody";

function ListView() {
  const isEditMode = useAtomValue(isEditModeAtom);
  const documents = useAtomValue(documentsAtom);

  useGetAllDocuments();

  return (
    <div
      className={`relative flex w-full h-[calc(100vh-145px)] p-3 bg-white drop-shadow-md overflow-y-auto
      ${isEditMode && "ring-4 ring-blue"}`}
    >
      {documents.length !== 0 && (
        <table className="border-collapse w-full max-h-20 overflow-y-auto">
          <TableHead fields={documents?.documents[0].fields} />
          <TableBody documents={documents?.documents} />
        </table>
      )}
    </div>
  );
}

export default ListView;
