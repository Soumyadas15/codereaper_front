"use client"

import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import useSuccessModal from "@/app/hooks/useSuccessModal";

import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { Heart, Menu } from "lucide-react";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";


const dropdownVariants = {
    hidden: { 
        opacity: 0, 
    },
    visible: { 
        opacity: 1, 
        transition: { 
            duration: 0.2,
            ease: "easeInOut",
        } 
    },
    exit: {
        opacity: 0,
        transition: { 
            duration: 0.2,
            ease: "easeInOut",
        } 
    }
};

interface UserMenuProps{
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();

    const successModal = useSuccessModal();
    const loginModal = useLoginModal();
    const router = useRouter();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);


    const loginToggle = useCallback(() => {
        loginModal.onOpen();
        setIsOpen(false);
    }, []);

    const signUpToggle = useCallback(() => {
        registerModal.onOpen();
        setIsOpen(false);
    }, []);


    return ( 
        <div className="relative">
      <div className="flex flex-row items-center gap-3">
        
        <div 
        onClick={toggleOpen}
        className="
          p-4
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <div className="text-white"><Menu className="text-black dark:text-white" /></div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-[10rem]
            bg-purple-400 
            dark:bg-purple-800 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
            transition
            text-gray-200
          "
        >
          <div className="flex flex-col cursor-pointer">
          {currentUser ? (
              <>
                <MenuItem 
                  label="Logout" 
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Login" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
                
          </div>
        </div>
      )}
    </div>
     );
}
 
export default UserMenu;