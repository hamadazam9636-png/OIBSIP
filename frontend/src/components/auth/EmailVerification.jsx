import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, XCircle, LoaderCircle } from "lucide-react";

function EmailVerification() {
  const { token } = useParams();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/verify-email/${token}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setStatus("success");
        setMessage(data.message);
      } catch (error) {
        setStatus("error");
        setMessage(error.message);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-dark-950 px-5 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center">

        {status === "loading" && (
          <>
            <LoaderCircle
              className="mx-auto animate-spin text-pizza-orange"
              size={45}
            />

            <h1 className="mt-6 text-2xl font-black">
              Verifying your email...
            </h1>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle
              className="mx-auto text-emerald-400"
              size={55}
            />

            <h1 className="mt-6 text-2xl font-black">
              Email Verified!
            </h1>

            <p className="mt-3 text-sm text-white/40">
              {message}
            </p>

            <Link
              to="/login"
              className="mt-7 inline-flex rounded-xl bg-pizza-red px-6 py-3 text-sm font-bold"
            >
              Go to Login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle
              className="mx-auto text-red-400"
              size={55}
            />

            <h1 className="mt-6 text-2xl font-black">
              Verification Failed
            </h1>

            <p className="mt-3 text-sm text-white/40">
              {message}
            </p>

            <Link
              to="/register"
              className="mt-7 inline-flex rounded-xl bg-pizza-red px-6 py-3 text-sm font-bold"
            >
              Back to Register
            </Link>
          </>
        )}

      </div>
    </main>
  );
}

export default EmailVerification;