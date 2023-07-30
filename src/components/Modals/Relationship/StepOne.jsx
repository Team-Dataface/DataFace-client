import Content from "../SharedItems/Content";
import Title from "../SharedItems/Title";
import Button from "../../shared/Button";
import Message from "../SharedItems/Message";

function StepOne({ setRelationshipStep }) {
  return (
    <>
      <Title>Step 1</Title>
      <Message>
        <p>Please choose a database that you would like to link with DBNAME</p>
      </Message>
      <Content>
        <div className="flex justify-center items-center h-60 w-60">
          database card here
        </div>
      </Content>
      <div className="flex justify-end items-center w-full">
        <Button
          className="w-20 h-8 mt-5 rounded-md ring-2 ring-blue text-blue hover:bg-blue hover:text-white"
          onClick={() => setRelationshipStep("stepTwo")}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default StepOne;
