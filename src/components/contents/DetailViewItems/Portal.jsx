/* eslint-disable jsx-a11y/no-static-element-interactions */

import PortalFooter from "./PortalFooter";
import PortalTable from "./PortalTable";

function Portal({
  foreignDocuments,
  isDragging,
  startDraggingPortal,
  endDraggingPortal,
  isEditMode,
  portalStyle,
  setPortalStyle,
}) {
  return (
    <div
      className="absolute w-auto"
      style={{
        top: `${portalStyle.yCoordinate}px`,
        left: `${portalStyle.xCoordinate}px`,
      }}
      onMouseDown={() => {
        startDraggingPortal();
      }}
      onMouseUp={() => {
        endDraggingPortal();
      }}
    >
      <div className={`h-[${portalStyle.size}px] overflow-y-scroll border`}>
        <PortalTable
          isEditMode={isEditMode}
          isDragging={isDragging}
          foreignDocuments={foreignDocuments}
        />
      </div>
      {isEditMode && <PortalFooter setPortalStyle={setPortalStyle} />}
    </div>
  );
}

export default Portal;
