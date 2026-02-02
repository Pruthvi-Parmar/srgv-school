import Link from "next/link";
import Image from "next/image";

export function LogoMark({
  title = "Shree Radhagovind Vidyamandir, Ninat",
}: {
  title?: string;
}) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
        <Image
          src="/gallery/New-logo-1.jpeg"
          alt="Shree Radhagovind Vidyamandir logo"
          fill
          sizes="40px"
          className="object-contain p-1"
        />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold text-slate-900 sm:text-base">{title}</div>
        <div className="text-xs text-slate-600">CBSE Affiliated English Medium School · Affiliation No. 430185</div>
      </div>
    </Link>
  );
}


