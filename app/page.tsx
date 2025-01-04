import { redirect } from "next/navigation";

export default async function Home() {
  const isLogin = true;

  if (isLogin) {
    redirect("/connected-users");
  }

  return <div>login</div>;
}
