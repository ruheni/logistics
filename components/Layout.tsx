import React, { ReactNode } from "react";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "../components/ui/button";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  children: ReactNode;
  count?: number;
};

const Layout: React.FC<Props> = (props) => {
  const { user, error, isLoading } = useUser();
  const allowAccess = user && user.email === "rohi.sommiers@gmail.com";
  const router = useRouter();
  const currentPath = router.pathname;

  let linkHref = "/";
  let linkText = "Pendientes";
  let titleText = "Entregas Pendientes";
  let titleClass = "";

  if (currentPath === "/completed") {
    titleText = "Entregas Completadas";
    titleClass = "text-gray-600";
  }

  if (currentPath === "/") {
    linkHref = "/completed";
    linkText = "Completadas";
  }

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>{error.message}</div>;
  let countSpan = null;
  if (props.count !== undefined) {
    countSpan = (
      <span className="text-xs text-yellow-700 ml-4 bg-yellow-100 p-1.5 rounded-lg">
        {props.count}
      </span>
    );
  }

  return allowAccess ? (
    <html lang="es" className="h-full bg-gray-50">
      <Head>
        <title>Entregas ROHI Sommiers</title>
      </Head>
      <main className="relative flex min-h-screen flex-col items-center justify-center">
        <div className="bg-white/30 p-6 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
          <Link href={linkHref}>
            <span className="opacity-80 text-sm hover:underline-offset-4 hover:underline hover:decoration-current cursor-pointer">
              {linkText}
            </span>
          </Link>
          <div className="flex mt-2 justify-between items-center">
            <h2 className={`text-xl sm:text-2xl font-semibold ${titleClass}`}>
              {titleText} {countSpan}
            </h2>
            <Button
              variant="ghost"
              className="text-blue-500 hover:text-blue-700 text-2xl font-light"
            >
              <Link href="/create">+</Link>
            </Button>
          </div>
          <div className="divide-y divide-gray-900/5">{props.children}</div>
        </div>
      </main>
    </html>
  ) : (
    <>
      <main className="relative flex min-h-screen flex-col items-center justify-center">
        <div className="bg-white/30 p-6 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
          <div className="text-center items-center mb-4">
            <h2 className="text:md md:text-xl font-semibold mb-5">
              Entregas - ROHI Sommiers
            </h2>
            <Button>
              <a href="/api/auth/login">Iniciar sesión</a>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
