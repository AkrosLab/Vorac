import { ShirtIcon } from "lucide-react"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link
      href="#"
      prefetch={false}
      className="flex items-center text-[#0a0a0a] hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/20 focus-visible:ring-offset-2"
      aria-label="Home"
    >
      <ShirtIcon className="h-5 w-5" />
    </Link>
  )
}
