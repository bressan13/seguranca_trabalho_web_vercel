"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/Card";

export default function UploadVideoPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [processingVideo, setProcessingVideo] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Verificar se é um arquivo de vídeo
      if (!file.type.startsWith('video/')) {
        setError('Por favor, selecione um arquivo de vídeo válido.');
        return;
      }
      
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Por favor, selecione um arquivo de vídeo para upload.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError(null);

    // Simular upload com progresso
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // Em um cenário real, aqui seria feito o upload do arquivo para o servidor
    // usando FormData e fetch ou uma biblioteca como axios
  };

  const handleProcessVideo = () => {
    setProcessingVideo(true);
    
    // Simular processamento do vídeo
    setTimeout(() => {
      setProcessingVideo(false);
      setProcessingComplete(true);
    }, 3000);
    
    // Em um cenário real, aqui seria feita uma chamada à API para processar o vídeo
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Upload de Vídeo</h1>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Selecione um vídeo para análise</h2>
            <p className="text-gray-500 mb-4">
              Faça upload de um vídeo para análise de conformidade com as normas de segurança.
              Formatos suportados: MP4, AVI, MOV, WMV.
            </p>
            
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Clique para selecionar</span> ou arraste e solte
                  </p>
                  <p className="text-xs text-gray-500">
                    Vídeo (MP4, AVI, MOV, WMV)
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="video/*"
                  onChange={handleFileChange}
                  disabled={uploading || processingVideo}
                />
              </label>
            </div>
            
            {selectedFile && (
              <div className="mt-4">
                <p className="text-sm text-gray-700">
                  Arquivo selecionado: <span className="font-medium">{selectedFile.name}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Tamanho: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => {
                setSelectedFile(null);
                setUploadProgress(0);
                setUploadComplete(false);
                setProcessingComplete(false);
                setError(null);
              }}
              disabled={uploading || processingVideo}
            >
              Limpar
            </button>
            <button 
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleUpload}
              disabled={!selectedFile || uploading || uploadComplete || processingVideo}
            >
              {uploading ? 'Enviando...' : 'Enviar Vídeo'}
            </button>
          </div>
          
          {(uploading || uploadComplete) && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                {uploading ? 'Enviando vídeo...' : 'Upload concluído!'}
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {uploadProgress}% concluído
              </p>
            </div>
          )}
          
          {uploadComplete && !processingVideo && !processingComplete && (
            <div className="mt-4 flex justify-end">
              <button 
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={handleProcessVideo}
              >
                Processar Vídeo
              </button>
            </div>
          )}
          
          {processingVideo && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                <p className="text-blue-700">Processando vídeo... Isso pode levar alguns minutos.</p>
              </div>
            </div>
          )}
          
          {processingComplete && (
            <div className="mt-4 p-4 bg-green-50 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p className="text-green-700">Processamento concluído! O vídeo foi analisado com sucesso.</p>
              </div>
              <div className="mt-3">
                <a 
                  href="/ocorrencias" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Ver ocorrências detectadas →
                </a>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Informações sobre Análise de Vídeos</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-md font-medium text-gray-700">Como funciona?</h3>
            <p className="text-gray-500">
              O sistema analisa cada quadro do vídeo para detectar pessoas e verificar o uso de equipamentos de proteção individual (EPIs).
              As ocorrências de não conformidade são registradas com timestamp para facilitar a revisão.
            </p>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-700">Recomendações</h3>
            <ul className="list-disc pl-5 text-gray-500 space-y-1">
              <li>Use vídeos com boa iluminação para melhores resultados</li>
              <li>Resolução mínima recomendada: 720p</li>
              <li>Duração máxima: 30 minutos por vídeo</li>
              <li>Tamanho máximo: 500 MB</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-700">Privacidade</h3>
            <p className="text-gray-500">
              Todos os vídeos enviados são processados de forma segura e confidencial.
              Os dados são armazenados de acordo com a política de privacidade da empresa.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
