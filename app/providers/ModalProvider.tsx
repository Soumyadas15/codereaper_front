import getCurrentUser from "../actions/getCurrentUser";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import SuccessModal from "../components/modals/SuccessModal";

import { SafeUser } from "../types";

const ModalProvider = async () => {
    const currentUser = await getCurrentUser();
    
    return ( 
        <div>
            <SuccessModal/>
            <LoginModal/>
            <RegisterModal/>
        </div>
     );
}

export default ModalProvider;