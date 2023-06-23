import { React, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsFillPencilFill, BsFillTrashFill, BsEyeFill } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import CreateSiswa from "./CreateSiswa";
import EditSiswa from "./EditSiswa";

const MySwal = withReactContent(Swal);


const Siswa = () => {
  const token = localStorage.getItem("authToken");
  const [siswa, setSiswa] = useState([]);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getSiswa();
  }, [token, navigate, siswa]);

  const getSiswa = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_LOCAL}/siswa`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSiswa(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSiswaAdded = (newSiswa) => {
    setSiswa((prevSiswa) => [...prevSiswa, newSiswa]);

    if (selectedSiswa && selectedSiswa.id === newSiswa.id) {
      setSelectedSiswa(newSiswa);
    }
  };

  const handleEditButton = (item) => {
    setSelectedSiswa(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_LOCAL}/siswa/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSiswa((prevSiswa) => prevSiswa.filter((item) => item.id !== id));
      MySwal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil dihapus",
      });
    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: "error",
        title: "Gagal",
        text: "Data gagal dihapus",
      });
    }
  };

  return (
    <Sidebar>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={150} color={"#FFFF"} loading={isLoading} />
        </div>
      ) : (
        <div className="w-full px-6 py-6 mx-auto">
          <div className="flex flex-wrap mt-6 -mx-3">
            <div className="w-full px-3 mt-0 lg:flex-none">
              <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                <div className="px-4 py-2">
                  <CreateSiswa onSiswaAdded={handleSiswaAdded} />
                </div>
                <div class="px-4 py-4 w-full">
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            NIS
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Nama siswa
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Kelas
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Jurusan
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Tempat Lahir
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Tanggal Lahir
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Jenis Kelamin
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Agama
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Alamat
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3">
                            No. HP
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Foto
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {siswa.map((item) => (
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {item.nis}
                            </th>
                            <td className="px-6 py-4">{item.nama_siswa}</td>
                            <td className="px-6 py-4">
                              {item.kelas?.nama_kelas}
                            </td>
                            <td className="px-6 py-4">
                              {item.jurusan?.nama_jurusan}
                            </td>
                            <td className="px-6 py-4">{item.tempat_lahir}</td>
                            <td className="px-6 py-4">{item.tanggal_lahir}</td>
                            <td className="px-6 py-4">{item.jenis_kelamin}</td>
                            <td className="px-6 py-4">{item.agama}</td>
                            <td className="px-6 py-4">{item.alamat}</td>
                            <td className="px-6 py-4">{item.email}</td>
                            <td className="px-6 py-4">{item.no_hp}</td>
                            <td className="py-4">
                              <img
                                src={`${
                                  import.meta.env.VITE_IMAGE_LOCAL
                                }/storage/fotoSiswa/${item.foto}`}
                                className="w-[500px]"
                              />
                            </td>
                            <td className="px-6 py-4 flex space-x-1">
                            <button
                                onClick={() => handleEditButton(item)}
                                className="btn btn-outline btn-warning"
                              >
                                <BsEyeFill />
                              </button>

                            <button
                                onClick={() => handleEditButton(item)}
                                className="btn btn-outline btn-accent"
                              >
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
      )}

{selectedSiswa && (
        <EditSiswa
          siswa={selectedSiswa}
          onCancel={() => setSelectedSiswa(null)} 
          onEdit={() => {
            setSelectedSiswa(null); 
            getSiswa();
          }}
        />
      )}  

    </Sidebar>
  );
};

export default Siswa;
