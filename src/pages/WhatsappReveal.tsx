import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { Volume2, VolumeX } from 'lucide-react';

// --- SEUS ARQUIVOS DE MÍDIA ---
import backgroundImage from '@/assets/foto-1.png';
import contentVideo from '@/assets/background-video.mp4';
import logo from '@/assets/logo.svg';

const WhatsappReveal = () => {
    const [isVideoFinished, setIsVideoFinished] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Efeito para detectar o fim da primeira execução do vídeo
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleVideoEnd = () => {
            if (!isVideoFinished) {
                setIsVideoFinished(true);
                if (videoElement) {
                    videoElement.loop = true;
                    videoElement.play();
                }
            }
        };

        videoElement.addEventListener('ended', handleVideoEnd);
        return () => videoElement.removeEventListener('ended', handleVideoEnd);
    }, [isVideoFinished]);

    // Lógica da barra de progresso
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleTimeUpdate = () => {
            if (videoElement.duration) {
                const currentTime = videoElement.currentTime;
                const duration = videoElement.duration;

                const linearProgress = (currentTime / duration) * 100;
                setProgress(linearProgress);
            }
        };

        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        return () => videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    }, []);

    const handleRedirect = () => {
        const phoneNumber = '5513997101413';
        const message = encodeURIComponent('Olá! Gostaria de mais informações.');
        window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
    };

    const toggleMute = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.muted = !videoElement.muted;
            setIsMuted(videoElement.muted);
        }
    };

    return (
        <section
            className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-start pt-8 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black/60 z-0" />

            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
                <img src={logo} alt="Logo" className="h-12 w-auto drop-shadow-lg" />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl md:text-5xl font-bold text-cream text-shadow mb-6 text-center absolute top-28 md:top-32 animate-fade-in-up">
                    Uma Mensagem Especial para Você
                </h1>

                {/* --- CONTÊINER INVISÍVEL PARA ESTABILIZAR O LAYOUT --- */}
                <div className="flex flex-col items-center mt-20 md:mt-0">
                    <div className="w-full max-w-md md:max-w-lg glass rounded-3xl p-2 animate-fade-in-up animation-delay-300">
                        <div className="relative">
                            <video
                                ref={videoRef}
                                src={contentVideo}
                                className="w-full h-auto rounded-2xl object-cover aspect-[4/3]"
                                autoPlay
                                muted={isMuted}
                                playsInline
                            />

                            <div className="absolute bottom-3 right-3 z-20">
                                <Button size="icon" onClick={toggleMute} className="glass rounded-full text-cream w-10 h-10">
                                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </Button>
                            </div>

                            <div className="absolute bottom-2 left-0 w-full px-2">
                                <div className="bg-white/20 w-full h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-cream h-full rounded-full" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* O botão agora aparece dentro do contêiner estabilizado */}
                    {isVideoFinished && (
                        <div className="mt-8 animate-fade-in-up">
                            <Button
                                size="lg"
                                onClick={handleRedirect}
                                className="bg-cream text-burgundy hover:bg-cream/90 rounded-full text-lg px-8 py-6 flex items-center gap-2 shadow-2xl"
                            >
                                <FaWhatsapp className="w-6 h-6" />
                                <span>Conversar no WhatsApp</span>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default WhatsappReveal;