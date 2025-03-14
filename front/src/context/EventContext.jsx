import { createContext, useState, useContext } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    eventType: "",
    nameEvent: "",
    location: "",
    time: "",
    date: "",
    missingPeople: 0,
    payment: "no",
    description: "",
    sex: "",
    gender: [],
    ageRange: { edadMin: 16, edadMax: 50 },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      gender: checked
        ? [...prev.gender, value]
        : prev.gender.filter((g) => g !== value),
    }));
  };

  const handleAgeRangeChange = ({ edadMin, edadMax }) => {
    setFormData((prev) => ({
      ...prev,
      ageRange: { edadMin, edadMax },
    }));
  };

  const isFormComplete = () => {
    const {
      nameEvent,
      location,
      time,
      date,
      missingPeople,
      description,
      sex,
      gender,
      ageRange,
    } = formData;

    if (!nameEvent || !location || !time || !date || !description || !sex)
      return false;
    if (missingPeople <= 0) return false;
    if (!gender.length) return false;
    if (
      ageRange.edadMin <= 0 ||
      ageRange.edadMax <= 0 ||
      ageRange.edadMin > ageRange.edadMax
    )
      return false;

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormComplete()) {
      alert("Por favor, completa todos los campos antes de continuar.");
      return;
    }

    try {
      console.log("Formulario enviado con éxito:", formData);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <EventContext.Provider
      value={{
        formData,
        handleChange,
        handleCheckboxChange,
        handleAgeRangeChange,
        handleSubmit,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  return useContext(EventContext);
};
