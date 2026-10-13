import { MessageCircle } from 'lucide-react'

/** "Enquire Now" — opens a WhatsApp chat with the agency in a new tab. */
export function EnquireButton({
  href,
  label,
  className = '',
}: {
  href: string
  label: string
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative group overflow-hidden inline-flex items-center gap-2.5 px-5 py-2.5 rounded bg-gradient-to-r from-[#1bd741] to-[#128c7e] hover:from-[#22e64b] hover:to-[#17a594] text-white font-bold text-[11.5px] uppercase tracking-[0.14em] shadow-[0_0_20px_rgba(37,211,102,0.35)] transition-all hover:scale-105 active:scale-95 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="wa-ring absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
      <MessageCircle aria-hidden="true" className="size-3.5" />
      <span>{label}</span>
    </a>
  )
}
