import { ClipboardCheck } from "lucide-react";
import Link from "next/link";
import NavigationBar from "~/components/navigation-bar";

export default function CheckoutSuccess() {
  return (
    <>
      <div className="flex items-center justify-between gap-8 bg-primary px-4 py-2 text-white_accent">
        <Link href="/" className="font-merriweather text-xl font-medium">
          SHARPIE
        </Link>
      </div>
      <main className="mx-auto my-0 mt-28 flex max-w-screen-lg flex-col items-center justify-center gap-8">
        <div className="font-merriweather text-4xl text-white_accent">
          Placed Order Successfully.
        </div>
        <div className="text-white_accent">
          <ClipboardCheck height={200} width={200} />
        </div>
        <Link
          href={"/"}
          className="rounded-sm bg-primary px-4 py-2 font-merriweather font-bold text-white_accent"
        >
          DONE
        </Link>
      </main>
    </>
  );
}
