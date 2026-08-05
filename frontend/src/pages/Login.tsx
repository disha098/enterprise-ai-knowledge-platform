import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import AuthLayout from "../components/layout/AuthLayout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { authService } from "../services/auth.service";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await authService.login({
        email,
        password,
      });

      login(
        data.access_token,
        data.user,
      );

      console.log("Remember Me:", rememberMe);

      navigate("/dashboard");

    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue to your workspace."
    >
      <Card>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Google Login */}

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 font-medium hover:bg-slate-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />

            Continue with Google
          </button>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-300" />

            <span className="text-sm text-slate-500">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-300" />
          </div>

          {/* Email */}

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          {/* Password */}

          <div className="space-y-2">

            <label className="text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative">

              <Input
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Remember Me + Forgot Password */}

          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm text-slate-600">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
                className="rounded"
              />

              Remember me

            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Error */}

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Login */}

          <Button
            type="submit"
            loading={loading}
          >
            Sign In
          </Button>

          {/* Register */}

          <div className="text-center text-sm text-slate-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Create Account
            </Link>

          </div>

        </form>

      </Card>
    </AuthLayout>
  );
}