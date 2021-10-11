import { motion } from 'framer-motion';

interface ILayout {
  children: React.ReactNode;
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 350 },
  enter: { opacity: 1, x: 0, y: -20 },
  exit: { opacity: 0, x: 0, y: 400 },
};

export function Layout({ children }: ILayout) {
  return (
    <motion.main
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: 'spring' }} // Set the transition to linear
    >
      {children}
    </motion.main>
  );
}
