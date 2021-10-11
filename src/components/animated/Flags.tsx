import { motion, useTransform, useViewportScroll } from 'framer-motion';

export function Flags() {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);

  return (
    <motion.div style={{ scale }}>
      <motion.div
        style={{
          width: '15rem'
          scaleY: scrollYProgress,
        }}
      />
    </motion.div>
  );
}
