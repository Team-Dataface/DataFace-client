import { useAtomValue } from "jotai";

import { relationshipsDataAtom } from "../../../atoms/atoms";

import FieldList from "./FieldList";
import Portal from "./Portal";

function Elements({ documents }) {
  const relationshipsData = useAtomValue(relationshipsDataAtom);

  return (
    <>
      {relationshipsData &&
        relationshipsData.map((relationship, index) => {
          return (
            <Portal
              index={index}
              relationship={relationship}
              key={relationship._id}
              documents={documents}
            />
          );
        })}
      <div className="flex flex-col absolute">
        <FieldList />
      </div>
    </>
  );
}

export default Elements;
