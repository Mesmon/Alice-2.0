import { motion } from 'framer-motion';

interface Iprops {
  children: React.ReactNode;
  backdropClassname: string;
  onClick: () => void;
}

const Backdrop = ({
  children,
  backdropClassname,
  onClick,
}: Iprops) => (
    <motion.div
      className={backdropClassname}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
);

export default Backdrop;
