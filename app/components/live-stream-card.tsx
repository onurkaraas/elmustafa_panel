import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Calendar } from "lucide-react"

interface LiveStream {
  id: string
  title: string
  description: string
  scheduledStartTime: Date
  actualStartTime?: Date
  endTime?: Date
  thumbnail: string
  status: "scheduled" | "live" | "ended"
  viewerCount: number
}

interface LiveStreamCardProps {
  stream: LiveStream
}

export default function LiveStreamCard({ stream }: LiveStreamCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image src={stream.thumbnail || "/placeholder.svg"} alt={stream.title} fill className="object-cover" />
          {stream.status === "live" && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">CANLI</div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-1 line-clamp-2">{stream.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{stream.description}</p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {stream.status === "live" ? (
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{stream.viewerCount} izleyici</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formatDate(stream.scheduledStartTime)}</span>
            </div>
          )}
          <Button
            variant="secondary"
            className={stream.status === "live" ? "bg-red-500 hover:bg-red-600 text-white" : ""}
          >
            {stream.status === "live" ? "İzle" : "Hatırlat"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

