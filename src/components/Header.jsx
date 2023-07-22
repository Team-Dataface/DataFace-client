import Button from "./shared/Button";
import RelationButton from "./HeaderItems/RelationButton";
import DocHandlerButtons from "./HeaderItems/DocHandlerButtons";
import SwitchViewButtons from "./HeaderItems/SwitchViewButtons";

function Header() {
  return (
    <div className="flex flex-col w-full border-2">
      <div className="flex flex-row justify-between">
        <div>
          <img
            className="w-20 h-20"
            src="/assets/dataface_logo.png"
            alt="dataface logo"
          />
        </div>
        <div>
          <h1>Page Name</h1>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="w-9/12">
          <div className="flex justify-between">
            <RelationButton />
            <DocHandlerButtons />
            <SwitchViewButtons />
          </div>
        </div>

        <div className="w-3/12 text-center">
          <div>
            <Button>save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
