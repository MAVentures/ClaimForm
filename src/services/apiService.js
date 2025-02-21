// API base URL - replace with your actual API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.mavinc.com';

/**
 * Submits the claim form data to the backend API
 * @param {Object} formData - The form data to submit
 * @returns {Promise} - Resolves with the API response
 */
export const submitClaimForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/claims`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting claim form:', error);
    throw error;
  }
}; 