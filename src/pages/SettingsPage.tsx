import { THEMES } from '../constants';
import { useTheme } from '../context/react-context/customHooks';
import Preview from '../components/Preview';




const SettingsPage = () => {

  const { theme: currentTheme, updateTheme } = useTheme();
  return (
    <div className=" h-screen container mx-auto">
      <div className="space-y-7">
      <h1 className="text-2xl font-bold mb-4 tracking-tight text-slate-500">Change your app settings from here</h1>
        <div>
          <p className="text-slate-500">Choose a theme for your app</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {THEMES.map((theme) => (
            <button 
              key={theme} 
              className={`group rounded-md flex flex-col items-center justify-center p-2 gap-2
              ${theme === currentTheme ? 'bg-slate-200' : 'hover:bg-base-200/50'}`}
              onClick={() => updateTheme(theme)}
            >
            
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={theme}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>

              <span className="text-sm  truncate w-full text-center">
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </span>
            </button>
          ))}
        </div>

        <div className='w-full border-t-2 border-slate-400'></div>

          <Preview/>

          <br/>
      </div>
    </div>
  )
}

export default SettingsPage;