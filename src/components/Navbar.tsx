import { buttonVariants } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  //  this uses the server side to get the user (with async function)
  // const { getUser } = getKindeServerSession();
  // const user = await getUser();

  //  this uses the client side to get the user (without async function)
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  console.log(user);

  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/">
        <h1 className="text-3xl font-bold tracking-tight">
          Blog<span className="text-teal-700">Post</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <div className="hidden items-center sm:flex">
          <Link
            href="/dashboard"
            className="text-sm font-semibold transition-colors hover:text-teal-700"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.picture ? (
                <>
                  <Image
                    src={user.picture}
                    width={32}
                    height={32}
                    className="aspect-square w-full rounded-md object-cover"
                    alt=""
                  />
                </>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-200">
                  <span className="font-bold text-black uppercase">
                    {user.given_name?.slice(0, 2)}
                  </span>
                </div>
              )}

              <LogoutLink className={buttonVariants({ variant: "default" })}>
                Log out
              </LogoutLink>
            </>
          ) : (
            <>
              <LoginLink className={buttonVariants({ variant: "default" })}>
                Login
              </LoginLink>

              <RegisterLink
                className={buttonVariants({ variant: "secondary" })}
              >
                Sign Up
              </RegisterLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
