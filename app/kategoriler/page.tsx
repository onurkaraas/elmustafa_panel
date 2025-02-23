"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import Sidebar from "../components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"
import { AddCategoryModal } from "../components/add-category-modal"
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase/config"

interface Category {
  id: string
  label: string
  value: string
  createdAt: Date
}

export default function KategorilerPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      fetchCategories()
    }
  }, [user, loading, router])

  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const categoriesRef = collection(db, "categories")
      const q = query(categoriesRef, orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const fetchedCategories: Category[] = []
      querySnapshot.forEach((doc) => {
        fetchedCategories.push({
          id: doc.id,
          label: doc.data().label,
          value: doc.data().value,
          createdAt: doc.data().createdAt.toDate(),
        })
      })
      setCategories(fetchedCategories)
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCategory = (newCategory: string) => {
    fetchCategories() // Refetch categories after adding a new one
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm("Bu kategoriyi silmek istediğinizden emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "categories", categoryId))
        setCategories(categories.filter((category) => category.id !== categoryId))
      } catch (error) {
        console.error("Error deleting category:", error)
      }
    }
  }

  if (loading || isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 bg-[#f8f9fa]">
        <div className="max-w-[1000px] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1b4332]">Kategoriler</h1>
            <Button
              className="bg-[#2d6a4f] hover:bg-[#1b4332] text-white"
              onClick={() => setIsAddCategoryModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Kategori Ekle
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mevcut Kategoriler</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kategori Adı</TableHead>
                    <TableHead>Değer</TableHead>
                    <TableHead>Oluşturulma Tarihi</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.label}</TableCell>
                      <TableCell>{category.value || "-"}</TableCell>
                      <TableCell>{category.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onCategoryAdded={handleAddCategory}
      />
    </div>
  )
}

