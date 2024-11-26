"use client";

import { Switch } from "@/components/ui/switch";
import { useEffect, useTransition } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { UpdateEventTypeStatusAction } from "../actions";

export function MenuActiveSwitch({
  initialChecked,
  eventTypeId,
}: {
  initialChecked: boolean;
  eventTypeId: string;
}) {
    const [isPending, startTransition] = useTransition();
  const [state, action] = useFormState(UpdateEventTypeStatusAction, undefined);


  useEffect(() => {
    if(state?.status === "success"){
        toast.success(state.message);
    } else if(state?.status === "error"){
        toast.error(state.error);
    }
  }, [state]);

  return (
    <Switch
      disabled={isPending}
      defaultChecked={initialChecked}
      onCheckedChange={(isChecked) => {
        startTransition(() => {
          action({
            eventTypeId: eventTypeId,
            isChecked: isChecked,
          });
        });
      }}
    />
  );
}
