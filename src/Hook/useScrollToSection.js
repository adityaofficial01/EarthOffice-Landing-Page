// Hook/useScrollToSection.js
import { ScrollSmoother } from 'gsap/all';

const useScrollToSection = () => {
  return (section, offset = 0) => {
    const smoother = ScrollSmoother.get();

    if (!smoother) return;

    const element = document.querySelector(`[name="${section}"]`);

    if (!element) return;

    smoother.scrollTo(element, true, "top top");
  };
};

export default useScrollToSection;
