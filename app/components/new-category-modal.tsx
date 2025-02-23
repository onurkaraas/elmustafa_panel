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

interface NewCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onAddCategory: (category: string) => void
}

export function NewCategoryModal({ isOpen, onClose, onAddCategory }: NewCategoryModalProps) {
  const [newCategory, setNewCategory] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim())
      setNewCategory("")
      onClose()
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
              <label htmlFor="name" className="text-right">
                Kategori Adı
              </label>
              <Input
                id="name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Ekle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

