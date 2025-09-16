'use client'

import React, { useState, useCallback } from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import {
  CloudUpload,
  CheckCircle,
  Error,
  PhotoCamera,
  Delete,
  Language,
} from '@mui/icons-material'

interface UploadResult {
  canShip: boolean
  message: string
}

interface ImageUploadProps {
  onResult?: (result: UploadResult) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onResult }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<UploadResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/webp',
      'image/gif',
      'image/bmp',
      'image/tiff',
      'image/svg+xml'
    ]

    if (file.size > maxSize) {
      return 'File too large. Maximum size is 10MB'
    }

    if (!allowedTypes.includes(file.type)) {
      return 'Unsupported file format. Please use JPEG, PNG, WebP, GIF, BMP, TIFF, or SVG'
    }

    return null
  }

  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setSelectedFile(file)
    setError(null)
    setResult(null)

    // Create preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setSelectedLanguage(event.target.value)
    // Clear previous results when language changes
    if (result) {
      setResult(null)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(false)
    
    const files = event.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('language', selectedLanguage)

      const response = await fetch('https://3en-sho7nah-production.up.railway.app/check-item', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze image')
      }

      const uploadResult = data.result
      setResult(uploadResult)
      onResult?.(uploadResult)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setResult(null)
    setError(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
      {/* Language Selector */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Language sx={{ mr: 1, color: theme.palette.primary.main }} />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="language-select-label">Response Language</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={selectedLanguage}
            label="Response Language"
            onChange={handleLanguageChange}
            sx={{
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
              },
            }}
          >
            <MenuItem value="en">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                🇺🇸 English
              </Box>
            </MenuItem>
            <MenuItem value="ar">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                🇸🇦 العربية
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Upload Area */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          border: dragOver ? `2px dashed ${theme.palette.primary.main}` : '2px dashed #e0e0e0',
          backgroundColor: dragOver ? 'rgba(217, 86, 51, 0.05)' : 'transparent',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: 'rgba(217, 86, 51, 0.02)',
          },
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        
        <Box sx={{ textAlign: 'center' }}>
          {selectedFile ? (
            <>
              <PhotoCamera sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                {selectedFile.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </Typography>
            </>
          ) : (
            <>
              <CloudUpload sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                {isMobile ? 'Tap to select image' : 'Drag & drop your image here'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {!isMobile && 'or click to select a file'}
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                Supports JPEG, PNG, WebP, GIF, BMP, TIFF, SVG (max 10MB)
              </Typography>
            </>
          )}
        </Box>
      </Paper>

      {/* Preview */}
      {previewUrl && (
        <Card sx={{ mb: 3 }}>
          <Box sx={{ position: 'relative', textAlign: 'center', p: 2 }}>
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: 300,
                borderRadius: 8,
                objectFit: 'contain',
              }}
            />
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={handleClear}
              sx={{ mt: 2 }}
            >
              Remove
            </Button>
          </Box>
        </Card>
      )}

      {/* Actions */}
      {selectedFile && !result && (
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleUpload}
            disabled={isUploading}
            startIcon={isUploading ? <CircularProgress size={20} /> : <CheckCircle />}
            sx={{ minWidth: 200 }}
          >
            {isUploading ? 'Analyzing...' : 'Check Shipping Eligibility'}
          </Button>
        </Box>
      )}

      {/* Loading State */}
      {isUploading && (
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Analyzing your item for shipping eligibility...
          </Typography>
        </Box>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Result */}
      {result && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {result.canShip ? (
                <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
              ) : (
                <Error sx={{ color: 'error.main', mr: 1 }} />
              )}
              <Chip
                label={result.canShip ? 'Can Ship' : 'Cannot Ship'}
                color={result.canShip ? 'success' : 'error'}
                variant="filled"
              />
            </Box>
            <Typography variant="body1">
              {result.message}
            </Typography>
            {result.canShip && (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleClear}
              >
                Check Another Item
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default ImageUpload
