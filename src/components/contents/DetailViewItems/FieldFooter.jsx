import { useAtom, useAtomValue } from "jotai";

import { documentsDataAtom, currentDocIndexAtom } from "../../../atoms/atoms";

import Button from "../../shared/Button";

function FieldFooter({ index }) {
  const [documentsData, setDocumentsData] = useAtom(documentsDataAtom);
  const currentDocIndex = useAtomValue(currentDocIndexAtom);

  function updateFieldRows(fieldIndex, value) {
    const newDocData = [...documentsData];

    newDocData[currentDocIndex].fields[fieldIndex].rows = value;

    setDocumentsData(newDocData);
  }

  return (
    <div className="flex justify-between w-full p-1 bg-black-bg">
      <div className="flex">
        <Button
          className="flex items-center w-auto h-4 mr-1 p-2 bg-white text-xs"
          onClick={() => updateFieldRows(index, 1)}
        >
          small
        </Button>
        <Button
          className="flex items-center w-auto h-4 mr-1 p-2 bg-white text-xs"
          onClick={() => updateFieldRows(index, 4)}
        >
          medium
        </Button>
        <Button
          className="flex items-center w-auto h-4 mr-1 p-2 bg-white text-xs"
          onClick={() => updateFieldRows(index, 8)}
        >
          large
        </Button>
      </div>
    </div>
  );
}

export default FieldFooter;
