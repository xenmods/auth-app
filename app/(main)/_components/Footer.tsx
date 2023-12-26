import { Github } from "lucide-react";


export async function Footer () {
        return (
                <footer className="bottom-0 left-[100%] right-4 rounded-full bg-slate-50/30 dark:bg-black/30 border-gray-200/60 dark:border-gray-400/10 p-2 z-50 backdrop-blur-md w-[50px] flex flex-col m-3 items-center sticky text-center">
                    <a
                    href="https://github.com/xenmods">
                    <Github className=" text-white rounded-lg hover:text-gray-500 transition-all w-10 h-10" />
                    </a>
                </footer>
            );
}
export default Footer;