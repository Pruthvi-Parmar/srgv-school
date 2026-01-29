import type { ReactNode } from "react";

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function WhatsAppLink({
  phone,
  variant = "chip",
  children,
}: {
  phone: string;
  variant?: "chip" | "icon";
  children?: ReactNode;
}) {
  const digits = normalizePhone(phone);
  const href = `https://wa.me/91${digits}`;

  if (variant === "icon") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 p-2 text-emerald-700 hover:bg-emerald-100"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <svg className="h-4 w-4" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.38c-.27-.13-1.57-.77-1.81-.86-.24-.09-.42-.13-.6.13-.18.27-.69.86-.84 1.04-.16.18-.31.2-.58.07-.27-.13-1.12-.41-2.13-1.31-.79-.7-1.32-1.56-1.48-1.83-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.46.13-.15.18-.27.27-.44.09-.18.04-.33-.02-.46-.07-.13-.6-1.44-.82-1.97-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.46.07-.7.33-.24.27-.92.9-.92 2.2 0 1.3.94 2.56 1.07 2.74.13.18 1.85 2.82 4.49 3.95.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.08 1.57-.64 1.79-1.26.22-.62.22-1.15.15-1.26-.06-.11-.24-.18-.51-.31z" />
          <path d="M16.04 3C9.41 3 4 8.41 4 15.04c0 2.33.67 4.5 1.83 6.33L4 29l7.83-1.79a12 12 0 0 0 4.21.75c6.63 0 12.04-5.41 12.04-12.04C28.08 8.41 22.67 3 16.04 3zm0 22.02c-1.38 0-2.72-.27-3.98-.8l-.29-.12-4.64 1.06 1.03-4.52-.19-.29a9.98 9.98 0 0 1-1.55-5.31c0-5.51 4.48-9.99 9.99-9.99s9.99 4.48 9.99 9.99-4.48 9.99-9.99 9.99z" />
        </svg>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
      aria-label="WhatsApp"
      title="WhatsApp"
    >
      <svg className="h-4 w-4" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.38c-.27-.13-1.57-.77-1.81-.86-.24-.09-.42-.13-.6.13-.18.27-.69.86-.84 1.04-.16.18-.31.2-.58.07-.27-.13-1.12-.41-2.13-1.31-.79-.7-1.32-1.56-1.48-1.83-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.46.13-.15.18-.27.27-.44.09-.18.04-.33-.02-.46-.07-.13-.6-1.44-.82-1.97-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.46.07-.7.33-.24.27-.92.9-.92 2.2 0 1.3.94 2.56 1.07 2.74.13.18 1.85 2.82 4.49 3.95.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.08 1.57-.64 1.79-1.26.22-.62.22-1.15.15-1.26-.06-.11-.24-.18-.51-.31z" />
        <path d="M16.04 3C9.41 3 4 8.41 4 15.04c0 2.33.67 4.5 1.83 6.33L4 29l7.83-1.79a12 12 0 0 0 4.21.75c6.63 0 12.04-5.41 12.04-12.04C28.08 8.41 22.67 3 16.04 3zm0 22.02c-1.38 0-2.72-.27-3.98-.8l-.29-.12-4.64 1.06 1.03-4.52-.19-.29a9.98 9.98 0 0 1-1.55-5.31c0-5.51 4.48-9.99 9.99-9.99s9.99 4.48 9.99 9.99-4.48 9.99-9.99 9.99z" />
      </svg>
      {children ?? "WhatsApp"}
    </a>
  );
}
