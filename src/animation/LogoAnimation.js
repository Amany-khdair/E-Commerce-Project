import { keyframes } from "@mui/system";

export const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

export const shine = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const lift = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;