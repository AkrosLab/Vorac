import { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const PolicyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollArea className="max-w-4xl mx-auto p-6">
      <Button asChild variant="outline" className="mb-6 border-[#0a0a0a]/[0.12] uppercase tracking-[0.1em] text-sm font-light">
        <Link href="/">
          <ArrowLeft />
          Back
        </Link>
      </Button>

      <Card className="border-[#0a0a0a]/[0.08]">
        <CardContent className="space-y-6 pt-6">{children}</CardContent>
      </Card>
    </ScrollArea>
  )
}

export default PolicyLayout
