import { useEffect, useRef, useState } from 'react'
import { cn } from '#/lib/utils'

type Props = {
  value: File | null
  onChange: (file: File | null) => void
  accept?: string
}

export const FileUpload = ({ value, onChange, accept = 'image/*' }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState('')

  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (!value) {
      setPreview('')
      return
    }

    if (!value.type.startsWith('image/')) {
      setPreview('')
      return
    }

    const url = URL.createObjectURL(value)
    setPreview(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [value])

  const handleFile = (file: File | null) => {
    onChange(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]

    if (!file) return

    handleFile(file)
  }

  const fileSize = value ? `${(value.size / 1024 / 1024).toFixed(2)} MB` : ''

  return (
    <div className="space-y-3">
      <label
        className={cn(
          'flex flex-col items-center justify-center',
          'cursor-pointer',
          'border-2 border-dashed rounded-xl',
          'transition',
          dragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-500',
        )}
        onDragEnter={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setDragging(false)
        }}
        onDragOver={(e) => {
          e.preventDefault()
        }}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          hidden
          type="file"
          accept={accept}
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />

        {!value && (
          <>
            <div></div>
            <div className="font-medium">點擊或拖曳檔案到此處</div>
          </>
        )}

        {value && preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover rounded-xl"
          />
        )}

        {value && !preview && (
          <div className="text-center">
            <div></div>
            <div className="font-medium">{value.name}</div>
            <div className="text-sm text-gray-500">{fileSize}</div>
          </div>
        )}
      </label>

      {value && (
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div>
            <div className="font-medium">{value.name}</div>
            <div className="text-sm text-gray-500">{fileSize}</div>
          </div>

          <button
            type="button"
            className={cn(
              'bg-red-500 text-white',
              'rounded',
              'px-3 py-1',
              'hover:bg-red-600',
            )}
            onClick={() => {
              onChange(null)

              if (inputRef.current) {
                inputRef.current.value = ''
              }
            }}
          >
            刪除
          </button>
        </div>
      )}
    </div>
  )
}
