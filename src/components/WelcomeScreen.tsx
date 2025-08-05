import React, { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient"; // <-- Comment this out
// import logo from "../360Spaces_logo.svg"; // <-- Comment this out


type Client = {
  id?: number;
  created_at?: string;
  business_name: string;
  business_email: string;
  contact_name: string;
  first_name?: string;
  telephone: string;
  notes?: string;
  business_type?: string;
  email_option?: string;
};

const emailOptions = [
  { value: "init_no_visit", label: "Init Cont No Visit" },
  { value: "con_visit", label: "Con. Visit" },
  { value: "con_phone", label: "Con. Phone" },
];

const WelcomeScreen: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState<Client>({
    business_name: "",
    business_email: "",
    contact_name: "",
    first_name: "",
    telephone: "",
    notes: "",
    business_type: "",
    email_option: emailOptions[0].value,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // useEffect(() => {
//   const fetchClients = async () => {
//     const { data, error } = await supabase.from("clientcontact").select("*");
//     if (error) setErrorMsg("Error fetching clients: " + error.message);
//     if (data) setClients(data);
//   };
//   fetchClients();
// }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setErrorMsg(null);

  // Default first_name if blank
  const clientToInsert = {
    ...form,
    first_name: form.first_name?.trim() || "there",
  };

  // const { data, error } = await supabase
  //   .from("clientcontact")
  //   .insert([clientToInsert])
  //   .select();
  
  // Comment out these lines since error and data don't exist:
  // if (error) setErrorMsg("Error adding client: " + error.message);
  // if (data) setClients((prev) => [...prev, ...data]);

  // For now, just show success message
  console.log("Form submitted:", clientToInsert);
  setErrorMsg("Form submitted successfully! (Database disabled)");

  setForm({
    business_name: "",
    business_email: "",
    contact_name: "",
    first_name: "",
    telephone: "",
    notes: "",
    business_type: "",
    email_option: emailOptions[0].value,
  });
  setLoading(false);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-white flex flex-col items-center justify-center px-4 py-8">
    {/* Logo and Title */}
    <div className="mb-8 text-center">
  {/* <img src={logo} alt="360Spaces" className="h-10 mx-auto mb-2" /> */}
  <span className="font-bold text-3xl text-gray-900">
    360
    <span className="text-lime-500">Spaces</span>
  </span>
  <div className="border-b-2 border-lime-400 w-20 mx-auto mt-1" />
</div>
      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
          autoComplete="off"
        >
          <input
            className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-lime-400"
            name="business_name"
            placeholder="business name"
            value={form.business_name}
            onChange={handleChange}
            required
          />
          <input
            className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-lime-400"
            name="business_email"
            placeholder="business email"
            value={form.business_email}
            onChange={handleChange}
          />
          <input
            className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-lime-400"
            name="contact_name"
            placeholder="contact fullname"
            value={form.contact_name}
            onChange={handleChange}
          />
          <input
            className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-lime-400"
            name="first_name"
            placeholder="contact firstname"
            value={form.first_name}
            onChange={handleChange}
          />
          <input
            className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-lime-400"
            name="telephone"
            placeholder="telephone"
            value={form.telephone}
            onChange={handleChange}
          />
          <input
            className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-lime-400"
            name="business_type"
            placeholder="business type"
            value={form.business_type}
            onChange={handleChange}
          />
          <textarea
            className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-lime-400"
            name="notes"
            placeholder="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
          />
          <select
            className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-lime-400"
            name="email_option"
            value={form.email_option}
            onChange={handleChange}
          >
            <option value="" disabled>
              email type
            </option>
            {emailOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-md bg-lime-400 hover:bg-lime-500 transition text-white px-4 py-2 font-medium text-lg self-end mt-2"
            disabled={loading}
          >
            {loading ? "adding..." : "add and next"}
          </button>
          {errorMsg && (
            <div className="text-red-500 text-sm mt-2">{errorMsg}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default WelcomeScreen;