"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { refillHearts } from "@/actions/user-progress";
import { toast } from "sonner";
import { createStripeUrl } from "@/actions/user-subcription";
import { POINT_TO_REFILL } from "@/constants";


type Props = {
    hearts: number;
    points: number;
    hasActiveSubcription: boolean;
}
const ShopItems = ({ hearts, points, hasActiveSubcription }: Props) => {
    const [pending, startTransition] = useTransition()

    const onRefillHearts = () => {
        if (pending || hearts === 5 || points < POINT_TO_REFILL) {
            return
        }
        startTransition(() => {
            refillHearts().catch(() => toast.error("Something went wrong"))
        })
    }
    const onUpgrade = () => {
        startTransition(() => {
            createStripeUrl().then((response) => {
                if (response.data) {
                    window.location.href = response.data
                }
            }).catch(() => toast.error("Something went wrong"))
        })
    }
  return (
      <ul className={cn("w-full")}>
          <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
              <Image src={'/heart.svg'} alt="Hearts" height={60} width={60} />
              <div className="flex-1">
                  <p className="text-neutral-700 text-base lg:text-xl font-bold">Refill Hearts</p>
              </div>
              <Button disabled={pending || hearts === 5 || points < POINT_TO_REFILL} onClick={onRefillHearts}>
                  {hearts === 5 ? "full" : (
                      <div className="flex items-center">
                          <Image src={'/points.svg'} alt="point" height={20} width={20} />
                          <p className="">{ POINT_TO_REFILL}</p>
                      </div>
                  )}
              </Button>
          </div>
          <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
              <Image src={'/unlimited.svg'} width={60} height={60} alt='unlimited' />
              <div className="flex-1">
                  <p className="text-neutral-700 text-base lg:text-xl font-bold">Unlimited Hearts</p>
              </div>
              <Button disabled={pending || hasActiveSubcription} onClick={onUpgrade} >
                  {hasActiveSubcription ? "settings" : "upgrade"}
              </Button>
          </div>
    </ul>
  )
}

export default ShopItems