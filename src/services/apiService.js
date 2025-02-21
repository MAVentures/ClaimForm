// API base URL - automatically determine based on environment
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000'
  : process.env.REACT_APP_API_URL;

/**
 * Submits the claim form data to the backend API
 * @param {Object} formData - The form data to submit
 * @returns {Promise} - Resolves with the API response
 */
export const submitClaimForm = async (formData) => {
  try {
    console.log('Submitting to:', `${API_BASE_URL}/api/claims`);
    const response = await fetch(`${API_BASE_URL}/api/claims`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting claim form:', error);
    throw error;
  }
}; 