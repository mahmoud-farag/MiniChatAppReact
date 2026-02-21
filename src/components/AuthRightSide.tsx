

interface IAuthRightSideProps {
    title: string;
    subTitle: string
}

const AuthRightSide = ({ title, subTitle }: IAuthRightSideProps) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? 'animate-pulse' : ''
              }`}
              style={i % 2 === 0 ? { animationDuration: '1s', animationDelay: `${i * 0.2}s` } : undefined}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subTitle}</p>
      </div>
    </div>
  );
};

export default AuthRightSide;