import PREVIEW_MESSAGES from '../../constants/preview';
import type { IUser } from '../../libs/interfaces';

interface ChatBodyProps {
  user: IUser;
}

const ChatBody = ({ user }: ChatBodyProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100/50">
      {PREVIEW_MESSAGES.map((message) => (
        <div
          key={message.id}
          className={`chat ${message.isSent ? 'chat-end' : 'chat-start'}`}
        >
          <div className={`chat-image avatar ${!message.isSent && user.avatarS3FileName ? '' : 'placeholder'}`}>
            <div className="size-9 rounded-full bg-primary/20 text-primary">
               {!message.isSent && user.avatarS3FileName ? (
                 <img src={user.avatarS3FileName} alt={user.fullName} className="object-cover" />
               ) : (
                 <span className="text-sm font-medium">
                   {message.isSent ? 'You' : user.fullName.charAt(0).toUpperCase()}
                 </span>
               )}
            </div>
          </div>
          <div className="chat-header mb-1">
            <time className="text-base opacity-50">12:00</time>
          </div>
          <div className={`chat-bubble shadow-sm ${message.isSent ? 'chat-bubble-primary text-primary-content' : 'bg-base-200 text-base-content'}`}>
            {message.content}
          </div>
        </div>
      ))}
      
      {/* Adding a dummy image message based on the design preview */}
      <div className="chat chat-end">
        <div className="chat-image avatar placeholder">
          <div className="size-9 rounded-full bg-primary/20 text-primary">
            <span className="text-sm font-medium">Y</span>
          </div>
        </div>
        <div className="chat-header mb-1">
          <time className="text-base opacity-50">12:01</time>
        </div>
        <div className="chat-bubble chat-bubble-primary p-1">
           <img 
             src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=250&auto=format&fit=crop" 
             alt="Camera" 
             className="w-48 h-auto rounded-xl"
           />
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
