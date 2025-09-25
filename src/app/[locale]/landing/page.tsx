"use client"

  import { useState, useEffect } from 'react'
  import { LandingSection } from '@/components/home/landing-section'
  import { HorizontalCarousel } from '@/components/home/horizontal-carousel'

  export default function LandingPage() {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY)
      window.addEventListener('scroll', handleScroll)     
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
      <div className="landing-container">
        {/* 第一个section: 全屏水平轮播 */}
        <section 
          className="h-screen overflow-hidden"
          style={{
            transform: `scale(${1 + scrollY * 0.0005})`,  
            opacity: Math.max(0, 1 - scrollY * 0.001)     
          }}
        >
          <HorizontalCarousel />
        </section>

        {/* 第二个section: 垂直滚动内容 */}
        <section className="min-h-screen">
          <LandingSection />
        </section>
      </div>
    )
  }