 'use client'

  import { useEffect, useRef } from 'react'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import Lenis from 'lenis'
  import './styles.css'

  export function LandingAnimation() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis()
      lenis.on("scroll", ScrollTrigger.update)
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)

      // 设置初始状态
      gsap.set(".img", { scale: 0, force3D: true })

      // 为每行创建动画
      const rows = document.querySelectorAll(".row")

      rows.forEach((row, index) => {
        const rowImages = row.querySelectorAll(".img")

        if (rowImages.length > 0) {
          // 进入动画
          ScrollTrigger.create({
            trigger: row,
            start: "top bottom",
            end: "bottom bottom-=10%",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress
              const scaleValue = gsap.utils.interpolate(0, 1, Math.min(1, progress * 1.2))

              rowImages.forEach((img) => {
                gsap.set(img, {
                  scale: scaleValue,
                  force3D: true
                })
              })
            }
          })

          // 退出动画
          ScrollTrigger.create({
            trigger: row,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: 1,
            onUpdate: (self) => {
              const scale = gsap.utils.interpolate(1, 0, self.progress)

              rowImages.forEach((img) => {
                gsap.set(img, {
                  scale: scale,
                  force3D: true
                })
              })
            }
          })
        }
      })

      return () => {
        lenis.destroy()
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        gsap.killTweensOf("*")
      }
    }, [])

    return (
      <div ref={containerRef}>
        <section className="intro">
          <h1>Design that Captivates</h1>
          <p>( Explore Below )</p>
        </section>

        <section className="work">
          <div className="row">
            <div className="col">
              <div className="img" data-origin="right">
                <img src="/hero1.jpg" alt="" />
              </div>
            </div>
            <div className="col"></div>
            <div className="col">
              <div className="img" data-origin="left">
                <img src="/hero2.jpg" alt="" />
              </div>
            </div>
            <div className="col"></div>
          </div>

          <div className="row">
            <div className="col"></div>
            <div className="col">
              <div className="img" data-origin="left">
                <img src="/hero3.jpg" alt="" />
              </div>
            </div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
        </section>
      </div>
    )
  }