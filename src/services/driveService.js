import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// Helper function to make authenticated requests to Google Drive API
const makeGoogleDriveRequest = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Authorization': `Bearer ${process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_KEY}`,
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(`https://www.googleapis.com/drive/v3/${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`Google Drive API error: ${response.statusText}`);
  }
  return response.json();
};

export const createClaimFolder = async (claimData) => {
  try {
    // Create main claim folder
    const folderMetadata = {
      name: `Claim_${claimData.mavRef}_${claimData.claimantName}`,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [process.env.REACT_APP_GOOGLE_DRIVE_PARENT_FOLDER_ID]
    };

    const folder = await makeGoogleDriveRequest('files', 'POST', folderMetadata);

    // Create subfolders for different document types
    const subfolders = ['Claim_Documents', 'Product_Documents', 'Additional_Documents'];
    
    for (const subfolder of subfolders) {
      await makeGoogleDriveRequest('files', 'POST', {
        name: subfolder,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [folder.id]
      });
    }

    return folder.id;
  } catch (error) {
    console.error('Error creating Google Drive folder:', error);
    throw new Error('Failed to create claim folder in Google Drive');
  }
};

export const uploadFileToDrive = async (file, folderId) => {
  try {
    const metadata = {
      name: file.name,
      parents: [folderId]
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    const uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_KEY}`,
      },
      body: form
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result.id;
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    throw new Error('Failed to upload file to Google Drive');
  }
}; 