import { Camera, Mail, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/customHooks';
import { s3Service, userService } from '../services';
import toast from 'react-hot-toast';

const ProfilePage = () => {

  //* States
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  //* Custom hooks
  const { currentUser } = useAuth();


  //* derived State
  const memberSince = currentUser?.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

  //* refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  //* helper functions

  const getProfileAvatar = async () => {
    try {
      const response = await userService.getProfileAvatar();
      if (response?.data?.signedUrl) setAvatarUrl(response.data.signedUrl);
    } catch (error) {
      toast.error((error as Error)?.message || 'Failed to fetch profile avatar');
    }
  };

  //* life cycle hooks

  useEffect(() => {

    getProfileAvatar();

  }, []);

  //* event handlers
  const handleAvatarUploading = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);

      const file = e.target.files?.[0];

      if (!file) return;

      const response = await userService.getAvatarPresignedUrl({ fileName: file.name, contentType: file.type });

      if (!response?.data?.uploadUrl) {
        toast.error('URL not generated, can not uploading your file');
        return;
      }


      await s3Service.uploadToS3({ file, url: response.data.uploadUrl });

      // re-fetch the avatar after the uploading;
      await getProfileAvatar();
      

    } catch (error) {
      toast.error((error as Error)?.message || 'Failed to upload profile avatar');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-10rem)]'>
      <div className='bg-base-300 rounded-xl p-8 w-full max-w-5xl  space-y-6'>

        {/* Header */}
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Profile</h1>
          <p className='text-base-content/60 text-sm mt-1'>Your profile information</p>
        </div>

        {/* Avatar */}
        <div className='flex flex-col items-center gap-3'>
          <div className='relative'>
            <div className='w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center ring-4 ring-base-100'>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt='avatar'
                  className='w-full h-full rounded-full object-cover'
                />
              ) : (
                <User size={40} className='text-primary' />
              )}
            </div>

            <>
              <button
                type='button'
                onClick={() => fileInputRef.current?.click()}
                className='absolute bottom-0 right-0 bg-base-100 border border-base-300 rounded-full p-1.5 hover:bg-base-200 transition-colors'>
                
                <Camera size={14} />
              </button>
              <input
                ref={fileInputRef}
                type='file'
                className='hidden'
                onChange={handleAvatarUploading}
                accept='image/*'
              />
            </>
          </div>
          <p className='text-xs text-base-content/50'>
            {isUploading ? 'Uploading...' : 'Click the camera icon to update your photo'}
          </p>
        </div>

        {/* Fields */}
        <div className='space-y-4'>
          <div>
            <label className='text-sm text-base-content/60 mb-1 flex items-center gap-1'>
              <User size={23}  strokeWidth={2.5} /> Full Name
            </label>
            <input
              type='text'
              className='input input-bordered w-full'
              value={currentUser?.fullName ?? ''}
              disabled
              placeholder='Full Name'
            />
          </div>

          <div>
            <label className='text-sm text-base-content/60 mb-1 flex items-center gap-1'>
              <Mail size={23} strokeWidth={2.5} /> Email Address
            </label>
            <input
              type='email'
              className='input input-bordered w-full'
              value={currentUser?.email ?? ''}
              disabled
              placeholder='Email Address'
            />
          </div>
        </div>

        {/* Account Info */}
        <div className='border-t border-base-content/10 pt-4 space-y-3'>
          <h2 className='text-sm font-semibold text-base-content/70'>Account Information</h2>

          <div className='flex items-center justify-between text-sm'>
            <span className='text-base-content/60'>Member Since</span>
            <span>{memberSince}</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;