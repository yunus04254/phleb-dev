import Signup from "@/components/Signup";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div>
      <h1>THIS IS THE SIGNUP PAGE</h1>
      <Signup />

      <Link href="/login">Click here to Login</Link>
    </div>
  );
}