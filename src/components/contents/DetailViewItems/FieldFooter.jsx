import { useAtom, useAtomValue } from "jotai";

import { docDataAtom, currentDocIndexAtom } from "../../../atoms/atoms";

import Button from "../../shared/Button";

function FieldFooter({ index }) {
  const [docData, setDocData] = useAtom(docDataAtom);
  const currentDocIndex = useAtomValue(currentDocIndexAtom);

  function updateFieldRows(fieldIndex, value) {
    const newDocData = [...docData];

    newDocData[currentDocIndex].fields[fieldIndex].rows = value;

    setDocData(newDocData);
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
