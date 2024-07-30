import { MdDashboard } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { FaUserSecret } from "react-icons/fa";
import { GiVacuumCleaner } from "react-icons/gi";
import { CiSquareQuestion } from "react-icons/ci";

export const SidebarData = [
    {
        icons:<MdDashboard />,
        name: 'Dashboard',
        path: '/dashboard',
    },
    {
        icons:<RiProfileLine />,
        name: 'Profile',
        path: '/profile',
    },
    {
        icons:<RiProfileLine />,
        name: 'Scheduling',
        path: '/scheduling',
    },
    {
        icons:<CiSquareQuestion  />,
        name: 'Booking',
        path: '/book',
    },
    {
        icons:<RiProfileLine />,
        name: 'Payment Gateway',
        path: '/payment',
    },
    {
        icons:<GiVacuumCleaner />,
        name: 'Manage Cleaner',
        path: '/cleaner',
    },
    {
        icons:<FaUserSecret />,
        name: 'Manage Users',
        path: '/users',
    },
    // {
    //     icons:<RiProfileLine />,
    //     name: 'Help center',
    //     path: '/helpList',
    // },
    {
        icons:<RiProfileLine />,
        name: 'Feedback',
        path: '/feedbackList',
    }
]