"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../firebase/config"

interface EditVideoModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (videoData: VideoData) => void
  initialData?: VideoData
}

export interface VideoData {
  id?: string
  title: string
  description: string
  category: string
  videoUrl: string
  videoType: string
  thumbnail?: string | null
  status: string
  views: number
  createdAt?: Date
}

interface Category {
  id: string
  label: string
  value: string
}

const defaultVideoData: VideoData = {
  title: "",
  description: "",
  category: "",
  videoUrl: "",
  videoType: "youtube",
  thumbnail: null,
  status: "draft",
  views: 0,
}

function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export function EditVideoModal({ isOpen, onClose, onSave, initialData }: EditVideoModalProps) {
  const [videoData, setVideoData] = useState<VideoData>(initialData || defaultVideoData)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    setVideoData(initialData || defaultVideoData)
  }, [initialData])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, "categories")
        const categoriesQuery = query(categoriesRef, orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(categoriesQuery)

        const fetchedCategories: Category[] = []
        querySnapshot.forEach((doc) => {
          fetchedCategories.push({
            id: doc.id,
            label: doc.data().label,
            value: doc.data().value,
          })
        })

        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (videoData.videoUrl) {
      const videoId = getYouTubeVideoId(videoData.videoUrl)
      if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`
        setVideoData((prev) => ({ ...prev, thumbnail: thumbnailUrl }))
      }
    }
  }, [videoData.videoUrl])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...videoData,
      createdAt: videoData.createdAt || new Date(),
    }
    onSave(submitData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">
            {initialData?.id ? "Video Düzenle" : "Yeni Video Ekle"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-lg font-semibold">
                  Video Başlığı
                </label>
                <Input
                  id="title"
                  value={videoData.title}
                  onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-lg font-semibold">Kategori</label>
                <Select
                  value={videoData.category}
                  onValueChange={(value) => setVideoData({ ...videoData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.label}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="videoUrl" className="text-lg font-semibold">
                  Video URL
                </label>
                <Input
                  id="videoUrl"
                  value={videoData.videoUrl}
                  onChange={(e) => setVideoData({ ...videoData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-lg font-semibold">
                  Açıklama
                </label>
                <Textarea
                  id="description"
                  value={videoData.description}
                  onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-lg font-semibold">Durum</label>
                <Select
                  value={videoData.status}
                  onValueChange={(value) => setVideoData({ ...videoData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Durum seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Yayında</SelectItem>
                    <SelectItem value="draft">Taslak</SelectItem>
                    <SelectItem value="private">Gizli</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {videoData.thumbnail && (
                <div className="space-y-2">
                  <label className="text-lg font-semibold">Thumbnail Önizleme</label>
                  <img
                    src={videoData.thumbnail || "/placeholder.svg"}
                    alt="Video Thumbnail"
                    className="w-full rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="p-6 pt-0">
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit" className="bg-[#f4a261] hover:bg-[#e76f51] text-white">
              {initialData?.id ? "Güncelle" : "Ekle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

