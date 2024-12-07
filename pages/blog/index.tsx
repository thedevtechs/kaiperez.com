import React, { useState } from 'react';
import Link from 'next/link';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import SEO from '../../components/SEO/SEO';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Pagination, Box, Chip } from '@mui/material';
import { blogPosts } from '../../data/blogPosts';

const POSTS_PER_PAGE = 6;

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SEO 
        title="Blog"
        description="Explore insights on web development, cloud architecture, and tech innovations from Kai Perez."
        canonical="https://kaiperez.dev/blog"
        ogType="blog"
        breadcrumbs={[
          {
            position: 1,
            name: "Home",
            item: "https://kaiperez.dev"
          },
          {
            position: 2,
            name: "Blog",
            item: "https://kaiperez.dev/blog"
          }
        ]}
      />

      <Menu theme="dark" />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Articles
        </Typography>

        <Grid container spacing={4}>
          {currentPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Link href={`/blog/${post.id}`} passHref style={{ textDecoration: 'none' }}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image || '/images/default-blog-image.jpg'} // Fallback image
                    alt={post.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Chip 
                        label={post.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                      <Typography variant="caption" color="text.secondary">
                        {post.readTime}
                      </Typography>
                    </Box>
                    
                    <Typography 
                      gutterBottom 
                      variant="h6" 
                      component="h2"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.3,
                        minHeight: '2.6em'
                      }}
                    >
                      {post.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        mb: 'auto'
                      }}
                    >
                      {post.subtitle}
                    </Typography>
                    
                    <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                      <Typography variant="caption" color="text.secondary">
                        {post.date}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>

        {totalPages > 1 && (
          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Container>

      <Footer />
    </>
  );
}