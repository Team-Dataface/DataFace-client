import { useQueryClient } from "@tanstack/react-query";
import { useSetAtom, useAtomValue } from "jotai";

import {
  currentDBIdAtom,
  showRelationshipModalAtom,
  relationshipStepAtom,
} from "../../../atoms/atoms";

import Content from "../SharedItems/Content";
import Title from "../SharedItems/Title";
import Button from "../../shared/Button";
import Message from "../SharedItems/Message";

function Done() {
  const queryClient = useQueryClient();
  const currentDBId = useAtomValue(currentDBIdAtom);
  const setShowRelationshipModal = useSetAtom(showRelationshipModalAtom);
  const setRelationshipStep = useSetAtom(relationshipStepAtom);

  return (
    <>
      <Title>Done!</Title>
      <Message>
        <p>Creating a relationship is now completed.</p>
        <p>You may now move the portal list to a position you like.</p>
      </Message>
      <Content>
        <img src="/assets/relation_done.svg" alt="relation start" />
      </Content>
      <Button
        className="w-20 h-8 mt-5 rounded-md bg-black-bg text-white hover:bg-dark-grey"
        onClick={() => {
          queryClient.refetchQueries(["dbDocumentList", currentDBId]);
          queryClient.refetchQueries(["dbRelationShips", currentDBId]);
          setShowRelationshipModal(false);
          setRelationshipStep("start");
        }}
      >
        Close
      </Button>
    </>
  );
}

export default Done;
