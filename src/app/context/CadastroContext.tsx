import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Step1Data {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Step2Data {
  category: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  street: string;
  sewingExperienceYears: string;
  teamSize: string;
  availability: string;
  specialty: string;
  machines: string;
  factionType: string;
}

interface Step3Data {
  phone: string;
  whatsapp: string;
  instagram: string;
  website: string;
  description: string;
  profileImage: File | null;
  otherImages: File[];
  profileImagePreview: string | null;
}

interface CadastroContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  userType: 'COUTURIER' | 'EMPRESA' | null;
  setUserType: (type: 'COUTURIER' | 'EMPRESA' | null) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
  step1Data: Step1Data;
  setStep1Data: (data: Step1Data | ((prev: Step1Data) => Step1Data)) => void;
  step2Data: Step2Data;
  setStep2Data: (data: Step2Data | ((prev: Step2Data) => Step2Data)) => void;
  step3Data: Step3Data;
  setStep3Data: (data: Step3Data | ((prev: Step3Data) => Step3Data)) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  resetCadastro: () => void;
}

const CadastroContext = createContext<CadastroContextType | undefined>(undefined);

export const CadastroProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<'COUTURIER' | 'EMPRESA' | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [step1Data, setStep1Data] = useState<Step1Data>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [step2Data, setStep2Data] = useState<Step2Data>({
    category: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    street: '',
    sewingExperienceYears: '',
    teamSize: '',
    availability: '',
    specialty: '',
    machines: '',
    factionType: '',
  });

  const [step3Data, setStep3Data] = useState<Step3Data>({
    phone: '',
    whatsapp: '',
    instagram: '',
    website: '',
    description: '',
    profileImage: null,
    otherImages: [],
    profileImagePreview: null,
  });

  const resetCadastro = () => {
    setCurrentStep(1);
    setUserType(null);
    setUserId(null);
    setLoading(false);
    setError(null);
    setStep1Data({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setStep2Data({
      category: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      street: '',
      sewingExperienceYears: '',
      teamSize: '',
      availability: '',
      specialty: '',
      machines: '',
      factionType: '',
    });
    setStep3Data({
      phone: '',
      whatsapp: '',
      instagram: '',
      website: '',
      description: '',
      profileImage: null,
      otherImages: [],
      profileImagePreview: null,
    });
  };

  return (
    <CadastroContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        userType,
        setUserType,
        userId,
        setUserId,
        step1Data,
        setStep1Data,
        step2Data,
        setStep2Data,
        step3Data,
        setStep3Data,
        loading,
        setLoading,
        error,
        setError,
        resetCadastro,
      }}
    >
      {children}
    </CadastroContext.Provider>
  );
};

export const useCadastro = () => {
  const context = useContext(CadastroContext);
  if (context === undefined) {
    throw new Error('useCadastro must be used within a CadastroProvider');
  }
  return context;
};
