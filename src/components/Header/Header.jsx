import { useState } from "react";

import Button from "../shared/Button";
import RelationBtn from "./RelationBtn";
import ModifyDocBtns from "./ModifyDocBtns";
import ModifyViewBtns from "./ModifyViewBtns";
import logo from "../../assets/dataface_logo.png";

function Header() {
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="flex border-2 w-full">
      <div className="left w-9/12">
        <img className="w-20 h-20" src={logo} alt="dataface logo" />

        <div className="flex justify-between">
          <RelationBtn disabled={disabled} />
          <ModifyDocBtns disabled={disabled} />
          <ModifyViewBtns disabled={disabled} />
        </div>
      </div>

      <div className="right w-3/12 text-center">
        <div>
          <Button>logout</Button>
        </div>
        <div>
          <Button>save</Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
