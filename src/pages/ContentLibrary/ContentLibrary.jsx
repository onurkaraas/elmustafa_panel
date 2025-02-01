import React, { useState, useEffect } from 'react';
import './ContentLibrary.css';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config'; // Make sure you have this firebase config file

function ContentLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newVideo, setNewVideo] = useState({
    title: '',
    category: 'tefsir',
    description: '',
    videoUrl: '',
    videoType: 'youtube',
    thumbnail: null,
  });

  const categories = [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'tefsir', label: 'Tefsir' },
    { value: 'fikih', label: 'Fıkıh' },
    { value: 'hadis', label: 'Hadis' },
    { value: 'dil', label: 'Dil Eğitimi' },
    { value: 'tarih', label: 'Tarih' },
  ];

  const sortOptions = [
    { value: 'latest', label: 'En Yeni' },
    { value: 'oldest', label: 'En Eski' },
    { value: 'views', label: 'En Çok İzlenen' },
  ];

  const videoTypes = [
    { value: 'youtube', label: 'YouTube' },
    { value: 'vimeo', label: 'Vimeo' },
  ];

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const videosRef = collection(db, 'videos');
      const q = query(videosRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const videosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
      }));

      setVideos(videosData);
    } catch (error) {
      console.error('Error fetching videos:', error);
      alert('Videolar yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = videos
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'views') return b.views - a.views;
      return 0;
    });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewVideo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = e => {
    const { name, files } = e.target;
    setNewVideo(prev => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleUploadSubmit = async e => {
    e.preventDefault();
    try {
      const videoData = {
        title: newVideo.title,
        category: newVideo.category,
        description: newVideo.description,
        videoUrl: newVideo.videoUrl,
        videoType: newVideo.videoType,
        thumbnail: newVideo.thumbnail,
        views: 0,
        createdAt: serverTimestamp(),
        status: 'draft',
      };

      await addDoc(collection(db, 'videos'), videoData);

      // Fetch updated videos
      await fetchVideos();

      setIsUploadModalOpen(false);
      setNewVideo({
        title: '',
        category: 'tefsir',
        description: '',
        videoUrl: '',
        videoType: 'youtube',
        thumbnail: null,
      });

      alert('Video başarıyla kaydedildi!');
    } catch (error) {
      console.error('Error adding video:', error);
      alert('Video kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">İçerik Kütüphanesi</h1>
        <div className="header-actions">
          <input type="search" placeholder="İçerik ara..." className="search-input" />
          <button className="primary-btn" onClick={() => setIsUploadModalOpen(true)}>
            Video Yükle
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Yeni Video Yükle</h2>
            <form onSubmit={handleUploadSubmit}>
              <div className="form-group">
                <label htmlFor="title">Video Başlığı</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newVideo.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="videoType">Video Platformu</label>
                <select
                  id="videoType"
                  name="videoType"
                  value={newVideo.videoType}
                  onChange={handleInputChange}>
                  {videoTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="videoUrl">Video URL</label>
                <input
                  type="url"
                  id="videoUrl"
                  name="videoUrl"
                  value={newVideo.videoUrl}
                  onChange={handleInputChange}
                  placeholder={
                    newVideo.videoType === 'youtube'
                      ? 'https://www.youtube.com/watch?v=...'
                      : 'https://vimeo.com/...'
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Kategori</label>
                <select
                  id="category"
                  name="category"
                  value={newVideo.category}
                  onChange={handleInputChange}>
                  {categories
                    .filter(cat => cat.value !== 'all')
                    .map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Açıklama</label>
                <textarea
                  id="description"
                  name="description"
                  value={newVideo.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="thumbnail">Küçük Resim</label>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div> */}
              <div className="modal-actions">
                <button type="button" onClick={() => setIsUploadModalOpen(false)}>
                  İptal
                </button>
                <button type="submit" className="primary-btn">
                  Yükle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="content-filters">
        <select
          className="filter-select"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}>
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="content-grid">
        {loading ? (
          <div className="loading">Yükleniyor...</div>
        ) : filteredContent.length === 0 ? (
          <div className="no-content">Henüz video eklenmemiş.</div>
        ) : (
          filteredContent.map(content => (
            <div key={content.id} className="content-card">
              <div className="content-thumbnail">
                {content.videoType === 'youtube' ? (
                  <img
                    src={`https://img.youtube.com/vi/${getYouTubeVideoId(content.videoUrl)}/mqdefault.jpg`}
                    alt={content.title}
                  />
                ) : (
                  <img src="/thumbnail-placeholder.png" alt={content.title} />
                )}
                <span className="content-duration">{content.duration || '00:00'}</span>
              </div>
              <div className="content-info">
                <h3 className="content-title">{content.title}</h3>
                <p className="content-description">{content.description}</p>
                <div className="content-meta">
                  <span>{content.views || 0} görüntülenme</span>
                  <span>•</span>
                  <span>{new Date(content.date).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
              <div className="content-actions">
                <button className="action-btn">Düzenle</button>
                <button className="action-btn">
                  {content.status === 'draft' ? 'Yayınla' : 'Yayından Kaldır'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Utility function to extract YouTube video ID
const getYouTubeVideoId = url => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v');
    } else if (urlObj.hostname.includes('youtu.be')) {
      return urlObj.pathname.slice(1);
    }
  } catch (error) {
    console.error('Invalid URL:', error);
  }
  return null;
};

export default ContentLibrary;
