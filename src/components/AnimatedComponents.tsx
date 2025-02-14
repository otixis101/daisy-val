import { animated } from "@react-spring/web"
import { type HTMLAttributes, forwardRef } from "react"

export const AnimatedDiv = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const AnimatedDivComponent = animated.div as React.ComponentType<HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }>;
  return <AnimatedDivComponent ref={ref} {...props} />;
});

AnimatedDiv.displayName = "AnimatedDiv";