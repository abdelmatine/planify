import { cancelMeetingAction } from "@/app/actions";
import { EmptyState } from "@/app/components/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { nylas } from "@/app/lib/nylas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  format,
  parse,
  fromUnixTime,
  isBefore,
  addMinutes,
  isAfter,
} from "date-fns";
import { Video } from "lucide-react";
async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });

  return data;
}

export default async function MeetingsRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet."
          buttonText="Create a new event type"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Meetings</CardTitle>
            <CardDescription>Your meetings, Down here!</CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => (
              <form key={item.id} action={cancelMeetingAction}>
                <input type="hidden" name="eventId" value={item.id} />
                <div className="grid grid-cols-3 justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {format(
                        fromUnixTime(item.when.startTime),
                        "EEEE, dd MMM"
                      )}
                    </p>
                    <p className="text-muted-foreground text-sm pt-1">
                      {format(fromUnixTime(item.when.startTime), "hh:mm a")} -
                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center mt-1">
                      <Video className="size-4 mr-2 text-primary" />
                      <a
                        className="text-xs text-primary underline underline-offset-4"
                        href={item.conferencing.details.url}
                        target="_blank"
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {item.participants[0].name}
                    </p>
                  </div>

                  <SubmitButton
                    text="Cancel Event"
                    variant="destructive"
                    className="w-fit flex ml-auto"
                  />
                </div>
                <Separator className="my-3" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}