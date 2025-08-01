import { useState } from "react";

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModal = () => setIsModalOpen(!isModalOpen);

    return {
        isModalOpen,
        handleModal
    }
}