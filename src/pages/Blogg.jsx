import React, { useState } from "react";
import "./Blogg.css";

const Blogg = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const blogCategories = [
    { id: "all", name: "All Articles" },
    { id: "market", name: "Market Trends" },
    { id: "tips", name: "Home Buying Tips" },
    { id: "investment", name: "Investment" },
    { id: "design", name: "Home Design" },
    { id: "neighborhood", name: "Neighborhood Guides" }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "2024 Real Estate Market Predictions: What Buyers and Sellers Need to Know",
      excerpt: "Explore the latest trends and predictions for the real estate market in the coming year. Learn how to navigate changing conditions.",
      category: "market",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      featured: true
    },
    {
      id: 2,
      title: "10 Essential Tips for First-Time Home Buyers",
      excerpt: "Navigating the home buying process can be overwhelming. Here are 10 crucial tips to help first-time buyers make smart decisions.",
      category: "tips",
      author: "Michael Chen",
      date: "2024-01-12",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
      featured: true
    }
  ];

  const blogPosts = [
    {
      id: 3,
      title: "The Rise of Smart Homes: Technology That Adds Value to Your Property",
      excerpt: "Discover how smart home technology can increase your property value and improve your quality of life.",
      category: "design",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"
    },
    {
      id: 4,
      title: "Investment Properties: Where to Find the Best Returns in 2024",
      excerpt: "Expert analysis on the most promising real estate investment opportunities in the current market.",
      category: "investment",
      author: "David Kim",
      date: "2024-01-08",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    },
    {
      id: 5,
      title: "Neighborhood Spotlight: Downtown Living vs. Suburban Comfort",
      excerpt: "Compare the benefits of urban and suburban living to help you choose the perfect location for your next home.",
      category: "neighborhood",
      author: "Lisa Thompson",
      date: "2024-01-05",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500"
    },
    {
      id: 6,
      title: "Sustainable Living: Eco-Friendly Features That Sell Homes Faster",
      excerpt: "Learn which green features are most attractive to today's home buyers and how they can speed up your sale.",
      category: "design",
      author: "Alex Martinez",
      date: "2024-01-03",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500"
    },
    {
      id: 7,
      title: "Understanding Mortgage Rates: A Complete Guide for 2024",
      excerpt: "Everything you need to know about current mortgage rates and how to secure the best deal for your situation.",
      category: "tips",
      author: "Rachel Green",
      date: "2024-01-01",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    },
    {
      id: 8,
      title: "Luxury Real Estate: What High-End Buyers Are Looking For",
      excerpt: "Explore the latest trends in luxury real estate and discover what features are must-haves for premium properties.",
      category: "market",
      author: "James Wilson",
      date: "2023-12-28",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=500"
    }
  ];

  const allPosts = [...featuredPosts, ...blogPosts];

  const filteredPosts = activeCategory === "all" 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="blog-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>DreamPro Blog</h1>
          <p>Expert insights, market trends, and tips for your real estate journey</p>
        </div>

        {/* Featured Posts */}
        <section className="featured-section">
          <h2>Featured Articles</h2>
          <div className="featured-grid">
            {featuredPosts.map(post => (
              <div key={post.id} className="featured-card">
                <div className="featured-image">
                  <img src={post.image} alt={post.title} />
                  <div className="featured-badge">Featured</div>
                </div>
                <div className="featured-content">
                  <div className="post-meta">
                    <span className="category">{blogCategories.find(cat => cat.id === post.category)?.name}</span>
                    <span className="date">{formatDate(post.date)}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="post-footer">
                    <span className="author">By {post.author}</span>
                    <span className="read-time">{post.readTime}</span>
                  </div>
                  <button className="read-more-btn">Read Article</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Filter */}
        <section className="categories-section">
          <h2>Browse by Category</h2>
          <div className="categories-filter">
            {blogCategories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="blog-posts-section">
          <h2>Latest Articles</h2>
          <div className="blog-grid">
            {filteredPosts.map(post => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                  <div className="category-tag">
                    {blogCategories.find(cat => cat.id === post.category)?.name}
                  </div>
                </div>
                <div className="blog-content">
                  <div className="post-meta">
                    <span className="date">{formatDate(post.date)}</span>
                    <span className="read-time">{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="post-footer">
                    <span className="author">By {post.author}</span>
                    <button className="read-more-btn">Read More</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <h2>Stay Updated with Real Estate Insights</h2>
            <p>Get the latest market trends, investment tips, and property advice delivered to your inbox.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
            <p className="newsletter-note">No spam, unsubscribe at any time</p>
          </div>
        </section>

        {/* Popular Tags */}
        <section className="tags-section">
          <h3>Popular Topics</h3>
          <div className="tags-container">
            {['Real Estate', 'Market Trends', 'Home Buying', 'Investment', 'Mortgage', 'Home Design', 'Neighborhoods', 'Luxury Homes', 'First Time Buyers', 'Property Management'].map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blogg;