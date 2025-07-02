import { Mail } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className=" border-t border-[#1a1a1a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-4 md:py-4">
                    <div className=" flex justify-center items-center gap-[8] text-center ">
                        <Mail className="h-[14px] w-[14px] text-[#a2cb01]"/>
                        <p className="ml-2 text-xs font-medium tracking-wide">
                            yeaminfoysal14@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}