import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

type Props = {
  activeCourse: { title: string; imageSrc: string };
  hearts: number;
  points: number;
  hasActiveSubcription: boolean;
};
const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubcription,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href={"/courses"}>
        <Button variant={'ghost'}>
          <Image
            src={activeCourse.imageSrc}
            alt="course image"
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
          </Link>
          <Link href={'/shop'}>
              <Button variant={'ghost'} className="text-orange-500 ">
                  <Image src={'/points.svg'} height={28} width={28} alt='points' className="mr-2" />
                  {points}
              </Button>
          </Link>
    </div>
  );
};

export default UserProgress;
