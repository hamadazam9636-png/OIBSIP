import { ArrowRight, Pizza, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-dark-950 px-6 py-24 lg:px-8">

      {/* Background Glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pizza-red/10 blur-[120px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto max-w-5xl">

        <motion.div
          className="overflow-hidden rounded-4xl border border-white/10 bg-white/3 px-6 py-14 text-center sm:px-10 sm:py-16"
          initial={{
            opacity: 0,
            y: 70,
            scale: 0.94,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          {/* Icon */}
          <motion.div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pizza-red/10 text-pizza-red"
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
              delay: 0.25,
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
            <Pizza size={26} />
          </motion.div>

          {/* Badge */}
          <motion.div
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-pizza-orange"
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
              duration: 0.6,
              delay: 0.4,
            }}
          >
            <motion.span
              animate={{
                rotate: [0, 12, -12, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={14} />
            </motion.span>

            Your perfect pizza awaits
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-tight text-pizza-cream sm:text-5xl lg:text-6xl"
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Ready to create something
            <motion.span
              className="block text-pizza-orange"
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.65,
              }}
            >
              delicious?
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/40 sm:text-base"
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
              duration: 0.6,
              delay: 0.8,
            }}
          >
            Choose your favorite ingredients and build a pizza
            that's made exactly the way you want it.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.95,
            }}
          >

            <motion.div
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <Link
                to="/pizza-builder"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-pizza-red px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-pizza-orange hover:shadow-xl hover:shadow-pizza-red/20"
              >
                Build Your Pizza

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <Link
                to="/menu"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-bold text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                Explore Menu
              </Link>
            </motion.div>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}

export default FinalCTA;