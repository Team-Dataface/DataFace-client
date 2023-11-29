import { useAtomValue } from "jotai";

import { isEditModeAtom } from "../../../atoms/atoms";

import useGetSingleDatabase from "../../../apis/useGetSingleDatabase";

import TableHead from "./TableHead";
import TableBody from "./TableBody";

function ListView() {
  const isEditMode = useAtomValue(isEditModeAtom);

  const { singleDatabase } = useGetSingleDatabase();

  return (
    <div
      className={`relative flex w-full h-[calc(100vh-145px)] p-3 bg-white drop-shadow-md overflow-y-auto
      ${isEditMode && "ring-4 ring-blue"}`}
    >
      {singleDatabase && (
        <table className="border-collapse w-full max-h-20 overflow-y-auto">
          <TableHead fields={singleDatabase?.documents[0].fields} />
          <TableBody documents={singleDatabase?.documents} />
        </table>
      )}
    </div>
  );
}

export default ListView;
