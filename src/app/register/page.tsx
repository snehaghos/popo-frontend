"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "pet_owner", 
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await axiosClient.post("/auth/register", formData);

      // Redirect based on role
      if (formData.role === "pet_owner") router.push("/dashboard/pet_owner");
      else if (formData.role === "admin") router.push("/dashboard/admin");
      else if (formData.role === "job_seeker") router.push("/dashboard/job_seeker");
      else if (formData.role === "ambulance_provider") router.push("/dashboard/ambulance");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl mb-4">Register</h2>

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="border p-2 mb-2 w-64"
      >
        <option value="pet_owner">Pet Owner</option>
        <option value="admin">Admin</option>
        <option value="job_seeker">Job Seeker</option>
        <option value="ambulance_provider">Ambulance Provider</option>
      </select>

      <input
        type="text"
        name="name"
        placeholder="Name"
        className="border p-2 mb-2 w-64"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 mb-2 w-64"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 mb-4 w-64"
        onChange={handleChange}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-64"
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="text-red-500 mt-2">{error}</p>
    </div>
  );
}
