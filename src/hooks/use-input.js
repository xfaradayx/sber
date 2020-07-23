import { useState } from "react";

export default (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (ev) => setValue(ev.target ? ev.target.value : ev);

  return { value, onChange };
};
