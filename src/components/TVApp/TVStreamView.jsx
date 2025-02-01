import React, { useRef } from 'react';
import './TVStreamView.css';

const TVStreamView = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const scrollAmount = 800; // Adjust this value based on how far you want to scroll
        if (scrollRef.current) {
            const newScrollPosition =
                scrollRef.current.scrollLeft +
                (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="tv-stream-container">
            <div className="tv-header">
                <img src="/logo.png" alt="El Mustafa TV" className="tv-logo" />
            </div>

            <div className="featured-content">
                <div className="featured-gradient">
                    <div className="featured-details">
                        <p className="ranking">#1 in TV Shows Today</p>
                        <p className="description">
                            When a young boy vanishes, a small town uncovers a
                            mystery involving secret experiments, terrifying
                            supernatural forces and one strange little girl.
                        </p>
                        <div className="action-buttons">
                            <button className="play-button">
                                <span className="play-icon">▶</span> Play
                            </button>
                            <button className="info-button">More Info</button>
                        </div>
                        <div className="rating">TV-14</div>
                    </div>
                </div>
            </div>

            <div className="trending-section">
                <h2>Trending Now</h2>
                <div className="trending-container">
                    <button
                        className="scroll-button left"
                        onClick={() => scroll('left')}
                    >
                        ‹
                    </button>

                    <div className="trending-row" ref={scrollRef}>
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="trending-item">
                                <img
                                    src={`/thumbnail.png`}
                                    alt={`Trending ${item}`}
                                    className="trending-thumbnail"
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        className="scroll-button right"
                        onClick={() => scroll('right')}
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TVStreamView;
