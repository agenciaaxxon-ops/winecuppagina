import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Certifique-se de que o vídeo está na pasta src/assets
import backgroundVideo from '@/assets/background-video.mp4';

const QRCodeReveal = () => {
    const [isVideoFinished, setIsVideoFinished] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleVideoEnd = () => {
            if (!isVideoFinished) {
                setIsVideoFinished(true);
                // Após a primeira execução, ativamos o loop e mandamos tocar de novo
                if (videoElement) {
                    videoElement.loop = true;
                    videoElement.play();
                }
            }
        };

        videoElement.addEventListener('ended', handleVideoEnd);
        return () => {
            videoElement.removeEventListener('ended', handleVideoEnd);
        };
    }, [isVideoFinished]);

    const toggleMute = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.muted = !videoElement.muted;
            setIsMuted(videoElement.muted);
        }
    };

    return (
        <section className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-black">
            {/* VÍDEO DE FUNDO */}
            <video
                ref={videoRef}
                src={backgroundVideo}
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                autoPlay
                muted   // Começa mudo para garantir o autoplay
                playsInline
                // A propriedade `loop` foi removida daqui e será controlada pelo código
            />

            {/* Overlay Escuro para Contraste */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* Botão de Volume */}
            <Button
                size="icon"
                onClick={toggleMute}
                className="absolute top-6 right-6 z-30 glass rounded-full w-12 h-12 text-cream border-cream/50 hover:border-cream"
            >
                {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                <span className="sr-only">Ativar/Desativar som</span>
            </Button>

            {/* Conteúdo Sobreposto */}
            <div className="relative z-20 w-full h-full flex flex-col items-center p-4">
                {/* Título Principal */}
                <h1 className="text-4xl md:text-5xl font-bold text-cream pt-16 animate-fade-in-up">
                    Seu Título Principal Aqui
                </h1>

                {/* Seção do QR Code (Aparece após o vídeo terminar pela primeira vez) */}
                {isVideoFinished && (
                    <div className="flex-grow flex items-center justify-center w-full">
                        <div className="glass rounded-3xl p-8 md:p-12 text-center flex flex-col items-center max-w-md animate-fade-in-up">
                            <h2 className="text-3xl font-bold text-cream mb-4">
                                Escaneie o Código
                            </h2>
                            <p className="text-cream text-lg leading-relaxed mb-6">
                                Aponte a câmera do seu celular para o QR Code abaixo para continuar.
                            </p>
                            <div className="bg-white p-4 rounded-2xl shadow-lg">
                                {/* O QR Code real (imagem) entrará aqui */}
                                <div className="w-48 h-48 md:w-56 md:h-56 bg-gray-200 flex items-center justify-center rounded-lg">
                                    <QrCode className="w-24 h-24 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default QRCodeReveal;