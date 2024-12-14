import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Next Firebase</h1>
      <p className="text-xl text-gray-600 mb-8">
        Get started with Next.js and Firebase template for you fullstack app.
      </p>
      <div className="space-x-4">
        <Link
          href="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
