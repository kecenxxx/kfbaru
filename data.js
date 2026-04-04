// ============================================
// DATA.JS - Video Data Configuration
// Ganti dengan data video kamu sendiri
// ============================================

const videoData = [
    {
        id: 1,
        title: "Sample Video Title One",
        thumbnail: "https://picsum.photos/seed/v1/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Featured",
        tags: ["action", "adventure"],
        uploadDate: "2026-03-01",
        duration: "1:23:45",
        views: "1.2M",
        rating: 4.8
    },
    {
        id: 2,
        title: "Sample Video Title Two",
        thumbnail: "https://picsum.photos/seed/v2/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Drama",
        tags: ["drama", "romance"],
        uploadDate: "2026-03-02",
        duration: "2:10:00",
        views: "980K",
        rating: 4.5
    },
    {
        id: 3,
        title: "Sample Video Title Three",
        thumbnail: "https://picsum.photos/seed/v3/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Comedy",
        tags: ["comedy", "family"],
        uploadDate: "2026-03-03",
        duration: "45:00",
        views: "2.3M",
        rating: 4.9
    },
    {
        id: 4,
        title: "Sample Video Title Four",
        thumbnail: "https://picsum.photos/seed/v4/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Action",
        tags: ["action", "thriller"],
        uploadDate: "2026-03-04",
        duration: "1:55:30",
        views: "3.1M",
        rating: 4.7
    },
    {
        id: 5,
        title: "Sample Video Title Five",
        thumbnail: "https://picsum.photos/seed/v5/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Horror",
        tags: ["horror", "suspense"],
        uploadDate: "2026-03-05",
        duration: "1:40:00",
        views: "750K",
        rating: 4.3
    },
    {
        id: 6,
        title: "Sample Video Title Six",
        thumbnail: "https://picsum.photos/seed/v6/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Drama",
        tags: ["drama", "biography"],
        uploadDate: "2026-03-06",
        duration: "2:05:00",
        views: "1.5M",
        rating: 4.6
    },
    {
        id: 7,
        title: "Sample Video Title Seven",
        thumbnail: "https://picsum.photos/seed/v7/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Sci-Fi",
        tags: ["sci-fi", "space"],
        uploadDate: "2026-03-07",
        duration: "2:20:00",
        views: "4.2M",
        rating: 4.9
    },
    {
        id: 8,
        title: "Sample Video Title Eight",
        thumbnail: "https://picsum.photos/seed/v8/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Comedy",
        tags: ["comedy", "romance"],
        uploadDate: "2026-03-08",
        duration: "1:30:00",
        views: "900K",
        rating: 4.2
    },
    {
        id: 9,
        title: "Sample Video Title Nine",
        thumbnail: "https://picsum.photos/seed/v9/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Action",
        tags: ["action", "adventure"],
        uploadDate: "2026-03-09",
        duration: "1:45:00",
        views: "2.8M",
        rating: 4.7
    },
    {
        id: 10,
        title: "Sample Video Title Ten",
        thumbnail: "https://picsum.photos/seed/v10/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Documentary",
        tags: ["documentary", "nature"],
        uploadDate: "2026-03-10",
        duration: "58:00",
        views: "1.1M",
        rating: 4.8
    },
    {
        id: 11,
        title: "Sample Video Title Eleven",
        thumbnail: "https://picsum.photos/seed/v11/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Sci-Fi",
        tags: ["sci-fi", "future"],
        uploadDate: "2026-03-11",
        duration: "2:15:00",
        views: "3.5M",
        rating: 4.6
    },
    {
        id: 12,
        title: "Sample Video Title Twelve",
        thumbnail: "https://picsum.photos/seed/v12/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Horror",
        tags: ["horror", "paranormal"],
        uploadDate: "2026-03-12",
        duration: "1:35:00",
        views: "620K",
        rating: 4.1
    },
    {
        id: 13,
        title: "Sample Video Title Thirteen",
        thumbnail: "https://picsum.photos/seed/v13/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Action",
        tags: ["action", "crime"],
        uploadDate: "2026-03-13",
        duration: "2:00:00",
        views: "1.9M",
        rating: 4.5
    },
    {
        id: 14,
        title: "Sample Video Title Fourteen",
        thumbnail: "https://picsum.photos/seed/v14/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Documentary",
        tags: ["documentary", "history"],
        uploadDate: "2026-03-14",
        duration: "1:10:00",
        views: "800K",
        rating: 4.7
    },
    {
        id: 15,
        title: "Sample Video Title Fifteen",
        thumbnail: "https://picsum.photos/seed/v15/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Comedy",
        tags: ["comedy", "teen"],
        uploadDate: "2026-03-15",
        duration: "1:25:00",
        views: "1.3M",
        rating: 4.4
    },
    {
        id: 16,
        title: "Sample Video Title Sixteen",
        thumbnail: "https://picsum.photos/seed/v16/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Drama",
        tags: ["drama", "war"],
        uploadDate: "2026-03-16",
        duration: "2:30:00",
        views: "2.1M",
        rating: 4.8
    },
    {
        id: 17,
        title: "Sample Video Title Seventeen",
        thumbnail: "https://picsum.photos/seed/v17/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Featured",
        tags: ["featured", "new"],
        uploadDate: "2026-03-17",
        duration: "1:50:00",
        views: "5.0M",
        rating: 4.9
    },
    {
        id: 18,
        title: "Sample Video Title Eighteen",
        thumbnail: "https://picsum.photos/seed/v18/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Sci-Fi",
        tags: ["sci-fi", "robot"],
        uploadDate: "2026-03-18",
        duration: "1:55:00",
        views: "2.6M",
        rating: 4.5
    },
    {
        id: 19,
        title: "Sample Video Title Nineteen",
        thumbnail: "https://picsum.photos/seed/v19/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Action",
        tags: ["action", "spy"],
        uploadDate: "2026-03-19",
        duration: "2:05:00",
        views: "3.8M",
        rating: 4.7
    },
    {
        id: 20,
        title: "Sample Video Title Twenty",
        thumbnail: "https://picsum.photos/seed/v20/640/360",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Horror",
        tags: ["horror", "slasher"],
        uploadDate: "2026-03-20",
        duration: "1:45:00",
        views: "1.0M",
        rating: 4.3
    }
    {
        id: 21,
        title: "Big Titty Mommy Gets It Rough - Simon Kitty",
        thumbnail: "https://thumb.tapecontent.net/thumb/WpMBMwy4AAtWgP/0LRw2vp9oDtbr3p.jpg",
        embedUrl: "https://streamtape.com/e/WpMBMwy4AAtWgP/",
        category: "Hardcore",
        tags: ["big tits", "rough"],
        uploadDate: "2026-01-28"
    },
];

// Kategori yang tersedia (sesuaikan dengan kontenmu)
const categories = [
    "All",
    "Featured",
    "Action",
    "Drama",
    "Comedy",
    "Horror",
    "Sci-Fi",
    "Documentary"
];

// Hero/featured videos (tampil di slider atas)
const heroVideos = [1, 17, 7, 4];

// Make data available globally
window.videoData = videoData;
window.categories = categories;
window.heroVideos = heroVideos;
