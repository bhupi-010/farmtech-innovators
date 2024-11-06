import React from 'react'
import { useNavigate } from 'react-router-dom'

export const useNavigateBack = () => {
    const navigate = useNavigate();
    const goback = () => {
        navigate(-1);
    };

    return goback
}
