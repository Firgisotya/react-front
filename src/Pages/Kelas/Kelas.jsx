import { React, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CreateKelas from "./CreateKelas";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import EditKelas from "./EditKelas";

const MySwal = withReactContent(Swal);

const Kelas = () => {
  const token = localStorage.getItem("authToken");
  const [kelas, setKelas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getKelas();
  }, [token, navigate, kelas]);

  const getKelas = async () => {
    const { data } = await axios.get("http://localhost:8000/api/kelas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setKelas(data.data);
  };

  const handleKelasAdded = (newKelas) => {
    setKelas((prevKelas) => [...prevKelas, newKelas]);

    if (selectedKelas && selectedKelas.id === newKelas.id) {
      setSelectedKelas(newKelas);
    }
    
  };

  const [selectedKelas, setSelectedKelas] = useState(null);
  

  const handleEdit = (kelas) => {
    setSelectedKelas(kelas);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/kelas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newKelas = kelas.filter((kelas) => kelas.id !== id);
      setKelas(newKelas);
      MySwal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil dihapus",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar>
      <div className="w-full px-6 py-6 mx-auto">
        <div className="flex flex-wrap mt-6 -mx-3">
          <div className="w-full px-3 mt-0 lg:flex-none">
            <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
              <div className="px-4 py-2">
                <CreateKelas onKelasAdded={handleKelasAdded} />
              </div>
              <div class="px-4 py-4 w-full">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Nama Kelas
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Kode Kelas
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {kelas.map((item) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item.nama_kelas}
                          </th>
                          <td className="px-6 py-4">{item.kode_kelas}</td>
                          <td className="px-6 py-4 space-x-2">
                            <button className="btn btn-outline btn-accent" onClick={() => handleEdit(item)}>
                              <BsFillPencilFill />
                            </button>

                            <button
                              onClick={() => handleDelete(item.id)}
                              className="btn btn-outline btn-error"
                            >
                              <BsFillTrashFill />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Kelas;
