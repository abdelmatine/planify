"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { SettingsAction } from "../actions";
import { settingsSchema } from "../lib/zodSchemas";
import { SubmitButton } from "./SubmitButtons";

interface iAppProps {
  fullName: string;
  email: string;
  profileImage: string;
}

export function SettingsForm({ email, fullName, profileImage }: iAppProps) {
  const [lastResult, action] = useFormState(SettingsAction, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account's seetings</CardDescription>
      </CardHeader>

      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input
              name={fields.fullName.name}
              key={fields.fullName.key}
              defaultValue={fullName}
              placeholder="John Wick"
            />
            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input
              disabled
              defaultValue={email}
              placeholder="example@email.com"
            />
          </div>
          <div className="grid gap-y-5">
            <Label>Profile Image</Label>
            {currentProfileImage ? (
              <div className="relative size-24">
                <img
                  src={currentProfileImage}
                  alt="Profile Image"
                  className="size-24 rounded-lg"
                />

                <Button
                  onClick={handleDeleteImage}
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-3 -right-3"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <h1>Keine Image</h1>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
