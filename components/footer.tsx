import { Book, File, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-600 text-text-100 py-4 absolute bottom-0 w-full">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <Link href="" className="flex items-center text-xs">
              <Book size={15} className="text-accent-100 mr-1" />
              Docs
            </Link>
            <Link
              href="https://github.com/Grenish/fullstack-app-cli"
              className="flex items-center text-xs"
            >
              <Github size={15} className="text-accent-100 mr-1" />
              GitHub
            </Link>
          </div>

          <p className="text-xs">
            Made with ❤️ by <Link href="https://grenishrai.icu/">Grenish Rai</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
