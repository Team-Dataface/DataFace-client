import { useAtomValue, useSetAtom } from "jotai";

import {
  relationshipStepAtom,
  showRelationshipModalAtom,
} from "../../../atoms/atoms";

import Modal from "../../shared/Modal";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Start from "./Start";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Done from "./Done";

function RelationshipModal({ databaseName }) {
  const relationshipStep = useAtomValue(relationshipStepAtom);
  const setShowRelationshipModal = useSetAtom(showRelationshipModalAtom);

  return (
    <Modal onClick={() => setShowRelationshipModal(false)}>
      <ContentWrapper>
        {relationshipStep === "start" && <Start />}
        {relationshipStep === "stepOne" && (
          <StepOne databaseName={databaseName} />
        )}
        {relationshipStep === "stepTwo" && <StepTwo />}
        {relationshipStep === "stepThree" && <StepThree />}
        {relationshipStep === "Done" && <Done />}
      </ContentWrapper>
    </Modal>
  );
}

RelationshipModal.propTypes = {};

export default RelationshipModal;
