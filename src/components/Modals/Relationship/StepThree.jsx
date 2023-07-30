import Title from "../SharedItems/Title";
import Button from "../../shared/Button";
import Message from "../SharedItems/Message";
import Content from "../SharedItems/Content";

function StepThree({ setRelationshipStep }) {
  return (
    <>
      <Title>Step 3</Title>
      <Message>
        <p>
          Please choose fields from DBNAME that you would like to display on the
          portal list
        </p>
      </Message>
      <Content>
        <div className="flex flex-col items-center justify-evenly">
          <img src="/assets/relation_portal_preview.svg" alt="relation start" />
          <span className="text-blue">
            The auto-query result will be displayed here!
          </span>
        </div>
        <div className="flex justify-center items-center h-60 w-60">
          database fields card here
        </div>
      </Content>
      <div className="flex justify-between items-center w-full">
        <Button
          className="w-20 h-8 mt-5 rounded-md bg-dark-grey text-white hover:bg-grey"
          onClick={() => setRelationshipStep("stepTwo")}
        >
          Back
        </Button>
        <Button
          className="w-20 h-8 mt-5 rounded-md ring-2 ring-blue text-blue hover:bg-blue hover:text-white"
          onClick={() => setRelationshipStep("Done")}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default StepThree;
