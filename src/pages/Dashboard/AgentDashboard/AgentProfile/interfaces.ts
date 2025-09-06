export interface UserProfile {
  _id?: string;
  name: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalInfoProps {
  userProfile: UserProfile;
}