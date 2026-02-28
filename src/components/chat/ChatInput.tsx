import { Image, Send } from 'lucide-react';

const ChatInput = () => {
  return (
    <div className="p-4 bg-base-100 border-t border-base-300">
      <form 
        className="flex items-center gap-2 max-w-4xl mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative flex-1 flex items-center">
          <input
            type="text"
            className="input input-bordered w-full rounded-full pl-5 pr-12 bg-base-200 focus:bg-base-100 transition-colors"
            placeholder="Type a message..."
          />
        </div>
        
        <button 
          type="button" 
          className="btn btn-circle btn-ghost text-base-content/70"
          aria-label="Attach image"
        >
          <Image size={22} />
        </button>
        
        <button 
          type="submit" 
          className="btn btn-circle btn-primary"
          aria-label="Send message"
        >
          <Send size={20} className="ml-1" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
