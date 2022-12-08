import { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Cell = ({ type, number, player }: any) => {
  const [meta, setMeta] = useState({
    type: "",
    head: 1,
    tail: 1,
    color: "",
    desc: "",
  });
  useEffect(() => {
    switch (type) {
      case "snake3":
        setMeta({
          type: "snake",
          head: 50,
          tail: 33,
          color: "rose",
          desc: "Snake bite to 33",
        });
        break;
      case "snake2":
        setMeta({
          type: "snake",
          head: 77,
          tail: 57,
          color: "rose",
          desc: "Snake bite to 57",
        });
        break;
      case "snake4":
        setMeta({
          type: "snake",
          head: 42,
          tail: 18,
          color: "rose",
          desc: "Snake bite to 18",
        });
        break;
      case "snake5":
        setMeta({
          type: "snake",
          head: 96,
          tail: 52,
          color: "rose",
          desc: "Snake bite to 52",
        });
        break;
      case "ladder1":
        setMeta({
          type: "ladder",
          head: 34,
          tail: 6,
          color: "green",
          desc: "Wow! ladder to 34",
        });
        break;
      case "ladder2":
        setMeta({
          type: "ladder",
          head: 94,
          tail: 66,
          color: "green",
          desc: "Wow! ladder to 94",
        });
        break;
      default:
        setMeta({ type: "", head: 1, tail: 1, color: "orange", desc: "" });
        break;
    }
  }, []);

  return (
    <>
      <div
        {...(meta.desc && { id: `${type}-${number}` })}
        className={`bg-${
          player.status === number ? player.color : meta.color
        }-100 text-${
          player.status === number ? player.color : meta.color
        }-500 text-lg font-bold h-20 w-20 
        flex items-center justify-center border-2 border-${
          player.status === number ? player.color : meta.color
        }-500`}
        // className='bg-green-100 text-green-500 text-lg font-bold h-20 w-20
        // flex items-center justify-center border-2 border-green-500'
      >
        {number}
      </div>
      {meta.desc && (
        <ReactTooltip
          anchorId={`${type}-${number}`}
          place="top"
          content={meta.desc}
          variant="info"
        />
      )}
    </>
  );
};

export default Cell;
