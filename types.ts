export enum DocumentType {
  PAN_CARD = 'PAN Card',
  AADHAR_CARD = 'Aadhar Card',
  DRIVING_LICENSE = 'Driving License',
  VOTER_ID = 'Voter ID',
  PASSPORT = 'Passport'
}

export interface VerificationResult {
  isValid: boolean;
  confidence: number;
  detectedType: string;
  reason: string;
  extractedDetails?: {
    name?: string;
    idNumber?: string;
  };
}

export interface DocumentConfig {
  type: DocumentType;
  label: string;
  description: string;
  icon: string;
}