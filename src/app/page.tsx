'use client'

import { motion } from "motion/react";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import CTA from "@/components/CTA";

export default function Home() {
  const variant = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      filter: 'blur(10px)',
      transition: {
        duration: 0.3
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.3
      }
    }
  }
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
    >
      <motion.div variants={variant}>
        <Hero />
      </motion.div>
      <motion.div variants={variant}>
        <Features />
      </motion.div>
      <motion.div variants={variant}>
        <CTA />
      </motion.div>
      <motion.div variants={variant}>
        <Footer />
      </motion.div>
    </motion.div>
  );
}
