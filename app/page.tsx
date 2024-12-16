import Kbd from "@/components/code";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-black justify-center min-h-screen">
      <div className="flex gap-10">
        <Image src="/next.svg" width={200} height={200} alt="logo" />
        <Image src="/firebase.svg" width={200} height={200} alt="logo" />
      </div>
      <div className=" text-text-50 mb-8 w-full flex items-center justify-center">
        <p>Edit</p>
        <Kbd text="page.tsx" classname="mx-2" />
        <p>to edit this interface.</p>
      </div>
      <div className="w-1/5 flex items-center justify-around">
        <Link href="/login">
          <button className="bg-accent-100 w-[100px] p-2 rounded-md hover:bg-accent-50 transition-colors duration-200 ease-in-out">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="border-accent-50 border-2 text-text-50 w-[100px] p-2 rounded-md hover:bg-accent-50 hover:text-black transition-colors duration-200 ease-in-out">
            Sign Up
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
