import { useAuth } from "contexts/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useRequireAuth() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user === false) {
      router.push("/signin");
    }
  }, [auth, router]);

  return auth;
}
