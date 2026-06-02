import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, cities, currentCity } = useApp();
  
  // Step management
  const [step, setStep] = useState(1);
  
  // Step 1: Basic Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  // Step 2: Address & Preferences
  const [addressLine, setAddressLine] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState(currentCity);
  const [pincode, setPincode] = useState('');
  const [foodPreferences, setFoodPreferences] = useState<string[]>([]);
  
  const [error, setError] = useState('');

  const cuisineOptions = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'South Indian', 'North Indian', 
    'Chinese', 'Italian', 'Mexican', 'Desserts', 'Street Food'];

  const handleSendOtp = () => {
    if (!phone || phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    setError('');
    alert(`OTP sent to ${phone}: ${otp}`); // In real app, this would be SMS
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      setError('');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!otpVerified) {
      setError('Please verify your phone number with OTP');
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!addressLine || !city || !pincode) {
      setError('Please fill in all address fields');
      return;
    }

    if (foodPreferences.length === 0) {
      setError('Please select at least one food preference');
      return;
    }

    // Get city location
    const selectedCity = cities.find(c => c.name === city);
    
    // Register user
    register({
      name,
      email,
      phone,
      password,
      addresses: [{
        id: '1',
        label: 'Home',
        addressLine,
        landmark,
        city,
        pincode,
        location: selectedCity?.location || { lat: 0, lng: 0 },
        isDefault: true
      }],
      foodPreferences,
      currentCity: city,
      currentLocation: selectedCity?.location
    });

    navigate('/login');
  };

  const togglePreference = (pref: string) => {
    if (foodPreferences.includes(pref)) {
      setFoodPreferences(foodPreferences.filter(p => p !== pref));
    } else {
      setFoodPreferences([...foodPreferences, pref]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">🍔</span>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Join FlashFood</h2>
          <p className="text-gray-600">Create your account in 2 simple steps</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'
              }`}>
                {step > 1 ? '✓' : '1'}
              </div>
              <span className="ml-2 font-medium">Basic Info</span>
            </div>
            <div className="w-16 h-1 bg-gray-300">
              <div className={`h-full ${step >= 2 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
            </div>
            <div className={`flex items-center ${step >= 2 ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Address & Preferences</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic Information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Create a password (min 6 characters)"
                  minLength={6}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Confirm your password"
                  minLength={6}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number * (OTP Verification)
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpVerified}
                    className={`px-6 py-3 rounded-lg font-semibold ${
                      otpVerified
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {otpVerified ? '✓ Verified' : otpSent ? 'Resend OTP' : 'Send OTP'}
                  </button>
                </div>
              </div>

              {otpSent && !otpVerified && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="6-digit OTP"
                      maxLength={6}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
                    >
                      Verify
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Demo OTP: {generatedOtp}
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  ❌ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!otpVerified}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-lg transition ${
                  otpVerified
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next: Address & Preferences →
              </button>
            </form>
          )}

          {/* Step 2: Address & Preferences */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Delivery Address & Food Preferences</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line *
                </label>
                <input
                  type="text"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="House No, Building, Street"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Near Metro Station"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    {cities.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="6-digit pincode"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Food Preferences * (Select at least one)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {cuisineOptions.map(cuisine => (
                    <button
                      key={cuisine}
                      type="button"
                      onClick={() => togglePreference(cuisine)}
                      className={`px-4 py-3 rounded-lg border-2 font-medium transition ${
                        foodPreferences.includes(cuisine)
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      {foodPreferences.includes(cuisine) && '✓ '}{cuisine}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  ❌ {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 font-semibold text-lg transition"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 font-semibold text-lg transition transform hover:scale-105"
                >
                  Complete Registration 🎉
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
