import { React, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const CreateSiswa = ({ onSiswaAdded }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const token = localStorage.getItem("authToken");
  const [siswa, setSiswa] = useState([]);
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [kelas, setKelas] = useState([]);
  const [jurusan, setJurusan] = useState([]);
  const [modalCreate, setModalCreate] = useState({
    nama_siswa: "",
    nis: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    agama: "",
    no_hp: "",
    email: "",
    kelas_id: "",
    jurusan_id: "",
  });

  const handleFoto = (e) => {
    console.log(e.target.files[0]);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selected);
      setFoto(selected);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(modalCreate);
    console.log(foto);
    const formData = new FormData();
    formData.append("foto", foto);
    formData.append("nama_siswa", modalCreate.nama_siswa);
    formData.append("nis", modalCreate.nis);
    formData.append("jenis_kelamin", modalCreate.jenis_kelamin);
    formData.append("tempat_lahir", modalCreate.tempat_lahir);
    formData.append("tanggal_lahir", modalCreate.tanggal_lahir);
    formData.append("alamat", modalCreate.alamat);
    formData.append("agama", modalCreate.agama);
    formData.append("no_hp", modalCreate.no_hp);
    formData.append("email", modalCreate.email);
    formData.append("kelas_id", modalCreate.kelas_id);
    formData.append("jurusan_id", modalCreate.jurusan_id);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_LOCAL}/siswa`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      const { data } = response;
      setSiswa((prevSiswa) => [...prevSiswa, data.data]);
      onSiswaAdded(data.data);
      setIsModalVisible(false);
      MySwal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil ditambahkan",
      });
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        console.log(errorMessages);
        // Tampilkan pesan kesalahan validasi kepada pengguna
        // Misalnya, dengan menggunakan SweetAlert atau komponen pemberitahuan lainnya
      } else {
        MySwal.fire({
          icon: "error",
          title: "Gagal",
          text: "Data gagal ditambahkan",
        });
      }
    }
  };

  const getKelas = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_LOCAL}/kelas`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setKelas(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getJurusan = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_LOCAL}/jurusan`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJurusan(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getKelas();
    getJurusan();
  }, [token]);

  return (
    <div>
      {/* Modal toggle */}
      <button
        onClick={() => setIsModalVisible(!isModalVisible)}
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Tambah Siswa
      </button>
      {/* Main modal */}
      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed top-0  left-0 right-0 z-50 ${
          isModalVisible ? "" : "hidden"
        } w-full p-4 overflow-x-hidden  md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full  max-w-xl max-h-full flex items-center mx-auto py-10">
          {/* Modal content */}
          <div className="relative w-full h-[80vh] bg-white overflow-y-auto rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Tambah Siswa
              </h3>
              <button
                onClick={() => setIsModalVisible(!isModalVisible)}
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
                    htmlFor="nis"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    NIS
                  </label>
                  <input
                    type="text"
                    id="nis"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="NIS"
                    required
                    value={modalCreate.nis}
                    onChange={(e) =>
                      setModalCreate({ ...modalCreate, nis: e.target.value })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="nama_siswa"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Siswa
                  </label>
                  <input
                    type="text"
                    id="nama_siswa"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nama Siswa"
                    required
                    value={modalCreate.nama_siswa}
                    onChange={(e) =>
                      setModalCreate({
                        ...modalCreate,
                        nama_siswa: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="kelas"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Kelas
                  </label>
                  <select
                    id="kelas"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) =>
                      setModalCreate({ ...modalCreate, kelas_id: e.target.value })
                    }
                  >
                    <option value="">Pilih Kelas</option>
                    {kelas.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama_kelas}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Jurusan
                  </label>
                  <select
                    id="jurusan"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) =>
                      setModalCreate({
                        ...modalCreate,
                        jurusan_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Pilih Jurusan</option>
                    {jurusan.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama_jurusan}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="tempat_lahir"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    id="tempat_lahir"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Tempat Lahir"
                    requi
                    value={modalCreate.tempat_lahir}
                    onChange={(e) =>
                      setModalCreate({
                        ...modalCreate,
                        tempat_lahir: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="tgl_lahir"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    id="tgl_lahir"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Tanggal Lahir"
                    required
                    value={modalCreate.tanggal_lahir}
                    onChange={(e) =>
                      setModalCreate({
                        ...modalCreate,
                        tanggal_lahir: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="jenis_kelamin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Jenis Kelamin
                  </label>
                  <select
                    id="jurusan"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) =>
                      setModalCreate({
                        ...modalCreate,
                        jenis_kelamin: e.target.value,
                      })
                    }
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-Laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="agama"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Agama
                  </label>
                  <input
                    type="text"
                    id="agama"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Agama"
                    required
                    value={modalCreate.agama}
                    onChange={(e) =>
                      setModalCreate({ ...modalCreate, agama: e.target.value })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Alamat
                  </label>
                  <textarea
                    placeholder="Alamat"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-20 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={modalCreate.alamat}
                    onChange={(e) =>
                      setModalCreate({ ...modalCreate, alamat: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email"
                    required
                    value={modalCreate.email}
                    onChange={(e) =>
                      setModalCreate({ ...modalCreate, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    No HP
                  </label>
                  <input
                    type="text"
                    id="no_hp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="No HP"
                    required
                    value={modalCreate.no_hp}
                    onChange={(e) =>
                      setModalCreate({ ...modalCreate, no_hp: e.target.value })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Foto
                  </label>
                  <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    type="file"
                    accept="foto/*"
                    onChange={handleFoto}
                  />
                  {preview && (
                    <img
                      src={preview}
                      className="pt-4"
                      alt="Preview"
                      style={{ width: "200px", height: "200px" }}
                    />
                  )}
                </div>
              </form>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleCreate}
                data-modal-hide="defaultModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Tambah
              </button>
              <button
                onClick={() => setIsModalVisible(!isModalVisible)}
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

export default CreateSiswa;
