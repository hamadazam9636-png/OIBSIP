import {
  Pizza,
  SlidersHorizontal,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: Pizza,
    title: "Choose Your Pizza",
    description:
      "Explore our menu or start creating your own custom pizza.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "Customize It",
    description:
      "Pick your base, sauce, cheese and favorite vegetables.",
  },
  {
    number: "03",
    icon: ShoppingCart,
    title: "Add to Cart",
    description:
      "Review your pizza, adjust the quantity and add it to your cart.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Enjoy Your Pizza",
    description:
      "Place your order and get your freshly baked pizza delivered.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-dark-950 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <motion.p
            className="text-xs font-bold uppercase tracking-[0.25em] text-pizza-orange"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
          >
            Simple Process
          </motion.p>

          <motion.h2
            className="mt-3 text-4xl font-black tracking-tight text-pizza-cream sm:text-5xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            From craving to pizza.
          </motion.h2>

          <motion.p
            className="mt-5 text-sm leading-6 text-white/40 sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
          >
            Creating your perfect pizza is easier than ever.
            Just follow these simple steps.
          </motion.p>

        </motion.div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {/* Connecting Line */}
          <motion.div
            className="pointer-events-none absolute left-[12%] right-[12%] top-12 hidden h-px bg-white/10 lg:block"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                className="group relative rounded-3xl border border-white/10 bg-white/3 p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-pizza-red/30 hover:bg-white/5"
                initial={{
                  opacity: 0,
                  y: 80,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -8,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
              >

                {/* Number */}
                <motion.div
                  className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-pizza-red/20 bg-pizza-red/10 text-pizza-red transition-all duration-300 group-hover:border-pizza-red/40 group-hover:bg-pizza-red group-hover:text-white"
                  initial={{
                    opacity: 0,
                    scale: 0.4,
                    rotate: -25,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 * index + 0.2,
                    type: "spring",
                    stiffness: 180,
                    damping: 12,
                  }}
                  whileHover={{
                    scale: 1.12,
                    rotate: 8,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                >

                  <Icon size={24} />

                  <motion.span
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-dark-800 text-[10px] font-black text-pizza-orange ring-1 ring-white/10"
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 * index + 0.55,
                      type: "spring",
                      stiffness: 250,
                    }}
                  >
                    {step.number}
                  </motion.span>

                </motion.div>

                {/* Content */}
                <motion.h3
                  className="mt-6 text-lg font-bold text-white"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 * index + 0.4,
                  }}
                >
                  {step.title}
                </motion.h3>

                <motion.p
                  className="mt-3 text-sm leading-6 text-white/40"
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 * index + 0.5,
                  }}
                >
                  {step.description}
                </motion.p>

              </motion.article>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;