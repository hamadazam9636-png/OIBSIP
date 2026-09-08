import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PizzaCard from "../components/pizza/PizzaCard";
import { getPizzas } from "../services/pizzaService";

function Menu({ limit = null }) {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        const data = await getPizzas();
        setPizzas(data.pizzas || data);
      } catch (error) {
        console.error("Pizza fetch error:", error);
        setError("Unable to load pizzas. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPizzas();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.96,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Home: <Menu limit={8} /> -> first 8 only.
  // Menu page: <Menu /> -> all pizzas.
  const visiblePizzas =
    typeof limit === "number" ? pizzas.slice(0, limit) : pizzas;

  return (
    <main className="min-h-screen bg-dark-950 px-6 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.p
              variants={itemVariants}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-pizza-orange"
            >
              Our Menu
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-black tracking-tight text-pizza-cream sm:text-5xl md:text-6xl"
            >
              Made for your
              <span className="block text-pizza-red">
                cravings.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-xl text-sm leading-6 text-white/45 sm:text-base"
            >
              Discover our handcrafted pizzas made with premium ingredients
              and baked fresh for every order.
            </motion.p>
          </div>

          {/* View All -> full Menu page */}
          {typeof limit === "number" && (
            <motion.button
              type="button"
              onClick={() => navigate("/menu")}
              variants={itemVariants}
              whileHover={{
                scale: 1.04,
                y: -2,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.97 }}
              className="group flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-pizza-red/30 hover:bg-pizza-red/10 hover:text-white"
            >
              View All

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>
          )}
        </motion.div>

        {/* Loading */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="flex min-h-60 items-center justify-center"
            >
              <motion.p
                animate={{
                  opacity: [0.35, 1, 0.35],
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-sm font-medium text-white/40"
              >
                Loading pizzas...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence mode="wait">
          {!loading && error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="flex min-h-60 items-center justify-center"
            >
              <p className="text-sm font-medium text-red-400">
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty */}
        <AnimatePresence mode="wait">
          {!loading && !error && pizzas.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex min-h-60 items-center justify-center rounded-3xl border border-white/10 bg-white/3"
            >
              <p className="text-sm font-medium text-white/40">
                No pizzas available right now.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pizza Grid */}
        <AnimatePresence>
          {!loading && !error && visiblePizzas.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {visiblePizzas.map((pizza) => (
                <motion.div
                  key={pizza._id || pizza.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.015,
                    transition: {
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  whileTap={{ scale: 0.99 }}
                  style={{ transformOrigin: "center bottom" }}
                >
                  <PizzaCard
                    pizza={{
                      ...pizza,
                      id: pizza._id || pizza.id,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}

export default Menu;