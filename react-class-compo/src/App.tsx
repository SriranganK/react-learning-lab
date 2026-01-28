import { useState } from "react";
import LifecycleDemo from "./LifecycleDemo";

function App() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        Toggle Component
      </button>

      {show && <LifecycleDemo />}
    </div>
  );
}

export default App;
