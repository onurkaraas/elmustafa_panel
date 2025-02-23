'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Sidebar from './components/sidebar';
import { useAuth } from './contexts/AuthContext';
import VideoCard from './components/video-card';
import { EditVideoModal, type VideoData } from './components/edit-video-modal';

const emptyVideoData: VideoData = {
  title: '',
  description: '',
  category: '',
  videoUrl: '',
  videoType: 'youtube',
  thumbnail: null,
  status: 'draft',
  views: 0,
};

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      fetchVideos();
    }
  }, [user, loading, router]);

  const fetchVideos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'videos'));
      const videosList: VideoData[] = [];
      querySnapshot.forEach(doc => {
        videosList.push({ id: doc.id, ...doc.data() } as VideoData);
      });
      setVideos(videosList);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleEditVideo = (video: VideoData) => {
    setEditingVideo(video);
    setIsEditModalOpen(true);
  };

  const handleRemoveVideo = async (id: string) => {
    try {
      const videoRef = doc(db, 'videos', id);
      await deleteDoc(videoRef);
      setVideos(videos.filter(video => video.id !== id));
    } catch (error) {
      console.error('Error removing video:', error);
    }
  };

  const filteredVideos = videos.filter(
    video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSaveVideo = async (videoData: VideoData) => {
    try {
      if (editingVideo && editingVideo.id) {
        // Update existing video
        const videoRef = doc(db, 'videos', editingVideo.id);
        await updateDoc(videoRef, {
          title: videoData.title,
          description: videoData.description,
          category: videoData.category,
          videoUrl: videoData.videoUrl,
          videoType: videoData.videoType,
          thumbnail: videoData.thumbnail,
          status: videoData.status,
        });

        // Update local state
        setVideos(videos.map(v => (v.id === editingVideo.id ? { ...v, ...videoData } : v)));
      } else {
        // Add new video
        const newVideo = {
          ...videoData,
          views: 0,
          createdAt: new Date(),
        };
        const docRef = await addDoc(collection(db, 'videos'), newVideo);
        setVideos([...videos, { id: docRef.id, ...newVideo }]);
      }

      setIsEditModalOpen(false);
      setEditingVideo(null);
    } catch (error) {
      console.error('Error saving video:', error);
    }
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a237e]">İçerik Kütüphanesi</h1>
            <div className="flex w-full sm:w-auto items-center gap-2">
              <div className="relative flex-1 sm:flex-initial">
                <Input
                  placeholder="İçerik ara..."
                  className="pl-9 w-full sm:w-[300px]"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              <Button
                className="bg-[#f4a261] hover:bg-[#e76f51] text-white"
                onClick={() => {
                  setEditingVideo(emptyVideoData);
                  setIsEditModalOpen(true);
                }}>
                Video Yükle
              </Button>
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <VideoCard
                key={video.id}
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail}
                views={video.views}
                status={video.status}
                videoUrl={video.videoUrl}
                videoType={video.videoType}
                category={video.category}
                onEdit={() => handleEditVideo(video)}
                onRemove={() => handleRemoveVideo(video.id)}
              />
            ))}
          </div>

          {/* Edit Modal */}
          <EditVideoModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingVideo(null);
            }}
            onSave={handleSaveVideo}
            initialData={editingVideo || emptyVideoData}
          />
        </div>
      </main>
    </div>
  );
}
