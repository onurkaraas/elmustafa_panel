import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface VideoCardProps {
  title: string
  description: string
  thumbnail: string | null
  views: number
  status: string
  videoUrl: string
  videoType: string
  category: string
  onEdit: () => void
  onRemove: () => void
}

export default function VideoCard({
  title,
  description,
  thumbnail,
  views,
  status,
  videoUrl,
  videoType,
  category,
  onEdit,
  onRemove,
}: VideoCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image src={thumbnail || "/placeholder.svg"} alt={title} fill className="object-cover" />
          {status !== "published" && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
              {status === "draft" ? "Taslak" : "Gizli"}
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
            {videoType === "youtube" ? "YouTube" : "Diğer"}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
          <span>{views} görüntülenme</span>
          <span>•</span>
          <span>{category}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        <Button variant="secondary" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white" onClick={onEdit}>
          Düzenle
        </Button>
        <Button variant="secondary" className="flex-1 bg-red-500 hover:bg-red-600 text-white" onClick={onRemove}>
          Yayından Kaldir
        </Button>
      </CardFooter>
    </Card>
  )
}

