import React, { useState } from "react";
import { loadPyodide } from "pyodide";

export default function PythonInput() {
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function runPython() {
    const code = document.getElementById("PythonCode").value.trim();

    // Clear output and error before new execution
    setOutput("");
    setError("");

    // Check for empty input
    if (!code) {
      setError("Please enter some Python code to run.");
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      const pyodide = await loadPyodide();

      // Load the openpyxl package
      //! This is a workaround for the issue where pyodide.loadPackage() doesn't work in Vite
      //! I will need to review packages in the code as they are inputted by the user to insure they are loaded.
      //!!!!! MUST DETERMINE BEST WAY TO GIVE FEEDBACK TO USER ON WHAT PACKAGES ARE MISSING AND LOAD TIMES
      //   await pyodide.loadPackage("openpyxl");

      // Redirect stdout and stderr to capture output
      pyodide.runPython(`
        import sys
        from io import StringIO

        # Redirect stdout and stderr
        sys.stdout = StringIO()
        sys.stderr = StringIO()
      `);

      // Run the user's Python code
      await pyodide.runPythonAsync(code);

      // Capture and display the printed output
      const result = pyodide.runPython(`
        sys.stdout.getvalue()
      `);
      setOutput(result);

      // Capture and display any errors
      const capturedError = pyodide.runPython(`
        sys.stderr.getvalue()
      `);
      if (capturedError) {
        setError(capturedError);
      }
    } catch (err) {
      setError(err.toString());
    } finally {
      // Reset loading state
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-row justify-center p-4">
      <div className="flex flex-col w-[60rem] h-[30rem]">
        <textarea id="PythonCode" className="w-full h-[90%] bg-[#000000dc] text-white p-4 rounded-lg" placeholder="Enter Python code here..." />
        <div className="flex flex-row justify-end">
          <button className="bg-orange-400 text-white font-bold py-2 px-4 rounded mt-4" onClick={runPython} disabled={loading}>
            {loading ? "Running..." : "Run"}
          </button>
        </div>
        <div className="">
          <textarea id="Output" className="w-full h-[90%] bg-[#000000dc] text-white p-4 rounded-lg" placeholder={output == "" ? "Output..." : output} />
        </div>
        <div id="error" className="">
          <textarea id="Error" className="w-full h-[90%] bg-[#000000dc] text-white p-4 rounded-lg" placeholder={error == "" ? "Error?" : error} />
        </div>
      </div>
    </div>
  );
}
