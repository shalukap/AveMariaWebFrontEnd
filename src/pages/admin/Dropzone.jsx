import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import axios from 'axios'


export default function MyDropzone({ className,onUpload }) {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

   
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000*5,
    onDrop
  })

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  
  const handleSubmit = async e => {
    e.preventDefault()

    if (!files?.length) return
    try {
        const base64Files = await Promise.all(
            files.map(async (file) => ({
              name: file.name,
              data: await fileToBase64(file),
            }))
          );

      const response=await axios.post('http://localhost:3000/api/news/upload', {files:base64Files},{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setUploadedImageUrl(response.data.urls)      
      onUpload(response.data.urls)
    } catch (error) {
      console.log(error);
    }
    /*
    formData.append('upload_preset', 'AveMaria')

    const API_URL = import.meta.env.VITE_CLOUDINARY_URL   
    const data = await fetch(API_URL, {
      method: 'POST',
      body: formData
    }).then(res => res.json())

    console.log(data)*/
  }

  return (
    <>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <ArrowUpTrayIcon className='w-5 h-5 fill-current' />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='mt-10'>
        <div className='flex gap-4'>
          <h2 className='title text-3xl font-semibold'>Preview</h2>
          <button
            type='button'
            onClick={removeAll}
            className='mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
          >
            Remove all files
          </button>
          <button
            type='submit'
            onClick={handleSubmit}
            className='ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors'
          >
            Upload to Server
          </button>
        </div>

        {/* Accepted files */}
        <h3 className='title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3'>
          Accepted Files
        </h3>
        <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
          {files.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <img
                src={file.preview}
                alt={file.name}
                className='h-full w-full object-contain rounded-md'
                onLoad={() => URL.revokeObjectURL(file.preview)} // Clean up memory
              />
              <button
                type='button'
                className='w-7 h-7 border border-secondary-400 bg-red-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                onClick={() => removeFile(file.name)}
              >
                <XMarkIcon className='w-5 h-5 fill-white hover:fill-red-400 transition-colors' />
              </button>
              <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                {file.name}
              </p>
            </li>
          ))}
        </ul>

       
      </section>
    </>
  )
}
