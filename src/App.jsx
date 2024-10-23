import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import '@/App.css'
import Global from '@/Global'
import Home from '@/Pages/Home'
import LeaderBoard from '@/Pages/LeaderBoard'
import Profile from '@/Pages/Profile'
import Navbar from '@/components/Navbar'
import RedirectPage from "@/Pages/Redirect"
import Events from './Pages/Events'
import { infinity } from "ldrs";
import Teams from './Pages/Team'
import PointSystem from './Pages/PointSystem'
import Hacktober2024 from './Pages/Hacktober2024'
import Loader from './components/Loader'
import ContributorsPage from './Pages/Contributors'
import { SEOLayout } from './components/SEOLayout'
import NavbarHF from './components/NavbarHF'
infinity.register()

function App() {
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (section) => {
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: section } });
        } else {
            const element = document.getElementById(section);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Navigate to /hacktoberfest2024 when Register button is clicked
    const handleRegisterClick = () => {
        navigate('/hacktoberfest2024');
    };

    useEffect(() => {
        const initializeUser = async () => {
            try {
                if (location.pathname !== '/redirect') {
                    await Global.getUser();
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoaded(true);
            }
        };

        initializeUser();
    }, [location.pathname]);

    if (!loaded && location.pathname !== '/redirect') {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br overflow-hidden from-[#1e1e1e] to-[#4e3535]">
                <Loader size='80'/>
            </div>
        )
    }

    return (
        <SEOLayout >
            <div className="bg-gradient-to-br overflow-hidden from-[#1e1e1e] to-[#4e3535] min-h-screen">
                <Routes>
                    <Route path="/">
                        <Route index element={<Home onRegisterClick={handleRegisterClick} />} />
                        <Route path="/contributors/:repoName" element={<ContributorsPage />} />
                        <Route path="leaderboard" element={<LeaderBoard />} />
                        <Route path="events/:year" element={<Events />} />
                        <Route path="profile/:username" element={<Profile />} />
                        <Route path='/team' element={<Teams />} />
                        <Route path='/point-system' element={<PointSystem />} />
                    </Route>

                    <Route path='/hacktoberfest2024' element={<NavbarHF/>}>
                        <Route index element={<Hacktober2024/>}/>
                        <Route path='leaderboard' element={<LeaderBoard/>}/>
                        <Route path='point-system' element={<PointSystem />} />
                    </Route>

                    <Route path="/redirect" element={<RedirectPage />} />
                </Routes>
            </div>
        </SEOLayout>
    )
}

export default App;
