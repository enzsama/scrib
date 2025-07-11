"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/zod/authSchema";
import { signIn, signUp } from "@/lib/auth-client";
import { ErrorContext } from "@better-fetch/fetch";
import providers from "@/lib/providers";
import { useRouter } from "next/navigation";

const SignupForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    startTransition(async () => {
      await signUp.email(
        {
          name: values.name,
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            form.reset();
            toast({
              title: "Verification email sent",
              description:
                "A verification email has been sent. Please check your email",
              variant: "success",
            });
          },
          onError: (ctx: ErrorContext) => {
            switch (ctx.error.status) {
              case 409:
                form.reset();
                toast({
                  title: "Email already exists",
                  description:
                    "Email already exists. Please try again with a different email or log in.",
                  variant: "destructive",
                });
                break;
              case 400:
                form.reset();
                toast({
                  description: "Invalid credentials. Please try again",
                  variant: "destructive",
                });
                break;
              case 429:
                toast({
                  description: "Too many requests. Please try again later.",
                  variant: "destructive",
                });
              default:
                console.log("Error: ", ctx.error.message);
                toast({
                  description: "Could not sign up. Please try again",
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
            console.log("Error: ", ctx.error.message);
            toast({
              title: "Couldn't sign in.",
              description: `Could not sign in with ${provider}, Please try again`,
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
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Sign in with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full"
                disabled={isPending}
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
                    {["name", "email", "password", "confirmPassword"].map(
                      (field) => (
                        <FormField
                          key={field}
                          control={form.control}
                          name={field as keyof z.infer<typeof signupSchema>}
                          render={({ field: fieldProps }) => (
                            <FormItem className="grid gap-2 text-left">
                              <FormLabel htmlFor={field}>
                                {field === "confirmPassword"
                                  ? "Confirm Password"
                                  : field.charAt(0).toUpperCase() +
                                    field.slice(1)}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type={
                                    field.includes("assword")
                                      ? "password"
                                      : field === "email"
                                        ? "email"
                                        : "text"
                                  }
                                  placeholder={
                                    field === "name"
                                      ? "John Doe"
                                      : field === "email"
                                        ? "johndoe@example.com"
                                        : field == "password"
                                          ? "At least 8 characters"
                                          : undefined
                                  }
                                  {...fieldProps}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )
                    )}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending}
                    >
                      Sign up
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      href={"/login"}
                      className="underline underline-offset-4"
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
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

export default SignupForm;
