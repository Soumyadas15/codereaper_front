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

const MainLayout = () => {

  const uploadModal = useUploadModal();

    return ( 
      <div className="w-[18rem] h-[10rem] md:w-[20%] md:h-[20%] flex items-center justify-center" >
        <div className="
                
                bg-purple-400 
                dark:bg-purple-800 
                w-[80%] 
                h-[40%] 
                rounded-full 
                flex 
                items-center 
                justify-center 
                text-md 
                font-bold 
                text-black 
                dark:text-white
                
                cursor-pointer 
                hover:opacity-75 
                transition"
              onClick={uploadModal.onOpen}
        >
          Upload question
        </div>
      </div>
     );
}
 
export default MainLayout;