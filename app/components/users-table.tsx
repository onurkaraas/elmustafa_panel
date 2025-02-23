"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase/config"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  email: string
  name: string
  userType: string
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users")
        const querySnapshot = await getDocs(usersRef)

        const fetchedUsers: User[] = []
        querySnapshot.forEach((doc) => {
          fetchedUsers.push({ id: doc.id, ...doc.data() } as User)
        })

        setUsers(fetchedUsers)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  const handleUserTypeChange = async (userId: string, newUserType: string) => {
    try {
      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, { userType: newUserType })

      setUsers(users.map((user) => (user.id === userId ? { ...user, userType: newUserType } : user)))
    } catch (error) {
      console.error("Error updating user type:", error)
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ad</TableHead>
          <TableHead>E-posta</TableHead>
          <TableHead>Kullanıcı Tipi</TableHead>
          <TableHead>İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Select value={user.userType} onValueChange={(value) => handleUserTypeChange(user.id, value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Kullanıcı Tipi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editör</SelectItem>
                  <SelectItem value="user">Kullanıcı</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                Düzenle
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

