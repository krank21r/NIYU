import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance = null
let rafId = null

function startRaf(lenis) {
  function raf(time) {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
}

function stopRaf() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

export function stopSmoothScroll() {
  stopRaf()
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}

export function startSmoothScroll() {
  if (!lenisInstance) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })
    lenisInstance = lenis
    startRaf(lenis)
  }
}

export default function useLenis() {
  useEffect(() => {
    startSmoothScroll()

    return () => {
      stopSmoothScroll()
    }
  }, [])
}
