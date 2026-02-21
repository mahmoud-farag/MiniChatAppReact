import { Loader as LoaderIcon} from 'lucide-react'

interface ILoaderProps {
    // children: React.ReactNode;
    size?: number;
    className?: string;
};

const Loader = ({ size = 10, className }: ILoaderProps) => {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
        <LoaderIcon className={`animate-spin size-${size}`}/>
        
    </div>
  )
}

export default Loader