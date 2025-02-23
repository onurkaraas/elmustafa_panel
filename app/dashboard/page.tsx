"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import Sidebar from "../components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import StreamCard from "../components/stream-card"
import { EditVideoModal, type VideoData } from "../components/edit-video-modal"
import { AddCategoryModal } from "../components/add-category-modal"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../firebase/config"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [streams, setStreams] = useState<VideoData[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)
  const [editingStream, setEditingStream] = useState<VideoData | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      fetchStreams()
    }
  }, [user, loading, router])

  const fetchStreams = async () => {
    try {
      const streamsRef = collection(db, "videos")
      const streamsQuery = query(streamsRef, orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(streamsQuery)
      const streamsList: VideoData[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as VideoData,
      )
      setStreams(streamsList)
    } catch (error) {
      console.error("Error fetching streams:", error)
    }
  }

  const handleEditStream = (stream: VideoData) => {
    setEditingStream(stream)
    setIsEditModalOpen(true)
  }

  const handleSaveStream = async (updatedStream: VideoData) => {
    // Implement the logic to save the updated stream
    // This could involve updating Firestore and the local state
    console.log("Saving stream:", updatedStream)
    await fetchStreams() // Refresh the streams after saving
    setIsEditModalOpen(false)
    setEditingStream(null)
  }

  const handleAddCategory = (newCategory: string) => {
    console.log("New category added:", newCategory)
    // You might want to update some state or refetch categories here
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 bg-[#f8f9fa]">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a237e]">Kontrol Paneli</h1>
            <div className="flex space-x-2">
              <Button
                className="bg-[#2d6a4f] hover:bg-[#1b4332] text-white"
                onClick={() => setIsAddCategoryModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Kategori Ekle
              </Button>
              <Button className="bg-[#1b4332] hover:bg-[#2d6a4f] text-white">Yeni Yayın Başlat</Button>
            </div>
          </div>

          {/* Streams Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>İçerik Kütüphanesi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {streams.map((stream) => (
                  <StreamCard
                    key={stream.id}
                    title={stream.title}
                    description={stream.description}
                    thumbnail={stream.thumbnail}
                    views={stream.views}
                    status={stream.status}
                    videoUrl={stream.videoUrl}
                    videoType={stream.videoType}
                    category={stream.category}
                    onAction={() => handleEditStream(stream)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <EditVideoModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingStream(null)
        }}
        onSave={handleSaveStream}
        initialData={editingStream || undefined}
      />

      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onCategoryAdded={handleAddCategory}
      />
    </div>
  )
}

