import React, { createContext, useContext, useState, ReactNode } from 'react';
interface FormContextType {
  farmlandFormData: any;
  setFarmlandFormData: (data: any) => void;
  soilFormData: any;
  setSoilFormData: (data: any) => void;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [farmlandFormData, setFarmlandFormData] = useState<any>(null);
  const [soilFormData, setSoilFormData] = useState<any>(null);

  return (
    <FormContext.Provider
      value={{
        farmlandFormData,
        setFarmlandFormData,
        soilFormData,
        setSoilFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
