import useRequireAuth from "hooks/useRequireAuth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Dashboard = () => {
  const auth = useRequireAuth();
  const router = useRouter();

  useEffect(() => {
    // only allow admin to access this page
    if (auth.isAdmin === undefined) {
      router.push("/");
    }
  }, [auth, router]);

  return (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam at accusantium nisi qui autem amet, temporibus
      mollitia corrupti. Ex nemo earum iusto. Quos iure rem pariatur temporibus eveniet, reiciendis quo.
    </p>
  );
};

export default Dashboard;
