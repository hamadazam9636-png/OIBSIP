import {
  Heart,
  Leaf,
  Flame,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description:
      "We use carefully selected ingredients to give every pizza a fresh and delicious taste.",
  },
  {
    icon: Flame,
    title: "Perfectly Baked",
    description:
      "Every pizza is baked at the perfect temperature for a crispy crust and melty cheese.",
  },
  {
    icon: Sparkles,
    title: "Made Your Way",
    description:
      "Choose your base, sauce, cheese and vegetables to create a pizza that is truly yours.",
  },
  {
    icon: Heart,
    title: "Made With Passion",
    description:
      "From preparation to the final slice, every pizza is crafted with care and passion.",
  },
];

function WhyChoose() {
  return (
    <section className="bg-dark-950 px-6 py-16 lg:px-8">

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
              duration: 0.6,
              delay: 0.1,
            }}
          >
            Why Pizzaro
          </motion.p>

          <motion.h2
            className="mt-3 text-4xl font-black tracking-tight text-pizza-cream sm:text-5xl"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
          >
            More than just pizza.
          </motion.h2>

          <motion.p
            className="mt-5 text-sm leading-6 text-white/40 sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
          >
            We believe great pizza starts with great ingredients,
            attention to detail, and a whole lot of passion.
          </motion.p>

        </motion.div>

        {/* Features */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                className="group rounded-3xl border border-white/10 bg-white/3 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-pizza-red/30 hover:bg-white/5"
                initial={{
                  opacity: 0,
                  y: 80,
                  scale: 0.92,
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
                  delay: index * 0.15,
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

                {/* Icon */}
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pizza-red/10 text-pizza-red transition-all duration-300 group-hover:bg-pizza-red group-hover:text-white"
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    rotate: -20,
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
                    duration: 0.6,
                    delay: index * 0.15 + 0.25,
                    type: "spring",
                    stiffness: 180,
                    damping: 12,
                  }}
                  whileHover={{
                    rotate: 8,
                    scale: 1.12,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                >
                  <Icon size={21} />
                </motion.div>

                {/* Content */}
                <motion.h3
                  className="mt-6 text-lg font-bold text-white"
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15 + 0.35,
                  }}
                >
                  {feature.title}
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
                    delay: index * 0.15 + 0.45,
                  }}
                >
                  {feature.description}
                </motion.p>

              </motion.article>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;