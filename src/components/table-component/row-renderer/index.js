import React from "react";
import { useDrag } from "react-dnd";
import { defaultTableRowRenderer as DefaultTableRowRenderer } from "react-virtualized";

const RowRenderer = ({ rowData, ...props }) => {
  const [_, drag] = useDrag({
    item: { type: "table-row", taskData: { ...rowData } },
    canDrag: () => true,
  });

  return (
    <>
      <div
        ref={drag}
        style={{
          cursor: "pointer",
        }}
      >
        <DefaultTableRowRenderer {...props} />
      </div>
    </>
  );
};

export default RowRenderer;
