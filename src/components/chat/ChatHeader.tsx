import { X } from 'lucide-react';
import type { IUser } from '../../libs/interfaces';

interface ChatHeaderProps {
  user: IUser;
  onClose: () => void;
}

const ChatHeader = ({ user, onClose }: ChatHeaderProps) => {
  return (
    <div className="px-5 py-3 border-b border-base-300 bg-base-100 flex items-center justify-between shadow-sm z-10">
      <div className="flex items-center gap-3">
        <div className={`avatar ${user.avatarS3FileName ? '' : 'placeholder'}`}>
          <div className="size-10 rounded-full bg-primary/20 text-primary">
            {user.avatarS3FileName ? (
              <img src={user.avatarS3FileName} alt={user.fullName} className="object-cover" />
            ) : (
              <span className="text-lg font-semibold">{user.fullName.charAt(0).toUpperCase()}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-base leading-tight">{user.fullName}</h3>
          <p className="text-xs text-base-content/70 mt-0.5">Online</p>
        </div>
      </div>
      <button 
        onClick={onClose} 
        className="btn btn-ghost btn-sm btn-circle lg:hidden"
        aria-label="Close chat"
      >
        <X size={22} className="text-base-content/70"/>
      </button>
    </div>
  );
};

export default ChatHeader;
