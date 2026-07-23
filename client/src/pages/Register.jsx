import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { authService } from "../services/auth_service";
import { AuthForm, AuthHeader, PasswordInput } from "../components/auth";
import { Input, Button, Alert } from "../components/ui";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleRegisterSubmit = async (registrationDetails) => {
    try {
      setIsLoading(true);
      setApiError("");
      setSuccessMessage("");

      await authService.register(registrationDetails);

      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login", {
          state: { email: registrationDetails.email },
        });
      }, 2000);
    } catch (error) {
      setApiError(
        error.response?.data?.error || error.message || "Registration failed",
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
        title="Create Account"
        subtitle="Create your account to access the dealership inventory management system."
      />

      {apiError && (
        <Alert variant="error" className="mb-6" icon={<AlertCircle size={18} />}>
          {apiError}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" className="mb-6" icon={<CheckCircle2 size={18} />}>
          {successMessage}
        </Alert>
      )}

      <AuthForm onSubmit={handleSubmit(handleRegisterSubmit)}>
        <Input
          id="register-name"
          label="Name"
          placeholder="Enter your full name"
          error={errors.name?.message}
          className="border-2 border-[var(--border-strong)] focus:border-[var(--primary)]"
          {...register("name")}
        />

        <Input
          id="register-email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          className="border-2 border-[var(--border-strong)] focus:border-[var(--primary)]"
          {...register("email")}
        />

        <PasswordInput
          id="register-password"
          label="Password"
          placeholder="Create a password"
          error={errors.password?.message}
          className="border-2 border-[var(--border-strong)] focus:border-[var(--primary)]"
          {...register("password")}
        />

        <Button
          type="submit"
          className="w-full mt-2 bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] border-none"
          loading={isLoading}
        >
          Register
        </Button>
      </AuthForm>

      <div className="mt-7 text-center text-sm text-foreground-muted">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-foreground hover:text-primary transition-colors duration-[var(--duration-fast)] underline decoration-border hover:decoration-primary underline-offset-4 font-medium cursor-pointer"
        >
          Sign in here
        </Link>
      </div>
    </motion.div>
  );
};

export default Register;
