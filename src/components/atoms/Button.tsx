import {
  ButtonHTMLAttributes,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { IconCheck, IconLoader2, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";

export enum ButtonVariant {
  DEFAULT = "default",
  OUTLINE = "outline",
  ALTERNATE = "alternate",
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  classes?: string;
  isSuccess?: boolean;
  isError?: boolean;
  isLoading?: boolean;
};

const classes = {
  state:
    "shadow-inner w-full h-full absolute top-full left-0 flex items-center justify-center ",
};

const defaultClasses = {
  wrapper:
    "rounded px-6 py-2 border-none shadow-inner relative overflow-hidden",
  text: "font-bold lowercase drop-shadow-buttonText",

  success: twMerge(classes.state, "bg-accent-green text-white"),
  error: twMerge(classes.state, "text-white bg-accent-red"),
  loading: twMerge(classes.state, "text-white bg-beige-dark"),
};

const variantClasses: Record<ButtonVariant, Record<string, string>> = {
  [ButtonVariant.DEFAULT]: {
    wrapper: "bg-beige hover:bg-beige-dark disabled:bg-accent-gray",
    text: "text-white",
  },
  [ButtonVariant.OUTLINE]: {
    wrapper: "bg-beige hover:bg-beige-dark text-white",
    text: "text-beige",
  },
  [ButtonVariant.ALTERNATE]: {
    wrapper: "bg-beige hover:bg-beige-dark text-white",
    text: "text-white",
  },
};

const variants = {
  show: { y: "-100%" },
  hide: { y: "0%" },
};

let errorTimer: number | null;
let successTimer: number | null;

const STATE_CHANGE_TIMEOUT = 3000;

export const Button = ({
  variant = ButtonVariant.DEFAULT,
  children,
  className,
  isSuccess,
  isError,
  isLoading,
  ...restProps
}: PropsWithChildren<ButtonProps>) => {
  const [localSuccess, setLocalSuccess] = useState(false);
  const [localError, setLocalError] = useState(false);

  const styles = {
    wrapper: twMerge(
      className,
      defaultClasses.wrapper,
      variantClasses[variant].wrapper
    ),
    text: twMerge(defaultClasses.text, variantClasses[variant].text),
  };

  useEffect(() => {
    if (isSuccess) {
      setLocalSuccess(true);

      if (successTimer !== null) clearTimeout(successTimer);
      successTimer = window.setTimeout(() => {
        setLocalSuccess(false);
        successTimer = null;
      }, STATE_CHANGE_TIMEOUT);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setLocalError(true);

      if (errorTimer !== null) clearTimeout(errorTimer);
      errorTimer = window.setTimeout(() => {
        setLocalError(false);
        errorTimer = null;
      }, STATE_CHANGE_TIMEOUT);
    }
  }, [isError]);

  return (
    <button className={styles.wrapper} {...restProps}>
      <div className={styles.text}>{children}</div>
      {!restProps.disabled && (
        <>
          <motion.div
            animate={localSuccess ? "show" : "hide"}
            variants={variants}
            className={defaultClasses.success}
          >
            <IconCheck size={30} />
          </motion.div>
          <motion.div
            animate={localError ? "show" : "hide"}
            variants={variants}
            className={defaultClasses.error}
          >
            <IconX size={30} />
          </motion.div>
          <motion.div
            animate={isLoading ? "show" : "hide"}
            variants={variants}
            className={defaultClasses.loading}
          >
            <IconLoader2 className="animate-spin" size={30} />
          </motion.div>
        </>
      )}
    </button>
  );
};
