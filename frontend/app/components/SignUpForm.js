// components/SignupForm.js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import "tailwindcss/tailwind.css";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateNationality,
} from "../utils/ValidationUser";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationality, setNationality] = useState("");
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);

  //handle validation errors
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    nationality: "",
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v2/all");
        // Ordenar la lista de países alfabéticamente por nombre
        const sortedCountries = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        const countriesWithSelectOption = [
          { name: "Select country", alpha2Code: "" },
          ...sortedCountries,
        ];

        setCountries(countriesWithSelectOption);
      } catch (error) {
        console.error("Error fetching countries:", error.message);
      }
    };

    fetchCountries();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    const newFormErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      nationality: validateNationality(nationality),
    };

    setFormErrors(newFormErrors);

    if (
      newFormErrors.name ||
      newFormErrors.email ||
      newFormErrors.password ||
      newFormErrors.nationality
    ) {
      // Detener el proceso si hay errores
      return;
    }

    try {
      const response = await axios.post(
        "",
        {
          name,
          email,
          password,
          nationality,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Registro exitoso");
        // Puedes redirigir a la página de inicio de sesión u otra página después del registro
      } else {
        console.error("Error en el registro");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      setError(
        "Error en el registro. Verifica tus datos e intenta nuevamente."
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 border border-gray-500 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 p-2 w-full border ${
              formErrors.name ? "border-red-500" : "border-gray-500"
            } rounded-md focus:outline-none focus:border-blue-500`}
            onBlur={() =>
              setFormErrors({ ...formErrors, name: validateName(name) })
            }
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1 p-2 w-full border ${
              formErrors.email ? "border-red-500" : "border-gray-500"
            } rounded-md focus:outline-none focus:border-blue-500`}
            onBlur={() =>
              setFormErrors({ ...formErrors, email: validateEmail(email) })
            }
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-1 p-2 w-full border ${
              formErrors.password ? "border-red-500" : "border-gray-500"
            } rounded-md focus:outline-none focus:border-blue-500`}
            onBlur={() =>
              setFormErrors({
                ...formErrors,
                password: validatePassword(password),
              })
            }
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="nationality">Nationality</label>
          <select
            id="nationality"
            name="nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className={`bg-white border ${
              formErrors.nationality ? "border-red-500" : "border-gray-300"
            } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500`}
            onBlur={() =>
              setFormErrors({
                ...formErrors,
                nationality: validateNationality(nationality),
              })
            }
          >
            {countries.map((country) => (
              <option key={country.alpha2Code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-white-600 focus:outline-none focus:bg-white-600"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="text-sm text-gray-600 mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login">
          <span className="text-blue-500 cursor-pointer hover:underline">
            Log in
          </span>
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
