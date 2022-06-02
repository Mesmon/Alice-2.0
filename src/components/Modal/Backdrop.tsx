import { motion } from "framer-motion";

const Backdrop = ({
  children,
  backdropClassname,
  onClick,
}: {
  children: React.ReactNode;
  backdropClassname: string;
  onClick: () => void;
}) => {
  return (
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
};

export default Backdrop;
