import Login from "@/components/Login";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <h1>THIS IS THE LOGIN PAGE</h1>
      <Login />

      <Link href="/signup">Click here to Signup</Link>
    </div>
  );
}