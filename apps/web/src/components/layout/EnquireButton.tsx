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
      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded border border-slate-700/80 bg-[#0d1c2d] hover:bg-[#132438] text-white font-medium text-[11.5px] uppercase tracking-[0.1em] transition-colors ${className}`}
    >
      <MessageCircle aria-hidden="true" className="size-4 text-emerald-400" />
      <span>{label}</span>
    </a>
  )
}
