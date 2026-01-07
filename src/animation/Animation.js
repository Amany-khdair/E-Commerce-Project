import { keyframes } from "@emotion/react";

export const bounce = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
`;

export const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;