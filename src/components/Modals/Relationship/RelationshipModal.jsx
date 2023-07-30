import { useState } from "react";

import Modal from "../../shared/Modal";
import ContentWrapper from "../SharedItems/ContentWrapper";
import Start from "./Start";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Done from "./Done";

function RelationshipModal({ closeModal }) {
  const [relationshipStep, setRelationshipStep] = useState("start");
  // const [relationData, setRelationData] = useState(null); //일련의 과정 중 모이는 데이터를 store

  return (
    <Modal onClick={closeModal}>
      <ContentWrapper>
        {relationshipStep === "start" && (
          <Start setRelationshipStep={setRelationshipStep} />
        )}
        {relationshipStep === "stepOne" && (
          <StepOne setRelationshipStep={setRelationshipStep} />
        )}
        {relationshipStep === "stepTwo" && (
          <StepTwo setRelationshipStep={setRelationshipStep} />
        )}
        {relationshipStep === "stepThree" && (
          <StepThree setRelationshipStep={setRelationshipStep} />
        )}
        {relationshipStep === "Done" && (
          <Done
            setRelationshipStep={setRelationshipStep}
            closeModal={closeModal}
          />
        )}
      </ContentWrapper>
    </Modal>
  );
}

RelationshipModal.propTypes = {};

export default RelationshipModal;
