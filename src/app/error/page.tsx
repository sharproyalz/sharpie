import Link from "next/link";

export default function ErrorPage() {
  return (
    <>
      <div className="flex h-[100vh] flex-col items-center justify-center font-merriweather text-white">
        <div className="text-8xl">404</div>
        <div className="text-4xl">
          This page is playing hide and seek, and it&apos;s winning.
        </div>
        <Link href={"/"} className="mt-8 rounded-sm bg-primary p-2 text-2xl">
          Go Back
        </Link>
      </div>
    </>
  );
}
