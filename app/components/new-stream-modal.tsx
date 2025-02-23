'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

interface NewStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStreamAdded: () => void;
}

export function NewStreamModal({ isOpen, onClose, onStreamAdded }: NewStreamModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledStartTime, setScheduledStartTime] = useState('');
  const [scheduledEndTime, setScheduledEndTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && scheduledStartTime && scheduledEndTime) {
      setIsLoading(true);
      try {
        await addDoc(collection(db, 'live_streams'), {
          title,
          description,
          scheduledStartTime: new Date(scheduledStartTime),
          scheduledEndTime: new Date(scheduledEndTime),
          status: 'scheduled',
          viewerCount: 0,
          thumbnail: '/placeholder.svg', // You might want to add thumbnail upload functionality later
          createdAt: new Date(),
        });
        onStreamAdded();
        onClose();
        setTitle('');
        setDescription('');
        setScheduledStartTime('');
        setScheduledEndTime('');
      } catch (error) {
        console.error('Error adding new stream: ', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yeni Yayın Planla</DialogTitle>
          <DialogDescription>
            Yeni bir canlı yayın planlamak için aşağıdaki formu doldurun.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Başlık
              </label>
              <Input
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Açıklama
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="scheduledStartTime" className="text-right">
                Başlangıç Zamanı
              </label>
              <Input
                id="scheduledStartTime"
                type="datetime-local"
                value={scheduledStartTime}
                onChange={e => setScheduledStartTime(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="scheduledEndTime" className="text-right">
                Bitiş Zamanı
              </label>
              <Input
                id="scheduledEndTime"
                type="datetime-local"
                value={scheduledEndTime}
                onChange={e => setScheduledEndTime(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Ekleniyor...' : 'Yayın Planla'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
