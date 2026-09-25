import { useEffect, useState } from "react";

import {
  getDimensions,
  createDimension,
} from "../api/adminDimensions";

import "../styles/admin.css";

import AdminSidebar from "../components/AdminSidebar";


const AdminDimensions = () => {

  // =========================================================
  // DIMENSIONS
  // =========================================================

  const [
    dimensions,
    setDimensions,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  const [
    success,
    setSuccess,
  ] = useState("");


  // =========================================================
  // FORM
  // =========================================================

  const [
    name,
    setName,
  ] = useState("");


  const [
    code,
    setCode,
  ] = useState("");


  const [
    description,
    setDescription,
  ] = useState("");


  const [
    creating,
    setCreating,
  ] = useState(false);


  // =========================================================
  // LOAD DIMENSIONS
  // =========================================================

  const loadDimensions = async () => {

    try {

      setLoading(true);
      setError("");

      const data =
        await getDimensions();

      setDimensions(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Unable to load dimensions."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadDimensions();

  }, []);


  // =========================================================
  // CREATE DIMENSION
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    const trimmedName =
      name.trim();

    const trimmedCode =
      code.trim().toLowerCase();

    const trimmedDescription =
      description.trim();


    if (!trimmedName) {

      setError(
        "Dimension name is required."
      );

      return;

    }


    if (!trimmedCode) {

      setError(
        "Dimension code is required."
      );

      return;

    }


    try {

      setCreating(true);


      await createDimension({

        name:
          trimmedName,

        code:
          trimmedCode,

        description:
          trimmedDescription,

      });


      // Reset form

      setName("");
      setCode("");
      setDescription("");


      setSuccess(
        "Dimension created successfully."
      );


      await loadDimensions();


    } catch (err) {

      console.error(err);

      const responseData =
        err.response?.data;


      if (responseData) {

        const firstError =
          Object.values(
            responseData
          )[0];


        setError(

          Array.isArray(firstError)

            ? firstError[0]

            : firstError ||
              "Unable to create dimension."

        );

      } else {

        setError(
          "Unable to create dimension."
        );

      }

    } finally {

      setCreating(false);

    }

  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="admin-layout">


      {/* =====================================================
          CENTRALIZED ADMIN SIDEBAR
      ===================================================== */}

      <AdminSidebar />


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="admin-main">


        {/* ===================================================
            TOPBAR
        =================================================== */}

        <header className="admin-topbar">

          <div>

            <div className="admin-page-heading">
              Dimensions
            </div>

            <div className="admin-breadcrumb">
              Neuromatrix / Dimensions
            </div>

          </div>


          <div className="admin-status">

            <span className="admin-status-dot" />

            System Online

          </div>

        </header>


        {/* ===================================================
            CONTENT
        =================================================== */}

        <section className="admin-content">


          {/* =================================================
              TITLE
          ================================================= */}

          <div className="admin-title-row">

            <div>

              <h1 className="admin-title">
                Dimensions
              </h1>

              <p className="admin-description">
                Manage the psychological dimensions
                used for assessment scoring.
              </p>

            </div>

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="admin-error">
              {error}
            </div>

          )}


          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (

            <div
              style={{
                padding: "12px 15px",
                marginBottom: "18px",
                border: "1px solid #c6e4e4",
                borderRadius: "8px",
                background: "#edf7f7",
                color: "#247f91",
                fontSize: "11px",
              }}
            >
              {success}
            </div>

          )}


          {/* =================================================
              CREATE DIMENSION
          ================================================= */}

          <div className="admin-panel">

            <div className="admin-panel-header">

              <div>

                <div className="admin-panel-title">
                  Create Dimension
                </div>

                <div className="admin-panel-subtitle">
                  Define a scoring dimension for
                  assessment questions.
                </div>

              </div>

            </div>


            <form
              onSubmit={handleSubmit}
              style={{
                padding: "22px",
                display: "grid",
                gap: "18px",
              }}
            >


              {/* NAME */}

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#294d63",
                  }}
                >
                  Dimension Name
                </label>


                <input
                  className="admin-search"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="e.g. Extraversion"
                />

              </div>


              {/* CODE */}

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#294d63",
                  }}
                >
                  Dimension Code
                </label>


                <input
                  className="admin-search"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                  type="text"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value)
                  }
                  placeholder="e.g. extraversion"
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "7px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#294d63",
                  }}
                >
                  Description
                </label>


                <textarea
                  className="admin-search"
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    boxSizing: "border-box",
                    resize: "vertical",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    fontFamily: "inherit",
                  }}
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  placeholder="Describe what this dimension measures."
                />

              </div>


              {/* ACTION */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >

                <button
                  type="submit"
                  className="admin-primary-button"
                  disabled={creating}
                >

                  {creating
                    ? "Creating..."
                    : "Create Dimension"}

                </button>

              </div>

            </form>

          </div>


          {/* =================================================
              DIMENSION LIBRARY
          ================================================= */}

          <div
            className="admin-panel"
            style={{
              marginTop: "25px",
            }}
          >

            <div className="admin-panel-header">

              <div>

                <div className="admin-panel-title">
                  Dimension Library
                </div>

                <div className="admin-panel-subtitle">

                  {dimensions.length} dimension
                  {dimensions.length !== 1
                    ? "s"
                    : ""}{" "}
                  configured

                </div>

              </div>


              <button
                type="button"
                className="admin-action"
                onClick={loadDimensions}
                disabled={loading}
              >
                {loading
                  ? "Loading..."
                  : "Refresh"}
              </button>

            </div>


            {/* LOADING */}

            {loading ? (

              <div className="admin-loading">
                Loading dimensions...
              </div>

            ) : dimensions.length === 0 ? (

              <div className="admin-loading">
                No dimensions found.
              </div>

            ) : (

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>

                    <tr>

                      <th>
                        ID
                      </th>

                      <th>
                        Dimension
                      </th>

                      <th>
                        Code
                      </th>

                      <th>
                        Description
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {dimensions.map(
                      (dimension) => (

                        <tr
                          key={
                            dimension.id
                          }
                        >

                          <td>
                            {dimension.id}
                          </td>

                          <td>

                            <div className="admin-assessment-name">
                              {dimension.name}
                            </div>

                          </td>

                          <td>

                            <div className="admin-assessment-slug">
                              {dimension.code}
                            </div>

                          </td>

                          <td>
                            {dimension.description ||
                              "—"}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </section>

      </main>

    </div>

  );

};


export default AdminDimensions;