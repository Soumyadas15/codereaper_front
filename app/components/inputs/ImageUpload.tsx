'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { ImagePlus } from 'lucide-react'

declare global {
  var cloudinary: any
}

const uploadPreset = "cjuw9gms";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  customHeight?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  customHeight
}) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  return (
    <CldUploadWidget 
      onUpload={handleUpload} 
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={`
              relative
              cursor-pointer
              hover:opacity-70
              transition
              rounded-md 
              border-2 
              p-20 
              ${customHeight}
              border-neutral-400
              dark:border-neutral-800

              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-400
              dark:text-neutral-600
            `}
          >
            <ImagePlus
              size={50}
            />
            <div className="font-semibold text-lg">
              Upload Solution
            </div>
            {value && (
              <div className="
              absolute inset-0 w-full h-full">
                <Image
                  fill 
                  style={{ objectFit: 'cover' }} 
                  src={value} 
                  alt="House" 
                />
              </div>
            )}
          </div>
        ) 
    }}
    </CldUploadWidget>
  );
}

export default ImageUpload;