import { React, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const EditKelas = ({ kelas, onEdit, onCancel }) => {
  const [namaKelas, setNamaKelas] = useState(kelas.nama_kelas);
  const [kodeKelas, setKodeKelas] = useState(kelas.kode_kelas);

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const updatedKelas = { nama_kelas: namaKelas, kode_kelas: kodeKelas };
      await axios.put(
        `${import.meta.env.VITE_API_LOCAL}/kelas/${kelas.id}`,
        updatedKelas,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onEdit();
      MySwal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kelas berhasil diubah",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Main modal */}
      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full  max-w-xl max-h-full flex items-center mx-auto py-10">
          {/* Modal content */}
          <div className="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Kelas
              </h3>
              <button
                onClick={onCancel}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6">
              <form>
                <div className="mb-6">
                  <label
                    htmlFor="nama_kelas"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Kelas
                  </label>
                  <input
                    type="text"
                    id="nama_kelas"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nama Kelas"
                    required
                    value={namaKelas}
                    onChange={(e) => setNamaKelas(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="kode_kelas"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Kode Kelas
                  </label>
                  <input
                    type="text"
                    id="kode_kelas"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Kode Kelas"
                    required
                    value={kodeKelas}
                    onChange={(e) => setKodeKelas(e.target.value)}
                  />
                </div>
              </form>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleEdit}
                data-modal-hide="defaultModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
              </button>
              <button
                onClick={onCancel}
                data-modal-hide="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditKelas;
