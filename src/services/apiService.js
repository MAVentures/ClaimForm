// API base URL - automatically determine based on environment
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://claim-form-three.vercel.app'
  : 'http://localhost:3000';

console.log('Environment:', process.env.NODE_ENV);
console.log('Using API_BASE_URL:', API_BASE_URL);

/**
 * Submits the claim form data to the backend API
 * @param {Object} formData - The form data to submit
 * @returns {Promise} - Resolves with the API response
 */
export const submitClaimForm = async (formData) => {
  try {
    const url = `${API_BASE_URL}/api/claims`;
    console.log('Submitting to:', url);
    console.log('Form data:', formData);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server error response:', errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Server success response:', data);
    return data;
  } catch (error) {
    console.error('Error submitting claim form:', error);
    throw error;
  }
}; 