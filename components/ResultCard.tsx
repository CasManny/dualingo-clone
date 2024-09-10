import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  varaint: "points" | "hearts";
  value: number;
};
const ResultCard = ({ varaint, value }: Props) => {
  const imageSrc = varaint === "hearts" ? "/heart.svg" : "/points.svg";
  return (
      <div
        className={cn(
          "rounded-2xl border-2xl w-full p-1",
          varaint === "points" && "bg-orange-400 border-orange-400",
          varaint === "hearts" && "bg-rose-500 border-rose-500"
        )}
      >
        <div
          className={cn(
            "p-1.5 text-white rouned-t-xl font-bold text-center uppercase text-xs",
            varaint === "hearts" && "bg-rose-500",
            varaint === "points" && "bg-orange-400"
          )}
        >
          {varaint === "hearts" ? "Hearts Left " : "Total XP"}
        </div>
        <div
          className={cn(
            "rounded-2xl items-center bg-white flex justify-center p-6 font-bold text-lg",
            varaint === "hearts" && "text-rose-500",
            varaint === "points" && "text-orange-400"
          )}
        >
          <Image
            src={imageSrc}
            alt={`${varaint}`}
            height={30}
            width={30}
            className={"mr-1.5"}
          />
          {value}
        </div>
      </div>
  );
};

export default ResultCard;
