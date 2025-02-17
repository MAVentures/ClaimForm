import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

export const createClaimFolder = async (claimData) => {
  try {
    // Create main claim folder
    const folderMetadata = {
      name: `Claim_${claimData.mavRef}_${claimData.claimantName}`,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [process.env.REACT_APP_GOOGLE_DRIVE_PARENT_FOLDER_ID]
    };

    const folder = await drive.files.create({
      resource: folderMetadata,
      fields: 'id'
    });

    // Create subfolders for different document types
    const subfolders = ['Claim_Documents', 'Product_Documents', 'Additional_Documents'];
    
    for (const subfolder of subfolders) {
      await drive.files.create({
        resource: {
          name: subfolder,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [folder.data.id]
        },
        fields: 'id'
      });
    }

    return folder.data.id;
  } catch (error) {
    console.error('Error creating Google Drive folder:', error);
    throw new Error('Failed to create claim folder in Google Drive');
  }
};

export const uploadFileToDrive = async (file, folderId) => {
  try {
    const fileMetadata = {
      name: file.name,
      parents: [folderId]
    };

    const media = {
      mimeType: file.type,
      body: file
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    });

    return response.data.id;
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    throw new Error('Failed to upload file to Google Drive');
  }
}; 