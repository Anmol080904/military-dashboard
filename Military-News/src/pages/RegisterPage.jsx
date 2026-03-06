import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import API_BASE from "../config/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FileSignature, Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "general",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("REQUIRED"),
      email: Yup.string().email("INVALID FORMAT").required("REQUIRED"),
      password: Yup.string().min(6, "MIN 6 CHARACTERS").required("REQUIRED"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "NO MATCH")
        .required("REQUIRED"),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        };

        const response = await axios.post(`${API_BASE}/create-user`, payload);

        if (response.status === 200) {
          toast.success("ENLISTMENT PROCESSED. REPORT FOR DUTY.");
          navigate("/login");
        }
      } catch (error) {
        let errorMessage = "ENLISTMENT FAILED. CHECK CODES.";
        const detail = error.response?.data?.detail;

        if (detail) {
          if (typeof detail === "string") {
            errorMessage = detail;
          } else if (Array.isArray(detail) && detail.length > 0) {
            errorMessage = detail[0].msg;
          } else {
            errorMessage = JSON.stringify(detail);
          }
        }

        toast.error(errorMessage);
        console.error("Registration error:", error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-military-950 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-camo-pattern opacity-5 pointer-events-none"></div>
      <div className="w-full max-w-md bg-military-900 p-8 rounded-sm shadow-2xl border-2 border-military-600 relative z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-military-900 via-military-500 to-military-900"></div>

        <div className="flex justify-center mb-6">
          <div className="bg-military-800 p-3 rounded-full border border-military-500">
            <FileSignature size={48} className="text-military-300" />
          </div>
        </div>

        <h2 className="text-3xl font-stencil text-center text-military-100 mb-2 tracking-widest uppercase">
          Enlistment Form
        </h2>
        <p className="text-center text-military-500 mb-8 font-mono text-xs uppercase tracking-widest">
          Join the Elite Forces
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-military-400 uppercase ml-1">
              Operative Name
            </label>
            <input
              name="name"
              type="text"
              className="w-full p-3 bg-military-950 border border-military-700 text-military-100 focus:border-military-400 focus:outline-none font-mono"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-mono uppercase">
                {formik.errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-mono text-military-400 uppercase ml-1">
              Contact (Email)
            </label>
            <input
              name="email"
              type="email"
              className="w-full p-3 bg-military-950 border border-military-700 text-military-100 focus:border-military-400 focus:outline-none font-mono"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-mono uppercase">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-mono text-military-400 uppercase ml-1">
              Role
            </label>
            <select
              name="role"
              className="w-full p-3 bg-military-950 border border-military-700 text-military-100 focus:border-military-400 focus:outline-none font-mono appearance-none"
              {...formik.getFieldProps("role")}
            >
              <option value="general">GENERAL</option>
              <option value="captain">CAPTAIN</option>
              <option value="lt">LIEUTENANT</option>
              <option value="soldier">SOLDIER</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-mono uppercase">
                {formik.errors.role}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-mono text-military-400 uppercase ml-1">
              Set Access Code
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full p-3 pr-12 bg-military-950 border border-military-700 text-military-100 focus:border-military-400 focus:outline-none font-mono"
                {...formik.getFieldProps("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-military-500 hover:text-military-200 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-mono uppercase">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-mono text-military-400 uppercase ml-1">
              Confirm Code
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full p-3 pr-12 bg-military-950 border border-military-700 text-military-100 focus:border-military-400 focus:outline-none font-mono"
                {...formik.getFieldProps("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-military-500 hover:text-military-200 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-mono uppercase">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-military-700 hover:bg-military-600 text-military-50 font-bold border border-military-500 transition-all font-stencil tracking-widest uppercase shadow-[0_0_10px_rgba(75,83,32,0.5)]"
          >
            Submit Application
          </button>
        </form>

        <p className="text-center mt-6 text-military-500 text-xs font-mono">
          ALREADY ENLISTED?{" "}
          <Link
            to="/login"
            className="text-military-300 font-bold hover:text-military-100 uppercase underline decoration-military-500"
          >
            AUTHENTICATE
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
