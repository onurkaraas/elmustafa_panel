"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase/config"

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onCategoryAdded: (category: string) => void
}

export function AddCategoryModal({ isOpen, onClose, onCategoryAdded }: AddCategoryModalProps) {
  const [categoryLabel, setCategoryLabel] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (categoryLabel.trim()) {
      setIsLoading(true)
      try {
        const docRef = await addDoc(collection(db, "categories"), {
          label: categoryLabel.trim(),
          value: "",
          createdAt: new Date(),
        })
        console.log("Category added with ID: ", docRef.id)
        onCategoryAdded(categoryLabel.trim())
        setCategoryLabel("")
        onClose()
      } catch (error) {
        console.error("Error adding category: ", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yeni Kategori Ekle</DialogTitle>
          <DialogDescription>Yeni bir kategori eklemek için aşağıdaki formu doldurun.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="label" className="text-right">
                Kategori Adı
              </label>
              <Input
                id="label"
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Ekleniyor..." : "Ekle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

