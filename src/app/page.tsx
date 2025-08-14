
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/chat");
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary">
              <MessageSquareText className="size-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle>Welcome to ஃப்ரீயா</CardTitle>
          <CardDescription>
            Enter your phone number below to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center">
                <span className="flex h-10 items-center rounded-l-md border border-r-0 border-input bg-secondary px-3 text-sm text-muted-foreground">
                  +91
                </span>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="98765 43210"
                  required
                  className="rounded-l-none"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
