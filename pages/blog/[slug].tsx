import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { JsonLd } from 'react-schemaorg';
import { BlogPosting } from 'schema-dts';
import {
  Container,
  Typography,
  Box,
  Chip,
  Divider,
  Avatar,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  Link as MuiLink,
  CircularProgress,
} from '@mui/material';
import {
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  ArrowBack as ArrowBackIcon,
  AccessTime as AccessTimeIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import { getBlogPost, getRelatedPosts } from '../../data/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '../../components/CodeBlock';

export default function BlogPost() {
  const router = useRouter();

  // Show loading state while the page is being rendered on client side
  if (router.isFallback || !router.isReady) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const { slug } = router.query;
  const blogPost = getBlogPost(slug as string);
  const relatedPosts = getRelatedPosts(slug as string, 2);

  // Handle 404 case
  if (!blogPost) {
    if (typeof window !== 'undefined') {
      router.push('/404');
    }
    return null;
  }

  const canonicalUrl = `https://kaiperez.dev/blog/${slug}`;
  const articlePublishDate = new Date(blogPost.date).toISOString();

  const MarkdownComponents = {
    h1: (props: any) => (
      <Typography variant="h2" component="h1" gutterBottom sx={{ mt: 4, mb: 2 }}>
        {props.children}
      </Typography>
    ),
    h2: (props: any) => (
      <Typography variant="h3" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
        {props.children}
      </Typography>
    ),
    h3: (props: any) => (
      <Typography variant="h4" component="h3" gutterBottom sx={{ mt: 3, mb: 2 }}>
        {props.children}
      </Typography>
    ),
    p: (props: any) => (
      <Typography paragraph sx={{ mb: 2, lineHeight: 1.7 }}>
        {props.children}
      </Typography>
    ),
    a: (props: any) => (
      <MuiLink href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </MuiLink>
    ),
    img: (props: any) => (
      <Box
        component="img"
        src={props.src}
        alt={props.alt}
        sx={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 1,
          my: 2
        }}
      />
    ),
    blockquote: (props: any) => (
      <Box
        sx={{
          borderLeft: 4,
          borderColor: 'primary.main',
          pl: 2,
          py: 1,
          my: 2,
          bgcolor: 'grey.50'
        }}
      >
        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
          {props.children}
        </Typography>
      </Box>
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <CodeBlock
          language={match[1]}
          value={String(children).replace(/\n$/, '')}
          {...props}
        />
      ) : (
        <Box
          component="code"
          sx={{
            bgcolor: 'grey.100',
            p: 0.5,
            borderRadius: 0.5,
            fontFamily: 'monospace'
          }}
          {...props}
        >
          {children}
        </Box>
      );
    }
  };

  return (
    <>
      <Head>
        <title>{`${blogPost.title} | Kai Perez Blog`}</title>
        <meta name="description" content={blogPost.subtitle} />
        <meta name="author" content={blogPost.author.name} />
        <meta name="keywords" content={blogPost.tags.join(', ')} />
        
        {/* OpenGraph tags for social sharing */}
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.subtitle} />
        <meta property="og:image" content={blogPost.image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Kai Perez Blog" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@kaiperez" /> {/* Add your Twitter handle */}
        <meta name="twitter:title" content={blogPost.title} />
        <meta name="twitter:description" content={blogPost.subtitle} />
        <meta name="twitter:image" content={blogPost.image} />
        
        {/* Technical SEO */}
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* Article specific metadata */}
        <meta property="article:published_time" content={articlePublishDate} />
        <meta property="article:author" content={blogPost.author.name} />
        {blogPost.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Head>

      {/* JSON-LD structured data */}
      <JsonLd<BlogPosting>
        item={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blogPost.title,
          description: blogPost.subtitle,
          image: blogPost.image,
          datePublished: articlePublishDate,
          author: {
            "@type": "Person",
            name: blogPost.author.name,
            jobTitle: blogPost.author.role
          },
          publisher: {
            "@type": "Organization",
            name: "Kai Perez",
            logo: {
              "@type": "ImageObject",
              url: "https://kaiperez.dev/logo.png" // Add your logo URL
            }
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl
          },
          keywords: blogPost.tags.join(', '),
          articleBody: blogPost.content,
          wordCount: blogPost.content.split(/\s+/).length
        }}
      />

      {/* Semantic HTML structure */}
      <article itemScope itemType="https://schema.org/BlogPosting">
        <Menu theme="dark" />

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/blog')}
            sx={{ mb: 4 }}
          >
            Back to Blogs
          </Button>

          {/* Hero Section with semantic markup */}
          <header>
            <Box sx={{ mb: 6 }}>
              <Typography variant="h3" component="h1" gutterBottom itemProp="headline">
                {blogPost.title}
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary" 
                gutterBottom 
                itemProp="description"
              >
                {blogPost.subtitle}
              </Typography>

              {/* Meta Information */}
              <Box 
                component="div" 
                itemProp="author" 
                itemScope 
                itemType="https://schema.org/Person"
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}
              >
                <Avatar src={blogPost.author.avatar} alt={blogPost.author.name} />
                <Box>
                  <Typography variant="subtitle2" itemProp="name">
                    {blogPost.author.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    itemProp="jobTitle"
                  >
                    {blogPost.author.role}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="caption">{blogPost.readTime}</Typography>
                </Box>
                <time 
                  itemProp="datePublished" 
                  dateTime={articlePublishDate}
                >
                  {blogPost.date}
                </time>
              </Box>

              {/* Featured Image with semantic markup */}
              <Box
                component="img"
                src={blogPost.image}
                alt={blogPost.title}
                itemProp="image"
                sx={{
                  width: '100%',
                  height: 600,
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 4
                }}
              />

              {/* Tags with semantic markup */}
              <Box sx={{ mb: 4 }}>
                {blogPost.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{ mr: 1, mb: 1 }}
                    variant="outlined"
                    component="span"
                    itemProp="keywords"
                  />
                ))}
              </Box>
            </Box>
          </header>

          {/* Content with semantic markup */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box component="section" itemProp="articleBody">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={MarkdownComponents}
                >
                  {blogPost.content}
                </ReactMarkdown>
              </Box>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 20 }}>
                {/* Share Buttons */}
                <Card sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Share this article
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton color="primary">
                        <TwitterIcon />
                      </IconButton>
                      <IconButton color="primary">
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton>
                        <BookmarkIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>

                {/* Related Posts */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Related Articles
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {relatedPosts.map((post) => (
                        <Link href={`/blog/${post.id}`} key={post.id}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle2" gutterBottom>
                                {post.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {post.excerpt}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Footer />
      </article>
    </>
  );
}