import PropTypes from "prop-types";
import { motion } from "framer-motion";
import styles from "./Transition.module.scss";
import { useAppContext } from "../../Context";
import { useLocation } from "react-router-dom";

const Transition = ({ children }) => {
  const { setIsTransitionFinished } = useAppContext();
  const location = useLocation();

  const handleExitComplete = () => {
    setIsTransitionFinished(true);
    setTimeout(() => {
      setIsTransitionFinished(false);
    }, 2000);
  };

  return (
    <>
      {children}

      <motion.div
        className={styles.slideIn}
        initial={{ scaleY: 0, scaleX: 1 }}
        animate={{ scaleY: 0, scaleX: 1 }}
        exit={{ scaleY: 1, scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={handleExitComplete}
      />

      <motion.div
        className={styles.secondSlideIn}
        initial={{ scaleY: 0, scaleX: 1 }}
        animate={{ scaleY: 0, scaleX: 1 }}
        exit={{ scaleY: 1, scaleX: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={handleExitComplete}
      />

      <motion.div
        className={styles.thirdSlideIn}
        initial={{ scaleY: 0, scaleX: 1 }}
        animate={{ scaleY: 0, scaleX: 1 }}
        exit={{ scaleY: 1, scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={handleExitComplete}
      />

      <motion.div
        className={styles.slideOut}
        initial={{ scaleY: 1, scaleX: 1 }}
        animate={{ scaleY: 0, scaleX: 1 }}
        exit={{ scaleY: 0, scaleX: 1 }}
        transition={{
          delay: location.pathname === "/" ? 0.9 : 0.4,
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      ></motion.div>

      <motion.div
        className={styles.secondSlideOut}
        initial={{ scaleY: 1, scaleX: 1 }}
        animate={{ scaleY: 0, scaleX: 1 }}
        exit={{ scaleY: 0, scaleX: 1 }}
        transition={{
          delay: location.pathname === "/" ? 0.5 : 0,
          duration: 0.4,
          ease: [0.64, 0, 0.78, 0],
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{
            delay: location.pathname === "/" ? 0 : 0,
            duration: 0.2,
            ease: "easeInOut",
          }}
          className={styles.loader}
        ></motion.div>
      </motion.div>
    </>
  );
};

Transition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Transition;