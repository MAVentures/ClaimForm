import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

// Initialize Google Drive API
const initializeGoogleDrive = async () => {
  try {
    let credentials;
    
    // In production (Vercel), use environment variable
    if (process.env.GOOGLE_CREDENTIALS_JSON) {
      credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
    } 
    // In development, read from file
    else {
      const credentialsPath = path.join(process.cwd(), 'credentials', 'mav-claims-portal-b227dea6103d.json');
      credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    return google.drive({ version: 'v3', auth });
  } catch (error) {
    console.error('Error initializing Google Drive:', error);
    throw new Error('Failed to initialize Google Drive: ' + error.message);
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const drive = await initializeGoogleDrive();
    const { folderId, ...claimData } = req.body;

    // Create a folder for this claim
    const folderMetadata = {
      name: `Claim_${claimData.mavRef}_${new Date().toISOString().split('T')[0]}`,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [process.env.REACT_APP_GOOGLE_DRIVE_PARENT_FOLDER_ID]
    };

    const folder = await drive.files.create({
      resource: folderMetadata,
      fields: 'id'
    });

    console.log('Created folder:', folder.data.id);

    // Store claim data (you might want to add a database here later)
    console.log('Claim data received:', claimData);

    // Send success response
    res.status(200).json({ 
      success: true, 
      message: 'Claim submitted successfully',
      claimId: new Date().getTime(), // temporary ID generation
      folderId: folder.data.id
    });
  } catch (error) {
    console.error('Error processing claim:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing claim',
      error: error.message 
    });
  }
} 