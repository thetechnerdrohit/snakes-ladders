import { useEffect, useState } from "react";
import classnames from "classnames";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Cell = ({ type, number, player }: any) => {
  const [first, setfirst] = useState("");
  const [meta, setMeta] = useState({
    type: "",
    head: 1,
    tail: 1,
    color: "text-sky-100 bg-sky-300 border-sky-500",
    desc: "",
  });
  useEffect(() => {
    switch (type) {
      case "snake3":
        setMeta({
          type: "snake",
          head: 50,
          tail: 33,
          color: "text-rose-500 bg-rose-100 border-rose-500",
          desc: "Shitt 🐍🐍🐍!! Will be demoted to 33",
        });
        break;
      case "snake2":
        setMeta({
          type: "snake",
          head: 77,
          tail: 57,
          color: "text-rose-500 bg-rose-100 border-rose-500",
          desc: "Shitt 🐍🐍🐍!! Will be demoted to 57",
        });
        break;
      case "snake4":
        setMeta({
          type: "snake",
          head: 42,
          tail: 18,
          color: "text-rose-500 bg-rose-100 border-rose-500",
          desc: "Shitt 🐍🐍🐍!! Will be demoted to 18",
        });
        break;
      case "snake5":
        setMeta({
          type: "snake",
          head: 96,
          tail: 52,
          color: "text-rose-500 bg-rose-100 border-rose-500",
          desc: "Shitt 🐍🐍🐍!! Will be demoted to 52",
        });
        break;
      case "ladder1":
        setMeta({
          type: "ladder",
          head: 34,
          tail: 6,
          color: "text-green-500 bg-green-100 border-green-500",
          desc: "Wow 🪜🪜!! Will be promoted to 34",
        });
        break;
      case "ladder2":
        setMeta({
          type: "ladder",
          head: 94,
          tail: 66,
          color: "text-green-500 bg-green-100 border-green-500",
          desc: "Wow 🪜🪜!! Will be promoted to 94",
        });
        break;
      default:
        setMeta({
          type: "",
          head: 1,
          tail: 1,
          color: "text-violet-500 bg-violet-200 border-violet-500",
          desc: "",
        });
        break;
    }
    setfirst(
      (prev) => `bg-${
        player.status === number ? player.color : meta.color
      }-100 text-${
        player.status === number ? player.color : meta.color
      }-500 text-lg font-bold h-20 w-20
      flex items-center justify-center border-2 border-${
        player.status === number ? player.color : meta.color
      }-500`
    );
  }, []);

  return (
    <>
      <div
        {...(meta.desc && { id: `${type}-${number}` })}
        className={`flex items-center justify-center border-2 font-bold h-20 w-20 hover:cursor-pointer ${
          player.status === number ? player.color : meta.color
        }`}
      >
        {number}
        <span className="text-2xl">
          {meta.type === "snake" && "🐍"}
          {meta.type === "ladder" && "🪜"}
          {number === 100 && "🎉"}
        </span>
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
