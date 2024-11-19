import { notFound, redirect } from "next/navigation";
import { EmptyState } from "../components/EmptyState";
import { auth } from "../lib/auth";
import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function DashboardPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="You have no Event Types"
          description="You can create your first event type by clicking the button below!"
          buttonText="Add event type"
          href="/dashboard/new"
        />
      ) : (
        <p>yes data</p>
      )}
    </>
  );
}
