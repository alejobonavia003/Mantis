import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
//import HeaderAdmin from "../components/AdminHeader";
import AdminProducts from '../components/AdminProducts';
import Login from '../components/AdminLogin';
import ImageGallery from '../components/AdminImageGallery';
import Sidebar from '../components/AdminSidebar';
import PageEditor from '../components/AdminPageEditor';
import AdminPsRegister from '../components/AdminPsRegister';
import LogoEditor from '../components/AdminLogoEditor';

const Admin = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('header');
  const [headerContents, setHeaderContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const [editedValues, setEditedValues] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showGallery, setShowGallery] = useState(false); // Estado para mostrar la galería


    // Inicializar valores editados
    useEffect(() => {
      const initialValues = headerContents.reduce((acc, item) => {
        acc[item.clave] = item.valor;
        return acc;
      }, {});
      setEditedValues(initialValues);
    }, [headerContents]);

  // Verificar autenticación al cargar
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      verifyToken(token);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      await axios.get(`${apiUrl}api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchHeaderContents = async () => {
        try {
          const response = await axios.get(`${apiUrl}api/contenidos?seccion=header`);
          setHeaderContents(response.data);
        } catch (error) {
          console.error("Error al obtener contenidos:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchHeaderContents();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleSaveChanges = async (changes) => {
    if (changes.length === 0) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const updatePromises = changes.map(({ clave, nuevoValor }) =>
        axios.put(`${apiUrl}api/contenidos/${clave}`, { valor: nuevoValor }, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );

      await Promise.all(updatePromises);

      const updatedContents = headerContents.map(item => {
        const change = changes.find(c => c.clave === item.clave);
        return change ? { ...item, valor: change.nuevoValor } : item;
      });

      setHeaderContents(updatedContents);
      alert('¡Cambios guardados exitosamente!');
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      alert('❌ Error al guardar algunos cambios');
    } finally {
      setSaving(false);
    }
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <div className="adminContainer">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <button onClick={handleLogout} className="logoutButton">Cerrar Sesión</button>

          <div className="mainContent">
            {/*activeTab === "header" && (
              <>
                <h2 className="adminTitle">Editor de la cabecera</h2>
                <HeaderAdmin
                  headerContents={headerContents}
                  loading={loading || saving}
                  onSave={handleSaveChanges}
                />
              </>
            )*/}

            {activeTab === "products" && (
              <>
                <h2 className="adminTitle">Editor de Productos</h2>
                <AdminProducts />
              </>
            )}

            {activeTab === "register" && (
              <>
                <h2 className="adminTitle">Registro de psicólogos</h2>
                <AdminPsRegister />
              </>
            )}

            {activeTab === "gallery" && (
              <>
                <h2 className="adminTitle">Editor de Galería</h2>



                <ImageGallery onSelectImage={handleSelectImage} />
                {selectedImage && (
                  <div className="selectedImagePreview">
                    <h3>Imagen Seleccionada</h3>
                    <img src={selectedImage.url} alt="Seleccionada" />
                  </div>
                )}

            <h3 className="adminTitle">Editor de Logo</h3>

                <LogoEditor 
                  logoUrl={editedValues.header_logo}
                  loading={loading}
                  showGallery={showGallery}
                  onOpenGallery={() => setShowGallery(true)}
                  onCloseGallery={() => setShowGallery(false)}
                  onSelectImage={handleSelectImage}
                />
              </>
            )}

            {activeTab === "inicio" && <PageEditor page="home" />}
            {activeTab === "about" && <PageEditor page="about" />}
            {activeTab === "cuadernillos" && <PageEditor page="cuadernillos" />}
            {activeTab === "turnos" && <PageEditor page="turnos" />}
            {activeTab === "rol-del-terapeuta" && <PageEditor page="rol-del-terapeuta" />}
            {activeTab === "mantenimientos" && (  
            <div>
            <h2 className="adminTitle">Mantenimiento</h2>
            <p>pagos, metricas y estados (proximamente )</p>
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;