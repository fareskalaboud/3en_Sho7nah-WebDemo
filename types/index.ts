export interface UploadResult {
  canShip: boolean
  message: string
}

export interface ImageUploadProps {
  onResult?: (result: UploadResult) => void
}

export interface ApiErrorResponse {
  error?: string
}

export interface ApiSuccessResponse {
  result: UploadResult
}
