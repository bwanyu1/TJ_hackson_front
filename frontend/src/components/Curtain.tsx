import { motion } from "framer-motion";

export default function Curtain() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 pointer-events-none">
      {/* 左の幕 */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-red-900"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      {/* 右の幕 */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-red-900"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>
  );
}