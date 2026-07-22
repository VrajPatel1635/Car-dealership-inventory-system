import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../hooks/useAuth";
import { AuthForm, AuthHeader, PasswordInput } from "../components/auth";
import { Input, Button, Alert } from "../components/ui";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
      password: location.state?.password || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setServerError("");
      const user = await login(data);

      // Navigate based on role
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
    <div className="card w-full p-8">
      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to your account to continue"
      />

      {serverError && (
        <Alert variant="error" className="mb-6">
          {serverError}
        </Alert>
      )}

      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-2"
          loading={isLoading}
        >
          Sign In
        </Button>
      </AuthForm>

      <div className="mt-6 text-center text-body-sm-size text-muted">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-primary hover:underline font-medium"
        >
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
