import { motion } from "framer-motion";

interface Iprops {
  children: React.ReactNode;
  backdropClassname: string;
  onClick: () => void;
  popperData?: {
    ref: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
    style: React.CSSProperties;
    attributes:
      | {
          [key: string]: string;
        }
      | undefined;
  };
}

const Backdrop = ({
  children,
  backdropClassname,
  onClick,
  popperData,
}: Iprops) => {
  return (
    <motion.div
      ref={popperData?.ref}
      style={popperData?.style}
      {...popperData?.attributes}
      
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
