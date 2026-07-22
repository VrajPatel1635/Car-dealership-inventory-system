import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  const [serverError, setServerError] = useState("");
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

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setServerError("");
      setSuccessMessage("");

      await authService.register(data);

      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login", {
          state: { email: data.email, password: data.password },
        });
      }, 2000);
    } catch (error) {
      setServerError(
        error.response?.data?.error || error.message || "Registration failed",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card w-full p-8">
      <AuthHeader
        title="Create an Account"
        subtitle="Join us to manage your inventory"
      />

      {serverError && (
        <Alert variant="error" className="mb-6">
          {serverError}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" className="mb-6">
          {successMessage}
        </Alert>
      )}

      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          placeholder="Enter your full name"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name")}
        />

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
          placeholder="Create a password"
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
          Register
        </Button>
      </AuthForm>

      <div className="mt-6 text-center text-body-sm-size text-muted">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline font-medium">
          Sign in here
        </Link>
      </div>
    </div>
  );
};

export default Register;
