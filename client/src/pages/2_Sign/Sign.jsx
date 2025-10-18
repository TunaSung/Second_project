import { useState } from "react";
import { motion } from "framer-motion";

// UI
import SignIn from "./component/feature/SignIn";
import SignUp from "./component/feature/SignUp";

function Sign() {
  // useState
  const [isSignUp, setIsSignUp] = useState(false);

  // toggle UI
  const toggleSignChange = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <main
      className="h-[90vh] w-full grid grid-cols-2 items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(0deg,var(--quaternary-color) 0%, var(--tertiary-color) 33%, var(--secondary-color) 66%, var(--primary-color) 100%)",
      }}
    >
      {/* start go sign in*/}
      <motion.section
        className="absolute grid grid-cols-2 h-full w-full z-90 -right-1/2"
        animate={{ x: isSignUp ? "50%" : "0%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        aria-hidden={isSignUp ? "true" : "false"}
      >
        <div className="flex flex-col items-center justify-center p-10">
          {/* start title */}
          <header className="w-full mb-30">
            <h2
              className="pl-2 flex justify-start text-7xl mb-3 sail-regular text-[var(--quaternary-color)]
                        drop-shadow-[3px_3px_3px_rgba(0,0,0,0.8)] bg-cover-set"
            >
              Sign In &
            </h2>
            <p
              className="pl-2 flex justify-end text-7xl mb-3 sail-regular text-[#aeac80]
                        drop-shadow-[3px_3px_3px_rgba(0,0,0,0.8)] bg-cover-set"
            >
              Rediscover Value
            </p>
          </header>
          {/* end title */}

          {/* start btn */}
          <button
            className="w-40 h-20 border-2 border-gray-500 bg-[var(--secondary-color)] text-[var(--quaternary-color)] rounded-xl opacity-85 text-2xl font-bold hover:scale-110 hover:opacity-100 hover:bg-[var(--primary-color)] transition-all duration-250"
            onClick={toggleSignChange}
            aria-controls="signin-panel"
            aria-expanded={!isSignUp ? "true" : "false"}
          >
            Go Sign Up
          </button>
          {/* end btn */}
        </div>
      </motion.section>
      {/* end go sign in*/}

      {/* start go sign up*/}
      <motion.section
        className="absolute grid grid-cols-2 h-full w-full z-90 -left-1/2"
        initial={{ x: "-50%" }}
        animate={{ x: !isSignUp ? "-50%" : "0%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        aria-hidden={isSignUp ? "false" : "true"}
      >
        <div className="col-start-2 flex flex-col items-center justify-center p-10">
          {/* start title */}
          <header className="w-full mb-30">
            <h2
              className="pl-2 flex justify-start text-7xl mb-3 sail-regular text-[var(--quaternary-color)]
                        drop-shadow-[3px_3px_3px_rgba(0,0,0,0.8)] bg-cover-set"
            >
              Sign Up &
            </h2>
            <p
              className="pl-2 flex justify-end text-7xl mb-3 sail-regular text-[#aeac80]
                        drop-shadow-[3px_3px_3px_rgba(0,0,0,0.8)] bg-contian-set"
            >
              Discover Gems
            </p>
          </header>
          {/* end title */}

          {/* start btn */}
          <button
            className="w-40 h-20 border-2 border-gray-500 bg-[var(--secondary-color)] text-[var(--quaternary-color)] rounded-xl opacity-85 text-2xl font-bold hover:scale-110 hover:opacity-100 hover:bg-[var(--primary-color)] transition-all duration-250"
            onClick={toggleSignChange}
            aria-controls="signin-panel"
            aria-expanded={!isSignUp ? "true" : "false"}
          >
            Go Sign In
          </button>
          {/* end btn */}
        </div>
      </motion.section>
      {/* end go sign up*/}

      {/* start sign in */}
      <SignIn isShowed={!isSignUp} />
      {/* end sign in */}

      {/* start sign up */}
      <SignUp isShowed={isSignUp} toggleSignChange={toggleSignChange} />
      {/* end sign up */}
    </main>
  );
}

export default Sign;
