import { google } from 'googleapis';
import nodemailer from 'nodemailer';

// Google Drive folder ID for claims (you'll need to replace this with your actual folder ID)
const CLAIMS_FOLDER_ID = 'YOUR_FOLDER_ID';

// Email configuration
const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.REACT_APP_EMAIL_USER,
    pass: process.env.REACT_APP_EMAIL_PASS
  }
};

// Initialize Google Drive API
const initializeDrive = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.REACT_APP_GOOGLE_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });
  
  return google.drive({ version: 'v3', auth });
};

// Create folder in Google Drive
const createClaimFolder = async (claimNumber, date) => {
  const drive = await initializeDrive();
  const folderName = `${date}_${claimNumber}`;
  
  const folderMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [CLAIMS_FOLDER_ID]
  };

  const folder = await drive.files.create({
    resource: folderMetadata,
    fields: 'id'
  });

  return folder.data.id;
};

// Upload file to Google Drive
const uploadFile = async (folderId, file) => {
  const drive = await initializeDrive();
  
  const fileMetadata = {
    name: file.name,
    parents: [folderId]
  };

  const media = {
    mimeType: file.type,
    body: file
  };

  await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  });
};

// Send email notification
const sendEmailNotification = async (claimData) => {
  const transporter = nodemailer.createTransport(emailConfig);

  const emailContent = `
    New Claim Submission Alert
    
    Claim Number: ${claimData.claimNumber}
    Date: ${claimData.date}
    Claimant: ${claimData.claimantName}
    Amount: ${claimData.claimAmount}
    
    The claim documents have been stored in Google Drive.
    
    This is an automated notification.
  `;

  await transporter.sendMail({
    from: emailConfig.auth.user,
    to: 'claims@mavinc.com',
    subject: `New Claim Submission - ${claimData.claimNumber}`,
    text: emailContent
  });
};

// Main function to handle claim submission
export const handleClaimSubmission = async (formData, files) => {
  try {
    // Create folder for the claim
    const folderId = await createClaimFolder(
      formData.claimNumber,
      new Date().toISOString().split('T')[0]
    );

    // Upload each file
    for (const file of files) {
      await uploadFile(folderId, file);
    }

    return { success: true };
  } catch (error) {
    console.error('Error handling claim submission:', error);
    return { success: false, error: error.message };
  }
}; 