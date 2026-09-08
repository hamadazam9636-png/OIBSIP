import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Pizza,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import BaseSelector from "./BaseSelector";
import SauceSelector from "./SauceSelector";
import CheeseSelector from "./CheeseSelector";
import VegetableSelector from "./VegetableSelector";

function PizzaBuilder() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [pizza, setPizza] = useState({
    base: null,
    sauce: null,
    cheese: null,
    vegetables: [],
  });

  const steps = [
    "Base",
    "Sauce",
    "Cheese",
    "Vegetables",
  ];

  const stepDescriptions = {
    Base: "Start with the perfect foundation for your pizza.",
    Sauce: "Choose a sauce that brings your pizza to life.",
    Cheese: "Pick the cheese that completes your flavor.",
    Vegetables: "Add as many fresh vegetables as you like.",
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    navigate("/order-summary", {
      state: {
        pizza,
      },
    });
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const selectVegetable = (vegetable) => {
    const exists = pizza.vegetables.some(
      (item) => item.id === vegetable.id
    );

    if (exists) {
      setPizza({
        ...pizza,
        vegetables: pizza.vegetables.filter(
          (item) => item.id !== vegetable.id
        ),
      });
    } else {
      setPizza({
        ...pizza,
        vegetables: [
          ...pizza.vegetables,
          vegetable,
        ],
      });
    }
  };

  const currentStep = steps[step - 1];

  const isDisabled =
    (step === 1 && !pizza.base) ||
    (step === 2 && !pizza.sauce) ||
    (step === 3 && !pizza.cheese);

  return (
    <main className="min-h-screen bg-dark-950 px-5 pb-20 pt-28 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <section className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-white/3 px-6 py-10 sm:px-10 lg:px-14">

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-pizza-red/15 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-pizza-orange/10 blur-3xl" />

          <div className="relative">

            <div className="mb-5 flex items-center gap-2 text-pizza-orange">
              <Sparkles size={16} />

              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Create your pizza
              </span>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

              <div>
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  Build it
                  <span className="text-pizza-orange">
                    {" "}your way.
                  </span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
                  Choose every ingredient and create a pizza made
                  exactly the way you want it.
                </p>
              </div>

              <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 sm:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-red/10 text-pizza-red">
                  <Pizza size={19} />
                </div>

                <div>
                  <p className="text-xs text-white/30">
                    Your creation
                  </p>

                  <p className="text-sm font-bold">
                    Custom Pizza
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="mb-10">

          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
              Pizza progress
            </p>

            <p className="text-xs font-semibold text-pizza-orange">
              Step {step} of 4
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/3 p-4 sm:p-5">

            <div className="flex items-center">

              {steps.map((item, index) => {
                const stepNumber = index + 1;
                const completed = stepNumber < step;
                const active = stepNumber === step;

                return (
                  <div
                    key={item}
                    className="flex flex-1 items-center"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">

                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-500 sm:h-10 sm:w-10 ${
                          completed
                            ? "border-pizza-red bg-pizza-red text-white"
                            : active
                              ? "border-pizza-orange bg-pizza-orange/10 text-pizza-orange shadow-lg shadow-pizza-orange/10"
                              : "border-white/10 bg-white/5 text-white/25"
                        }`}
                      >
                        {completed ? (
                          <Check size={15} />
                        ) : (
                          stepNumber
                        )}
                      </div>

                      <span
                        className={`hidden text-xs font-semibold sm:block ${
                          active
                            ? "text-white"
                            : completed
                              ? "text-white/60"
                              : "text-white/25"
                        }`}
                      >
                        {item}
                      </span>

                    </div>

                    {index < steps.length - 1 && (
                      <div
                        className={`mx-2 h-px flex-1 transition-all duration-500 sm:mx-4 ${
                          stepNumber < step
                            ? "bg-pizza-red"
                            : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                );
              })}

            </div>
          </div>
        </section>

        {/* Builder */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-black/20">

          <div className="border-b border-white/10 px-6 py-7 sm:px-8">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-pizza-orange">
                  {currentStep}
                </p>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  {currentStep === "Base" &&
                    "Choose your pizza base"}

                  {currentStep === "Sauce" &&
                    "Choose your sauce"}

                  {currentStep === "Cheese" &&
                    "Choose your cheese"}

                  {currentStep === "Vegetables" &&
                    "Choose your vegetables"}
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-white/35 sm:text-right">
                {stepDescriptions[currentStep]}
              </p>

            </div>
          </div>

          <div className="px-5 py-8 sm:px-8 sm:py-10">

  <AnimatePresence mode="wait">

    <motion.div
      key={step}
      initial={{
        opacity: 0,
        x: 40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -40,
      }}
      transition={{
        duration: 0.4,
      }}
    >

      {step === 1 && (
        <BaseSelector
          selected={pizza.base}
          onSelect={(base) =>
            setPizza({
              ...pizza,
              base,
            })
          }
        />
      )}

      {step === 2 && (
        <SauceSelector
          selected={pizza.sauce}
          onSelect={(sauce) =>
            setPizza({
              ...pizza,
              sauce,
            })
          }
        />
      )}

      {step === 3 && (
        <CheeseSelector
          selected={pizza.cheese}
          onSelect={(cheese) =>
            setPizza({
              ...pizza,
              cheese,
            })
          }
        />
      )}

      {step === 4 && (
        <VegetableSelector
          selected={pizza.vegetables}
          onToggle={selectVegetable}
        />
      )}

              </motion.div>

          </AnimatePresence>

         </div>

          {/* Navigation */}
          <div className="flex items-center justify-between border-t border-white/10 px-5 py-5 sm:px-8">

            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="group flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-20 sm:px-5"
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isDisabled}
              className="group flex items-center gap-2 rounded-xl bg-pizza-red px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pizza-red/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pizza-orange hover:shadow-pizza-orange/20 disabled:pointer-events-none disabled:opacity-30 sm:px-6"
            >
              {step === 4
                ? "Review Pizza"
                : "Continue"}

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

          </div>
        </section>

      </div>
    </main>
  );
}

export default PizzaBuilder;