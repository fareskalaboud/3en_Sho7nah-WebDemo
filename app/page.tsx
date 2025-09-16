'use client'

import React from 'react'
import {
  Container,
  Box,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { LocalShipping } from '@mui/icons-material'
import ImageUpload from './components/ImageUpload'

export default function Home() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        py: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <LocalShipping 
            sx={{ 
              fontSize: { xs: 48, sm: 64 }, 
              color: theme.palette.primary.main, 
              mb: 2 
            }} 
          />
          <Typography 
            variant={isMobile ? 'h2' : 'h1'} 
            component="h1" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: '#000000',
            }}
          >
            Shipping Item Checker
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.25rem' },
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Upload a photo to check shipping eligibility
          </Typography>
        </Box>


        {/* Main Upload Component */}
        <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, mb: 4 }}>
          <ImageUpload />
        </Paper>

      </Container>
    </Box>
  )
}
