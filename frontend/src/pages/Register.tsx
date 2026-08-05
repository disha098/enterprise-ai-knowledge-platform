import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import AuthLayout from "../components/layout/AuthLayout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { authService } from "../services/auth.service";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        full_name: fullName,
        email,
        password,
      });

      alert("Registration successful!");

      navigate("/");

    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your Enterprise AI account."
    >
      <Card>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Google */}

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 font-medium hover:bg-slate-50 transition"
          >
            Continue with Google
          </button>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-300" />
            <span className="text-sm text-slate-500">
              OR
            </span>
            <div className="h-px flex-1 bg-slate-300" />
          </div>

          <Input
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-[42px] text-slate-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirm Password"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-[42px] text-slate-500"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <Button
            type="submit"
            loading={loading}
          >
            Create Account
          </Button>

          <div className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign In
            </Link>
          </div>
        </form>
      </Card>
    </AuthLayout>
  );
}