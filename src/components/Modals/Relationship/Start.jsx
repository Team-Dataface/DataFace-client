import Content from "../SharedItems/Content";
import Title from "../SharedItems/Title";
import Button from "../../shared/Button";
import Message from "../SharedItems/Message";

function Start({ setRelationshipStep }) {
  return (
    <>
      <Title>Create Relationship Wizard</Title>
      <Message>
        <p>You can view information from different database</p>
        <p>simultaneously on a single screen through relationship settings.</p>
      </Message>
      <Content>
        <img src="/assets/relation_start.svg" alt="relation start" />
      </Content>
      <Button
        className="w-20 h-8 mt-5 rounded-md bg-black-bg text-white hover:bg-dark-grey"
        onClick={() => setRelationshipStep("stepOne")}
      >
        Start
      </Button>
    </>
  );
}

export default Start;
