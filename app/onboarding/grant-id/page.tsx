import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Gif from "@/public/rascal-almost-there.gif";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";
export default function OnboardingRouteNylas() {
  return (
    <div
      className="min-h-screen w-screen flex items-center
        justify-center"
    >
      <Card>
        <CardHeader>
          <CardTitle>You are almost Done!</CardTitle>
          <CardDescription>
            We have to connect your calendar to your Account
          </CardDescription>
          <Image className="w-full rounded-lg" alt="almost done" src={Gif} />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/api/auth">
              <CalendarCheck2 className="size-4 m-2" />
              Connect Calendar to your Account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
