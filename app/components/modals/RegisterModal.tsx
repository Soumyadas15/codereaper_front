'use client';

import axios from "axios";

import { useCallback, useState } from "react";

import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";


import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import useLoginModal from "@/app/hooks/useLoginModal";
import toast from "react-hot-toast";


const RegisterModal= () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  
  

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },

  });


  const toggleForm = () => {
    registerModal.onClose();
    loginModal.onOpen();
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    
    setIsLoading(true);
    console.log(data)
    axios.post('/api/register', data)
    .then(() => {
      toast.success("Success")
    })
    .catch((error) => {
      toast.error(error)
      console.log(error)
    })
    .finally(() => {
      setIsLoading(false);
    })
    
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Create an Account"
        
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            onClick={toggleForm} 
            className="
              text-purple-600
              font-bold
              cursor-pointer 
              hover:underline
            "
            > Log in</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      noHide={true}
    />
  );
}

export default RegisterModal;