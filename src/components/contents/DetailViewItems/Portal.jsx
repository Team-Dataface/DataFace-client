/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useAtom, useSetAtom } from "jotai";

import {
  isEditModeAtom,
  draggingElementAtom,
  elementScaleAtom,
  deleteTargetRelationshipAtom,
  showDeleteRelationshipModalAtom,
} from "../../../atoms/atoms";

import PortalFooter from "./PortalFooter";
import PortalTable from "./PortalTable";
import Button from "../../shared/Button";
import DeleteRelationshipModal from "../../Modals/DeleteRelationship/DeleteRelationshipModal";

function Portal({ index, relationship, documents }) {
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);
  const [showDeleteRelationshipModal, setShowDeleteRelationshipModal] = useAtom(
    showDeleteRelationshipModalAtom,
  );

  const setDraggingElement = useSetAtom(draggingElementAtom);
  const setElementScale = useSetAtom(elementScaleAtom);
  const setDeleteTargetRelationship = useSetAtom(deleteTargetRelationshipAtom);

  function handleClickDelete() {
    setDeleteTargetRelationship(relationship._id);
    setShowDeleteRelationshipModal(true);
  }

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
        <PortalTable
          index={index}
          relationship={relationship}
          documents={documents}
        />
        {isEditMode && (
          <Button
            className="absolute -top-3 -right-3 w-6 rounded-full"
            onClick={() => handleClickDelete()}
          >
            <img src="/assets/close_icon.svg" alt="close button" />
          </Button>
        )}
      </div>
      <div className="hidden group-hover:flex hover:flex">
        {isEditMode && <PortalFooter index={index} />}
      </div>
      {showDeleteRelationshipModal && <DeleteRelationshipModal />}
    </div>
  );
}

export default Portal;
