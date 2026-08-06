import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Backend integration comes later
    setSubmitted(true);
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email address to receive a password reset link."
    >
      <Card>
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <Button type="submit">
              Send Reset Link
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-blue-600 hover:underline"
              >
                ← Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <div className="text-5xl">
              ✅
            </div>

            <h2 className="text-2xl font-semibold">
              Check your email
            </h2>

            <p className="text-slate-600">
              If an account exists with this email,
              a password reset link has been sent.
            </p>

            <Link
              to="/login"
              className="inline-block text-blue-600 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        )}
      </Card>
    </AuthLayout>
  );
}