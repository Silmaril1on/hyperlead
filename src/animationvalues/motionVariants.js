export const infinityScroll = {
  hidden: {
    x: 0,
  },
  visible: {
    x: "-100%",
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
      delay: 0,
    },
  },
};

export const slideShow = {
  hidden: (direction) => {
    return {
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    };
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "ease",
    },
  },
  exit: (direction) => {
    return {
      x: direction > 0 ? -200 : 200,
      opacity: 0,
      transition: {
        type: "ease",
      },
    };
  },
};

export const zoomOut = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1,
      ease: "linear",
    },
  },
};

export const slideTop = {
  hidden: {
    y: 100,
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const slideLeft = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: "linear",
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.4,
      ease: "linear",
    },
  },
};
