"use client"

import { FcCableRelease } from "react-icons/fc";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "../inputs/ImageUpload";
import { useState } from "react";
import Button from "../Button";
import axios from "axios";
import Modal from "../modals/Modal";
import useUploadModal from "@/app/hooks/useUploadModal";
import toast from "react-hot-toast";


const UploadModal = () => {
    const [eventImage, setEventImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isNewImageUploaded, setIsNewImageUploaded] = useState(false);

    const uploadModal = useUploadModal();

    const { 
        register, 
        handleSubmit,
        setValue,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
        defaultValues: {
          title: '',
          imageSrc: ''
        },
      });

      const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      };

    const onImageChange = (newImageUrl: string) => {
        console.log("New Image URL:", newImageUrl);
        setEventImage(newImageUrl);
        setCustomValue('imageSrc', newImageUrl);
        setIsNewImageUploaded(true);

    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        data.title = data.title.toLowerCase();
        console.log(data)
        axios.post('/api/questions', data)
        .then(() => {
          setValue('imageSrc', null);
          toast.success("Success")
        })
        .catch((error) => {
          toast.error(error.response.data || "Something went wrong");
          console.log(error)
        })
        .finally(() => {
          setIsLoading(false);
          setEventImage('');
          console.log(data)
        })
        
      }

    const bodyContent = (
      <div className="dark:bg-neutral-800 w-[100%] h-[100%] rounded-2xl border-1  flex flex-col items-center justify-center p-3 gap-3 z-[9999]">
            <div className="h-[15%] w-full">
                <Input
                    id="title"
                    label="Question name"
                    disabled={isLoading}
                    register={register}  
                    errors={errors}
                    required
                />
            </div>
            <div className="h-[85%] w-full">
                <ImageUpload
                    value={eventImage!}
                    onChange={onImageChange}
                    customHeight="h-[100%]"
                />
            </div>
            
        </div>
    )

    return ( 
      <Modal
        disabled={isLoading}
        isOpen={uploadModal.isOpen}
        title="Upload qestion"
        actionLabel="Upload"
        onClose={uploadModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        noHide={true}
      />
     );
}
 
export default UploadModal;