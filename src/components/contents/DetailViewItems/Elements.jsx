import { useAtomValue } from "jotai";

import { relationshipsDataAtom } from "../../../atoms/atoms";

import FieldList from "./FieldList";
import Portal from "./Portal";

function Elements() {
  const relationshipsData = useAtomValue(relationshipsDataAtom);

  return (
    <>
      {relationshipsData &&
        relationshipsData.map((relationship, index) => {
          return (
            <Portal
              key={relationship._id}
              index={index}
              relationship={relationship}
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
