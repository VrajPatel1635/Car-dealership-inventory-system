import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, useReducedMotion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { AuthForm, AuthHeader, PasswordInput } from "../components/auth";
import { Input, Button, Alert } from "../components/ui";
import { AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: location.state?.email || "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setServerError("");
      const user = await login(data);

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/inventory");
      }
    } catch (error) {
      setServerError(
        error.response?.data?.error || error.message || "Login failed",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
      className="w-full p-8 sm:p-10 bg-surface border border-border rounded-3xl"
      style={{ boxShadow: "var(--shadow-xl)" }}
    >
      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to continue managing your dealership inventory."
      />

      {serverError && (
        <Alert variant="error" className="mb-6" icon={<AlertCircle size={18} />}>
          {serverError}
        </Alert>
      )}

      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="login-email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          className="border-2 border-[var(--border-strong)] focus:border-[var(--primary)]"
          {...register("email")}
        />

        <div className="flex flex-col gap-1.5">
          <PasswordInput
            id="login-password"
            label="Password"
            placeholder="Enter your password"
            error={errors.password?.message}
            className="border-2 border-[var(--border-strong)] focus:border-[var(--primary)]"
            {...register("password")}
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-2 bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] border-none"
          loading={isLoading}
        >
          Sign In
        </Button>
      </AuthForm>

      <div className="mt-7 text-center text-sm text-foreground-muted">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-foreground hover:text-primary transition-colors duration-[var(--duration-fast)] underline decoration-border hover:decoration-primary underline-offset-4 font-medium cursor-pointer"
        >
          Register here
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;
