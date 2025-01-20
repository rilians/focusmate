import React from 'react';
import UserProfile from '../components/UserProfile'; // Import komponen UserProfile

const Profile = () => {
  const userId = '678da80833374f7ccedbbb1a'; // Ganti dengan ID pengguna yang sesuai, bisa dari auth state

  return (
    <div>
      <h1>Your Profile</h1>
      <p>Here you can view your progress and manage your profile settings.</p>
      {/* Tambahkan komponen UserProfile */}
      <UserProfile userId={userId} />
    </div>
  );
};

export default Profile;
