import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Loader2, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = trpc.auth.adminLogin.useMutation({
    onSuccess: () => setLocation("/admin"),
    onError: () => setError("اسم المستخدم أو كلمة المرور غير صحيحة."),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    login.mutate({ username, password });
  };

  return (
    <main dir="rtl" className="min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="mx-auto flex min-h-[75vh] max-w-md items-center justify-center">
        <Card className="w-full border-border/70 bg-card/95 shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LockKeyhole className="h-7 w-7" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="text-2xl">دخول لوحة التحكم</CardTitle>
              <CardDescription className="mt-2">هذه الصفحة مخصصة لمالك الموقع فقط.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="admin-username">اسم المستخدم</Label>
                <Input id="admin-username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">كلمة المرور</Label>
                <Input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </div>
              {error && <p role="alert" className="text-sm font-medium text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={login.isPending}>
                {login.isPending ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : null}
                دخول آمن
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setLocation("/")}>
                العودة للموقع
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
