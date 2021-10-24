import { motion } from 'framer-motion';

interface ILayout {
  children: React.ReactNode;
}

const variants = {
  hidden: { opacity: 0, y: 400 },
  enter: { opacity: 1, y: -20 },
  exit: { opacity: 0, y: 100 },
};

export function Layout({ children }: ILayout) {
  return (
    <motion.main
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      variants={variants} // Pass the variant object into Framer Motion
      transition={{ type: 'spring', duration: 0.7 }} // Set the transition to linear
    >
      {children}
    </motion.main>
  );
}
