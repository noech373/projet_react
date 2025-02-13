import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
    container: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: "18px",
        fontWeight: "bold",
    },
    input: {
        width: "60px",
        padding: "4px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
        backgroundColor: "#ff4d4d",
        color: "white",
        border: "none",
        borderRadius: "4px",
        padding: "8px",
        cursor: "pointer",
        width: "100%",
    },
};

export default styles;