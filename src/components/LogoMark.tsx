import Link from "next/link";
import Image from "next/image";

export function LogoMark({
  title = "Shree Radhagovind Vidyamandir, Ninat",
}: {
  title?: string;
}) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
      {/* Logo image - fixed size, no overflow */}
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
        <Image
          src="/gallery/New-logo-1.jpeg"
          alt="Shree Radhagovind Vidyamandir logo"
          fill
          sizes="40px"
          className="object-contain p-1"
        />
      </div>
      {/* Text container - allows truncation on mobile */}
      <div className="min-w-0 leading-tight">
        <div className="truncate text-sm font-semibold text-slate-900 sm:text-base">{title}</div>
        <div className="hidden text-xs text-slate-600 sm:block">CBSE Affiliated English Medium School · Affiliation No. 430185</div>
        <div className="truncate text-xs text-slate-600 sm:hidden">CBSE Affiliated · No. 430185</div>
      </div>
    </Link>
  );
}


