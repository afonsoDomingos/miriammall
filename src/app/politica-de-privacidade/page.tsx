import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-serif font-bold text-primary mb-8">Política de Privacidade</h1>
          
          <div className="prose prose-lg max-w-none text-primary/80">
            <p className="text-sm text-primary/60 mb-8">Última atualização: {new Date().toLocaleDateString('pt-PT')}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">1. Introdução</h2>
              <p>
                A Miriam Mall ("nós", "nosso") respeita a sua privacidade e está empenhada em proteger os seus dados pessoais. 
                Esta política de privacidade irá informá-lo sobre como tratamos os seus dados pessoais quando visita o nosso website 
                e informa-o sobre os seus direitos de privacidade e como a lei o protege.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">2. Dados que Recolhemos</h2>
              <h3 className="text-xl font-semibold text-primary mb-2">2.1 Dados Pessoais</h3>
              <p>Podemos recolher, usar, armazenar e transferir diferentes tipos de dados pessoais sobre si, que agrupamos da seguinte forma:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Dados de Identidade:</strong> inclui primeiro nome, apelido, nome de utilizador.</li>
                <li><strong>Dados de Contacto:</strong> inclui endereço de e-mail e números de telefone.</li>
                <li><strong>Dados de Negócio:</strong> inclui nome da empresa, tipo de negócio, área pretendida.</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary mb-2 mt-4">2.2 Dados de Utilização</h3>
              <p>Recolhemos automaticamente informações sobre como você usa o nosso website, incluindo:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Informações sobre o seu dispositivo e navegador</li>
                <li>Páginas visitadas e tempo gasto</li>
                <li>Fonte de tráfego (website de origem)</li>
                <li>Endereço IP</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">3. Como Usamos os Seus Dados</h2>
              <p>Usamos os seus dados pessoais para os seguintes fins:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processar pedidos de arrendamento e consultas</li>
                <li>Enviar newsletters e comunicações de marketing (com o seu consentimento)</li>
                <li>Melhorar o nosso website e serviços</li>
                <li>Comunicar consigo sobre os nossos serviços</li>
                <li>Cumprir obrigações legais e regulamentares</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">4. Segurança dos Dados</h2>
              <p>
                Implementámos medidas de segurança apropriadas para proteger os seus dados pessoais contra perda, uso indevido, 
                alteração, destruição ou acesso não autorizado. Estas incluiem:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encriptação de dados em trânsito e em repouso</li>
                <li>Acesso restrito aos dados pessoais</li>
                <li>Medidas de segurança física nos nossos servidores</li>
                <li>Auditorias regulares de segurança</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">5. Os Seus Direitos</h2>
              <p>Ao abrigo da lei de proteção de dados, você tem os seguintes direitos:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Direito de Acesso:</strong> Solicitar uma cópia dos seus dados pessoais</li>
                <li><strong>Direito de Retificação:</strong> Solicitar a correção de dados incorretos</li>
                <li><strong>Direito de Eliminação:</strong> Solicitar a eliminação dos seus dados</li>
                <li><strong>Direito de Oposição:</strong> Opor-se ao processamento dos seus dados</li>
                <li><strong>Direito de Portabilidade:</strong> Solicitar a transferência dos seus dados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">6. Cookies</h2>
              <p>
                Utilizamos cookies para melhorar a sua experiência de navegação. Os cookies são pequenos ficheiros de texto 
                armazenados no seu dispositivo. Para mais informações, consulte a nossa Política de Cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">7. Contacto</h2>
              <p>
                Se tiver alguma questão sobre esta política de privacidade ou sobre como tratamos os seus dados pessoais, 
                contacte-nos através:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>E-mail:</strong> info@miriammall.co.mz</li>
                <li><strong>Telefone:</strong> +258 86 554 3026</li>
                <li><strong>Endereço:</strong> Miriam Mall, Distrito de Homoíne, Província de Inhambane, Moçambique</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
