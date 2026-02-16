import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpeechButton from '../../components/SpeechButton';
import { useAuth } from '../../context/AuthContext';
import './style.css';

function CadastroStep4() {
    const navigate = useNavigate();
    const location = useLocation();
    const { register, loading } = useAuth(); // Importar a função de registro
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);

    // Recebe os dados acumulados dos passos anteriores (1, 2 e 3)
    const previousData = location.state?.previousData || {};

    const [portfolioImages, setPortfolioImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [error, setError] = useState('');

    // Função para converter arquivo para Base64 (mesmo padrão do passo 1)
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]); // Pega apenas o base64 sem o header
            reader.onerror = error => reject(error);
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length + portfolioImages.length > 6) {
            setError('Você pode adicionar no máximo 6 fotos.');
            return;
        }

        const newImages = [...portfolioImages];
        const newPreviews = [...previews];

        files.forEach(file => {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError(`A imagem ${file.name} é muito grande (Máx 5MB).`);
                return;
            }
            newImages.push(file);
            newPreviews.push(URL.createObjectURL(file));
        });

        setPortfolioImages(newImages);
        setPreviews(newPreviews);
        setError('');
    };

    const removeImage = (index) => {
        const newImages = portfolioImages.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setPortfolioImages(newImages);
        setPreviews(newPreviews);
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 50 * 1024 * 1024) { // 50MB limit para vídeo
            setError('O vídeo deve ter no máximo 50MB.');
            return;
        }

        setVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));
        setError('');
    };

    const removeVideo = () => {
        setVideoFile(null);
        setVideoPreview(null);
        if (videoInputRef.current) videoInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Prepara as imagens em Base64
            const processedImages = await Promise.all(
                portfolioImages.map(img => convertToBase64(img))
            );

            // Se tiver vídeo, converte também (atenção ao tamanho no backend!)
            let processedVideo = null;
            if (videoFile) {
                processedVideo = await convertToBase64(videoFile);
            }

            // Compila TODOS os dados finais
            const finalData = {
                ...previousData,
                portfolio: processedImages,
                presentationVideo: processedVideo
            };

            console.log("📦 Dados Finais para Envio:", finalData);

            // Chama a função de registro do contexto
            const result = await register(finalData);

            if (result.success) {
                alert('Cadastro realizado com sucesso!');
                navigate('/'); // Redireciona para home ou login
            } else {
                setError(result.message || 'Erro ao finalizar cadastro.');
            }

        } catch (err) {
            console.error(err);
            setError('Ocorreu um erro ao processar os arquivos.');
        }
    };

    return (
        <div className="cadastro-step4-container">
            <div className="cadastro-card">
                <div className="form-header">
                    <h2>Portfólio e Apresentação</h2>
                    <SpeechButton textToSpeak="Adicione fotos e vídeos dos seus trabalhos para atrair mais clientes." />
                </div>

                {error && <div className="error-message">{error}</div>}

                {/* Barra de Progresso - Passo 4 ativo */}
                <div className="form-progress">
                    <div className="progress-step completed"><span>✓</span><p>Básico</p></div>
                    <div className="progress-step completed"><span>✓</span><p>Endereço</p></div>
                    <div className="progress-step completed"><span>✓</span><p>Detalhes</p></div>
                    <div className="progress-step active"><span>4</span><p>Mídia</p></div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Upload de Fotos */}
                    <div className="form-section">
                        <h3>Galeria de Fotos do Trabalho</h3>
                        <p className="section-desc">Adicione até 6 fotos de peças que você já produziu.</p>
                        
                        <div className="media-upload-container">
                            <div className="upload-box" onClick={() => fileInputRef.current.click()}>
                                <span className="upload-icon">📷</span>
                                <p>Adicionar Fotos</p>
                                <input 
                                    type="file" 
                                    multiple 
                                    accept="image/*" 
                                    ref={fileInputRef} 
                                    onChange={handleImageUpload} 
                                    style={{display: 'none'}}
                                />
                            </div>

                            <div className="previews-grid">
                                {previews.map((src, index) => (
                                    <div key={index} className="preview-item">
                                        <img src={src} alt={`Preview ${index}`} />
                                        <button type="button" onClick={() => removeImage(index)} className="remove-btn">×</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Upload de Vídeo */}
                    <div className="form-section">
                        <h3>Vídeo de Apresentação (Opcional)</h3>
                        <p className="section-desc">Mostre seu ateliê ou você trabalhando (Max 50MB).</p>

                        <div className="video-upload-container">
                            {!videoPreview ? (
                                <div className="upload-box video-box" onClick={() => videoInputRef.current.click()}>
                                    <span className="upload-icon">🎥</span>
                                    <p>Carregar Vídeo</p>
                                    <input 
                                        type="file" 
                                        accept="video/*" 
                                        ref={videoInputRef} 
                                        onChange={handleVideoUpload} 
                                        style={{display: 'none'}}
                                    />
                                </div>
                            ) : (
                                <div className="video-preview-wrapper">
                                    <video controls src={videoPreview} className="video-player" />
                                    <button type="button" onClick={removeVideo} className="remove-video-btn">Remover Vídeo</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-navigation">
                        <button 
                            type="button" 
                            className="btn-voltar" 
                            onClick={() => navigate(-1)}
                            disabled={loading}
                        >
                            Voltar
                        </button>
                        <button 
                            type="submit" 
                            className="btn-avancar btn-finalizar"
                            disabled={loading}
                        >
                            {loading ? 'Finalizando...' : 'Concluir Cadastro'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CadastroStep4;