import React, { useState } from "react";
import { 
  FaHome, 
  FaPaintRoller, 
  FaSearch, 
  FaLightbulb, 
  FaChartLine, 
  FaDollarSign,
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
  FaHeart,
  FaShareAlt,
  FaComment,
  FaStar,
  FaEnvelope
} from "react-icons/fa";
import "./Blogg.css";

const Blogg = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const blogCategories = [
    { id: "all", name: "All Articles", icon: <FaSearch /> },
    { id: "real-estate", name: "Real Estate", icon: <FaHome /> },
    { id: "interior", name: "Interior Design", icon: <FaPaintRoller /> },
    { id: "market", name: "Market Trends", icon: <FaChartLine /> },
    { id: "investment", name: "Investment", icon: <FaDollarSign /> },
    { id: "tips", name: "Expert Tips", icon: <FaLightbulb /> },
    { id: "diy", name: "DIY & Renovation", icon: <FaPaintRoller /> },
    { id: "commercial", name: "Commercial Property", icon: <FaHome /> }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "2024 Real Estate Outlook: Smart Investments in Residential Properties",
      excerpt: "Comprehensive analysis of residential property markets, emerging hotspots, and investment strategies for maximum returns in 2024.",
      category: "real-estate",
      author: "Sarah Johnson",
      authorRole: "Real Estate Analyst",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600",
      featured: true,
      likes: 245,
      comments: 42,
      link: "/blog/2024-real-estate-outlook",
      content: "The real estate market in 2024 is showing promising growth with emerging trends in suburban development and smart home integration..."
    },
    {
      id: 2,
      title: "Transform Your Space: Top Interior Design Trends of 2024",
      excerpt: "From sustainable materials to smart home integration, discover the interior design trends that are defining modern living spaces.",
      category: "interior",
      author: "Michael Chen",
      authorRole: "Interior Designer",
      date: "2024-01-12",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600",
      featured: true,
      likes: 189,
      comments: 31,
      link: "/blog/top-interior-design-trends-2024",
      content: "2024 brings a focus on biophilic design, sustainable materials, and multifunctional spaces that prioritize both aesthetics and functionality..."
    }
  ];

  const blogPosts = [
    {
      id: 3,
      title: "Sustainable Interior Design: Eco-Friendly Materials for Modern Homes",
      excerpt: "Explore environmentally conscious materials and design principles that create beautiful, sustainable living spaces.",
      category: "interior",
      author: "Emily Rodriguez",
      authorRole: "Sustainable Design Expert",
      date: "2024-01-10",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
      likes: 156,
      comments: 28,
      link: "/blog/sustainable-interior-design-materials",
      content: "Discover how to incorporate reclaimed wood, recycled glass, and other eco-friendly materials into your home design..."
    },
    {
      id: 4,
      title: "Commercial Real Estate: Opportunities in Post-Pandemic Market",
      excerpt: "How commercial real estate is evolving and where investors can find the best opportunities in changing market conditions.",
      category: "commercial",
      author: "David Kim",
      authorRole: "Commercial Property Specialist",
      date: "2024-01-08",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
      likes: 132,
      comments: 19,
      link: "/blog/commercial-real-estate-opportunities",
      content: "The post-pandemic commercial real estate landscape offers unique opportunities in logistics centers, medical offices, and mixed-use developments..."
    },
    {
      id: 5,
      title: "DIY Home Renovation: Budget-Friendly Kitchen Makeovers",
      excerpt: "Step-by-step guide to transforming your kitchen without breaking the bank. Professional tips for amateur renovators.",
      category: "diy",
      author: "Lisa Thompson",
      authorRole: "Renovation Consultant",
      date: "2024-01-05",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
      likes: 278,
      comments: 45,
      link: "/blog/diy-kitchen-renovation-guide",
      content: "Learn how to update your kitchen with affordable cabinet refacing, DIY backsplash installation, and smart storage solutions..."
    },
    {
      id: 6,
      title: "Luxury Interior Design: Creating Statement Spaces",
      excerpt: "Insider secrets from top designers on how to create luxurious, personalized spaces that reflect your style and sophistication.",
      category: "interior",
      author: "Alex Martinez",
      authorRole: "Luxury Interior Designer",
      date: "2024-01-03",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500",
      likes: 214,
      comments: 32,
      link: "/blog/luxury-interior-design-secrets",
      content: "From custom millwork to artisanal finishes, discover the elements that transform ordinary spaces into extraordinary luxury environments..."
    },
    {
      id: 7,
      title: "Property Investment Strategies for First-Time Investors",
      excerpt: "A beginner's guide to real estate investment, covering everything from market analysis to financing options.",
      category: "investment",
      author: "Rachel Green",
      authorRole: "Investment Advisor",
      date: "2024-01-01",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      likes: 189,
      comments: 27,
      link: "/blog/first-time-property-investment",
      content: "Start your real estate investment journey with our comprehensive guide covering market research, financing, and property management..."
    },
    {
      id: 8,
      title: "Smart Home Integration: The Future of Property Value",
      excerpt: "How smart home technology is becoming a key factor in property valuation and buyer decision-making.",
      category: "real-estate",
      author: "James Wilson",
      authorRole: "Technology & Real Estate Expert",
      date: "2023-12-28",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      likes: 167,
      comments: 24,
      link: "/blog/smart-home-property-value",
      content: "Smart home technology can increase property values by 3-5% while providing energy efficiency and enhanced security features..."
    },
    {
      id: 9,
      title: "Office Interior Design: Creating Productive Work Environments",
      excerpt: "Design principles for modern offices that balance aesthetics, functionality, and employee well-being.",
      category: "interior",
      author: "Priya Sharma",
      authorRole: "Corporate Interior Designer",
      date: "2023-12-25",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500",
      likes: 143,
      comments: 21,
      link: "/blog/productive-office-design",
      content: "Create workspaces that boost productivity with ergonomic furniture, optimal lighting, and collaborative zones designed for modern work..."
    },
    {
      id: 10,
      title: "Vacation Property Investment: Maximizing Rental Returns",
      excerpt: "Essential guide to investing in vacation properties, from location selection to property management strategies.",
      category: "investment",
      author: "Robert Brown",
      authorRole: "Vacation Property Specialist",
      date: "2023-12-22",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500",
      likes: 198,
      comments: 29,
      link: "/blog/vacation-property-investment",
      content: "Learn how to choose the perfect vacation property location and implement strategies for maximizing rental income year-round..."
    },
    {
      id: 11,
      title: "Color Psychology in Interior Design: Creating Mood with Colors",
      excerpt: "How different colors affect mood and perception, and how to use them effectively in your interior design projects.",
      category: "interior",
      author: "Sophia Williams",
      authorRole: "Color Psychology Expert",
      date: "2023-12-20",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=500",
      likes: 176,
      comments: 26,
      link: "/blog/color-psychology-interior-design",
      content: "Understand how different colors influence emotions and learn to create specific moods in each room of your home through strategic color choices..."
    },
    {
      id: 12,
      title: "Real Estate Market Analysis: Tools and Techniques for Investors",
      excerpt: "Professional tools and techniques for analyzing real estate markets and making data-driven investment decisions.",
      category: "market",
      author: "Kevin Lee",
      authorRole: "Market Analyst",
      date: "2023-12-18",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500",
      likes: 154,
      comments: 22,
      link: "/blog/real-estate-market-analysis",
      content: "Master the art of market analysis with our guide to essential tools, metrics, and techniques for successful real estate investment..."
    }
  ];

  const allPosts = [...featuredPosts, ...blogPosts];

  const filteredPosts = activeCategory === "all" 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory);

  const searchedPosts = searchQuery 
    ? filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredPosts;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };

  const handleSearchTagClick = (searchTerm) => {
    setSearchQuery(searchTerm);
    setIsSearching(true);
    
    // Clear active category when searching
    setActiveCategory("all");
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setSearchQuery(""); // Clear search when changing category
  };

  const handleReadArticle = (link) => {
    // In a real application, you would use React Router
    // For now, we'll simulate navigation
    console.log("Navigating to:", link);
    // window.location.href = link; // Uncomment for actual navigation
    alert(`Article link: ${link}\n\nIn a real application, this would navigate to the full article.`);
  };

  const handleShare = (post, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.origin + post.link,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + post.link);
      alert("Link copied to clipboard!");
    }
  };

  const handleLike = (postId, e) => {
    e.stopPropagation();
    // In a real app, this would update the backend
    console.log(`Liked post ${postId}`);
    alert("Liked! In a real application, this would update the like count.");
  };

  return (
    <div className="blogg-page">
      <div className="blogg-container">
        {/* Page Header */}
        <div className="blogg-page-header">
          <div className="blogg-header-content">
            <h1>DreamPro Insights</h1>
            <p className="blogg-subtitle">Expert knowledge in Real Estate & Interior Design</p>
            <div className="blogg-header-stats">
              <div className="blogg-stat">
                <FaHome />
                <span>Real Estate Analysis</span>
              </div>
              <div className="blogg-stat">
                <FaPaintRoller />
                <span>Interior Design Tips</span>
              </div>
              <div className="blogg-stat">
                <FaLightbulb />
                <span>Professional Insights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="blogg-search-section">
          <form className="blogg-search-form" onSubmit={handleSearch}>
            <div className="blogg-search-input-group">
              <FaSearch className="blogg-search-icon" />
              <input
                type="text"
                placeholder="Search articles on real estate, interior design, investment, renovation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blogg-search-input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="blogg-clear-btn"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
              <button 
                type="submit" 
                className="blogg-search-btn"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <span className="blogg-spinner"></span> Searching...
                  </>
                ) : (
                  <>
                    <FaSearch /> Search
                  </>
                )}
              </button>
            </div>
          </form>
          <div className="blogg-search-tags">
            <span>Popular searches:</span>
            <button 
              onClick={() => handleSearchTagClick("interior design")}
              className={searchQuery === "interior design" ? "active" : ""}
            >
              interior design
            </button>
            <button 
              onClick={() => handleSearchTagClick("property investment")}
              className={searchQuery === "property investment" ? "active" : ""}
            >
              property investment
            </button>
            <button 
              onClick={() => handleSearchTagClick("home renovation")}
              className={searchQuery === "home renovation" ? "active" : ""}
            >
              home renovation
            </button>
            <button 
              onClick={() => handleSearchTagClick("market trends")}
              className={searchQuery === "market trends" ? "active" : ""}
            >
              market trends
            </button>
            <button 
              onClick={() => handleSearchTagClick("smart home")}
              className={searchQuery === "smart home" ? "active" : ""}
            >
              smart home
            </button>
          </div>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="blogg-search-results-info">
            <h3>
              Search Results for: <span className="blogg-search-query">"{searchQuery}"</span>
            </h3>
            <p>
              Found {searchedPosts.length} {searchedPosts.length === 1 ? 'article' : 'articles'}
              <button 
                onClick={handleClearSearch}
                className="blogg-clear-search-btn"
              >
                Clear Search
              </button>
            </p>
          </div>
        )}

        {/* Featured Posts - Only show when not searching */}
        {!searchQuery && (
          <section className="blogg-featured-section">
            <div className="blogg-section-header">
              <h2>Featured Articles</h2>
              <p>In-depth analysis and expert perspectives</p>
            </div>
            <div className="blogg-featured-grid">
              {featuredPosts.map(post => (
                <div key={post.id} className="blogg-featured-card" onClick={() => handleReadArticle(post.link)}>
                  <div className="blogg-featured-image">
                    <img src={post.image} alt={post.title} />
                    <div className="blogg-featured-badge">
                      <FaStar /> Featured
                    </div>
                    <div className="blogg-category-badge">
                      {blogCategories.find(cat => cat.id === post.category)?.name}
                    </div>
                  </div>
                  <div className="blogg-featured-content">
                    <div className="blogg-post-meta">
                      <span className="blogg-date">
                        <FaCalendarAlt /> {formatDate(post.date)}
                      </span>
                      <span className="blogg-read-time">{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p className="blogg-excerpt">{post.excerpt}</p>
                    <div className="blogg-author-info">
                      <div className="blogg-author-details">
                        <div className="blogg-author-avatar">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <div className="blogg-author-name">{post.author}</div>
                          <div className="blogg-author-role">{post.authorRole}</div>
                        </div>
                      </div>
                      <div className="blogg-post-stats">
                        <span className="blogg-stat">
                          <FaHeart /> {post.likes}
                        </span>
                        <span className="blogg-stat">
                          <FaComment /> {post.comments}
                        </span>
                      </div>
                    </div>
                    <button 
                      className="blogg-read-more-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadArticle(post.link);
                      }}
                    >
                      Read Full Article <FaArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Categories Filter - Only show when not searching */}
        {!searchQuery && (
          <section className="blogg-categories-section">
            <div className="blogg-section-header">
              <h2>Browse Categories</h2>
              <p>Explore by your interests</p>
            </div>
            <div className="blogg-categories-grid">
              {blogCategories.map(category => (
                <button
                  key={category.id}
                  className={`blogg-category-card ${activeCategory === category.id ? 'blogg-active' : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="blogg-category-icon">
                    {category.icon}
                  </div>
                  <span className="blogg-category-name">{category.name}</span>
                  {activeCategory === category.id && (
                    <FaArrowRight className="blogg-active-arrow" />
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="blogg-posts-section">
          <div className="blogg-section-header">
            <h2>
              {searchQuery 
                ? `Search Results for "${searchQuery}"` 
                : activeCategory === 'all' 
                  ? 'Latest Articles' 
                  : blogCategories.find(c => c.id === activeCategory)?.name}
            </h2>
            <p>
              {searchQuery 
                ? `${searchedPosts.length} ${searchedPosts.length === 1 ? 'article' : 'articles'} found` 
                : `${searchedPosts.length} ${searchedPosts.length === 1 ? 'article' : 'articles'} found`}
              {isSearching && <span className="blogg-searching-indicator">Searching...</span>}
            </p>
          </div>
          
          {searchedPosts.length === 0 ? (
            <div className="blogg-no-results">
              <FaSearch className="blogg-no-results-icon" />
              <h3>No articles found</h3>
              <p>
                {searchQuery 
                  ? `No results for "${searchQuery}". Try a different search term.` 
                  : "Try a different category or check back later for new articles."}
              </p>
              {searchQuery && (
                <button 
                  onClick={handleClearSearch}
                  className="blogg-clear-search-btn"
                >
                  Clear Search & Show All Articles
                </button>
              )}
            </div>
          ) : (
            <div className="blogg-grid">
              {searchedPosts.map(post => (
                <article key={post.id} className="blogg-card" onClick={() => handleReadArticle(post.link)}>
                  <div className="blogg-card-image">
                    <img src={post.image} alt={post.title} />
                    <div className="blogg-card-category">
                      {blogCategories.find(cat => cat.id === post.category)?.name}
                    </div>
                    {post.featured && (
                      <div className="blogg-featured-indicator">
                        <FaStar />
                      </div>
                    )}
                  </div>
                  <div className="blogg-card-content">
                    <div className="blogg-post-meta">
                      <span className="blogg-date">
                        <FaCalendarAlt /> {formatDate(post.date)}
                      </span>
                      <span className="blogg-read-time">{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p className="blogg-excerpt">{post.excerpt}</p>
                    <div className="blogg-author-section">
                      <div className="blogg-author-mini">
                        <div className="blogg-author-avatar-mini">
                          {post.author.charAt(0)}
                        </div>
                        <span className="blogg-author-name">{post.author}</span>
                      </div>
                      <div className="blogg-card-actions">
                        <button 
                          className="blogg-like-btn"
                          onClick={(e) => handleLike(post.id, e)}
                        >
                          <FaHeart /> {post.likes}
                        </button>
                        <button 
                          className="blogg-comment-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReadArticle(post.link);
                          }}
                        >
                          <FaComment /> {post.comments}
                        </button>
                        <button 
                          className="blogg-share-btn"
                          onClick={(e) => handleShare(post, e)}
                        >
                          <FaShareAlt />
                        </button>
                      </div>
                    </div>
                    <button 
                      className="blogg-read-more-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadArticle(post.link);
                      }}
                    >
                      Read More <FaArrowRight />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="blogg-newsletter-section">
          <div className="blogg-newsletter-content">
            <div className="blogg-newsletter-icon-large">
              <FaEnvelope />
            </div>
            <h2>Get Professional Insights</h2>
            <p>Subscribe to our newsletter for weekly updates on real estate trends, interior design inspiration, and expert advice</p>
            <form className="blogg-newsletter-form" onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              alert(`Thank you for subscribing with: ${email}\nYou'll receive our next newsletter soon!`);
              e.target.reset();
            }}>
              <div className="blogg-newsletter-input-group">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email address" 
                  className="blogg-newsletter-input"
                  required
                />
                <button type="submit" className="blogg-newsletter-btn">
                  Subscribe Now
                </button>
              </div>
            </form>
            <p className="blogg-newsletter-note">
              Join 10,000+ professionals and enthusiasts. No spam, unsubscribe anytime.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="blogg-cta-section">
          <div className="blogg-cta-content">
            <h2>Ready to Transform Your Space?</h2>
            <p>Connect with our certified interior designers or real estate experts today</p>
            <div className="blogg-cta-buttons">
              <button 
                className="blogg-cta-btn blogg-primary"
                onClick={() => window.location.href = "/properties"}
              >
                <FaHome /> Find Properties
              </button>
              <button 
                className="blogg-cta-btn blogg-secondary"
                onClick={() => window.location.href = "/design-consultation"}
              >
                <FaPaintRoller /> Consult Designer
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blogg;