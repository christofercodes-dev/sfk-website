  import InfoCards from '@/components/infoCards';
  import Hero from '../../components/Hero'; // Kontrollera att stigen är rätt
  import AboutSection from '@/components/AboutSection';
  import Specialties from '@/components/Specialties';
  import Activities from '@/components/Activities';
  import Gallery from '@/components/Gallery';
  import UpcomingEvents from '@/components/UpcomingEvents';
  import Footer from '@/components/Footer';
  import Navbar from '@/components/Navbar';
  import LatestResults from '@/components/LatestResults';
  import Partners from '@/components/Partners';

  export default function HomePage() {
    return (
      <main>
        <Hero /> 
         {/* <InfoCards/> */}
         <AboutSection/>
         <Partners/>
        <LatestResults/>
         <Specialties/>
 
        <UpcomingEvents/>
        
        <Gallery/>
        <Activities/>
        
 
      </main>
    );
  }