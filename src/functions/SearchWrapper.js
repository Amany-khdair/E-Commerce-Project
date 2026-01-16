import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const SearchWrapper = styled("div")(() => ({
    position: "relative",    
    borderRadius: "4px",
    width: "100%",
    maxWidth: "250px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
}));

export const SearchInput = styled(InputBase)(() => ({
    width: "100%",
    "& input": { fontSize: "14px" },
}));
