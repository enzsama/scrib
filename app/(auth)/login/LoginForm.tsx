"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/zod/authSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/lib/auth-client";
import { ErrorContext } from "@better-fetch/fetch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import providers from "@/lib/providers";

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      await signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (ctx: ErrorContext) => {
            switch (ctx.error.status) {
              case 400:
                form.reset();
                toast({
                  description: "Invalid credentials. Please try again.",
                  variant: "destructive",
                });
                break;
              case 401:
                toast({
                  title: "Incorrect credentials",
                  description: "Email or password is incorrect",
                  variant: "destructive",
                });
                break;
              case 403:
                form.reset();
                toast({
                  title: "Email address is unverified",
                  description: "Please verify your email address.",
                  variant: "destructive",
                });
                break;
              case 404:
                form.reset();
                toast({
                  title: "User not found",
                  description:
                    "A user with this email does not exist. Please sign up.",
                  variant: "destructive",
                });
                break;
              case 429:
                toast({
                  description: "Too many requests. Please try again later.",
                  variant: "destructive",
                });
                break;
              default:
                console.log("Error: ", ctx.error.message);
                toast({
                  description: "Something went wrong. Please try again.",
                  variant: "destructive",
                });
            }
          },
        }
      );
    });
  };

  const handleSocialSignIn = (provider: providers) => () => {
    startTransition(async () => {
      await signIn.social(
        {
          provider: provider,
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (ctx: ErrorContext) => {
            toast({
              title: "Couldn't sign in",
              description: `Could not sign in with ${provider}. Please try again`,
              variant: "destructive",
            });
          },
        }
      );
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Sign in with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleSocialSignIn("google")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    {["email", "password"].map((field) => (
                      <FormField
                        key={field}
                        control={form.control}
                        name={field as keyof z.infer<typeof loginSchema>}
                        render={({ field: fieldProps }) => (
                          <FormItem className="grid gap-2 text-left">
                            <div className="flex">
                              <FormLabel htmlFor={field}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                              </FormLabel>
                              {field === "password" && (
                                <Link
                                  href={"/forgot-password"}
                                  className="ml-auto text-sm text-gray-500 underline-offset-4 hover:underline"
                                >
                                  Forgot your password?
                                </Link>
                              )}
                            </div>
                            <FormControl>
                              <Input
                                type={field === "email" ? "email" : "password"}
                                placeholder={
                                  field === "email"
                                    ? "m@example.com"
                                    : undefined
                                }
                                {...fieldProps}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href={"/signup"} className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default LoginForm;
