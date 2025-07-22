import { useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../contexts/AuthContext";   // ★追加

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginForm() {
  const { setToken } = useContext(AuthContext);          // ★追加
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    setErrorMsg("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/token/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) throw new Error("Invalid credentials");

      // ★ access を Context に保存して認証状態に
      const { access } = await res.json();
      setToken(access);

      // ★ ダッシュボードへ遷移
      window.location.href = "/dashboard";
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}
         sx={{ maxWidth: 360, mx: "auto", mt: 8, display: "grid", gap: 2 }}>
      <TextField label="Email" {...register("email")}
                 error={!!errors.email} helperText={errors.email?.message} />
      <TextField label="Password" type="password" {...register("password")}
                 error={!!errors.password} helperText={errors.password?.message} />
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress size={24} /> : "Log in"}
      </Button>
    </Box>
  );
}
