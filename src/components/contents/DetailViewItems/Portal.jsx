/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

import {
  currentDBIdAtom,
  isEditModeAtom,
  relationshipsDataAtom,
  userAtom,
  draggingElementAtom,
  elementScaleAtom,
} from "../../../atoms/atoms";

import fetchData from "../../../utils/axios";

import PortalFooter from "./PortalFooter";
import PortalTable from "./PortalTable";
import Button from "../../shared/Button";

function Portal({ index, relationship }) {
  const queryClient = useQueryClient();

  const { userId } = useAtomValue(userAtom);
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);
  const [relationshipsData, setRelationshipsData] = useAtom(
    relationshipsDataAtom,
  );

  const currentDBId = useAtomValue(currentDBIdAtom);

  const setDraggingElement = useSetAtom(draggingElementAtom);
  const setElementScale = useSetAtom(elementScaleAtom);

  async function deleteRelationship(relationshipIndex) {
    await fetchData(
      "DELETE",
      `/users/${userId}/databases/${currentDBId}/relationships/${relationshipsData[relationshipIndex]._id}`,
    );
  }

  const { mutate: fetchDeleteRelationship } = useMutation(deleteRelationship, {
    onSuccess: () => {
      setRelationshipsData(null);
      queryClient.refetchQueries(["dbDocumentList", currentDBId]);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  return (
    <div
      className={`absolute w-auto m-5 group ${
        isEditMode && "hover:cursor-move"
      }`}
      style={{
        top: `${relationship.yCoordinate}px`,
        left: `${relationship.xCoordinate}px`,
      }}
      onMouseDown={event => {
        setDraggingElement(`portal-${index}`);
        setElementScale([
          event.currentTarget.clientWidth,
          event.currentTarget.clientHeight,
        ]);
      }}
      onMouseUp={() => {
        setDraggingElement(null);
        setElementScale([]);
      }}
    >
      <div
        className="overflow-y-scroll border"
        style={{ height: `${relationship.portalSize}px` }}
        onDoubleClick={() => setIsEditMode(true)}
      >
        <PortalTable index={index} relationship={relationship} />
        {isEditMode && (
          <Button
            className="absolute -top-3 -right-3 w-6 rounded-full"
            onClick={() => fetchDeleteRelationship(index)}
          >
            <img src="/assets/close_icon.svg" alt="close button" />
          </Button>
        )}
      </div>
      <div className="hidden group-hover:flex hover:flex">
        {isEditMode && <PortalFooter index={index} />}
      </div>
    </div>
  );
}

export default Portal;
