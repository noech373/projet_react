import React, { useState } from 'react';

interface CheckoutStepsProps {
    onComplete: (formData: CheckoutFormData) => void;
    price: number;
}

export interface CheckoutFormData {
    firstName: string;
    lastName: string;
    email: string;
    quantity: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ 
    onComplete, 
    price
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<CheckoutFormData>({
        firstName: '',
        lastName: '',
        email: '',
        quantity: 1
    });
    
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const validateStep = (step: number): boolean => {
        let isValid = true;
        const newErrors = { ...errors };

        if (step === 1) {
            if (!formData.firstName.trim()) {
                newErrors.firstName = 'Le prénom est requis';
                isValid = false;
            } else {
                newErrors.firstName = '';
            }

            if (!formData.lastName.trim()) {
                newErrors.lastName = 'Le nom est requis';
                isValid = false;
            } else {
                newErrors.lastName = '';
            }
        }

        if (step === 2) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.email.trim()) {
                newErrors.email = 'L\'email est requis';
                isValid = false;
            } else if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Format d\'email invalide';
                isValid = false;
            } else {
                newErrors.email = '';
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            } else {
                onComplete(formData);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
        else {
            setCurrentStep(1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleQuantityChange = (increment: number) => {
        setFormData(prev => ({
            ...prev,
            quantity: Math.max(1, prev.quantity + increment)
        }));
    };

    return (
        <div className="mt-4">
            <div className="flex justify-between mb-4">
                {[1, 2, 3].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                        <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === step 
                                ? 'bg-primary-light text-back' 
                                : currentStep > step 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`}
                        >
                            {currentStep > step ? '✓' : step}
                        </div>
                        <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                            {step === 1 ? 'Identité' : step === 2 ? 'Contact' : 'Quantité'}
                        </span>
                    </div>
                ))}
            </div>

            {/* Step content with sliding animation */}
            <div className="overflow-hidden w-full">
                <div 
                    className="flex transition-transform duration-300 ease-in-out" 
                    style={{ transform: `translateX(-${(currentStep - 1) * 33.333333}%)`, width: '300%' }}
                >
                    {/* Step 1: Personal Information */}
                    <div className="w-1/3 flex-shrink-0 px-1 max-w-full">
                        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Informations personnelles</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Prénom
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-light focus:border-primary-light dark:bg-gray-700"
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-light focus:border-primary-light dark:bg-gray-700"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Contact Information */}
                    <div className="w-1/3 flex-shrink-0 px-1 max-w-full">
                        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Informations de contact</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-light focus:border-primary-light dark:bg-gray-700"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Step 3: Quantity */}
                    <div className="w-1/3 flex-shrink-0 px-1 max-w-full">
                        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Sélection de la quantité</h3>
                        
                            <div className="flex items-center justify-center w-full">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-l-md text-xl font-bold"
                                >
                                    -
                                </button>
                                <span className="px-6 py-2 bg-gray-100 dark:bg-gray-600 text-xl font-semibold">
                                    {formData.quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-r-md text-xl font-bold"
                                >
                                    +
                                </button>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-600 dark:text-gray-300">Prix unitaire: <span className="font-bold">{price}€</span></p>
                                <p className="text-lg font-bold text-primary-light dark:text-primary-dark mt-2">
                                    Total: {(price * formData.quantity).toFixed(2)}€
                                </p>
                            </div>
                        
                    </div>
                </div>
            </div>

            {/* Navigation buttons */}
                        {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                    <button
                        onClick={handlePrevious}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        Précédent
                    </button>
                )}
                <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-primary-light hover:bg-primary-dark text-white rounded-md transition-colors"
                >
                    {currentStep === 3 ? 'Ajouter au panier' : 'Suivant'}
                </button>
            </div>
        </div>
    );
};

export default CheckoutSteps;