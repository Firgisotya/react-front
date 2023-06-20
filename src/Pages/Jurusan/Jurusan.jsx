import { React, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { ClipLoader } from 'react-spinners';
import EditJurusan from "./EditJurusan";
import CreateJurusan from "./CreateJurusan";

const MySwal = withReactContent(Swal);

const Jurusan = () => {
    const token = localStorage.getItem("authToken");
    const [jurusan, setJurusan] = useState([]);
    const [selectedJurusan, setSelectedJurusan] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    

    const navigate = useNavigate();

    const getJurusan = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_LOCAL}/jurusan`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setJurusan(data.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleJurusanAdded = (newJurusan) => {
        setJurusan((prevJurusan) => [...prevJurusan, newJurusan]);

        if (selectedJurusan && selectedJurusan.id === newJurusan.id) {
            setSelectedJurusan(newJurusan);
        }
    };

    const handleEditButton = (item) => {
        setSelectedJurusan(item);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_LOCAL}/jurusan/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setJurusan((prevJurusan) => prevJurusan.filter((item) => item.id !== id));
            MySwal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data berhasil dihapus",
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
        getJurusan();
    }, [token, navigate, jurusan]);

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
                <CreateJurusan onJurusanAdded={handleJurusanAdded} />
              </div>
              <div class="px-4 py-4 w-full">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Nama Jurusan
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Kode Jurusan
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {jurusan.map((item) => (
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {item.nama_jurusan}
                            </th>
                            <td className="px-6 py-4">{item.kode_jurusan}</td>
                            <td className="px-6 py-4 space-x-2">
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

      {selectedJurusan && (
        <EditJurusan
          jurusan={selectedJurusan}
          onCancel={() => setSelectedJurusan(null)} 
          onEdit={() => {
            setSelectedJurusan(null); 
            getJurusan();
          }}
        />
      )}  
    </Sidebar>
  )
}

export default Jurusan