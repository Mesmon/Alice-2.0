import Link from 'next/link';
import ToggleDarkMode from './ToggleDarkMode';

const NavigationBar = () => <div className='flex p-2 gap-4 dark:bg-slate-800 dark:text-slate-200'>
        <h1><Link href="/">Home</Link></h1>
        <h1><Link href="tablePage">Table Page</Link></h1>
        <ToggleDarkMode />
    </div>;

export default NavigationBar;
