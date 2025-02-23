import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface StreamCardProps {
  title: string
  platform: string
  duration: string
  viewers: number
  status: "live" | "completed"
  videoId?: string
  onAction: () => void
}

function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

export default function StreamCard({ title, platform, duration, viewers, status, videoId, onAction }: StreamCardProps) {
  const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId) : "/placeholder.svg"

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={thumbnailUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to medium quality thumbnail if maxresdefault is not available
              const img = e.target as HTMLImageElement
              if (videoId && img.src.includes("maxresdefault")) {
                img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
              }
            }}
          />
          {status === "live" && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">LIVE</div>
          )}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">{duration}</div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-1 line-clamp-2">{title}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-muted-foreground">
            <div>{platform}</div>
            <div>{viewers} viewers</div>
          </div>
          <Button
            variant="secondary"
            className={`${
              status === "live" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white`}
            onClick={onAction}
          >
            {status === "live" ? "Manage" : "View"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

