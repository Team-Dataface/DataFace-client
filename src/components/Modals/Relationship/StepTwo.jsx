import Title from "../SharedItems/Title";
import Button from "../../shared/Button";
import Message from "../SharedItems/Message";
import Content from "../SharedItems/Content";

function StepTwo({ setRelationshipStep }) {
  return (
    <>
      <Title>Step 2</Title>
      <Message>
        <p>
          Please choose one field from each Database that you would like to link
        </p>
      </Message>
      <Content>
        <div className="flex justify-center items-center h-60 w-60">
          database fields card here
        </div>
        <div className="flex justify-center items-center h-60 w-60">
          database fields card here
        </div>
      </Content>
      <Message>
        <p>
          Documents within DBNAME will be automatically queried and displayed
        </p>
        <p>based on the match between the NAME field and the NAME field</p>
      </Message>
      <div className="flex justify-between items-center w-full">
        <Button
          className="w-20 h-8 mt-5 rounded-md bg-dark-grey text-white hover:bg-grey"
          onClick={() => setRelationshipStep("stepOne")}
        >
          Back
        </Button>
        <Button
          className="w-20 h-8 mt-5 rounded-md ring-2 ring-blue text-blue hover:bg-blue hover:text-white"
          onClick={() => setRelationshipStep("stepThree")}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default StepTwo;
