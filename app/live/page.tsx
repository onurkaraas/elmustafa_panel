'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import LiveStreamCard from '../components/live-stream-card';
import { NewStreamModal } from '../components/new-stream-modal';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

interface LiveStream {
  id: string;
  title: string;
  description: string;
  scheduledStartTime: Date;
  actualStartTime?: Date;
  endTime?: Date;
  thumbnail: string;
  status: 'scheduled' | 'live' | 'ended';
  viewerCount: number;
}

export default function LivePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);
  const [upcomingStreams, setUpcomingStreams] = useState<LiveStream[]>([]);
  const [isNewStreamModalOpen, setIsNewStreamModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      fetchStreams();
    }
  }, [user, loading, router]);

  const fetchStreams = async () => {
    try {
      const streamsRef = collection(db, 'live_streams');

      // Fetch live streams
      const liveQuery = query(streamsRef, orderBy('scheduledStartTime', 'desc'));
      const liveSnapshot = await getDocs(liveQuery);
      const liveStreamsList: LiveStream[] = liveSnapshot.docs.map(
        doc =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as LiveStream,
      );
      setLiveStreams(liveStreamsList);

      // Fetch upcoming streams
      const upcomingQuery = query(
        streamsRef,
        where('status', '==', 'scheduled'),
        orderBy('scheduledStartTime', 'asc'),
      );
      const upcomingSnapshot = await getDocs(upcomingQuery);
      const upcomingStreamsList: LiveStream[] = upcomingSnapshot.docs.map(
        doc =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as LiveStream,
      );
      setUpcomingStreams(upcomingStreamsList);
    } catch (error) {
      console.error('Error fetching streams:', error);
    }
  };

  const handleNewStreamClick = () => {
    setIsNewStreamModalOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a237e]">Canlı Yayınlar</h1>
            <Button
              className="bg-[#f4a261] hover:bg-[#e76f51] text-white"
              onClick={handleNewStreamClick}>
              <Plus className="mr-2 h-4 w-4" /> Yeni Yayın Başlat
            </Button>
          </div>

          <Tabs defaultValue="live" className="space-y-4">
            <TabsList>
              <TabsTrigger value="live">Canlı Yayınlar</TabsTrigger>
              <TabsTrigger value="upcoming">Yaklaşan Yayınlar</TabsTrigger>
            </TabsList>
            <TabsContent value="live" className="space-y-4">
              {liveStreams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {liveStreams.map(stream => (
                    <LiveStreamCard key={stream.id} stream={stream} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      Şu anda aktif canlı yayın bulunmamaktadır.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingStreams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingStreams.map(stream => (
                    <LiveStreamCard key={stream.id} stream={stream} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      Yaklaşan canlı yayın bulunmamaktadır.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <NewStreamModal
        isOpen={isNewStreamModalOpen}
        onClose={() => setIsNewStreamModalOpen(false)}
        onStreamAdded={fetchStreams}
      />
    </div>
  );
}
