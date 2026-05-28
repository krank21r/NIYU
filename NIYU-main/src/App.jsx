import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import AnnouncementBar from './components/AnnouncementBar'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import OrderFlow from './components/OrderFlow'
import ProductDetail from './components/ProductDetail'
import Particles from './components/Particles'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import useLenis from './hooks/useLenis'

const Hero = lazy(() => import('./components/Hero'))
const TrialPack = lazy(() => import('./components/TrialPack'))
const TrendingProducts = lazy(() => import('./components/TrendingProducts'))
const NiyuSpecials = lazy(() => import('./components/NiyuSpecials'))
const AttarSection = lazy(() => import('./components/AttarSection'))
const CarPerfumes = lazy(() => import('./components/CarPerfumes'))
const About = lazy(() => import('./components/About'))
const ProductCollection = lazy(() => import('./components/ProductCollection'))
const Reviews = lazy(() => import('./components/Reviews'))
const Gallery = lazy(() => import('./components/Gallery'))
const Contact = lazy(() => import('./components/Contact'))
const TrustBar = lazy(() => import('./components/TrustBar'))
const Footer = lazy(() => import('./components/Footer'))

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border border-gold/30 border-t-gold rounded-full animate-spin" />
        <p className="text-xs tracking-[0.2em] uppercase text-ink-subtle font-body">Loading</p>
      </div>
    </div>
  )
}

export default function App() {
  useLenis()

  return (
    <CartProvider>
    <WishlistProvider>
      <div className="bg-ivory min-h-screen relative">
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <Preloader />
        <Particles />
        <ScrollProgress />
        <ScrollToTop />
        <AnnouncementBar />
        <Navbar />
        <OrderFlow />
        <ProductDetail />
        <main id="main-content">
          <Suspense fallback={<LoadingFallback />}>
            <Hero />
            <TrialPack />
            <TrendingProducts />
            <NiyuSpecials />
            <AttarSection />
            <CarPerfumes />
            <About />
            <ProductCollection />
            <Reviews />
            <Gallery />
            <Contact />
            <TrustBar />
            <Footer />
          </Suspense>
        </main>
      </div>
    </WishlistProvider>
    </CartProvider>
  )
}
