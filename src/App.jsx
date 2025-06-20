import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Palette, Download, Share2, Plus, Minus } from 'lucide-react'
import './App.css'

function App() {
  const [colors, setColors] = useState(['#3B82F6']) // Começa com uma cor azul
  const [generatedImage, setGeneratedImage] = useState(null)

  // Função para adicionar uma nova cor
  const addColor = () => {
    if (colors.length < 5) {
      setColors([...colors, '#000000'])
    }
  }

  // Função para remover uma cor
  const removeColor = (index) => {
    if (colors.length > 1) {
      const newColors = colors.filter((_, i) => i !== index)
      setColors(newColors)
    }
  }

  // Função para atualizar uma cor
  const updateColor = (index, newColor) => {
    const newColors = [...colors]
    newColors[index] = newColor
    setColors(newColors)
  }

  // Função para gerar a imagem da paleta
  const generatePalette = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // Configurações do canvas
    canvas.width = 800
    canvas.height = 400
    
    // Fundo branco
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Desenhar as cores em círculos
    const circleRadius = 60
    const spacing = 120
    const startX = (canvas.width - (colors.length - 1) * spacing) / 2
    const centerY = canvas.height / 2
    
    colors.forEach((color, index) => {
      const x = startX + index * spacing
      
      // Desenhar círculo da cor
      ctx.beginPath()
      ctx.arc(x, centerY, circleRadius, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
      
      // Borda do círculo
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 3
      ctx.stroke()
      
      // Texto com o código da cor
      ctx.fillStyle = '#374151'
      ctx.font = '14px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(color.toUpperCase(), x, centerY + circleRadius + 25)
    })
    
    // Adicionar marca d'água
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.font = '16px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Assembleia de Deus - Frutificando Vidas', canvas.width / 2, canvas.height - 30)
    
    // Converter para data URL
    const dataURL = canvas.toDataURL('image/png')
    setGeneratedImage(dataURL)
  }

  // Função para baixar a imagem
  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a')
      link.download = 'paleta-frutificando.png'
      link.href = generatedImage
      link.click()
    }
  }

  // Função para compartilhar no WhatsApp
  const shareWhatsApp = () => {
    const colorParams = colors.map((color, index) => `color${index + 1}=${encodeURIComponent(color)}`).join('&')
    const currentUrl = `${window.location.origin}${window.location.pathname}?${colorParams}`
    const message = `Aqui está minha paleta de cores: ${currentUrl}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // Carregar cores da URL ao inicializar
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlColors = []
    
    for (let i = 1; i <= 5; i++) {
      const color = urlParams.get(`color${i}`)
      if (color) {
        urlColors.push(color)
      }
    }
    
    if (urlColors.length > 0) {
      setColors(urlColors)
    }
  }, [])

  // Atualizar URL quando as cores mudarem
  useEffect(() => {
    const colorParams = colors.map((color, index) => `color${index + 1}=${encodeURIComponent(color)}`).join('&')
    const newUrl = `${window.location.pathname}?${colorParams}`
    window.history.replaceState({}, '', newUrl)
  }, [colors])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Paleta Frutificando</h1>
              <p className="text-sm text-gray-600">Assembleia de Deus - Frutificando Vidas</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Instruções */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Crie sua Paleta de Cores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 mb-6">
                Selecione de 1 a 5 cores para criar sua paleta personalizada. 
                Use esta ferramenta para padronizar as cores dos seus materiais gráficos.
              </p>
            </CardContent>
          </Card>

          {/* Seletores de Cores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Suas Cores ({colors.length}/5)</span>
                <div className="flex space-x-2">
                  {colors.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeColor(colors.length - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                  {colors.length < 5 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addColor}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {colors.map((color, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Cor {index + 1}
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => updateColor(index, e.target.value)}
                        className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={color}
                          onChange={(e) => updateColor(index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                          placeholder="#000000"
                        />
                      </div>
                      {colors.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeColor(index)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preview da Paleta */}
          <Card>
            <CardHeader>
              <CardTitle>Preview da Paleta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {colors.map((color, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-20 h-20 rounded-full border-4 border-gray-200 shadow-md"
                      style={{ backgroundColor: color }}
                    ></div>
                    <p className="mt-2 text-xs font-mono text-gray-600">{color}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={generatePalette}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <Palette className="w-4 h-4" />
              <span>Gerar Designer</span>
            </Button>
            
            {generatedImage && (
              <>
                <Button
                  onClick={downloadImage}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Imagem</span>
                </Button>
                
                <Button
                  onClick={shareWhatsApp}
                  variant="outline"
                  className="flex items-center space-x-2 text-green-600 border-green-600 hover:bg-green-50"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartilhar no WhatsApp</span>
                </Button>
              </>
            )}
          </div>

          {/* Imagem Gerada */}
          {generatedImage && (
            <Card>
              <CardHeader>
                <CardTitle>Sua Paleta Gerada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <img
                    src={generatedImage}
                    alt="Paleta de cores gerada"
                    className="max-w-full h-auto mx-auto rounded-lg shadow-md"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2024 Assembleia de Deus - Frutificando Vidas. Ministério de Mídia.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

