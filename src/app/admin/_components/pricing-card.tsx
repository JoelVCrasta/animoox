import React, { useEffect, useState } from 'react';
import { RxUpload } from 'react-icons/rx';
import { Plus, X, Percent } from 'lucide-react';
import {toast} from "sonner"

interface PricingCardProps {
  title: string;
  initialSavePercent?: number;
  initialData?: PricingPlan;
  onFormDataChange: (type: string, formData: PricingFormData) => void;
  onStatusUpdate: (type: string, status: string) => void;
}

interface PricingPlan {
  type: string;
  price: number;
  save: number;
  duration: string;
  discount: number;
  description: string;
  features: string[];
  status: string;
}

interface PricingFormData {
  mainPrice: string;
  price: string;
  description: string;
  duration: 'Annual' | 'Monthly' | 'Quarterly';
  savePercent: string;
  features: string[];
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, initialSavePercent, initialData, onStatusUpdate, onFormDataChange,}) => {
  const [mainPrice, setMainPrice] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [duration, setDuration] = useState<'Annual' | 'Monthly' | 'Quarterly'>('Annual');
  const [savePercent, setSavePercent] = useState<string>(initialSavePercent?.toString() || '0');
  const [isEditingSave, setIsEditingSave] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState<string>('');
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setMainPrice(initialData.price.toString());
      setPrice(initialData.discount.toString());
      setDescription(initialData.description);
      setDuration(initialData.duration as 'Annual' | 'Monthly' | 'Quarterly');
      setSavePercent(initialData.save.toString());
      setFeatures(initialData.features);
    }
  }, [initialData]);
  
  useEffect(() => {
    const formData: PricingFormData = {
      mainPrice,
      price,
      description,
      duration,
      savePercent,
      features
    };
    onFormDataChange(title, formData);
  }, [mainPrice, price, description, duration, savePercent, features, title, onFormDataChange]);


  const handleAddFeature = () => {
    if (newFeature.trim()) {
      const updatedFeatures = [...features, newFeature.trim()];
      setFeatures(updatedFeatures);
      setNewFeature('');
      setIsAddingFeature(false);
    }
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  const handleSavePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (parseInt(value) <= 100) {
      setSavePercent(value);
    }
  };

  const handleSavePercentBlur = () => {
    setIsEditingSave(false);
    if (savePercent === '') {
      setSavePercent('0');
    }
  };

  
  
  
  async function createPricingPlan(plan: PricingPlan): Promise<ApiResponse<PricingPlan>> {
    try {
      const response = await fetch('/api/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plan),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  const handleSubmit = async () => {
    if (!mainPrice || !price || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const planData: PricingPlan = {
        type: title,
        price: parseFloat(mainPrice),
        save: parseInt(savePercent),
        duration: duration,
        discount: parseFloat(price),
        description: description,
        features: features,
        status: status
      };

      const response = await createPricingPlan(planData);
      
      if (response.success && response.data) {
        toast.success(`Price ${status === "draft" ? "saved as draft" : "saved"} successfully`);
        onStatusUpdate(title, status);
      } else {
        alert(`Error creating plan: ${response.error}`);
      }
    } catch (error) {
      alert('An error occurred while creating the plan');
    } finally {
      setIsSubmitting(false);
    }
  };

  

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex-1" style={{boxShadow:"0px 20px 60px 0px rgba(29, 29, 29, 0.07)"}}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-[#2C2F50] font-medium">{title}</h4>
        <div 
          className="relative flex items-center text-xs border border-[#D0D1D8] text-[#5B5D77] px-2 py-1 rounded-full cursor-pointer group"
          onClick={() => setIsEditingSave(true)}
        >
          {isEditingSave ? (
            <div className="flex items-center">
              <input
                type="text"
                className="w-8 bg-transparent text-center focus:outline-none"
                value={savePercent}
                onChange={handleSavePercentChange}
                onBlur={handleSavePercentBlur}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSavePercentBlur();
                  }
                }}
                autoFocus
              />
              <Percent size={12} className="ml-0.5" />
            </div>
          ) : (
            <div className="flex items-center">
              Save {savePercent}%
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-[#2C2F50]">$</span>
          <input
            type="text"
            placeholder='0.00'
            style={{minWidth:"100px"}}
            className="text-4xl font-bold text-[#2C2F50] focus:outline-none focus:border-b-2 focus:border-blue-500"
            value={mainPrice}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              setMainPrice(value);
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Discount price</label>
          <input
            type="number"
            className="w-full border border-gray-200 rounded p-2 text-sm"
            placeholder="00.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Duration</label>
          <select
            className="w-full border border-gray-200 rounded p-2 text-sm appearance-none bg-white"
            value={duration}
            onChange={(e) => setDuration(e.target.value as 'Annual' | 'Monthly' | 'Quarterly')}
          >
            <option value="Annual">Annual</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Description</label>
          <textarea
            className="w-full border border-gray-200 rounded p-2 text-sm resize-none"
            placeholder="Add description here..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={90}
          />
          <div className="text-xs text-gray-400 text-right mt-1">90 Characters</div>
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="w-full bg-[#4F73FF] text-white py-3 rounded-lg font-medium disabled:bg-opacity-70"
        >
          {isSubmitting ? 'SUBMITTING...' : 'GET STARTED'}
        </button>

        <div className="space-y-3 mt-4">
          <h5 className="text-sm font-medium text-[#2C2F50]">Included</h5>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-between group">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  {feature}
                </div>
                <button
                  onClick={() => handleRemoveFeature(index)}
                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            
            {isAddingFeature ? (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <input
                  type="text"
                  className="flex-1 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter new feature"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddFeature();
                  }}
                  autoFocus
                />
                <button
                  onClick={handleAddFeature}
                  className="text-[#4F73FF] text-sm font-medium px-2"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsAddingFeature(false);
                    setNewFeature('');
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingFeature(true)}
                className="text-[#4F73FF] text-sm font-medium flex items-center gap-1"
              >
                <Plus size={16} />
                Add Feature
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;