import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Card from "./Card";

type Props = {
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: Props) => {
  return (
    <div
      className={cn(
        "grid gap-2",
        type === "ASSIST" && "grid-cols-1",
        type === "SELECT" &&
          "grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
      )}
    >
      {options.map((option, index) => (
        <div className='' onClick={() => {}}>
          <Card
            id={option.id}
            key={option.id}
            text={option.text}
            imageSrc={option.imageSrc}
            shortcut={`${1 + index}`}
            selected={selectedOption === option.id}
            onClick={() => onSelect(option.id)}
            status={status}
            audioSrc={option.audioSrc}
            disabled={disabled}
            type={type}
          />
        </div>
      ))}
    </div>
  );
};

export default Challenge;
